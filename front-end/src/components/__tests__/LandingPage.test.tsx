import { BrowserRouter } from 'react-router-dom';

import { render, cleanup } from "@testing-library/react";

import LandingPage from "../LandingPage";

afterEach(cleanup);

describe("LandingPage", () => {
  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
  });

});