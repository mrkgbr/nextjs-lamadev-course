"use client";

import { useFormState } from "react-dom";
import styles from "./loginForm.module.css";
import { login } from "@/lib/actions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);
  // const router = useRouter();

  // useEffect(() => {
  //   state?.success && router.push("/");
  // }, [state?.success, router]);

  return (
    <form action={formAction} className={styles.form}>
      <input type="text" name="username" id="username" placeholder="username" />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
      />
      <button>Login</button>
      {state?.error}
      <Link href={"/register"}>
        Don&apos;t have an account? <b>Register</b>
      </Link>
    </form>
  );
};

export default LoginForm;
