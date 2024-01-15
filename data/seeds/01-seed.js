const bcrypt = require("bcryptjs");

exports.seed = function (knex, Promise) {
  const hashedPassword = bcrypt.hashSync("foobar", 8);

  return knex("users")
    .truncate()
    .then(function () {
      return knex("users").insert([
        { username: "Captain Marvel", password: hashedPassword },
      ]);
    });
};
