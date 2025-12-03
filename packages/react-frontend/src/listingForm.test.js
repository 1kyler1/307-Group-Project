import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { jest } from "@jest/globals";
import fetchMock from "jest-fetch-mock";

import { NewItemFormPage } from "./CreateListingForum";
//import CreateAccount from "./createAccount";
//import Login from "./LogIn";
//console.log(typeof NewItemFormPage);

//fetchMock.enableMocks();

const testListing = {
  title: "test title",
  description: "test desc",
  location: "test loc",
  tags: ["tag 1", "tag 2", "tag 3"],
  contact: "test@test.com",
  gender: "misc",
  category: "top",
};

test("baseline - renders the empty form correctly", () => {
  render(<NewItemFormPage />);

  expect(screen.getByLabelText("Title")).toBeInTheDocument();
  expect(screen.getByLabelText("Description")).toBeInTheDocument();
  expect(screen.getByLabelText("Image")).toBeInTheDocument();
  expect(screen.getByLabelText("Location")).toBeInTheDocument();
  expect(screen.getByText("Gender")).toBeInTheDocument();
  expect(screen.getByText("Category")).toBeInTheDocument();
  expect(screen.getByLabelText("Tags")).toBeInTheDocument();
  expect(screen.getByLabelText("Email/Phone Number")).toBeInTheDocument();
  expect(screen.getByText("Submit")).toBeInTheDocument();
});

test("baseline - accepts form input", () => {
  render(<NewItemFormPage />);
  let input = screen.getByLabelText("Title");
  fireEvent.change(input, { target: { value: testListing.title } });
  expect(input).toHaveValue(testListing.title);

  input = screen.getByLabelText("Description");
  fireEvent.change(input, { target: { value: testListing.description } });
  expect(input).toHaveValue(testListing.description);

  input = screen.getByLabelText("Location");
  fireEvent.change(input, { target: { value: testListing.location } });
  expect(input).toHaveValue(testListing.location);

  input = screen.getByLabelText("Tags");
  fireEvent.change(input, { target: { value: testListing.tags } });
  expect(input).toHaveValue("tag 1,tag 2,tag 3");
  
  input = screen.getByLabelText("Email/Phone Number");
  fireEvent.change(input, { target: { value: testListing.contact } });
  expect(input).toHaveValue(testListing.contact);
});

/*
test("handles form submission (network error)", async () => {
  const mockUpdate = async (data) => {
    formData = data;
    console.log("mock update");
    console.log(data);
  };
  //global.alert = jest.fn();
  //jest.spyOn(window, "alert").mockImplementation(() => {});

  render(<NewItemFormPage handleSubmitClick={mockUpdate} />);
  let input = screen.getByLabelText("Title");
  fireEvent.change(input, { target: { value: testListing.title } });

  fetch.mockResponseOnce(JSON.stringify({ status: 500, ok: false }));

  fireEvent.click(screen.getByRole("button", { type: "submit" }));

  //expect(window.alert).toHaveBeenCalledWith("Failed to save item");
  //expect(window.alert).toHaveBeenCalledTimes(1);
  //jest.restoreAllMocks();
});
//if props return, else handlesubmitclick

test("handles form submission (success)", async () => {
  let formData = {};
  //const mockUpdate = jest.fn();
  const mockUpdate = (data) => {
    formData = data;
    console.log("mock update");
    console.log(data);
  };

  render(<NewItemFormPage handleSubmitClick={mockUpdate} />);

  let input = screen.getByLabelText("Title");
  fireEvent.change(input, { target: { value: testListing.title } });
  input = screen.getByLabelText("Description");
  fireEvent.change(input, { target: { value: testListing.description } });
  input = screen.getByLabelText("Location");
  fireEvent.change(input, { target: { value: testListing.location } });
  expect(input).toHaveValue(testListing.location);
  input = screen.getByLabelText("Tags");
  fireEvent.change(input, { target: { value: testListing.tags } });
  expect(input).toHaveValue("tag 1,tag 2,tag 3");

  fetch.mockResponseOnce(JSON.stringify({ status: 201, ok: true }));

  //const button = screen.getByRole("button", { type: "submit" });
  const button = screen.getByText("Submit");
  //fetch.mockResponseOnce(JSON.stringify({ status: 201, ok: true }));

  fireEvent.click(button);
  console.log("click: " + formData);
  console.log(formData);

  //expect(screen.getByText("Saved

  expect(formData).toHaveProperty("title", testListing.title);
  expect(formData).toHaveProperty("description", testListing.description);
  expect(formData).toHaveProperty("location", testListing.location);
  expect(formData).toHaveProperty("tags", testListing.tags);
});
*/