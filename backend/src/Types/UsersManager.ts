import { v4 as uuidv4 } from "uuid";
import User from "./User.js";
export default class UsersManager{
    private users: User[] = [];

    getUsers():User[] {
        return this.users;
    }

    getUserById(userId:string) {
        return this.users.find(user => user.getId() === userId);
    }

    getUserName(userId: string) {
        return this.getUserById(userId)?.getName();
    }

    getUserEmail(userId: string) {
        return this.getUserById(userId)?.getEmail();
    }

    getUserRole(userId: string) {
        return this.getUserById(userId)?.getUserRole();
    }

    createUser(name: string, email: string, role: "student" | "teacher" | ""):User {
        const user = new User(name, email, role);
        this.users.push(user);
        return user;
    }
}