class TodoItem {
    constructor(desc, prio) {
        this.id = null;
        this.actionButton = null;
        this.trashButton = null;
        this.description = desc;
        this.otherInfo = null;
        this.prio = prio;
        this.dateAdded = new Date();
        this.dateFinished = null;
        this.finished = false;
    }
}

let idCounter = 0;
let todoList = [];

window.onload = function () {
    createHardcodedTodoList();
    initializeModal();
    initializeFilters();
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
    let desc = document.getElementById("taskDescription").value;
    if (desc != "") {
        let sel = document.getElementById("importance");
        let prio = sel.options[sel.selectedIndex].text;

        let taskItem = new TodoItem(desc, prio);
        todoList.push(taskItem);
        idCounter++;
    }
    document.getElementById("taskDescription").value = "";
    hideModal();
    renderHTML();
}

// FILTER
function initializeFilters() {
    let currentFilter = document.getElementById("current-filter");
    currentFilter.addEventListener("change", () =>
        handleSortChange(true, currentFilter.value)
    );

    let confirmAdd = document.getElementById("confirmAdd");
    confirmAdd.addEventListener("click", () =>
        handleSortChange(true, currentFilter.value)
    );

    let finishedFilter = document.getElementById("finished-filter");
    finishedFilter.addEventListener("change", () =>
        handleSortChange(false, finishedFilter.value)
    );
}

function handleSortChange(isCurrentList, sortValue) {
    let workingList;
    if (isCurrentList) {
        workingList = document.getElementById("current-tasks");
    } else {
        workingList = document.getElementById("finished-tasks");
    }

    if (sortValue == "High") {
        sortList("Low", workingList);
        sortList("Mid", workingList);
        sortList("High", workingList);
    } else if (sortValue == "Mid") {
        sortList("Low", workingList);
        sortList("High", workingList);
        sortList("Mid", workingList);
    } else if (sortValue == "Low") {
        sortList("High", workingList);
        sortList("Mid", workingList);
        sortList("Low", workingList);
    }
}

function sortList(sortPreffer, givenList) {
    for (child of givenList.children) {
        let prioStatus =
            child.childNodes[2].childNodes[0].childNodes[1].innerHTML;
        if (prioStatus == " " + sortPreffer) {
            givenList.insertBefore(child, givenList.firstChild);
        }
    }
}

// HARDCODED TASKS
function createHardcodedTodoList() {
    let todo1 = new TodoItem("Städa rummet.", "Mid");
    let todo2 = new TodoItem("Plugga.", "High");
    let todo3 = new TodoItem(
        "Programmera projektil för mitt Tower Defence.",
        "High"
    );

    let lorem =
        " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe quam inventore, officia aspernatur explicabo molestiae nobis, dicta amet voluptate placeat incidunt, quidem quos minima consequatur repudiandae similique magni cupiditate modi!";
    let todo4 = new TodoItem(lorem, "Low");

    todoList.push(todo1);
    todoList.push(todo2);
    todoList.push(todo3);
    todoList.push(todo4);
    renderHTML();
}

// BUILD TASKS
function renderHTML() {
    let containerCurrentTodo = document.getElementById("current-tasks");
    let containerFinishedTodo = document.getElementById("finished-tasks");

    containerCurrentTodo.innerHTML = "";
    containerFinishedTodo.innerHTML = "";

    for (todo of todoList) {
        let taskHTML = createTask(todo);
        if (todo.finished) {
            containerFinishedTodo.appendChild(taskHTML);
        } else {
            containerCurrentTodo.appendChild(taskHTML);
        }
    }

    // WHEN ALL TASKS ARE ADDED: SORT THEM
    let currentFilter = document.getElementById("current-filter");
    let finishedFilter = document.getElementById("finished-filter");
    handleSortChange(true, currentFilter.value);
    handleSortChange(false, finishedFilter.value);
}

function createTask(todoItem) {
    todoItem.id = idCounter;
    idCounter++;

    actionButton = createActionButton(todoItem.id, todoItem.finished);
    desc = createDescription(todoItem.description);
    otherInfo = createOtherInfo(todoItem);
    trashButton = createTrashButton(todoItem.id);

    let task = document.createElement("div");
    task.className = "task";

    task.appendChild(actionButton);
    task.appendChild(desc);
    task.appendChild(otherInfo);
    task.appendChild(trashButton);

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
    text.innerText = descText;

    d.appendChild(title);
    d.appendChild(text);
    return d;
}

function createOtherInfo(todoItem) {
    let d = document.createElement("div");
    d.className = "other-info";

    // PRIO
    let prio = document.createElement("span");
    prio.className = "prio";

    let prioTitle = document.createElement("span");
    prioTitle.innerHTML = "Prio:";

    let prioStatus = document.createElement("span");
    if (todoItem.prio == "Low") {
        prioStatus.className = "prio-status prio-low";
    } else if (todoItem.prio == "Mid") {
        prioStatus.className = "prio-status prio-mid";
    } else if (todoItem.prio == "High") {
        prioStatus.className = "prio-status prio-high";
    }
    prioStatus.innerHTML = " " + todoItem.prio;

    prio.appendChild(prioTitle);
    prio.appendChild(prioStatus);

    // DATE ADDED
    let dateAdded = createDateHTML(todoItem, "Added");

    // Add all
    d.appendChild(prio);
    d.appendChild(dateAdded);

    // IF a completed date exists
    if (todoItem.dateFinished != null) {
        let dateFinished = createDateHTML(todoItem, "Finished");
        d.appendChild(dateFinished);
    }

    return d;
}

function createDateHTML(todoItem, desc) {
    let dateHTML = document.createElement("span");
    let workingDate = null;
    if (desc == "Added") {
        workingDate = todoItem.dateAdded;
    } else {
        workingDate = todoItem.dateFinished;
    }
    dateHTML.className = "date-finished";
    let date =
        workingDate.getDate() +
        "/" +
        workingDate.getMonth() +
        "/" +
        workingDate.getFullYear();
    let time =
        workingDate.getHours() +
        ":" +
        workingDate.getMinutes() +
        ":" +
        workingDate.getSeconds();

    dateHTML.innerHTML = desc + ": " + date + " - " + time;
    return dateHTML;
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

    if (task.finished) {
        task.finished = false;
        task.dateFinished = null;
    } else {
        task.finished = true;
        task.dateFinished = new Date();
    }

    renderHTML();
}

function deleteTask(id) {
    let task = null;
    for (t of todoList) {
        if (t.id == id) {
            task = t;
            break;
        }
    }

    todoList.splice(todoList.indexOf(task), 1);
    renderHTML();
}
