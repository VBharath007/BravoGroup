// Main campus image from public/assets
const ferganaCampusImage = '/assets/fergana.webp';

// Fergana-specific images (currently using generic placeholders)
const ferganaLibraryImage = '/assets/uni6.webp';
const ferganaLabImage = '/assets/uni7.webp';
const ferganaCampusLifeImage = '/assets/uni1.webp';
const ferganaClassroomImage = '/assets/uni2.webp';
const ferganaAnatomyLabImage = '/assets/uni3.webp';
const ferganaHostelImage = '/assets/uni4.webp';

export const ferganaMedicalInstitute = {
  id: 5,
  name: 'Fergana Medical Institute',
  slug: 'fergana-medical-institute',
  location: 'Fergana, Uzbekistan',
  established: 1975,
  students: 1600,
  campusImage: ferganaCampusImage,
  heroPrompt: 'Serene and modern campus of Fergana Medical Institute of Public Health. Featuring student sitting areas, modern benches, and a clean medical university aesthetic.',
  description: 'Fergana Medical Institute specializes in public health education, producing doctors who focus on community health and preventive medicine.',
  about: 'Fergana Medical Institute has been a leader in public health education and community-oriented medical practice since 1975.',

  studentImages: [
    {
      img: ferganaLibraryImage,
      title: 'Public Health Focus',
      caption: 'Community health projects and outreach programs.'
    },
    {
      img: ferganaLabImage,
      title: 'Campus Serenity',
      caption: 'Beautiful, tranquil campus environment for focused learning.'
    },
    {
      img: ferganaCampusLifeImage,
      title: 'Student Wellness',
      caption: 'Holistic student development and wellness programs.'
    }
  ],

  classrooms: [
    {
      name: 'Public Health Complex',
      description: 'Specialized facilities for public health education and epidemiology studies.',
      image: ferganaClassroomImage
    },
    {
      name: 'Lecture Halls',
      description: 'Modern lecture halls with latest audiovisual equipment.',
      image: ferganaAnatomyLabImage
    },
    {
      name: 'Field Training Center',
      description: 'Outdoor and field-based training facilities for community health.',
      image: ferganaHostelImage
    }
  ],

  hostels: [
    {
      name: 'Student Hostel',
      capacity: 150,
      facilities: ['Well-Furnished', 'WiFi', 'Peaceful Environment', 'Garden'],
      image: ferganaHostelImage
    }
  ],

  infrastructure: [
    { name: 'Public Health Center', description: 'Modern public health research and training center' },
    { name: 'Hospital', description: '200-bed hospital with community focus' },
    { name: 'Library', description: '70,000+ public health resources' },
    { name: 'Green Campus', description: 'Beautiful landscaped campus with gardens' },
    { name: 'Community Center', description: 'Community engagement facilities' },
    { name: 'Wellness Center', description: 'Student health and wellness services' }
  ],

  programs: [
    { name: 'MBBS', duration: '6 years', intake: 80 },
    { name: 'Public Health (MPH)', duration: '2 years', intake: 60 },
    { name: 'Community Health', duration: '3 years', intake: 50 },
    { name: 'Epidemiology Programs', duration: '2 years', intake: 40 }
  ],

  admissionProcess: [
    'Application Submission',
    'Eligibility Verification',
    'Written Assessment',
    'Group Discussion',
    'Personal Interview',
    'Merit List Publication'
  ],

  fees: {
    perYear: '$5,000',
    totalCourse: '$30,000',
    currency: 'USD',
    installments: 'Available'
  },

  highlights: [
    '🌍 Public Health Leaders',
    '🏥 200-Bed Community Hospital',
    '♻️ Sustainable Healthcare Focus',
    '🌿 Green, Peaceful Campus',
    '📚 Specialized Public Health Library',
    '🤝 Community Partnerships',
    '💚 Health Equity Commitment'
  ]
};