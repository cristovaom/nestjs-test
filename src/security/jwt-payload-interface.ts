
export interface JwtPayload {
    email: string;
    role: string;
    sub: string;
  }

  export enum UserRole {
    CLIENT = 'CLIENT',
    ADMIN = 'ADMIN',
  }
