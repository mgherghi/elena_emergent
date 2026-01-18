import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles, UserCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isAuthenticated, user, logout, credits, subscription } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-card/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-heading font-bold text-foreground">CleanMatch</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/browse">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Caută Personal
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Prețuri
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to={user?.role === 'provider' ? '/provider/dashboard' : '/customer/dashboard'}>
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    Panou Control
                  </Button>
                </Link>
                <Link to="/messages">
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    Mesaje
                  </Button>
                </Link>
                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-border">
                  {!subscription && (
                    <div className="bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {credits} credite
                    </div>
                  )}
                  {subscription && (
                    <div className="bg-secondary-light text-secondary px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Pro
                    </div>
                  )}
                  <Button onClick={handleLogout} variant="outline" size="sm">
                    Deconectare
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <Link to="/auth">
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    Autentificare
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-primary hover:bg-primary-hover text-white">
                    Începe Acum
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="px-4 py-3 space-y-2">
            <Link to="/browse" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-foreground">
                Caută Personal
              </Button>
            </Link>
            <Link to="/pricing" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-foreground">
                Prețuri
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to={user?.role === 'provider' ? '/provider/dashboard' : '/customer/dashboard'} onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-foreground">
                    Panou Control
                  </Button>
                </Link>
                <Link to="/messages" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-foreground">
                    Mesaje
                  </Button>
                </Link>
                <div className="pt-2 border-t border-border mt-2">
                  {!subscription && (
                    <div className="bg-primary-light text-primary px-3 py-2 rounded-lg text-sm font-medium mb-2">
                      {credits} credite disponibile
                    </div>
                  )}
                  {subscription && (
                    <div className="bg-secondary-light text-secondary px-3 py-2 rounded-lg text-sm font-medium mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Membru Pro
                    </div>
                  )}
                  <Button onClick={handleLogout} variant="outline" className="w-full">
                    Deconectare
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-2 pt-2 border-t border-border">
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Autentificare
                  </Button>
                </Link>
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary-hover text-white">
                    Începe Acum
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};