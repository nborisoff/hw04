import { Router } from "express";
import { clearDb } from "./clearDbController";

export const testingRouter = Router();

testingRouter.delete("/all-data", clearDb);
