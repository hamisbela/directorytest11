import fs from 'fs-extra';
import path from 'path';
import AdmZip from 'adm-zip';
import csvParser from 'csv-parser';
import { Readable } from 'stream';
import slugify from 'slugify';

interface BeautySalon {
  id: string;
  title: string;
  website?: string;
  telephone?: string;
  address?: string;
  postal_code?: string;
  latitude?: string;
  longitude?: string;
  email?: string;
  opening_hours?: string;
  description?: string;
  service_product?: string;
  reviews?: string;
  average_star?: string;
  city_id?: string;
  city_name?: string;
  state_id?: string;
  state_name?: string;
  category_ids?: string;
  detail_keys?: string;
  detail_values?: string;
  amenity_ids?: string;
  payment_ids?: string;
  images?: string;
}

interface City {
  id: string;
  city: string;
  state_id: string;
  state_name?: string;
  salon_count?: number;
}

interface State {
  id: string;
  state: string;
  city_count?: number;
  salon_count?: number;
}

interface Category {
  id: string;
  category: string;
  salon_count?: number;
}

async function readCsvFromZip(zipPath: string, csvFileName: string): Promise<any[]> {
  try {
    const zip = new AdmZip(zipPath);
    const zipEntry = zip.getEntry(csvFileName);
    
    if (!zipEntry) {
      throw new Error(`CSV file ${csvFileName} not found in zip archive.`);
    }
    
    return new Promise((resolve, reject) => {
      const csvData: any[] = [];
      Readable.from(zipEntry.getData())
        .pipe(csvParser())
        .on('data', (row) => csvData.push(row))
        .on('end', () => resolve(csvData))
        .on('error', (error) => reject(error));
    });
  } catch (error) {
    console.error(`Error reading ${csvFileName} from zip:`, error);
    throw error;
  }
}

function generateHTMLHeader(title: string, description: string, hasCoordinates = false): string {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${description}">
    <title>${title} - Electrolysis Directory</title>
    <link rel="icon" href="/favicon.ico">
    <link rel="stylesheet" href="/style.css">
    ${hasCoordinates ? `
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    ` : ''}
  </head>
  <body>
    <header>
      <div class="container">
        <nav>
          <a href="/" class="logo">Electrolysis Directory</a>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about/">About</a></li>
            <li><a href="/contact/">Contact</a></li>
            <li><a href="/add-listing/" class="cta">Add Listing</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <main>`;
}

function generateHTMLFooter(hasCoordinates = false, latitude = "", longitude = "", businessName = ""): string {
  return `
    </main>
    <footer>
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Electrolysis Directory</h3>
            <p>Find the best electrolysis providers in your area.</p>
          </div>
          <div class="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about/">About</a></li>
              <li><a href="/contact/">Contact</a></li>
              <li><a href="/add-listing/">Add Listing</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Contact</h3>
            <p>Email: info@electrolysisdirectory.com</p>
            <p>Phone: (555) 123-4567</p>
          </div>
        </div>
        <div class="copyright">
          <p>&copy; ${new Date().getFullYear()} Electrolysis Directory. All rights reserved.</p>
        </div>
      </div>
    </footer>
    ${hasCoordinates ? `
    <script>
      const map = L.map('map').setView([${latitude}, ${longitude}], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);
      L.marker([${latitude}, ${longitude}]).addTo(map)
        .bindPopup('<strong>${businessName.replace(/'/g, "\\'")}</strong>')
        .openPopup();
    </script>
    ` : ''}
  </body>
  </html>`;
}

async function generateHTML() {
  console.log('Starting HTML generation...');
  
  try {
    const zipPath = path.join(process.cwd(), 'data', 'data.zip');
    const outputDir = path.join(process.cwd(), 'public');
    const dataOutputDir = path.join(outputDir, 'data');
    
    // Create output directories
    await fs.ensureDir(outputDir);
    await fs.ensureDir(dataOutputDir);
    await fs.ensureDir(path.join(outputDir, 'companies'));
    await fs.ensureDir(path.join(outputDir, 'cities'));
    await fs.ensureDir(path.join(outputDir, 'states'));
    await fs.ensureDir(path.join(outputDir, 'categories'));
    await fs.ensureDir(path.join(outputDir, 'sitemap')); // Ensure sitemap directory exists
    
    // Read data from zip
    const beautySalons = await readCsvFromZip(zipPath, 'beauty_salon.csv') as BeautySalon[];
    const cities = await readCsvFromZip(zipPath, 'city.csv') as City[];
    const states = await readCsvFromZip(zipPath, 'state.csv') as State[];
    const categories = await readCsvFromZip(zipPath, 'category.csv') as Category[];
    
    console.log(`Read ${beautySalons.length} beauty salons, ${cities.length} cities, ${states.length} states, and ${categories.length} categories.`);
    
    // Create maps for easy lookups
    const citiesMap = new Map(cities.map(city => [city.id, city]));
    const statesMap = new Map(states.map(state => [state.id, state]));
    const categoriesMap = new Map(categories.map(category => [category.id, category]));
    
    // Add state names to cities
    cities.forEach(city => {
      if (city.state_id && statesMap.has(city.state_id)) {
        city.state_name = statesMap.get(city.state_id)!.state;
      }
    });
    
    // Add city and state IDs to salons if missing
    beautySalons.forEach(salon => {
      // If salon has address but no city or state, try to infer from address
      if (salon.address && !salon.city_id && !salon.state_id) {
        const addressParts = salon.address.split(',').map(part => part.trim());
        if (addressParts.length >= 3) {
          const cityName = addressParts[addressParts.length - 3];
          const stateName = addressParts[addressParts.length - 2];
          
          // Find city by name
          for (const [id, city] of citiesMap.entries()) {
            if (city.city.toLowerCase() === cityName.toLowerCase()) {
              salon.city_id = id;
              salon.city_name = city.city;
              break;
            }
          }
          
          // Find state by name
          for (const [id, state] of statesMap.entries()) {
            if (state.state.toLowerCase() === stateName.toLowerCase()) {
              salon.state_id = id;
              salon.state_name = state.state;
              break;
            }
          }
        }
      }
    });
    
    // Count salons per city, state, and category
    beautySalons.forEach(salon => {
      // Count for cities
      if (salon.city_id && citiesMap.has(salon.city_id)) {
        const city = citiesMap.get(salon.city_id)!;
        city.salon_count = (city.salon_count || 0) + 1;
      }
      
      // Count for states
      if (salon.state_id && statesMap.has(salon.state_id)) {
        const state = statesMap.get(salon.state_id)!;
        state.salon_count = (state.salon_count || 0) + 1;
      }
      
      // Count for categories
      if (salon.category_ids) {
        salon.category_ids.split(',').forEach(categoryId => {
          if (categoriesMap.has(categoryId)) {
            const category = categoriesMap.get(categoryId)!;
            category.salon_count = (category.salon_count || 0) + 1;
          }
        });
      }
    });
    
    // Count cities per state
    cities.forEach(city => {
      if (city.state_id && statesMap.has(city.state_id)) {
        const state = statesMap.get(city.state_id)!;
        state.city_count = (state.city_count || 0) + 1;
      }
    });
    
    // Process data for the frontend
    const processedSalons = beautySalons.map(salon => {
      // Create slug for URL
      const citySlug = salon.city_name ? slugify(salon.city_name, { lower: true }) : 'unknown-city';
      const stateSlug = salon.state_name ? slugify(salon.state_name, { lower: true }) : 'unknown-state';
      const slug = slugify(`${citySlug}-${stateSlug}-${salon.title}-${salon.id}`, { lower: true });
      
      return {
        id: salon.id,
        title: salon.title,
        slug,
        website: salon.website,
        telephone: salon.telephone,
        address: salon.address,
        postal_code: salon.postal_code,
        latitude: salon.latitude,
        longitude: salon.longitude,
        email: salon.email,
        opening_hours: salon.opening_hours,
        description: salon.description,
        service_product: salon.service_product,
        reviews: salon.reviews,
        average_star: salon.average_star,
        city_id: salon.city_id,
        city_name: salon.city_name,
        state_id: salon.state_id,
        state_name: salon.state_name,
        category_ids: salon.category_ids ? salon.category_ids.split(',') : [],
        detail_keys: salon.detail_keys ? salon.detail_keys.split(',') : [],
        detail_values: salon.detail_values ? salon.detail_values.split(',') : [],
        amenity_ids: salon.amenity_ids ? salon.amenity_ids.split(',') : [],
        payment_ids: salon.payment_ids ? salon.payment_ids.split(',') : [],
        images: salon.images ? salon.images.split(',') : []
      };
    });
    
    // For debugging - log the first few salons with their city and state IDs
    for (let i = 0; i < Math.min(5, processedSalons.length); i++) {
      const salon = processedSalons[i];
      console.log(`Salon ${i+1}: "${salon.title}" - City ID: ${salon.city_id}, State ID: ${salon.state_id}`);
    }
    
    const processedCities = cities.map(city => {
      // Create slug for URL
      const slug = slugify(`${city.city}-${city.state_id}`, { lower: true });
      
      // Find salons for this city
      const citySlug = slugify(city.city, { lower: true });
      const salonIdsForCity = processedSalons
        .filter(salon => {
          // Match by city_id if available
          if (salon.city_id && salon.city_id === city.id) {
            return true;
          }
          
          // Match by city_name as fallback (case insensitive comparison)
          if (salon.city_name && salon.city_name.toLowerCase() === city.city.toLowerCase()) {
            return true;
          }
          
          return false;
        })
        .map(salon => salon.id);
      
      return {
        id: city.id,
        city: city.city,
        slug,
        state_id: city.state_id,
        state_name: city.state_name,
        salon_ids: salonIdsForCity
      };
    });
    
    // For debugging - log cities with salon counts
    for (let i = 0; i < Math.min(5, processedCities.length); i++) {
      const city = processedCities[i];
      console.log(`City ${i+1}: "${city.city}" - Salon count: ${city.salon_ids.length}`);
    }
    
    const processedStates = states.map(state => {
      // Create slug for URL
      const slug = slugify(state.state, { lower: true });
      
      // Find city IDs for this state
      const cityIdsForState = processedCities
        .filter(city => city.state_id === state.id)
        .map(city => city.id);
      
      // Find salons for this state
      const salonIdsForState = processedSalons
        .filter(salon => {
          // Match by state_id if available
          if (salon.state_id && salon.state_id === state.id) {
            return true;
          }
          
          // Match by state_name as fallback (case insensitive comparison)
          if (salon.state_name && salon.state_name.toLowerCase() === state.state.toLowerCase()) {
            return true;
          }
          
          // Match by city_id being in a city that belongs to this state
          if (salon.city_id && cityIdsForState.includes(salon.city_id)) {
            return true;
          }
          
          return false;
        })
        .map(salon => salon.id);
      
      return {
        id: state.id,
        state: state.state,
        slug,
        city_ids: cityIdsForState,
        salon_ids: salonIdsForState
      };
    });
    
    // For debugging - log states with salon and city counts
    for (let i = 0; i < Math.min(5, processedStates.length); i++) {
      const state = processedStates[i];
      console.log(`State ${i+1}: "${state.state}" - Cities: ${state.city_ids.length}, Salons: ${state.salon_ids.length}`);
    }
    
    const processedCategories = categories.map(category => {
      // Create slug for URL
      const slug = slugify(category.category, { lower: true });
      
      return {
        id: category.id,
        category: category.category,
        slug,
        salon_ids: processedSalons
          .filter(salon => salon.category_ids.includes(category.id))
          .map(salon => salon.id)
      };
    });
    
    // Save processed data as JSON for frontend use
    await fs.writeJson(path.join(dataOutputDir, 'salons.json'), processedSalons);
    await fs.writeJson(path.join(dataOutputDir, 'cities.json'), processedCities);
    await fs.writeJson(path.join(dataOutputDir, 'states.json'), processedStates);
    await fs.writeJson(path.join(dataOutputDir, 'categories.json'), processedCategories);
    
    console.log('Generated JSON data files.');

    // Generate HTML for beauty salon pages
    let generatedCompanyPages = 0;
    for (const salon of processedSalons) {
      // Check if we have valid coordinates for a map
      const hasCoordinates = salon.latitude && salon.longitude && 
                            !isNaN(parseFloat(salon.latitude)) && 
                            !isNaN(parseFloat(salon.longitude));
        
      // Generate company page HTML
      let html = generateHTMLHeader(
        salon.title, 
        salon.description || `Professional electrolysis services at ${salon.title}`,
        hasCoordinates
      );
      
      html += `
        <div class="container">
          <div class="business-header">
            <h1>${salon.title}</h1>
            <div class="business-address">
              ${salon.address ? `<p>${salon.address}, ${salon.city_name || ''}, ${salon.state_name || ''} ${salon.postal_code || ''}</p>` : ''}
              ${salon.telephone ? `<p><strong>Phone:</strong> <a href="tel:${salon.telephone}">${salon.telephone}</a></p>` : ''}
              ${salon.website ? `<p><strong>Website:</strong> <a href="${salon.website}" target="_blank" rel="noopener">${salon.website}</a></p>` : ''}
            </div>
          </div>
          
          <div class="business-details">
            <div class="business-main">
              <div class="business-description">
                <h2>About ${salon.title}</h2>
                <p>${salon.description || 'Professional electrolysis services for permanent hair removal.'}</p>
              </div>
              
              ${salon.service_product ? `
              <div class="business-services">
                <h2>Services</h2>
                <p>${salon.service_product}</p>
              </div>
              ` : ''}
              
              ${hasCoordinates ? `
              <div class="business-map">
                <h2>Location</h2>
                <div id="map" style="height: 300px;"></div>
              </div>
              ` : ''}
            </div>
            
            <div class="business-sidebar">
              ${salon.opening_hours ? `
              <div class="business-hours">
                <h3>Opening Hours</h3>
                <p>${salon.opening_hours}</p>
              </div>
              ` : ''}
              
              ${salon.average_star ? `
              <div class="business-rating">
                <h3>Rating</h3>
                <p>${salon.average_star} / 5 (${salon.reviews || '0'} reviews)</p>
              </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;
      
      html += generateHTMLFooter(
        hasCoordinates, 
        salon.latitude, 
        salon.longitude, 
        salon.title
      );
      
      // Create directory structure and save file
      const salonDir = path.join(outputDir, 'companies', salon.slug);
      await fs.ensureDir(salonDir);
      await fs.writeFile(path.join(salonDir, 'index.html'), html);
      
      generatedCompanyPages++;
      if (generatedCompanyPages % 100 === 0) {
        console.log(`Generated ${generatedCompanyPages} company pages...`);
      }
    }
    
    console.log(`Generated ${generatedCompanyPages} company pages.`);
    
    // Generate HTML for city pages
    let generatedCityPages = 0;
    for (const city of processedCities) {
      // Get salons for this city
      const citySalons = processedSalons.filter(salon => {
        return salon.city_id === city.id || 
              (salon.city_name && salon.city_name.toLowerCase() === city.city.toLowerCase());
      });
      
      // Generate city page HTML
      let html = generateHTMLHeader(
        `${city.city}, ${city.state_name || ''}`,
        `Find electrolysis and permanent hair removal services in ${city.city}, ${city.state_name || ''}.`
      );
      
      html += `
        <div class="container">
          <div class="location-header">
            <h1>Electrolysis in ${city.city}, ${city.state_name || ''}</h1>
            <p>Find professional electrolysis providers in ${city.city}. Browse our directory of permanent hair removal specialists.</p>
          </div>
          
          <div class="location-content">
            <div class="location-providers">
              <h2>${citySalons.length} Electrolysis Providers in ${city.city}</h2>
              
              ${citySalons.length > 0 ? `
              <div class="provider-list">
                ${citySalons.map(salon => `
                <div class="provider-card">
                  <h3><a href="/companies/${salon.slug}/">${salon.title}</a></h3>
                  <p>${salon.address || ''}</p>
                  ${salon.telephone ? `<p><strong>Phone:</strong> <a href="tel:${salon.telephone}">${salon.telephone}</a></p>` : ''}
                  <p>${salon.description ? salon.description.substring(0, 150) + (salon.description.length > 150 ? '...' : '') : 'Professional electrolysis services for permanent hair removal.'}</p>
                  <a href="/companies/${salon.slug}/" class="view-details">View Details</a>
                </div>
                `).join('')}
              </div>
              ` : `
              <div class="no-providers">
                <p>We currently don't have any electrolysis providers listed in ${city.city}. Are you a provider in this area? <a href="/add-listing/">Add your business</a> to our directory.</p>
              </div>
              `}
            </div>
            
            <div class="location-sidebar">
              <div class="sidebar-section">
                <h3>About ${city.city}</h3>
                <p>${city.city} is located in ${city.state_name || ''}. Browse our directory to find electrolysis providers in this area.</p>
              </div>
              
              <div class="sidebar-section">
                <h3>Nearby Cities</h3>
                <ul>
                  ${processedCities
                    .filter(c => c.state_id === city.state_id && c.id !== city.id)
                    .slice(0, 5)
                    .map(c => `<li><a href="/cities/${c.slug}/">${c.city}</a></li>`)
                    .join('')}
                </ul>
              </div>
            </div>
          </div>
        </div>
      `;
      
      html += generateHTMLFooter();
      
      // Create directory structure and save file
      const cityDir = path.join(outputDir, 'cities', city.slug);
      await fs.ensureDir(cityDir);
      await fs.writeFile(path.join(cityDir, 'index.html'), html);
      
      generatedCityPages++;
      if (generatedCityPages % 100 === 0) {
        console.log(`Generated ${generatedCityPages} city pages...`);
      }
    }
    
    console.log(`Generated ${generatedCityPages} city pages.`);
    
    // Generate HTML for state pages
    let generatedStatePages = 0;
    for (const state of processedStates) {
      // Get cities for this state
      const stateCities = processedCities.filter(city => city.state_id === state.id);
      
      // Get salons for this state
      const stateSalons = processedSalons.filter(salon => {
        return salon.state_id === state.id || 
              (salon.state_name && salon.state_name.toLowerCase() === state.state.toLowerCase()) ||
              (salon.city_id && stateCities.some(city => city.id === salon.city_id));
      });
      
      // Generate state page HTML
      let html = generateHTMLHeader(
        `${state.state}`,
        `Find electrolysis and permanent hair removal services in ${state.state}.`
      );
      
      html += `
        <div class="container">
          <div class="location-header">
            <h1>Electrolysis in ${state.state}</h1>
            <p>Find professional electrolysis providers in ${state.state}. Browse our directory of ${stateSalons.length} permanent hair removal specialists across ${stateCities.length} cities.</p>
          </div>
          
          <div class="location-content">
            <div class="state-cities">
              <h2>Cities in ${state.state}</h2>
              
              <div class="city-grid">
                ${stateCities.map(city => {
                  // Count salons in this city
                  const citySlug = slugify(city.city, { lower: true });
                  const citySalonsCount = processedSalons.filter(salon => 
                    salon.city_id === city.id || 
                    (salon.city_name && salon.city_name.toLowerCase() === city.city.toLowerCase())
                  ).length;
                  
                  return `
                  <div class="city-card">
                    <h3><a href="/cities/${city.slug}/">${city.city}</a></h3>
                    <p>${citySalonsCount} providers</p>
                  </div>
                  `;
                }).join('')}
              </div>
            </div>
            
            <div class="featured-providers">
              <h2>Featured Providers in ${state.state}</h2>
              
              ${stateSalons.length > 0 ? `
              <div class="provider-list featured">
                ${stateSalons.slice(0, 5).map(salon => `
                <div class="provider-card featured">
                  <h3><a href="/companies/${salon.slug}/">${salon.title}</a></h3>
                  <p>${salon.city_name || ''}, ${state.state}</p>
                  ${salon.telephone ? `<p><strong>Phone:</strong> <a href="tel:${salon.telephone}">${salon.telephone}</a></p>` : ''}
                  <a href="/companies/${salon.slug}/" class="view-details">View Details</a>
                </div>
                `).join('')}
              </div>
              
              ${stateSalons.length > 5 ? `
              <div class="view-all">
                <p>Showing 5 of ${stateSalons.length} providers in ${state.state}.</p>
              </div>
              ` : ''}
              ` : `
              <div class="no-providers">
                <p>We currently don't have any electrolysis providers listed in ${state.state}. Are you a provider in this area? <a href="/add-listing/">Add your business</a> to our directory.</p>
              </div>
              `}
            </div>
            
            <div class="state-info">
              <h2>About Electrolysis in ${state.state}</h2>
              <p>Electrolysis is the only FDA-approved method for permanent hair removal. Our directory helps you find qualified electrolysis providers in ${state.state} who can help you achieve permanent freedom from unwanted hair.</p>
              <p>Choose from ${stateSalons.length} providers across ${stateCities.length} cities in ${state.state}.</p>
            </div>
          </div>
        </div>
      `;
      
      html += generateHTMLFooter();
      
      // Create directory structure and save file
      const stateDir = path.join(outputDir, 'states', state.slug);
      await fs.ensureDir(stateDir);
      await fs.writeFile(path.join(stateDir, 'index.html'), html);
      
      generatedStatePages++;
    }
    
    console.log(`Generated ${generatedStatePages} state pages.`);
    
    // Generate sitemap files
    generateSitemaps(processedSalons, processedCities, processedStates, processedCategories, outputDir);
    
    console.log('HTML generation completed successfully!');
  } catch (error) {
    console.error('Error generating HTML:', error);
    process.exit(1);
  }
}

function generateSitemaps(
  salons: any[], 
  cities: any[], 
  states: any[], 
  categories: any[],
  outputDir: string
) {
  // Logic for generating sitemaps would go here
  console.log('Generating sitemaps...');
  
  // Create company sitemaps (split if more than 200 entries)
  const baseUrl = 'https://electrolysisdirectory.com';
  const sitemapsDir = path.join(outputDir, 'sitemaps');
  fs.ensureDirSync(sitemapsDir);
  
  // Ensure the sitemap directory exists
  const sitemapDir = path.join(outputDir, 'sitemap');
  fs.ensureDirSync(sitemapDir);
  
  // Company sitemaps
  const companySitemaps: string[] = [];
  for (let i = 0; i < salons.length; i += 200) {
    const chunk = salons.slice(i, i + 200);
    const sitemapIndex = Math.floor(i / 200) + 1;
    
    let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    for (const salon of chunk) {
      sitemapXml += '  <url>\n';
      sitemapXml += `    <loc>${baseUrl}/companies/${salon.slug}/</loc>\n`;
      sitemapXml += '    <changefreq>monthly</changefreq>\n';
      sitemapXml += '    <priority>0.8</priority>\n';
      sitemapXml += '  </url>\n';
    }
    
    sitemapXml += '</urlset>';
    
    const filename = `companies-sitemap${sitemapIndex}.xml`;
    fs.writeFileSync(path.join(sitemapsDir, filename), sitemapXml);
    companySitemaps.push(filename);
  }
  
  // City sitemap
  let citySitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  citySitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  for (const city of cities) {
    citySitemapXml += '  <url>\n';
    citySitemapXml += `    <loc>${baseUrl}/cities/${city.slug}/</loc>\n`;
    citySitemapXml += '    <changefreq>weekly</changefreq>\n';
    citySitemapXml += '    <priority>0.7</priority>\n';
    citySitemapXml += '  </url>\n';
  }
  
  citySitemapXml += '</urlset>';
  fs.writeFileSync(path.join(sitemapsDir, 'cities-sitemap.xml'), citySitemapXml);
  
  // State sitemap
  let stateSitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  stateSitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  for (const state of states) {
    stateSitemapXml += '  <url>\n';
    stateSitemapXml += `    <loc>${baseUrl}/states/${state.slug}/</loc>\n`;
    stateSitemapXml += '    <changefreq>weekly</changefreq>\n';
    stateSitemapXml += '    <priority>0.7</priority>\n';
    stateSitemapXml += '  </url>\n';
  }
  
  stateSitemapXml += '</urlset>';
  fs.writeFileSync(path.join(sitemapsDir, 'states-sitemap.xml'), stateSitemapXml);
  
  // Sitemap index
  let sitemapIndexXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemapIndexXml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add company sitemaps
  for (const sitemap of companySitemaps) {
    sitemapIndexXml += '  <sitemap>\n';
    sitemapIndexXml += `    <loc>${baseUrl}/sitemaps/${sitemap}</loc>\n`;
    sitemapIndexXml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    sitemapIndexXml += '  </sitemap>\n';
  }
  
  // Add other sitemaps
  sitemapIndexXml += '  <sitemap>\n';
  sitemapIndexXml += `    <loc>${baseUrl}/sitemaps/cities-sitemap.xml</loc>\n`;
  sitemapIndexXml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
  sitemapIndexXml += '  </sitemap>\n';
  
  sitemapIndexXml += '  <sitemap>\n';
  sitemapIndexXml += `    <loc>${baseUrl}/sitemaps/states-sitemap.xml</loc>\n`;
  sitemapIndexXml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
  sitemapIndexXml += '  </sitemap>\n';
  
  sitemapIndexXml += '</sitemapindex>';
  fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemapIndexXml);
  
  // Create an HTML sitemap
  let htmlSitemap = generateHTMLHeader('Sitemap', 'Complete sitemap of electrolysis providers, cities, and states');
  htmlSitemap += `
    <div class="container">
      <h1>Sitemap</h1>
      
      <div class="sitemap-section">
        <h2>States</h2>
        <ul class="sitemap-list">
          ${states.map(state => `<li><a href="/states/${state.slug}/">${state.state}</a></li>`).join('\n          ')}
        </ul>
      </div>
      
      <div class="sitemap-section">
        <h2>Cities</h2>
        <ul class="sitemap-list">
          ${cities.slice(0, 100).map(city => `<li><a href="/cities/${city.slug}/">${city.city}, ${city.state_name}</a></li>`).join('\n          ')}
          ${cities.length > 100 ? `<li><a href="/sitemap/cities/">View all ${cities.length} cities</a></li>` : ''}
        </ul>
      </div>
      
      <div class="sitemap-section">
        <h2>Companies</h2>
        <p>Browse electrolysis providers by state or city, or view our <a href="/companies/">complete directory</a>.</p>
      </div>
    </div>
  `;
  htmlSitemap += generateHTMLFooter();
  
  fs.writeFileSync(path.join(sitemapDir, 'index.html'), htmlSitemap);
  
  console.log('Sitemaps generated successfully!');
}

// Run the generator
generateHTML();