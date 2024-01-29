import Image from "next/image";
import styles from "./home.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "Home description",
};

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Creative Thoughts Agency.</h1>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ea rem,
          quod blanditiis nostrum omnis facere deserunt unde nulla.
        </p>
        <div className={styles.buttons}>
          <button className={styles.button}>Learn More</button>
          <button className={styles.button}>Contact</button>
        </div>
        <div className={styles.brands}>
          <Image
            src="/brands.png"
            alt="brands"
            fill
            className={styles.brandImg}
            sizes="(max-width: 1250px) 100vw, 1250px"
          />
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src="/hero.gif"
          alt="hero"
          fill
          className={styles.heroImg}
          sizes="(max-width: 1250px) 100vw, 1250px"
        />
      </div>
    </div>
  );
}
