// const express = require('express');
// const router = express.Router();
// const Supplier = require('../models/supplierModel');

// // POST: Add Supplier
// router.post('/', async (req, res) => {
//   try {
//     const newSupplier = new Supplier(req.body);
//     await newSupplier.save();
//     res.status(201).json({ message: 'Supplier added successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error adding supplier', error: err });
//   }
// });
// router.put('/:id/status', async (req, res) => {
//   try {
//     const { status } = req.body;
//     const supplier = await Supplier.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );
//     res.json(supplier);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating status', error });
//   }
// });

// // GET: View Suppliers (optional)
// router.get('/', async (req, res) => {
//   const suppliers = await Supplier.find();
//   res.json(suppliers);
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Supplier = require('../models/supplierModel');

// // ---------------------------
// // POST: Add Supplier
// // ---------------------------
// router.post('/', async (req, res) => {
//   try {
//     const newSupplier = new Supplier(req.body);
//     await newSupplier.save();
//     res.status(201).json({ message: 'Supplier added successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error adding supplier', error: err });
//   }
// });

// // ---------------------------
// // PUT: Update Supplier Status (your original route)
// // ---------------------------
// router.put('/:id/status', async (req, res) => {
//   try {
//     const { status } = req.body;
//     const supplier = await Supplier.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );
//     res.json(supplier);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating status', error });
//   }
// });

// // ---------------------------
// // GET: View Suppliers (with optional date filter)
// // ---------------------------
// router.get('/', async (req, res) => {
//   try {
//     const { date } = req.query; // expects YYYY-MM-DD
//     let query = {};

//     if (date) {
//       const start = new Date(date);
//       start.setHours(0, 0, 0, 0);
//       const end = new Date(date);
//       end.setHours(23, 59, 59, 999);
//       query.createdAt = { $gte: start, $lte: end };
//     }

//     const suppliers = await Supplier.find(query).sort({ createdAt: -1 });
//     res.json(suppliers);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching suppliers', error: err });
//   }
// });

// // ---------------------------
// // PUT: Update Supplier (name, mobile, vegetables)
// // ---------------------------
// router.put('/:id', async (req, res) => {
//   try {
//     const { name, mobile, vegetables } = req.body;

//     const updatedSupplier = await Supplier.findByIdAndUpdate(
//       req.params.id,
//       {
//         ...(name && { name }),
//         ...(mobile && { mobile }),
//         ...(vegetables && { vegetables }), // ✅ full veg update
//       },
//       { new: true }
//     );

//     if (!updatedSupplier) {
//       return res.status(404).json({ message: 'Supplier not found' });
//     }

//     res.json(updatedSupplier);
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating supplier', error: err });
//   }
// });

// // ---------------------------
// // DELETE: Remove Supplier
// // ---------------------------
// router.delete('/:id', async (req, res) => {
//   try {
//     const supplier = await Supplier.findByIdAndDelete(req.params.id);
//     if (!supplier) {
//       return res.status(404).json({ message: 'Supplier not found' });
//     }
//     res.json({ message: 'Supplier deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting supplier', error: err });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplierModel');

// ---------------------------
// POST: Add Supplier
// ---------------------------
router.post('/', async (req, res) => {
  try {
    const newSupplier = new Supplier(req.body);
    await newSupplier.save();
    res.status(201).json({ message: 'Supplier added successfully', supplier: newSupplier });
  } catch (err) {
    res.status(500).json({ message: 'Error adding supplier', error: err });
  }
});

// ---------------------------
// GET: View Suppliers (optional date filter)
// ---------------------------
router.get('/', async (req, res) => {
  try {
    const { date } = req.query; // expects YYYY-MM-DD
    let query = {};

    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      query.createdAt = { $gte: start, $lte: end };
    }

    const suppliers = await Supplier.find(query).sort({ createdAt: -1 });
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching suppliers', error: err });
  }
});

// ---------------------------
// PUT: Update Supplier (name, mobile, vegetables)
// ---------------------------
router.put('/:id', async (req, res) => {
  try {
    const { name, mobile, vegetables } = req.body;

    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      {
        ...(name !== undefined && { name }),
        ...(mobile !== undefined && { mobile }),
        ...(vegetables !== undefined && { vegetables }) // full vegetables update
      },
      { new: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    res.json(updatedSupplier);
  } catch (err) {
    res.status(500).json({ message: 'Error updating supplier', error: err });
  }
});

// ---------------------------
// PUT: Update Supplier Status (optional)
// ---------------------------
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error });
  }
});

// ---------------------------
// DELETE: Remove Supplier
// ---------------------------
router.delete('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.json({ message: 'Supplier deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting supplier', error: err });
  }
});

module.exports = router;
