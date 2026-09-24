const rolebasedAuth = (role) => (req, res, next) => {
    const userRole = req.user.role;
    if (userRole !== role) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

module.exports = rolebasedAuth;