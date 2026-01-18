import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, MapPin, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-heading font-bold text-foreground">CleanMatch</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Conectează-te cu profesioniști verificați în curățenie din zona ta. Servicii de calitate, rezultate de încredere.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Pentru Clienți</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/browse" className="text-muted-foreground hover:text-primary transition-colors">
                  Caută Personal Curățenie
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Prețuri
                </Link>
              </li>
              <li>
                <Link to="/customer/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Rezervările Mele
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Cum Funcționează
                </a>
              </li>
            </ul>
          </div>

          {/* Providers */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Pentru Furnizori</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/provider/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Panou Furnizor
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Devino Furnizor
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Proces Verificare
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Resurse
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Contactează-ne</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2 text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 text-primary" />
                <span>support@cleanmatch.ro</span>
              </li>
              <li className="flex items-start space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 text-primary" />
                <span>+40 21 123 4567</span>
              </li>
              <li className="flex items-start space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                <span>București, România</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CleanMatch. Toate drepturile rezervate.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Politica de Confidențialitate
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Termeni și Condiții
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Politica Cookie
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};