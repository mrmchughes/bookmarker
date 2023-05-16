/* eslint-disable no-undef */
const express = require("express");
const override = require("method-override");

const bookmarkRouter = require("./routers/bookmarks");
const categoryRouter = require("./routers/categories");

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(express.static("public"));
server.use(override("_method"));

server.use("/bookmarks", bookmarkRouter);
server.use("/categories", categoryRouter);

server.get("/", (req, res) => {
    res.redirect("/bookmarks");
});

const PORT = 8000;

server.listen(PORT, () => {
    console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`);
});