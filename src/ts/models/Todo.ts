export class TodoItem {
    actionButton: HTMLButtonElement;
    trashButton: HTMLButtonElement;
    description: string;
    otherInfo: HTMLDivElement;
    prio: string;
    dateAdded: string;
    dateFinished: string;
    finished: boolean;

    constructor(desc: string, prio: string) {
        this.actionButton = null;
        this.trashButton = null;
        this.description = desc;
        this.otherInfo = null;
        this.prio = prio;
        this.dateAdded = createDateString(new Date());
        this.dateFinished = null;
        this.finished = false;
    }
}

// DATE STRING CONSTRUCTION
export function createDateString(dateObject: Date): string {
    let date: string =
        padTo2Digits(dateObject.getUTCDate()) +
        "/" +
        padTo2Digits(dateObject.getUTCMonth()) +
        "/" +
        padTo2Digits(dateObject.getFullYear());
    let time: string =
        padTo2Digits(dateObject.getUTCHours()) +
        ":" +
        padTo2Digits(dateObject.getUTCMinutes()) +
        ":" +
        padTo2Digits(dateObject.getUTCSeconds());

    return date + "   " + time;
}
function padTo2Digits(num: number): string {
    return num.toString().padStart(2, "0");
}
