import Express from "express";
import router from "./routers/index.js";

const app = Express();
const PORT = 3000;

app.use(Express.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
