// app/main/layout.tsx
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppTopBar } from "@/components/layout/AppTopBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-screen overflow-hidden bg-background text-foreground">
      {/* 🌌 Background Atmosphere */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_20%_20%,rgba(78,242,194,0.08),transparent_40%),
              radial-gradient(circle_at_80%_0%,rgba(78,242,194,0.05),transparent_50%)]
        "
      />

      {/* subtle grid */}
      <div
        className="
          pointer-events-none absolute inset-0 opacity-[0.03]
          [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),
                           linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
          [background-size:48px_48px]
        "
      />

      {/* 🧱 Main Frame */}
      <div className="relative flex h-full p-3 gap-3">
        {/* Sidebar */}
        <div
          className="
            w-[260px]
            rounded-2xl
            bg-card/80
            backdrop-blur-xl
            border border-border
            shadow-lg
            overflow-hidden
          "
        >
          <AppSidebar />
        </div>

        {/* Content Area */}
        <div
          className="
            flex-1 flex flex-col
            rounded-2xl
            bg-card/70
            backdrop-blur-xl
            border border-border
            shadow-lg
            overflow-hidden
          "
        >
          {/* TopBar */}
          <div className="border-b border-border">
            <AppTopBar />
          </div>

          {/* Main */}
          <main className="flex-1 overflow-auto px-8 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}