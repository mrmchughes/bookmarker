/* eslint-disable no-undef */
const categoryRouter = require("express").Router();

const { Category, Bookmark } = require("../db");

const categoryDetailHTML = require("../../views/getCategories");

categoryRouter.get("/:id", async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id);
        const bookmarks = await Bookmark.findAll({
            where: {
                categoryId: req.params.id,
            },
        });
        res.send(categoryDetailHTML(category, bookmarks));
    } catch (error) {
        console.log("Error in GET /bookmarks/:id");
        next(error);
    }
});

module.exports = categoryRouter;