// const mongoose = require('mongoose');

// const supplierSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   mobile: { type: String, required: true },
//   // address: { type: String, required: true },
//   // orders: [
//   //   {
//   //     product: { type: String, required: true },
//   //     amount: { type: Number, required: true }
//   //   }
//   // ],
//   status: {
//     type: String,
//     enum: ['Pending', 'Done'],
//     default: 'Pending'
//   }
// });


// module.exports = mongoose.model('Supplier', supplierSchema);



// const mongoose = require('mongoose');

// const supplierSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   mobile: { type: String, required: true },
//   // optional: you can add address here if needed
//   vegetables: [
//     {
//       vegetableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vegetable' },
//       quantityKg: { type: Number, default: 0 },
//       pricePerKg: { type: Number, default: 0 },
//       rowTotal: { type: Number, default: 0 },
//       status: { type: String, enum: ['Pending', 'Delivered'], default: 'Pending' }
//     }
//   ],
//   status: {
//     type: String,
//     enum: ['Pending', 'Done'],
//     default: 'Pending'
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Supplier', supplierSchema);



// const mongoose = require('mongoose');

// const supplierSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   mobile: { type: String, required: true },
//   vegetables: [
//     {
//       vegetableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vegetable' },
//       quantityKg: { type: Number, default: 0 },
//       pricePerKg: { type: Number, default: 0 },
//       rowTotal: { type: Number, default: 0 },
//       status: { type: String, enum: ['Pending', 'Delivered'], default: 'Pending' }
//     }
//   ],
//   status: {
//     type: String,
//     enum: ['Pending', 'Done'],
//     default: 'Pending'
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Supplier', supplierSchema);



const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  vegetables: [
    {
      name: { type: String, required: true },       // vegetable name
      quantityKg: { type: Number, default: 0 },
      pricePerKg: { type: Number, default: 0 },
      rowTotal: { type: Number, default: 0 },
      status: { type: String, enum: ['Pending', 'Delivered'], default: 'Pending' }
    }
  ],
  status: {
    type: String,
    enum: ['Pending', 'Done'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);
