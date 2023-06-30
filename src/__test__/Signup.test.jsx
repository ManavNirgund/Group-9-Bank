import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Signup from "../Screens/Signup/Signup";

describe("Signup", () => {
  test("renders the form fields", () => {
    render(<Signup />);

    const firstName = screen.getByLabelText(/First Name/i);
    const lastName = screen.getByLabelText(/Last Name/i);
    const email = screen.getByLabelText(/Email/i);
    const password = screen.getByLabelText(/Password/i);
    const phone = screen.getByLabelText(/Phone Number/i);
    const btnSignup = screen.getByRole("button", { name: "Signup" });

    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(btnSignup).toBeInTheDocument();
  });

  test("submits the form with valid data", () => {
    render(<Signup />);

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText(/Phone/i), {
      target: { value: "8976014379" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Signup" }));

  });

//   test("displays error message for invalid input", () => {
//     render(<Signup />);

//     // Simulate user input with invalid email
//     fireEvent.change(screen.getByLabelText("Email"), {
//       target: { value: "invalidemail" },
//     });

//     fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

//     // Assert on the expected behavior for invalid input
//     expect(screen.getByText("Please enter a valid email")).toBeInTheDocument();
//     expect(screen.queryByText("Success message")).not.toBeInTheDocument();
//   });
});
