import { useState } from "react";
import { Button } from "./ui/button";

const FormPopup = ({ isOpen, onClose }) => {
  // Add state for number inputs
  const [casualties, setCasualties] = useState(0);
  const [injuries, setInjuries] = useState(0);
  const [missingPersons, setMissingPersons] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Handler functions for number inputs
  const handleIncrement = (setter, value) => {
    setter(prev => Math.max(0, prev + 1));
  };

  const handleDecrement = (setter, value) => {
    setter(prev => Math.max(0, prev - 1));
  };

  const handleInputChange = (setter, value) => {
    const numValue = parseInt(value) || 0;
    setter(Math.max(0, numValue));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const totalFiles = [...selectedFiles, ...newFiles];
    
    if (totalFiles.length > 5) {
      alert('Maximum 5 files can be uploaded. Please remove some files first.');
      return;
    }
    
    setSelectedFiles(totalFiles);
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center overflow-y-auto p-4">
      <div className="bg-white p-8 rounded-lg w-11/12 max-w-3xl">
        <h3 className="text-2xl font-bold mb-2 text-center text-blue-600">Disaster Report Form</h3>
        <p className="text-gray-600 mb-6 text-center">Please provide accurate information to help us respond effectively</p>
        
        <form className="space-y-8">
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

          {/* Impact Assessment Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">Impact Assessment</h4>
            <div>
              <label className="block font-medium mb-2">Severity Level*</label>
              <select 
                className="w-full p-2 border rounded-md bg-white text-gray-900 appearance-none cursor-pointer" 
                required
                style={{ backgroundColor: 'white' }}
              >
                <option value="" className="bg-white text-gray-900">Select Severity</option>
                <option value="low" className="bg-white text-gray-900">Low</option>
                <option value="moderate" className="bg-white text-gray-900">Moderate</option>
                <option value="high" className="bg-white text-gray-900">High</option>
                <option value="critical" className="bg-white text-gray-900">Critical</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium mb-2">Casualties</label>
                <div className="flex">
                  <input 
                    type="number" 
                    min="0" 
                    value={casualties}
                    onChange={(e) => handleInputChange(setCasualties, e.target.value)}
                    className="w-full p-2 border-y border-l rounded-l-md bg-white text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                    placeholder="0"
                  />
                  <div className="flex flex-col border-y border-r rounded-r-md">
                    <button 
                      type="button"
                      className="px-2 py-1 border-b hover:bg-gray-100 text-gray-600"
                      onClick={() => handleIncrement(setCasualties)}
                    >
                      ▲
                    </button>
                    <button 
                      type="button"
                      className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                      onClick={() => handleDecrement(setCasualties)}
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block font-medium mb-2">Injuries</label>
                <div className="flex">
                  <input 
                    type="number" 
                    min="0" 
                    value={injuries}
                    onChange={(e) => handleInputChange(setInjuries, e.target.value)}
                    className="w-full p-2 border-y border-l rounded-l-md bg-white text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                    placeholder="0"
                  />
                  <div className="flex flex-col border-y border-r rounded-r-md">
                    <button 
                      type="button"
                      className="px-2 py-1 border-b hover:bg-gray-100 text-gray-600"
                      onClick={() => handleIncrement(setInjuries)}
                    >
                      ▲
                    </button>
                    <button 
                      type="button"
                      className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                      onClick={() => handleDecrement(setInjuries)}
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block font-medium mb-2">Missing Persons</label>
                <div className="flex">
                  <input 
                    type="number" 
                    min="0" 
                    value={missingPersons}
                    onChange={(e) => handleInputChange(setMissingPersons, e.target.value)}
                    className="w-full p-2 border-y border-l rounded-l-md bg-white text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                    placeholder="0"
                  />
                  <div className="flex flex-col border-y border-r rounded-r-md">
                    <button 
                      type="button"
                      className="px-2 py-1 border-b hover:bg-gray-100 text-gray-600"
                      onClick={() => handleIncrement(setMissingPersons)}
                    >
                      ▲
                    </button>
                    <button 
                      type="button"
                      className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                      onClick={() => handleDecrement(setMissingPersons)}
                    >
                      ▼
                    </button>
                  </div>
                </div>
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

          {/* Media Upload Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">Media Upload</h4>
            <div>
              <label className="block font-medium mb-2">Upload Images/Videos</label>
              <div className="flex flex-col gap-4">
                <input 
                  type="file" 
                  multiple 
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="block w-full text-gray-500 
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-500 file:text-white
                    hover:file:bg-blue-600
                    cursor-pointer"
                />
                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm text-gray-600">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFiles(files => files.filter((_, i) => i !== index));
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Maximum 5 files. Supported formats: JPG, PNG, GIF, MP4, MOV
              </p>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2">Phone Number</label>
                <input type="tel" className="w-full p-2 border rounded-md bg-white text-gray-900" />
              </div>
              <div>
                <label className="block font-medium mb-2">Email Address</label>
                <input type="email" className="w-full p-2 border rounded-md bg-white text-gray-900" />
              </div>
            </div>
          </div>

          {/* Additional Notes Section */}
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

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button 
              onClick={onClose} 
              type="button" 
              className="bg-gray-500 hover:bg-gray-600 px-6"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-green-500 hover:bg-green-600 px-6"
            >
              Submit Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPopup;
