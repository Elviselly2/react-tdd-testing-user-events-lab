import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  // your test code here
  render(<App />);
  
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  // your test code here
  render(<App />);
  
  const checkboxes = screen.getAllByRole("checkbox");
  expect(checkboxes.length).toBe(3);
});

test("the checkboxes are initially unchecked", () => {
  // your test code here
  render(<App />);
  
  const checkboxes = screen.getAllByRole("checkbox");
  checkboxes.forEach((checkbox) => {
    expect(checkbox).not.toBeChecked();
  });
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", async() => {
  // your test code here
  render(<App />);
  
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  await userEvent.type(nameInput, "Test User");
  await userEvent.type(emailInput, "test@example.com");

  expect(nameInput).toHaveValue("Test User");
  expect(emailInput).toHaveValue("test@example.com");
});


test("checked status of checkboxes changes when user clicks them",async () => {
  // your test code here
  render(<App />);

  const checkboxes = screen.getAllByRole("checkbox");

  await userEvent.click(checkboxes[0]);
  expect(checkboxes[0]).toBeChecked();

  await userEvent.click(checkboxes[1]);
  expect(checkboxes[1]).toBeChecked();
});

test("a message is displayed when the user clicks the Submit button",async () => {
  // your test code here
  render(<App />);

  await userEvent.type(screen.getByLabelText(/name/i), "Test User");
  await userEvent.type(screen.getByLabelText(/email/i), "test@example.com");

  const checkboxes = screen.getAllByRole("checkbox");
  await userEvent.click(checkboxes[0]);

  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(screen.getByText(/thank you for signing up!/i)).toBeInTheDocument();
});
