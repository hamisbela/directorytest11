import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import FormField from '../components/ui/FormField';
import Button from '../components/ui/Button';
import CheckboxField from '../components/ui/CheckboxField';
import Card from '../components/ui/Card';
import Section from '../components/layout/Section';

const AddListing: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would handle form submission here
    setFormSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (formSubmitted) {
    return (
      <div className="max-w-3xl mx-auto my-12 px-4">
        <Card padding="lg" className="bg-green-50 border border-green-200 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Listing Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for submitting your business listing. Our team will review your submission and publish it to our directory shortly.
          </p>
          <p className="text-gray-600 mb-8">
            You will receive a confirmation email with further details.
          </p>
          <a href="/">
            <Button variant="primary">Return to Homepage</Button>
          </a>
        </Card>
      </div>
    );
  }

  return (
    <Section padding="md">
      <div className="max-w-3xl mx-auto">
        <Card>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Your Business Listing</h1>
          
          <p className="text-gray-600 mb-8">
            Complete the form below to add your electrolysis business to our directory. 
            Increase your visibility and reach new clients looking for permanent hair removal services.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Business Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <FormField label="Business Name" htmlFor="businessName" required>
                <input 
                  type="text" 
                  id="businessName" 
                  name="businessName" 
                  required 
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </FormField>
              
              <FormField label="Owner/Manager Name" htmlFor="ownerName">
                <input 
                  type="text" 
                  id="ownerName" 
                  name="ownerName" 
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </FormField>
            </div>
            
            <FormField label="Street Address" htmlFor="address" required>
              <input 
                type="text" 
                id="address" 
                name="address" 
                required 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </FormField>
            
            <div className="grid md:grid-cols-3 gap-6">
              <FormField label="City" htmlFor="city" required>
                <input 
                  type="text" 
                  id="city" 
                  name="city" 
                  required 
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </FormField>
              
              <FormField label="State" htmlFor="state" required>
                <select 
                  id="state" 
                  name="state" 
                  required 
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Select State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </FormField>
              
              <FormField label="ZIP Code" htmlFor="zipCode" required>
                <input 
                  type="text" 
                  id="zipCode" 
                  name="zipCode" 
                  required 
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </FormField>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <FormField label="Phone Number" htmlFor="phone" required>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  required 
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </FormField>
              
              <FormField label="Email Address" htmlFor="email" required>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </FormField>
            </div>
            
            <FormField 
              label="Website" 
              htmlFor="website" 
              helpText="Include the full URL starting with http:// or https://"
            >
              <input 
                type="url" 
                id="website" 
                name="website" 
                placeholder="https://" 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </FormField>
            
            <FormField 
              label="Business Hours" 
              htmlFor="hours"
              helpText="e.g., Monday-Friday: 9am-5pm, Saturday: 10am-3pm, Sunday: Closed"
            >
              <textarea 
                id="hours" 
                name="hours"
                rows={3} 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              ></textarea>
            </FormField>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pt-4">Services & Details</h2>
            
            <FormField 
              label="Business Description" 
              htmlFor="description" 
              required
              helpText="Describe your business, services offered, and what makes you unique"
            >
              <textarea 
                id="description" 
                name="description" 
                required 
                rows={5}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              ></textarea>
            </FormField>
            
            <FormField 
              label="Services Offered" 
              htmlFor="services" 
              required
              helpText="List the electrolysis and related services you offer"
            >
              <textarea 
                id="services" 
                name="services" 
                required 
                rows={3}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              ></textarea>
            </FormField>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Categories</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                <CheckboxField id="categoryElectrolysis" label="Electrolysis" />
                <CheckboxField id="categoryBeautySalon" label="Beauty Salon" />
                <CheckboxField id="categoryDaySpa" label="Day Spa" />
                <CheckboxField id="categorySkinCare" label="Skin Care" />
                <CheckboxField id="categoryMedicalSpa" label="Medical Spa" />
                <CheckboxField id="categoryLaser" label="Laser Hair Removal" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Methods Accepted</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                <CheckboxField id="paymentCash" label="Cash" />
                <CheckboxField id="paymentCredit" label="Credit Card" />
                <CheckboxField id="paymentDebit" label="Debit Card" />
                <CheckboxField id="paymentCheck" label="Check" />
                <CheckboxField id="paymentVenmo" label="Venmo" />
                <CheckboxField id="paymentApplePay" label="Apple Pay" />
                <CheckboxField id="paymentGooglePay" label="Google Pay" />
                <CheckboxField id="paymentPaypal" label="PayPal" />
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pt-4">Photos</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Photos</label>
              <p className="text-sm text-gray-500 mb-3">Upload up to 5 high-quality photos of your business, including interior, exterior, and equipment.</p>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload files</span>
                      <input id="file-upload" name="file-upload" type="file" multiple className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pt-4">Contact Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <FormField label="Contact Name" htmlFor="contactName" required>
                <input 
                  type="text" 
                  id="contactName" 
                  name="contactName" 
                  required 
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </FormField>
              
              <FormField label="Contact Email" htmlFor="contactEmail" required>
                <input 
                  type="email" 
                  id="contactEmail" 
                  name="contactEmail" 
                  required 
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </FormField>
            </div>
            
            <FormField 
              label="Additional Information" 
              htmlFor="additionalInfo"
              helpText="Any additional information you'd like to share about your business"
            >
              <textarea 
                id="additionalInfo" 
                name="additionalInfo" 
                rows={3}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              ></textarea>
            </FormField>
            
            <CheckboxField 
              id="terms" 
              label="I agree to the Terms and Conditions" 
              description="By submitting this form, I agree to have my information listed in the directory and to be contacted regarding my listing."
              required
            />
            
            <div className="flex justify-end pt-6">
              <Button type="submit" variant="primary" size="lg">
                Submit Listing
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Section>
  );
};

export default AddListing;