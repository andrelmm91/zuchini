const express = require("express");
const { createJSONToken, validateJSONToken } = require("../util/auth");
const { isValidEmail } = require("../util/validation");

const router = express.Router();

///////////////////////////////////////
// provide a token based on user email
router.post("/provide", async (req, res) => {
  const data = req.body;
  let errors = {};

  if (!isValidEmail(data.email)) {
    errors.email = "Invalid email.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Cannot provide a token. Email is invalid.",
      errors,
    });
  }

  const authToken = createJSONToken(data.email);

  res
    .status(201)
    .json({ message: "Token created.", email: data.email, token: authToken });
});

//////////////////////
// validate the token
router.post("/validate", async (req, res) => {
  const token = req.body.token;

  const validation = await validateJSONToken(token);

  res.json({ validation: validation.val });
});

module.exports = router;
