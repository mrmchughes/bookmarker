/* eslint-disable no-undef */
const { Category } = require('../db/index');

const checkPostBody = async (req, res, next) => {
    const body = req.body;
    if (
        Object.keys(body).length === 2
    ) {
        next();
    } else {
        res.status(400).json({
            message: 
            "Bad form data. Please provide a name and category for the bookmark"
        });
    }
};

const checkCategory = async (req, res, next) => {
    try {
        const [category, created] = await Category.findOrCreate({
            where: { name: req.body.category}
        });

        if (category || created) {
            req.body.categoryId = category.id
            next();
        } else {
            res
                .status(400)
                .json({ message: "Could not add bookmark with that category"});
        }
    } catch (error) {
        console.log("Error in checkCategory middleware");
        next(error);
    }
};

module.export = {
    checkCategory,
    checkPostBody
}