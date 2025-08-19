// const Order = require('../models/Order');

// // 📦 Place an order
// const placeOrder = async (req, res) => {
//   try {
//     const { customer, items } = req.body;

//     if (!customer || !items || items.length === 0) {
//       return res.status(400).json({ message: "Missing customer or order data" });
//     }

//     const newOrder = new Order({ customer, items });
//     await newOrder.save();

//     res.status(201).json({ message: "Order placed", order: newOrder });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to place order", error: err.message });
//   }
// };

// // 📅 Get all orders (with optional date filtering)
// const getOrders = async (req, res) => {
//   try {
//     const { date } = req.query;

//     let filter = {};
//     if (date) {
//       const start = new Date(date);
//       const end = new Date(date);
//       end.setDate(end.getDate() + 1); // Include whole day

//       filter.createdAt = {
//         $gte: start,
//         $lt: end,
//       };
//     }

//     const orders = await Order.find(filter).populate('items.vegetableId');
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to get orders", error: err.message });
//   }
// };

// // ✅ Mark order as delivered
// const markDelivered = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedOrder = await Order.findByIdAndUpdate(
//       id,
//       { status: 'Delivered' },
//       { new: true }
//     );
//     res.json(updatedOrder);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to update order", error: err.message });
//   }
// };

// module.exports = {
//   placeOrder,
//   getOrders,
//   markDelivered
// };


// const Vegetable = require('../models/Vegetable');
// const Order = require('../models/Order');

// const placeOrder = async (req, res) => {
//   try {
//     const { customer, items } = req.body;

//     if (!customer?.name || !customer?.phone) {
//       return res.status(400).json({ message: "Customer name and phone are required" });
//     }

//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "Order items are required" });
//     }

//     let totalAmount = 0;

//     const detailedItems = await Promise.all(
//       items.map(async (item) => {
//         const veg = await Vegetable.findById(item.vegetableId).populate('supplier');
//         if (!veg) {
//           throw new Error(`Vegetable not found: ${item.vegetableId}`);
//         }
//         const itemTotal = veg.pricePerKg * item.quantityKg;
//         totalAmount += itemTotal;

//         return {
//           vegetableId: veg._id,
//           name: veg.name,
//           tamilName: veg.tamilName,
//           image: veg.image,
//           supplierName: veg.supplier?.name || 'Unknown Supplier',
//           quantityKg: item.quantityKg,
//           pricePerKg: veg.pricePerKg,
//           totalPrice: itemTotal
//         };
//       })
//     );

//     const newOrder = new Order({
//       customer, // address not required
//       items: detailedItems,
//       totalAmount,
//       status: 'Pending'
//     });

//     await newOrder.save();
//     res.status(201).json({ message: "Order placed successfully", order: newOrder });

//   } catch (err) {
//     console.error("❌ Backend error:", err);
//     res.status(500).json({ message: "Failed to place order", error: err.message });
//   }
// };

// module.exports = { placeOrder ,};



// const Vegetable = require('../models/Vegetable');
// const Order = require('../models/Order');

// // Place new order
// const placeOrder = async (req, res) => {
//   try {
//     const { customer, items } = req.body;

//     if (!customer?.name || !customer?.phone) {
//       return res.status(400).json({ message: "Customer name and phone are required" });
//     }

//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "Order items are required" });
//     }

//     let totalAmount = 0;

//     const detailedItems = await Promise.all(
//       items.map(async (item) => {
//         const veg = await Vegetable.findById(item.vegetableId).populate('supplier');
//         if (!veg) {
//           throw new Error(`Vegetable not found: ${item.vegetableId}`);
//         }
//         const pricePerKg = Number(item.pricePerKg) || veg.pricePerKg;
//         const quantityKg = Number(item.quantityKg) || 0;
//         const itemTotal = pricePerKg * quantityKg;
//         totalAmount += itemTotal;

//         return {
//           vegetableId: veg._id,
//           name: veg.name,
//           quantityKg,
//           pricePerKg,
//           totalPrice: itemTotal,
//           supplierName: veg.supplier?.name || 'Unknown Supplier',
//         };
//       })
//     );

//     const newOrder = new Order({
//       customer,
//       items: detailedItems,
//       totalAmount,
//       status: 'Pending',
//     });

//     await newOrder.save();
//     res.status(201).json({ message: "Order placed successfully", order: newOrder });
//   } catch (err) {
//     console.error("❌ Backend error:", err);
//     res.status(500).json({ message: "Failed to place order", error: err.message });
//   }
// };

// // Get all orders
// const getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch orders" });
//   }
// };

// // Update order (edit items)
// const updateOrder = async (req, res) => {
//   try {
//     const { items } = req.body;
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     let totalAmount = 0;
//     const updatedItems = items.map(item => {
//       const quantityKg = Number(item.quantityKg) || 0;
//       const pricePerKg = Number(item.pricePerKg) || 0;
//       const totalPrice = quantityKg * pricePerKg;
//       totalAmount += totalPrice;

//       return { ...item, quantityKg, pricePerKg, totalPrice };
//     });

//     order.items = updatedItems;
//     order.totalAmount = totalAmount;

//     await order.save();
//     res.status(200).json({ message: "Order updated successfully", order });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to update order" });
//   }
// };

// // Delete order
// const deleteOrder = async (req, res) => {
//   try {
//     const order = await Order.findByIdAndDelete(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order not found" });
//     res.status(200).json({ message: "Order deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to delete order" });
//   }
// };

// // Mark delivered
// const markDelivered = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     order.status = req.body.status || "Pending";
//     await order.save();
//     res.status(200).json({ message: "Order status updated", order });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to update status" });
//   }
// };

// module.exports = { placeOrder, getOrders, updateOrder, deleteOrder, markDelivered };


// const Vegetable = require('../models/Vegetable');
// const Order = require('../models/Order');

// // Place new order
// const placeOrder = async (req, res) => {
//   try {
//     const { customer, items } = req.body;
//     if (!customer?.name || !customer?.phone) {
//       return res.status(400).json({ message: "Customer name and phone are required" });
//     }
//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "Order items are required" });
//     }

//     let totalAmount = 0;

//     const detailedItems = await Promise.all(
//       items.map(async (item) => {
//         const veg = await Vegetable.findById(item.vegetableId).populate('supplier');
//         if (!veg) throw new Error(`Vegetable not found: ${item.vegetableId}`);
//         const pricePerKg = Number(item.pricePerKg) || veg.pricePerKg;
//         const quantityKg = Number(item.quantityKg) || 0;
//         const itemTotal = pricePerKg * quantityKg;
//         totalAmount += itemTotal;

//         return {
//           vegetableId: veg._id,
//           name: veg.name,
//           tamilName: veg.tamilName,
//           image: veg.image,
//           supplierName: veg.supplier?.name || 'Unknown Supplier',
//           quantityKg,
//           pricePerKg,
//           totalPrice: itemTotal
//         };
//       })
//     );

//     const newOrder = new Order({
//       customer,
//       items: detailedItems,
//       totalAmount,
//       status: 'Pending'
//     });

//     await newOrder.save();
//     res.status(201).json({ message: "Order placed successfully", order: newOrder });
//   } catch (err) {
//     console.error("❌ Backend error:", err);
//     res.status(500).json({ message: "Failed to place order", error: err.message });
//   }
// };

// // Get all orders
// const getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch orders" });
//   }
// };

// // Update order (edit items)
// const updateOrder = async (req, res) => {
//   try {
//     const { items } = req.body;
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     let totalAmount = 0;
//     const updatedItems = items.map(item => {
//       const quantityKg = Number(item.quantityKg) || 0;
//       const pricePerKg = Number(item.pricePerKg) || 0;
//       const totalPrice = quantityKg * pricePerKg;
//       totalAmount += totalPrice;
//       return { ...item, quantityKg, pricePerKg, totalPrice };
//     });

//     order.items = updatedItems;
//     order.totalAmount = totalAmount;

//     await order.save();
//     res.status(200).json({ message: "Order updated successfully", order });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to update order" });
//   }
// };

// // Delete order
// const deleteOrder = async (req, res) => {
//   try {
//     const order = await Order.findByIdAndDelete(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order not found" });
//     res.status(200).json({ message: "Order deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to delete order" });
//   }
// };

// // Mark delivered
// const markDelivered = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     order.status = req.body.status || "Pending";
//     await order.save();
//     res.status(200).json({ message: "Order status updated", order });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to update status" });
//   }
// };

// module.exports = { placeOrder, getOrders, updateOrder, deleteOrder, markDelivered };


const mongoose = require('mongoose');
const Vegetable = require('../models/Vegetable');
const Order = require('../models/Order');

// ---------------------------
// POST /api/orders
// ---------------------------
const placeOrder = async (req, res) => {
  try {
    const { customerName, phone, products } = req.body;

    if (!customerName || !phone) {
      return res.status(400).json({ message: 'Customer name and phone are required' });
    }
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Order products are required' });
    }

    let totalAmount = 0;

    const detailedProducts = await Promise.all(
      products.map(async (p) => {
        const veg = await Vegetable.findById(p.productId);
        if (!veg) throw new Error(`Vegetable not found: ${p.productId}`);

        const quantity = Number(p.quantity) || 0;
        const pricePerKg = Number(p.price) || Number(veg.pricePerKg);
        const rowTotal = pricePerKg * quantity;

        totalAmount += rowTotal;

        return {
          vegetableId: veg._id,
          name: veg.name,
          quantityKg: quantity,
          pricePerKg,
          rowTotal,
          amount: rowTotal, // optional, mirrors rowTotal
        };
      })
    );

    const newOrder = new Order({
      customer: { name: customerName, phone },
      items: detailedProducts,
      totalAmount,
      status: false, // Pending
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error('❌ placeOrder error:', err);
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
};

// ---------------------------
// GET /api/orders
// ---------------------------
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error('❌ getOrders error:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// ---------------------------
// PUT /api/orders/:id
// ---------------------------
const updateOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items are required' });
    }

    let totalAmount = 0;
    const updatedItems = items.map((i) => {
      const quantityKg = Number(i.quantityKg) || 0;
      const pricePerKg = Number(i.pricePerKg) || 0;
      const rowTotal = quantityKg * pricePerKg;
      totalAmount += rowTotal;
      return {
        vegetableId: i.vegetableId,
        name: i.name,
        quantityKg,
        pricePerKg,
        rowTotal,
        amount: rowTotal,
      };
    });

    order.items = updatedItems;
    order.totalAmount = totalAmount;
    await order.save();

    res.status(200).json({ message: 'Order updated successfully', order });
  } catch (err) {
    console.error('❌ updateOrder error:', err);
    res.status(500).json({ message: 'Failed to update order' });
  }
};

// ---------------------------
// DELETE /api/orders/:id
// ---------------------------
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('❌ deleteOrder error:', err);
    res.status(500).json({ message: 'Failed to delete order' });
  }
};

// ---------------------------
// PUT /api/orders/:id/status
// ---------------------------
const markDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status === 'Delivered' ? true : false;
    await order.save();

    res.status(200).json({ message: 'Order status updated', order });
  } catch (err) {
    console.error('❌ markDelivered error:', err);
    res.status(500).json({ message: 'Failed to update status' });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  updateOrder,
  deleteOrder,
  markDelivered,
};
