import Link from "next/link";

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default function DashboardLayout({children}: DashboardLayoutProps) {
    return (
    <div className="flex min-h-screen bg-zinc-800 bg-zinc-900 p-6">
        <aside className="w-70 border-r border-zinc-700 border-zinc-900 p-6">
        <h1 className="mb-10 text-4xl font-bold">CyberDash</h1>

        <nav className="space-y-5 text-zinc-300">
            <Link href="/" className="block hover:text-white">
                Dashboard
            </Link>

            <Link href="/" className="block hover:text-white">
                Alerts
            </Link>

            <Link href="/" className="block hover:text-white">
                Incidents
            </Link>

            <Link href="/" className="block hover:text-white">
                Analytics
            </Link>
        </nav>
    </aside>
        <main className="flex-2 p-10">{children}</main>
    </div>
);
}
