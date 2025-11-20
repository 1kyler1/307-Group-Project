import React, { useState } from "react";
import { TextEncoder } from 'text-encoding';
global.TextEncoder = TextEncoder;
import { render, screen, fireEvent } from '@testing-library/react';

import { NewItemFormPage } from './CreateListingForum';
//import CreateAccount from "./createAccount";
//import Login from "./LogIn";

console.log(typeof NewItemFormPage);


test("renders the empty form correctly", () => {
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
	
test("accepts form input", () => {
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