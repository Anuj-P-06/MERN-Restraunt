import jwt from 'jsonwebtoken'

/* Why are we creating middleware:
To check if user is logged in or not
To check if logged in user is admin or not
*/
export const protect = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Not authorized", success: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}

export const adminOnly = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Not Authorized", success: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;

        if (req.admin.email === process.env.ADMIN_EMAIL) {
            return next();
        }

        return res.status(403).json({ message: "Forbidden: Not Admin" });
        
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}