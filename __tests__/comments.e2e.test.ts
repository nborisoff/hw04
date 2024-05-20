import { connectToDB } from "../src/db/mongo-db";
import { SETTINGS } from "../src/app/settings";
import { req } from "./test-helpers";

describe("/comments", () => {
  let token = "";

  beforeAll(async () => {
    await connectToDB();
    const res = await req
      .post(`${SETTINGS.PATH.AUTH}/login`)
      .send({ password: "password", loginOrEmail: "test" });
    token = res.body.accessToken;
  });

  it("should return comments", async () => {
    const postId = "664b942718e3d84cee356ce3";
    const res = await req.get(`${SETTINGS.PATH.POSTS}/${postId}/comments`);
    console.log(res.status, res.body);
  });

  it("should create comment", async () => {
    const postId = "664b942718e3d84cee356ce3";
    const res = await req
      .post(`${SETTINGS.PATH.POSTS}/${postId}/comments`)
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        content: "12345678901234567890",
        commentatorInfo: {
          userId: "664b8b56015361be2f4f6d63",
          userLogin: "test",
        },
        postId,
        createdAt: new Date().toISOString(),
      });
    console.log(res.status, res.body);
  });
});
