import User from "../User.js";

import Database from "../../config/db.js";

export default class rUser extends User {
    constructor(data) {
        super(data);
        this.temp = data;

        this.database = new Database();
        this.usersCollection = this.database.db.collection("RaJ/users");
    }

    cleanUp() {
        super.cleanUp();
        if (typeof this.temp.role != "string") { this.temp.role = ""; }
        if (typeof this.temp.course != "string") { this.temp.course = ""; }
        if (typeof this.temp.email != "string") { this.temp.email = ""; }
        if (typeof this.temp.color != "string") { this.temp.color = ""; }

        this.data = {
            ...this.data,
            role: this.temp.role.trim(),
            course: this.temp.course.trim(),
            email: this.temp.email.trim(),
            color: this.temp.color.trim()
        };
    }

    async validate() {
        await super.validate();
        if (this.data.role == "") {
            this.errors.push("You must provide a role.");
        }
        if (this.data.course == "" && this.data.role != "admin") {
            this.errors.push("You must provide a course.");
        }
        if (this.data.email == "" && this.data.role != "admin") {
            this.errors.push("You must provide an email.");
        }

        if (this.data.role == "teacher" && this.data.color == "") {
            this.errors.push("You must provide a color.");
        }
    }
}