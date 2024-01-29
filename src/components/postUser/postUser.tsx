import Image from "next/image";
import styles from "./postUser.module.css";
import { getUser } from "@/lib/data";

// FETCH DATA WITH API
// const getUser = async (id: number) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   return res.json();
// };

const PostUser = async ({ userId }: { userId: string }) => {
  const user = await getUser(userId);
  if (!user) throw new Error("user not found");
  return (
    <div className={styles.container}>
      <Image
        className={styles.avatar}
        src={user.image ? user.image : "/noavatar.png"}
        alt=""
        width={50}
        height={50}
      />
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>{user.username}</span>
      </div>
    </div>
  );
};

export default PostUser;
