import { BrowserRouter } from 'react-router-dom';

import { render, cleanup} from "@testing-library/react";

import Login from "../Login";

afterEach(cleanup);

describe("Login", () => {

  const props = {
    show: false,
    handleClose: () => false
  };
  
  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <Login {...props} />
      </BrowserRouter>
    );
  });

});