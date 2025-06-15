import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
}

export default function ButtonLink({ href, children }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className="
        relative z-10 block w-72 h-12 text-white text-xl rounded-md p-1
        bg-gradient-to-br from-[#ff9aa2] to-[#C83037] no-underline
        hover:text-white
      "
    >
      <span
        className="
          flex items-center justify-center h-full w-full gap-2 rounded-md
          bg-[#0e0e10] transition-colors duration-500 hover:bg-transparent
        "
      >
        {children}
      </span>
    </Link>
  );
}
