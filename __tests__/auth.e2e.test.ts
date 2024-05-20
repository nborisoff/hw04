import { connectToDB } from "../src/db/mongo-db";
import { req } from "./test-helpers";
import { SETTINGS } from "../src/app/settings";
import { ADMIN_AUTH } from "../src/modules/blogs/middleware/middlewares";

describe("/auth", () => {
  beforeAll(async () => {
    await connectToDB();
    // await req
    //   .delete(`${SETTINGS.PATH.TESTING}/all-data`)
    //   .expect(204);
    // await req.post(`${SETTINGS.PATH.AUTH}/login`)
  });

  it("should return JWT", async () => {
    const res = await req
      .post(`${SETTINGS.PATH.AUTH}/login`)
      .send({ password: "password", loginOrEmail: "test" });
    console.log(res.body);
  });

  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjRiMzk4M2M4MGU2NWM0ZTE2OWU3YmEiLCJsb2dpbiI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5ydSIsImlhdCI6MTcxNjIxODg1MywiZXhwIjoxNzE2MjIyNDUzfQ.kIR8mSd1knJ0Lljjsfxaj0afrOQwrsx8xlf6pJHdGfw";

  it("should return user data", async () => {
    const res = await req.get(`${SETTINGS.PATH.AUTH}/me`).set({
      Authorization: `Bearer ${accessToken}`,
    });
    console.log(res.status);
  });

  const buff2 = Buffer.from(ADMIN_AUTH, "utf8");
  const codedAuth = buff2.toString("base64");

  it("should create user", async () => {
    const res = await req
      .post(SETTINGS.PATH.USERS)
      .set({ Authorization: "Basic " + codedAuth })
      .send({
        login: "test",
        password: "password",
        email: "test@test.ru",
      });
    console.log(res.body);
  });

  it("should return all users", async () => {
    const res = await req.get(SETTINGS.PATH.USERS);
    console.log(res.body);
  });
});
