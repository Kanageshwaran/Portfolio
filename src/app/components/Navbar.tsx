import { Link, useLocation } from 'react-router-dom';
import { Settings } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <span className="text-xl">Kanageshwaran Dhakshinamoorthy</span>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`transition-opacity hover:opacity-80 ${
                isActive('/') ? 'opacity-100' : 'opacity-60'
              }`}
            >
              About
            </Link>
            <Link
              to="/academic-work"
              className={`transition-opacity hover:opacity-80 ${
                isActive('/academic-work') || location.pathname.startsWith('/subject') || location.pathname.startsWith('/course')
                  ? 'opacity-100'
                  : 'opacity-60'
              }`}
            >
              Academic Work
            </Link>
            <Link
              to="/#contact"
              className="transition-opacity hover:opacity-80 opacity-60"
            >
              Contact
            </Link>
            <Link
              to="/settings"
              className={`transition-opacity hover:opacity-80 ${
                isActive('/settings') ? 'opacity-100' : 'opacity-60'
              }`}
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
