export default function Home() {
  return (
    <div className="relative space-y-14">
      {/* subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] 
                      [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
                      [background-size:40px_40px]"
      />

      {/* Title Section */}
      <section className="space-y-3 max-w-2xl">
        <h1 className="text-5xl font-semibold tracking-tight leading-[1.1]">
          Agent OS
        </h1>

        <p className="text-base text-muted-foreground leading-relaxed">
          Your personal AI operating system — an intelligent workspace that
          evolves with your thinking.
        </p>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          href="/main/chat"
          title="Chat"
          desc="Talk with your digital self. Memory-aware, reasoning-driven intelligence."
        />

        <FeatureCard
          href="/main/agent-hub"
          title="Agent Hub"
          desc="Design, orchestrate and deploy intelligent agents."
        />

        <FeatureCard
          href="/main/blog"
          title="Blog"
          desc="Write and refine ideas with AI-assisted thinking."
        />
      </section>
    </div>
  );
}
function FeatureCard({
  href,
  title,
  desc,
}: {
  href: string;
  title: string;
  desc: string;
}) {
  return (
    <a
      href={href}
      className="
        group relative p-6 rounded-2xl
        bg-[#111217]
        border border-white/10
        overflow-hidden
        transition-all duration-300

        hover:-translate-y-1
        hover:border-[#4ef2c2]/40
      "
    >
      {/* glow layer */}
      <div
        className="
          absolute inset-0 opacity-0 group-hover:opacity-100
          transition duration-500
          bg-[radial-gradient(circle_at_50%_0%,rgba(78,242,194,0.15),transparent_60%)]
        "
      />

      {/* content */}
      <div className="relative z-10">
        <h2 className="text-lg font-semibold mb-2 tracking-tight">{title}</h2>

        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>

      {/* bottom accent line */}
      <div
        className="
          absolute bottom-0 left-0 h-[2px] w-0
          bg-[#4ef2c2]
          transition-all duration-500
          group-hover:w-full
        "
      />
    </a>
  );
}