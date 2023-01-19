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
	// req body should look like this
	// {
	// 	tag_name: "something"
	// }
	if (req.body.tag_name) {
		Tag.create({
			tag_name: req.body.tag_name,
		})
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => {
				if (err.name === "SequelizeUniqueConstraintError")
					return res.status(409).json("This tag already exists");
				return res.status(400).json(err);
			});
	} else {
		return res
			.status(400)
			.json("req body should look like this: {tag_name: 'something'}");
	}
});

router.put("/:id", (req, res) => {
	// update a tag's name by its `id` value
	// req body should look like this
	// {
	// 	tag_name: "something"
	// }
	if (req.body.tag_name) {
		Tag.update(
			{
				tag_name: req.body.tag_name,
			},
			{
				where: { id: req.params.id },
			}
		)
			.then((result) => {
				if (result[0] === 1) res.status(200).json("Tag updated");
				else
					res.status(400).json(
						"Tag not updated (id not found or it has this name already)"
					);
			})
			.catch((err) => {
				if (err.name === "SequelizeUniqueConstraintError")
					return res.status(409).json("This tag already exists");
				return res.status(400).json(err);
			});
	} else {
		return res
			.status(400)
			.json("req body should look like this: {tag_name: 'something'}");
	}
});

router.delete("/:id", (req, res) => {
	// delete on tag by its `id` value
	Tag.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then(() => {
			return res.json("Tag removed");
		})
		.catch((error) => {
			console.log(error);
			return res.json(error);
		});
});

module.exports = router;
