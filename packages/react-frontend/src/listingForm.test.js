import React, { useState } from "react";
import { TextEncoder } from 'text-encoding';
global.TextEncoder = TextEncoder;
import { render, screen } from '@testing-library/react';

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
/*
const testListing = { 
	title: "test title",
	description: "test desc",
	location: "test loc"
	tags: ["tag 1", "tag 2", "tag 3"]
	};
	
test("accepts name input", () => {
	render(<NewItemFormPage />);
	const input = screen.getByLabelText("Title");
	fireEvent.change(input, { target: { value: testListing.title } });
	expect(input).toHaveValue(testListing.title);
});
*/