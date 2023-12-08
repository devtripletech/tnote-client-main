import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-3 lg:grid-cols-2">
      <AspectRatio ratio={16 / 9}>
        <Image
          src="/images/sergey.jpg"
          alt=""
          fill
          className="absolute inset-0 object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60 md:to-background/40" />
        <Link
          href="/"
          className="absolute left-8 top-6 z-20 flex items-center text-lg font-bold tracking-tight"
        >
          <Image
            width="100"
            height="100"
            alt="Logo t-note"
            className="w-6"
            src="/logo.svg"
          />
          {/* <Icons.logo className="mr-2 h-6 w-6" aria-hidden="true" /> */}
          <span className="ml-2 text-white">{siteConfig.name}</span>
        </Link>
        <div className="absolute bottom-6 left-8 z-20 line-clamp-1 text-base">
          Desenvolvido por{" "}
          <a
            href="https://tripletech.com.br/"
            target="_blank"
            className="hover:underline"
          >
            tripletech
          </a>
        </div>
      </AspectRatio>
      <main className="container absolute top-1/2 col-span-1 flex -translate-y-1/2 items-center md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1">
        {children}
      </main>
    </div>
  );
}
