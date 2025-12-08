require("dotenv").config(); // load .env file

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running inside a docker container!");
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
