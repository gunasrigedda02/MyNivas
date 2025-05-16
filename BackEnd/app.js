const express = require("express");
const dotEnv = require("dotenv");

const app = express();

const PORT = 10000;

app.listen(PORT, () => {
    console.log(`Server run at ${PORT}`)
})