"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NavigationTestPage = ({
  searchParams,
}: {
  searchParams?: {
    q?: string;
  };
}) => {
  const router = useRouter();
  const pathname = usePathname();

  console.log(pathname);
  const query = searchParams?.q || "";

  console.log(query);

  const handleClick = () => {
    console.log("clicked");
    // router.refresh();
    router.replace("/");
  };

  return (
    <div>
      <Link href="/" prefetch={false}>
        Click here
      </Link>
      <button onClick={handleClick}>Write and redirect</button>
    </div>
  );
};

export default NavigationTestPage;
