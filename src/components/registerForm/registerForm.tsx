"use client";

import { useFormState } from "react-dom";
import styles from "./registerForm.module.css";
import { register } from "@/lib/actions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined);
  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/login");
  }, [state?.success, router]);

  return (
    <form action={formAction} className={styles.form}>
      <input type="text" name="username" id="username" placeholder="username" />
      <input type="email" name="email" id="email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
      />
      <input
        type="password"
        name="passwordConfirm"
        id="passwordConfirm"
        placeholder="confirm password"
      />
      <button>Register</button>
      {state?.error}
      <Link href={"/login"}>
        Have an account? <b>Login</b>
      </Link>
    </form>
  );
};

export default RegisterForm;
