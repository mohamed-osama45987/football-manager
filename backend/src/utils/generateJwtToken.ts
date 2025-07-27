import jwt from "jsonwebtoken"

export const generateJwtToken = (id: string) => {
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET!, { expiresIn: '2h' })
    return token
}