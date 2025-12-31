import { v4 as uuidv4 } from "uuid";
export default class Attendance{
    
    private id: string;
    private classId: string;
    private studentId: string;
    private status: "present" | "absent";

    constructor(classId: string, studentId: string , status: "present" | "absent") {
        this.id = uuidv4();
        this.classId = classId;
        this.studentId = studentId;
        this.status = status
    }
    getId() {
        return this.id;
    }

    getClassId() {
        return this.classId;
    }

    getStudentId() {
        return this.studentId;
    }

    getStatus() {
        return this.status;
    }
}