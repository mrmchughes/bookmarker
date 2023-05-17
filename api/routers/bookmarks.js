/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const bookmarkRouter = require("express").Router();

const { Bookmark, Category } = require("../db/index");

const { checkPostBody, checkCategory } = require("../middlewares/bookmarkHandler");

const getBookmarkHTML = require("../../views/getBookmarks");

bookmarkRouter.get("/", async (req, res, next) => {
    try {
        const bookmarks = await Bookmark.findAll({
            attributes: ["id","name", "url"],
            
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

bookmarkRouter.post("/", async (req, res, next) => {
    try {
        const { name, url, categoryId } = req.body;
        await Bookmark.create({ name, url, categoryId });
        res.redirect("/categories/" + categoryId);
    } catch (error) {
        console.log("Error in POST /bookmarks");
        next(error);
    }
})

bookmarkRouter.delete("/:id", async (req, res, next) => {
    try {
        const bookmark = await Bookmark.findByPk(req.params.id);
        await bookmark.destroy();
        
        res.redirect("/");
    } catch (error) {
        console.log("Error in DEL /bookmarks");
        next(error);
    }
});

module.exports = bookmarkRouter;

//get middleware fixed