import { userToken } from "../models/user.model.js";

export default function auth(req, res, next) {
  console.log("user token", userToken);
  let isValid = false;

  userToken.forEach((user) => {
    if (user.token === req.query.token) isValid = true;
  });

  if (isValid) {
    next();
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
