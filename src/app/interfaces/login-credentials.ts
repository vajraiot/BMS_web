import { AccessPermissions } from "./access-permissions";

export interface LoginCredentials {
    id: any;
    userName: string;
    password: string;
    accessPermissions: AccessPermissions;
}
