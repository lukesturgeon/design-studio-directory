/** @jsxImportSource @emotion/react */

import React from "react";
import PropTypes from "prop-types";
import { css, jsx } from "@emotion/core";

const Heading = ({
  size = 1,
  weight = 300,
  lineHeight = 1,
  level,
  color,
  children
}) => {
  const HeadingTag = `h${level}`;

  return (
    <HeadingTag
      css={css`
        font-weight: ${weight};
        font-size: ${size}rem;
        line-height: ${lineHeight};
        margin: 0;
        color: ${color};
      `}
      children={children}
    />
  );
};

Heading.propTypes = {
  size: PropTypes.number,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  weight: PropTypes.oneOf([300, 600]),
  children: PropTypes.node
};

export default Heading;