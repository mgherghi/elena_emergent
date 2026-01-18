import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, Zap, Crown, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function PricingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, addCredits, subscribe } = useAuth();

  const handlePurchaseCredits = (amount, credits) => {
    if (!isAuthenticated) {
      toast.error('Vă rugăm să vă autentificați pentru a cumpăra credite');
      navigate('/auth');
      return;
    }
    addCredits(credits);
    toast.success(`Ați cumpărat cu succes ${credits} credite!`);
  };

  const handleSubscribe = (plan) => {
    if (!isAuthenticated) {
      toast.error('Vă rugăm să vă autentificați pentru a vă abona');
      navigate('/auth');
      return;
    }
    subscribe(plan);
    toast.success(`Abonare reușită la ${plan.name}!`);
  };

  const creditPackages = [
    { amount: 10, credits: 10, popular: false },
    { amount: 20, credits: 20, popular: true },
    { amount: 50, credits: 50, popular: false },
  ];

  const subscriptionPlans = [
    {
      name: 'Starter',
      price: 9.99,
      description: 'Pentru utilizatori ocazionali',
      features: [
        '50% reducere la credite',
        '0.50 lei per credit în loc de 1 leu',
        'Suport prioritar',
        'Anulează oricând'
      ],
      icon: Zap,
      color: 'primary'
    },
    {
      name: 'Pro',
      price: 19.99,
      description: 'Pentru utilizatori activi',
      features: [
        'Contacte nelimitate',
        'Mesaje prioritare (3 credite/mesaj pentru utilizatori gratuit)',
        'Evidențiat în rezultatele căutării',
        'Suport prioritar',
        'Anulează oricând'
      ],
      icon: Crown,
      color: 'secondary',
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />

      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Badge variant="secondary" className="mb-4">
            Prețuri Flexibile
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">
            Alege <span className="text-primary">Planul Tău Perfect</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cumpără credite după nevoie sau abonează-te pentru acces nelimitat. Fără taxe ascunse.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Pachete de Credite
          </h2>
          <p className="text-muted-foreground">
            Cumpără credite pentru a contacta profesioniști. Nu este nevoie de abonament.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {creditPackages.map((pkg) => (
            <Card
              key={pkg.credits}
              className={`p-6 border-2 transition-all hover:shadow-lg relative ${
                pkg.popular ? 'border-primary shadow-md' : 'border-border'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-white">
                    Cel Mai Popular
                  </Badge>
                </div>
              )}
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-foreground mb-2">{pkg.amount} lei</div>
                <div className="text-muted-foreground">{pkg.credits} credite</div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span className="text-muted-foreground">Contactează profesionist: 2 credite</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span className="text-muted-foreground">Mesaj prioritar: 3 credite</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span className="text-muted-foreground">Nu expiră niciodată</span>
                </div>
              </div>
              <Button
                onClick={() => handlePurchaseCredits(pkg.amount, pkg.credits)}
                className={`w-full ${
                  pkg.popular
                    ? 'bg-primary hover:bg-primary-hover text-white'
                    : ''
                }`}
                variant={pkg.popular ? 'default' : 'outline'}
              >
                Cumpără Acum
              </Button>
            </Card>
          ))}
        </div>

        <Card className="max-w-3xl mx-auto p-6 bg-muted/30 border-border">
          <h3 className="font-heading font-semibold text-foreground mb-4">Cum Funcționează Creditele</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-primary">2</span>
              </div>
              <div>
                <div className="font-medium text-foreground mb-1">Dezvăluie Detalii Contact</div>
                <div className="text-muted-foreground">Deblochează număr de telefon și adresă de email</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-secondary">3</span>
              </div>
              <div>
                <div className="font-medium text-foreground mb-1">Mesaj Prioritar</div>
                <div className="text-muted-foreground">Mesajul tău apare în partea de sus a căsuței lor de mesaje</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Abonamente Lunare
            </h2>
            <p className="text-muted-foreground">
              Acces nelimitat pentru utilizatorii activi care au nevoie de mai multă flexibilitate
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {subscriptionPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`p-8 border-2 transition-all hover:shadow-xl relative ${
                  plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Recomandat
                    </Badge>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-${plan.color}/10 flex items-center justify-center`}>
                    <plan.icon className={`w-7 h-7 text-${plan.color}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-foreground">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-4xl font-bold text-foreground mb-1">
                    {plan.price} lei<span className="text-lg text-muted-foreground font-normal">/lună</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleSubscribe(plan)}
                  className={`w-full h-12 text-base ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary-hover text-white shadow-primary'
                      : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  Abonează-te la {plan.name}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Întrebări Frecvente
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'Creditele expiră?',
              a: 'Nu! Creditele nu expiră niciodată. Folosește-le oricând ai nevoie.'
            },
            {
              q: 'Pot anula abonamentul oricând?',
              a: 'Da, poți anula abonamentul oricând fără penalități. Vei păstra accesul până la sfârșitul perioadei de facturare.'
            },
            {
              q: 'Ce se întâmplă dacă rămân fără credite?',
              a: 'Poți cumpăra mai multe credite oricând. Contul tău rămâne activ, doar că nu vei putea contacta profesioniști noi până când adaugi mai multe credite.'
            },
            {
              q: 'Informațiile mele de plată sunt sigure?',
              a: 'Absolut! Folosim criptare standard din industrie și nu stocăm niciodată detaliile complete de plată.'
            }
          ].map((faq, index) => (
            <Card key={index} className="p-6 border-border">
              <h3 className="font-heading font-semibold text-foreground mb-2">{faq.q}</h3>
              <p className="text-muted-foreground">{faq.a}</p>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
