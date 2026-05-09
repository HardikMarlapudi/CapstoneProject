"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

type DashboardLayoutProps = {
    children: React.ReactNode;
}

export default function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    const pathname = usePathname();

    const navItems = [
        {
            name: "Dashboard",
            href: "/",
        },
        {
            name: "Alerts",
            href: "/alerts",
        },
        {
            name: "Incidents",
            href: "/incidents",
        },
        {
            name: "Analytics",
            href: "/analytics",
        },
    ];

    return (
        <div className="flex min-h-screen">
            <nav className="w-64 p-6 flex flex-col gap-4">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={pathname === item.href ? "font-bold" : ""}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
