import { cleanup } from "@testing-library/react";

import { generateRandomShortURL } from './helpers';

afterEach(cleanup);

describe("helpers", () => {
  it("returns a string", () => {
    const result = generateRandomShortURL();

    expect(typeof result).toEqual('string');
  });


  it("returns a random string that includes `tiny.url/`", () => {
    const result = generateRandomShortURL();

    expect(result).toContain('tiny.url/');
  });


  it("the random characters that get added to `tiny.url/` should be 6 in total", () => {
    const result = generateRandomShortURL();
    const newResult = result.replace('tiny.url/', '');

    expect(newResult.length).toEqual(6);
  });

});