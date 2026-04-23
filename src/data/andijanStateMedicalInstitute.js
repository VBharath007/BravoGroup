// Main campus image
import andijanCampusImage from '../assets/Andijan-State-Medical-University.webp';

// Andijan-specific images (currently using generic placeholders - replace with actual Andijan images)
import andijanLibraryImage from '../assets/uni3.webp'; // Replace with actual Andijan library image
import andijanLabImage from '../assets/uni4.webp'; // Replace with actual Andijan lab image
import andijanCampusLifeImage from '../assets/uni5.webp'; // Replace with actual Andijan campus life image
import andijanClassroomImage from '../assets/uni6.webp'; // Replace with actual Andijan classroom image
import andijanAnatomyLabImage from '../assets/uni7.webp'; // Replace with actual Andijan anatomy lab image
import andijanHostelImage from '../assets/uni1.webp'; // Replace with actual Andijan hostel image

export const andijanStateMedicalInstitute = {
  id: 4,
  name: 'Andijan State Medical Institute',
  slug: 'andijan-state-medical-institute',
  location: 'Andijan, Uzbekistan',
  established: 1974,
  students: 1800,
  campusImage: andijanCampusImage,
  heroPrompt: 'Front view of Andijan State Medical Institute, focusing on the entrance and medical laboratory blocks. Professional architectural shot, realistic textures, daytime clear weather.',
  description: 'Andijan State Medical Institute focuses on creating competent medical professionals with strong laboratory and diagnostic skills.',
  about: 'Established in 1974, Andijan State Medical Institute is committed to producing doctors who excel in diagnostic medicine and clinical practice.',

  studentImages: [
    {
      img: andijanLibraryImage,
      title: 'Lab Excellence',
      caption: 'Students working in state-of-the-art diagnostic laboratories.'
    },
    {
      img: andijanLabImage,
      title: 'Patient Care',
      caption: 'Direct patient interaction and clinical experience.'
    },
    {
      img: andijanCampusLifeImage,
      title: 'Professional Training',
      caption: 'Rigorous professional development programs.'
    }
  ],

  classrooms: [
    {
      name: 'Diagnostic Lab Block',
      description: 'Well-equipped diagnostic laboratories with latest pathology equipment.',
      image: andijanClassroomImage
    },
    {
      name: 'Classroom Complex',
      description: 'Multi-floor classroom complex with AV facilities.',
      image: andijanAnatomyLabImage
    },
    {
      name: 'Practical Training Centers',
      description: 'Centers for hands-on clinical and laboratory training.',
      image: andijanHostelImage
    }
  ],

  hostels: [
    {
      name: 'Residential Complex',
      capacity: 200,
      facilities: ['Comfortable Rooms', 'WiFi', 'Laundry', 'Dining'],
      image: andijanHostelImage
    }
  ],

  infrastructure: [
    { name: 'Diagnostic Center', description: 'State-of-the-art diagnostic facilities' },
    { name: 'Clinical Hospital', description: '250-bed hospital' },
    { name: 'Library', description: '80,000+ medical resources' },
    { name: 'Lab Complex', description: 'Multiple specialized laboratories' },
    { name: 'Student Center', description: 'Modern student hub' },
    { name: 'Medical Museum', description: 'Educational pathology museum' }
  ],

  programs: [
    { name: 'MBBS', duration: '6 years', intake: 90 },
    { name: 'Diagnostic Courses', duration: '2 years', intake: 50 },
    { name: 'Health Sciences', duration: '4 years', intake: 70 },
    { name: 'Specialty Programs', duration: '2-3 years', intake: 60 }
  ],

  admissionProcess: [
    'Online Application',
    'Document Review',
    'Entrance Examination',
    'Shortlisting',
    'Interview',
    'Admission Confirmation'
  ],

  fees: {
    perYear: '$6,000',
    totalCourse: '$36,000',
    currency: 'USD',
    installments: 'Available'
  },

  highlights: [
    '🔬 Diagnostic Excellence',
    '🏥 250-Bed Hospital',
    '📊 Strong Lab Programs',
    '👨‍🔬 Expert Faculty',
    '🎓 Industry Recognition',
    '💡 Innovation-Focused',
    '🌟 Quality Assurance'
  ]
};