export const LINKER_REF = "?ref=yuan-zi";
export const OtherSites = [
  { href: "https://ai-architect.net/", name: "Architect AI", title: "Architect AI - AI Architecture Renderer, GPT for Architecture Design Idea Inspiration" },
  { href: "https://interior-render.com", name: "Interior Render AI", title: "Interior Render AI - Any can re-design your room in seconds by photo, interior design by AI, get design inspiration for designers by GPT" },
  { href: "https://find-gpt.com/", name: "Find GPT", title: "Find GPT - Get the best GPTs from GPT Store, discover the best fit GPT from our premier selection" },
  { href: "https://game-generator.com/", name: "Game Assets Generator", title: "AI Game Assets Generator - generate free game assets in seconds by AI, integrate AI workflow in your game, GPT for game development" },
  { href: "https://erase-background.com/", name: "Erase Background", title: "Erase Background From Image - Remove Image Background By AI" },
  { href: "https://profile-avatar.com/", name: "Profile Avatar AI", title: "Profile Avatar AI - Generate distinctive and personalized cartoon style avatars" },
  { href: "https://ecommerce-ai.net/", name: "E-Commerce AI", title: "E-Commerce AI - Create professional e-commerce product photo for free with seconds" },
  { href: "https://industrial-render.com/", name: "Industrial Render AI", title: "Industrial Render AI - Product design render by AI, AI for Industrial Design Render, GPT for Industrial Design Idea Inspiration" },
  { href: "https://launchai.app/", name: "Launch AI", title: "Launch AI - Launch your AI App"},
  { href: "https://business-portrait.net/", name: "Business Portrait AI", title: "Business Portrait AI - Create Professional Business Portrait Photo with AI for Free"},
  { href: "https://varys.ai", name: "Varys AI",  title: "Varys AI - interior design AI for professional, GPT for room and space" },
];

export default function Linker () {
  

  return (
    <div className="absolute bottom-0 flex flex-wrap text-sm h-1" style={{zIndex: -1, color: "black", opacity: 0.01}}>
      {OtherSites.map((site) => {
        return <div key={site.href}><a href={site.href + LINKER_REF}>{site.title}</a></div>;
      })}

    </div>
  );
}