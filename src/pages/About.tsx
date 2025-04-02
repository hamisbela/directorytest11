import React from 'react';
import { Zap, CheckCircle, Clock, Shield } from 'lucide-react';
import Section from '../components/layout/Section';
import Card from '../components/ui/Card';

const About: React.FC = () => {
  return (
    <Section padding="md">
      <div className="max-w-5xl mx-auto">
        <Card padding="lg">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">About Electrolysis Directory</h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Welcome to the premier online directory for electrolysis hair removal services. Our mission is to connect people seeking permanent hair removal solutions with qualified, professional electrologists across the United States.
          </p>
          
          <div className="border-t border-gray-200 pt-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At Electrolysis Directory, we believe everyone deserves access to high-quality permanent hair removal services. Our platform makes it easy to:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Zap className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Find Local Providers</h3>
                  <p className="mt-2 text-gray-600">
                    Easily locate electrolysis professionals in your area with our comprehensive directory organized by location.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Compare Services</h3>
                  <p className="mt-2 text-gray-600">
                    Browse detailed listings that include services offered, amenities, payment methods, and contact information.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Save Time</h3>
                  <p className="mt-2 text-gray-600">
                    Find exactly what you're looking for without spending hours searching across multiple websites.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Shield className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Make Informed Decisions</h3>
                  <p className="mt-2 text-gray-600">
                    Access comprehensive information about electrolysis services to make the best choice for your needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Understanding Electrolysis</h2>
            
            <p className="text-gray-600 mb-4">
              Electrolysis is the only FDA-approved method for permanent hair removal. This process works by using electric current to destroy the hair growth center, preventing future hair growth.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 my-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Benefits of Electrolysis</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Permanent results, unlike other temporary hair removal methods</li>
                <li>Effective on all hair types and colors</li>
                <li>Works on all skin types and tones</li>
                <li>Can target precise areas, from small facial areas to larger body zones</li>
                <li>Eliminates ingrown hairs and related skin issues</li>
                <li>Customizable treatment plans based on individual needs</li>
              </ul>
            </div>
            
            <p className="text-gray-600">
              Our directory includes practitioners who specialize in various electrolysis techniques, including galvanic, thermolysis, and blend methods, ensuring you can find the right specialist for your specific needs.
            </p>
          </div>
          
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">For Practitioners</h2>
            
            <p className="text-gray-600 mb-4">
              Are you an electrolysis professional looking to expand your client base? Our directory offers:
            </p>
            
            <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-6">
              <li>Enhanced visibility to potential clients searching for electrolysis services</li>
              <li>Detailed business profiles showcasing your services, amenities, and expertise</li>
              <li>Simple listing management process to keep your information current</li>
              <li>Increased online presence without the cost and complexity of managing your own website</li>
            </ul>
            
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">Ready to add your business to our directory?</p>
              <a href="/add-listing" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">
                Add Your Listing Today
              </a>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
};

export default About;