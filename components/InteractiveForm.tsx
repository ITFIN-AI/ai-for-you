'use client';

import { useState, useEffect } from 'react';
import { Playfair_Display } from 'next/font/google';
import { ArrowRight, Check, X } from 'lucide-react';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal'],
});

// Get the base URL from environment or default to localhost:3001
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';

interface StepProps {
  currentStep: number;
  totalSteps: number;
}

function ProgressBar({ currentStep, totalSteps }: StepProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div 
            key={index}
            className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium
              ${index < currentStep 
                ? 'bg-indigo-600 text-white' 
                : index === currentStep 
                  ? 'bg-indigo-100 text-indigo-600 border-2 border-indigo-600' 
                  : 'bg-gray-100 text-gray-400'
              }`}
          >
            {index < currentStep ? <Check size={18} /> : index + 1}
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div 
          className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

export default function InteractiveForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    workflowType: '',
    automationNeeds: [] as string[],
    name: '',
    email: '',
    phone: ''
  });
  
  const totalSteps = 3;
  
  const automationOptions = [
    { id: 'data-processing', label: 'Data Processing & Analysis' },
    { id: 'content-creation', label: 'Content Creation & Management' },
    { id: 'communication', label: 'Communication & Notifications' },
    { id: 'scheduling', label: 'Scheduling & Calendar Management' },
    { id: 'document-handling', label: 'Document Handling & Generation' }
  ];
  
  useEffect(() => {
    const handleGetStarted = () => {
      const getStartedBtn = document.getElementById('get-started-btn');
      if (getStartedBtn) {
        getStartedBtn.addEventListener('click', (e) => {
          e.preventDefault();
          setIsVisible(true);
          // Prevent scrolling when modal is open
          document.body.style.overflow = 'hidden';
        });
      }
    };
    
    // Wait for the DOM to be fully loaded
    setTimeout(handleGetStarted, 500);
    
    return () => {
      const getStartedBtn = document.getElementById('get-started-btn');
      if (getStartedBtn) {
        getStartedBtn.removeEventListener('click', () => {});
      }
      // Restore scrolling when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleClose = () => {
    setIsVisible(false);
    setCurrentStep(0);
    // Restore scrolling when modal is closed
    document.body.style.overflow = 'auto';
  };
  
  const handleWorkflowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, workflowType: e.target.value });
  };
  
  const handleCheckboxChange = (id: string) => {
    setFormData(prev => {
      const newNeeds = prev.automationNeeds.includes(id)
        ? prev.automationNeeds.filter(item => item !== id)
        : [...prev.automationNeeds, id];
      
      return { ...prev, automationNeeds: newNeeds };
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async () => {
    // Here you would typically send the data to your backend or email service
    console.log('Form submitted:', formData);
    
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Send the form data to our API endpoint
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Workflow automation request`,
          workflowType: formData.workflowType,
          automationNeeds: formData.automationNeeds,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to send request');
      }
      
      // Restore scrolling
      document.body.style.overflow = 'auto';
      
      // Show success message
      alert('Your request has been submitted successfully! We will contact you soon.');
      
      // Close the modal
      setIsVisible(false);
      setCurrentStep(0);
    } catch (error: any) {
      console.error('Error sending form:', error);
      setErrorMessage(error.message || 'There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-fadeIn">
      {/* Background overlay with gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-indigo-800/90 to-blue-900/90 backdrop-blur-sm transition-all duration-500"
        onClick={handleClose}
      >
        {/* Decorative circles */}
        <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-purple-600/20 blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-blue-600/20 blur-3xl"></div>
        <div className="absolute top-[40%] right-[30%] w-[200px] h-[200px] rounded-full bg-indigo-500/20 blur-2xl"></div>
      </div>
      
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-slideIn relative z-10">
        <div className="p-8 relative">
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={28} />
          </button>
          
          <h2 className={`${playfair.className} text-3xl font-bold text-center mb-8`}>
            Let's Automate Your Workflow
          </h2>
          
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          
          {/* Step 1: Workflow Type */}
          {currentStep === 0 && (
            <div className="space-y-8 animate-fadeIn">
              <h3 className="text-2xl font-semibold text-gray-800">What type of workflow do you want to automate?</h3>
              <div className="space-y-4">
                <label className="flex items-start p-5 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/30 cursor-pointer transition-all">
                  <input 
                    type="radio" 
                    name="workflowType" 
                    value="Personal" 
                    checked={formData.workflowType === 'Personal'}
                    onChange={handleWorkflowChange}
                    className="mt-1 mr-4 h-5 w-5"
                  />
                  <div>
                    <div className="font-medium text-lg">Personal Workflow</div>
                    <div className="text-gray-500 mt-1">Tasks related to personal productivity, organization, or daily life</div>
                  </div>
                </label>
                
                <label className="flex items-start p-5 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/30 cursor-pointer transition-all">
                  <input 
                    type="radio" 
                    name="workflowType" 
                    value="Professional" 
                    checked={formData.workflowType === 'Professional'}
                    onChange={handleWorkflowChange}
                    className="mt-1 mr-4 h-5 w-5"
                  />
                  <div>
                    <div className="font-medium text-lg">Professional Workflow</div>
                    <div className="text-gray-500 mt-1">Tasks related to your job, business operations, or professional services</div>
                  </div>
                </label>
                
                <label className="flex items-start p-5 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/30 cursor-pointer transition-all">
                  <input 
                    type="radio" 
                    name="workflowType" 
                    value="Creative" 
                    checked={formData.workflowType === 'Creative'}
                    onChange={handleWorkflowChange}
                    className="mt-1 mr-4 h-5 w-5"
                  />
                  <div>
                    <div className="font-medium text-lg">Creative Workflow</div>
                    <div className="text-gray-500 mt-1">Tasks related to content creation, design, or artistic processes</div>
                  </div>
                </label>
              </div>
            </div>
          )}
          
          {/* Step 2: Automation Needs */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-fadeIn">
              <h3 className="text-2xl font-semibold text-gray-800">What would you like to automate? (Select all that apply)</h3>
              <div className="space-y-4">
                {automationOptions.map(option => (
                  <label 
                    key={option.id} 
                    className="flex items-center p-5 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/30 cursor-pointer transition-all"
                  >
                    <input 
                      type="checkbox" 
                      checked={formData.automationNeeds.includes(option.id)}
                      onChange={() => handleCheckboxChange(option.id)}
                      className="mr-4 h-5 w-5"
                    />
                    <span className="text-lg">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 3: Contact Information */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-fadeIn">
              <h3 className="text-2xl font-semibold text-gray-800">Your Contact Information</h3>
              <div className="space-y-5">
                <div>
                  <label htmlFor="interactive-name" className="block text-lg font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="interactive-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="interactive-email" className="block text-lg font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="interactive-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="interactive-phone" className="block text-lg font-medium text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="interactive-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            {currentStep > 0 ? (
              <button
                onClick={handlePrevious}
                className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-lg"
              >
                Back
              </button>
            ) : (
              <div></div> // Empty div to maintain flex spacing
            )}
            
            {currentStep < totalSteps - 1 ? (
              <button
                onClick={handleNext}
                disabled={currentStep === 0 && !formData.workflowType}
                className={`px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center text-lg
                  ${(currentStep === 0 && !formData.workflowType) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Next
                <ArrowRight size={20} className="ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-lg
                  ${(isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
          
          {errorMessage && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 