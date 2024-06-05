const usersCollection = require("../config/db").collection("users");
const bcrypt = require("bcryptjs");

let User = function (data) {
  this.data = data;
  this.errors = [];
};

User.prototype.cleanUp = function () {
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
};

User.prototype.validate = async function () {
  if (this.data.username == "") {
    this.errors.push("You must provide a username.");
  }
  if (this.data.password == "") {
    this.errors.push("You must provide a password.");
  }

  let users = await usersCollection.find({}).toArray();
  users.forEach((user) => {
    if (user.username == this.data.username) {
      this.errors.push("That username is already taken.");
    }
  });
};

User.prototype.register = function () {
  return new Promise(async (resolve, reject) => {
    this.cleanUp();
    await this.validate();

    if (!this.errors.length) {
      // hash user password
      let salt = bcrypt.genSaltSync(10);
      this.data.password = bcrypt.hashSync(this.data.password, salt);
      await usersCollection.insertOne(this.data);
      resolve();
    } else {
      reject(this.errors);
    }
  });
};

User.prototype.login = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp();

    usersCollection
      .findOne({ username: this.data.username })
      .then((attemptedUser) => {
        if (
          attemptedUser &&
          bcrypt.compareSync(this.data.password, attemptedUser.password)
        ) {
          resolve("Congrats!");
        } else {
          reject("Invalid username/password.");
        }
      })
      .catch(() => {
        reject("Please try again later.");
      });
  });
};

User.findByUsername = function (username) {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await usersCollection.find({}).toArray();
      users.forEach((user) => {
        if (user.username == username) {
          resolve(user);
        }
      });
      reject("No user found.");
    } catch {
      reject('Please try again later.');
    }
  });
}

module.exports = User;
