/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import { useTheme  } from '@emotion/react'
import { transparentize } from "polished";

const ProgressBar = ({ value, max }) => {
  const theme = useTheme();
  const percentage = (value / max) * 100;

  return (
    <div
      css={css`
        display: flex;
        height: 5px;
      `}
    >
      <div
        css={css`
          flex-basis: ${percentage}%;
          background: ${theme.colors.darkBlue};
        `}
      />
      <div
        css={css`
          background: ${transparentize(0.9, theme.colors.darkBlue)};
          flex-grow: 1;
        `}
      />
    </div>
  );
};

export default ProgressBar;
