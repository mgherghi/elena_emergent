import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CleanerCard } from '@/components/CleanerCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, SlidersHorizontal, MapPin, Star } from 'lucide-react';
import { mockCleaners } from '@/data/mockData';

export default function BrowseCleaners() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique locations and services
  const locations = ['all', ...new Set(mockCleaners.map(c => c.location))];
  const services = ['all', ...new Set(mockCleaners.flatMap(c => c.services))];

  // Filter and sort cleaners
  const filteredCleaners = mockCleaners
    .filter(cleaner => {
      const matchesSearch = cleaner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cleaner.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesLocation = locationFilter === 'all' || cleaner.location === locationFilter;
      const matchesService = serviceFilter === 'all' || cleaner.services.includes(serviceFilter);
      return matchesSearch && matchesLocation && matchesService;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'price-high') return b.hourlyRate - a.hourlyRate;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">
              Browse <span className="text-primary">Cleaning Professionals</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find verified, highly-rated cleaners in your area
            </p>
          </div>

          {/* Search Bar */}
          <Card className="max-w-4xl mx-auto p-4 border-border shadow-lg">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="h-12 px-6"
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Location
                  </label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(loc => (
                        <SelectItem key={loc} value={loc}>
                          {loc === 'all' ? 'All Locations' : loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Service Type
                  </label>
                  <Select value={serviceFilter} onValueChange={setServiceFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map(service => (
                        <SelectItem key={service} value={service}>
                          {service === 'all' ? 'All Services' : service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Sort By
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="reviews">Most Reviews</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground">
              {filteredCleaners.length} Cleaner{filteredCleaners.length !== 1 ? 's' : ''} Available
            </h2>
            <p className="text-muted-foreground mt-1">
              Showing verified professionals in your search area
            </p>
          </div>

          {/* Active Filters */}
          <div className="hidden sm:flex gap-2">
            {locationFilter !== 'all' && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setLocationFilter('all')}
              >
                <MapPin className="w-3 h-3 mr-1" />
                {locationFilter}
              </Badge>
            )}
            {serviceFilter !== 'all' && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setServiceFilter('all')}
              >
                {serviceFilter}
              </Badge>
            )}
          </div>
        </div>

        {/* Cleaners Grid */}
        {filteredCleaners.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCleaners.map((cleaner) => (
              <CleanerCard key={cleaner.id} cleaner={cleaner} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center border-border">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
              No cleaners found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or filters
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setLocationFilter('all');
                setServiceFilter('all');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </Card>
        )}
      </div>

      {/* CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-border p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-4">
            Not finding what you're looking for?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Contact our support team and we'll help you find the perfect cleaning professional for your needs.
          </p>
          <Button className="bg-primary hover:bg-primary-hover text-white">
            Contact Support
          </Button>
        </Card>
      </div>

      <Footer />
    </div>
  );
}