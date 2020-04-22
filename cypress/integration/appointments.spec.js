describe("Appointments", () => {
  beforeEach(() => {
    // Reset test database
    cy.request("GET", "/api/debug/reset");
    // Visit root
    cy.visit("/");
    // Ensure document includes word Monday
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    // Click on first add button
    cy.get("[alt=Add]")
      .first()
      .click();
    // Type "Lydia Miller-Jones" as student name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    // Select 'Sylvia Palmer' as interviewer
    cy.get("[alt='Sylvia Palmer']").click();
    // Click save button
    cy.contains("button", "Save").click();
    // Verify student name and interviewer
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // Click on first edit button
    cy.get("[alt=Edit]")
      .invoke("show")
      .first()
      .click();
    // Type "Lydia Miller-Jones" as student name
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");
    // Select 'Tori Malcolm' as interviewer
    cy.get("[alt='Tori Malcolm']").click();
    // Click save button
    cy.contains("button", "Save").click();
    // Verify student name and interviewer
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // Click on first delete button
    cy.get("[alt=Delete]")
      .invoke("show")
      .first()
      .click();
    // Click confirm button
    cy.contains("button", "Confirm").click();
    // Verify deleting appears then disappears
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    // Verify student name and interviewer
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
    cy.contains(".appointment__card--show", "Sylvia Palmer").should(
      "not.exist"
    );
  });
});
