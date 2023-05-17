// eslint-disable-next-line no-undef
module.exports = (category, bookmarks) => {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/style.css" />
    <title>Bookmarker</title>
</head>

<body>
<header>
  <button><a id="back" href="/">Back</a></button>
  <h1> Bookmarker </h1>
</header>
<h2>${category.name}</h2>
<section class="bookmarksList">
${bookmarks
  .map((bookmark) => {
    return `
    <section class="categoryBookmarkCard">
        <h2>${bookmark.name}</h2>
        <h3>${bookmark.url}</h3>
        <form class="deleteBookmark" action="/bookmarks/${bookmark.id}?_method=DELETE" method="POST"><button>X</button></form>
    </section>`;
  })
  .join("")}
</section>
</body>
</html>
    `;
}