
import {Request, Response} from "express"
import { appDataSource } from "../data-source"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import UserRepository from "../repositories/userRepository"
import dotenv from "dotenv"

export class LoginController {

    doLogin = async (req: Request, res: Response) => {
        const userRepository: UserRepository = new UserRepository(appDataSource)

        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: 'Email e password são obrigatórios' })
        }
        
        try {
            /*const user = await userRepository.getByEmail(email)
            if (!user) {
                return res.status(401).json({ error: 'Usuário não encontrado' })
            }
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Credenciais inválidas' })
            }*/

            const token = jwt.sign({
                email: email
            }, process.env.TOKEN!, { expiresIn: '1h' })

            return res.status(200).json({ auth: true, token: token }).send()
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
}