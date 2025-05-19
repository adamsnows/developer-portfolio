import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <p className="sm:text-4xl text-2xl font-bold text-primary tracking-[4px] relative whitespace-nowrap">
        SOFTWARE ENGINEER
      </p>
    </Link>
  );
};

export default Logo;
