'use client';

import React, { useState } from 'react';
import {ChangeEvent, FormEvent} from "react";

export default function BugReporter() {
  // --- Constants ---
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const BUG_ENDPOINT = `${API_URL}/api/bugs`; // Adjust this path if necessary
  
  const SEVERITY_OPTIONS = [
    { value: 'Critical', label: 'Critical' },
    { value: 'Major', label: 'Major' },
    { value: 'Minor', label: 'Minor' },
  ];
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'Minor',
    reporterEmail: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState('none');
  
  /**
   * Handles changes in any input field of the form.
   * @param {e} event - The change event from the input.
   * @param {name} name - The name attribute of the input.
   * @param {value} value - The current value of the input.
   */
  const handleInputChange = (e: {target: { name: string, value: any } }) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // --- SIMULATED API CALL ---
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // In a real application, you would send data via fetch/axios here.
      const payload = {
        title: formData.title,
        description: formData.description,
        severity: formData.severity,
        contactEmail: formData.reporterEmail
      };
      
      await fetch(process.env.NEXT_PUBLIC_API_URL!, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      });
      
      // Simulate successful submission
      setSubmittedSuccess('success');
      setFormData({ title: '', description: '', severity: 'Minor', reporterEmail: '' });
      
    } catch (error) {
      setSubmittedSuccess('failure');
      // Handle API error feedback
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Report a Bug</h2>
      <p className="text-gray-500 mb-8">Help us improve our service by reporting any issues you encounter.</p>
    
      {submittedSuccess != 'none' && (submittedSuccess === 'success' ?
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert" style={{maxWidth: '475px'}}>
        <p className="font-bold">Success!</p>
        <p>Thank you for your report. We have received your information and will investigate it shortly.</p>
        </div>
        :
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
        <p className="font-bold">Error</p>
        <p>Could not send bug report.</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="text-black space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-black mb-1">Summary/Title of the Bug <span
        className='text-red-500'>*</span></label>
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
          placeholder="e.g., Login fails on mobile Safari"
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Detailed Description <span
        className='text-red-500'>*</span></label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 resize-y disabled:bg-gray-50"
          placeholder="Describe the bug in detail: Steps to reproduce, expected behavior, actual behavior."
          disabled={isLoading}
        ></textarea>
      </div>
      
      <div>
        <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">Severity Level <span
        className='text-red-500'>*</span></label>
        <select
            id="severity"
            name="severity"
            required
            defaultValue="Minor"
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 disabled:bg-gray-50
            appearance-none bg-white"
          >
          <option value="" disabled>Select severity</option>
          <option value="Critical">Critical (System Down)</option>
          <option value="Major">Major (Major Functionality Broken)</option>
          <option value="Minor">Minor (Minor Nuisance/Improvement)</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">Optional Contact Email</label>
        <input
          type="email"
          id="contactEmail"
          name="contactEmail"
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 disabled:bg-gray-50"
          placeholder="Email address for follow-up questions"
          disabled={isLoading}
        />
      </div>
    
      
        <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-medium transition duration-150
          ${isLoading
            ? 'bg-red-400 cursor-not-allowed flex items-center justify-center'
            : 'bg-red-600 hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg flex items-center justify-center'
          }`}
          >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-100" fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 12a1 1 0 102 0v-4l2 2z"></path>
              </svg>
              Submitting Report...
            </>
          ) : (
            'Report Bug'
          )}
        </button>
      </form>
    </div>
  );
}