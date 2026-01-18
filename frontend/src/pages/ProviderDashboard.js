import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  Star,
  TrendingUp,
  Users,
  MessageSquare,
  DollarSign,
  Eye,
  CheckCircle2,
  Clock,
  Award
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockBookings } from '@/data/mockData';

export default function ProviderDashboard() {
  const { user } = useAuth();

  // Mock provider stats
  const stats = {
    rating: 4.9,
    totalReviews: 127,
    totalBookings: 245,
    thisMonthBookings: 18,
    earnings: 3240,
    profileViews: 156,
  };

  const upcomingBookings = mockBookings.filter(b => b.status === 'confirmed').slice(0, 2);
  const pendingRequests = mockBookings.filter(b => b.status === 'pending');

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">
            Provider Dashboard
          </h1>
          <p className="text-muted-foreground">Manage your bookings and profile</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-border hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success">
                <TrendingUp className="w-3 h-3 mr-1" />
                Top Rated
              </Badge>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{stats.rating}</div>
            <div className="text-sm text-muted-foreground">{stats.totalReviews} reviews</div>
          </Card>

          <Card className="p-6 border-border hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{stats.thisMonthBookings}</div>
            <div className="text-sm text-muted-foreground">Bookings this month</div>
          </Card>

          <Card className="p-6 border-border hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-accent" />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">€{stats.earnings}</div>
            <div className="text-sm text-muted-foreground">Total earnings</div>
          </Card>

          <Card className="p-6 border-border hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{stats.profileViews}</div>
            <div className="text-sm text-muted-foreground">Profile views (7 days)</div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Bookings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pending Requests */}
            {pendingRequests.length > 0 && (
              <Card className="border-border border-l-4 border-l-primary">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-heading font-semibold text-foreground">Pending Requests</h2>
                    <Badge className="bg-primary text-white">{pendingRequests.length}</Badge>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {pendingRequests.map((booking) => (
                    <Card key={booking.id} className="p-4 border-border hover:shadow-md transition-all">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={booking.cleanerAvatar} alt="Customer" />
                          <AvatarFallback>C</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-foreground">New Booking Request</h3>
                              <p className="text-sm text-muted-foreground">{booking.service}</p>
                            </div>
                            <Badge variant="secondary">New</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {booking.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {booking.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" className="bg-success hover:bg-success/90 text-white">
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Accept
                            </Button>
                            <Button size="sm" variant="outline">
                              Decline
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            )}

            {/* Upcoming Bookings */}
            <Card className="border-border">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-heading font-semibold text-foreground">Upcoming Bookings</h2>
              </div>
              <div className="p-6">
                {upcomingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <Card key={booking.id} className="p-4 border-border hover:shadow-md transition-all">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={booking.cleanerAvatar} alt="Customer" />
                            <AvatarFallback>C</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-foreground">Customer Name</h3>
                                <p className="text-sm text-muted-foreground">{booking.service}</p>
                              </div>
                              <Badge className="bg-success">Confirmed</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {booking.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {booking.time}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-foreground">€{booking.price}</span>
                              <Button size="sm" variant="outline">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No upcoming bookings</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Performance */}
            <Card className="border-border">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-heading font-semibold text-foreground">Performance</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Response Rate</span>
                      <span className="font-semibold text-foreground">98%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Completion Rate</span>
                      <span className="font-semibold text-foreground">100%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                      <span className="font-semibold text-foreground">4.9/5.0</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Profile & Quick Actions */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="border-border overflow-hidden">
              <div className="h-24 bg-gradient-to-br from-primary to-secondary"></div>
              <div className="p-6 -mt-12">
                <Avatar className="w-24 h-24 border-4 border-card mb-4">
                  <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop" alt={user?.name} />
                  <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-1">{user?.name || 'Maria Santos'}</h3>
                <p className="text-muted-foreground mb-4">Professional Cleaner</p>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-success text-white">
                    <Award className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                  <Badge variant="secondary">Top Rated</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 border-border">
              <h3 className="font-heading font-semibold text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Jobs</span>
                  <span className="font-semibold text-foreground">{stats.totalBookings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">This Month</span>
                  <span className="font-semibold text-foreground">{stats.thisMonthBookings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Earnings</span>
                  <span className="font-semibold text-foreground">€{stats.earnings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Avg. Rating</span>
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    {stats.rating}
                    <Star className="w-4 h-4 fill-primary text-primary" />
                  </span>
                </div>
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6 border-border bg-gradient-to-br from-primary/5 to-secondary/5">
              <h3 className="font-heading font-semibold text-foreground mb-4">Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">Top Rated Provider</div>
                    <div className="text-xs text-muted-foreground">Maintain 4.8+ rating</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">100+ Jobs Completed</div>
                    <div className="text-xs text-muted-foreground">Milestone achieved</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}