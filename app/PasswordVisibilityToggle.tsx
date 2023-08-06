import React from 'react';
import { PiEyeDuotone, PiEyeSlashDuotone } from 'react-icons/pi';

interface PasswordVisibilityToggleProps {
    isVisible: boolean;
    toggleVisibility: () => void;
}

const PasswordVisibilityToggle = ({
    isVisible,
    toggleVisibility,
}: PasswordVisibilityToggleProps) => {
    return (
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
            {isVisible ? (
                <PiEyeSlashDuotone className="text-2xl text-default-400 pointer-events-none" />
            ) : (
                <PiEyeDuotone className="text-2xl text-default-400 pointer-events-none" />
            )}
        </button>
    );
};

export default PasswordVisibilityToggle;
