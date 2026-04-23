// Import individual university data files
import { tashkentMedicalAcademy } from './tashkentMedicalAcademy';
import { samarkandStateMedicalUniversity } from './samarkandStateMedicalUniversity';
import { bukharaStateMedicalInstitute } from './bukharaStateMedicalInstitute';
import { andijanStateMedicalInstitute } from './andijanStateMedicalInstitute';
import { ferganaMedicalInstitute } from './ferganaMedicalInstitute';

// Combine all universities into a single array
const universities = [
  tashkentMedicalAcademy,
  samarkandStateMedicalUniversity,
  bukharaStateMedicalInstitute,
  andijanStateMedicalInstitute,
  ferganaMedicalInstitute
];

export default universities;
