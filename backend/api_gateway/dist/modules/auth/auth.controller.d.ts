import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(credentials: any): Promise<any>;
    register(userDetails: any): Promise<any>;
}
