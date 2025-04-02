import React from 'react';
import { api } from '../services/api';
import { useDataFetching } from '../hooks/useDataFetching';
import { State, Category, BeautySalon, City } from '../types/models';
import SalonList from '../components/salons/SalonList';
import StateList from '../components/locations/StateList';
import CityList from '../components/locations/CityList';
import SearchBar from '../components/ui/SearchBar';
import Section from '../components/layout/Section';
import Card from '../components/ui/Card';
import Hero from '../components/ui/Hero';
import GradientButton from '../components/ui/GradientButton';
import FeatureCard from '../components/ui/FeatureCard';
import Animate from '../components/ui/Animate';
import { Zap, MapPin, Sparkles, Medal, Clock, Shield, Map, Search } from 'lucide-react';

const Home: React.FC = () => {
  // Fetch states
  const { data: states, loading: statesLoading, error: statesError } = 
    useDataFetching<State[]>(() => api.states.getAll());
  
  // Fetch categories
  const { data: categories, loading: categoriesLoading, error: categoriesError } = 
    useDataFetching<Category[]>(() => api.categories.getAll());
  
  // Fetch featured salons
  const { data: featuredSalons, loading: salonsLoading, error: salonsError } = 
    useDataFetching<BeautySalon[]>(() => api.salons.getFeatured());
    
  // Fetch featured cities
  const { data: featuredCities, loading: citiesLoading } = 
    useDataFetching<City[]>(() => api.cities.getFeatured());
  
  // Combine errors
  const error = statesError || categoriesError || salonsError;
  
  // Handle search submission
  const handleSearch = (state: string, category: string) => {
    if (state) {
      window.location.href = `/states/${state}/`;
    } else if (category) {
      window.location.href = `/categories/${category}/`;
    }
  };

  // Features for the features section
  const features = [
    {
      title: 'Permanent Results',
      description: 'Unlike temporary hair removal methods, electrolysis provides permanent results by destroying the hair growth center.',
      icon: Sparkles,
      iconClassName: 'text-purple-600'
    },
    {
      title: 'FDA Approved',
      description: 'Electrolysis is the only FDA-approved method for permanent hair removal, recognized for its safety and effectiveness.',
      icon: Medal,
      iconClassName: 'text-green-600'
    },
    {
      title: 'All Skin & Hair Types',
      description: 'Effective on all skin tones and hair colors, making it universally accessible regardless of your specific characteristics.',
      icon: Zap,
      iconClassName: 'text-indigo-600'
    },
    {
      title: 'Save Time & Money',
      description: 'Stop spending on temporary solutions. Electrolysis offers a one-time investment for lifelong freedom from unwanted hair.',
      icon: Clock,
      iconClassName: 'text-rose-600'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Find Electrolysis Hair Removal Near You"
        subtitle="Browse our directory of professional electrolysis providers for permanent hair removal solutions."
        image="https://images.unsplash.com/photo-1525489196064-0752fa4e16f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      >
        {/* Search Bar */}
        <SearchBar
          states={states || []}
          categories={categories || []}
          onSearch={handleSearch}
          className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm shadow-xl border border-gray-100"
        />
      </Hero>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 mx-auto max-w-5xl">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading data
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
                <p className="mt-2">Please run <code className="bg-red-100 px-1 py-0.5 rounded">npm run generate:html</code> to generate the required data files.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Featured Cities */}
      <Section 
        title="Popular Locations" 
        description="Discover top electrolysis providers in these popular cities"
        padding="lg"
      >
        <CityList 
          cities={featuredCities || []} 
          loading={citiesLoading} 
        />
      </Section>

      {/* Featured Salons */}
      <Section 
        title="Featured Providers" 
        description="Our hand-picked selection of top-rated electrolysis specialists"
        background="gray" 
        padding="lg"
      >
        <SalonList
          salons={featuredSalons || []}
          loading={salonsLoading}
          emptyMessage="We couldn't find any electrolysis providers in our directory."
        />
      </Section>

      {/* Browse by State */}
      <Section 
        title="Browse by State" 
        description="Find electrolysis providers anywhere in the United States"
        padding="lg"
      >
        <StateList states={states || []} loading={statesLoading} />
      </Section>

      {/* Benefits Section */}
      <Section 
        background="indigo" 
        padding="lg" 
        className="py-20"
      >
        <div className="text-center mb-12">
          <Animate type="fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The Benefits of Electrolysis
            </h2>
          </Animate>
          <Animate type="slideUp" delay={0.1}>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Discover why electrolysis is the gold standard for permanent hair removal
            </p>
          </Animate>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              iconClassName={feature.iconClassName}
              index={index}
              className="bg-white"
            />
          ))}
        </div>
      </Section>

      {/* About Electrolysis */}
      <Section title="Why Choose Electrolysis?" padding="lg">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Animate type="slideIn">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">The Only Permanent Solution</h3>
              <div className="prose max-w-none text-gray-600">
                <p>
                  Electrolysis is the only FDA-approved method for permanent hair removal. Unlike laser hair removal or other temporary solutions, electrolysis destroys the growth center of the hair with heat or chemical energy, preventing it from ever growing back.
                </p>
                
                <p className="mt-4">
                  When choosing an electrolysis provider, it's important to find someone with experience, the right technology, and high standards of cleanliness. Our directory helps you compare providers based on these factors and more.
                </p>
              </div>
              
              <ul className="mt-6 space-y-3">
                <li className="flex items-start">
                  <Shield className="h-6 w-6 text-green-500 mt-0.5 mr-2" />
                  <span>Safe for all skin types and hair colors</span>
                </li>
                <li className="flex items-start">
                  <Clock className="h-6 w-6 text-green-500 mt-0.5 mr-2" />
                  <span>Customized treatment plans for individual needs</span>
                </li>
                <li className="flex items-start">
                  <Map className="h-6 w-6 text-green-500 mt-0.5 mr-2" />
                  <span>Treats any area of the body with precision</span>
                </li>
              </ul>
              
              <div className="mt-8">
                <GradientButton 
                  href="/about/"
                  variant="primary"
                  size="lg"
                >
                  Learn More About Electrolysis
                </GradientButton>
              </div>
            </Animate>
          </div>
          
          <Animate type="fadeIn" delay={0.2}>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80" 
                alt="Electrolysis Treatment" 
                className="w-full h-full object-cover"
              />
            </div>
          </Animate>
        </div>
      </Section>
    </>
  );
};

export default Home;