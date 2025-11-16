import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-gray-50 p-4 space-y-4">
        <h2 className="text-lg font-semibold">Agent OS</h2>

        <nav className="space-y-2">
          <Link href="/dashboard" className="block text-gray-700 hover:text-black">
            Overview
          </Link>
          <Link href="/dashboard/tools" className="block text-gray-700 hover:text-black">
            Tools
          </Link>
          <Link href="/dashboard/tasks" className="block text-gray-700 hover:text-black">
            Tasks
          </Link>
          <Link href="/dashboard/memory" className="block text-gray-700 hover:text-black">
            Memory
          </Link>
          <Link href="/dashboard/settings" className="block text-gray-700 hover:text-black">
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
