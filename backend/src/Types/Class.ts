import { v4 as uuidv4 } from "uuid";
import type User from "./User.js";
export default class ClassRoom{
    private id: string;
    private className: string;
    private students: User[];
    //private teacherId: string;


    constructor(className: string, students: User[]) {
        this.id = uuidv4();
        this.className = className;
        this.students = students;
    }

    getId() {
        return this.id;
    }

    getclassName() {
        return this.className;
    }

    getstudents() {
        return this.students;
    }
}