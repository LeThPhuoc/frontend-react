/** @jsxImportSource @emotion/react */

import React, { use, useState } from "react";
import { css } from "@emotion/react";

type Prop = {
    message: string[] | unknown[]
    type: 'error' | 'success'
}

export const Alert = ({ message, type }: Prop) => {
    if (!message) return null;
    return (
        <div css={container}>
            {message.map((msg, index) => (
                <div css={itemMessage(type)} key={index}>{msg as string}</div>
            ))}
        </div>
    )
}

const container = css`
    position: fixed;
    top: 10px;
    width: calc(100vw - 40px);
    display: flex;
    flex-direction: column;
    gap: 10px;
    
`

const itemMessage = (type: 'error' | 'success') => css`
    font-size: 14px;
    background-color: ${type == 'success' ? '#8ce78e' : '#f77777'};
    color: white;
    padding: 10px;
    border-radius: 8px;
`