export default function Home() {
  return (
    <div className="space-y-10">
      {/* Title Section */}
      <section className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Agent OS
        </h1>
        <p className="text-muted-foreground text-base">
          Your personal AI operating system — an intelligent workspace that
          grows with you.
        </p>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href="/chat"
          className="group p-6 rounded-xl border bg-card hover:shadow-md transition 
                     hover:border-accent cursor-pointer"
        >
          <h2 className="text-lg font-semibold mb-2">Chat</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Talk with your digital self. Powered by memory, reasoning and
            personalized intelligence.
          </p>
        </a>

        <a
          href="/agent-hub"
          className="group p-6 rounded-xl border bg-card hover:shadow-md transition 
                     hover:border-accent cursor-pointer"
        >
          <h2 className="text-lg font-semibold mb-2">Agent hub</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Write, refine and publish blog posts assisted by AI.
          </p>
        </a>

        <a
          href="/blog"
          className="group p-6 rounded-xl border bg-card hover:shadow-md transition 
                     hover:border-accent cursor-pointer"
        >
          <h2 className="text-lg font-semibold mb-2">Blog</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Write, refine and publish blog posts assisted by AI.
          </p>
        </a>
        <a
          href="/login"
          className="group p-6 rounded-xl border bg-card hover:shadow-md transition 
                     hover:border-accent cursor-pointer"
        >
          <h2 className="text-lg font-semibold mb-2">login(dev)</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            dev登录页面
          </p>
        </a>
      </section>
    </div>
  );
}
