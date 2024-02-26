/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import { useTheme } from '@emotion/react';
import Downshift from "downshift";
import { transparentize } from "polished";

import VisuallyHidden from "./VisuallyHidden";

const sizes = {
  LARGE: 100,
  SMALL: 75,
};

const Input = styled.input`
  width: 100%;
  height: ${(props) => (props.isCompact ? sizes.SMALL : sizes.LARGE)}px;
  padding: 2rem;
  border-radius: 0;
  border: none;
  background-color: ${(props) =>
    props.isCompact ? props.theme.colors.blue : props.theme.colors.lightBlue};
  color: white;
  font-weight: 600;
  opacity: 1;

  &::placeholder {
    color: ${(props) => transparentize(props.isCompact ? 0.75 : 0, "#ffffff")};
    font-weight: ${(props) => (props.isOpen ? 400 : 600)};
  }
`;

const ArrowIcon = (props) => (
  <svg height="20" width="20" viewBox="0 0 20 20" role="img" {...props}>
    <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
  </svg>
);

const Select = ({
  disabled,
  label,
  id,
  options = [],
  initialSelectedItem,
  noOptionsMessage = "No options found",
  onChange = Function.prototype,
  onOpen = Function.prototype,
  onClose = Function.prototype,
  isCompact,
  className,
}) => {
  const theme = useTheme();

  const handleStateChange = (changes) => {
    if (changes.isOpen === true) {
      return onOpen();
    }

    if (changes.isOpen === false) {
      return onClose();
    }
  };

  return (
    <Downshift
      id={id}
      onChange={onChange}
      onStateChange={handleStateChange}
      initialSelectedItem={initialSelectedItem}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        openMenu,
        inputValue,
        isOpen,
        highlightedIndex,
        selectedItem,
        setState,
      }) => {
        const filteredOptions = options.filter(
          (item) =>
            !inputValue || item.toLowerCase().includes(inputValue.toLowerCase())
        );

        const handleActive = () => {
          openMenu();
          setState({
            inputValue: '',
          });
        };

        return (
          <div
            style={{
              position: "relative",
            }}
            className={className}
          >
            <VisuallyHidden>
              <label {...getLabelProps()}>{label}</label>
            </VisuallyHidden>
            <ArrowIcon
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                right: "2rem",
                fill: "white",
                marginRight: "-2%",
                opacity: isCompact ? 0.25 : undefined,
                transform: `translateY(-50%) scaleY(${isOpen ? -1 : 1})`,
                pointerEvents: "none",
              }}
            />
            <Input
              {...getInputProps({
                onFocus: handleActive,
                onClick: handleActive,
                disabled,
              })}
              isOpen={isOpen}
              placeholder={isOpen ? "Scroll or start typing..." : label}
              isCompact={isCompact}
            />
            <ul
              {...getMenuProps()}
              css={css`
                position: absolute;
                z-index: 1;
                top: 100%;
                left: 0;
                margin: 0;
                background-color: ${theme.colors.lightBlue};
                width: 100%;
                color: ${theme.colors.light};
                max-height: 375px;
                overflow-y: scroll;
                list-style: none;
                margin: 0;
                padding: 0;
                height: ${isOpen ? "auto" : 0};
              `}
            >
              {isOpen &&
                (filteredOptions.length ? (
                  filteredOptions.map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index
                              ? theme.colors.blue
                              : null,
                          fontWeight: selectedItem === item ? "bold" : "normal",
                          cursor: "pointer",
                        },
                      })}
                      css={css`
                        padding: 0.3rem 2rem;
                      `}
                    >
                      {item}
                    </li>
                  ))
                ) : (
                  <span
                    css={css`
                      padding: 0.3rem 2rem;
                    `}
                  >
                    {noOptionsMessage}
                  </span>
                ))}
            </ul>
          </div>
        );
      }}
    </Downshift>
  );
};

export default Select;
