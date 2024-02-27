import React from "react";
import App from "next/app";
import {  ThemeProvider } from '@emotion/react'
import { Provider } from "react-redux";

import withStore from "../dataHelpers/withStore";
import { BreakpointProvider } from "../components/useBreakpoint";

import theme from "../components/theme";

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Provider store={reduxStore}>
        <ThemeProvider theme={theme}>
          <BreakpointProvider>
            <Component {...pageProps} />
          </BreakpointProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withStore(MyApp);
