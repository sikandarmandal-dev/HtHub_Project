const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
    const header = req.get("authorization");
    const token = header && header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Authentication required" });

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Session expired or invalid" });
    }
}

function authorize(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "You do not have permission for this action" });
        }
        next();
    };
}

module.exports = { authenticate, authorize };
