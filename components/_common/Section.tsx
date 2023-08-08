'use client';

import useClientStore from '@/components/client/store';
import { title } from '@/components/primitives';
import { DialogType } from '@/types';
import { Button } from '@nextui-org/react';
import React from 'react';
import { PiPlusCircleBold } from 'react-icons/pi';

interface SectionProps {
    titleText: string;
    color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
    dialogType: DialogType;
    children?: React.ReactNode;
}

const Section = ({ titleText, color, dialogType, children }: SectionProps) => {
    const { openDialog } = useClientStore();

    return (
        <section className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-row items-center justify-between w-full">
                <h1
                    className={title({
                        color,
                        size: 'md',
                    })}
                >
                    {titleText}
                </h1>
                <Button
                    isIconOnly
                    color={color}
                    variant="light"
                    onClick={() => openDialog(dialogType)}
                >
                    <PiPlusCircleBold className="text-3xl" />
                </Button>
            </div>
            {children}
        </section>
    );
};

export default Section;
