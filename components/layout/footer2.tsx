import { cn } from "@/lib/utils";
import { Mail, Phone, MapPin } from "lucide-react";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  className?: string;
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
}

const Footer2 = ({
  className,
  tagline = "Building a greener future together 🌱",
  menuItems = [
    {
      title: "Resources",
      links: [
        { text: "Ideas", url: "/ideas" },
        { text: "About Us", url: "/about" },
        { text: "Blog", url: "/blog" },
        { text: "Privacy Policy", url: "/privacy" },
        { text: "Help Center", url: "/help" },
      ],
    },
    {
      title: "Social",
      links: [
        { text: "Twitter", url: "https://x.com/" },
        { text: "Instagram", url: "https://www.instagram.com/" },
        { text: "LinkedIn", url: "https://www.linkedin.com/" },
      ],
    },
  ],
  copyright = "© 2026 Green Community. All rights reserved.",
}: Footer2Props) => {
  return (
    <section className={cn("py-20", className)}>
      <div className="container mx-auto">
        <footer>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            
            {/* Logo + Tagline */}
            <div className="space-y-3">
              <h1 className="text-lg font-bold">🌿 Green Community</h1>
              <p className="text-sm text-muted-foreground">
                {tagline}
              </p>
              <p className="text-xs text-muted-foreground">
                {copyright}
              </p>
            </div>

            {/* Menu Sections */}
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-semibold">{section.title}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary transition"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* 🌿 Contact Info */}
            <div>
              <h3 className="mb-4 font-semibold">Contact</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">

                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  support@greencommunity.org
                </li>

                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  +880 1234-567890
                </li>

                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Dhaka, Bangladesh
                </li>

              </ul>
            </div>

          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };