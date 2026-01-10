export default class Attendee{
    private id: string;
    private name: string;
    private email: string;
    private role: "student" | "teacher";


    constructor(id: string, name:string , email: string , role : "student" | "teacher") {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
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
}