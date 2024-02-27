

import React from "react";
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";
import { useTheme } from '@emotion/react';

import Heading from "./Heading";
import { TwitterLogo, ExtneralLink } from "./icons";

const StudioItem = styled.div`
  position: relative;

  .studio__link {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.light};
    color: ${({ theme }) => theme.colors.darkBlue};
    border: 1px solid ${({ theme }) => theme.colors.darkBlue};
    text-align: left;
    margin: 0 -1px -1px 0;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease-in-out;

    &:hover,
    &:focus {
      outline: 0;
      background-color: ${({ theme }) => theme.colors.darkBlue};
      color: ${({ theme }) => theme.colors.light};
      box-shadow: none;
    }
  }

  .studio__image {
    max-width: 100%;
    padding: 1rem;
    padding-bottom: 0;
  }

  .studio__details {
    padding: 1rem;
    height: 4rem;

    h3 {
      margin-bottom: 0.25rem;
    }
  }

  .studio__icon {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 4rem;
    padding: 1rem;
    cursor: pointer;

    svg {
      display: block;
      width: 1rem;
    }

    .studio__ic-link {
      pointer-events: none;
    }

    .studio__ic-twitter {
      fill: ${({ theme }) => theme.colors.lightGrey};
      opacity: 0.5;
      transition: all 0.2s ease-in-out;
    }

    &:hover,
    &:focus {
      outline: 0;
      box-shadow: none;

      .studio__ic-twitter {
        fill: #3ba9ee;
        opacity: 1;
      }
    }
  }
`;

const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};

const Studio = ({ name, locations, url, twitterHandle, image }) => {
  const [isMouseOver, setIsMouseOver] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const theme = useTheme();

  return (
    <StudioItem>
      <a
        className="studio__link"
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        target="_blank"
        rel="noopener noreferrer"
        href={url}
      >
        {image && <img className="studio__image" src={image} alt="" />}
        <span className="studio__details">
          <Heading level={3} size={1} weight={300}>
            {name}
          </Heading>
          <Heading
            level={4}
            size={0.65}
            weight={300}
            color={theme.colors.lightGrey}
          >
            <span>
              {truncateString(
                locations.map(location => location.city).join(" · "),
                30
              )}
            </span>
          </Heading>
        </span>
        <span className="studio__icon">
          {(isMouseOver || isFocused) && (
            <ExtneralLink className="studio__ic-link" />
          )}
        </span>
      </a>
      {twitterHandle && (
        <a
          className="studio__icon"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://twitter.com/${twitterHandle}`}
        >
          {isMouseOver || isFocused ? (
            <ExtneralLink className="studio__ic-link" />
          ) : (
            <TwitterLogo className="studio__ic-twitter" />
          )}
        </a>
      )}
    </StudioItem>
  );
};

export default Studio;
