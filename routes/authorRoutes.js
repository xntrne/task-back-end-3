//routing authors data
const { Router } = require("express");
const {
  getAllOrSearchAuthors,
  getAuthorByName,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");
const validateBody = require("../middlewares/validateBody");
const validateQuery = require("../middlewares/validateQuery");
const validateParams = require("../middlewares/validateParams");
const {
  createAuthorBodySchema,
  updateAuthorBodySchema,
  authorSearchQuerySchema,
  authorNameParamsSchema,
} = require("../schemas/authorSchemas");

const router = Router();

router.get("/", validateQuery(authorSearchQuerySchema), getAllOrSearchAuthors);
router.post("/", validateBody(createAuthorBodySchema), createAuthor);

router.get("/:name", validateParams(authorNameParamsSchema), getAuthorByName);

router.patch(
  "/:name",
  validateParams(authorNameParamsSchema),
  validateBody(updateAuthorBodySchema),
  updateAuthor
);
router.put(
  "/:name",
  validateParams(authorNameParamsSchema),
  validateBody(updateAuthorBodySchema),
  updateAuthor
);

router.delete("/:name", validateParams(authorNameParamsSchema), deleteAuthor);

module.exports = router;
