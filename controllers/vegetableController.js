// // controllers/vegetableController.js
// const Vegetable = require('../models/Vegetable');

// // Add new vegetable
// const addVegetable = async (req, res) => {
//   try {
//     const { name, pricePerKg, availableKg } = req.body;

//     const imageUrl = req.file ? `/uploads/${req.file.filename}` : ''; // ✅ Get image path if uploaded

//     const vegetable = new Vegetable({ name, pricePerKg, availableKg, imageUrl });

//     await vegetable.save();
//     res.status(201).json(vegetable);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to add vegetable", error: err.message });
//   }
// };

// // Get all vegetables
// const getVegetables = async (req, res) => {
//   try {
//     const vegetables = await Vegetable.find();
//     res.json(vegetables);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch vegetables" });
//   }
// };

// // Update vegetable
// const updateVegetable = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updated = await Vegetable.findByIdAndUpdate(id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to update vegetable", error: err.message });
//   }
// };

// // Delete vegetable
// const deleteVegetable = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Vegetable.findByIdAndDelete(id);
//     res.json({ message: "Vegetable deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to delete vegetable", error: err.message });
//   }
// };

// module.exports = {
//   addVegetable,
//   getVegetables,
//   updateVegetable,
//   deleteVegetable
// };


// controllers/vegetableController.js
// const Vegetable = require('../models/Vegetable');

// /**
//  * Add new vegetable
//  * - Accepts file upload via multer (field name: "image")
//  * - Or accepts an image URL string in req.body.image
//  * - Casts numeric fields from strings if necessary
//  */
// const addVegetable = async (req, res) => {
//   try {
//     const { name } = req.body;
//     let { pricePerKg, availableKg } = req.body;

//     if (!name) {
//       return res.status(400).json({ message: 'Name is required' });
//     }

//     // Cast numbers safely (handle strings from form-data)
//     pricePerKg = pricePerKg !== undefined && pricePerKg !== '' ? Number(pricePerKg) : 0;
//     availableKg = availableKg !== undefined && availableKg !== '' ? Number(availableKg) : 0;

//     // Determine image: uploaded file (preferred) or image URL in body
//     let image = '';
//     if (req.file) {
//       // Multer should save in public/uploads and server should serve '/uploads'
//       image = `/uploads/${req.file.filename}`;
//     } else if (req.body.image) {
//       image = String(req.body.image).trim();
//     }

//     const vegetable = new Vegetable({
//       name,
//       pricePerKg,
//       availableKg,
//       image, // IMPORTANT: use property name "image" to match schema
//     });

//     await vegetable.save();
//     return res.status(201).json(vegetable);
//   } catch (err) {
//     console.error('addVegetable error:', err);
//     // duplicate key (unique name) handling
//     if (err && err.code === 11000) {
//       return res.status(409).json({ message: 'A vegetable with this name already exists' });
//     }
//     return res.status(500).json({ message: 'Failed to add vegetable', error: err.message });
//   }
// };

// /**
//  * Get all vegetables
//  */
// const getVegetables = async (req, res) => {
//   try {
//     const vegetables = await Vegetable.find().sort({ createdAt: -1 });
//     return res.json(vegetables);
//   } catch (err) {
//     console.error('getVegetables error:', err);
//     return res.status(500).json({ message: 'Failed to fetch vegetables', error: err.message });
//   }
// };

// /**
//  * Update vegetable
//  * - supports updating via req.body and optional uploaded file (field name "image")
//  */
// const updateVegetable = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = {};

//     // Accept only fields we expect
//     if (req.body.name !== undefined) updateData.name = req.body.name;
//     if (req.body.pricePerKg !== undefined && req.body.pricePerKg !== '')
//       updateData.pricePerKg = Number(req.body.pricePerKg);
//     if (req.body.availableKg !== undefined && req.body.availableKg !== '')
//       updateData.availableKg = Number(req.body.availableKg);

//     // If a new file uploaded, use that
//     if (req.file) {
//       updateData.image = `/uploads/${req.file.filename}`;
//     } else if (req.body.image !== undefined) {
//       // allow updating image via URL string too
//       updateData.image = String(req.body.image).trim();
//     }

//     const updated = await Vegetable.findByIdAndUpdate(id, updateData, { new: true });
//     if (!updated) {
//       return res.status(404).json({ message: 'Vegetable not found' });
//     }
//     return res.json(updated);
//   } catch (err) {
//     console.error('updateVegetable error:', err);
//     if (err && err.code === 11000) {
//       return res.status(409).json({ message: 'A vegetable with this name already exists' });
//     }
//     return res.status(500).json({ message: 'Failed to update vegetable', error: err.message });
//   }
// };

// /**
//  * Delete vegetable
//  */
// const deleteVegetable = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Vegetable.findByIdAndDelete(id);
//     if (!deleted) {
//       return res.status(404).json({ message: 'Vegetable not found' });
//     }
//     return res.json({ message: 'Vegetable deleted successfully' });
//   } catch (err) {
//     console.error('deleteVegetable error:', err);
//     return res.status(500).json({ message: 'Failed to delete vegetable', error: err.message });
//   }
// };

// module.exports = {
//   addVegetable,
//   getVegetables,
//   updateVegetable,
//   deleteVegetable,
// };


//newww


const Vegetable = require('../models/Vegetable');

/**
 * Add new vegetable
 * - Accepts file upload via multer (field name: "image")
 * - Or accepts an image URL string in req.body.image
 * - Casts numeric fields from strings if necessary
 */
const addVegetable = async (req, res) => {
  try {
    const { name } = req.body;
    let { pricePerKg, availableKg } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    // Cast numbers safely (handle strings from form-data)
    pricePerKg =
      pricePerKg !== undefined && pricePerKg !== "" ? Number(pricePerKg) : 0;
    availableKg =
      availableKg !== undefined && availableKg !== "" ? Number(availableKg) : 0;

    // Determine image
    let image = "";
    if (req.file) {
      // Convert file buffer to Base64 (store in DB)
      const base64 = req.file.buffer.toString("base64");
      const mimeType = req.file.mimetype;
      image = `data:${mimeType};base64,${base64}`;
    } else if (req.body.image) {
      image = String(req.body.image).trim(); // allow direct URL
    }

    const vegetable = new Vegetable({
      name,
      pricePerKg,
      availableKg,
      image, // stored as Base64 or external URL
    });

    await vegetable.save();
    return res.status(201).json(vegetable);
  } catch (err) {
    console.error("addVegetable error:", err);
    if (err && err.code === 11000) {
      return res
        .status(409)
        .json({ message: "A vegetable with this name already exists" });
    }
    return res
      .status(500)
      .json({ message: "Failed to add vegetable", error: err.message });
  }
};

/**
 * Get all vegetables
 */
const getVegetables = async (req, res) => {
  try {
    const vegetables = await Vegetable.find().sort({ createdAt: -1 });
    return res.json(vegetables);
  } catch (err) {
    console.error("getVegetables error:", err);
    return res
      .status(500)
      .json({ message: "Failed to fetch vegetables", error: err.message });
  }
};

/**
 * Update vegetable
 */
const updateVegetable = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {};

    if (req.body.name !== undefined) updateData.name = req.body.name;
    if (req.body.pricePerKg !== undefined && req.body.pricePerKg !== "")
      updateData.pricePerKg = Number(req.body.pricePerKg);
    if (req.body.availableKg !== undefined && req.body.availableKg !== "")
      updateData.availableKg = Number(req.body.availableKg);

    if (req.file) {
      const base64 = req.file.buffer.toString("base64");
      const mimeType = req.file.mimetype;
      updateData.image = `data:${mimeType};base64,${base64}`;
    } else if (req.body.image !== undefined) {
      updateData.image = String(req.body.image).trim();
    }

    const updated = await Vegetable.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Vegetable not found" });
    }
    return res.json(updated);
  } catch (err) {
    console.error("updateVegetable error:", err);
    if (err && err.code === 11000) {
      return res
        .status(409)
        .json({ message: "A vegetable with this name already exists" });
    }
    return res
      .status(500)
      .json({ message: "Failed to update vegetable", error: err.message });
  }
};

/**
 * Delete vegetable
 */
const deleteVegetable = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Vegetable.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Vegetable not found" });
    }
    return res.json({ message: "Vegetable deleted successfully" });
  } catch (err) {
    console.error("deleteVegetable error:", err);
    return res
      .status(500)
      .json({ message: "Failed to delete vegetable", error: err.message });
  }
};

module.exports = {
  addVegetable,
  getVegetables,
  updateVegetable,
  deleteVegetable,
};
