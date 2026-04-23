// Main campus image from public/assets
const samarkandCampusImage = '/assets/samarkand-college.webp';

// Samarkand-specific images (currently using generic placeholders)
const samarkandLibraryImage = '/assets/uni4.webp';
const samarkandResearchLabImage = '/assets/uni5.webp';
const samarkandCampusLifeImage = '/assets/uni6.webp';
const samarkandHeritageHallImage = '/assets/uni3.webp';
const samarkandAdvancedLabImage = '/assets/uni4.webp';
const samarkandHostelImage = '/assets/uni7.webp';

export const samarkandStateMedicalUniversity = {
  id: 2,
  name: 'Samarkand State Medical University',
  slug: 'samarkand-state-medical-university',
  location: 'Samarkand, Uzbekistan',
  established: 1972,
  students: 2800,
  campusImage: samarkandCampusImage,
  heroPrompt: 'Majestic view of Samarkand State Medical University, blending historical Uzbek patterns with modern educational infrastructure. Wide angle, professional photography, high-end 3D feel.',
  description: 'Samarkand State Medical University combines rich historical heritage with cutting-edge medical education, offering a unique learning experience for future doctors.',
  about: 'Located in the ancient city of Samarkand, this university perfectly marries tradition with innovation, providing medical education of international standards in a culturally rich environment.',

  studentImages: [
    {
      img: samarkandLibraryImage,
      title: 'Library Study',
      caption: 'Students in modern library study spaces with natural lighting and collaborative areas.'
    },
    {
      img: samarkandResearchLabImage,
      title: 'Research Lab',
      caption: 'Advanced research facilities with latest medical equipment and technology.'
    },
    {
      img: samarkandCampusLifeImage,
      title: 'Campus Vibrancy',
      caption: 'Dynamic student life with cultural events and academic activities throughout the year.'
    }
  ],

  classrooms: [
    {
      name: 'Heritage Lecture Halls',
      description: 'Beautifully designed lecture halls blending traditional Uzbek architecture with modern teaching technology.',
      image: samarkandHeritageHallImage
    },
    {
      name: 'Advanced Lab Facilities',
      description: 'Fully equipped with electron microscopes, laboratory testing equipment, and research tools.',
      image: samarkandAdvancedLabImage
    },
    {
      name: 'Simulation Centers',
      description: 'High-end patient simulation labs for hands-on clinical training.',
      image: samarkandAdvancedLabImage
    }
  ],

  hostels: [
    {
      name: 'Central Hostel Complex',
      capacity: 300,
      facilities: ['Modern Rooms', 'WiFi', 'Dining Hall', 'Study Zone', 'Recreation'],
      image: samarkandCampusLifeImage
    },
    {
      name: 'Garden Hostel',
      capacity: 200,
      facilities: ['Spacious Rooms', 'WiFi', 'Cafeteria', 'Green Space', 'Parking'],
      image: samarkandHostelImage
    }
  ],

  infrastructure: [
    { name: 'Medical Hospital', description: '400-bed hospital with advanced diagnostic facilities' },
    { name: 'Research Institute', description: 'World-class medical research center' },
    { name: 'Heritage Library', description: '150,000+ books and modern digital resources' },
    { name: 'Sports Arena', description: 'Modern sports facilities with indoor and outdoor courts' },
    { name: 'Cultural Center', description: 'Performance and conference facilities' },
    { name: 'Student Plaza', description: 'Modern student gathering and dining area' }
  ],

  programs: [
    { name: 'MBBS', duration: '6 years', intake: 120 },
    { name: 'BDS', duration: '5 years', intake: 70 },
    { name: 'Nursing', duration: '4 years', intake: 80 },
    { name: 'Specialty Masters', duration: '2-3 years', intake: 100 }
  ],

  admissionProcess: [
    'Application Submission',
    'Eligibility Check',
    'Written Exam',
    'Personal Interview',
    'Medical Test',
    'Final Offer Letter'
  ],

  fees: {
    perYear: '$6,500',
    totalCourse: '$39,000',
    currency: 'USD',
    installments: 'Available'
  },

  highlights: [
    '🏛️ Heritage Meets Innovation',
    '🌟 Heritage Meets Innovation',
    '👥 Diverse International Community',
    '🎓 Strong Alumni Network',
    '🏥 400-Bed Hospital on Campus',
    '📖 Rich Academic Heritage',
    '✨ Cultural Excellence'
  ]
};