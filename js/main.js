class TodoItem {
    constructor(desc, prio, dateAdded) {
        this.id = null;
        this.actionButton = null;
        this.trashButton = null;
        this.description = desc;
        this.otherInfo = null;

        this.prio = prio;
        this.dateAdded = dateAdded;
        this.dateFinished = null;

        this.finished = false;
    }
}

let todoList = [];

window.onload = function () {
    createHardcodedTodoList();
};

function createHardcodedTodoList() {
    let todo1 = new TodoItem("Städa rummet.", "High", new Date());
    let todo2 = new TodoItem("Plugga.", "Mid", new Date());
    let todo3 = new TodoItem("Göra en grej.", "Low", new Date());

    todo2.finished = true;

    createHTML([todo1, todo2, todo3]);
}

function createHTML(list) {
    let containerCurrentTodo = document.getElementById("current-tasks");
    let containerFinishedTodo = document.getElementById("finished-tasks");

    for (let i = 0; i < list.length; i++) {
        let task = createTask(list[i], i);
        if (list[i].finished) {
            containerFinishedTodo.appendChild(task);
        } else {
            containerCurrentTodo.appendChild(task);
        }
        todoList.push(list[i]);
    }
}

function createTask(todoItem, id) {
    todoItem.actionButton = createActionButton(id, todoItem.finished);
    todoItem.description = createDescription(todoItem.description);
    todoItem.otherInfo = createOtherInfo(
        todoItem.prio,
        todoItem.dateAdded,
        todoItem.dateFinished
    );
    todoItem.id = id;
    todoItem.trashButton = createTrashButton(id);

    let task = document.createElement("div");
    task.className = "task";
    task.id = id;

    task.appendChild(todoItem.actionButton);
    task.appendChild(todoItem.description);
    task.appendChild(todoItem.otherInfo);
    task.appendChild(todoItem.trashButton);

    return task;
}

function createActionButton(id, finished) {
    let b = document.createElement("button");
    b.addEventListener("click", () => toggleAction(id));
    let i = document.createElement("i");
    if (finished) {
        b.className = "undo-button";
        i.className = "fas fa-times";
    } else {
        b.className = "complete-button";
        i.className = "fas fa-check";
    }

    b.appendChild(i);
    return b;
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
    prioStatus.innerHTML = " " + todoPrio;

    prio.appendChild(prioTitle);
    prio.appendChild(prioStatus);

    // DATE ADDED
    let dateAdded = document.createElement("span");
    dateAdded.className = "date-added";

    let date =
        todoDateAdded.getDate() +
        "/" +
        todoDateAdded.getMonth() +
        "/" +
        todoDateAdded.getFullYear();
    let time =
        todoDateAdded.getHours() +
        ":" +
        todoDateAdded.getMinutes() +
        ":" +
        todoDateAdded.getSeconds();
    dateAdded.innerHTML = "Added: " + date + " - " + time;

    // Add all
    d.appendChild(prio);
    d.appendChild(dateAdded);

    // IF a completed date exists
    if (todoDateFinished != null) {
        let dateFinished = document.createElement("span");
        dateFinished.className = "date-finished";
        let date =
            dateFinished.getDate() +
            "/" +
            dateFinished.getMonth() +
            "/" +
            dateFinished.getFullYear();
        let time =
            dateFinished.getHours() +
            ":" +
            dateFinished.getMinutes() +
            ":" +
            dateFinished.getSeconds();
        dateFinished.innerHTML = "Added: " + date + " - " + time;

        d.appendChild(dateFinished);
    }

    return d;
}

function createTrashButton(id) {
    let b = document.createElement("button");
    b.addEventListener("click", () => deleteTask(id));
    b.className = "trash-button";

    let i = document.createElement("i");
    i.className = "fas fa-trash-alt";

    b.appendChild(i);
    return b;
}

function toggleAction(id) {
    let task = null;
    for (t of todoList) {
        if (t.id == id) {
            task = t;
            break;
        }
    }

    if (task != null) {
        console.log(task);
        let containerCurrentTodo = document.getElementById("current-tasks");
        let containerFinishedTodo = document.getElementById("finished-tasks");

        let moveFromList = -1;
        let moveToList = -1;
        if (!task.finished) {
            moveFromList = containerCurrentTodo;
            moveToList = containerFinishedTodo;
            task.finished = true;

            task.actionButton.className = "undo-button";
            task.actionButton.firstChild.className = "fas fa-times";
        } else {
            moveFromList = containerFinishedTodo;
            moveToList = containerCurrentTodo;
            task.finished = false;

            task.actionButton.className = "complete-button";
            task.actionButton.firstChild.className = "fas fa-check";
        }

        if (moveFromList != -1) {
            for (let i = 0; i < moveFromList.children.length; i++) {
                if (moveFromList.children[i].id == task.id) {
                    moveToList.appendChild(moveFromList.children[i]);
                }
            }
        }
    }
}

function deleteTask(id) {
    let task = null;
    for (t of todoList) {
        if (t.id == id) {
            task = t;
            break;
        }
    }

    if (task != null) {
        let containerCurrentTodo = document.getElementById("current-tasks");
        let containerFinishedTodo = document.getElementById("finished-tasks");
        let whichList = -1;

        if (task.finished) {
            whichList = containerFinishedTodo;
        } else {
            whichList = containerCurrentTodo;
        }

        if (whichList != -1) {
            for (let i = 0; i < whichList.children.length; i++) {
                if (whichList.children[i].id == task.id) {
                    whichList.removeChild(whichList.children[i]);
                }
            }
            todoList.splice(todoList.indexOf(task), 1);
        }
    }
}
