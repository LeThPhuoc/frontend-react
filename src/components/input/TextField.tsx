/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { ChangeEvent } from "react"

type Props = {
    placeholder?: string
    size?: 'md' | 'sm' | 'lg'
    value: string | number
    onChange?: (value: ChangeEvent<HTMLInputElement>) => void
    isFullWidth?: boolean
    type?: string
    errorText?: string
    label?: string
    disabled?: boolean
    emphasis?: boolean
    positionLabel?: 'top' | 'left'
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

export const TextField = (
    {
        emphasis,
        placeholder,
        size = 'md',
        value,
        onChange,
        isFullWidth,
        type = 'text',
        errorText,
        label,
        disabled,
        positionLabel = 'top',
    }: Props) => {
    return (
        <div css={[container, isFullWidth && css`width: 100%;`]}>
            <div css={customPositionLabel(positionLabel)}>
            {label && (
                <label htmlFor="" css={labelStyle}>{label}</label>
            )}
            <input
                css={[baseCss(disabled, emphasis), (size && sizeCss(size)), isFullWidth && css`width: 100%;`]}
                onChange={(e) => onChange && onChange(e)}
                value={value}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
            />
            </div>
            {errorText && (
                <span css={errorTextStyle}>{errorText}</span>
            )}
        </div>
    )
}

const container = css`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const baseCss = (disabled?: boolean, emphasis?: boolean) => css`
    border-radius: 8px;
    min-width: 150px;
    color: #0E0E21;
    border: 1px solid #EAE9EE;
    box-shadow: 0px 1px 2px 0px #1018280D;
    transition: all .3s ease-out;
    opacity: ${disabled ? 0.6 : 1};
    background-color: ${disabled ? '' : emphasis ? '#edfaff' : ''};
    ::placeholder {
        color: #948D86;
    }
    :hover, :focus {
        border: ${disabled ? '' : '1px solid #7399FF'};
    }
    :focus {
        box-shadow: 0px 0px 0px 4px #7399FF40;
    }
`

const errorTextStyle = css`
    font-size: 13px;
    color: red;
`

const labelStyle = css`
    font-size: 14px;
    font-weight: 500;
`

const customPositionLabel = (positionLabel: 'top' | 'left') => css`
    display: flex;
    flex-direction: ${positionLabel === 'top' ? 'column' : 'row'};
    align-items: ${positionLabel === 'top' ? 'flex-start' : 'center'};
    gap: 5px;
`