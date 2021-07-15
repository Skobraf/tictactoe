import React from "react";

import {
  createEvent,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react";

import App from "./App";

describe("App", () => {
  const renderApp = () => {
    const utils = render(<App />);

    function getPageContainer() {
      return {
        parent: utils.queryByTestId("page-container"),
        homepage: utils.queryByText("Homepage Content"),
        cartpage: utils.queryByText("Cart Page content"),
      };
    }

    function getTabsNavs() {
      return {
        parent: utils.queryByTestId("tabs-navs"),
        productsNav: utils.queryByText("Products"),
        cartNav: utils.queryByText("Cart"),
        homeNav: utils.queryByText("Home"),
      };
    }

    function clickOnTab() {
      return {
        productsNav: utils.getByText("Products"),
        cartNav: utils.getByText("Cart"),
        homeNav: utils.getByText("Home"),
      };
    }

    return {
      getTabsNavs,
      getPageContainer,
      clickOnTab,
      ...utils,
    };
  };

  it("should render tabs", () => {
    const { getTabsNavs } = renderApp();
    const tabsNavs = getTabsNavs();

    expect(tabsNavs.parent).toBeVisible();
  });

  it("should only show the active tab", async () => {
    const { clickOnTab, getPageContainer } = renderApp();

    // Toggle cart page
    fireEvent(clickOnTab().cartNav, createEvent.click(clickOnTab().cartNav));

    await waitFor(() => {
      const pageContainer = getPageContainer();
      return expect(pageContainer.cartpage).toBeVisible();
    });

    await waitFor(() => {
      const pageContainer = getPageContainer();
      return expect(pageContainer.homepage).toBeNull();
    });

    // Toggle homepage
    fireEvent(clickOnTab().homeNav, createEvent.click(clickOnTab().homeNav));

    await waitFor(() => {
      const pageContainer = getPageContainer();
      return expect(pageContainer.cartpage).toBeNull();
    });

    await waitFor(() => {
      const pageContainer = getPageContainer();
      return expect(pageContainer.homepage).toBeVisible();
    });
  });
});

