import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getAllByTestId,
  getByText,
  getByAltText,
  getByTestId
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Select all appointments for Monday
    const appointments = getAllByTestId(container, "appointment");

    // Select the first appointment for Monday
    const appointment = appointments[0];

    // Click the add button on the first appointment
    fireEvent.click(getByAltText(appointment, "Add"));

    // Select the student name input for first appointment
    const input = getByTestId(appointment, "student-name-input");

    // Change the value of input to new name
    fireEvent.change(input, {
      target: { value: "Ali Sayed" }
    });

    // Select the interviewer
    const SylviaPalmer = getByAltText(appointment, "Sylvia Palmer");

    // Click on interviewer
    fireEvent.click(SylviaPalmer);

    // Select the save button
    const saveButton = getByText(appointment, "Save");

    // Click the save button
    fireEvent.click(saveButton);

    console.log(prettyDOM(appointment));
  });
});
