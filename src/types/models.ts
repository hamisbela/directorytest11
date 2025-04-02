// Data models for the application

export interface State {
  id: string;
  state: string;
  slug: string;
  city_ids?: string[];
  salon_ids?: string[];
}

export interface City {
  id: string;
  city: string;
  slug: string;
  state_id: string;
  state_name?: string;
  salon_ids?: string[];
}

export interface Category {
  id: string;
  category: string;
  slug: string;
  salon_ids?: string[];
}

export interface BeautySalon {
  id: string;
  title: string;
  slug: string;
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
  category_ids?: string[];
  detail_keys?: string[];
  detail_values?: string[];
  amenity_ids?: string[];
  payment_ids?: string[];
  images?: string[];
}