const Product = require("../models/Product");

const getProductStats = async (req, res) => {
  try {
    const result = await Product.aggregate([
      //stage one
      {
        $match: {
          inStock: false,
          price: {
            $gte: 100, //less then 100
          },
        },
      },

      //stage 2 :group document
      {
        $group: {
          _id: "$category",
          avgPrice: {
            $avg: "$price",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Failed to insert product items!",
    });
  }
};
const getProductAnalysis = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          category: 'Electronic',
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$price",
          },
          averagePrice: {
            $avg: "$price",
          },
          maxProductPrice: {
            $max: "$price",
          },
          minProductPrice: {
            $min: "$price",
          },
        }
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          averagePrice: 1,
          minProductPrice: 1,
          maxProductPrice: 1,
          priceRange: {
            $subtract: ["$maxProductPrice", "$minProductPrice"],
          }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Failed to insert product items!",
    });
  }
};
const insertSampleProducts = async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "Gaming Laptop",
        category: "Electronic",
        price: 1200,
        inStock: true,
        tags: ["computer", "gaming", "tech"],
      },
      {
        name: "Wireless Mouse",
        category: "Accessory",
        price: 45,
        inStock: true,
        tags: ["peripherals", "computer", "wireless"],
      },
      {
        name: "Mechanical Keyboard",
        category: "Accessory",
        price: 110,
        inStock: false,
        tags: ["peripherals", "gaming", "typing"],
      },
      {
        name: "4K Monitor",
        category: "Electronic",
        price: 350,
        inStock: true,
        tags: ["display", "tech", "visuals"],
      },
      {
        name: "USB-C Hub",
        category: "Accessory",
        price: 30,
        inStock: true,
        tags: ["connectivity", "adapter", "tech"],
      },
    ];

    // Insert the sample products into the database
    const result = await Product.insertMany(sampleProducts);

    // Send a success response
    res.status(201).json({
      success: true,
      data: `Inserted ${result.length} sample products`,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Failed to insert product items!",
    });
  }
};

module.exports = {
  insertSampleProducts,
  getProductStats,
  getProductAnalysis,
};
