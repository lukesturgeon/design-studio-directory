/** @jsxImportSource @emotion/react */

import React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useTheme  } from '@emotion/react'

import { getData } from "../../../dataHelpers/store";
import Constraint from "../../../components/Constraint";
import Header from "../../../components/Header";
import Heading from "../../../components/Heading";
import SEO from "../../../components/SEO";
import { Layout } from "../../../components/Layout";
import StudiosGrid from "../../../components/StudiosGrid";
import VerticalSpace from "../../../components/VerticalSpace";
import useBreakpoint from "../../../components/useBreakpoint";
import Select from "../../../components/Select";
import ProgressBar from "../../../components/ProgressBar";

const RESULTS_PER_PAGE = 30;

const constraint = css`
  text-align: center;
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.lightYellow};
`;

const defaultButtonStyles = `
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 0 2rem;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.66rem;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
`;

const ButtonAnchor = React.forwardRef(({ type = "primary", ...props }, ref) => {
  const theme = useTheme();

  const getButtonStyles = () => {
    if (type === "primary") {
      return `
        color: ${theme.colors.yellow};
        border: 1px solid ${theme.colors.yellow};
    
        &:hover,
        &:focus {
          box-shadow: none;
          color: ${theme.colors.darkBlue};
          background-color: ${theme.colors.yellow};
        }
      `;
    }
    if (type === "secondary") {
      return `
        color: ${theme.colors.darkBlue};
        border: 1px solid ${theme.colors.darkBlue};

        &:hover,
        &:focus {
          box-shadow: none;
          color: ${theme.colors.yellow};
          background-color: ${theme.colors.darkBlue};
        }
      `;
    }
  };

  return (
    <a
      ref={ref}
      href={"/"}
      css={css`
        ${defaultButtonStyles}
        ${getButtonStyles()}
      `}
      {...props}
    />
  );
});

const ResultsPage = ({ studios, city, country, locations }) => {
  const router = useRouter();

  const breakpoint = useBreakpoint();

  // Pagination
  const [currentPage, setCurrentPage] = React.useState(0);
  const currentStudios = studios.slice(
    0,
    currentPage * RESULTS_PER_PAGE + RESULTS_PER_PAGE
  );

  const hasResults = city && country && studios.length > 0;

  if (!hasResults) {
    return (
      <Layout
        header={
          <Header>
            <Heading level={2} size={1.9} lineHeight={1.5} weight={300}>
              No studios found
            </Heading>
            <VerticalSpace size="3rem" />
          </Header>
        }
      >
        <SEO
          title="No studios found"
          url={`https://designstudio.directory/${country}/${city}`}
        />
        <Container>
          <Constraint css={constraint}>
            <VerticalSpace size="5rem" />
              <ButtonAnchor type="secondary">Back to Homepage</ButtonAnchor>
            <VerticalSpace size="5rem" />
          </Constraint>
        </Container>
      </Layout>
    );
  }

  const cityOptions = country ? [...locations[country]].sort() : [];

  const handleCityChange = (selectedItem) => {
    router.push(
      `/results/[country]/[city]`,
      `/results/${country}/${selectedItem}`
    );
  };

  return (
    <Layout
      header={
        <Header>
          <div>
            <Heading
              level={3}
              size={breakpoint.gte("md") ? 1.9 : 1.2}
              lineHeight={1.5}
              weight={300}
            >
              Here’s a list of studios in
            </Heading>
            <Heading
              level={2}
              size={breakpoint.gte("md") ? 1.9 : 1.2}
              lineHeight={1.5}
              weight={600}
            >
              {city}, {country}
            </Heading>
          </div>
          <VerticalSpace size="3rem" />
        </Header>
      }
    >
      <SEO
        title={`Studios in ${city}, ${country}`}
        url={`https://designstudio.directory/${country}/${city}`}
      />
      <div
        css={(props) => css`
          display: flex;
          flex-direction: column;
          width: 100%;
          align-items: center;
          position: absolute;
          transform: translateY(-50%);
          z-index: 1;
        `}
      >
        <div
          css={(props) => css`
            position: absolute;
            transform: translateY(-100%);
            padding-bottom: 1rem;
            z-index: 1;
            color: white;
            font-size: 0.66rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            font-weight: 500;
          `}
        >
          Change city
        </div>
        <Select
          id="city-combo"
          label="Change city"
          noOptionsMessage="No cities found"
          options={cityOptions}
          onChange={handleCityChange}
          initialSelectedItem={city}
          isCompact={false}
          css={(props) => css`
            max-width: 90%;
            margin: 0 auto;
            ${props.mq.md} {
              max-width: 100%;
            }
          `}
        />
      </div>
      <Container>
        <Constraint css={constraint}>
          <VerticalSpace size="5rem" />

          <StudiosGrid studios={currentStudios} />

          <VerticalSpace size="2.5rem" />

          {studios.length > RESULTS_PER_PAGE &&
            currentStudios.length < studios.length && (
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  width: 250px;
                  margin: 0 auto;
                `}
              >
                <div
                  css={css`
                    font-size: 0.66rem;
                  `}
                >
                  Showing {currentStudios.length} of {studios.length}
                </div>
                <VerticalSpace size="1rem" />
                <ProgressBar
                  value={currentStudios.length}
                  max={studios.length}
                />
                <VerticalSpace size="1rem" />
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  css={css`
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    font-size: 0.66rem;
                    cursor: pointer;
                    background: none;
                    border: none;
                    font-weight: 600;
                  `}
                >
                  Load more
                </button>
              </div>
            )}

          <VerticalSpace size="2.5rem" />

          <ButtonAnchor type="secondary">Back to Homepage</ButtonAnchor>

          <VerticalSpace size="5rem" />
        </Constraint>
      </Container>
    </Layout>
  );
};

ResultsPage.getInitialProps = async ({ reduxStore, req, query }) => {
  const { dispatch } = reduxStore;

  await dispatch(getData());

  const { studios } = reduxStore.getState();
  const { city, country } = query;

  const isSelectedLocation = (location) =>
    location.country === country && location.city === city;

  const filteredStudios = studios
    .filter((studio) =>
      // Only show studios in the selected location
      studio.locations.some((location) => isSelectedLocation(location))
    )
    .map((studio) => {
      // Move selected location to the start of the list
      const locations = studio.locations.sort((a, b) =>
        isSelectedLocation(a) ? -1 : isSelectedLocation(b) ? 1 : 0
      );

      return {
        ...studio,
        locations,
      };
    });

  return { studios: filteredStudios, city, country };
};

function mapStateToProps({ locations }) {
  return { locations };
}

export default connect(mapStateToProps)(ResultsPage);
