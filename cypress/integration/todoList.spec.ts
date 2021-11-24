describe("Todo List Testing", () => {
    beforeEach(() => {
        //We visit the same page every test.
        //So this shortens the code a bit.
        cy.visit("http://localhost:1234");
    });

    it("Should have 5 hard coded non-finished tasks by default when loading page", () => {
        //1. Arrange
        //2. Act
        //3. Asses
        cy.get("#current-tasks > div").should("have.length", 4);
    });

    it("Should have added one task", () => {
        //1. Arrange
        cy.get("#addTaskButton").click();
        cy.get("#taskDescription").type("Clean the garage.");
        cy.get("#importance").select("Low");

        //2. Act
        cy.get("#confirmAdd").click();

        //3. Asses
        cy.get("#current-tasks > div").should("have.length", 5);
    });

    it("Should add one task and then mark it as done", () => {
        //1. Arrange
        cy.get("#addTaskButton").click();
        cy.get("#taskDescription").type("Clean the garage.");
        cy.get("#importance").select("Low");
        cy.get("#confirmAdd").click();
        cy.get("#current-tasks > div").should("have.length", 5);

        //2. Act
        cy.get(
            "#current-tasks > div:nth-child(5) > button.complete-button"
        ).click();

        //3. Asses
        cy.get("#current-tasks > div").should("have.length", 4);
        cy.get("#finished-tasks > div").should("have.length", 1);
    });

    it("Should add one task, mark it as done and then mark it as not done", () => {
        //1. Arrange
        cy.get("#addTaskButton").click();
        cy.get("#taskDescription").type("Clean the garage.");
        cy.get("#importance").select("Low");
        cy.get("#confirmAdd").click();
        cy.get("#current-tasks > div").should("have.length", 5);
        cy.get(
            "#current-tasks > div:nth-child(5) > button.complete-button"
        ).click();
        cy.get("#current-tasks > div").should("have.length", 4);
        cy.get("#finished-tasks > div").should("have.length", 1);

        //2. Act
        cy.get("#finished-tasks > div:first > .undo-button").click();

        //3. Asses
        cy.get("#current-tasks > div").should("have.length", 5);
    });

    it("Should add one task and then remove it", () => {
        //1. Arrange
        cy.get("#addTaskButton").click();
        cy.get("#taskDescription").type("Clean the garage.");
        cy.get("#importance").select("Low");
        cy.get("#confirmAdd").click();
        cy.get("#current-tasks > div").should("have.length", 5);

        //2. Act
        cy.get("#current-tasks > div:first > .trash-button").click();

        //3. Asses
        cy.get("#current-tasks > div").should("have.length", 4);
    });

    it("Should add one task, mark it as done and then remove it", () => {
        //1. Arrange
        cy.get("#addTaskButton").click();
        cy.get("#taskDescription").type("Clean the garage.");
        cy.get("#importance").select("Low");
        cy.get("#confirmAdd").click();
        cy.get("#current-tasks > div").should("have.length", 5);

        //2. Act
        cy.get("#current-tasks > div:first > .complete-button").click();
        cy.get("#finished-tasks >div:first").should("have.length", 1);
        cy.get("#finished-tasks > div:first > .trash-button").click();

        //3. Asses
        cy.get("#current-tasks > div").should("have.length", 4);
        cy.get("#finished-tasks > div").should("have.length", 0);
    });

    it("Should change the sorting of current list to Low and sort accordingly", () => {
        //1. Arrange
        cy.get("#current-tasks > div").should("have.length", 4);

        //2. Act
        cy.get("#current-filter").select("Low");

        //3. Asses
        cy.get("#current-tasks > div:first > .other-info > .prio").should(
            "have.text",
            "Prio: Low"
        );
    });

    it("Should change the sorting of current list to Mid and sort accordingly", () => {
        //1. Arrange
        cy.get("#current-tasks > div").should("have.length", 4);

        //2. Act
        cy.get("#current-filter").select("Mid");

        //3. Asses
        cy.get("#current-tasks > div:first > .other-info > .prio").should(
            "have.text",
            "Prio: Mid"
        );
    });

    it("Should change the sorting of current list to High and sort accordingly", () => {
        //1. Arrange
        cy.get("#current-tasks > div").should("have.length", 4);

        //2. Act
        cy.get("#current-filter").select("High");

        //3. Asses
        cy.get("#current-tasks > div:first > .other-info > .prio").should(
            "have.text",
            "Prio: High"
        );
    });

    it("Should add a new date when the task is marked as finished", () => {
        //1. Arrange
        cy.get("#addTaskButton").click();
        cy.get("#taskDescription").type("Clean the garage.");
        cy.get("#importance").select("Low");
        cy.get("#confirmAdd").click();
        cy.get("#current-tasks > div").should("have.length", 5);
        cy.get(
            "#current-tasks > div:nth-child(5) > button.complete-button"
        ).click();
        cy.get("#current-tasks > div").should("have.length", 4);
        cy.get("#finished-tasks > div").should("have.length", 1);

        //2. Act
        //3. Asses
        cy.get(
            "#finished-tasks > div:first > .other-info > span:nth-child(3)"
        ).should("have.length", 1);
    });

    it("Should remove the finished date when making a finished task as not finished", () => {
        //1. Arrange
        cy.get("#addTaskButton").click();
        cy.get("#taskDescription").type("Clean the garage.");
        cy.get("#importance").select("Low");
        cy.get("#confirmAdd").click();
        cy.get("#current-tasks > div").should("have.length", 5);
        cy.get(
            "#current-tasks > div:nth-child(5) > button.complete-button"
        ).click();
        cy.get("#current-tasks > div").should("have.length", 4);
        cy.get("#finished-tasks > div").should("have.length", 1);
        cy.get(
            "#finished-tasks > div:first > .other-info > span:nth-child(3)"
        ).should("have.length", 1);

        //2. Act
        cy.get("#finished-tasks > div:first > .undo-button").click();

        //3. Asses
        cy.get("#current-tasks > div:nth-child(4) > .other-info > span").should(
            "have.length",
            2
        );
    });
});
