import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/layouts/theme-toggle";
import { Shell } from "@/components/shells/shell";

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <Shell as="div">
        <section
          id="footer-content"
          aria-labelledby="footer-content-heading"
          className="flex flex-col gap-10 lg:flex-row lg:gap-20"
        ></section>
        <section
          id="footer-bottom"
          aria-labelledby="footer-bottom-heading"
          className="flex items-center space-x-4"
        >
          <div className="flex-1 text-left text-sm leading-loose text-muted-foreground">
            Desenvolvido por{" "}
            <a
              aria-label="Tripletech it solution"
              href="https://tripletech.com.br/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold transition-colors hover:text-foreground"
            >
              Tripletech
            </a>
            .
          </div>
          <div className="flex items-center space-x-1">
            <ThemeToggle />
          </div>
        </section>
      </Shell>
    </footer>
  );
}
