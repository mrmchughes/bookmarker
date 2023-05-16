// eslint-disable-next-line no-undef
const Sequelize = require("sequelize");
const { STRING } = Sequelize;

const db = new Sequelize(`postgres://localhost:5432/bookmarker`, {
    logging: false,
});

const Bookmark = db.define("bookmark", {
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    url: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});

const Category = db.define("category", {
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});

Category.hasMany(Bookmark);
Bookmark.belongsTo(Category);

// eslint-disable-next-line no-undef
module.exports = {
    Category,
    db,
    Bookmark,
};