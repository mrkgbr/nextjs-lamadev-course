import Image from "next/image";
import styles from "./postCard.module.css";
import Link from "next/link";
import { TPost } from "@/lib/models";

const PostCard = ({ post }: { post: TPost }) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {post.image && (
          <div className={styles.imageContainer}>
            <Image
              src={post.image}
              alt="post"
              fill
              className={styles.image}
              sizes="(max-width: 1250px) 100vw, 1250px"
            />
          </div>
        )}
        <span className={styles.date}>01.01.2024</span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.description}>{post.description}</p>
        <Link className={styles.link} href={`/blog/${post.slug}`}>
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
