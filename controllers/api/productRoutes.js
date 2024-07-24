const router = require('express').Router();
const { Product, Category } = require('../../models');

// The `/api/products` endpoint

// GET all products and associated tables
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['id', 'ASC']]
    });

    const plainProducts = products.map(product => product.toJSON());

    res.render('products', { products: plainProducts });
    // res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET product by id and associated tables
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
    });

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    };

    const plainProduct = product.toJSON()

    res.render('products', { product: plainProduct });
    // res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const newProduct = await Product.create({
      item_name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category
    });

    res.status(200).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteProduct) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(deleteProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;