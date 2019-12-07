import React from "react";
import styled from "@emotion/styled";
import Downshift from "downshift";
import VisuallyHidden from "../VisuallyHidden";

const sizes = {
  LARGE: 100,
  SMALL: 75
};

const Input = styled.input`
  width: 350px;
  height: ${props => (props.isCompact ? sizes.SMALL : sizes.LARGE)}px;
  padding: 2rem;
  border-radius: 0;
  border: none;
  background-color: ${props => (!props.isCompact ? "#242F47" : "#1A2233")};
  color: white;
  font-weight: 600;

  &::placeholder {
    color: white;
    font-weight: 600;
    opacity: ${props => (props.isCompact ? 0.25 : undefined)};
  }
`;

const ArrowIcon = props => (
  <svg height="20" width="20" viewBox="0 0 20 20" role="img" {...props}>
    <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
  </svg>
);

const Select = ({
  disabled,
  label,
  options = [],
  onChange = Function.prototype,
  onOpen = Function.prototype,
  onClose = Function.prototype,
  isCompact
}) => {
  const handleStateChange = changes => {
    if (changes.isOpen === true) {
      return onOpen();
    }

    if (changes.isOpen === false) {
      return onClose();
    }
  };

  return (
    <div>
      <Downshift onChange={onChange} onStateChange={handleStateChange}>
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          getToggleButtonProps,
          isOpen,
          highlightedIndex,
          selectedItem
        }) => (
          <div
            style={{
              position: "relative",
              top: isCompact ? (sizes.LARGE - sizes.SMALL) / 2 : undefined
            }}
          >
            <VisuallyHidden>
              <label {...getLabelProps()}>{label}</label>
            </VisuallyHidden>
            <button
              {...getToggleButtonProps({
                "aria-label": isOpen ? "close menu" : "open menu"
              })}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                width: "100%",
                background: "none",
                cursor: !disabled ? "pointer" : "auto",
                border: "none"
              }}
              disabled={disabled}
            />
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
                pointerEvents: "none"
              }}
            />
            <Input
              {...getInputProps({
                disabled: true
              })}
              placeholder={label}
              isCompact={isCompact}
            />
            <ul
              {...getMenuProps()}
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                margin: 0
              }}
            >
              {isOpen &&
                options.map((item, index) => (
                  <li
                    {...getItemProps({
                      key: item,
                      index,
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? "lightgray" : null,
                        fontWeight: selectedItem === item ? "bold" : "normal",
                        cursor: "pointer"
                      }
                    })}
                  >
                    {item}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </Downshift>
    </div>
  );
};

export default Select;
