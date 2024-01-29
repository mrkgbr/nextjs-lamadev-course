import Image from "next/image";
import styles from "./contact.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact description",
};

const ContactPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src="/contact.png"
          alt="contact"
          fill
          className={styles.image}
          sizes="(max-width: 1250px) 100vw, 1250px"
        />
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <input type="text" placeholder="Name and Surname" />
          <input type="email" placeholder="Email Address" />
          <input type="text" placeholder="Phone Number (optional)" />
          <textarea name="" id="" cols={30} rows={10}></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
