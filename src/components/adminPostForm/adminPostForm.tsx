"use client";
import { useFormState } from "react-dom";
import styles from "./adminPostForm.module.css";
import { addPost } from "@/lib/actions";

const AdminPostForm = ({ userId }: { userId: string }) => {
  const [state, formAction] = useFormState(addPost, undefined);

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add new post</h1>
      <input type="hidden" name="userId" value={userId} />
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="image" placeholder="image" />
      <input type="text" name="slug" placeholder="slug" />
      <textarea name="description" placeholder="Description" rows={10} />
      <button>Add</button>
      {state && state.error}
    </form>
  );
};

export default AdminPostForm;
