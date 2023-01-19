const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
	// find all tags
	// be sure to include its associated Product data
	Tag.findAll({
		include: [
			{
				model: Product,
			},
		],
	})
		.then((tags) => {
			return res.json(tags);
		})
		.catch((error) => {
			console.log(error);
			res.send(error);
		});
});

router.get("/:id", (req, res) => {
	// find a single tag by its `id`
	// be sure to include its associated Product data
	Tag.findOne({
		where: {
			id: req.params.id,
		},
		include: [
			{
				model: Product,
			},
		],
	})
		.then((tag) => {
			return res.json(tag);
		})
		.catch((error) => {
			console.log(error);
			res.send(error);
		});
});

router.post("/", (req, res) => {
	// create a new tag
});

router.put("/:id", (req, res) => {
	// update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
	// delete on tag by its `id` value
});

module.exports = router;
