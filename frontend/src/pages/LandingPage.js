import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Shield, 
  Sparkles, 
  Star, 
  Users, 
  Clock,
  CheckCircle2,
  MessageSquare,
  Calendar,
  Award,
  ChevronRight,
  Zap,
  Lock
} from 'lucide-react';
import { mockCleaners } from '@/data/mockData';

export default function LandingPage() {
  const featuredCleaners = mockCleaners.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary-light px-4 py-2 rounded-full border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Trusted by 10,000+ Customers</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
                Find Your Perfect
                <span className="text-primary"> Cleaning </span>
                Professional
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Connect with verified, highly-rated cleaning professionals in your area. 
                Browse profiles, read reviews, and book with confidence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/browse">
                  <Button size="lg" className="bg-primary hover:bg-primary-hover text-white shadow-primary text-base px-8">
                    Browse Cleaners
                    <Search className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline" className="border-2 text-base px-8">
                    Become a Provider
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <div className="text-3xl font-heading font-bold text-primary mb-1">500+</div>
                  <div className="text-sm text-muted-foreground">Verified Cleaners</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold text-secondary mb-1">4.9</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold text-accent mb-1">24h</div>
                  <div className="text-sm text-muted-foreground">Response Time</div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop"
                  alt="Professional cleaning service"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent"></div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">100% Verified</div>
                    <div className="text-xs text-muted-foreground">Police reports checked</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-card p-4 rounded-xl shadow-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary fill-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Top Rated</div>
                    <div className="text-xs text-muted-foreground">5-star reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Simple Process
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              How CleanMatch Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find and book trusted cleaning professionals in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: 'Browse & Filter',
                description: 'Search our database of verified cleaning professionals. Filter by location, services, ratings, and availability.',
                color: 'primary'
              },
              {
                icon: MessageSquare,
                title: 'Connect & Book',
                description: 'Use credits to unlock contact details and send booking requests. Chat directly with cleaners to discuss your needs.',
                color: 'secondary'
              },
              {
                icon: CheckCircle2,
                title: 'Enjoy & Review',
                description: 'Get your space cleaned professionally. Leave a review to help others make informed decisions.',
                color: 'accent'
              }
            ].map((step, index) => (
              <Card key={index} className="p-8 text-center border-border hover:shadow-lg transition-all relative group">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {index + 1}
                </div>
                <div className={`w-16 h-16 rounded-2xl bg-${step.color}/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <step.icon className={`w-8 h-8 text-${step.color}`} />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cleaners */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <Badge variant="secondary" className="mb-4">
                Top Rated
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
                Featured Cleaning Professionals
              </h2>
              <p className="text-lg text-muted-foreground">
                Meet some of our highest-rated and most trusted cleaners
              </p>
            </div>
            <Link to="/browse">
              <Button variant="outline" className="hidden sm:flex">
                View All
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredCleaners.map((cleaner) => (
              <Card key={cleaner.id} className="overflow-hidden border-border hover:shadow-card-hover transition-all">
                <div className="relative">
                  <img
                    src={cleaner.avatar}
                    alt={cleaner.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-success text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
                    <Shield className="w-3 h-3" />
                    Verified
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
                        {cleaner.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{cleaner.location}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-primary-light px-2.5 py-1 rounded-lg">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-sm font-semibold text-primary">{cleaner.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {cleaner.bio}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">€{cleaner.hourlyRate}<span className="text-sm text-muted-foreground font-normal">/hr</span></span>
                    <Link to={`/cleaner/${cleaner.id}`}>
                      <Button size="sm" className="bg-primary hover:bg-primary-hover text-white">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link to="/browse">
              <Button variant="outline" className="w-full sm:w-auto">
                View All Cleaners
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              Trust, Quality & Convenience
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make it easy to find reliable cleaning professionals you can trust
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'Verified Professionals',
                description: 'Every cleaner is police-verified and background-checked for your safety'
              },
              {
                icon: Star,
                title: 'Real Reviews',
                description: 'Read honest reviews from real customers to make informed decisions'
              },
              {
                icon: Zap,
                title: 'Instant Booking',
                description: 'Book cleaners instantly or send requests for specific times'
              },
              {
                icon: Lock,
                title: 'Secure Payments',
                description: 'Pay securely with our credit system or monthly subscription'
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 border-border hover:shadow-lg transition-all text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied customers who found their perfect cleaner
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Anna van Berg',
                role: 'Homeowner',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
                comment: 'Amazing service! Found a fantastic cleaner within minutes. The verification process gives me peace of mind.'
              },
              {
                name: 'Peter Johnson',
                role: 'Small Business Owner',
                avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
                comment: 'The credit system is genius! I can try different cleaners without commitment. Highly recommend CleanMatch.'
              },
              {
                name: 'Lisa Smit',
                role: 'Apartment Resident',
                avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
                comment: 'Best platform for finding cleaners! The reviews are honest and the booking process is seamless.'
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 border-border hover:shadow-lg transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-hover to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <Sparkles className="w-12 h-12 text-white mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
            Ready to Find Your Perfect Cleaner?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers. Start browsing verified cleaning professionals today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl text-base px-8">
                Get Started Now
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-base px-8">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}