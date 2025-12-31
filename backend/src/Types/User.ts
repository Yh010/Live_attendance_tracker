import { v4 as uuidv4 } from "uuid";
export default class User{
    private id: string;
    private name: string;
    private email: string;
    //private role: "student" | "teacher";


    constructor(name:string , email: string) {
        this.id = uuidv4();
        this.name = name;
        this.email = email;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }
}