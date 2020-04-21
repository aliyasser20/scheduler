import React from "react";
import axios from "axios";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getAllByTestId,
  getByText,
  getByAltText,
  getByTestId,
  queryByText
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
    const { container, debug } = render(<Application />);

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

    // Verify saving
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Ali Sayed"));

    const dayArray = getAllByTestId(container, "day");

    const monday = dayArray.find(day => queryByText(day, "Monday"));

    expect(getByText(monday, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    const deleteButton = getByAltText(appointment, "Delete");

    fireEvent.click(deleteButton);

    // 4. Check that the confirmation message is shown.
    const confirmButton = getByText(appointment, "Confirm");
    expect(confirmButton).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(confirmButton);

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const dayArray = getAllByTestId(container, "day");

    const monday = dayArray.find(day => queryByText(day, "Monday"));
    expect(getByText(monday, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    const editButton = getByAltText(appointment, "Edit");

    fireEvent.click(editButton);

    // 4. Check that the student input is shown.
    const input = getByTestId(appointment, "student-name-input");
    expect(input).toBeInTheDocument();

    // 5. Change the student name and interviewer
    fireEvent.change(input, {
      target: { value: "Ali Sayed" }
    });

    const SylviaPalmer = getByAltText(appointment, "Sylvia Palmer");
    fireEvent.click(SylviaPalmer);

    // 6. Click save button
    const saveButton = getByText(appointment, "Save");
    fireEvent.click(saveButton);

    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 7. Wait until the element with the "Edit" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Edit"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const dayArray = getAllByTestId(container, "day");

    const monday = dayArray.find(day => queryByText(day, "Monday"));
    expect(getByText(monday, "1 spot remaining")).toBeInTheDocument();

    // 9. Check that the student name is the new one.
    expect(getByText(appointment, "Ali Sayed")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    const editButton = getByAltText(appointment, "Edit");

    fireEvent.click(editButton);

    // 4. Check that the student input is shown.
    const input = getByTestId(appointment, "student-name-input");
    expect(input).toBeInTheDocument();

    // 5. Change the student name and interviewer
    fireEvent.change(input, {
      target: { value: "Ali Sayed" }
    });

    const SylviaPalmer = getByAltText(appointment, "Sylvia Palmer");
    fireEvent.click(SylviaPalmer);

    // 6. Click save button
    const saveButton = getByText(appointment, "Save");
    fireEvent.click(saveButton);

    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 7. Wait until the element with the error message is displayed.
    await waitForElement(() => getByText(appointment, "Error"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const dayArray = getAllByTestId(container, "day");

    const monday = dayArray.find(day => queryByText(day, "Monday"));
    expect(getByText(monday, "1 spot remaining")).toBeInTheDocument();

    // 9. Check that error message is "Could not save appointment"
    expect(
      getByText(appointment, "Could not save appointment.")
    ).toBeInTheDocument();

    // 10. Click on close
    const closeButton = getByAltText(appointment, "Close");

    fireEvent.click(closeButton);

    // 11. Check that the student name is the not the new one.
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    const deleteButton = getByAltText(appointment, "Delete");

    fireEvent.click(deleteButton);

    // 4. Check that the confirmation message is shown.
    const confirmButton = getByText(appointment, "Confirm");
    expect(confirmButton).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(confirmButton);

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the error message is displayed.
    await waitForElement(() => getByText(appointment, "Error"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const dayArray = getAllByTestId(container, "day");

    const monday = dayArray.find(day => queryByText(day, "Monday"));
    expect(getByText(monday, "1 spot remaining")).toBeInTheDocument();

    // 9. Check that error message is "Could not delete appointment"
    expect(
      getByText(appointment, "Could not cancel appointment.")
    ).toBeInTheDocument();

    // 10. Click on close
    const closeButton = getByAltText(appointment, "Close");

    fireEvent.click(closeButton);

    // 11. Check that the student name is the not the new one.
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
  });
});
