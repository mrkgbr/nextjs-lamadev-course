import Image from "next/image";
import styles from "./about.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About description",
};

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About Agency</h2>
        <h1 className={styles.title}>
          We are digital ideas that are bigger, bolder, braver and better.
        </h1>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
          incidunt nulla dignissimos voluptatibus! Totam fugit cumque nam iusto
          deserunt id sed. Praesentium optio alias error est doloremque.
          Numquam, odio modi?
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src="/about.png"
          alt="Picture of the company"
          sizes="(max-width: 1250px) 100vw, 1250px"
          fill
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default AboutPage;
