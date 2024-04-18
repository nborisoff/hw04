import { req } from "./test-helpers";

import { SETTINGS } from "../src/app/settings";
import { connectToDB } from "../src/db/mongo-db";
import { ADMIN_AUTH } from "../src/modules/blogs/middleware/middlewares";

describe("/blog", () => {
  beforeAll(async () => {
    await connectToDB();
    // await req
    //   .delete(`${SETTINGS.PATH.TESTING}/all-data`)
    //   .expect(204);
  });

  const buff2 = Buffer.from(ADMIN_AUTH, "utf8");
  const codedAuth = buff2.toString("base64");

  it("auth: should get blogs array", async () => {
    const res = await req
      .get(SETTINGS.PATH.BLOGS)
      .set({ Authorization: "Basic " + codedAuth })
      .expect(200);

    // console.log(res.body)
    // expect(res.body.length).toBe(0)
  });

  it("should get empty array", async () => {
    await req.get(`${SETTINGS.PATH.BLOGS}?searchNameTerm=ew`).expect(200, []);
  });

  it("get blog posts", async () => {
    await req.get(`${SETTINGS.PATH.BLOGS}/66200762c2382275f3153333/posts`).expect(200);
  });

  it("should create blog", async () => {
    const newBlog = {
      name: "new blog",
      websiteUrl: "https://someurl.com",
      description: "description",
    };

    await req
      .post(SETTINGS.PATH.BLOGS)
      .set({ Authorization: "Basic " + codedAuth })
      .send(newBlog)
      .expect(201);
  });

  it("should create blog post", async () => {
    const newPost = {
      title: "ttl",
      shortDescription: "tsd",
      content: "tc",
    };

    await req
        .post(`${SETTINGS.PATH.BLOGS}/66200762c2382275f3152521/posts`)
        .set({ Authorization: "Basic " + codedAuth })
        .send(newPost)
        .expect(201);
  });

  it("should find blog", async () => {
    await req
      .get(`${SETTINGS.PATH.BLOGS}/66200762c2382275f3152520`)
      .set({ Authorization: "Basic " + codedAuth })
      .expect(200);
  });

  it(`should update blog`, async () => {
    await req
      .put(`${SETTINGS.PATH.BLOGS}/66200762c2382275f3152520`)
      .set({ Authorization: "Basic " + codedAuth })
      .send({
        name: "blog4",
        description: "d3",
        websiteUrl: "https://blog1.com",
      })
      .expect(204);
  });

  it("should return 404 after trying deleting non-existent blog", async () => {
    await req
      .delete(`${SETTINGS.PATH.BLOGS}/6620077bdda55b09b3d13c0f`)
      .set({ Authorization: "Basic " + codedAuth })
      .expect(404);
  });

  it("should return 404 after deleting blog", async () => {
    await req
      .delete(`${SETTINGS.PATH.BLOGS}/6620077bdda55b09b3d13c0f`)
      .set({ Authorization: "Basic " + codedAuth })
      .expect(204);
  });
});
