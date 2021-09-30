import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DisplayComponent from './DisplayComponent';
import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const headerElement = screen.queryByText("Contact Form");

    expect(headerElement).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
   render(<ContactForm/>)
   const firstname = "geo"
    const firstNameInput = screen.getByLabelText(/First Name/i);
    userEvent.type(firstNameInput, firstname);
    const firstNameErrorMessage = screen.queryByText(/Error: firstName must have at least 5 characters./i);
    expect(firstNameErrorMessage).toBeInTheDocument();
});
test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)
    const button = screen.getByRole("button");
    userEvent.click(button);
    const firstNameErrorMessage = screen.queryByText(/Error: firstName must have at least 5 characters./i);
    
    const lastNameErrorMessage = screen.queryByText(/Error: lastName is a required field./i);
    
    const emailErrorMessage = screen.queryByText(/Error: email must be a valid email address./i)
    expect(firstNameErrorMessage).toBeInTheDocument();
    expect(lastNameErrorMessage).toBeInTheDocument();
    expect(emailErrorMessage).toBeInTheDocument();

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const firstName = "George";
    const lastName = "LeVitre";
    const emptyInput = " ";
    const firstNameInput = screen.getByLabelText(/First Name/i);
    userEvent.type(firstNameInput, firstName);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    userEvent.type(lastNameInput, lastName);
    const emailInput = screen.getByLabelText(/Email/i);
    userEvent.type(emailInput, emptyInput);
    const emailErrorMessage = screen.queryByText(/Error: email must be a valid email address./i);
    expect(emailErrorMessage).toBeInTheDocument();

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    const invalidEmail = "lksdjs"
    const emailInput = screen.getByLabelText(/Email/i);
    userEvent.type(emailInput, invalidEmail);
    const emailErrorMessage = screen.queryByText(/Error: email must be a valid email address./i);
    expect(emailErrorMessage).toBeInTheDocument();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    
    const button = screen.getByRole("button");
    userEvent.click(button);
    const lastNameErrorMessage = screen.queryByText(/Error: lastName is a required field./i);
    
    expect(lastNameErrorMessage).toBeInTheDocument();


});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)
    
    const firstName = "George";
    const lastName = "LeVitre";
    const email = "19jlevitre@gmail.com";
    const button = screen.getByRole("button");
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    // const messageInput = screen.getByLabelText(/Message/i)
    
    userEvent.type(firstNameInput, firstName);
    userEvent.type(lastNameInput, lastName);
    userEvent.type(emailInput, email);
    // userEvent.type(messageInput, email);
    userEvent.click(button);
    const firstNameDisplay = screen.getByTestId("firstnameDisplay");
    const lastNameDisplay = screen.getByTestId("lastnameDisplay");
    const emailDisplay = screen.getByTestId("emailDisplay");
    // const messageDisplay = screen.getByTestId("messageDisplay")
    expect(firstNameDisplay).toHaveTextContent("George");
    expect(lastNameDisplay).toHaveTextContent("LeVitre");
    expect(emailDisplay).toHaveTextContent("19jlevitre@gmail.com");
    // expect(messageDisplay).not.toBeInTheDocument();
    expect(screen.queryByTestId("messageDisplay")).toBeFalsy();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)
    
    const firstName = "George";
    const lastName = "LeVitre";
    const email = "19jlevitre@gmail.com";
    const message = "lalalala";
    const button = screen.getByRole("button");
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const messageInput = screen.getByLabelText(/Message/i)
    userEvent.type(firstNameInput, firstName);
    userEvent.type(lastNameInput, lastName);
    userEvent.type(emailInput, email);
    userEvent.type(messageInput, message)
    userEvent.click(button);
    const firstNameDisplay = screen.getByTestId("firstnameDisplay");
    const lastNameDisplay = screen.getByTestId("lastnameDisplay");
    const emailDisplay = screen.getByTestId("emailDisplay");
    const messageDisplay = screen.getByTestId("messageDisplay")
    expect(firstNameDisplay).toHaveTextContent("George");
    expect(lastNameDisplay).toHaveTextContent("LeVitre");
    expect(emailDisplay).toHaveTextContent("19jlevitre@gmail.com");
    expect(messageDisplay).toHaveTextContent("lalalala");
});