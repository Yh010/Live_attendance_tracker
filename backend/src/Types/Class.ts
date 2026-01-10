import { v4 as uuidv4 } from "uuid";
import type User from "./User.js";
export default class ClassRoomManager{
    private id: string;
    private className: string;
    private students: User[];
    //private teacherId: string;


    constructor() {
        this.id = "";
        this.className = "";
        this.students = [];
    }

    getClassId() {
        return this.id;
    }

    getclassName() {
        return this.className;
    }

    getstudents() {
        return this.students;
    }

    createNewClass(className: string) {
        this.id = uuidv4();
        this.className = className;
        this.students = [];
    }

    addStudent() {
        
    }
}