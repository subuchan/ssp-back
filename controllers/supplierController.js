// const Supplier = require('../models/supplierModel');
// const Vegetable = require('../models/Vegetable');

// // Add supplier with all vegetables
// exports.addSupplier = async (req, res) => {
//   try {
//     const { name, mobile, address } = req.body;

//     const allVeggies = await Vegetable.find();
//     const vegetables = allVeggies.map(v => ({
//       vegetableId: v._id,
//       quantityKg: 0,
//       pricePerKg: 0,
//       rowTotal: 0,
//       checked: false,
//     }));

//     const supplier = new Supplier({ name, mobile, address, vegetables });
//     await supplier.save();

//     res.status(201).json(supplier);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get all suppliers
// exports.getSuppliers = async (req, res) => {
//   try {
//     const suppliers = await Supplier.find().populate('vegetableId').populate('vegetables.vegetableId');
//     res.json(suppliers);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update supplier vegetables
// exports.updateSupplier = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { vegetables } = req.body;

//     const updated = await Supplier.findByIdAndUpdate(
//       id,
//       { vegetables },
//       { new: true }
//     ).populate('vegetables.vegetableId');

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update supplier status
// exports.updateStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const updated = await Supplier.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete supplier
// exports.deleteSupplier = async (req, res) => {
//   try {
//     await Supplier.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Supplier deleted' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
