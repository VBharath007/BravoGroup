// Main campus image
import tashkentCampusImage from '../assets/TASHKENT-MEDICAL-ACADEMY.webp';

// Tashkent-specific images (currently using generic placeholders - replace with actual Tashkent images)
import tashkentLibraryImage from '../assets/uni1.webp'; // Replace with actual Tashkent library image
import tashkentLabImage from '../assets/uni2.webp'; // Replace with actual Tashkent lab image
import tashkentCampusLifeImage from '../assets/uni3.webp'; // Replace with actual Tashkent campus life image
import tashkentClassroomImage from '../assets/uni4.webp'; // Replace with actual Tashkent classroom image
import tashkentAnatomyLabImage from '../assets/uni5.webp'; // Replace with actual Tashkent anatomy lab image
import tashkentDigitalLabImage from '../assets/uni6.webp'; // Replace with actual Tashkent digital lab image
import tashkentHostelImage from '../assets/uni7.webp'; // Replace with actual Tashkent hostel image

export const tashkentMedicalAcademy = {
  id: 1,
  name: 'Tashkent Medical Academy',
  slug: 'tashkent-medical-academy',
  location: 'Tashkent, Uzbekistan',
  established: 1966,
  students: 3500,
  campusImage: tashkentCampusImage,
  heroPrompt: 'Cinematic architectural shot of Tashkent Medical Academy campus, Uzbekistan. Modern hospital buildings, large glass windows, lush green gardens, bright morning sunlight, 8k resolution, photorealistic.',
  description: 'Tashkent Medical Academy is one of the leading and most prestigious medical institutions in Uzbekistan, offering world-class education in medicine, dentistry, and public health.',
  about: 'Established in 1966, Tashkent Medical Academy has been a beacon of medical excellence for over five decades. The institution is recognized internationally for its rigorous curriculum and state-of-the-art facilities.',

  studentImages: [
    {
      img: tashkentLibraryImage,
      title: 'Library Study',
      caption: 'Indian medical students wearing white coats, studying in a modern, high-tech library. Stethoscopes on tables, medical books open, bright natural lighting, 4k photorealistic.'
    },
    {
      img: tashkentLabImage,
      title: 'Practical Lab',
      caption: 'South Indian medical students practicing on high-fidelity anatomy mannequins in Tashkent Medical Academy modern lab. Focused expressions, professional medical environment, cinematic depth of field.'
    },
    {
      img: tashkentCampusLifeImage,
      title: 'Campus Life',
      caption: 'Indian students walking together on a clean, sunny Tashkent Medical Academy campus, holding notebooks, laughing, blurred university building in the background, high-quality skin textures, realistic.'
    }
  ],

  classrooms: [
    {
      name: 'Modern Lecture Halls',
      description: 'State-of-the-art lecture theaters equipped with interactive whiteboards, projection systems, and seating for 200+ students.',
      image: tashkentClassroomImage
    },
    {
      name: 'Anatomy Lab',
      description: 'Fully equipped anatomy laboratories with latest observation equipment and teaching aids.',
      image: tashkentAnatomyLabImage
    },
    {
      name: 'Digital Learning Lab',
      description: 'Computer-based learning facilities with simulation software and online resources.',
      image: tashkentDigitalLabImage
    }
  ],

  hostels: [
    {
      name: 'Boys Hostel - Block A',
      capacity: 400,
      facilities: ['Single & Double Rooms', 'WiFi', 'Gym', 'Cafeteria', 'Study Lounge'],
      image: tashkentHostelImage
    },
    {
      name: 'Girls Hostel - Block B',
      capacity: 350,
      facilities: ['Single & Double Rooms', 'WiFi', 'Yoga Studio', 'Cafeteria', 'Recreation Area'],
      image: tashkentLibraryImage
    },
    {
      name: 'International Students Hostel',
      capacity: 250,
      facilities: ['Premium Rooms', 'WiFi', '24/7 Security', 'Laundry', 'Common Kitchen'],
      image: tashkentLabImage
    }
  ],

  infrastructure: [
    { name: 'Teaching Hospital', description: '500-bed tertiary care teaching hospital with all modern medical departments' },
    { name: 'Research Center', description: 'State-of-the-art research facilities with ongoing medical research projects' },
    { name: 'Library', description: '200,000+ medical books, journals, and digital resources' },
    { name: 'Sports Complex', description: 'Olympic-size swimming pool, basketball courts, gymnastics area' },
    { name: 'Auditorium', description: '2000-seating capacity for seminars and conferences' },
    { name: 'Cafeteria', description: 'World-class dining with cuisine from 20+ countries' }
  ],

  programs: [
    { name: 'Bachelor of Medicine (MBBS)', duration: '6 years', intake: 150 },
    { name: 'Bachelor of Dental Surgery', duration: '5 years', intake: 80 },
    { name: 'Bachelor of Public Health', duration: '4 years', intake: 100 },
    { name: 'Master Programs', duration: '2 years', intake: 120 }
  ],

  admissionProcess: [
    'Online Application Submission',
    'Document Verification',
    'Entrance Test (if applicable)',
    'Interview Round',
    'Final Selection & Admission Letter',
    'Registration & Enrollment'
  ],

  fees: {
    perYear: '$7,500',
    totalCourse: '$45,000',
    currency: 'USD',
    installments: 'Available'
  },

  highlights: [
    '🏆 Ranked #1 Medical University in Central Asia',
    '🌍 250+ International Student Community',
    '👨‍🏫 500+ Experienced Faculty Members',
    '🏥 500-Bed Teaching Hospital',
    '📚 Digital Library with 200,000+ Resources',
    '🎓 100% Placement Rate',
    '💼 MCI & NMC Recognized'
  ]
};