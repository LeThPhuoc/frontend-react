/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"

type Props = {
    size?: 'm' | 's' | 'l'
    isFullWidth?: boolean
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    type?: 'primary' | 'secondary'
}

const typeCss = (type: 'primary' | 'secondary') => {
    switch (type) {
        case 'primary': {
            return css`
                background-color: #CFDCFF;
                :hover {
                    background-color: #7399FF;
                }
            `
        }
        case 'secondary': {
            return css`
                background-color: inherit;
                border: 1px solid #EDE6DD;
                :hover {
                    border: 1px solid #0E0E21
                }
            `
        }
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

export const Button = ({ size = 'm', isFullWidth, children, onClick, disabled, type = 'primary' }: Props) => {
    return (
        <button css={[baseCss(disabled, isFullWidth), sizeCss(size), typeCss(type)]} onClick={onClick}>
            {children}
        </button>
    )
}


const baseCss = (disable?: boolean, isFullwidth?: boolean) => css`
    width: ${isFullwidth ? '100%' :'fit-content'};
    border-radius: 50px;
    color: #0E0E21;
    transition: all .3s ease-out;
    color: ${disable ? '#948D86' : ''};
    opacity: ${disable ? 0.6 : 1};
    cursor: ${disable ? 'not-allowed': 'pointer'};
`
