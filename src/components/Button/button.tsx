/** @jsxImportSource @emotion/react */

import { css, SerializedStyles } from "@emotion/react"

type Props = {
    size?: 'm' | 's' | 'l'
    isFullWidth?: boolean
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    variant?: TypeButton
    customCss?: SerializedStyles | SerializedStyles[]
    isFocus?: boolean
}

type TypeButton = 'primary' | 'secondary' | 'delete';

const typeCss = (variant: TypeButton, isFocus?: boolean) => {
    switch (variant) {
        case 'primary': {
            return css`
                background-color: #CFDCFF;
                :not(:disabled):hover {
                    background-color: #7399FF;
                    color: white;
                }
                ${isFocus &&
                css`
                        background-color: #7399ff;
                        color: white;
                        outline: 1px solid #4c6fff;
                        outline-offset: 1px;
                    `
                }
            `
        }
        case 'secondary': {
            return css`
                background-color: inherit;
                border: 1px solid #EDE6DD;
                :not(:disabled):hover {
                    border: 1px solid #0E0E21
                }
                ${isFocus &&
                css`
                        background-color: #d9d9d9;
                        outline: 1px solid #EDE6DD;
                        outline-offset: 1px;
                    `
                }
            `
        }
        case 'delete': {
            return css`
                background-color: #FFD4D4;
                :not(:disabled):hover {
                    background-color: #FF6A6A;
                    color: white;
                }
                ${isFocus &&
                css`
                        background-color: #FF6A6A;
                        color: white;
                        outline: 1px solid #FF6A6A;
                        outline-offset: 1px;
                    `
                }
            `}
    }
}

const sizeCss = (size: 'm' | 's' | 'l') => {
    switch (size) {
        case 'm': {
            return css`
                padding: 12px 16px;
                font-size: 14px;
            `
        }
        case 's': {
            return css`
                padding: 8px;
                font-size: 12px;
            `
        }
        case 'l': {
            return css`
                padding: 16px 20px;
                font-size: 16px;
            `
        }
    }
}

export const Button = (
    {
        size = 'm',
        isFullWidth,
        children,
        onClick,
        disabled,
        variant = 'primary',
        customCss,
        isFocus
    }: Props
) => {
    return (
        <button
            css={[
                baseCss(disabled,
                isFullWidth),
                sizeCss(size),
                typeCss(variant, isFocus),
                customCss,
            ]}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}


const baseCss = (disable?: boolean, isFullwidth?: boolean) => css`
    width: ${isFullwidth ? '100%' : 'fit-content'};
    border-radius: 50px;
    color: #0E0E21;
    transition: all .3s ease-out;
    color: ${disable ? '#948D86' : ''};
    opacity: ${disable ? 0.6 : 1};
    cursor: ${disable ? 'not-allowed' : 'pointer'};
`