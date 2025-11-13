import mongoose, { Schema, Document } from 'mongoose';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [Role.USER, Role.ADMIN],
      default: Role.USER,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', UserSchema);


