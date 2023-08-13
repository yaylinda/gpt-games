import useClientStore from '@/components/client/store';
import { profileAdapter } from '@/components/users/adapters';
import { fetchProfiles, searchProfiles } from '@/components/users/api';
import { Profile, ProfileRow } from '@/components/users/types';
import { reduceToMapped } from '@/_common/utils';
import { isEmpty } from 'lodash';
import { create } from 'zustand';

interface ProfileStoreData {
    profiles: Record<string, Profile>;
}

interface ProfileStoreFunctions {
    fetchProfiles: (userIds: string[]) => Promise<Record<string, Profile>>;
    searchProfiles: (usernameWithDiscriminator: string) => Promise<Profile[]>;
    upsertProfile: (profileRow: ProfileRow) => void;
    getProfile: (userId: string) => Profile;
    getUsernameWithDiscriminator: (userId: string) => string;
    getUsername: (userId: string) => string;
    getDiscriminator: (userId: string) => string;
}

interface ProfileStoreState extends ProfileStoreData, ProfileStoreFunctions {}

const DEFAULT_DATA: ProfileStoreData = {
    profiles: {},
};

const useProfileStore = create<ProfileStoreState>()((set, get) => ({
    ...DEFAULT_DATA,

    fetchProfiles: async (userIds: string[]): Promise<Record<string, Profile>> => {
        const { supabase, userId } = useClientStore.getState();

        if (!supabase) {
            return {};
        }

        const unknownUserIds = userIds.filter((u) => !get().profiles[u]);

        if (isEmpty(unknownUserIds)) {
            return reduceToMapped(userIds.map((u) => get().profiles[u]));
        }

        const newProfiles = await fetchProfiles(supabase, unknownUserIds);
        const profiles = {
            ...get().profiles,
            ...reduceToMapped(newProfiles),
        };
        set({ profiles });
        return reduceToMapped(userIds.filter((u) => profiles[u]).map((u) => profiles[u]));
    },

    searchProfiles: async (usernameWithDiscriminator: string): Promise<Profile[]> => {
        const { supabase, userId } = useClientStore.getState();

        if (!supabase) {
            return [];
        }

        const newProfiles = await searchProfiles(supabase, userId, usernameWithDiscriminator);

        set((state) => ({ profiles: { ...state.profiles, ...reduceToMapped(newProfiles) } }));

        return newProfiles;
    },

    upsertProfile: (profileRow: ProfileRow) => {
        console.log('[profilesStore][upsertProfile] profileSubscription update');

        set((state) => ({
            profiles: {
                ...state.profiles,
                [profileRow.id]: profileAdapter(profileRow),
            },
        }));
    },

    getProfile: (userId: string): Profile => get().profiles[userId],

    getUsernameWithDiscriminator: (userId: string): string => {
        if (!get().profiles[userId]) {
            return userId;
        }

        return `${get().profiles[userId].username}#${get().profiles[userId].discriminator}`;
    },

    getUsername: (userId: string): string => {
        if (!get().profiles[userId]) {
            return userId;
        }

        return get().profiles[userId].username;
    },

    getDiscriminator: (userId: string): string => {
        if (!get().profiles[userId]) {
            return userId;
        }

        return get().profiles[userId].discriminator;
    },
}));

export default useProfileStore;
