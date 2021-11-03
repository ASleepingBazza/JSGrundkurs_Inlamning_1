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
    initializeModal();
};

// MODAL
function initializeModal() {
    let addButton = document.getElementById("addTaskButton");
    addButton.addEventListener("click", showModal);

    let closeButton = document.getElementById("closeModal");
    closeButton.addEventListener("click", hideModal);

    let confirmButton = document.getElementById("confirmAdd");
    confirmButton.addEventListener("click", addNewTask);
}

function showModal() {
    let modal = document.getElementById("modal-container");
    modal.style.visibility = "visible";
    modal.style.opacity = 1;
}

function hideModal() {
    let modal = document.getElementById("modal-container");
    modal.style.visibility = "hidden";
    modal.style.opacity = 0;
}

function addNewTask() {
    let containerCurrentTodo = document.getElementById("current-tasks");
    let desc = document.getElementById("taskDescription").value;

    if (desc != "") {
        let sel = document.getElementById("importance");
        let prio = sel.options[sel.selectedIndex].text;

        let taskItem = new TodoItem(desc, prio, new Date());
        let task = createTask(taskItem, todoList.length);

        containerCurrentTodo.appendChild(task);
        todoList.push(taskItem);
    }
    document.getElementById("taskDescription").value = "";

    hideModal();
}

// HARDCODED TASKS
function createHardcodedTodoList() {
    let todo1 = new TodoItem("Städa rummet.", "Mid", new Date());
    let todo2 = new TodoItem("Plugga.", "High", new Date());
    let todo3 = new TodoItem(
        "Programmera projektil för mitt Tower Defence.",
        "High",
        new Date()
    );

    let lorem =
        " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe quam inventore, officia aspernatur explicabo molestiae nobis, dicta amet voluptate placeat incidunt, quidem quos minima consequatur repudiandae similique magni cupiditate modi!";
    let todo4 = new TodoItem(lorem, "Low", new Date());

    createHTML([todo1, todo2, todo3, todo4]);
}

// BUILD TASKS
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
        (todoDateAdded.getMonth() + 1) +
        "/" +
        todoDateAdded.getFullYear();

    let time = todoDateAdded.getHours() + ":" + todoDateAdded.getMinutes();
    dateAdded.innerHTML = "Added: <br>" + date + " - " + time;

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

// ACTIONS
function toggleAction(id) {
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

        let moveFromList = -1;
        let moveToList = -1;
        if (!task.finished) {
            moveFromList = containerCurrentTodo;
            moveToList = containerFinishedTodo;
            task.finished = true;

            //FINISHED DATE ADDED
            dateF = document.createElement("span");
            dateF.className = "date-finished";
            task.dateFinished = new Date();
            let date =
                task.dateFinished.getDate() +
                "/" +
                (task.dateFinished.getMonth() + 1) +
                "/" +
                task.dateFinished.getFullYear();
            let time =
                task.dateFinished.getHours() +
                ":" +
                task.dateFinished.getMinutes();
            dateF.innerHTML = "Finished: <br>" + date + " - " + time;
            task.otherInfo.appendChild(dateF);

            task.actionButton.className = "undo-button";
            task.actionButton.firstChild.className = "fas fa-times";
        } else {
            moveFromList = containerFinishedTodo;
            moveToList = containerCurrentTodo;
            task.finished = false;

            task.otherInfo.removeChild(task.otherInfo.lastChild);

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
