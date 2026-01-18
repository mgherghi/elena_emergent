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
      toast.error('Please sign in to purchase credits');
      navigate('/auth');
      return;
    }
    addCredits(credits);
    toast.success(`Successfully purchased ${credits} credits!`);
  };

  const handleSubscribe = (plan) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to subscribe');
      navigate('/auth');
      return;
    }
    subscribe(plan);
    toast.success(`Successfully subscribed to ${plan.name}!`);
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
      description: 'For occasional users',
      features: [
        '50% discount on credits',
        '€0.50 per credit instead of €1',
        'Priority support',
        'Cancel anytime'
      ],
      icon: Zap,
      color: 'primary'
    },
    {
      name: 'Pro',
      price: 19.99,
      description: 'For power users',
      features: [
        'Unlimited contacts',
        'Priority messaging (3 credits/msg for free users)',
        'Featured in search results',
        'Priority support',
        'Cancel anytime'
      ],
      icon: Crown,
      color: 'secondary',
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Badge variant="secondary" className="mb-4">
            Flexible Pricing
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">
            Choose Your <span className="text-primary">Perfect Plan</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Buy credits as you go or subscribe for unlimited access. No hidden fees.
          </p>
        </div>
      </div>

      {/* Credit Packages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Credit Packages
          </h2>
          <p className="text-muted-foreground">
            Purchase credits to contact cleaners. No subscription required.
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
                    Most Popular
                  </Badge>
                </div>
              )}
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-foreground mb-2">€{pkg.amount}</div>
                <div className="text-muted-foreground">{pkg.credits} credits</div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span className="text-muted-foreground">Contact cleaner: 2 credits</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span className="text-muted-foreground">Priority message: 3 credits</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span className="text-muted-foreground">Never expires</span>
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
                Purchase Now
              </Button>
            </Card>
          ))}
        </div>

        {/* Credit Usage Info */}
        <Card className="max-w-3xl mx-auto p-6 bg-muted/30 border-border">
          <h3 className="font-heading font-semibold text-foreground mb-4">How Credits Work</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-primary">2</span>
              </div>
              <div>
                <div className="font-medium text-foreground mb-1">Reveal Contact Details</div>
                <div className="text-muted-foreground">Unlock phone number and email address</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-secondary">3</span>
              </div>
              <div>
                <div className="font-medium text-foreground mb-1">Priority Message</div>
                <div className="text-muted-foreground">Your message appears at the top of their inbox</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Subscriptions */}
      <div className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Monthly Subscriptions
            </h2>
            <p className="text-muted-foreground">
              Unlimited access for power users who need more flexibility
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
                      Recommended
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
                    €{plan.price}<span className="text-lg text-muted-foreground font-normal">/month</span>
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
                  Subscribe to {plan.name}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'Do credits expire?',
              a: 'No! Credits never expire. Use them whenever you need them.'
            },
            {
              q: 'Can I cancel my subscription anytime?',
              a: 'Yes, you can cancel your subscription at any time with no penalties. You\'ll keep access until the end of your billing period.'
            },
            {
              q: 'What happens if I run out of credits?',
              a: 'You can purchase more credits anytime. Your account remains active, you just won\'t be able to contact new cleaners until you add more credits.'
            },
            {
              q: 'Is my payment information secure?',
              a: 'Absolutely! We use industry-standard encryption and never store your full payment details.'
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