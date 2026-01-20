import React, { ReactNode } from 'react';

interface CommonButtonProps {
    children: ReactNode;
}

const CommonButton: React.FC<CommonButtonProps> = ({ children }) => {
    return (
        <button className="btn bg-[#FFDE24] rounded-full border-0">
            <span className="custom-bangla-font text-[#001522] px-4 md:px-5">
                {children}
            </span>
        </button>
    );
};

export default CommonButton;