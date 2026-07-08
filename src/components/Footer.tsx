import Logo from "./Logo";

const columns = [
  {
    title: "Product",
    items: ["AI Generator", "Visual Editor", "AI Agents", "Marketplace", "CMS", "Ecommerce", "App Builder"],
  },
  {
    title: "Platform",
    items: ["Publishing", "Hosting & CDN", "Analytics", "Code Export", "GitHub Sync", "API"],
  },
  {
    title: "Company",
    items: ["About", "Blog", "Careers", "Press", "Contact"],
  },
  {
    title: "Resources",
    items: ["Docs", "Community", "Changelog", "Status", "Security"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line/60 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-6">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">
            The AI-native website creation platform. Design at the speed of thought.
          </p>
          <p className="mt-6 text-xs text-muted/60">
            © 2026 Aetherform, Inc. All rights reserved.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="mb-3 text-sm font-medium">{col.title}</h4>
            <ul className="space-y-2">
              {col.items.map((item) => (
                <li key={item}>
                  <span className="cursor-pointer text-sm text-muted transition-colors hover:text-white">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
