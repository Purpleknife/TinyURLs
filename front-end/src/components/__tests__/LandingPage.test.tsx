import { BrowserRouter } from 'react-router-dom';

import { render, cleanup, fireEvent, getByText, getByLabelText, queryByLabelText } from "@testing-library/react";

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


  it("it should display a Login button", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    expect(getByTestId('login')).toBeInTheDocument();
  });


  it("it should display a Register button", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    expect(getByTestId('register')).toBeInTheDocument();
  });


  it("it should open a popup form when you click on Login button", () => {
    const { getByTestId, getByLabelText } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    const button = getByTestId('login');

    fireEvent.click(button);

    expect(getByLabelText("Email address:")).toBeInTheDocument();
    expect(getByLabelText("Password:")).toBeInTheDocument();
  });


  it("it should open a popup form when you click on Register button", () => {
    const { getByTestId, getByLabelText } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    const button = getByTestId('register');

    fireEvent.click(button);

    expect(getByLabelText("Username:")).toBeInTheDocument();
    expect(getByLabelText("Email address:")).toBeInTheDocument();
    expect(getByLabelText("Password:")).toBeInTheDocument();
    expect(getByLabelText("Password confirmation:")).toBeInTheDocument();
  });


  it("it should close the popup Login form when you click on close button", () => {
    const { getByTestId, getByLabelText, queryByLabelText } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    const button = getByTestId('login');

    fireEvent.click(button);

    expect(getByLabelText("Email address:")).toBeInTheDocument();
    expect(getByLabelText("Password:")).toBeInTheDocument();

    const otherButton = getByLabelText('Close', {selector: 'button'});

    fireEvent.click(otherButton);

    expect(queryByLabelText("Email address")).toBeNull();
    expect(queryByLabelText("Password")).toBeNull();
  });


  it("it should close the popup Register form when you click on close button", () => {
    const { getAllByTestId, getByLabelText, getAllByLabelText, queryByLabelText } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    const button = getAllByTestId('register');

    fireEvent.click(button[0]);

    expect(getByLabelText("Username:")).toBeInTheDocument();
    expect(getByLabelText("Email address:")).toBeInTheDocument();
    expect(getByLabelText("Password:")).toBeInTheDocument();
    expect(getByLabelText("Password confirmation:")).toBeInTheDocument();

    const otherButton = getAllByLabelText('Close', {selector: 'button'});

    fireEvent.click(otherButton[0]);

    expect(queryByLabelText("Username")).toBeNull();
    expect(queryByLabelText("Email address")).toBeNull();
    expect(queryByLabelText("Password")).toBeNull();
    expect(queryByLabelText("Password confirmation")).toBeNull();
  });


});