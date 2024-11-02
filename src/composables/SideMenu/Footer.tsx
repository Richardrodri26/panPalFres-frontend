import { Link } from "react-router-dom";
import facebook from "/facebook.png";
import twitter from "/twitter.png";
import Linkedin from "/linkedin.png";
import insta from "/instagram.png";

export function Footer() {
  return (
    <footer className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 py-8 mt-4">
      <div className="mx-4 md:mx-8 flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
        <div className="sb_footer-links-div ">
          <h4 className="font-semibold text-center md:text-left">
            REDES SOCIALES
          </h4>
          <div className="flex justify-center mt-1 ">
            <div className="socialmedia ">
              <ul className="flex space-x-40 ">
                {" "}
                {/* Espacio entre íconos */}
                <li>
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    
                  >
                    <img
                      src={facebook}
                      alt="Logo de Facebook, enlace a Facebook"
                      className="h-14 w-14 "
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <img
                      src={twitter}
                      alt="Logo de Twitter, enlace a Twitter"
                      className="h-14 w-14"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="h-14 w-14"
                  >
                    <img
                      src={Linkedin}
                      alt="Logo de LinkedIn, enlace a LinkedIn"
                      className="h-14 w-14"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <img
                      src={insta}
                      alt="Logo de Instagram, enlace a Instagram"
                      className="h-14 w-14"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sección Proyecto */}
        <p className="text-xs md:text-sm text-center md:text-left text-muted-foreground leading-loose mt-4">
          Proyecto SENA{" "}
          <Link
            to="https://textilycuero.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-gray-800"
          >
            Centro de manufactura, textil y cuero
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
