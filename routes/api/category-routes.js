const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
	// find all categories
	// be sure to include its associated Products
	Category.findAll({
		include: [
			{
				model: Product,
			},
		],
	})
		.then((categories) => {
			res.json(categories);
		})
		.catch((error) => {
			console.log(error);
			return res.json({
				message: "Unable to fetch categories!",
			});
		});
});

router.get("/:id", (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
	Category.findOne({
		where: {
			id: req.params.id,
		},
		include: {
			model: Product,
		},
	})
		.then((category) => {
			return res.json(category);
		})
		.catch((error) => {
			console.log(error);
			return res.json({
				message: "Unable to fetch categories!",
			});
		});
});

router.post("/", (req, res) => {
	// create a new category
	// req body should look like this
	// {
	// 	'category_name': "something"
	// }

	if (req.body.category_name) {
		Category.create({
			category_name: req.body.category_name,
		})
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => {
				if (err.name === "SequelizeUniqueConstraintError")
					return res.status(409).json("This category already exists");
				return res.status(400).json(err);
			});
	} else {
		return res
			.status(400)
			.json(
				'req body should look like this: {"category_name": "something"}'
			);
	}
});

router.put("/:id", (req, res) => {
	// update a category by its `id` value
	// req body should look like this
	// {
	// 	"category_name": "something"
	// }
	if (req.body.category_name) {
		Category.update(
			{
				category_name: req.body.category_name,
			},
			{
				where: { id: req.params.id },
			}
		)
			.then((result) => {
				if (result[0] === 1) res.status(200).json("Category updated");
				else
					res.status(400).json(
						"Category not updated (id not found or category already exists)"
					);
			})
			.catch((err) => {
				if (err.name === "SequelizeUniqueConstraintError")
					return res.status(409).json("This category already exists");
				return res.status(400).json(err);
			});
	} else {
		return res
			.status(400)
			.json(
				'req body should look like this: {"category_name": "something"}'
			);
	}
});

router.delete("/:id", (req, res) => {
	// delete a category by its `id` value
	Category.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then(() => {
			return res.json("Category removed");
		})
		.catch((error) => {
			console.log(error);
			return res.json(error);
		});
});

module.exports = router;
