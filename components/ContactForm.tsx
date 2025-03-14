'use client';

import { useState, FormEvent } from 'react';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal'],
});

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        const errorDetails = data.details ? `: ${data.details}` : '';
        throw new Error(`${data.error || 'Failed to send message'}${errorDetails}`);
      }
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error: any) {
      console.error('Error sending form:', error);
      setSubmitStatus('error');
      
      // Provide a more user-friendly error message
      const errorMsg = error.message || 'There was an error sending your message. Please try again.';
      
      // If it's a network error, provide a specific message
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setErrorMessage('Network error: Please check your internet connection and try again.');
      } else {
        setErrorMessage(errorMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-center mb-12`}>
          Share Your Idea
        </h2>
        
        <div className="bg-white rounded-lg shadow-xl p-8">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
              <p className="text-gray-600">Your message has been sent successfully. I&apos;ll get back to you soon!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Idea
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Tell me what you want to automate in your daily workflow..."
                  required
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
              
              {submitStatus === 'error' && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
                  {errorMessage || "Sorry, there was an error sending your message. Please try again."}
                </div>
              )}
            </form>
          )}
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Your ideas will be reviewed and I&apos;ll contact you to discuss the possibilities.</p>
        </div>
      </div>
    </section>
  );
} 