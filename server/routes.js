const express = require("express");

const AuthController = require("./controllers/AuthController");
const CategoryController = require("./controllers/CategoryController");
const SubCategoryController = require("./controllers/SubCategoryController");
const AnotationController = require("./controllers/AnotationController");
const UserController = require("./controllers/UserController");

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

// AUTHENTICAT
routes.post("/api/signin", AuthController.signin);
routes.post("/api/signup", AuthController.signup);

// AUTH ROUTES
routes.use(authMiddleware);

// USERS  
routes.get("/api/user/show/:_id", UserController.show);

// CATEGORIES
routes.post("/api/category/store", CategoryController.store);
routes.put("/api/category/update", CategoryController.update);

// SUBCATEGORIES
routes.post("/api/subcategory/store", SubCategoryController.store);
routes.post("/api/subcategory/update", SubCategoryController.update);
routes.get("/api/subcategory/:_id", SubCategoryController.showAll);

// ANOTATIONS
routes.post("/api/anotation/store", AnotationController.store);
routes.get("/api/subcategory/:_id/anotation/:postId", AnotationController.show);

module.exports = routes;
