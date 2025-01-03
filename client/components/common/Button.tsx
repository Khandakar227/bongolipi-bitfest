"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ButtonProps = {
  type: "button" | "submit";
  title: string;
  icon?: string;
  variant: "btn_primary" | "btn_secondary";
  onClick?: () => void;
};

const Button = ({ type, title, icon, variant, onClick }: ButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior: redirect to /sign-in
      router.push("/sign-in");
    }
  };

  return (
    <button
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full text-white ${variant}`}
      type={type}
      onClick={handleClick}
    >
      {icon && <Image src={icon} alt={title} width={20} height={20} />}
      <span className="font-semibold">{title}</span>
    </button>
  );
};

export default Button;
