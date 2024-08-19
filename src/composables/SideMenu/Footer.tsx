import { Link } from "react-router-dom";

export function Footer() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
          Proyecto sena{" "}
          <Link
            to="https://textilycuero.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Centro de manufactura, textil y cuero
          </Link>
          
          .
        </p>
      </div>
    </div>
  );
}