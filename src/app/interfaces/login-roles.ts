import { LoginCredentials } from "./login-credentials";

export interface LoginRoles {
    id: any;
    role: string;
    lstLoginCredentials: LoginCredentials[];
}
