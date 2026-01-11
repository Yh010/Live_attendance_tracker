export default class Attendee{
    private id: string;
    private name: string;
    private email: string;
    private role: "student" | "teacher" | "";
    private className: string;


    constructor(id: string, name:string , email: string , role : "student" | "teacher" | "", className : string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.className = className;
    }

    getAttendeeId() {
        return this.id;
    }

    getAttendeeName() {
        return this.name;
    }

    getAttendeeEmail() {
        return this.email;
    }

    getAttendeeRole() {
        return this.role;
    }
    getAttendeeClassName() {
        return this.className;
    }
}