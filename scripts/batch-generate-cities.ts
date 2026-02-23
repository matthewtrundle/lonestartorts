/**
 * Batch City Page Generator
 * Generates all 100 city landing pages using DeepSeek R1T2 Chimera via OpenRouter
 *
 * Usage:
 *   OPENROUTER_API_KEY=your_key npx ts-node scripts/batch-generate-cities.ts
 *   OPENROUTER_API_KEY=your_key npx ts-node scripts/batch-generate-cities.ts --state California
 *   OPENROUTER_API_KEY=your_key npx ts-node scripts/batch-generate-cities.ts --batch 1
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// OpenRouter configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const MODEL = 'tngtech/deepseek-r1t2-chimera:free';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Rate limiting - DeepSeek free tier
const DELAY_BETWEEN_REQUESTS = 3000; // 3 seconds between requests
const MAX_RETRIES = 3;

interface CityData {
  city: string;
  state: string;
  stateAbbr: string;
  region: string;
  nearbyStates: string[];
  nearbyCities: string[];
  population?: string;
  localFood?: string[];
}

// Complete city database - 100 cities across all states (excluding Texas)
const ALL_CITIES: CityData[] = [
  // CALIFORNIA - 20 cities
  { city: 'Los Angeles', state: 'California', stateAbbr: 'CA', region: 'Southern California', nearbyStates: ['Arizona', 'Nevada'], nearbyCities: ['San Diego', 'Long Beach', 'Anaheim'], population: '3.9M' },
  { city: 'San Diego', state: 'California', stateAbbr: 'CA', region: 'Southern California', nearbyStates: ['Arizona', 'Nevada'], nearbyCities: ['Los Angeles', 'Anaheim', 'Riverside'], population: '1.4M' },
  { city: 'San Jose', state: 'California', stateAbbr: 'CA', region: 'Bay Area', nearbyStates: ['Oregon', 'Nevada'], nearbyCities: ['San Francisco', 'Oakland', 'Fremont'], population: '1.0M' },
  { city: 'San Francisco', state: 'California', stateAbbr: 'CA', region: 'Bay Area', nearbyStates: ['Oregon', 'Nevada'], nearbyCities: ['Oakland', 'San Jose', 'Berkeley'], population: '874K' },
  { city: 'Fresno', state: 'California', stateAbbr: 'CA', region: 'Central Valley', nearbyStates: ['Nevada', 'Arizona'], nearbyCities: ['Sacramento', 'Bakersfield', 'Modesto'], population: '542K' },
  { city: 'Sacramento', state: 'California', stateAbbr: 'CA', region: 'Central Valley', nearbyStates: ['Nevada', 'Oregon'], nearbyCities: ['San Francisco', 'Stockton', 'Fresno'], population: '524K' },
  { city: 'Long Beach', state: 'California', stateAbbr: 'CA', region: 'Southern California', nearbyStates: ['Arizona', 'Nevada'], nearbyCities: ['Los Angeles', 'Anaheim', 'Irvine'], population: '466K' },
  { city: 'Oakland', state: 'California', stateAbbr: 'CA', region: 'Bay Area', nearbyStates: ['Oregon', 'Nevada'], nearbyCities: ['San Francisco', 'San Jose', 'Berkeley'], population: '433K' },
  { city: 'Bakersfield', state: 'California', stateAbbr: 'CA', region: 'Central Valley', nearbyStates: ['Nevada', 'Arizona'], nearbyCities: ['Fresno', 'Los Angeles', 'Lancaster'], population: '403K' },
  { city: 'Anaheim', state: 'California', stateAbbr: 'CA', region: 'Orange County', nearbyStates: ['Arizona', 'Nevada'], nearbyCities: ['Los Angeles', 'Santa Ana', 'Irvine'], population: '350K' },
  { city: 'Santa Ana', state: 'California', stateAbbr: 'CA', region: 'Orange County', nearbyStates: ['Arizona', 'Nevada'], nearbyCities: ['Anaheim', 'Irvine', 'Long Beach'], population: '310K' },
  { city: 'Riverside', state: 'California', stateAbbr: 'CA', region: 'Inland Empire', nearbyStates: ['Arizona', 'Nevada'], nearbyCities: ['San Bernardino', 'Los Angeles', 'Corona'], population: '314K' },
  { city: 'Stockton', state: 'California', stateAbbr: 'CA', region: 'Central Valley', nearbyStates: ['Nevada', 'Oregon'], nearbyCities: ['Sacramento', 'Modesto', 'Oakland'], population: '320K' },
  { city: 'Irvine', state: 'California', stateAbbr: 'CA', region: 'Orange County', nearbyStates: ['Arizona', 'Nevada'], nearbyCities: ['Anaheim', 'Santa Ana', 'Long Beach'], population: '307K' },
  { city: 'Chula Vista', state: 'California', stateAbbr: 'CA', region: 'Southern California', nearbyStates: ['Arizona', 'Nevada'], nearbyCities: ['San Diego', 'National City', 'Tijuana'], population: '275K' },
  { city: 'San Bernardino', state: 'California', stateAbbr: 'CA', region: 'Inland Empire', nearbyStates: ['Arizona', 'Nevada'], nearbyCities: ['Riverside', 'Fontana', 'Ontario'], population: '222K' },
  { city: 'Fremont', state: 'California', stateAbbr: 'CA', region: 'Bay Area', nearbyStates: ['Nevada', 'Oregon'], nearbyCities: ['San Jose', 'Oakland', 'Hayward'], population: '230K' },
  { city: 'Modesto', state: 'California', stateAbbr: 'CA', region: 'Central Valley', nearbyStates: ['Nevada', 'Oregon'], nearbyCities: ['Stockton', 'Fresno', 'Sacramento'], population: '218K' },
  { city: 'Fontana', state: 'California', stateAbbr: 'CA', region: 'Inland Empire', nearbyStates: ['Arizona', 'Nevada'], nearbyCities: ['San Bernardino', 'Riverside', 'Ontario'], population: '214K' },
  { city: 'Moreno Valley', state: 'California', stateAbbr: 'CA', region: 'Inland Empire', nearbyStates: ['Arizona', 'Nevada'], nearbyCities: ['Riverside', 'Perris', 'Corona'], population: '212K' },

  // NEW YORK - 10 cities
  { city: 'New York City', state: 'New York', stateAbbr: 'NY', region: 'Tri-State Area', nearbyStates: ['New Jersey', 'Connecticut', 'Pennsylvania'], nearbyCities: ['Jersey City', 'Newark', 'Yonkers'], population: '8.3M' },
  { city: 'Buffalo', state: 'New York', stateAbbr: 'NY', region: 'Western New York', nearbyStates: ['Pennsylvania', 'Canada'], nearbyCities: ['Rochester', 'Syracuse', 'Niagara Falls'], population: '278K' },
  { city: 'Rochester', state: 'New York', stateAbbr: 'NY', region: 'Western New York', nearbyStates: ['Pennsylvania', 'Canada'], nearbyCities: ['Buffalo', 'Syracuse', 'Albany'], population: '211K' },
  { city: 'Yonkers', state: 'New York', stateAbbr: 'NY', region: 'Tri-State Area', nearbyStates: ['New Jersey', 'Connecticut'], nearbyCities: ['New York City', 'White Plains', 'Mount Vernon'], population: '211K' },
  { city: 'Syracuse', state: 'New York', stateAbbr: 'NY', region: 'Central New York', nearbyStates: ['Pennsylvania', 'Vermont'], nearbyCities: ['Rochester', 'Albany', 'Utica'], population: '148K' },
  { city: 'Albany', state: 'New York', stateAbbr: 'NY', region: 'Capital District', nearbyStates: ['Massachusetts', 'Vermont', 'Connecticut'], nearbyCities: ['Schenectady', 'Troy', 'Syracuse'], population: '99K' },
  { city: 'Brooklyn', state: 'New York', stateAbbr: 'NY', region: 'New York City', nearbyStates: ['New Jersey', 'Connecticut'], nearbyCities: ['Manhattan', 'Queens', 'Staten Island'], population: '2.6M' },
  { city: 'Queens', state: 'New York', stateAbbr: 'NY', region: 'New York City', nearbyStates: ['New Jersey', 'Connecticut'], nearbyCities: ['Brooklyn', 'Manhattan', 'The Bronx'], population: '2.3M' },
  { city: 'The Bronx', state: 'New York', stateAbbr: 'NY', region: 'New York City', nearbyStates: ['New Jersey', 'Connecticut'], nearbyCities: ['Manhattan', 'Yonkers', 'Queens'], population: '1.4M' },
  { city: 'Staten Island', state: 'New York', stateAbbr: 'NY', region: 'New York City', nearbyStates: ['New Jersey'], nearbyCities: ['Brooklyn', 'Jersey City', 'Newark'], population: '495K' },

  // ILLINOIS - 8 cities
  { city: 'Chicago', state: 'Illinois', stateAbbr: 'IL', region: 'Chicagoland', nearbyStates: ['Indiana', 'Wisconsin', 'Michigan'], nearbyCities: ['Aurora', 'Naperville', 'Joliet'], population: '2.7M' },
  { city: 'Aurora', state: 'Illinois', stateAbbr: 'IL', region: 'Chicagoland', nearbyStates: ['Indiana', 'Wisconsin'], nearbyCities: ['Chicago', 'Naperville', 'Joliet'], population: '180K' },
  { city: 'Naperville', state: 'Illinois', stateAbbr: 'IL', region: 'Chicagoland', nearbyStates: ['Indiana', 'Wisconsin'], nearbyCities: ['Chicago', 'Aurora', 'Bolingbrook'], population: '149K' },
  { city: 'Joliet', state: 'Illinois', stateAbbr: 'IL', region: 'Chicagoland', nearbyStates: ['Indiana', 'Wisconsin'], nearbyCities: ['Chicago', 'Aurora', 'Naperville'], population: '150K' },
  { city: 'Rockford', state: 'Illinois', stateAbbr: 'IL', region: 'Northern Illinois', nearbyStates: ['Wisconsin', 'Iowa'], nearbyCities: ['Chicago', 'Madison', 'Milwaukee'], population: '148K' },
  { city: 'Springfield', state: 'Illinois', stateAbbr: 'IL', region: 'Central Illinois', nearbyStates: ['Missouri', 'Indiana'], nearbyCities: ['Decatur', 'Champaign', 'Peoria'], population: '114K' },
  { city: 'Peoria', state: 'Illinois', stateAbbr: 'IL', region: 'Central Illinois', nearbyStates: ['Missouri', 'Iowa'], nearbyCities: ['Springfield', 'Bloomington', 'Champaign'], population: '113K' },
  { city: 'Elgin', state: 'Illinois', stateAbbr: 'IL', region: 'Chicagoland', nearbyStates: ['Wisconsin', 'Indiana'], nearbyCities: ['Chicago', 'Aurora', 'Schaumburg'], population: '114K' },

  // ARIZONA - 8 cities
  { city: 'Phoenix', state: 'Arizona', stateAbbr: 'AZ', region: 'Valley of the Sun', nearbyStates: ['California', 'Nevada', 'New Mexico'], nearbyCities: ['Scottsdale', 'Mesa', 'Tempe'], population: '1.6M' },
  { city: 'Tucson', state: 'Arizona', stateAbbr: 'AZ', region: 'Southern Arizona', nearbyStates: ['California', 'New Mexico', 'Mexico'], nearbyCities: ['Phoenix', 'Mesa', 'Sierra Vista'], population: '542K' },
  { city: 'Mesa', state: 'Arizona', stateAbbr: 'AZ', region: 'Valley of the Sun', nearbyStates: ['California', 'Nevada', 'New Mexico'], nearbyCities: ['Phoenix', 'Scottsdale', 'Tempe'], population: '504K' },
  { city: 'Scottsdale', state: 'Arizona', stateAbbr: 'AZ', region: 'Valley of the Sun', nearbyStates: ['California', 'Nevada'], nearbyCities: ['Phoenix', 'Mesa', 'Tempe'], population: '241K' },
  { city: 'Chandler', state: 'Arizona', stateAbbr: 'AZ', region: 'Valley of the Sun', nearbyStates: ['California', 'Nevada', 'New Mexico'], nearbyCities: ['Phoenix', 'Mesa', 'Gilbert'], population: '275K' },
  { city: 'Gilbert', state: 'Arizona', stateAbbr: 'AZ', region: 'Valley of the Sun', nearbyStates: ['California', 'Nevada', 'New Mexico'], nearbyCities: ['Mesa', 'Chandler', 'Phoenix'], population: '267K' },
  { city: 'Glendale', state: 'Arizona', stateAbbr: 'AZ', region: 'Valley of the Sun', nearbyStates: ['California', 'Nevada'], nearbyCities: ['Phoenix', 'Peoria', 'Scottsdale'], population: '248K' },
  { city: 'Tempe', state: 'Arizona', stateAbbr: 'AZ', region: 'Valley of the Sun', nearbyStates: ['California', 'Nevada', 'New Mexico'], nearbyCities: ['Phoenix', 'Mesa', 'Scottsdale'], population: '180K' },

  // FLORIDA - 10 cities
  { city: 'Miami', state: 'Florida', stateAbbr: 'FL', region: 'South Florida', nearbyStates: ['Georgia', 'Alabama'], nearbyCities: ['Fort Lauderdale', 'West Palm Beach', 'Hialeah'], population: '442K' },
  { city: 'Orlando', state: 'Florida', stateAbbr: 'FL', region: 'Central Florida', nearbyStates: ['Georgia', 'Alabama'], nearbyCities: ['Tampa', 'Kissimmee', 'Daytona Beach'], population: '307K' },
  { city: 'Tampa', state: 'Florida', stateAbbr: 'FL', region: 'Tampa Bay', nearbyStates: ['Georgia', 'Alabama'], nearbyCities: ['St. Petersburg', 'Orlando', 'Clearwater'], population: '384K' },
  { city: 'Jacksonville', state: 'Florida', stateAbbr: 'FL', region: 'Northeast Florida', nearbyStates: ['Georgia', 'Alabama'], nearbyCities: ['St. Augustine', 'Gainesville', 'Savannah'], population: '949K' },
  { city: 'Fort Lauderdale', state: 'Florida', stateAbbr: 'FL', region: 'South Florida', nearbyStates: ['Georgia', 'Alabama'], nearbyCities: ['Miami', 'West Palm Beach', 'Hollywood'], population: '182K' },
  { city: 'St. Petersburg', state: 'Florida', stateAbbr: 'FL', region: 'Tampa Bay', nearbyStates: ['Georgia', 'Alabama'], nearbyCities: ['Tampa', 'Clearwater', 'Sarasota'], population: '258K' },
  { city: 'Hialeah', state: 'Florida', stateAbbr: 'FL', region: 'South Florida', nearbyStates: ['Georgia', 'Alabama'], nearbyCities: ['Miami', 'Miami Gardens', 'Fort Lauderdale'], population: '223K' },
  { city: 'Cape Coral', state: 'Florida', stateAbbr: 'FL', region: 'Southwest Florida', nearbyStates: ['Georgia', 'Alabama'], nearbyCities: ['Fort Myers', 'Naples', 'Sarasota'], population: '194K' },
  { city: 'Tallahassee', state: 'Florida', stateAbbr: 'FL', region: 'Florida Panhandle', nearbyStates: ['Georgia', 'Alabama'], nearbyCities: ['Jacksonville', 'Pensacola', 'Panama City'], population: '196K' },
  { city: 'West Palm Beach', state: 'Florida', stateAbbr: 'FL', region: 'South Florida', nearbyStates: ['Georgia', 'Alabama'], nearbyCities: ['Fort Lauderdale', 'Miami', 'Boca Raton'], population: '117K' },

  // COLORADO - 6 cities
  { city: 'Denver', state: 'Colorado', stateAbbr: 'CO', region: 'Front Range', nearbyStates: ['Wyoming', 'Kansas', 'Nebraska', 'New Mexico'], nearbyCities: ['Aurora', 'Colorado Springs', 'Boulder'], population: '715K' },
  { city: 'Colorado Springs', state: 'Colorado', stateAbbr: 'CO', region: 'Front Range', nearbyStates: ['Kansas', 'New Mexico'], nearbyCities: ['Denver', 'Pueblo', 'Aurora'], population: '478K' },
  { city: 'Aurora', state: 'Colorado', stateAbbr: 'CO', region: 'Front Range', nearbyStates: ['Wyoming', 'Kansas', 'Nebraska'], nearbyCities: ['Denver', 'Lakewood', 'Thornton'], population: '386K' },
  { city: 'Fort Collins', state: 'Colorado', stateAbbr: 'CO', region: 'Northern Colorado', nearbyStates: ['Wyoming', 'Nebraska'], nearbyCities: ['Denver', 'Loveland', 'Greeley'], population: '169K' },
  { city: 'Lakewood', state: 'Colorado', stateAbbr: 'CO', region: 'Front Range', nearbyStates: ['Wyoming', 'Kansas'], nearbyCities: ['Denver', 'Aurora', 'Golden'], population: '155K' },
  { city: 'Boulder', state: 'Colorado', stateAbbr: 'CO', region: 'Front Range', nearbyStates: ['Wyoming', 'Nebraska'], nearbyCities: ['Denver', 'Fort Collins', 'Longmont'], population: '105K' },

  // WASHINGTON - 6 cities
  { city: 'Seattle', state: 'Washington', stateAbbr: 'WA', region: 'Puget Sound', nearbyStates: ['Oregon', 'Idaho', 'Canada'], nearbyCities: ['Tacoma', 'Bellevue', 'Spokane'], population: '737K' },
  { city: 'Spokane', state: 'Washington', stateAbbr: 'WA', region: 'Eastern Washington', nearbyStates: ['Idaho', 'Montana', 'Oregon'], nearbyCities: ['Seattle', 'Coeur d\'Alene', 'Pullman'], population: '228K' },
  { city: 'Tacoma', state: 'Washington', stateAbbr: 'WA', region: 'Puget Sound', nearbyStates: ['Oregon', 'Idaho'], nearbyCities: ['Seattle', 'Bellevue', 'Olympia'], population: '219K' },
  { city: 'Vancouver', state: 'Washington', stateAbbr: 'WA', region: 'Southwest Washington', nearbyStates: ['Oregon', 'Idaho'], nearbyCities: ['Portland', 'Seattle', 'Salem'], population: '190K' },
  { city: 'Bellevue', state: 'Washington', stateAbbr: 'WA', region: 'Puget Sound', nearbyStates: ['Oregon', 'Idaho'], nearbyCities: ['Seattle', 'Tacoma', 'Redmond'], population: '151K' },
  { city: 'Kent', state: 'Washington', stateAbbr: 'WA', region: 'Puget Sound', nearbyStates: ['Oregon', 'Idaho'], nearbyCities: ['Seattle', 'Tacoma', 'Renton'], population: '136K' },

  // NEVADA - 4 cities
  { city: 'Las Vegas', state: 'Nevada', stateAbbr: 'NV', region: 'Southern Nevada', nearbyStates: ['California', 'Arizona', 'Utah'], nearbyCities: ['Henderson', 'North Las Vegas', 'Reno'], population: '641K' },
  { city: 'Henderson', state: 'Nevada', stateAbbr: 'NV', region: 'Southern Nevada', nearbyStates: ['California', 'Arizona', 'Utah'], nearbyCities: ['Las Vegas', 'North Las Vegas', 'Boulder City'], population: '317K' },
  { city: 'Reno', state: 'Nevada', stateAbbr: 'NV', region: 'Northern Nevada', nearbyStates: ['California', 'Oregon', 'Idaho'], nearbyCities: ['Sparks', 'Carson City', 'Lake Tahoe'], population: '264K' },
  { city: 'North Las Vegas', state: 'Nevada', stateAbbr: 'NV', region: 'Southern Nevada', nearbyStates: ['California', 'Arizona', 'Utah'], nearbyCities: ['Las Vegas', 'Henderson', 'Boulder City'], population: '262K' },

  // GEORGIA - 6 cities
  { city: 'Atlanta', state: 'Georgia', stateAbbr: 'GA', region: 'Metro Atlanta', nearbyStates: ['Alabama', 'Tennessee', 'South Carolina', 'Florida'], nearbyCities: ['Sandy Springs', 'Marietta', 'Roswell'], population: '498K' },
  { city: 'Augusta', state: 'Georgia', stateAbbr: 'GA', region: 'Central Savannah River', nearbyStates: ['South Carolina', 'Florida'], nearbyCities: ['Atlanta', 'Savannah', 'Columbia'], population: '202K' },
  { city: 'Columbus', state: 'Georgia', stateAbbr: 'GA', region: 'West Georgia', nearbyStates: ['Alabama', 'Florida'], nearbyCities: ['Atlanta', 'Macon', 'Montgomery'], population: '206K' },
  { city: 'Savannah', state: 'Georgia', stateAbbr: 'GA', region: 'Coastal Georgia', nearbyStates: ['South Carolina', 'Florida'], nearbyCities: ['Charleston', 'Jacksonville', 'Augusta'], population: '147K' },
  { city: 'Athens', state: 'Georgia', stateAbbr: 'GA', region: 'Northeast Georgia', nearbyStates: ['South Carolina', 'Tennessee'], nearbyCities: ['Atlanta', 'Gainesville', 'Augusta'], population: '127K' },
  { city: 'Macon', state: 'Georgia', stateAbbr: 'GA', region: 'Central Georgia', nearbyStates: ['Alabama', 'Florida', 'South Carolina'], nearbyCities: ['Atlanta', 'Columbus', 'Savannah'], population: '157K' },

  // NORTH CAROLINA - 6 cities
  { city: 'Charlotte', state: 'North Carolina', stateAbbr: 'NC', region: 'Piedmont', nearbyStates: ['South Carolina', 'Virginia', 'Tennessee'], nearbyCities: ['Raleigh', 'Greensboro', 'Durham'], population: '874K' },
  { city: 'Raleigh', state: 'North Carolina', stateAbbr: 'NC', region: 'Research Triangle', nearbyStates: ['Virginia', 'South Carolina'], nearbyCities: ['Durham', 'Charlotte', 'Greensboro'], population: '467K' },
  { city: 'Greensboro', state: 'North Carolina', stateAbbr: 'NC', region: 'Piedmont Triad', nearbyStates: ['Virginia', 'South Carolina'], nearbyCities: ['Charlotte', 'Raleigh', 'Winston-Salem'], population: '296K' },
  { city: 'Durham', state: 'North Carolina', stateAbbr: 'NC', region: 'Research Triangle', nearbyStates: ['Virginia', 'South Carolina'], nearbyCities: ['Raleigh', 'Chapel Hill', 'Greensboro'], population: '283K' },
  { city: 'Winston-Salem', state: 'North Carolina', stateAbbr: 'NC', region: 'Piedmont Triad', nearbyStates: ['Virginia', 'South Carolina'], nearbyCities: ['Greensboro', 'Charlotte', 'High Point'], population: '249K' },
  { city: 'Fayetteville', state: 'North Carolina', stateAbbr: 'NC', region: 'Sandhills', nearbyStates: ['South Carolina', 'Virginia'], nearbyCities: ['Raleigh', 'Wilmington', 'Charlotte'], population: '208K' },

  // MICHIGAN - 6 cities
  { city: 'Detroit', state: 'Michigan', stateAbbr: 'MI', region: 'Southeast Michigan', nearbyStates: ['Ohio', 'Indiana', 'Canada'], nearbyCities: ['Ann Arbor', 'Dearborn', 'Warren'], population: '639K' },
  { city: 'Grand Rapids', state: 'Michigan', stateAbbr: 'MI', region: 'West Michigan', nearbyStates: ['Indiana', 'Ohio', 'Wisconsin'], nearbyCities: ['Lansing', 'Kalamazoo', 'Detroit'], population: '198K' },
  { city: 'Warren', state: 'Michigan', stateAbbr: 'MI', region: 'Southeast Michigan', nearbyStates: ['Ohio', 'Indiana', 'Canada'], nearbyCities: ['Detroit', 'Sterling Heights', 'Troy'], population: '139K' },
  { city: 'Sterling Heights', state: 'Michigan', stateAbbr: 'MI', region: 'Southeast Michigan', nearbyStates: ['Ohio', 'Indiana', 'Canada'], nearbyCities: ['Detroit', 'Warren', 'Troy'], population: '134K' },
  { city: 'Ann Arbor', state: 'Michigan', stateAbbr: 'MI', region: 'Southeast Michigan', nearbyStates: ['Ohio', 'Indiana'], nearbyCities: ['Detroit', 'Ypsilanti', 'Livonia'], population: '123K' },
  { city: 'Lansing', state: 'Michigan', stateAbbr: 'MI', region: 'Mid-Michigan', nearbyStates: ['Indiana', 'Ohio'], nearbyCities: ['Grand Rapids', 'Detroit', 'East Lansing'], population: '118K' },

  // PENNSYLVANIA - 6 cities
  { city: 'Philadelphia', state: 'Pennsylvania', stateAbbr: 'PA', region: 'Delaware Valley', nearbyStates: ['New Jersey', 'Delaware', 'New York'], nearbyCities: ['Pittsburgh', 'Allentown', 'Reading'], population: '1.6M' },
  { city: 'Pittsburgh', state: 'Pennsylvania', stateAbbr: 'PA', region: 'Western Pennsylvania', nearbyStates: ['Ohio', 'West Virginia', 'New York'], nearbyCities: ['Philadelphia', 'Erie', 'Allentown'], population: '302K' },
  { city: 'Allentown', state: 'Pennsylvania', stateAbbr: 'PA', region: 'Lehigh Valley', nearbyStates: ['New Jersey', 'New York'], nearbyCities: ['Philadelphia', 'Reading', 'Bethlehem'], population: '125K' },
  { city: 'Reading', state: 'Pennsylvania', stateAbbr: 'PA', region: 'Berks County', nearbyStates: ['New Jersey', 'New York'], nearbyCities: ['Philadelphia', 'Allentown', 'Lancaster'], population: '95K' },
  { city: 'Erie', state: 'Pennsylvania', stateAbbr: 'PA', region: 'Northwest Pennsylvania', nearbyStates: ['New York', 'Ohio'], nearbyCities: ['Buffalo', 'Pittsburgh', 'Cleveland'], population: '94K' },
  { city: 'Scranton', state: 'Pennsylvania', stateAbbr: 'PA', region: 'Northeast Pennsylvania', nearbyStates: ['New York', 'New Jersey'], nearbyCities: ['Wilkes-Barre', 'Allentown', 'Binghamton'], population: '77K' },

  // OHIO - 4 cities
  { city: 'Columbus', state: 'Ohio', stateAbbr: 'OH', region: 'Central Ohio', nearbyStates: ['Indiana', 'Michigan', 'Pennsylvania', 'West Virginia'], nearbyCities: ['Cleveland', 'Cincinnati', 'Toledo'], population: '905K' },
  { city: 'Cleveland', state: 'Ohio', stateAbbr: 'OH', region: 'Northeast Ohio', nearbyStates: ['Pennsylvania', 'Michigan'], nearbyCities: ['Akron', 'Toledo', 'Columbus'], population: '372K' },
  { city: 'Cincinnati', state: 'Ohio', stateAbbr: 'OH', region: 'Greater Cincinnati', nearbyStates: ['Indiana', 'Kentucky'], nearbyCities: ['Columbus', 'Dayton', 'Louisville'], population: '309K' },
  { city: 'Toledo', state: 'Ohio', stateAbbr: 'OH', region: 'Northwest Ohio', nearbyStates: ['Michigan', 'Indiana'], nearbyCities: ['Detroit', 'Cleveland', 'Columbus'], population: '270K' },
];

// Prompt template for city landing pages
const CITY_PAGE_PROMPT = (data: CityData) => `
You are an expert SEO content writer for Lonestar Tortillas, a Texas-based company that ships authentic H-E-B tortillas nationwide (except within Texas).

Write a comprehensive 2000+ word landing page for customers in ${data.city}, ${data.state}. The page should:

1. TARGET KEYWORDS:
- "tortillas ${data.city}"
- "Texas tortillas ${data.stateAbbr}"
- "H-E-B tortillas ${data.state}"
- "authentic tortillas delivery ${data.city}"
- "Mexican food ${data.city}"

2. PAGE STRUCTURE (use these exact H2/H3 headers):

## Authentic Texas Tortillas Delivered to ${data.city}
[150 word intro about getting real Texas tortillas delivered to ${data.city}]

## Why ${data.city} Residents Choose Texas Tortillas
[400 words about authenticity, quality, H-E-B heritage, what makes Texas tortillas special]

## Our Products
### Fresh Corn Tortillas
[100 words]
### Premium Flour Tortillas
[100 words]
### Butter Tortillas
[100 words]

## Shipping to ${data.city}, ${data.state}
[200 words about shipping times, costs, delivery areas in ${data.region}]

## ${data.city}'s Mexican Food Scene
[400 words about local Mexican restaurants, home cooking culture, how our tortillas elevate the experience. Reference specific neighborhoods or food traditions if known]

## Perfect Pairings: Recipes for ${data.city} Home Cooks
[300 words suggesting 4-5 recipes that work well - breakfast tacos, brisket tacos, quesadillas, etc.]

## Frequently Asked Questions
[5-6 FAQs with answers, 300 words total]
- How long does shipping take to ${data.city}?
- How should I store my tortillas?
- Are your tortillas gluten-free?
- What's the minimum order?
- Do you ship to other cities in ${data.state}?

## Order Authentic Texas Tortillas Today
[100 word closing CTA encouraging them to shop]

3. IMPORTANT REQUIREMENTS:
- Write in a warm, friendly Texas voice
- Include "Shop Now" call-to-action references
- Mention related cities: ${data.nearbyCities.join(', ')}
- Reference that we ship throughout ${data.state} and nearby states: ${data.nearbyStates.join(', ')}
- Include the mandatory disclaimer: "Independent reseller. Not affiliated with or endorsed by H-E-B."
- Do NOT use emojis
- Write for SEO but keep it natural and readable
- Include internal link suggestions like [Link to: /shop], [Link to: /guides/how-to-store-tortillas], etc.

4. OUTPUT FORMAT:
Return ONLY the content sections, not the code. I will handle the TypeScript/React wrapper.
Start with the h2 headers and content.
`;

// Function to call OpenRouter API with retries
async function generateContent(prompt: string, retries = MAX_RETRIES): Promise<string> {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY environment variable is required');
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://lonestartortillas.com',
          'X-Title': 'Lonestar Tortillas SEO Generator',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: 'system',
              content: 'You are an expert SEO content writer specializing in food and e-commerce. Write engaging, keyword-rich content that drives conversions while maintaining readability.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 8000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || '';

      // Remove <think> tags if present (DeepSeek reasoning)
      const cleanedContent = content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

      return cleanedContent;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt === retries) throw error;
      console.log(`Retrying in ${DELAY_BETWEEN_REQUESTS * 2}ms...`);
      await sleep(DELAY_BETWEEN_REQUESTS * 2);
    }
  }

  throw new Error('Failed after all retries');
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to create the page.tsx file from content
function generatePageFile(city: string, state: string, content: string, nearbyCities: string[]): string {
  const citySlug = city.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
  const stateSlug = state.toLowerCase().replace(/\s+/g, '-');
  const componentName = city.replace(/[^a-zA-Z]/g, '') + 'Page';

  // Extract FAQ items from content
  const faqSection = content.match(/## Frequently Asked Questions[\s\S]*?(?=##|$)/i);
  const faqItems: { question: string; answer: string }[] = [];

  if (faqSection) {
    const faqText = faqSection[0];
    const questions = faqText.match(/\*\*([^*]+\?)\*\*\s*\n([^\n*]+)/g) || [];
    questions.forEach(q => {
      const match = q.match(/\*\*([^*]+\?)\*\*\s*\n(.+)/);
      if (match) {
        faqItems.push({
          question: match[1].trim(),
          answer: match[2].trim().substring(0, 400)
        });
      }
    });
  }

  // Generate nearby city links
  const nearbyCityLinks = nearbyCities.map(c => {
    const slug = c.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
    return `              <Link href="/locations/${stateSlug}/${slug}" className="px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-charcoal-700 hover:border-sunset-500 hover:text-sunset-600 transition-colors text-sm">
                ${c}
              </Link>`;
  }).join('\n');

  return `import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Authentic Texas Tortillas Delivered to ${city} | Lonestar Tortillas',
  description: 'Get authentic H-E-B Texas tortillas shipped directly to ${city}, ${state}. Fresh flour & corn tortillas for tacos, burritos & more. FREE Freshness First Shipping, premium quality.',
  keywords: 'tortillas ${city}, Texas tortillas ${state}, H-E-B tortillas delivery, authentic Mexican tortillas ${city}, fresh tortillas shipped',
  alternates: {
    canonical: 'https://lonestartortillas.com/locations/${stateSlug}/${citySlug}',
  },
  openGraph: {
    title: 'Texas Tortillas Delivered to ${city} | Lonestar Tortillas',
    description: 'Authentic H-E-B tortillas shipped fresh to ${city}. Experience the taste of Texas.',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
${faqItems.map(f => `    {
      '@type': 'Question',
      name: '${f.question.replace(/'/g, "\\'")}',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '${f.answer.replace(/'/g, "\\'")}',
      },
    }`).join(',\n')}
  ],
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Lonestar Tortillas - ${city} Delivery',
  description: 'Authentic Texas tortillas delivered to ${city}, ${state}',
  areaServed: {
    '@type': 'City',
    name: '${city}',
    containedInPlace: {
      '@type': 'State',
      name: '${state}',
    },
  },
  url: 'https://lonestartortillas.com/locations/${stateSlug}/${citySlug}',
  telephone: '+1-512-TORTILLA',
  priceRange: '$$',
}

export default function ${componentName}() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        {/* Header */}
        <header className="bg-charcoal-950 text-cream-50 py-12">
          <div className="container mx-auto px-6 max-w-6xl">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Locations', href: '/locations' },
                { label: '${state}', href: '/locations/${stateSlug}' },
                { label: '${city}' },
              ]}
              className="mb-6 text-cream-300"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Authentic Texas Tortillas Delivered to ${city}
            </h1>
            <p className="text-xl text-cream-200 max-w-3xl">
              Get fresh H-E-B tortillas shipped directly to your door in ${city}, ${state}. Experience the authentic taste of Texas.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </header>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/generated/hero-tortillas.webp"
              alt="Fresh authentic Texas tortillas"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        <article className="container mx-auto px-6 py-12 max-w-4xl prose prose-lg">
          {/* Main content will be rendered from MDX or inserted here */}

          {/* Products Section */}
          <section className="my-12 not-prose">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Our Products</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/products/corn-tortillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Fresh Corn Tortillas</h3>
                <p className="text-charcoal-700 text-sm mb-4">Authentic masa flavor, gluten-free, perfect for tacos and enchiladas.</p>
                <span className="text-sunset-600 font-semibold">Shop Corn Tortillas &rarr;</span>
              </Link>
              <Link href="/products/flour-tortillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Premium Flour Tortillas</h3>
                <p className="text-charcoal-700 text-sm mb-4">Soft and pliable, ideal for burritos, wraps, and quesadillas.</p>
                <span className="text-sunset-600 font-semibold">Shop Flour Tortillas &rarr;</span>
              </Link>
              <Link href="/products/butter-tortillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Butter Tortillas</h3>
                <p className="text-charcoal-700 text-sm mb-4">Rich, buttery flavor that elevates any dish. A Texas favorite.</p>
                <span className="text-sunset-600 font-semibold">Shop Butter Tortillas &rarr;</span>
              </Link>
            </div>
          </section>

          {/* Disclaimer */}
          <p className="text-sm text-charcoal-500 italic mt-8 not-prose">
            Independent reseller. Not affiliated with or endorsed by H-E-B.
          </p>

          {/* Final CTA */}
          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg mt-12 text-center not-prose">
            <h2 className="text-2xl font-bold mb-4">Ready to Taste Texas?</h2>
            <p className="text-lg mb-6 text-cream-200">
              Order authentic H-E-B tortillas delivered fresh to ${city}.
            </p>
            <Link
              href="/shop"
              className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors inline-block"
            >
              Shop All Tortillas
            </Link>
          </section>

          {/* Related Cities */}
          <section className="mt-12 not-prose">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">We Also Deliver To</h2>
            <div className="flex flex-wrap gap-3">
${nearbyCityLinks}
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
`;
}

// Generate state hub page
function generateStatePageFile(state: string, cities: CityData[]): string {
  const stateSlug = state.toLowerCase().replace(/\s+/g, '-');
  const componentName = state.replace(/[^a-zA-Z]/g, '') + 'Page';
  const stateAbbr = cities[0]?.stateAbbr || state.substring(0, 2).toUpperCase();

  // Group cities by region
  const regions = [...new Set(cities.map(c => c.region))];

  const cityCards = cities.map(city => {
    const citySlug = city.city.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
    return `            <Link
              key="${citySlug}"
              href="/locations/${stateSlug}/${citySlug}"
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-charcoal-100 group"
            >
              <h4 className="font-bold text-charcoal-950 group-hover:text-sunset-600">
                ${city.city} &rarr;
              </h4>
              <p className="text-sm text-charcoal-600">${city.population || 'Major city'}</p>
            </Link>`;
  }).join('\n');

  return `import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Texas Tortillas Delivered to ${state} | Lonestar Tortillas',
  description: 'Get authentic H-E-B Texas tortillas shipped to ${state}. We deliver to ${cities.slice(0, 4).map(c => c.city).join(', ')}, and all ${stateAbbr} cities. Fast 2-3 day shipping.',
  keywords: 'tortillas ${state}, Texas tortillas ${stateAbbr}, H-E-B tortillas delivery ${state}, authentic tortillas ${cities[0]?.city}',
  alternates: {
    canonical: 'https://lonestartortillas.com/locations/${stateSlug}',
  },
}

const cities = [
${cities.map(c => `  { name: '${c.city}', slug: '${c.city.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}', population: '${c.population || 'N/A'}', region: '${c.region}' }`).join(',\n')}
]

export default function ${componentName}() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
      {/* Header */}
      <header className="bg-charcoal-950 text-cream-50 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Locations', href: '/locations' },
              { label: '${state}' },
            ]}
            className="mb-6 text-cream-300"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Texas Tortillas Delivered to ${state}
          </h1>
          <p className="text-xl text-cream-200 max-w-3xl">
            Authentic H-E-B tortillas shipped fresh to all ${state} cities. From ${cities[0]?.city} to ${cities[cities.length - 1]?.city}, we've got ${stateAbbr} covered.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Shipping Info */}
        <section className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg mb-12">
          <h2 className="text-xl font-bold text-charcoal-950 mb-2">${state} Shipping</h2>
          <p className="text-charcoal-700">
            <strong>Freshness First Shipping:</strong> FREE shipping to all ${state} addresses. We ship Mon-Wed; orders before 2 PM CT ship same day. Arrives in 2-3 business days.
          </p>
        </section>

        {/* Cities Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-charcoal-950 mb-8">${state} Delivery Cities</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
${cityCards}
          </div>
        </section>

        {/* Why Texas Tortillas */}
        <section className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-4">Why ${state} Loves Texas Tortillas</h2>
          <p className="text-charcoal-700 mb-4">
            ${state} has great food, but there's something special about authentic Texas-style tortillas. H-E-B has been making tortillas in Texas since 1905, perfecting recipes that balance tenderness with just the right amount of chew.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-sunset-600">2-3</div>
              <div className="text-sm text-charcoal-600">Days to ${stateAbbr}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sunset-600">${cities.length}+</div>
              <div className="text-sm text-charcoal-600">${stateAbbr} Cities Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sunset-600">$12.99</div>
              <div className="text-sm text-charcoal-600">Flat Rate Shipping</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Taste Texas in ${state}?</h2>
          <p className="text-lg mb-6 text-cream-200">
            Order authentic H-E-B tortillas and experience the difference real Texas tortillas make.
          </p>
          <Link
            href="/shop"
            className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors inline-block"
          >
            Shop All Tortillas
          </Link>
        </section>

        {/* Disclaimer */}
        <p className="text-sm text-charcoal-500 italic mt-8 text-center">
          Independent reseller. Not affiliated with or endorsed by H-E-B.
        </p>
      </main>
    </div>
  )
}
`;
}

// Main batch generation function
async function batchGenerate(cities: CityData[], outputDir: string) {
  console.log(`\n========================================`);
  console.log(`Starting batch generation for ${cities.length} cities`);
  console.log(`Using model: ${MODEL}`);
  console.log(`Output directory: ${outputDir}`);
  console.log(`========================================\n`);

  const results: { city: string; state: string; success: boolean; error?: string }[] = [];
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const citySlug = city.city.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
    const stateSlug = city.state.toLowerCase().replace(/\s+/g, '-');

    console.log(`\n[${i + 1}/${cities.length}] Generating: ${city.city}, ${city.state}`);

    try {
      // Check if already generated
      const cityDir = path.join(outputDir, 'app', 'locations', stateSlug, citySlug);
      const pagePath = path.join(cityDir, 'page.tsx');

      if (fs.existsSync(pagePath)) {
        console.log(`  -> Skipping (already exists)`);
        results.push({ city: city.city, state: city.state, success: true });
        successCount++;
        continue;
      }

      // Generate content
      const prompt = CITY_PAGE_PROMPT(city);
      console.log(`  -> Calling OpenRouter API...`);
      const content = await generateContent(prompt);
      console.log(`  -> Generated ${content.length} characters`);

      // Create directories
      if (!fs.existsSync(cityDir)) {
        fs.mkdirSync(cityDir, { recursive: true });
      }

      // Save raw content
      const contentPath = path.join(cityDir, 'content.md');
      fs.writeFileSync(contentPath, content);

      // Generate and save page file
      const pageContent = generatePageFile(city.city, city.state, content, city.nearbyCities);
      fs.writeFileSync(pagePath, pageContent);

      console.log(`  -> Saved to ${cityDir}`);
      results.push({ city: city.city, state: city.state, success: true });
      successCount++;

      // Rate limiting
      if (i < cities.length - 1) {
        console.log(`  -> Waiting ${DELAY_BETWEEN_REQUESTS}ms before next request...`);
        await sleep(DELAY_BETWEEN_REQUESTS);
      }
    } catch (error) {
      console.error(`  -> ERROR: ${error}`);
      results.push({ city: city.city, state: city.state, success: false, error: String(error) });
      failCount++;

      // Longer wait after error
      await sleep(DELAY_BETWEEN_REQUESTS * 3);
    }
  }

  // Generate state hub pages
  console.log(`\n========================================`);
  console.log(`Generating state hub pages...`);
  console.log(`========================================\n`);

  const states = [...new Set(cities.map(c => c.state))];
  for (const state of states) {
    const stateCities = cities.filter(c => c.state === state);
    const stateSlug = state.toLowerCase().replace(/\s+/g, '-');
    const stateDir = path.join(outputDir, 'app', 'locations', stateSlug);
    const statePagePath = path.join(stateDir, 'page.tsx');

    if (!fs.existsSync(statePagePath)) {
      console.log(`Creating state page: ${state}`);
      if (!fs.existsSync(stateDir)) {
        fs.mkdirSync(stateDir, { recursive: true });
      }
      const statePageContent = generateStatePageFile(state, stateCities);
      fs.writeFileSync(statePagePath, statePageContent);
    }
  }

  // Summary
  console.log(`\n========================================`);
  console.log(`BATCH GENERATION COMPLETE`);
  console.log(`========================================`);
  console.log(`Total: ${cities.length}`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);

  if (failCount > 0) {
    console.log(`\nFailed cities:`);
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.city}, ${r.state}: ${r.error}`);
    });
  }

  // Write results log
  const logPath = path.join(outputDir, 'generation-log.json');
  fs.writeFileSync(logPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    total: cities.length,
    success: successCount,
    failed: failCount,
    results
  }, null, 2));
  console.log(`\nResults log saved to: ${logPath}`);
}

// Parse command line arguments
function parseArgs(): { state?: string; batch?: number } {
  const args = process.argv.slice(2);
  const result: { state?: string; batch?: number } = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--state' && args[i + 1]) {
      result.state = args[i + 1];
    }
    if (args[i] === '--batch' && args[i + 1]) {
      result.batch = parseInt(args[i + 1], 10);
    }
  }

  return result;
}

// Main execution
async function main() {
  if (!OPENROUTER_API_KEY) {
    console.error('ERROR: OPENROUTER_API_KEY environment variable is required');
    console.log('\nUsage:');
    console.log('  OPENROUTER_API_KEY=your_key npx ts-node scripts/batch-generate-cities.ts');
    console.log('  OPENROUTER_API_KEY=your_key npx ts-node scripts/batch-generate-cities.ts --state California');
    console.log('  OPENROUTER_API_KEY=your_key npx ts-node scripts/batch-generate-cities.ts --batch 1');
    process.exit(1);
  }

  const { state, batch } = parseArgs();
  const projectDir = path.join(__dirname, '..');

  let citiesToGenerate = ALL_CITIES;

  // Filter by state if specified
  if (state) {
    citiesToGenerate = ALL_CITIES.filter(c =>
      c.state.toLowerCase() === state.toLowerCase()
    );
    if (citiesToGenerate.length === 0) {
      console.error(`No cities found for state: ${state}`);
      console.log('\nAvailable states:');
      const states = [...new Set(ALL_CITIES.map(c => c.state))];
      states.forEach(s => console.log(`  - ${s}`));
      process.exit(1);
    }
    console.log(`Filtering to ${state}: ${citiesToGenerate.length} cities`);
  }

  // Filter by batch if specified (20 cities per batch)
  if (batch !== undefined) {
    const batchSize = 20;
    const start = (batch - 1) * batchSize;
    const end = start + batchSize;
    citiesToGenerate = citiesToGenerate.slice(start, end);
    console.log(`Batch ${batch}: cities ${start + 1} to ${Math.min(end, ALL_CITIES.length)}`);
  }

  await batchGenerate(citiesToGenerate, projectDir);
}

main().catch(console.error);
