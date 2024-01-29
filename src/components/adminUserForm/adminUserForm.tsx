"use client";
import { useFormState } from "react-dom";
import styles from "./adminUserForm.module.css";
import { addUser } from "@/lib/actions";

const AdminUserForm = () => {
  const [state, formAction] = useFormState(addUser, undefined);

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add new post</h1>
      <input type="text" name="username" placeholder="Username" />
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <input type="text" name="image" placeholder="Image" />
      <select name="isAdmin">
        <option value="false">is Admin?</option>
        <option value="false">User</option>
        <option value="true">Admin</option>
      </select>
      <button>Add</button>
      {state && state.error}
    </form>
  );
};

export default AdminUserForm;
