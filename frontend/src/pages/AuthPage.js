import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Sparkles, Mail, Lock, User, Chrome } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState('customer');
  const [isSignUp, setIsSignUp] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSignUp && !formData.name) {
      toast.error('Vă rugăm să introduceți numele');
      return;
    }
    
    if (!formData.email || !formData.password) {
      toast.error('Vă rugăm să completați toate câmpurile');
      return;
    }

    // Mock authentication
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'Utilizator',
      email: formData.email,
      role: activeTab,
    };

    login(userData);
    toast.success(isSignUp ? 'Cont creat cu succes!' : 'Bine ați revenit!');
    
    // Navigate based on role
    if (activeTab === 'provider') {
      navigate('/provider/dashboard');
    } else {
      navigate('/customer/dashboard');
    }
  };

  const handleSocialLogin = (provider) => {
    // Mock social login
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Utilizator ${provider}`,
      email: `user@${provider.toLowerCase()}.com`,
      role: activeTab,
    };

    login(userData);
    toast.success(`Autentificat cu ${provider}`);
    
    if (activeTab === 'provider') {
      navigate('/provider/dashboard');
    } else {
      navigate('/customer/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center space-x-2 mb-8 group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center transform group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-heading font-bold text-foreground">CleanMatch</span>
        </Link>

        <Card className="p-8 border-border shadow-xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
              {isSignUp ? 'Creează Cont' : 'Bine ai revenit'}
            </h1>
            <p className="text-muted-foreground">
              {isSignUp ? 'Alătură-te comunității noastre astăzi' : 'Autentifică-te în contul tău'}
            </p>
          </div>

          {/* Role Selection */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customer">Client</TabsTrigger>
              <TabsTrigger value="provider">Furnizor</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              className="w-full h-11"
              onClick={() => handleSocialLogin('Google')}
            >
              <Chrome className="w-5 h-5 mr-2" />
              Continuă cu Google
            </Button>
          </div>

          <div className="relative mb-6">
            <Separator />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
              sau
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Nume Complet</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Ion Popescu"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 h-11"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="exemplu@email.ro"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Parolă</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 h-11"
                />
              </div>
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-end">
                <a href="#" className="text-sm text-primary hover:underline">
                  Ai uitat parola?
                </a>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 bg-primary hover:bg-primary-hover text-white"
            >
              {isSignUp ? 'Creează Cont' : 'Autentificare'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              {isSignUp ? 'Ai deja un cont?' : 'Nu ai cont?'}
            </span>
            {' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary font-medium hover:underline"
            >
              {isSignUp ? 'Autentifică-te' : 'Înregistrează-te'}
            </button>
          </div>

          {activeTab === 'provider' && isSignUp && (
            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Ca furnizor, va trebui să completați procesul de verificare, inclusiv verificarea cazierului judiciar, înainte ca profilul dvs. să fie activ.
              </p>
            </div>
          )}
        </Card>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Înapoi la pagina principală
          </Link>
        </div>
      </div>
    </div>
  );
}
