import {connectToDB} from "../src/db/mongo-db";
import {req} from "./test-helpers";
import {SETTINGS} from "../src/app/settings";

describe("/comments", () => {
    beforeAll(async () => {
        await connectToDB();
        // await req
        //   .delete(`${SETTINGS.PATH.TESTING}/all-data`)
        //   .expect(204);
    });
});
