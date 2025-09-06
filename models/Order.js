// // models/Order.js
// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema(
//   {
//     customer: {
//       name: {
//         type: String,
//         required: true,
//         trim: true
//       },
//       phone: {
//         type: String,
//         required: true,
//         trim: true
//       },
//       // address: {
//       //   type: String,
//       //   required: true,
//       //   trim: true
//       // }
//     },
//     items: [
//       {
//         vegetableId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'Vegetable',
//           required: true
//         },
//         quantityKg: {
//           type: Number,
//           required: true,
//           min: 0.1
//         }
//       }
//     ],
//     status: {
//       type: String,
//       enum: ['Pending', 'Delivered'],
//       default: 'Pending'
//     },
//     orderDate: {
//       type: Date,
//       default: Date.now
//     }
//   },
//   {
//     timestamps: true // adds createdAt and updatedAt automatically
//   }
// );

// module.exports = mongoose.model('Order', orderSchema);

// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   customer: {
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     // // Address optional
//     // address: { type: String, required: false }
//   },
//   items: [
//     {
//       vegetableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vegetable', required: true },
//       name: String,
//       tamilName: String,
//       image: String,
//       supplierName: String,
//       quantityKg: Number,
//       pricePerKg: Number,
//       totalPrice: Number
//     }
//   ],
//   totalAmount: { type: Number, required: true },
//   status: { type: String, default: 'Pending' }
// }, { timestamps: true });

// module.exports = mongoose.model('Order', orderSchema);


// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   customer: {
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     // Address optional
//     // address: { type: String, required: false }
//   },
//   items: [
//     {
//       vegetableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vegetable', required: true },
//       name: String,
//       supplierName: String,
//       quantityKg: Number,
//       pricePerKg: Number,
//       totalPrice: Number
//     }
//   ],
//   totalAmount: { type: Number, required: true },
//   status: { type: String, default: 'Pending' }
// }, { timestamps: true });

// module.exports = mongoose.model('Order', orderSchema);

// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   customer: {
//     name: { type: String, required: true },
//     phone: { type: String, required: true }
//   },
//   items: [
//     {
//       vegetableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vegetable', required: true },
//       name: { type: String, required: true },
//       quantityKg: { type: Number, required: true },
//       pricePerKg: { type: Number, required: true },
//       rowTotal: { type: Number, required: true }
//     }
//   ],
//   totalAmount: { type: Number, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Order', orderSchema);

// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     customerName: { type: String, required: true },
//     address: { type: String, required: true },
//     pin: { type: String, required: true },
//     phone: { type: String, required: true },
//     products: [
//       {
//         productId: { type: mongoose.Schema.Types.ObjectId, ref: "Vegetable" },
//         name: { type: String, required: true },
//         price: { type: Number, required: true },   // ✅ added price
//         quantity: { type: Number, required: true },
//       },
//     ],
//     totalPrice: { type: Number, required: true },  // ✅ added total
//     status: { type: String, default: "Pending" },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Order", orderSchema);


// models/Order.js
// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     customerName: { type: String, required: true },
//     phone: { type: String, required: true },
//     products: [
//       {
//         productId: { type: mongoose.Schema.Types.ObjectId, ref: "Vegetable" },
//         name: { type: String, required: true },
//         price: { type: Number, required: true },
//         quantity: { type: Number, required: true },
//       },
//     ],
//     totalPrice: { type: Number, required: true },
//     status: { type: String, default: "Pending" },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Order", orderSchema);


// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema(
//   {
//     customerName: { type: String, required: true },
//     phone: { type: String, required: true },
//     products: [
//       {
//         productId: { type: mongoose.Schema.Types.ObjectId, ref: "Vegetable" },
//         name: { type: String, required: true },
//         price: { type: Number, required: true },
//         quantity: { type: Number, required: true },
//       },
//     ],
//     totalPrice: { type: Number, required: true },
//     status: { type: String, default: "Pending" }, // Pending, Packed, Delivered etc.
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema);


// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema(
//   {
//     customerName: { type: String, required: true },
//     phone: { type: String, required: true },
//     products: [
//       {
//         productId: { type: mongoose.Schema.Types.ObjectId, ref: "Vegetable" },
//         name: { type: String, required: true },
//         price: { type: Number, required: true },
//         quantity: { type: Number, required: true },
//       },
//     ],
//     totalPrice: { type: Number, required: true },
//     status: { type: String, default: "Pending" }, // Pending, Packed, Delivered
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema);

// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   customer: {
//     name: String,
//     phone: String,
//     address: String, // include address
//   },
//   items: [
//     {
//       vegetableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vegetable'},
//       quantityKg: Number,
//       pricePerKg: Number,
//       rowTotal: Number, // quantityKg * pricePerKg
//       amount: Number,   // optional, can be same as rowTotal
//     },
//   ],
//   totalAmount: Number, // sum of all rowTotal or amount
//   status: { type: Boolean, default: false },
// }, { timestamps: true });

// module.exports = mongoose.model("Order", orderSchema);

//old

// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   customer: {
//     name: String,
//     phone: String,
//     // address: String,
//   },
//   items: [
//     {
//       vegetableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vegetable' },
//       quantityKg: { type: Number, required: true },
//       pricePerKg: { type: Number, required: true },
//       rowTotal: { type: Number, default: 0 },
//     },
//   ],
//   totalAmount: { type: Number, default: 0 }, // sum of all rowTotal
//   status: { type: Boolean, default: false },
// }, { timestamps: true });


// // 🔑 Auto calculate before saving
// orderSchema.pre("save", function (next) {
//   this.items.forEach(item => {
//     item.rowTotal = item.quantityKg * item.pricePerKg;
//   });
//   this.totalAmount = this.items.reduce((sum, item) => sum + item.rowTotal, 0);
//   next();
// });

// // 🔑 Auto calculate before update
// orderSchema.pre("findOneAndUpdate", function (next) {
//   const update = this.getUpdate();
//   if (update.items) {
//     update.items.forEach(item => {
//       item.rowTotal = item.quantityKg * item.pricePerKg;
//     });
//     update.totalAmount = update.items.reduce((sum, item) => sum + item.rowTotal, 0);
//   }
//   next();
// });

// module.exports = mongoose.model("Order", orderSchema);


// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   customer: {
//     name: String,
//     phone: String,
//     // address: String,
//   },
//   items: [
//     {
//       vegetableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vegetable' },
//       quantityKg: { type: Number, required: true },
//       pricePerKg: { type: Number, required: true },
//       rowTotal: { type: Number, default: 0 },
//     },
//   ],
//   totalAmount: { type: Number, default: 0 }, // sum of all rowTotal
//   status: { type: Boolean, default: false }, // false = pending, true = delivered
// }, { timestamps: true });

// // 🔑 Auto calculate before saving
// orderSchema.pre("save", function (next) {
//   this.items.forEach(item => {
//     item.rowTotal = item.quantityKg * item.pricePerKg;
//   });
//   this.totalAmount = this.items.reduce((sum, item) => sum + item.rowTotal, 0);
//   next();
// });

// // 🔑 Auto calculate before update
// orderSchema.pre("findOneAndUpdate", function (next) {
//   const update = this.getUpdate();
//   if (update.items) {
//     update.items.forEach(item => {
//       item.rowTotal = item.quantityKg * item.pricePerKg;
//     });
//     update.totalAmount = update.items.reduce((sum, item) => sum + item.rowTotal, 0);
//   }
//   next();
// });

// module.exports = mongoose.model("Order", orderSchema);


// const mongoose = require("mongoose");
// const Vegetable = require("./Vegetable");

// const orderSchema = new mongoose.Schema({
//   customer: {
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     // address: String, // optional
//   },
//   items: [
//     {
//       vegetableId: { type: mongoose.Schema.Types.ObjectId, ref: "Vegetable", required: true },
//       supplierName: { type: String }, // NEW: store supplier for summary
//       quantityKg: { type: Number, required: true },
//       pricePerKg: { type: Number, required: true },
//       rowTotal: { type: Number, default: 0 },
//     },
//   ],
//   totalAmount: { type: Number, default: 0 }, // sum of all rowTotal
//   status: { type: Boolean, default: false }, // false = pending, true = delivered
// }, { timestamps: true });

// // 🔑 Auto calculate before saving
// orderSchema.pre("save", async function (next) {
//   for (let item of this.items) {
//     // Calculate row total
//     item.rowTotal = item.quantityKg * item.pricePerKg;


//     // Auto-populate supplierName from Vegetable if missing
//     if (!item.supplierName) {
//       const veg = await Vegetable.findById(item.vegetableId);
//       if (veg) item.supplierName = veg.supplierName || "Unknown";
//     }
//   }
//   this.totalAmount = this.items.reduce((sum, item) => sum + item.rowTotal, 0);
//   next();
// });

// // 🔑 Auto calculate before update
// orderSchema.pre("findOneAndUpdate", async function (next) {
//   const update = this.getUpdate();

//   if (update.items) {
//     for (let item of update.items) {
//       item.rowTotal = item.quantityKg * item.pricePerKg;

//       // Auto-populate supplierName from Vegetable if missing
//       if (!item.supplierName) {
//         const veg = await Vegetable.findById(item.vegetableId);
//         if (veg) item.supplierName = veg.supplierName || "Unknown";
//       }
//     }
//     update.totalAmount = update.items.reduce((sum, item) => sum + item.rowTotal, 0);
//   }
//   next();
// });

// module.exports = mongoose.model("Order", orderSchema);


const mongoose = require("mongoose");
const Vegetable = require("./Vegetable");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      // address: String, // optional
    },
    items: [
      {
        vegetableId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Vegetable",
          required: true,
        },
        supplierName: { type: String }, // store supplier for summary
        quantityKg: { type: Number, required: true },
        pricePerKg: { type: Number, required: true },
        rowTotal: { type: Number, default: 0 },
      },
    ],
    totalAmount: { type: Number, default: 0 }, // sum of all rowTotal

    // 👇 change Boolean → String enum
    status: {
      type: String,
      enum: ["Pending", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

// 🔑 Auto calculate before saving
orderSchema.pre("save", async function (next) {
  for (let item of this.items) {
    // Calculate row total
    item.rowTotal = item.quantityKg * item.pricePerKg;

    // Auto-populate supplierName from Vegetable if missing
    if (!item.supplierName) {
      const veg = await Vegetable.findById(item.vegetableId);
      if (veg) item.supplierName = veg.supplierName || "Unknown";
    }
  }
  this.totalAmount = this.items.reduce((sum, item) => sum + item.rowTotal, 0);
  next();
});

// 🔑 Auto calculate before update
orderSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.items) {
    for (let item of update.items) {
      item.rowTotal = item.quantityKg * item.pricePerKg;

      // Auto-populate supplierName from Vegetable if missing
      if (!item.supplierName) {
        const veg = await Vegetable.findById(item.vegetableId);
        if (veg) item.supplierName = veg.supplierName || "Unknown";
      }
    }
    update.totalAmount = update.items.reduce(
      (sum, item) => sum + item.rowTotal,
      0
    );
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
