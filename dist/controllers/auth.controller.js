import { AuthService } from "../services/auth.service.js";
export class AuthController {
    service = new AuthService;
    constructor() {
        this.service = new AuthService();
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }
    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            const newUser = await this.service.register(email, password);
            return res.status(200).json({ newUser });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occured";
            return res.status(500).json({ message });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "email and password are required" });
            }
            const token = await this.service.login(email, password);
            return res.status(200).json({ token });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occured";
            return res.status(500).json({ message });
        }
    }
}
;
export default AuthController;
//# sourceMappingURL=auth.controller.js.map