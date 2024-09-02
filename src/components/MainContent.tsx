import React, { ReactNode } from 'react';
import './children.css'

interface MainContentProps {
    children: ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
    return (
        <div className='childrensection'>
            {children}
        </div>
    );
};

export default MainContent;
