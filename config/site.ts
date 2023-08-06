import { PiUserCircleDuotone } from "react-icons/pi";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "GPT Games",
    description: "Play games powered by GPT",
    navItems: [

    ],
    navMenuItems: {
        loggedIn: [
            {
                label: 'Profile',
                icon: PiUserCircleDuotone,
                color: undefined,
                href: '/profile'
            },
            {
                label: 'Logout',
                icon: undefined,
                color: 'danger',
            },
        ],
        loggedOut: [
            {
                label: 'Login',
                icon: undefined,
                color: undefined,
            },
        ],
    },
    links: {

    },
};
