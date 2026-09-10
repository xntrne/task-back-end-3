const authors = require("../data/authors");
const { NotFoundError } = require("../errors/AppError");

// GET /authors
// GET /authors?search=name
// Returns every author, or - if a validated "search" query param is present -
// every author whose name starts with it (case-insensitive).
function getAllOrSearchAuthors(req, res) {
  const { search } = res.locals.query;

  if (!search) {
    res.json(authors);
    return;
  }

  const lowerCaseSearch = search.toLowerCase();
  const matchingAuthors = authors.filter((author) =>
    author.name.toLowerCase().startsWith(lowerCaseSearch)
  );

  res.json(matchingAuthors);
}

// GET /authors/:name
function getAuthorByName(req, res) {
  const author = authors.find((a) => a.name === req.params.name);

  if (!author) {
    throw new NotFoundError(`author ${req.params.name} not found`);
  }

  res.json(author);
}

// POST /authors
function createAuthor(req, res) {
  const newAuthor = req.body;
  authors.push(newAuthor);
  res.status(201).json(newAuthor);
}

// PATCH/PUT /authors/:name
function updateAuthor(req, res) {
  const authorIndex = authors.findIndex((a) => a.name === req.params.name);

  if (authorIndex === -1) {
    throw new NotFoundError(`author ${req.params.name} not found`);
  }

  authors[authorIndex] = { ...authors[authorIndex], ...req.body };
  res.json(authors[authorIndex]);
}

// DELETE /authors/:name
function deleteAuthor(req, res) {
  const authorIndex = authors.findIndex((a) => a.name === req.params.name);

  if (authorIndex === -1) {
    throw new NotFoundError(`author ${req.params.name} not found`);
  }

  const [deletedAuthor] = authors.splice(authorIndex, 1);
  res.json(deletedAuthor);
}

module.exports = {
  getAllOrSearchAuthors,
  getAuthorByName,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
