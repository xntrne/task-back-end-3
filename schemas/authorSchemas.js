const { z } = require("zod");

// Body for creating an author. Every field is required.
const createAuthorBodySchema = z.object({
  name: z.string().trim().min(1, "name is required"),
  nationality: z.string().trim().min(1, "nationality is required"),
});

// Body for updating an author. Every field is optional, but at least one
// must be present, otherwise there is nothing to update.
const updateAuthorBodySchema = createAuthorBodySchema
  .partial()
  .refine((body) => Object.keys(body).length > 0, {
    message: "at least one field (name, nationality) must be provided",
  });

// Query params for GET /authors?search=<term>. The search term is optional,
// but if present it must be a non-empty string.
const authorSearchQuerySchema = z.object({
  search: z.string().trim().min(1, "search must not be empty").optional(),
});

// Path params for routes like /authors/:name.
const authorNameParamsSchema = z.object({
  name: z.string().trim().min(1, "name param is required"),
});

module.exports = {
  createAuthorBodySchema,
  updateAuthorBodySchema,
  authorSearchQuerySchema,
  authorNameParamsSchema,
};

//i hope it don't blow up this time :(