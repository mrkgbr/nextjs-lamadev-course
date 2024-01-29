import { getPosts } from "@/lib/data";
import styles from "./adminPost.module.css";
import Image from "next/image";
import { deletePost } from "@/lib/actions";

const AdminPost = async () => {
  const posts = await getPosts();

  // const deletePostWithId = async (id: string) => {
  //   "use server";
  //   return deletePost.bind(null, id);
  // };

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div className={styles.post} key={post.slug}>
          <div className={styles.detail}>
            <Image
              src={post.image || "/noavatar.png"}
              alt="post image"
              width={50}
              height={50}
            />
            <span className={styles.postTitle}>{post.title}</span>
          </div>
          {/* <form action={() => deletePostWithId(post._id!)}> */}
          <form action={deletePost}>
            <input type="hidden" name="id" value={post._id?.toString()} />
            <button className={styles.postButton}>Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminPost;
