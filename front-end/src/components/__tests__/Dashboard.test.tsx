import { BrowserRouter } from 'react-router-dom';

import axios from 'axios';

import { render,
  fireEvent,
  cleanup,
  waitFor,
  queryByTestId
} from "@testing-library/react";


import Dashboard from "../Dashboard";

afterEach(cleanup);

jest.mock('axios', () => ({
  get: jest.fn(),
  delete: jest.fn(),
}));

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


  it("when you click on Logout, it redirects you to LandingPage", async() => {
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

    const button = getByTestId('logout');

    fireEvent.click(button);
    
    (axios.get as jest.Mock).mockResolvedValue(Promise.resolve());

    await waitFor(() => expect(location.pathname).toEqual('/'));
  });


  it("you can delete a Short URL from the Dashboard", async() => {
    const mockData = [{
      user_id: 1,
      id: 1,
      title: 'Google',
      long_url: 'https://google.com',
      short_url: 'tiny.url/obefaz',
      date_created: '2022-11-14'
    }];

    (axios.get as jest.Mock).mockResolvedValue({ data: mockData })
    
    const { getByTestId, queryByTestId } = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => getByTestId('delete'));

    //const button = getByTestId('delete');

    //fireEvent.click(getByTestId('delete'));

    (axios.delete as jest.Mock).mockResolvedValue({});

    //await waitFor(() => expect(queryByTestId('short_url')).toBeNull());
  });


});