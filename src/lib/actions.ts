"use server";
import { revalidatePath } from "next/cache";
import { Post, TUser, User } from "./models";
import { connectToDb } from "./utils";
import { Types } from "mongoose";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

export const addPost = async (prevState: any, formData: FormData) => {
  // "use server";

  const { title, description, slug, userId } = Object.fromEntries(formData);
  if (!title || typeof title !== "string") return;
  if (!description || typeof description !== "string") return;
  if (!slug || typeof slug !== "string") return;
  if (!userId || typeof userId !== "string") return;

  try {
    connectToDb();
    const newPost = new Post({
      description,
      title,
      slug,
      userId: new Types.ObjectId(userId),
    });

    await newPost.save();
    console.log("saved to database");

    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (formData: FormData) => {
  // "use server";

  const { id } = Object.fromEntries(formData);
  if (!id || typeof id !== "string") return;

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    console.log("deleted post");

    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (
  prevState:
    | {
        error: string;
        success?: undefined;
      }
    | {
        success: boolean;
        error?: undefined;
      }
    | undefined,
  formData: FormData
) => {
  const { username, email, password, passwordConfirm, image } =
    Object.fromEntries(formData);

  if (password !== passwordConfirm)
    return { error: "Password does not match." };

  try {
    connectToDb();

    const user: TUser | null = await User.findOne({ email });
    if (user) return { error: "User already exist." };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password.toString(), salt);

    const newUser = new User({
      username: username.toString(),
      email: email.toString(),
      password: hashedPassword,
      isAdmin: false,
      image: image?.toString(),
    });

    await newUser.save();

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong." };
  }
};

export const login = async (prevState: any, formData: FormData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (error: any) {
    if (error.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password!" };
    }
    throw error;
  }
};

export const addUser = async (prevState: any, formData: FormData) => {
  // "use server";

  const { username, email, password, image } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newUser = new User({
      username: username.toString(),
      email: email.toString(),
      password: password.toString(),
      image: image.toString(),
      isAdmin: false,
    });

    await newUser.save();
    console.log("saved to database");

    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (formData: FormData) => {
  // "use server";

  const { id } = Object.fromEntries(formData);
  if (!id || typeof id !== "string") return;

  try {
    connectToDb();

    await Post.deleteMany({ userId: id });

    await User.findByIdAndDelete(id);
    console.log("deleted user");

    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
