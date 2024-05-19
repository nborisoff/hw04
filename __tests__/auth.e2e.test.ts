import {connectToDB} from "../src/db/mongo-db";
import {req} from "./test-helpers";
import {SETTINGS} from "../src/app/settings";

describe("/auth", () => {
    beforeAll(async () => {
        await connectToDB();
        // await req
        //   .delete(`${SETTINGS.PATH.TESTING}/all-data`)
        //   .expect(204);
    });

    it("should return JWT", async () => {
        const res = await req
            .post(`${SETTINGS.PATH.AUTH}/login`)
            .send({"password": "qwerty1", "loginOrEmail": "lg-57382"})
        console.log(res.body)
    });
});
