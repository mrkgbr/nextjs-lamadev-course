import { getUsers } from "@/lib/data";
import styles from "./adminUsers.module.css";
import { deleteUser } from "@/lib/actions";

const AdminUsers = async () => {
  const users = await getUsers();

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {users.map((user) => (
        <div className={styles.post} key={user.username}>
          <div className={styles.detail}>
            {/* <Image
              src={user.image || "/noavatar.png"}
              alt="post image"
              width={50}
              height={50}
            /> */}
            <span className={styles.postTitle}>{user.username}</span>
          </div>
          {/* <form action={() => deletePostWithId(post._id!)}> */}
          <form action={deleteUser}>
            <input type="hidden" name="id" value={user._id?.toString()} />
            <button className={styles.postButton}>Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
