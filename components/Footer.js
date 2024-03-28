/** @jsxImportSource @emotion/react */

import React from "react";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import { useTheme } from "@emotion/react";

import Constraint from "./Constraint";
import { TwitterLogo } from "./icons";
import useBreakpoint from "./useBreakpoint";

const PlainAnchor = styled.a`
  text-decoration: none;
  text-decoration-skip-ink: auto;

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    ${(props) => props.theme.getFocusStyle(props.theme.colors.darkBlue)};
  }
`;

const Anchor = styled.a`
  text-decoration-skip-ink: auto;

  &:focus {
    ${(props) => props.theme.getFocusStyle(props.theme.colors.darkBlue)};
  }
`;

const Footer = () => {
  const theme = useTheme();
  const breakpoint = useBreakpoint();

  return (
    <footer
      style={{
        backgroundColor: theme.colors.yellow,
      }}
    >
      <Constraint
        css={css`
          max-width: 660px;
        `}
      >
        <div
          style={{
            padding: `${breakpoint.gte("md") ? "6rem" : "4rem"} 0`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PlainAnchor
            href="https://docs.google.com/forms/d/e/1FAIpQLSfYA7R6miiaLgHyuqIXjgXhO5I_B5AcjMyMW40wuX8Q36O5EA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontWeight: 600,
              fontSize: breakpoint.gte("md") ? "1.5rem" : "1.2rem",
            }}
          >
            Suggest a studio
          </PlainAnchor>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: breakpoint.gte("md") ? "row" : "column",
            paddingBottom: `4rem`,
            textAlign: "center",
            fontSize: "0.8rem",
          }}
        >
          <div>
            A project from{" "}
            <Anchor href="https://studionoel.co.uk/">Studio Noel</Anchor>
          </div>

          <div>
            <PlainAnchor
              href="https://twitter.com/DesignStudioDir"
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              <TwitterLogo
                css={css`
                  height: 0.75em;
                  margin-right: 0.25em;
                `}
              />{" "}
              @DesignStudioDir
            </PlainAnchor>
          </div>
        </div>
      </Constraint>
    </footer>
  );
};

export default Footer;
