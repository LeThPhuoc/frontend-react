/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { createContext, useContext, useState, ReactNode } from "react";

type AlertType = "success" | "error" | 'info' | 'warning';

const handleColorAlert = (type: AlertType) => {
    switch(type) {
        case 'error': {
            return css`
                background-color: #fdeded;
            `
        }
        case 'success': {
            return css`
                background-color: #edf7ed;
            `
        }
        case 'info': {
            return css`
                background-color: #e5f6fd;
            `
        }
        case 'warning': {
            return css`
                background-color: #fff4e5;
            `
        }
    }
}

interface Alert {
    message: string;
    type: AlertType;
}

interface AlertContextType {
    showAlert: (message: string, type: AlertType) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) throw new Error("useAlert must be used within AlertProvider");
    return context;
};

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [alert, setAlert] = useState<Alert | null>(null);

    const showAlert = (message: string, type: AlertType) => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 3000);
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            {alert && (
                <div
                    css={[alertStyle, handleColorAlert(alert.type)]}
                >
                    {alert.message}
                </div>
            )}
        </AlertContext.Provider>
    );
};

const alertStyle =  css`
width: calc(100vw - 32px);
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 24px;
    border-radius: 8px; 
    color: black;
    z-index: 1000;
    transition: all .3s;
`