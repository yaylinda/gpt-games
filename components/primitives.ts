import { tv } from 'tailwind-variants';

export const title = tv({
    base: 'inline font-bold',
    variants: {
        color: {
            primary: 'from-[#005bc4] to-[#338ef7]',
            secondary: 'from-[#7828c8] to-[#ae7ede]',
            success: 'from-[#12a150] to-[#45d483]',
            warning: 'from-[#c4841d] to-[#f7b750]',
            danger: `from-[#f31260] to-[#f871a0]`,
            default: 'dark:from-[#FFFFFF] dark:to-[#4B4B4B]',
        },
        size: {
            xs: 'text-xl',
            sm: 'text-3xl lg:text-4xl',
            md: 'text-[2.3rem] lg:text-5xl',
            lg: 'text-4xl lg:text-6xl',
        },
        fullWidth: {
            true: 'w-full block',
        },
    },
    defaultVariants: {
        size: 'lg',
    },
    compoundVariants: [
        {
            color: ['primary', 'secondary', 'success', 'warning', 'danger', 'default'],
            class: 'bg-clip-text text-transparent bg-gradient-to-b',
        },
    ],
});

export const subtitle = tv({
    base: 'inline font-bold text-default-400 text-lg lg:text-xl',
    variants: {
        color: {
            primary: 'from-[#005bc4] to-[#338ef7]',
            secondary: 'from-[#7828c8] to-[#ae7ede]',
            success: 'from-[#12a150] to-[#45d483]',
            warning: 'from-[#c4841d] to-[#f7b750]',
            danger: `from-[#f31260] to-[#f871a0]`,
            default: 'dark:from-[#FFFFFF] dark:to-[#4B4B4B]',
        },
        fullWidth: {
            true: '!w-full',
        },
    },
    defaultVariants: {
        fullWidth: true,
    },
    compoundVariants: [
        {
            color: ['primary', 'secondary', 'success', 'warning', 'danger', 'default'],
            class: 'bg-clip-text text-transparent bg-gradient-to-b',
        },
    ],
});
