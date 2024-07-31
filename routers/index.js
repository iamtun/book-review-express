import { Router } from "express";
import BookRouter from "./book.router.js";
import UserRouter from "./user.router.js";

const router = Router();

router.use("/books", BookRouter);
router.use("/users", UserRouter);

export default router;
