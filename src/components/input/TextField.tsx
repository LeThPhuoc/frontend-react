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
                padding: 8px;
                font-size: 14px;
            `
        }
        case 'sm': {
            return css`
                padding: 6px;
                font-size: 14px;
            `
        }
        case 'lg': {
            return css`
                padding: 14px;
                font-size: 14px;
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
    outline: none;
    border-radius: 5px;
    border: 1px solid #ccc;
    min-width: 150px;
`