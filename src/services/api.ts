import { BeautySalon, Category, City, State } from '../types/models';

// This module centralizes all API calls

async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      const text = await response.text();
      console.error(`Response not OK for ${endpoint}:`, response.status, text.substring(0, 100));
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  salons: {
    getAll: () => fetchData<BeautySalon[]>('/data/salons.json'),
    getFeatured: async (): Promise<BeautySalon[]> => {
      const salons = await fetchData<BeautySalon[]>('/data/salons.json');
      // Return 6 random salons for the featured section
      return [...salons].sort(() => 0.5 - Math.random()).slice(0, 6);
    }
  },
  
  categories: {
    getAll: () => fetchData<Category[]>('/data/categories.json')
  },
  
  states: {
    getAll: () => fetchData<State[]>('/data/states.json')
  },
  
  cities: {
    getAll: () => fetchData<City[]>('/data/cities.json'),
    getFeatured: async (): Promise<City[]> => {
      const cities = await fetchData<City[]>('/data/cities.json');
      // Filter out cities without salons
      const citiesWithSalons = cities.filter(city => city.salon_ids && city.salon_ids.length > 0);
      // Return top 6 cities with most salons
      return [...citiesWithSalons]
        .sort((a, b) => (b.salon_ids?.length || 0) - (a.salon_ids?.length || 0))
        .slice(0, 6);
    }
  }
};