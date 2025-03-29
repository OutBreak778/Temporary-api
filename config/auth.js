export const authenticate = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];

    const ValidKey = "secure123";

    if (!apiKey) {
        return res.status(401).json({ error: "API key required" });
    }

    if (apiKey !== ValidKey) {
        return res.status(403).json({ error: "Invalid API key" });
    }

    next(); 
};
