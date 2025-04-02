import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone, CheckCircle } from 'lucide-react';
import Section from '../components/layout/Section';
import Card from '../components/ui/Card';
import FormField from '../components/ui/FormField';
import Button from '../components/ui/Button';
import CheckboxField from '../components/ui/CheckboxField';

const Contact: React.FC = () => {
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Message Sent Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for contacting us. We've received your message and will get back to you shortly.
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
      <div className="max-w-5xl mx-auto">
        <Card className="overflow-hidden p-0">
          <div className="md:flex">
            <div className="bg-indigo-700 text-white md:w-1/3 p-8">
              <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
              <p className="mb-8 text-indigo-100">
                Have questions about our directory or need assistance with your listing? We're here to help! Fill out the form or use our contact information below.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-3 text-indigo-300" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-indigo-100">1234 Electrolysis Way<br />Boston, MA 02110</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-3 text-indigo-300" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-indigo-100">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-3 text-indigo-300" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-indigo-100">info@electrolysisdirectory.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="font-medium mb-2">Office Hours</h3>
                <p className="text-indigo-100">Monday - Friday: 9AM - 5PM EST<br />Saturday - Sunday: Closed</p>
              </div>
            </div>
            
            <div className="md:w-2/3 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField label="First Name" htmlFor="firstName" required>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      required 
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </FormField>
                  
                  <FormField label="Last Name" htmlFor="lastName" required>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      required 
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </FormField>
                </div>
                
                <FormField label="Email Address" htmlFor="email" required>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </FormField>
                
                <FormField label="Phone Number" htmlFor="phone">
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </FormField>
                
                <FormField label="Subject" htmlFor="subject" required>
                  <select 
                    id="subject" 
                    name="subject" 
                    required 
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="">Please select</option>
                    <option value="general">General Inquiry</option>
                    <option value="listing">Listing Question</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </FormField>
                
                <FormField label="Message" htmlFor="message" required>
                  <textarea 
                    id="message" 
                    name="message" 
                    required 
                    rows={5} 
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  ></textarea>
                </FormField>
                
                <CheckboxField
                  id="privacy"
                  label="I agree to the Privacy Policy"
                  description="Your information will be used to respond to your inquiry and won't be shared with third parties."
                  required
                />
                
                <div className="flex justify-end pt-2">
                  <Button 
                    type="submit" 
                    variant="primary"
                    icon={Send}
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
};

export default Contact;