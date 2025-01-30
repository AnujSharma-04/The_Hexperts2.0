import React, { useState } from 'react';
import { reportDisaster } from '../apiService';  // Import the reportDisaster API call

const FormPopup = ({ isOpen, onClose }) => {
  // Add state for casualties, injuries, missing persons, and file uploads
  const [casualties, setCasualties] = useState(0);
  const [injuries, setInjuries] = useState(0);
  const [missingPersons, setMissingPersons] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);  // ✅ FIX: Added missing state for files

  const [disasterType, setDisasterType] = useState('');
  const [description, setDescription] = useState('');
  const [severityLevel, setSeverityLevel] = useState('');
  const [location, setLocation] = useState('');
  const [proofUrl, setProofUrl] = useState('');

  // Fetch user info from the token (including jurisdiction)
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));  // Assuming user info is saved in localStorage
  const jurisdiction = userInfo ? userInfo.jurisdiction : '';  // Get the jurisdiction (district)

  // Handle increment and decrement for casualties, injuries, and missing persons
  const handleIncrement = (setter) => {
    setter((prev) => Math.max(0, prev + 1)); // Ensure value does not go below 0
  };

  const handleDecrement = (setter) => {
    setter((prev) => Math.max(0, prev - 1)); // Ensure value does not go below 0
  };

  // ✅ FIX: Define `handleInputChange`
  const handleInputChange = (setter, value) => {
    const numValue = parseInt(value) || 0;
    setter(Math.max(0, numValue)); // Prevent negative numbers
  };

  // ✅ FIX: Define `handleFileChange`
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files); // Convert FileList to array
    const totalFiles = [...selectedFiles, ...newFiles];

    // Ensure that no more than 5 files are selected
    if (totalFiles.length > 5) {
      alert('Maximum 5 files can be uploaded. Please remove some files first.');
      return;
    }

    setSelectedFiles(totalFiles); // Update the selected files state

    // Reset the input value to allow selecting the same file again
    e.target.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    const disasterData = {
      disaster_type: disasterType,
      description,
      severity_level: severityLevel,
      location,
      proof_url: proofUrl,
      casualties: Number(casualties), 
      injuries: Number(injuries),  
      missing_persons: Number(missingPersons), 
      district: jurisdiction, // Include jurisdiction
    };

    try {
      const response = await reportDisaster(disasterData);
      console.log('Disaster Reported:', response);
      alert('Disaster reported successfully!');
      onClose(); // Close the popup on success
    } catch (error) {
      console.error('Error reporting disaster:', error);
      alert('Error reporting disaster. Please try again.');
    }
  };

  if (!isOpen) return null; // If not open, return null (hide the form)

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center overflow-y-auto p-4">
      <div className="bg-white p-8 rounded-lg w-11/12 max-w-3xl">
        <h3 className="text-2xl font-bold mb-2 text-center text-blue-600">Disaster Report Form</h3>
        <p className="text-gray-600 mb-6 text-center">Please provide accurate information to help us respond effectively</p>
        
        {/* Basic Information Section */}
        <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">Basic Information</h4>
            <div>
              <label className="block font-medium mb-2">Type of Disaster*</label>
              <select className="w-full p-2 border rounded-md bg-white text-gray-900" required>
                <option value="">Select Disaster Type</option>
                <option value="flood">Flood</option>
                <option value="earthquake">Earthquake</option>
                <option value="fire">Fire</option>
                <option value="landslide">Landslide</option>
                <option value="cyclone">Cyclone</option>
                <option value="gasLeak">Gas Leak</option>
              </select>
            </div>
          </div>

          {/* Location Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">Location Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2">City/Village Name*</label>
                <input type="text" className="w-full p-2 border rounded-md bg-white text-gray-900" required />
              </div>
              <div>
                <label className="block font-medium mb-2">Nearest Landmark</label>
                <input type="text" className="w-full p-2 border rounded-md bg-white text-gray-900" />
              </div>
            </div>
            <div>
              <label className="block font-medium mb-2">Location</label>
              <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Auto-detect Location
              </button>
            </div>
          </div>

          {/* Date and Time Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">Occurrence Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2">Date of Occurrence*</label>
                <input type="date" className="w-full p-2 border rounded-md bg-white text-gray-900" required />
              </div>
              <div>
                <label className="block font-medium mb-2">Time of Occurrence*</label>
                <input type="time" className="w-full p-2 border rounded-md bg-white text-gray-900" required />
              </div>
            </div>
          </div>

        
        {/* ✅ FIX: Ensure `handleSubmit` is connected to the `<form>` */}
        <form className="space-y-8" onSubmit={handleSubmit}>
          
          {/* Impact Assessment Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">Impact Assessment</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Casualties */}
              <div>
                <label className="block font-medium mb-2">Casualties</label>
                <input 
                  type="number" 
                  min="0" 
                  value={casualties}
                  onChange={(e) => handleInputChange(setCasualties, e.target.value)}
                  className="w-full p-2 border rounded-md bg-white text-gray-900"
                  placeholder="0"
                />
              </div>

              {/* Injuries */}
              <div>
                <label className="block font-medium mb-2">Injuries</label>
                <input 
                  type="number" 
                  min="0" 
                  value={injuries}
                  onChange={(e) => handleInputChange(setInjuries, e.target.value)}
                  className="w-full p-2 border rounded-md bg-white text-gray-900"
                  placeholder="0"
                />
              </div>

              {/* Missing Persons */}
              <div>
                <label className="block font-medium mb-2">Missing Persons</label>
                <input 
                  type="number" 
                  min="0" 
                  value={missingPersons}
                  onChange={(e) => handleInputChange(setMissingPersons, e.target.value)}
                  className="w-full p-2 border rounded-md bg-white text-gray-900"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Damage Assessment Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">Damage Assessment</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2">Infrastructure Damage</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Buildings/Homes
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Roads
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Power Lines
                  </label>
                </div>
              </div>
              <div>
                <label className="block font-medium mb-2">Assistance Needed</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Medical Aid
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Food & Water
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Rescue Teams
                  </label>
                </div>
              </div>
            </div>
          </div>


          {/* ✅ FIX: Ensure `onChange={handleFileChange}` is used correctly */}
          <div>
            <label className="block font-medium mb-2">Upload Images/Videos</label>
            <input 
              type="file" 
              multiple 
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="block w-full text-gray-500"
            />
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">Additional Information</h4>
            <div>
              <label className="block font-medium mb-2">Additional Notes</label>
              <textarea 
                className="w-full p-2 border rounded-md bg-white text-gray-900" 
                rows="4"
                placeholder="Please provide any additional details that might be helpful..."
              ></textarea>
            </div>
          </div>

          {/* ✅ FIX: Ensure Submit Button is Properly Attached to Form */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-gray-500 hover:bg-gray-600 px-6 text-white rounded-md"
            >
              Cancel
            </button>
            <button 
              type="submit"  
              className="bg-green-500 hover:bg-green-600 px-6 text-white rounded-md"
            >
              Submit Report
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default FormPopup;
