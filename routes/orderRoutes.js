// // routes/orderRoutes.js
// const express = require('express');
// const {
//   placeOrder,
//   getOrders,
//   markDelivered
// } = require('../controllers/orderController');

// const { protectAdmin } = require('../middlewares/authMiddleware');

// const router = express.Router();

// // User places order
// router.post('/', placeOrder);

// // Admin-only
// router.get('/', protectAdmin, getOrders);
// router.put('/:id/status', protectAdmin, markDelivered);

// module.exports = router;


// const express = require('express');
// const {
//   placeOrder,
//   getOrders,
//   updateOrder,
//   deleteOrder,
//   markDelivered
// } = require('../controllers/orderController');

// const { protectAdmin } = require('../middlewares/authMiddleware');

// const router = express.Router();

// // User places order
// router.post('/', placeOrder);

// // Admin-only routes
// router.get('/', protectAdmin, getOrders);
// router.put('/:id', protectAdmin, updateOrder);       // Edit order
// router.delete('/:id', protectAdmin, deleteOrder);    // Delete order
// router.put('/:id/status', protectAdmin, markDelivered); // Update status

// module.exports = router;


// const express = require('express');
// const {
//   placeOrder,
//   getOrders,
//   updateOrder,
//   deleteOrder,
//   updateOrderStatus
// } = require('../controllers/orderController');

// const { protect, protectAdmin } = require('../middlewares/authMiddleware');

// const router = express.Router();

// // ----------------- USER ROUTES -----------------
// router.post('/', protect, placeOrder); // Only logged-in users can place order

// // ----------------- ADMIN ROUTES -----------------
// router.get('/', protectAdmin, getOrders); // Get all orders
// router.put('/:id', protectAdmin, updateOrder); // Edit order
// router.delete('/:id', protectAdmin, deleteOrder); // Delete order

// // More flexible: update status (Pending, Packed, Delivered etc.)
// router.put('/:id/status', protectAdmin, updateOrderStatus);



// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");

// // Create Order
// router.post("/", async (req, res) => {
//   try {
//     const payload = req.body;

//     // Optional: sanity compute if not sent
//     if (!payload.totalPrice && Array.isArray(payload.products)) {
//       payload.totalPrice = payload.products.reduce(
//         (s, p) => s + Number(p.price) * Number(p.quantity), 0
//       );
//     }

//     const newOrder = new Order(payload);
//     await newOrder.save();
//     res.status(201).json(newOrder);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get all Orders
// router.get("/", async (_req, res) => {
//   try {
//     // const orders = await Order.find().sort({ createdAt: -1 });
//       const orders = await Order.find().sort({ createdAt: -1 })
//     .populate('items.vegetableId') // populate vegetable details
//     .exec();
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Update Order (name/phone/status/products/totalPrice)
// router.put("/:id", async (req, res) => {
//   try {
//     const updated = await Order.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Delete Order
// router.delete("/:id", async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.json({ message: "Order deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");

// // Create Order
// router.post("/", async (req, res) => {
//   try {
//     const payload = req.body;

//     // Optional: sanity compute if not sent
//     if (!payload.totalPrice && Array.isArray(payload.products)) {
//       payload.totalPrice = payload.products.reduce(
//         (s, p) => s + Number(p.price) * Number(p.quantity), 0
//       );
//     }

//     const newOrder = new Order(payload);
//     await newOrder.save();
//     res.status(201).json(newOrder);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get all Orders
// router.get("/", async (_req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 })
//       .populate('items.vegetableId') // populate vegetable details
//       .exec();
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Update Order (name/phone/status/products/totalPrice)
// router.put("/:id", async (req, res) => {
//   try {
//     const updated = await Order.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ New route: Update only status
// router.put("/:id/status", async (req, res) => {
//   try {
//     const { status } = req.body; // expects Boolean true/false
//     if (typeof status !== "boolean") {
//       return res.status(400).json({ error: "Status must be a boolean" });
//     }

//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ error: "Order not found" });
//     }

//     res.json(updatedOrder);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Delete Order
// router.delete("/:id", async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.json({ message: "Order deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }

  
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Create Order
router.post("/", async (req, res) => {
  try {
    const payload = req.body;

    if (!payload.totalPrice && Array.isArray(payload.products)) {
      payload.totalPrice = payload.products.reduce(
        (s, p) => s + Number(p.price) * Number(p.quantity),
        0
      );
    }

    const newOrder = new Order(payload);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all Orders
router.get("/", async (_req, res) => {
  try {
    // const orders = await Order.find()
    //   .sort({ createdAt: -1 })
    const orders=await Order.find().sort({createdAt:-1})
      .populate("items.vegetableId")
      .exec();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Order
router.put("/:id", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Order
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update Order Status (Delivered / Pending)
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body; // expect boolean true/false

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status }, // only update status
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Generate PDF for a single order
router.get("/:id/pdf", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.vegetableId");

    if (!order) return res.status(404).json({ error: "Order not found" });

    const doc = new PDFDocument();
    res.setHeader("Content-Disposition", `attachment; filename=Order_${order._id}.pdf`);
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    // Header
    doc.fontSize(18).text("Order Invoice", { align: "center" });
    doc.moveDown();

    // Customer Info
    doc.fontSize(12).text(`Name: ${order.customer.name}`);
    doc.text(`Phone: ${order.customer.phone}`);
    if (order.customer.address) doc.text(`Address: ${order.customer.address}`);
    doc.moveDown();

    // Table header
    doc.fontSize(12).text("Vegetable   Qty(Kg)   Price/Kg   Row Total");
    doc.moveDown();

    order.items.forEach((item) => {
      doc.text(
        `${item.vegetableId?.name || "N/A"}   ${item.quantityKg}   ₹${item.pricePerKg}   ₹${item.rowTotal}`
      );
    });

    doc.moveDown();
    doc.fontSize(14).text(`Total Amount: ₹${order.totalAmount}`, { align: "right" });

    doc.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
