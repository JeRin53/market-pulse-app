'use client';

import Link from "next/link";
import { Droplets, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Logo = () => (
    <Link href="/" className="flex items-center gap-2">
      <Droplets className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold font-headline">Market Pulse</span>
    </Link>
);

const NavLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "About", href: "/about" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4 hidden md:flex">
                    <Logo />
                </div>

                <div className="flex items-center gap-6 text-sm md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Logo />
                                {NavLinks.map(link => (
                                    <Link 
                                        key={link.href} 
                                        href={link.href} 
                                        className={cn(
                                            "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                                            pathname === link.href && "text-foreground"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="md:hidden">
                        <Logo />
                    </div>
                </div>

                <nav className="hidden flex-row items-center gap-6 text-sm font-medium md:flex">
                    {NavLinks.map(link => (
                        <Link 
                            key={link.href} 
                            href={link.href} 
                            className={cn(
                                "transition-colors hover:text-foreground/80",
                                pathname === link.href ? "text-foreground" : "text-muted-foreground"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex flex-1 items-center justify-end gap-2">
                    <Button variant="outline">Sign In</Button>
                </div>
            </div>
        </header>
    );
}
