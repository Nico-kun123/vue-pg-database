import express from "express";
import path from "path";
// import fs from "fs/promises";

import bodyParser from "body-parser";

const router = express.Router();
router.use(express.json()).use(bodyParser.urlencoded({ extended: true }));

const environment = process.env.NODE_ENV || "dev";
console.log("👀 process.env.NODE_ENV:", environment);

// Подключаем DB
import database from "./db-connect.js";

//! Обработка запросов
router.use("*", async (req, res, next) => {
  // Показ данных "products"
  if (req.originalUrl === "/api/getProducts") {
    try {
      const result = await database.query("SELECT * FROM products");
      res.json(result.rows);
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ error: "Internal server error" });
    }
    // Показ данных "categories"
  } else if (req.originalUrl === "/api/getCategories") {
    try {
      const result = await database.query("SELECT * FROM categories");
      res.json(result.rows);
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ error: "Internal server error" });
    }
    // Получить максимальный ID для категории
  } else if (req.originalUrl === "/api/getMaxCategoryID") {
    try {
      const result = await database.query(
        "SELECT MAX(category_id) FROM categories"
      );
      res.json(result.rows);
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ error: "Internal server error" });
    }
    // Создание новой категории
  } else if (req.originalUrl === "/api/createCategory") {
    try {
      const { category_id, category_name, description } = req.body;
      const result = await database.query(
        `INSERT INTO categories (category_id, category_name, description) VALUES (${category_id}, '${category_name}', '${description}')`
      );
      res.json(result.rows);
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ error: "Internal server error" });
    }
    // Удаление товара по ID
  } else if (req.originalUrl.startsWith("/api/deleteProductByID/")) {
    try {
      console.log('AAA');
      const id = req.originalUrl.split("/").pop(); // Extract id from URL
      const result = await database.query(
        `DELETE FROM products WHERE product_id = $1`,
        [id]
      );
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ error: "Internal server error" });
    }
    // Проверка наличия товара по ID
  } else if (req.originalUrl.startsWith("/api/checkProductByID/")) {
    try {
      const id = req.originalUrl.split("/").pop(); // Extract id from URL
      const result = await database.query(
        `SELECT * FROM products WHERE product_id = $1`,
        [id]
      );
      res.json(result.rows);
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ error: "Internal server error" });
    }
    // Получение максимального ID товара
  } else if (req.originalUrl.startsWith("/api/getMaxProductID")) {
    try {
      const result = await database.query(
        `SELECT MAX(product_id) FROM products;`
      );
      res.json(result.rows);
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  // Проверка наличия supplier_id в БД
  else if (req.originalUrl.startsWith("/api/checkSupplier/")) {
    try {
      const id = req.originalUrl.split("/").pop(); // Extract id from URL
      const result = await database.query(
        `SELECT * FROM suppliers WHERE supplier_id = $1`,
        [id]
      );
      res.status(200).json({ success: "ID Exists!" });
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  // Проверка наличия category_id в БД
  else if (req.originalUrl.startsWith("/api/checkCategory/")) {
    try {
      const id = req.originalUrl.split("/").pop(); // Extract id from URL
      const result = await database.query(
        `SELECT * FROM categories WHERE category_id = $1`,
        [id]
      );
      res.status(200).json({ success: "ID Exists!" });
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  // Проверка наличия category_id в БД
  else if (req.originalUrl.startsWith("/api/createProduct")) {
    try {
      const {
        product_id,
        product_name,
        supplier_id,
        category_id,
        quantity_per_unit,
        unit_price,
        units_in_stock,
        units_on_order,
        reorder_level,
        discontinued
      } = req.body;
      
      const result = await database.query(
        `INSERT INTO products (product_id, product_name, supplier_id, category_id, quantity_per_unit, unit_price, units_in_stock, units_on_order, reorder_level, discontinued)
        VALUES (${product_id}, '${product_name}', ${supplier_id}, ${category_id}, '${quantity_per_unit}', ${unit_price}, ${units_in_stock}, ${units_on_order}, ${reorder_level}, ${discontinued})`
      );
      res.json(result.rows);
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.render("../index.html.ejs");
  }
});

export default router;
