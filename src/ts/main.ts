import { TodoItem, createDateString } from "./models/Todo";

let todoList: TodoItem[] = [];

window.onload = function (): void {
    todoList = getStoredList();
    initializeModal();
    initializeFilters();
    renderHTML();
};

// MODAL
function initializeModal(): void {
    let addButton: HTMLButtonElement = document.getElementById(
        "addTaskButton"
    ) as HTMLButtonElement;
    addButton.addEventListener("click", showModal);

    let closeButton: HTMLButtonElement = document.getElementById(
        "closeModal"
    ) as HTMLButtonElement;
    closeButton.addEventListener("click", hideModal);

    let confirmButton: HTMLButtonElement = document.getElementById(
        "confirmAdd"
    ) as HTMLButtonElement;
    confirmButton.addEventListener("click", addNewTask);
}

function showModal(): void {
    let modal = document.getElementById("modal-container") as HTMLDivElement;
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
}

function hideModal(): void {
    let modal = document.getElementById("modal-container") as HTMLDivElement;
    modal.style.visibility = "hidden";
    modal.style.opacity = "0";
}

function addNewTask(): void {
    let descInput: HTMLInputElement = document.getElementById(
        "taskDescription"
    ) as HTMLInputElement;

    let desc: string = descInput.value;

    if (desc != "") {
        let sel: HTMLSelectElement = document.getElementById(
            "importance"
        ) as HTMLSelectElement;
        let prio: string = sel.options[sel.selectedIndex].text;

        let taskItem: TodoItem = new TodoItem(desc, prio);
        todoList.push(taskItem);
    }
    descInput.value = "";
    hideModal();
    renderHTML();
}

// FILTER
function initializeFilters(): void {
    let currentFilter: HTMLSelectElement = document.getElementById(
        "current-filter"
    ) as HTMLSelectElement;
    currentFilter.addEventListener("change", () =>
        handleSortChange(true, currentFilter.value)
    );

    let confirmAdd: HTMLButtonElement = document.getElementById(
        "confirmAdd"
    ) as HTMLButtonElement;
    confirmAdd.addEventListener("click", () =>
        handleSortChange(true, currentFilter.value)
    );

    let finishedFilter: HTMLSelectElement = document.getElementById(
        "finished-filter"
    ) as HTMLSelectElement;
    finishedFilter.addEventListener("change", () =>
        handleSortChange(false, finishedFilter.value)
    );
}

function handleSortChange(isCurrentList: boolean, sortValue: string): void {
    let workingList: HTMLDivElement;
    if (isCurrentList) {
        workingList = document.getElementById(
            "current-tasks"
        ) as HTMLDivElement;
    } else {
        workingList = document.getElementById(
            "finished-tasks"
        ) as HTMLDivElement;
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

function sortList(sortPreffer: string, givenList: HTMLDivElement): void {
    for (let index = 0; index < givenList.children.length; index++) {
        let child: HTMLDivElement = givenList.children[index] as HTMLDivElement;

        let otherInfo: HTMLDivElement = child.children[2] as HTMLDivElement;
        let prio: HTMLSpanElement = otherInfo.children[0] as HTMLSpanElement;
        let prioStatus: HTMLSpanElement = prio.children[1] as HTMLSpanElement;

        if (prioStatus.innerHTML == " " + sortPreffer) {
            givenList.insertBefore(child, givenList.firstChild);
        }
    }
}

// BUILD TASKS
function renderHTML(): void {
    let containerCurrentTodo: HTMLDivElement = document.getElementById(
        "current-tasks"
    ) as HTMLDivElement;
    let containerFinishedTodo: HTMLDivElement = document.getElementById(
        "finished-tasks"
    ) as HTMLDivElement;

    containerCurrentTodo.innerHTML = "";
    containerFinishedTodo.innerHTML = "";

    for (let index = 0; index < todoList.length; index++) {
        let taskHTML: HTMLDivElement = createTask(todoList[index], index);
        if (todoList[index].finished) {
            containerFinishedTodo.appendChild(taskHTML);
        } else {
            containerCurrentTodo.appendChild(taskHTML);
        }
    }

    // STORE THE LIST
    localStorage.setItem("todoList", JSON.stringify(todoList));

    // WHEN ALL TASKS ARE ADDED: SORT THEM
    let currentFilter: HTMLSelectElement = document.getElementById(
        "current-filter"
    ) as HTMLSelectElement;
    let finishedFilter: HTMLSelectElement = document.getElementById(
        "finished-filter"
    ) as HTMLSelectElement;

    handleSortChange(true, currentFilter.value);
    handleSortChange(false, finishedFilter.value);
}

function createTask(todoItem: TodoItem, index: number): HTMLDivElement {
    let actionButton: HTMLButtonElement = createActionButton(
        index,
        todoItem.finished
    );
    let desc: HTMLDivElement = createDescription(todoItem.description);
    let otherInfo: HTMLDivElement = createOtherInfo(todoItem);
    let trashButton: HTMLButtonElement = createTrashButton(index);

    let task: HTMLDivElement = document.createElement("div");
    task.className = "task";

    task.appendChild(actionButton);
    task.appendChild(desc);
    task.appendChild(otherInfo);
    task.appendChild(trashButton);

    return task;
}

function createActionButton(
    index: number,
    finished: boolean
): HTMLButtonElement {
    let b: HTMLButtonElement = document.createElement("button");
    b.addEventListener("click", () => {
        todoList[index].finished = !todoList[index].finished;
        if (todoList[index].finished) {
            todoList[index].dateFinished = createDateString(new Date());
        } else {
            todoList[index].dateFinished = null;
        }
        renderHTML();
    });

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

function createDescription(descText: string): HTMLDivElement {
    let d: HTMLDivElement = document.createElement("div");
    d.className = "description";

    let title: HTMLSpanElement = document.createElement("span");
    title.className = "desc-title";
    title.innerHTML = "Description:";

    let text: HTMLSpanElement = document.createElement("span");
    text.className = "desc-text";
    text.innerText = descText;

    d.appendChild(title);
    d.appendChild(text);
    return d;
}

function createOtherInfo(todoItem: TodoItem): HTMLDivElement {
    let d: HTMLDivElement = document.createElement("div");
    d.className = "other-info";

    let prio: HTMLSpanElement = document.createElement("span");
    prio.className = "prio";

    let prioTitle: HTMLSpanElement = document.createElement("span");
    prioTitle.innerHTML = "Prio:";

    let prioStatus: HTMLSpanElement = document.createElement("span");
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

    let dateAdded: HTMLSpanElement = createDateHTML(todoItem, "Added");

    d.appendChild(prio);
    d.appendChild(dateAdded);

    if (todoItem.dateFinished != null) {
        let dateFinished: HTMLSpanElement = createDateHTML(
            todoItem,
            "Finished"
        );
        d.appendChild(dateFinished);
    }

    return d;
}

function createDateHTML(todoItem: TodoItem, status: string): HTMLSpanElement {
    let dateHTML: HTMLSpanElement = document.createElement("span");
    let workingDate: string = null;
    if (status == "Added") {
        workingDate = todoItem.dateAdded;
        dateHTML.className = "date-current";
        dateHTML.innerHTML = "Added: " + workingDate;
    } else {
        workingDate = todoItem.dateFinished;
        dateHTML.className = "date-finished";
        dateHTML.innerHTML = "Finished: " + workingDate;
    }
    return dateHTML;
}

function createTrashButton(index: number): HTMLButtonElement {
    let b: HTMLButtonElement = document.createElement("button");
    b.addEventListener("click", () => {
        todoList.splice(index, 1);
        renderHTML();
    });
    b.className = "trash-button";

    //No "i" HTMLElement existed
    let i: HTMLElement = document.createElement("i");
    i.className = "fas fa-trash-alt";

    b.appendChild(i);
    return b;
}

// GET FROM LOCAL STORAGE
function getStoredList(): TodoItem[] {
    if ("todoList" in localStorage) {
        return JSON.parse(localStorage.getItem("todoList")) as TodoItem[];
    } else {
        return createHardcodedTodoList();
    }
}

// HARDCODED TASKS
function createHardcodedTodoList(): TodoItem[] {
    let todo1: TodoItem = new TodoItem("Städa rummet.", "Mid");
    let todo2: TodoItem = new TodoItem("Plugga.", "High");
    let todo3: TodoItem = new TodoItem(
        "Programmera projektil för mitt Tower Defence.",
        "High"
    );

    let lorem: string =
        " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe quam inventore, officia aspernatur explicabo molestiae nobis, dicta amet voluptate placeat incidunt, quidem quos minima consequatur repudiandae similique magni cupiditate modi!";
    let todo4: TodoItem = new TodoItem(lorem, "Low");

    return [todo1, todo2, todo3, todo4];
}
