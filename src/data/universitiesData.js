// Universities Data Grouping
import { 
  uzbekistanRegions, 
  kyrgyzstanLinks, 
  georgiaLinks, 
  russiaLinks 
} from './universityLinks';

// Grouped data for Navbar default consumption
const universitiesData = {
  "Uzbekistan": uzbekistanRegions.flatMap(r => r.links),
  "Kyrgyzstan": kyrgyzstanLinks,
  "Georgia": georgiaLinks,
  "Russia": russiaLinks
};

export default universitiesData;
