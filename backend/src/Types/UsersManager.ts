import { v4 as uuidv4 } from "uuid";
import User from "./User.js";
import { DBUserModel } from "../Db/index.js";
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

    async createUser(name: string, email: string, password:string, role: "student" | "teacher" | ""):Promise<User> {
        const user = new User(name, email,password, role);
        this.users.push(user);
        // const yash = new User({ name: 'yash1', email: 'yash1@gmail.com', password: 'yashpwd', role: 'Teacher' })
        await new DBUserModel({id: user.getId(),name: user.getName(),email: user.getEmail(),password: user.getPassword() , role: user.getUserRole()}).save()
        return user;
    }
}