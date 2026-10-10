
export function requireLogin(req, res, next) {
    if (!req.session.account) {
        req.flash("error", "Please log in to access that page.");
        return res.redirect("/account/login");
    }

    next();
}

export function requireRole(requiredRole) {
    return (req, res, next) => {
        if (!req.session.account) {
            req.flash("error", "Please log in to access that page.");
            return res.redirect("/account/login");
        }

        if (req.session.account.account_type !== requiredRole) {
            req.flash(
                "error",
                "You do not have permission to access that page."
            );
            return res.redirect("/account/management");
        }

        next();
    };
}