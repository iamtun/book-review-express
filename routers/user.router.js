import { Router } from "express";
import userService from "../services/user.service.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    try {
      await userService.saveUser({ username, password });
      return res.status(201).json({
        message: "Customer successfully registered. Now you can login.",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res
      .status(404)
      .json({ error: "username and password are required" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    try {
      const { accessToken } = await userService.verifyUser(username, password);
      req.session.authorization = { accessToken };

      return res.status(201).json({
        message: "Customer successfully logged in.",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res
      .status(404)
      .json({ error: "username and password are required" });
  }
});

export default router;
