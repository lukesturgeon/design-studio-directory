

import React from "react";
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";

import Studio from "./Studio";

const StudiosContainer = styled.div`
  @media only screen and (min-width: 800px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StudiosGrid = ({ studios, ...props }) => (
  <StudiosContainer {...props}>
    {studios.map(studio => (
      <Studio key={studio.id} {...studio} />
    ))}
  </StudiosContainer>
);

export default StudiosGrid;
