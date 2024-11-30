// routes/cartRoutes.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/authMiddleware');

const prisma = new PrismaClient();
const router = express.Router();

router.use(authMiddleware);

// Create a New Cart Entry
router.post('/addProduct', async (req, res) => {
  const { userId, productId, count } = req.body;

  if (!userId || !productId || count === undefined) {
    return res.status(404).json({ error: "All fields required" });
  }

  try {
    const cart = await prisma.cart.create({
      data: { userId, productId, count },
    });
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve Cart Entry by ID
router.get('/getById/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await prisma.cart.findUnique({
      where: { cartId: Number(id) },
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Partially Update a Cart Entry
router.patch('/patch/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedCart = await prisma.cart.update({
      where: { cartId: Number(id) },
      data,
    });

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Cart Entry
router.delete('/removeProduct/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.cart.delete({
      where: { cartId: Number(id) },
    });

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
