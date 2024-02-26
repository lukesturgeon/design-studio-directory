/** @jsxImportSource @emotion/react */

import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { jsx, css } from "@emotion/core";
import { useTheme } from '@emotion/react';
import { motion, useViewportScroll, useTransform } from "framer-motion";

import Constraint from "./Constraint";
import Heading from "./Heading";
import VerticalSpace from "./VerticalSpace";
import useBreakpoint from "./useBreakpoint";

const LogoAnchor = React.forwardRef((props, ref) => {
  const breakpoint = useBreakpoint();

  return (
    <Heading level={1} size={breakpoint.gte("md") ? 1.3 : 1} weight={600}>
      Design Studio Directory
    </Heading>
  );
});

const Header = ({ children }) => {
  const theme = useTheme();
  const breakpoint = useBreakpoint();

  const { scrollY } = useViewportScroll();

  const inRange = [0, 500];

  const translateY = useTransform(scrollY, inRange, [0, 150]);
  const opacity = useTransform(scrollY, inRange, [0.25, 0]);

  return (
    <header
      style={{
        textAlign: "center",
        backgroundColor: theme.colors.darkBlue,
        color: theme.colors.light,
        position: "relative",
        overflowX: "hidden"
      }}
    >
      <motion.div
        style={{
          fontSize: "11rem",
          color: theme.colors.lightBlue,
          fontWeight: 700,
          textAlign: "left",
          lineHeight: 0.9,
          position: "absolute",
          top: `-5rem`,
          left: "50%",
          whiteSpace: "nowrap",
          translateX: "-50%",
          translateY,
          opacity,
          userSelect: "none"
        }}
      >
        Design Studio
        <br /> Directory
      </motion.div>
      <Constraint
        style={{
          position: "relative",
          zIndex: 1
        }}
      >
        <div
          style={{
            paddingTop: `4rem`
          }}
        >
          <Link href="/" style={{textDecoration: "none"}}>
            <LogoAnchor />
          </Link>
        </div>
        <div
          style={{
            height: breakpoint.gte("md") ? 400 : 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            maxWidth: 750,
            margin: "0 auto"
          }}
          
        >
          {children}
          {breakpoint.gte("md") && <VerticalSpace size="2rem" />}
        </div>
      </Constraint>
    </header>
  );
};

Header.propTypes = {
  intro: PropTypes.string
};

export default Header;

/* css={props => css`
            ${props.mq.md} {
              paddingbottom: "2rem";
            }
          `}*/