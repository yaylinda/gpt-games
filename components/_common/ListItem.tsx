import { Avatar } from '@nextui-org/avatar';
import { Card, CardBody } from '@nextui-org/card';
import React from 'react';
import { IconBaseProps } from 'react-icons';

interface RowProps {
    icon: (props: IconBaseProps) => React.JSX.Element;
    iconColor: string;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    actions?: React.ReactNode;
    onClick?: () => void;
}

const ListItem = ({ icon, iconColor, title, subtitle, actions, onClick }: RowProps) => {
    return (
        <Card
            isHoverable
            isPressable={!!onClick}
            onPress={onClick}
            shadow="none"
            className="w-full"
        >
            <CardBody className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-4">
                    <Avatar
                        className="bg-white border-white"
                        isBordered
                        size="sm"
                        icon={icon({
                            color: iconColor,
                            className: 'text-3xl bg-white',
                        })}
                    />
                    <div className="flex flex-col gap-0.5">
                        <div className="flex flex-row items-center">{title}</div>
                        {subtitle && <div className="flex flex-row items-center">{subtitle}</div>}
                    </div>
                </div>
                {actions && <div className="flex flex-row items-center gap-1">{actions}</div>}
            </CardBody>
        </Card>
    );
};

export default ListItem;
