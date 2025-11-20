import React, { useState } from "react";
import { render, screen, fireEvent } from '@testing-library/react';

import { NewItemFormPage } from './CreateListingForum';
//import CreateAccount from "./createAccount";
//import Login from "./LogIn";

console.log(typeof NewItemFormPage);


test("baseline - renders the empty form correctly", () => {
	render(<NewItemFormPage />);
	
	expect(screen.getByLabelText("Title")).toBeInTheDocument();
	expect(screen.getByLabelText("Description")).toBeInTheDocument();
	expect(screen.getByText("Submit")).toBeInTheDocument();
});

const testListing = { 
	title: "test title",
	description: "test desc",
	location: "test loc",
	tags: ["tag 1", "tag 2", "tag 3"]
	};
	
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
});
/*
test("baseline - handles form submission", () => {
	let formData = {};
	const mockUpdate = (data) => {
		formData = data.body;
	};
	render(<NewItemFormPage handleSubmitClick={mockUpdate} />);
	
	let input = screen.getByLabelText("Title");
	fireEvent.change(input, { target: { value: testListing.title } });
	input = screen.getByLabelText("Description");
	fireEvent.change(input, { target: { value: testListing.description } });
	input = screen.getByLabelText("Location");
	fireEvent.change(input, { target: { value: testListing.location } });
	input = screen.getByLabelText("Tags");
	fireEvent.change(input, { target: { value: testListing.tags } });
	const button = screen.getByRole("button", { type: "submit" });
	
	fireEvent.click(button);
	expect(formData).toHaveProperty("title", testListing.title);
	expect(formData).toHaveProperty("description", testListing.description);
	expect(formData).toHaveProperty("location", testListing.location);
	expect(formData).toHaveProperty("tags", testListing.tags);
});
*/