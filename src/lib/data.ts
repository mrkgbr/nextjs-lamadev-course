import { Post, User, TPost, TUser } from "./models";
import { connectToDb } from "./utils";
import { unstable_noStore as noStore } from "next/cache";

// TEMPORARY DATA
// const users: User[] = [
//   { id: 1, name: "User One" },
//   { id: 2, name: "User Two" },
//   { id: 3, name: "User Three" },
//   { id: 4, name: "User Four" },
// ];

// const posts: Post[] = [
//   {
//     id: 1,
//     userId: 4,
//     title: "First post",
//     body: "This is the body of the first post",
//   },
//   {
//     id: 2,
//     userId: 3,
//     title: "Second post",
//     body: "This is the body of the second post",
//   },
//   {
//     id: 3,
//     userId: 2,
//     title: "Third post",
//     body: "This is the body of the third post",
//   },
//   {
//     id: 4,
//     userId: 1,
//     title: "Fourth post",
//     body: "This is the body of the fourth post",
//   },
// ];

export const getPosts = async () => {
  try {
    connectToDb();
    const posts: TPost[] = await Post.find();
    return posts;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while getting posts. ");
  }
};

export const getPost = async (slug: string) => {
  try {
    connectToDb();
    const post = (await Post.findOne({ slug })) as TPost;
    console.log(post);
    return post;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while getting post. ");
  }
};

export const getUser = async (id: string) => {
  noStore();
  try {
    connectToDb();
    const user = (await User.findById(id)) as TUser;
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while getting user. ");
  }
};

export const getUsers = async () => {
  try {
    connectToDb();
    const users: TUser[] = await User.find();
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while getting users. ");
  }
};
