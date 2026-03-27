import { cn } from "@/lib/utils";



interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  className?: string;
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer2 = ({
  
  className,
  tagline = "Components made easy.",
  menuItems = [
    
    {
      title: "Resourses",
      links: [
        { text: "Ideas", url: "/ideas" },
        { text: "About Us", url: "/about" },
        { text: "Blog", url: "/blog" },
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
  copyright = "© 2026 Green Community All rights reserved.",
}: Footer2Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto">
        <footer >
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex flex-col items-start gap-2 lg:justify-start">
                <h1>Green Community</h1>
                 <p>{copyright}</p>
              </div>
              
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
