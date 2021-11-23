describe("Todo List Testing", () => {
    beforeEach(() => {
        //We visit the same page every test.
        //So this shortens the code a bit.
        cy.visit("http://localhost:1234");
    });

    it("should have 5 hard coded non-finished items by default when loading page", () => {
        //1. Arrange
        //2. Act
        //3. Asses
        cy.get("#current-tasks > div").should("have.length", 4);
    });

    it("should have added one item to the non-finished tasks", () => {
        //1. Arrange
        cy.get("#addTaskButton").click();
        cy.get("#taskDescription").type("Clean the garage.");
        cy.get("#importance").select("Low");

        //2. Act
        cy.get("#confirmAdd").click();

        //3. Asses
        cy.get("#current-tasks > div").should("have.length", 5);
    });
});
