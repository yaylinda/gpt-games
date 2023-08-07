import { friendAdapter, friendRequestAdapter } from '@/components/friends/adapters';
import { requestFriend } from '@/components/friends/api';
import {
    Friend,
    FriendListType,
    FriendRequest,
    FriendRow,
    FriendUpdate,
    RequestFriendResponse,
} from '@/components/friends/types';
import useProfileStore from '@/components/users/store';
import { Tables } from '@/types';
import { Database } from '@/types/generated';
import { errorAlert } from '@/utils';
import { SupabaseClient } from '@supabase/supabase-js';
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
    initInfo: {
        userId: string;
        supabase: SupabaseClient<Database>;
    } | null;
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
    init: (userId: string, supabase: SupabaseClient<Database>) => void;
    fetchFriends: () => Promise<void>;
    sendFriendRequest: (userTag: string) => Promise<RequestFriendResponse>;
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
    initInfo: null,
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

    init: (userId: string, supabase: SupabaseClient<Database>) => {
        console.log(`[friendStore][init] initializing store...`);
        set({
            initInfo: {
                userId,
                supabase,
            },
        });
    },

    fetchFriends: async () => {
        const initInfo = get().initInfo;

        if (!initInfo || get().loading) {
            return;
        }

        const { userId, supabase } = initInfo;

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
    ): Promise<RequestFriendResponse> => {
        const initInfo = get().initInfo;

        if (!initInfo) {
            return {
                success: false,
                message: 'Oops! Something went wrong. Please try again.',
            };
        }

        const { userId, supabase } = initInfo;

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
        const initInfo = get().initInfo;

        if (!initInfo) {
            return;
        }

        const { userId, supabase } = initInfo;

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

        const initInfo = get().initInfo;

        if (!initInfo) {
            return;
        }

        const { userId } = initInfo;

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
