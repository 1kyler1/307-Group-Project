//fixing issue with react rounter interacting with jest
import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();