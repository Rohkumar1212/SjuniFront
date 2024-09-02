import React, { useState, FormEvent } from 'react';
import PropTypes from 'prop-types';

function AuthIllustration(props: {
    children: string | React.ReactNode;
    illustrationBackground: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    error: string;
}) {
    const { children, illustrationBackground, onSubmit, email, setEmail, password, setPassword, error } = props;

    return (
        <div>        
           kkkkk
        </div>
    );
}

AuthIllustration.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    illustrationBackground: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
};

export default AuthIllustration;
