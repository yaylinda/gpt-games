import useClientStore from '@/components/client/store';
import { friendAdapter, friendRequestAdapter } from '@/components/friends/adapters';
import { requestFriend } from '@/components/friends/api';
import {
    Friend,
    FriendListType,
    FriendRequest,
    FriendRow,
    FriendUpdate,
    ResponseWithStatusAndMessage,
} from '@/components/friends/types';
import useProfileStore from '@/components/users/store';
import { Tables } from '@/types';
import { errorAlert } from '@/utils';
import { produce } from 'immer';
import { uniq } from 'lodash';
import moment from 'moment';
import uuid from 'react-native-uuid';
import { create } from 'zustand';
import {
    isFriendRequestDeniedByOtherRow,
    isFriendRequestDeniedByUserRow,
    isFriendRequestReceivedRow,
    isFriendRequestSentRow,
    isFriendRow,
} from './utils';

interface FriendStoreData {
    loading: boolean;
    requesting: boolean;
    responding: boolean;
    friends: Friend[];
    friendRequestsReceived: FriendRequest[];
    friendRequestsSent: FriendRequest[];
    friendRequestsUserDenied: FriendRequest[];
    friendRequestsOtherDenied: FriendRequest[];
}

interface FriendStoreFunctions {
    fetchFriends: () => void;
    sendFriendRequest: (userTag: string) => Promise<ResponseWithStatusAndMessage>;
    respondToFriendRequest: (requester: string, accepted: boolean) => void;
    upsertFriends: (friend: FriendRow) => void;
}

interface FriendStoreState extends FriendStoreData, FriendStoreFunctions {}

const FRIEND_REQUEST_LIST_TYPES = [
    FriendListType.RECEIVED,
    FriendListType.SENT,
    FriendListType.USER_DENIED,
    FriendListType.OTHER_DENIED,
];

const DEFAULT_DATA: FriendStoreData = {
    loading: false,
    requesting: false,
    responding: false,
    friends: [],
    friendRequestsReceived: [],
    friendRequestsSent: [],
    friendRequestsUserDenied: [],
    friendRequestsOtherDenied: [],
};

const useFriendStore = create<FriendStoreState>()((set, get) => ({
    ...DEFAULT_DATA,

    fetchFriends: async () => {
        const { supabase, userId } = useClientStore.getState();

        console.log(`[friendStore][fetchFriends] trying to fetch friends.....`);

        if (!supabase || get().loading) {
            console.log(
                `[friendStore][fetchFriends] didn't fetch because no initInfo (or already loading)`
            );
            return;
        }

        set({ loading: true });

        const { data, error } = await supabase
            .from(Tables.FRIENDS)
            .select()
            .or(`requester.eq.${userId},requestee.eq.${userId}`);

        if (error) {
            set({ loading: false });
            errorAlert(error);
        }

        const friendRows: FriendRow[] = (data || []).map((f) => f as FriendRow);

        const uniqueUserIds: string[] = uniq(friendRows.flatMap((f) => [f.requester, f.requestee]));

        const profilesMap = await useProfileStore.getState().fetchProfiles(uniqueUserIds);

        console.log(`[friendStore][fetchFriends] fetched ${friendRows.length} friendRows`);

        set({
            loading: false,
            friends: friendRows
                .filter((f) => isFriendRow(f))
                .flatMap<Friend>((f) => [
                    friendAdapter(f.requester, f, profilesMap),
                    friendAdapter(f.requestee, f, profilesMap),
                ])
                .filter((f) => f.id !== userId),
            friendRequestsReceived: friendRows
                .filter((f) => isFriendRequestReceivedRow(f, userId))
                .map((f) => friendRequestAdapter(f, profilesMap)),
            friendRequestsSent: friendRows
                .filter((f) => isFriendRequestSentRow(f, userId))
                .map((f) => friendRequestAdapter(f, profilesMap)),
            friendRequestsUserDenied: friendRows
                .filter((f) => isFriendRequestDeniedByUserRow(f, userId))
                .map((f) => friendRequestAdapter(f, profilesMap)),
            friendRequestsOtherDenied: friendRows
                .filter((f) => isFriendRequestDeniedByOtherRow(f, userId))
                .map((f) => friendRequestAdapter(f, profilesMap)),
        });
    },

    sendFriendRequest: async (
        requesteeUsernameDiscriminator: string
    ): Promise<ResponseWithStatusAndMessage> => {
        const { supabase, userId } = useClientStore.getState();

        if (!supabase) {
            return {
                success: false,
                message: 'Oops! Something went wrong. Please try again.',
            };
        }

        set({ requesting: true });

        try {
            return await requestFriend(supabase, {
                correlationId: uuid.v4().toString(),
                userId,
                requesteeUsernameDiscriminator,
            });
        } catch (e) {
            throw e;
        } finally {
            set({ requesting: false });
        }
    },

    respondToFriendRequest: async (requester: string, accept: boolean) => {
        const { supabase, userId } = useClientStore.getState();

        if (!supabase) {
            return;
        }

        set({ responding: true });

        const updateRow: FriendUpdate = {
            request_accepted: accept,
            responded_on: moment().toISOString(),
        };

        const { error } = await supabase
            .from(Tables.FRIENDS)
            .update(updateRow)
            .eq('requester', requester)
            .eq('requestee', userId)
            .select()
            .single();

        set({ responding: false });

        if (error) {
            errorAlert(error);
        }
    },

    upsertFriends: async (friendRow: FriendRow) => {
        console.log('[friendStore][upsertFriends] friendSubscription update');

        const { userId } = useClientStore.getState();

        if (!userId) {
            return;
        }

        let listType: FriendListType;
        let otherProfileId: string;

        if (isFriendRow(friendRow)) {
            listType = FriendListType.FRIENDS;
            otherProfileId =
                friendRow.requestee === userId ? friendRow.requester : friendRow.requestee;
        } else if (isFriendRequestReceivedRow(friendRow, userId)) {
            listType = FriendListType.RECEIVED;
            otherProfileId = friendRow.requester;
        } else if (isFriendRequestSentRow(friendRow, userId)) {
            listType = FriendListType.SENT;
            otherProfileId = friendRow.requestee;
        } else if (isFriendRequestDeniedByUserRow(friendRow, userId)) {
            listType = FriendListType.USER_DENIED;
            otherProfileId = friendRow.requester;
        } else if (isFriendRequestDeniedByOtherRow(friendRow, userId)) {
            listType = FriendListType.OTHER_DENIED;
            otherProfileId = friendRow.requestee;
        } else {
            console.error('got friend row that does not match!!!');
            return;
        }

        const profilesMap = await useProfileStore.getState().fetchProfiles([otherProfileId]);

        set((state) =>
            produce(state, (draft) => {
                if (listType === FriendListType.FRIENDS) {
                    draft.friends.unshift(friendAdapter(otherProfileId, friendRow, profilesMap));
                } else {
                    draft[listType].unshift(friendRequestAdapter(friendRow, profilesMap));
                }

                FRIEND_REQUEST_LIST_TYPES.filter(
                    (otherListType) => otherListType !== listType
                ).forEach((otherListType) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    draft[otherListType] = (draft[otherListType] as FriendRequest[]).filter(
                        (fr: FriendRequest) => fr.friendPair !== friendRow.friend_pair
                    );
                });
            })
        );
    },
}));

export default useFriendStore;
