/* eslint-disable no-undef */
const bcrypt = require("bcryptjs");
const httpMethod = require("../testApiMethodService");
const { Users } = require("../../src/models");
const { createJwt } = require("../../src/utils/jwt");

describe("Test User Controller Api call", () => {
  const defaultUser = {
    role: 1,
    firstName: "jwt",
    lastName: "jwt",
    email: "jwt@zenika.com"
  };

  const exampleUser = {
    role: 1,
    firstName: "example",
    lastName: "example",
    email: "example@zenika.com",
    password: "admin"
  };

  let token = "";

  beforeAll(async () => {
    await Users.create({
      ...defaultUser,
      password: await bcrypt.hash("jwt", 10)
    });
    token = await createJwt(defaultUser);
  });

  it("Calls a protected route without cookies (fail)", async done => {
    await httpMethod.get("/api/users").expect(403);
    done();
  });

  it("Creates an user, signin, call a protected route", async done => {
    const createdUserResponse = await httpMethod.post("/api/users", token, {
      email: exampleUser.email,
      role: "admin",
      firstName: exampleUser.firstName,
      lastName: exampleUser.lastName
    });
    if (!createdUserResponse.ok) {
      console.error(createdUserResponse.error);
      fail(createdUserResponse.error.message);
    }
    const signinResponse = await httpMethod.post(
      "/api/users/signin",
      undefined,
      { email: exampleUser.email, password: exampleUser.password }
    );
    if (!signinResponse.ok) {
      console.error(signinResponse.error);
      fail(signinResponse.error.message);
    }
    const signin = signinResponse.body;
    console.log("signin", signin);
    await httpMethod.get("/api/users", token).expect(200);
    done();
  });
});
