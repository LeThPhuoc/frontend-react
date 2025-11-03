/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"

type Props = {
    placeholder?: string
    size?: 'md' | 'sm' | 'lg'
    value: string | number
    onChange: (value: string) => void
    isFullWidth?: boolean
}

const sizeCss = (size: 'md' | 'sm' | 'lg') => {
    switch (size) {
        case 'md': {
            return css`
                padding: 10px 14px;
                font-size: 14px;
            `
        }
        case 'sm': {
            return css`
                padding: 6px;
                font-size: 12px;
            `
        }
        case 'lg': {
            return css`
                padding: 14px;
                font-size: 16px;
            `
        }
    }
}

export const TextField = ({ placeholder, size = 'md', value, onChange, isFullWidth }: Props) => {
    return (
        <div>
            <input css={[baseCss, (size && sizeCss(size)), isFullWidth && css`width: 100%;`]} onChange={(e) => onChange(e.target.value)} value={value} placeholder={placeholder} type="text" />
        </div>
    )
}

const baseCss = css`
    border-radius: 8px;
    min-width: 150px;
    color: #0E0E21;
    border: 1px solid #EAE9EE;
    box-shadow: 0px 1px 2px 0px #1018280D;
    transition: all .3s ease-out;
    ::placeholder {
        color: #948D86;
    }
    :hover, :focus {
        border: 1px solid #7399FF;
    }
    :focus {
        box-shadow: 0px 0px 0px 4px #7399FF40;
    }
`