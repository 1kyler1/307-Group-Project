import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Login } from "./src/LogIn";
/*
import { AuthProvider } from "./src/auth/AuthProvider.jsx";
const mockAuth = jest.fn(() => ({
	user: "whatever",
}));
jest.mock("./src/auth/useAuth.js", () => ({
	useAuth: mockAuth,
}));

beforeEach(() => {mockAuth.mockReset();});
*/

beforeEach(() => {
  render(
    <Router>
      <Login />
    </Router>,
  );
});
test("renders the empty form correctly", () => {
  expect(screen.getByLabelText("Username")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
  expect(screen.getAllByText("Log In")[0]).toBeInTheDocument();
  expect(screen.getAllByText("Log In")[1]).toBeInTheDocument();
  expect(screen.getByText("Don’t have an account?")).toBeInTheDocument();
  expect(screen.getByText("Sign up")).toBeInTheDocument();
});

test("accepts form input", () => {
  let input = screen.getByLabelText("Username");
  let tmp = "myUsername";
  fireEvent.change(input, { target: { value: tmp } });
  expect(input).toHaveValue(tmp);

  input = screen.getByLabelText("Password");
  tmp = "myPass";
  fireEvent.change(input, { target: { value: tmp } });
  expect(input).toHaveValue(tmp);
});

test("empty input in both or one", async () => {
  let input = screen.getByLabelText("Username");
  let tmp = "";
  fireEvent.change(input, { target: { value: tmp } });
  expect(input).toHaveValue(tmp);
  input = screen.getByLabelText("Password");
  fireEvent.change(input, { target: { value: tmp } });
  expect(input).toHaveValue(tmp);

  //both empty
  const button = screen.getByRole("button", { type: "submit" });
  fireEvent.click(button);
  expect(
    await screen.findByText("Username and password cannot be empty."),
  ).toBeInTheDocument();

  //only user empty
  fireEvent.change(input, { target: { value: "wowzaaaaa" } });
  fireEvent.click(button);
  expect(
    await screen.findByText("Username and password cannot be empty."),
  ).toBeInTheDocument();

  //only password empty
  fireEvent.change(input, { target: { value: tmp } });
  input = screen.getByLabelText("Username");
  fireEvent.change(input, { target: { value: "wowzaaaaa" } });
  fireEvent.click(button);
  expect(
    await screen.findByText("Username and password cannot be empty."),
  ).toBeInTheDocument();
});

test("failed login: incorrect credentials", async () => {
  let input = screen.getByLabelText("Username");
  let tmp = "testingworld";
  fireEvent.change(input, { target: { value: tmp } });
  input = screen.getByLabelText("Password");
  fireEvent.change(input, { target: { value: tmp } });

  fetch.mockResponseOnce(
    JSON.stringify({
      status: 401,
      ok: false,
      // body: { message: 'Invalid username or password.' }
      error: "Invalid username or password.",
    }),
  );

  const button = screen.getByRole("button", { type: "submit" });
  fireEvent.click(button);

  expect(
    await screen.findByText("Invalid username or password."),
  ).toBeInTheDocument();
});

test("successful login", async () => {
  let input = screen.getByLabelText("Username");
  let tmp = "testingworld";
  fireEvent.change(input, { target: { value: tmp } });
  input = screen.getByLabelText("Password");
  fireEvent.change(input, { target: { value: tmp } });

  fetch.mockResponseOnce(JSON.stringify({ status: 200, ok: true }));

  const button = screen.getByRole("button", { type: "submit" });
  fireEvent.click(button);

  //expect(await screen.findByText("Seller Dashboard")).toBeInTheDocument();
});

test("failed login: server error message", async () => {
  const asyncMock = jest
    .fn()
    .mockResolvedValueOnce("first call")
    .mockRejectedValueOnce(new Error("Async error message"));
  await asyncMock();
  //  await asyncMock();

  let input = screen.getByLabelText("Username");
  let tmp = "testingworld";
  fireEvent.change(input, { target: { value: tmp } });
  input = screen.getByLabelText("Password");
  fireEvent.change(input, { target: { value: tmp } });

  const button = screen.getByRole("button", { type: "submit" });
  fireEvent.click(button);

  expect(await screen.findByText("Server error")).toBeInTheDocument();
});
