import { v4 as uuidv4 } from "uuid";
import Attendee from "./Attendee.js";
export default class ClassRoomManager{
    private id: string;
    private className: string;
    private attendees: Attendee[];
    //private teacherId: string;


    constructor() {
        this.id = "";
        this.className = "";
        this.attendees = [];
    }

    getClassId() {
        return this.id;
    }

    getClassName() {
        return this.className;
    }

    getAttendees() {
        return this.attendees;
    }
    getStudents(): Attendee[] {
        return this.attendees.filter((attendee) => 
            attendee.getAttendeeRole() === "student"
        )
    }

    getTeachers() {
        return this.attendees.filter((attendee) => 
            attendee.getAttendeeRole() === "teacher"
        )
    }

    createNewClass(className: string) {
        this.id = uuidv4();
        this.className = className;
        this.attendees = [];
    }

    addAttendee(id: string, name: string, email: string, role: "student" | "teacher") {
        const exists = this.attendees.some(a => a.getAttendeeId() === id)
        if (!exists) {
            const attendee = new Attendee(id,name, email, role);
            this.attendees.push(attendee);     
        }
    }
}