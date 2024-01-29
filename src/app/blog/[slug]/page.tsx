import Image from "next/image";
import styles from "./singlePost.module.css";
import PostUser from "@/components/postUser/postUser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";

// FETCH DATA WITH AN API
// const getData = async (id: number) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   return res.json();
// };

// export const metadata: Metadata = {
//   title: "Single blog",
//   description: "Single blog description",
// };

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { slug } = params;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.description,
  };
};

const SinglePostPage = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  // FETCH DATA WITH AN API
  // const post: Post = await getData(parseInt(params.slug));

  // FETCH DATA WITHOUT AN API
  const post = await getPost(params.slug);

  return (
    <div className={styles.container}>
      {post.image && (
        <div className={styles.imageContainer}>
          <Image
            src={post.image}
            alt="post image"
            fill
            className={styles.image}
            sizes="(max-width: 1250px) 100vw, 1250px"
          />
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId.toString()} />
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {post.createdAt.toString().slice(4, 16)}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post.description}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
