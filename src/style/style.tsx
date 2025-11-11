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