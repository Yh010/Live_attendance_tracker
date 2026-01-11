import { v4 as uuidv4 } from "uuid";
export default class User{
    private id: string;
    private name: string;
    private email: string;
    private password: string;
    private role: "student" | "teacher" | "";


    constructor(name: string, email: string, password:string, role: "student" | "teacher" | "") {
        this.id = uuidv4();
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
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
    getPassword(){
        return this.password;
    }

    getUserRole() {
        return this.role;
    }
}