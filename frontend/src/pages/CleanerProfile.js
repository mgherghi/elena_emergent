import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  Star,
  MapPin,
  Clock,
  Shield,
  Award,
  MessageSquare,
  Calendar,
  Sparkles,
  Languages,
  Briefcase,
  CheckCircle2,
  Lock,
  ChevronLeft
} from 'lucide-react';
import { mockCleaners, mockReviews } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function CleanerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, credits, subscription, spendCredits } = useAuth();
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [bookingMessage, setBookingMessage] = useState('');
  const [contactRevealed, setContactRevealed] = useState(false);

  const cleaner = mockCleaners.find(c => c.id === parseInt(id));
  const reviews = mockReviews.filter(r => r.cleanerId === parseInt(id));

  if (!cleaner) {
    return (
      <div className="min-h-screen bg-gradient-soft">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-4">Cleaner not found</h1>
          <Link to="/browse">
            <Button>Browse All Cleaners</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleContactClick = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to contact cleaners');
      navigate('/auth');
      return;
    }
    setShowContactDialog(true);
  };

  const handleRevealContact = () => {
    if (subscription) {
      setContactRevealed(true);
      setShowContactDialog(false);
      toast.success('Contact details revealed!');
    } else if (spendCredits(2)) {
      setContactRevealed(true);
      setShowContactDialog(false);
      toast.success('Contact details revealed! 2 credits used.');
    } else {
      toast.error('Insufficient credits. Please purchase more credits.');
      navigate('/pricing');
    }
  };

  const handleBookingRequest = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to send booking requests');
      navigate('/auth');
      return;
    }
    setShowBookingDialog(true);
  };

  const handleSendBooking = () => {
    if (!bookingMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }
    toast.success('Booking request sent successfully!');
    setShowBookingDialog(false);
    setBookingMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/browse')}
          className="mb-4"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Browse
        </Button>
      </div>

      {/* Profile Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Card className="overflow-hidden border-border shadow-xl">
          <div className="grid lg:grid-cols-3 gap-0">
            {/* Left - Profile Image & Quick Info */}
            <div className="lg:col-span-1 bg-muted/30 p-8">
              <div className="relative mb-6">
                <img
                  src={cleaner.avatar}
                  alt={cleaner.name}
                  className="w-full aspect-square object-cover rounded-2xl"
                />
                {cleaner.verified && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-success text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
                    <Shield className="w-4 h-4" />
                    Police Verified
                  </div>
                )}
              </div>

              <div className="text-center mb-6 mt-6">
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  {cleaner.name}
                </h1>
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{cleaner.location}</span>
                </div>
                <div className="flex items-center justify-center gap-2 bg-primary-light px-4 py-2 rounded-lg inline-flex">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <span className="text-xl font-bold text-primary">{cleaner.rating}</span>
                  <span className="text-sm text-primary">({cleaner.reviews} reviews)</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{cleaner.yearsExperience} Years Experience</div>
                    <div className="text-muted-foreground text-xs">Professional cleaner</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Response Time</div>
                    <div className="text-muted-foreground text-xs">{cleaner.responseTime}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Languages className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Languages</div>
                    <div className="text-muted-foreground text-xs">{cleaner.languages.join(', ')}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-foreground">€{cleaner.hourlyRate}</div>
                  <div className="text-muted-foreground">per hour</div>
                </div>
              </div>
            </div>

            {/* Right - Details */}
            <div className="lg:col-span-2 p-8">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-6">
                  {/* Bio */}
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-3">About Me</h3>
                    <p className="text-muted-foreground leading-relaxed">{cleaner.bio}</p>
                  </div>

                  {/* Services */}
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-3">Services Offered</h3>
                    <div className="flex flex-wrap gap-2">
                      {cleaner.services.map((service, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1.5">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                      Certifications & Verification
                    </h3>
                    <div className="space-y-3">
                      {cleaner.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-success/5 border border-success/20 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-success" />
                          <span className="font-medium text-foreground">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-3">Availability</h3>
                    <div className="flex items-center gap-3 p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
                      <Calendar className="w-6 h-6 text-secondary" />
                      <div>
                        <div className="font-medium text-foreground">{cleaner.availability}</div>
                        <div className="text-sm text-muted-foreground">Send a booking request to confirm</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <Card key={review.id} className="p-6 border-border">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={review.avatar} alt={review.customerName} />
                            <AvatarFallback>{review.customerName[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <div className="font-semibold text-foreground">{review.customerName}</div>
                                <div className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</div>
                              </div>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted'}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No reviews yet</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="gallery">
                  <div className="grid grid-cols-2 gap-4">
                    {cleaner.gallery.map((image, index) => (
                      <div key={index} className="relative aspect-video rounded-lg overflow-hidden group">
                        <img
                          src={image}
                          alt={`Work sample ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <Button
            size="lg"
            onClick={handleContactClick}
            className="bg-primary hover:bg-primary-hover text-white h-14 text-base"
          >
            {contactRevealed ? (
              <>
                <MessageSquare className="w-5 h-5 mr-2" />
                Contact: +31 6 1234 5678
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 mr-2" />
                Reveal Contact (2 credits)
              </>
            )}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleBookingRequest}
            className="border-2 h-14 text-base"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Send Booking Request
          </Button>
        </div>
      </div>

      {/* Contact Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reveal Contact Details</DialogTitle>
            <DialogDescription>
              {subscription ? (
                'Your Pro subscription includes unlimited contacts!'
              ) : (
                'This will use 2 credits from your account.'
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Card className="p-6 bg-muted/30 border-border">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={cleaner.avatar} alt={cleaner.name} />
                  <AvatarFallback>{cleaner.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{cleaner.name}</h3>
                  <p className="text-sm text-muted-foreground">{cleaner.location}</p>
                </div>
              </div>
              {!subscription && (
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                  <span className="text-sm text-muted-foreground">Cost:</span>
                  <span className="font-semibold text-foreground">2 credits</span>
                </div>
              )}
            </Card>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowContactDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleRevealContact} className="bg-primary hover:bg-primary-hover text-white">
              {subscription ? 'Reveal Contact' : `Use 2 Credits`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Booking Request</DialogTitle>
            <DialogDescription>
              Send a message to {cleaner.name} with your booking details
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Hi! I'd like to book your services for... Please include date, time, and service details."
              value={bookingMessage}
              onChange={(e) => setBookingMessage(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBookingDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendBooking} className="bg-primary hover:bg-primary-hover text-white">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}