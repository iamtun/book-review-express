import Express from "express";
import router from "./routers/index.js";
import session from "express-session";

const app = Express();
const PORT = 3000;

app.use(Express.json());
app.use(
  session({
    secret: "book_review", // Replace with your secret key
    resave: false, // Forces the session to be saved back to the session store
    saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
