import { addPost, deletePost } from "@/lib/actions";

const ServerActionPage = () => {
  return (
    <div>
      <form action={addPost}>
        <input type="text" placeholder="title" name="title" />
        <input type="text" placeholder="description" name="description" />
        <input type="text" placeholder="slug" name="slug" />
        <input type="text" placeholder="userId" name="userId" />
        <button>Create</button>
      </form>

      <form action={deletePost}>
        <input type="text" name="id" placeholder="post id" />
        <button>Delete post</button>
      </form>
    </div>
  );
};

export default ServerActionPage;
