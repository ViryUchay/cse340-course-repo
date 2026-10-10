
import express from "express";
import * as accountController from "../controllers/accountController.js";
import { requireLogin, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Registration
router.get("/account/register", accountController.buildRegister);
router.post("/account/register", accountController.registerAccount);

// Login and logout
router.get("/account/login", accountController.buildLogin);
router.post("/account/login", accountController.loginAccount);
router.get("/account/logout", accountController.logoutAccount);

// Account dashboard: login required
router.get(
    "/account/management",
    requireLogin,
    accountController.buildManagement
);

// Registered-users page: administrator access only
router.get(
    "/account/admin",
    requireRole("Admin"),
    accountController.buildAdminView
);

export default router;