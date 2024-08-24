import Database from "../config/db.js";

import bcrypt from "bcryptjs";

export default class User {
  constructor(data) {
    this.data = data;
    this.errors = [];

    this.database = new Database();
    this.usersCollection = this.database.db.collection("users");
  }

  findByUsername(username) {
    return new Promise(async (resolve, reject) => {
      try {
        let users = await this.usersCollection.find({}).toArray();
        users.forEach((user) => {
          if (user.username == username) {
            resolve(user);
          }
        });
        reject("No user found.");
      } catch {
        reject("Please try again later.");
      }
    });
  }

  cleanUp() {
    if (typeof this.data.username != "string") {
      this.data.username = "";
    }
    if (typeof this.data.password != "string") {
      this.data.password = "";
    }

    this.data = {
      username: this.data.username.trim().toLowerCase(),
      password: this.data.password,
    };
  }

  async validate() {
    if (this.data.username == "") {
      this.errors.push("You must provide a username.");
    }
    if (this.data.password == "") {
      this.errors.push("You must provide a password.");
    }

    let users = await this.usersCollection.find({}).toArray();
    users.forEach((user) => {
      if (user.username == this.data.username) {
        this.errors.push("That username is already taken.");
      }
    });
  }
  
  register() {
    return new Promise(async (resolve, reject) => {
      this.cleanUp();
      await this.validate();

      if (!this.errors.length) {
        let salt = bcrypt.genSaltSync(10);
        this.data.password = bcrypt.hashSync(this.data.password, salt);
        await this.usersCollection.insertOne(this.data);
        resolve();
      } else {
        reject(this.errors);
      }
    });
  }
  login() {
    return new Promise((resolve, reject) => {
      this.cleanUp();

      this.usersCollection
        .findOne({ username: this.data.username })
        .then((attemptedUser) => {
          if (
            attemptedUser &&
            bcrypt.compareSync(this.data.password, attemptedUser.password)
          ) {
            resolve();
          } else {
            reject("Invalid username/password.");
          }
        })
        .catch(() => {
          reject("Please try again later.");
        });
    });
  }
}
