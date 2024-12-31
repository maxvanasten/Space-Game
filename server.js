// Create express server to host static files in ./new

const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "client")));

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
