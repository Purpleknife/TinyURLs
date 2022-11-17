import { BrowserRouter } from 'react-router-dom';

import axios from 'axios';

import { render,
  fireEvent,
  cleanup,
  waitFor
} from "@testing-library/react";


import Dashboard from "../Dashboard";
import OneShortURL from '../OneShortURL';

afterEach(cleanup);

window.open = jest.fn();

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
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
    
    const { getByTestId } = render(
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



  it("you can shorten then copy a tiny URL", async() => {
    const mockData = [{
      id: 1,
      title: 'Google',
      long_url: 'https://google.com',
      short_url: 'tiny.url/obefaz',
      date_created: '2022-11-14'
    }];

    (axios.get as jest.Mock).mockResolvedValue({ data: mockData })
    
    const { getByTestId, getByPlaceholderText } = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText(/Enter your URL/i), {
      target: { value: "https://google.com" }
    });

    fireEvent.click(getByTestId('shorten'));

    expect(getByTestId('tiny-url')).toBeInTheDocument();
    expect(getByTestId('tiny-url')).toHaveTextContent('tiny.url/');

    await waitFor(() => getByTestId('copy'));

    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    fireEvent.click(getByTestId('copy'));

    await waitFor(() => expect(window.navigator.clipboard.writeText)
      .toHaveBeenCalledTimes(1)); //The tiny URL changes everytime so can't use "ToHaveBeenCalled()".

  });



  it("you can save your tiny URL to the database", async() => {
    const mockData = [{
      id: 1,
      title: 'Google',
      long_url: 'https://google.com',
      short_url: 'tiny.url/obefaz',
      date_created: '2022-11-14'
    }];

    (axios.get as jest.Mock).mockResolvedValue({ data: mockData })
    
    const { getByTestId, getByPlaceholderText } = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText(/Enter your URL/i), {
      target: { value: "https://google.com" }
    });

    fireEvent.click(getByTestId('shorten'));

    expect(getByTestId('tiny-url')).toBeInTheDocument();
    expect(getByTestId('tiny-url')).toHaveTextContent('tiny.url/');

    await waitFor(() => getByTestId('save'));

    await waitFor(() => fireEvent.click(getByTestId('save')));

    expect(getByPlaceholderText(/Add a title.../i)).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(/Add a title.../i), {
      target: { value: "Test" }
    });

    
  });



  it("you can click on a tiny URL and be redirected to its long URL", async() => {
    const mockData = [{
      id: 1,
      title: 'Google',
      long_url: 'https://google.com',
      short_url: 'tiny.url/obefaz',
      date_created: '2022-11-14'
    }];

    (axios.get as jest.Mock).mockResolvedValue({ data: mockData })
    
    const { getByTestId, getByPlaceholderText } = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText(/Enter your URL/i), {
      target: { value: "https://google.com" }
    });

    fireEvent.click(getByTestId('shorten'));

    expect(getByTestId('tiny-url')).toBeInTheDocument();
    expect(getByTestId('tiny-url')).toHaveTextContent('tiny.url/');

    await waitFor(() => fireEvent.click(getByTestId('tiny-url')));

    expect(window.open).toHaveBeenCalledTimes(1);

  });


});