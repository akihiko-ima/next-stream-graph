import { Moon, Sun } from 'lucide-react';
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function Header() {
  const { theme, setTheme } = useTheme();

  // ダイアログを表示する関数
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // デフォルトのリンク動作を無効化
    alert("この機能ないんだなー");
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 mr-2"
            >
              <path d="M3 3v18h18" />
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
            <h1 className="text-xl font-semibold">imaima | stream - graph</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <a
              href="#"
              className="text-sm font-medium hover:underline"
              onClick={handleLinkClick}
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-sm font-medium hover:underline"
              onClick={handleLinkClick}
            >
              Analytics
            </a>
            <a
              href="#"
              className="text-sm font-medium hover:underline"
              onClick={handleLinkClick}
            >
              Settings
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
