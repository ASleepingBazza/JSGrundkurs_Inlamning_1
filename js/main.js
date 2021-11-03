class TodoItem {
    constructor(desc, prio, dateAdded) {
        this.id = null;
        this.actionButton = null;
        this.descriptionText = desc;
        this.prio = prio;
        this.finished = false;
        this.dateAdded = dateAdded;
        this.dateFinished = null;
    }
}

let todoList = [];

window.onload = function () {
    createTodoList();
};

function createTodoList() {
    let todo1 = new TodoItem("Städa rummet.", "High", new Date());
    let todo2 = new TodoItem("Plugga.", "Mid", new Date());
    let todo3 = new TodoItem("Göra en grej.", "Low", new Date());

    todo2.finished = true;

    todoList.push(todo1);
    todoList.push(todo2);
    todoList.push(todo3);

    createHTML(todoList);
}

function createHTML(list) {
    let containerCurrentTodo = document.getElementById("current-tasks");
    let containerFinishedTodo = document.getElementById("finished-tasks");

    for (let i = 0; i < list.length; i++) {
        let actionButton = createActionButton(i);
        let description = createDescription(list[i].descriptionText);
        let otherInfo = createOtherInfo(
            list[i].prio,
            list[i].dateAdded,
            list[i].dateFinished
        );
        list[i].id = i;
        let trashButton = createTrashButton(i);

        let task = document.createElement("div");
        task.className = "task";
        task.id = i;

        task.appendChild(actionButton);
        task.appendChild(description);
        task.appendChild(otherInfo);
        task.appendChild(trashButton);

        if (list[i].finished) {
            actionButton.className = "undo-button";
            actionButton.firstChild.className = "fas fa-times";
            containerFinishedTodo.appendChild(task);
        } else {
            containerCurrentTodo.appendChild(task);
        }
    }
}

function createTask(todoItem) {}

function createActionButton(id) {
    let b = document.createElement("button");
    b.addEventListener("click", () => toggleAction(id));

    b.className = "complete-button";
    let i = document.createElement("i");
    i.className = "fas fa-check";

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
        if (task.finished) {
            task = false;
        } else {
            task = true;
        }
    }
}

function deleteTask(id) {
    let containerCurrentTodo = document.getElementById("current-tasks");
    let containerFinishedTodo = document.getElementById("finished-tasks");

    let task = null;
    for (t of todoList) {
        if (t.id == id) {
            task = t;
            break;
        }
    }

    if (task != null) {
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
                    console.log("ASDLKASDASD");
                }
            }

            todoList.splice(todoList.indexOf(task), 1);
            console.log("JS TODOLIST: ", todoList);
            console.log("CURRENT: ", containerCurrentTodo.children);
            console.log("FINISHED: ", containerFinishedTodo.children);
        }
    }
}
