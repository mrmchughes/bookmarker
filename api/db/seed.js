// eslint-disable-next-line no-undef
const { Bookmark, db, Category } = require("./index");

const seed = async () => {
    try {
        await db.sync({force: true});

        const [coding, search, jobs] = await Promise.all([
            Category.create({
                name: "coding",
            }),
            Category.create({
                name: "search",
            }),
            Category.create({
                name: "jobs",
            })
        ]);

    await Promise.all([
        Bookmark.create({
          name: "Google",
          categoryId: search.id,
          url:
            "https://www.google.com/",
        }),
        Bookmark.create({
            name: "Stack Overflow",
            categoryId: coding.id,
            url:
              "https://stackoverflow.com/",
        }),
        Bookmark.create({
            name: "Bing",
            categoryId: search.id,
            url:
              "https://www.bing.com/",
        }),
        Bookmark.create({
            name: "LinkedIn",
            categoryId: jobs.id,
            url:
              "https://www.linkedin.com/",
        }),
        Bookmark.create({
            name: "Indeed",
            categoryId: jobs.id,
            url:
              "https://www.indeed.com/",
        }),
        Bookmark.create({
            name: "MDN",
            categoryId: coding.id,
            url:
              "https://developer.mozilla.org/en-US/",
        }),
      ]);
  
      db.close();
    } catch (error) {
      console.error(error);
      db.close();
    }   
};

seed();