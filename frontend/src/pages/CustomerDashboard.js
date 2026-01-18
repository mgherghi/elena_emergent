import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  MessageSquare,
  Star,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
  CreditCard,
  User
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockBookings, mockMessages } from '@/data/mockData';

export default function CustomerDashboard() {
  const { user, credits, subscription } = useAuth();

  const upcomingBookings = mockBookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const pastBookings = mockBookings.filter(b => b.status === 'completed');
  const recentMessages = mockMessages.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">Manage your bookings and messages</p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-border hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{upcomingBookings.length}</div>
            <div className="text-sm text-muted-foreground">Upcoming Bookings</div>
          </Card>

          <Card className="p-6 border-border hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{pastBookings.length}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </Card>

          <Card className="p-6 border-border hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-accent" />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{recentMessages.length}</div>
            <div className="text-sm text-muted-foreground">Active Chats</div>
          </Card>

          <Card className="p-6 border-border hover:shadow-lg transition-all bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                {subscription ? (
                  <Sparkles className="w-6 h-6 text-primary" />
                ) : (
                  <CreditCard className="w-6 h-6 text-primary" />
                )}
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {subscription ? 'Pro' : credits}
            </div>
            <div className="text-sm text-muted-foreground">
              {subscription ? 'Unlimited Access' : 'Credits Available'}
            </div>
            {!subscription && (
              <Link to="/pricing">
                <Button size="sm" variant="link" className="p-0 h-auto mt-2 text-primary">
                  Buy More
                </Button>
              </Link>
            )}
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Bookings */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-heading font-semibold text-foreground">My Bookings</h2>
              </div>
              
              <Tabs defaultValue="upcoming" className="p-6">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="space-y-4">
                  {upcomingBookings.length > 0 ? (
                    upcomingBookings.map((booking) => (
                      <Card key={booking.id} className="p-4 border-border hover:shadow-md transition-all">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-14 h-14">
                            <AvatarImage src={booking.cleanerAvatar} alt={booking.cleanerName} />
                            <AvatarFallback>{booking.cleanerName[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-foreground">{booking.cleanerName}</h3>
                                <p className="text-sm text-muted-foreground">{booking.service}</p>
                              </div>
                              <Badge
                                variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                                className={booking.status === 'confirmed' ? 'bg-success' : ''}
                              >
                                {booking.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {booking.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {booking.time}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <span className="font-semibold text-foreground">€{booking.price}</span>
                              <Link to="/messages">
                                <Button size="sm" variant="outline">
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Message
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">No upcoming bookings</p>
                      <Link to="/browse">
                        <Button className="bg-primary hover:bg-primary-hover text-white">
                          Browse Cleaners
                        </Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="past" className="space-y-4">
                  {pastBookings.length > 0 ? (
                    pastBookings.map((booking) => (
                      <Card key={booking.id} className="p-4 border-border hover:shadow-md transition-all">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-14 h-14">
                            <AvatarImage src={booking.cleanerAvatar} alt={booking.cleanerName} />
                            <AvatarFallback>{booking.cleanerName[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-foreground">{booking.cleanerName}</h3>
                                <p className="text-sm text-muted-foreground">{booking.service}</p>
                              </div>
                              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Completed
                              </Badge>
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
                                <Star className="w-4 h-4 mr-2" />
                                Leave Review
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No past bookings yet</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Right Column - Messages & Quick Actions */}
          <div className="space-y-6">
            {/* Recent Messages */}
            <Card className="border-border">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-heading font-semibold text-foreground">Recent Messages</h3>
                <Link to="/messages">
                  <Button variant="ghost" size="sm" className="text-primary">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="divide-y divide-border">
                {recentMessages.map((message) => (
                  <Link key={message.id} to="/messages" className="block p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={message.cleanerAvatar} alt={message.cleanerName} />
                        <AvatarFallback>{message.cleanerName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-foreground text-sm truncate">{message.cleanerName}</h4>
                          {message.unread > 0 && (
                            <Badge className="bg-primary text-white" variant="default">
                              {message.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{message.lastMessage}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 border-border">
              <h3 className="font-heading font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/browse">
                  <Button className="w-full justify-start bg-primary hover:bg-primary-hover text-white">
                    <User className="w-4 h-4 mr-2" />
                    Find a Cleaner
                  </Button>
                </Link>
                {!subscription && (
                  <Link to="/pricing">
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Buy Credits
                    </Button>
                  </Link>
                )}
                <Link to="/messages">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    View Messages
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Account Info */}
            <Card className="p-6 border-border bg-gradient-to-br from-primary/5 to-secondary/5">
              <h3 className="font-heading font-semibold text-foreground mb-4">Account Status</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Account Type</span>
                  <Badge variant="secondary">
                    {subscription ? 'Pro Member' : 'Standard'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Credits</span>
                  <span className="font-semibold text-foreground">{subscription ? '∞' : credits}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Bookings</span>
                  <span className="font-semibold text-foreground">{mockBookings.length}</span>
                </div>
              </div>
              {!subscription && (
                <Link to="/pricing">
                  <Button variant="outline" className="w-full mt-4">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Upgrade to Pro
                  </Button>
                </Link>
              )}
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}