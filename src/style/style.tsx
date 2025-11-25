import { css } from "@emotion/react";

export const flex = css`
    display: flex;
`

export const flexCol = css`
    flex-direction: column;
`

export const gap = (index: number) => {
    return css`
        gap: ${index}px;
    `
}

export const justifyBetween = css`
    justify-content: space-between;
`

export const alignCenter = css`
    align-items: center;
`

export const flex1 = css`
    flex: 1;
`

export const mt = (index: number) => {
    return css`
        margin-top: ${index}px;
    `
}

export const position = (position: "static" |
    "relative" |
    "absolute" |
    "fixed" |
    "sticky" | "inherit" |
    "initial" |
    "revert" |
    "revert - laye" |
    "unset", top?: number, right?: number, bottom?: number, left?: number) => {
    return css`
        position: ${position};
        top: ${top}px;
        right: ${right}px;
        bottom: ${bottom}px;
        left: ${left}px;
    `
}
