import React, { useState } from "react";
import { TextEncoder } from 'text-encoding';
global.TextEncoder = TextEncoder;
import { render } from '@testing-library/react';

import NewItemFormPage from './CreateListingForum';
//import CreateAccount from "./createAccount";
//import Login from "./LogIn";

console.log(typeof NewItemFormPage);


test("renders the empty form correctly", () => {
	render(<NewItemFormPage />);
	
	expect(screen.getByLabelText("Title")).toBeInTheDocument();
	expect(screen.getByLabelText("Description")).toBeInTheDocument();
	expect(screen.getByText("Submit")).toBeInTheDocument();
});