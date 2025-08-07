import { Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex-shrink-0 border-t mt-auto">
            <div className="container py-6 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Market Pulse. All rights reserved.</p>
                <div className="flex items-center gap-4">
                    <Link href="mailto:contact@marketpulse.dev" className="text-xs text-muted-foreground hover:text-foreground">
                        Contact
                    </Link>
                     <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="Github">
                        <Github className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </Link>
                </div>
            </div>
      </footer>
    )
}
