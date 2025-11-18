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