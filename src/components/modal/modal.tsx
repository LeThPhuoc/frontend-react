/** @jsxImportSource @emotion/react */

import { css, SerializedStyles } from "@emotion/react"
import React from "react"

type Prop = {
    children: React.ReactNode
    isOpen: boolean
    title?: string
    onClose?: () => void
    isHeader?: boolean
    customCss?: SerializedStyles | SerializedStyles[]
}

export const Modal = ({ children, isOpen, title, onClose, isHeader = true, customCss }: Prop) => {
    if (!isOpen) return null
    return (
        <div css={container}>
            <div css={background} onClick={onClose}></div>
            <div css={[content, customCss]}>
                {isHeader && (
                    <div css={header}>
                        <div className="title">{title}</div>
                        <button onClick={onClose}>X</button>
                    </div>
                )}
                <div css={childStyle}>
                    {children}
                </div>
            </div>
        </div>
    )
}

const container = css`
    top: 0px;
    left: 0px;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    display: flex;
    position: fixed;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`

const background = css`
    top: 0px;
    left: 0px;
    opacity: .5;
    width: 100vw;
    height: 100vh;
    position: fixed;
    background-color: #000;
`

const content = css`
    z-index: 10;
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    min-width: 500px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
`

const childStyle = css`
    overflow-y: auto;
    flex: 1;
`

const header = css`
width: 100%;
    display: flex;
    position: relative;
    .title {
        width: 100%;
        font-size: 20px;
        font-weight: 500;
        text-align: center;
    }
    button {
        border: none;
        background-color: inherit;
        cursor: pointer;
    }
`