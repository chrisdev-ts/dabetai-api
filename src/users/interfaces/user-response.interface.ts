import { User } from '../../../generated/prisma';

export type UserResponse = Omit<User, 'password'>;

export type BasicUserResponse = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
