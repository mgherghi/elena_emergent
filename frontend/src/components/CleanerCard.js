import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, Shield, Sparkles } from 'lucide-react';

export const CleanerCard = ({ cleaner, showContact = false }) => {
  return (
    <Card className="overflow-hidden hover:shadow-card-hover transition-all duration-300 border border-border flex flex-col h-full">
      <div className="relative">
        <img
          src={cleaner.avatar}
          alt={cleaner.name}
          className="w-full h-48 object-cover"
        />
        {cleaner.verified && (
          <div className="absolute top-3 right-3 bg-success text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
            <Shield className="w-3 h-3" />
            Verificat
          </div>
        )}
        <div className="absolute top-3 left-3 bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold text-foreground shadow-lg">
          {cleaner.hourlyRate} lei/oră
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        {/* Header */}
        <div className="mb-3">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              {cleaner.name}
            </h3>
            <div className="flex items-center gap-1 bg-primary-light px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-semibold text-primary">{cleaner.rating}</span>
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {cleaner.location}
            </span>
            <span>{cleaner.reviews} recenzii</span>
          </div>
        </div>

        {/* Services */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {cleaner.services.slice(0, 3).map((service, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
          {cleaner.services.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{cleaner.services.length - 3}
            </Badge>
          )}
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2 text-sm mb-4">
          <Clock className="w-4 h-4 text-secondary" />
          <span className="text-secondary font-medium">{cleaner.availability}</span>
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <Link to={`/cleaner/${cleaner.id}`} className="block">
            <Button className="w-full bg-primary hover:bg-primary-hover text-white">
              Vezi Profilul
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};