import jwt from "jsonwebtoken";

export const generateToken = (id, isAdmin) => {
    const payload = { id, isAdmin}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    return token;
}