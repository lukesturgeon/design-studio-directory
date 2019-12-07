/** @jsx jsx */
import React from "react";
import Router from "next/router";
import fetch from "isomorphic-unfetch";
import { jsx } from "@emotion/core";

import { Layout } from "../components/Layout";
import { RecentlyAdded } from "../components/RecentlyAdded";
import { Select } from "../components/Select";

import { getStudios, getCountries } from "../dataHelpers";

const IndexPage = ({ studios, countries }) => {
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [activeField, setActiveField] = React.useState(0);

  const countryOptions = Object.keys(countries);
  const cityOptions = selectedCountry ? countries[selectedCountry] : [];

  const handleCityChange = selectedItem => {
    Router.push(`/results?country=${selectedCountry}&city=${selectedItem}`);
  };

  React.useEffect(() => {
    if (selectedCountry) {
      setActiveField(1);
    }
  }, [selectedCountry]);

  return (
    <Layout>
      <div
        css={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          position: "absolute",
          transform: "translateY(-50%)",
          zIndex: 1
        }}
      >
        <Select
          label="Pick a country"
          onChange={selectedItem => setSelectedCountry(selectedItem)}
          options={countryOptions}
          isCompact={activeField !== 0}
          onOpen={() => setActiveField(0)}
          onClose={() => selectedCountry && setActiveField(1)}
        />
        <Select
          label="Pick a city"
          options={cityOptions}
          onChange={handleCityChange}
          isCompact={activeField !== 1}
          disabled={!Boolean(selectedCountry)}
          onOpen={() => setActiveField(1)}
        />
      </div>
      <RecentlyAdded studios={studios} />
    </Layout>
  );
};

IndexPage.getInitialProps = async () => {
  const apiUrl = "https://api.sheety.co/46c50c36-f98f-4270-812c-f78377b90306";

  const res = await fetch(apiUrl);
  const data = await res.json();

  const studios = getStudios(data);
  const countries = getCountries(studios);

  return { studios, countries };
};

export default IndexPage;
