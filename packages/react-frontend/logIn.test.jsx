import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
//import { jest } from "@jest/globals";
//import fetchMock from "jest-fetch-mock";
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { Login } from "./src/LogIn";

test("renders the empty form correctly", () => {
  //account for routing:
  render(
    <Router>
      <Login />
    </Router>,
  );

  expect(screen.getByLabelText("Username")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
  expect(screen.getAllByText("Log In")[0]).toBeInTheDocument();
  expect(screen.getAllByText("Log In")[1]).toBeInTheDocument();
  expect(screen.getByText("Don’t have an account?")).toBeInTheDocument();
  expect(screen.getByText("Sign up")).toBeInTheDocument();
});

test("accepts form input", () => {
  render(
    <Router>
      <Login />
    </Router>,
  );
  let input = screen.getByLabelText("Username");
  let tmp = "myUsername";
  fireEvent.change(input, { target: { value: tmp } });
  expect(input).toHaveValue(tmp);

  input = screen.getByLabelText("Password");
  tmp = "myPass";
  fireEvent.change(input, { target: { value: tmp } });
  expect(input).toHaveValue(tmp);
});

test("empty input", async () => {
  render(
    <Router>
      <Login />
    </Router>,
  );
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

test("failed login", async () => {
  render(
    <Router>
      <Login />
    </Router>,
  );

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
  render(
    <Router>
      <Login />
    </Router>,
  );

  let input = screen.getByLabelText("Username");
  let tmp = "testingworld";
  fireEvent.change(input, { target: { value: tmp } });
  input = screen.getByLabelText("Password");
  fireEvent.change(input, { target: { value: tmp } });

  fetch.mockResponseOnce(JSON.stringify({ status: 200, ok: true }));

  const button = screen.getByRole("button", { type: "submit" });
  fireEvent.click(button);

  // expect(await screen.findByText("Seller Dashboard")).toBeInTheDocument();
});
