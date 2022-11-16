import { BrowserRouter } from 'react-router-dom';

import axios from 'axios';

import { render, 
  cleanup,
  waitFor
} from "@testing-library/react";


import Dashboard from "../Dashboard";

afterEach(cleanup);

jest.mock('axios');

describe("Dashboard", () => {
  it("loads the user's data => their saved short URLs", async() => {
    const mockData = [{
      id: 1,
      title: 'Google',
      long_url: 'https://google.com',
      short_url: 'tiny.url/obefaz',
      date_created: '2022-11-14'
    }];

    (axios.get as jest.Mock).mockResolvedValue({ data: mockData })

    const { getByTestId } = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => getByTestId('short_url'));

    expect(getByTestId('short_url')).toBeInTheDocument();
    expect(getByTestId('short_url')).toHaveTextContent('tiny.url/');
  });


  it("throws an error when the data is not loaded", async() => {
    
    const logSpy = jest.spyOn(console, 'log');
    const err = new Error('Data not loaded.');

    console.log(err);

    (axios.get as jest.Mock).mockRejectedValueOnce(err);

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(logSpy).toHaveBeenCalledWith(err);
    
  });


});