import Menu from "../models/menuModel.js";
import { v2 as cloudinary } from "cloudinary";
import logger from "../config/logger.js";

/**
 * ADD MENU ITEM
 * Admin only
 */
export const addMenuItem = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category || !req.file) {
      logger.warn("Add menu failed: Missing required fields", {
        body: req.body,
        file: !!req.file,
      });

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const newMenuItem = await Menu.create({
      name,
      description,
      price,
      category,
      image: result.secure_url,
    });

    logger.info("Menu item created successfully", {
      menuId: newMenuItem._id,
      name: newMenuItem.name,
    });

    res.status(201).json({
      success: true,
      message: "Menu item added",
      menuItem: newMenuItem,
    });
  } catch (error) {
    logger.error("Error adding menu item", {
      error: error.message,
      stack: error.stack,
    });
    next(error);
  }
};

/**
 * GET ALL MENU ITEMS
 * Public
 */
export const getAllMenuItems = async (req, res, next) => {
  try {
    const menuItems = await Menu.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    logger.info("Fetched all menu items", {
      count: menuItems.length,
    });

    res.status(200).json({
      success: true,
      menuItems,
    });
  } catch (error) {
    logger.error("Error fetching menu items", {
      error: error.message,
    });
    next(error);
  }
};

/**
 * UPDATE MENU ITEM
 * Admin only
 */
export const updateMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, isAvailable } = req.body;

    const menuItem = await Menu.findById(id);

    if (!menuItem) {
      logger.warn("Update failed: Menu item not found", { menuId: id });

      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      menuItem.image = result.secure_url;
    }

    if (name) menuItem.name = name;
    if (description) menuItem.description = description;
    if (price) menuItem.price = price;
    if (category) menuItem.category = category;
    if (isAvailable !== undefined) menuItem.isAvailable = isAvailable;

    await menuItem.save();

    logger.info("Menu item updated", {
      menuId: menuItem._id,
    });

    res.status(200).json({
      success: true,
      message: "Menu item updated",
      menuItem,
    });
  } catch (error) {
    logger.error("Error updating menu item", {
      error: error.message,
      menuId: req.params.id,
    });
    next(error);
  }
};

/**
 * DELETE MENU ITEM
 * Admin only
 */
export const deleteMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const menuItem = await Menu.findByIdAndDelete(id);

    if (!menuItem) {
      logger.warn("Delete failed: Menu item not found", { menuId: id });

      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    logger.info("Menu item deleted", {
      menuId: id,
    });

    res.status(200).json({
      success: true,
      message: "Menu item deleted",
    });
  } catch (error) {
    logger.error("Error deleting menu item", {
      error: error.message,
      menuId: req.params.id,
    });
    next(error);
  }
};
