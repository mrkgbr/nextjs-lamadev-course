import mongoose, { Schema, InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export type TUser = {
  email: string;
  username: string;
  isAdmin: boolean;
  password?: string;
  image?: string | null | undefined;
  _id?: string;
};

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export type TPost = {
  title: string;
  description: string;
  userId: mongoose.Types.ObjectId;
  slug: string;
  image?: string | null | undefined;
  _id?: string;
};

export const User =
  mongoose.models.User<TUser> || mongoose.model<TUser>("User", userSchema);
export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
