export const mockCleaners = [
  {
    id: 1,
    name: 'Maria Santos',
    rating: 4.9,
    reviews: 127,
    hourlyRate: 25,
    location: 'Amsterdam Center',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    verified: true,
    services: ['Residential Cleaning', 'Deep Cleaning', 'Move-in/out'],
    availability: 'Available this week',
    yearsExperience: 5,
    languages: ['Dutch', 'English', 'Portuguese'],
    bio: 'Professional cleaner with 5+ years of experience. Specialized in deep cleaning and eco-friendly products. I take pride in leaving every home spotless!',
    gallery: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&h=400&fit=crop'
    ],
    certifications: ['Police Report Verified', 'Insurance Covered', 'Background Checked'],
    responseTime: '< 1 hour',
  },
  {
    id: 2,
    name: 'Jan de Vries',
    rating: 4.8,
    reviews: 89,
    hourlyRate: 28,
    location: 'Rotterdam Zuid',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    verified: true,
    services: ['Commercial Cleaning', 'Office Cleaning', 'Window Cleaning'],
    availability: 'Available next week',
    yearsExperience: 8,
    languages: ['Dutch', 'English', 'German'],
    bio: 'Expert in commercial and office spaces. Flexible scheduling and professional service guaranteed.',
    gallery: [
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop'
    ],
    certifications: ['Police Report Verified', 'Commercial License', 'Insurance Covered'],
    responseTime: '< 2 hours',
  },
  {
    id: 3,
    name: 'Sophie Laurent',
    rating: 5.0,
    reviews: 156,
    hourlyRate: 30,
    location: 'Utrecht Centrum',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    verified: true,
    services: ['Residential Cleaning', 'Deep Cleaning', 'Carpet Cleaning', 'Post-renovation'],
    availability: 'Available today',
    yearsExperience: 7,
    languages: ['Dutch', 'English', 'French'],
    bio: 'Perfectionist cleaner with attention to detail. Eco-friendly products only. Your satisfaction is my priority!',
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&h=400&fit=crop'
    ],
    certifications: ['Police Report Verified', 'Premium Certified', 'Insurance Covered'],
    responseTime: '< 30 minutes',
  },
  {
    id: 4,
    name: 'Ahmed Hassan',
    rating: 4.7,
    reviews: 73,
    hourlyRate: 24,
    location: 'The Hague West',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    verified: true,
    services: ['Residential Cleaning', 'Move-in/out', 'Window Cleaning'],
    availability: 'Available this week',
    yearsExperience: 4,
    languages: ['Dutch', 'English', 'Arabic'],
    bio: 'Reliable and thorough cleaning services. Flexible with scheduling and always on time.',
    gallery: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop'
    ],
    certifications: ['Police Report Verified', 'Background Checked'],
    responseTime: '< 3 hours',
  },
  {
    id: 5,
    name: 'Elena Popescu',
    rating: 4.9,
    reviews: 142,
    hourlyRate: 27,
    location: 'Eindhoven',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
    verified: true,
    services: ['Deep Cleaning', 'Ironing Service', 'Laundry Service', 'Residential Cleaning'],
    availability: 'Available today',
    yearsExperience: 6,
    languages: ['Dutch', 'English', 'Romanian'],
    bio: 'Detail-oriented professional offering comprehensive home care services. Ironing and laundry included!',
    gallery: [
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&h=400&fit=crop'
    ],
    certifications: ['Police Report Verified', 'Insurance Covered', 'Background Checked'],
    responseTime: '< 1 hour',
  },
  {
    id: 6,
    name: 'Thomas Müller',
    rating: 4.6,
    reviews: 58,
    hourlyRate: 26,
    location: 'Maastricht',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    verified: true,
    services: ['Commercial Cleaning', 'Carpet Cleaning', 'Post-renovation'],
    availability: 'Available next week',
    yearsExperience: 3,
    languages: ['Dutch', 'English', 'German'],
    bio: 'Specialized in post-renovation and commercial spaces. Professional equipment for all jobs.',
    gallery: [
      'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&h=400&fit=crop'
    ],
    certifications: ['Police Report Verified', 'Commercial License'],
    responseTime: '< 4 hours',
  }
];

export const mockReviews = [
  {
    id: 1,
    cleanerId: 1,
    customerName: 'Anna van Berg',
    rating: 5,
    date: '2024-01-15',
    comment: 'Maria did an outstanding job! My apartment has never looked better. Very professional and friendly.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop'
  },
  {
    id: 2,
    cleanerId: 1,
    customerName: 'Peter Johnson',
    rating: 5,
    date: '2024-01-10',
    comment: 'Excellent service! Maria was very thorough and paid attention to every detail. Highly recommend!',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop'
  },
  {
    id: 3,
    cleanerId: 1,
    customerName: 'Lisa Smit',
    rating: 4,
    date: '2024-01-05',
    comment: 'Great cleaning service. Very reliable and the apartment was spotless. Will book again!',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop'
  }
];

export const mockMessages = [
  {
    id: 1,
    cleanerId: 1,
    cleanerName: 'Maria Santos',
    cleanerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    lastMessage: 'I can definitely help with that! What time works best for you?',
    timestamp: '2024-01-20T10:30:00',
    unread: 2,
    messages: [
      { sender: 'customer', text: 'Hi! Are you available this Thursday?', timestamp: '2024-01-20T10:15:00' },
      { sender: 'cleaner', text: 'Hi! Yes, I have slots available on Thursday. What time would you prefer?', timestamp: '2024-01-20T10:20:00' },
      { sender: 'customer', text: 'Would 2 PM work? I need a deep clean for a 2-bedroom apartment.', timestamp: '2024-01-20T10:25:00' },
      { sender: 'cleaner', text: 'I can definitely help with that! What time works best for you?', timestamp: '2024-01-20T10:30:00' }
    ]
  },
  {
    id: 2,
    cleanerId: 3,
    cleanerName: 'Sophie Laurent',
    cleanerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    lastMessage: 'Thank you for choosing my services!',
    timestamp: '2024-01-19T14:20:00',
    unread: 0,
    messages: [
      { sender: 'customer', text: 'Thanks for the great service yesterday!', timestamp: '2024-01-19T14:10:00' },
      { sender: 'cleaner', text: 'Thank you for choosing my services!', timestamp: '2024-01-19T14:20:00' }
    ]
  }
];

export const mockBookings = [
  {
    id: 1,
    cleanerId: 1,
    cleanerName: 'Maria Santos',
    cleanerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    date: '2024-01-25',
    time: '10:00 AM',
    service: 'Deep Cleaning',
    status: 'confirmed',
    price: 100
  },
  {
    id: 2,
    cleanerId: 3,
    cleanerName: 'Sophie Laurent',
    cleanerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    date: '2024-01-18',
    time: '2:00 PM',
    service: 'Residential Cleaning',
    status: 'completed',
    price: 90
  },
  {
    id: 3,
    cleanerId: 2,
    cleanerName: 'Jan de Vries',
    cleanerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    date: '2024-01-28',
    time: '3:00 PM',
    service: 'Office Cleaning',
    status: 'pending',
    price: 150
  }
];