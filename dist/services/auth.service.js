import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppDataSource from "../database/data-source.js";
import { UserEntity } from "../entities/user.entity.js";
export class AuthService {
    userRepository = AppDataSource.getRepository(UserEntity);
    async register(email, password) {
        const existingUser = await this.userRepository.findOne({
            where: { email }
        });
        if (existingUser) {
            throw new Error("User already exist");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({ email, password: hashedPassword });
        return await this.userRepository.save(newUser);
    }
    async login(email, password) {
        const user = await this.userRepository.findOne({
            where: { email }
        });
        if (!user) {
            throw new Error("invalid email or password");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("invalid credential");
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return { token };
    }
}
;
//# sourceMappingURL=auth.service.js.map