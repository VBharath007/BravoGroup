// Main campus image from public/assets
const bukharaCampusImage = '/assets/BUKHARA-STATE-MEDICAL-UNIVERSITY.webp';

// Bukhara-specific images (currently using generic placeholders)
const bukharaLibraryImage = '/assets/uni7.webp';
const bukharaLabImage = '/assets/uni1.webp';
const bukharaCampusLifeImage = '/assets/uni2.webp';
const bukharaClassroomImage = '/assets/uni3.webp';
const bukharaAnatomyLabImage = '/assets/uni4.webp';
const bukharaHostelImage = '/assets/uni5.webp';

export const bukharaStateMedicalInstitute = {
  id: 3,
  name: 'Bukhara State Medical Institute',
  slug: 'bukhara-state-medical-institute',
  location: 'Bukhara, Uzbekistan',
  established: 1980,
  students: 2200,
  campusImage: bukharaCampusImage,
  heroPrompt: 'Aerial view of Bukhara State Medical Institute campus. Clean environment, student walkways, blue sky, cinematic lighting, sharp focus on the main faculty building, 4k.',
  description: 'Bukhara State Medical Institute is known for its clean, disciplined environment and practical, hands-on medical education approach.',
  about: 'Founded in 1980, Bukhara State Medical Institute has built a reputation for producing competent medical professionals with strong practical skills and ethical values.',

  studentImages: [
    {
      img: bukharaCampusLifeImage,
      title: 'Clinical Practice',
      caption: 'Students engaged in clinical training with real patients under supervision.'
    },
    {
      img: bukharaLibraryImage,
      title: 'Practical Skills',
      caption: 'Hands-on training in state-of-the-art medical facilities.'
    },
    {
      img: bukharaLabImage,
      title: 'Student Achievements',
      caption: 'Success stories of our graduates in international practice.'
    }
  ],

  classrooms: [
    {
      name: 'Clinical Skill Labs',
      description: 'Dedicated labs for developing practical clinical skills with simulation equipment.',
      image: bukharaClassroomImage
    },
    {
      name: 'Classroom Blocks A & B',
      description: 'Well-ventilated classroom blocks with modern amenities.',
      image: bukharaAnatomyLabImage
    },
    {
      name: 'Research Lab',
      description: 'Equipped for medical research and scientific investigations.',
      image: bukharaHostelImage
    }
  ],

  hostels: [
    {
      name: 'Main Hostel',
      capacity: 250,
      facilities: ['Clean Rooms', 'WiFi', 'Dining', 'Medicine Store'],
      image: bukharaHostelImage
    },
    {
      name: 'New Block Hostel',
      capacity: 180,
      facilities: ['Modern Rooms', 'WiFi', 'Gym', 'Cafeteria'],
      image: bukharaCampusLifeImage
    }
  ],

  infrastructure: [
    { name: 'Teaching Hospital', description: '300-bed hospital with all major departments' },
    { name: 'Medical Store', description: 'On-campus pharmacy and medical supplies' },
    { name: 'Library', description: '100,000+ medical texts and journals' },
    { name: 'Fitness Center', description: 'Modern gym and sports facilities' },
    { name: 'Conference Hall', description: 'Seminar and workshop hosting' },
    { name: 'Student Canteen', description: 'Hygienic, affordable dining' }
  ],

  programs: [
    { name: 'MBBS', duration: '6 years', intake: 100 },
    { name: 'Nursing', duration: '4 years', intake: 60 },
    { name: 'Paramedical Studies', duration: '3 years', intake: 80 },
    { name: 'Postgraduate Programs', duration: '2 years', intake: 70 }
  ],

  admissionProcess: [
    'Form Submission',
    'Document Verification',
    'Entrance Exam',
    'Merit-based Selection',
    'Final Admission'
  ],

  fees: {
    perYear: '$5,500',
    totalCourse: '$33,000',
    currency: 'USD',
    installments: 'Available'
  },

  highlights: [
    '✅ Practical-Oriented Education',
    '🏥 300-Bed Teaching Hospital',
    '📚 Comprehensive Library',
    '⚕️ Strong Medical Ethics',
    '🌱 Green Campus',
    '💪 Fitness & Wellness Focus',
    '🎯 Career-Ready Graduates'
  ]
};