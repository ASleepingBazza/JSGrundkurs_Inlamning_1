class TodoItem {
    constructor(desc, prio, finished, dateAdded) {
        this.descriptionText = desc;
        this.prio = prio;
        this.finished = finished;
        this.dateAdded = dateAdded;
        this.dateFinished = None;
    }

    complete() {
        this.finished = true;
        this.dateFinished = new Date();
    }
}

window.onload = function () {
    createTodoList();
};

function createTodoList() {
    let todo1 = new TodoItem("Städa rummet.", "High", false, new Date());
    let todo2 = new TodoItem("Plugga.", "Mid", true, new Date());
    let todo3 = new TodoItem("Göra en grej.", "Low", false, new Date());

    createTodoHTML([todo1, todo2, todo3]);
}

function createTodoHTML(list) {
    let containerCurrentTodo = document.getElementById("current-tasks");
    let containerFinishedTodo = document.getElementById("finished-tasks");

    for (todo in list) {
        let completeButton = createCompleteButton();
        let description = createDescription(todo.descriptionText);
        let otherInfo = createOtherInfo(
            todo.prio,
            todo.dateAdded,
            todo.dateFinished
        );
        let trashButton = createTrashButton();

        let task = document.createElement("div");
        task.className = "task";

        task.appendChild(completeButton);
        task.appendChild(description);
        task.appendChild(otherInfo);
        task.appendChild(trashButton);

        if (todo.finished) {
            containerFinishedTodo.appendChild(task);
        } else {
            containerCurrentTodo.appendChild(task);
        }
    }
}

function createCompleteButton() {
    let b = document.createElement("button");
    b.className = "complete-button";

    let i = document.createElement("i");
    i.className = "fas fa-check";

    b.appendChild(i);
    return i;
}

function createDescription(descText) {
    let d = document.createElement("div");
    d.className = "description";

    let title = document.createElement("span");
    title.className = "desc-title";
    title.innerHTML = "Description:";

    let text = document.createElement("span");
    text.className = "desc-text";
    text.innerHTML = descText;

    d.appendChild(title);
    d.appendChild(text);
    return d;
}

function createOtherInfo(todoPrio, todoDateAdded, todoDateFinished) {
    let d = document.createElement("div");
    d.className = "other-info";

    // PRIO
    let prio = document.createElement("span");
    prio.className = "prio";

    let prioTitle = document.createElement("span");
    prioTitle.innerHTML = "Prio:";

    let prioStatus = document.createElement("span");
    if (todoPrio == "Low") {
        prioStatus.className = "prio-low";
    } else if (todoPrio == "Mid") {
        prioStatus.className = "prio-mid";
    } else if (todoPrio == "High") {
        prioStatus.className = "prio-high";
    }
    prioStatus.innerHTML = todoPrio;

    prio.appendChild(prioTitle);
    prio.appendChild(prioStatus);

    // DATE ADDED
    let dateAdded = document.createElement("span");
    dateAdded.className = "date-added";
    dateAdded.innerHTML = "Added: " + todoDateAdded.toDateString();

    // Add all
    d.appendChild(prio);
    d.appendChild(dateAdded);

    // IF a completed date exists
    if (todoDateFinished != None) {
        let dateFinished = document.createElement("span");
        dateFinished.className = "date-finished";
        dateFinished.innerHTML = "Finished: " + todoDateFinished.toDateString();
        d.appendChild(dateFinished);
    }

    return d;
}

function createTrashButton() {
    let b = document.createElement("button");
    b.className = "trash-button";

    let i = document.createElement("i");
    i.className = "fas fa-trash-alt";

    b.appendChild(i);

    return b;
}
