// Import individual university data files (Uzbekistan)
import tashkentMedicalAcademy from '../pages/universities/TashkentMedicalAcademy';
import samarkandStateMedicalUniversity from '../pages/universities/SamarkandStateMedicalUniversity';
import bukharaStateMedicalInstitute from '../pages/universities/BukharaStateMedicalInstitute';
import andijanStateMedicalInstitute from '../pages/universities/AndijanStateMedicalInstitute';
import ferganaMedicalInstitute from '../pages/universities/FerganaMedicalInstitute';

import { 
  uzbekistanRegions, 
  kyrgyzstanLinks, 
  georgiaLinks, 
  russiaLinks 
} from './universityLinks';

// Combine all universities into a single array (Old usage)
export const universitiesArray = [
  tashkentMedicalAcademy,
  samarkandStateMedicalUniversity,
  bukharaStateMedicalInstitute,
  andijanStateMedicalInstitute,
  ferganaMedicalInstitute
];

// Grouped data for Navbar default consumption
const universitiesData = {
  "Uzbekistan": uzbekistanRegions.flatMap(r => r.links),
  "Kyrgyzstan": kyrgyzstanLinks,
  "Georgia": georgiaLinks,
  "Russia": russiaLinks
};

export default universitiesData;
