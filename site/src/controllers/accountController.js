
import bcrypt from "bcrypt";
import * as accountModel from "../models/account-model.js";

// Display the registration form
export function buildRegister(req, res) {
    res.render("account/register", {
        title: "Register"
    });
}

// Register a new client account
export async function registerAccount(req, res, next) {
    try {
        const firstname = req.body.account_firstname?.trim();
        const lastname = req.body.account_lastname?.trim();
        const email = req.body.account_email?.trim().toLowerCase();
        const password = req.body.account_password;

        if (!firstname || !lastname || !email || !password) {
            req.flash("error", "Please complete all required fields.");
            return res.redirect("/account/register");
        }

        if (password.length < 8) {
            req.flash("error", "Password must contain at least 8 characters.");
            return res.redirect("/account/register");
        }

        const existingAccount = await accountModel.getAccountByEmail(email);

        if (existingAccount) {
            req.flash("error", "An account with that email already exists.");
            return res.redirect("/account/register");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        // Public registration must always create a Client account.
        await accountModel.registerAccount(
            firstname,
            lastname,
            email,
            passwordHash,
            "Client"
        );

        req.flash("success", "Registration successful. Please log in.");
        return res.redirect("/account/login");
    } catch (error) {
        if (error.code === "23505") {
            req.flash("error", "That email address is already registered.");
            return res.redirect("/account/register");
        }

        next(error);
    }
}

// Display the login form
export function buildLogin(req, res) {
    res.render("account/login", {
        title: "Login"
    });
}

// Authenticate an account
export async function loginAccount(req, res, next) {
    try {
        const email = req.body.account_email?.trim().toLowerCase();
        const password = req.body.account_password;

        if (!email || !password) {
            req.flash("error", "Enter your email and password.");
            return res.redirect("/account/login");
        }

        const account = await accountModel.getAccountByEmail(email);

        if (!account) {
            req.flash("error", "Invalid email or password.");
            return res.redirect("/account/login");
        }

        const passwordMatch = await bcrypt.compare(
            password,
            account.account_password
        );

        if (!passwordMatch) {
            req.flash("error", "Invalid email or password.");
            return res.redirect("/account/login");
        }

        // Regenerate the session after successful authentication.
        req.session.regenerate((error) => {
            if (error) {
                return next(error);
            }

            req.session.account = {
                account_id: account.account_id,
                account_firstname: account.account_firstname,
                account_lastname: account.account_lastname,
                account_email: account.account_email,
                account_type: account.account_type
            };

            req.session.save((saveError) => {
                if (saveError) {
                    return next(saveError);
                }

                req.flash(
                    "success",
                    `Welcome, ${account.account_firstname}!`
                );

                return res.redirect("/account/management");
            });
        });
    } catch (error) {
        next(error);
    }
}

// Log out the current account
export function logoutAccount(req, res, next) {
    req.session.destroy((error) => {
        if (error) {
            return next(error);
        }

        res.clearCookie("connect.sid");
        return res.redirect("/");
    });
}

// Display the account dashboard
export function buildManagement(req, res) {
    res.render("account/management", {
        title: "Account Management",
        accountData: req.session.account
    });
}

// Display all registered accounts to administrators only.
// The route must also use requireRole("Admin").
export async function buildAdminView(req, res, next) {
    try {
        const accounts = await accountModel.getAllAccounts();

        res.render("account/admin", {
            title: "Registered Users",
            accounts,
            accountData: req.session.account
        });
    } catch (error) {
        next(error);
    }
}