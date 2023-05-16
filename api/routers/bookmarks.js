/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const bookmarkRouter = require("express").Router();

const { Bookmark, Category } = require("../db/index");

const { checkPostBody, checkSpecies } = require("../middlewares/bookmarkHandler");

const getBookmarkHTML = require("../../views/getBookmarks");

bookmarkRouter.get("/", async (req, res, next) => {
    try {
        const bookmarks = await Bookmark.findAll({
            attributes: ["id, name", "url"],
            
            include: [
                {
                    model: Category,
                    attributes: ["id", "name"],
                },
            ],
        });
        const categories = await Category.findAll();
        res.send(getBookmarkHTML(bookmarks, categories))
    } catch (error) {
        console.log("Error in GET /bookmarks");
        next(error);
    }
})

module.exports = bookmarkRouter;

//async does not work?