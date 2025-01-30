import React, { useState } from 'react';
import { reportDisaster } from '../apiService';
// import { getUserInfo } from "../utils/decode";




const DisasterReportPage = () => {
//   const [userInfo, setUserInfo] = useState(null);
  const [casualties, setCasualties] = useState(0);
  const [injuries, setInjuries] = useState(0);
  const [missingPersons, setMissingPersons] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [disasterType, setDisasterType] = useState('');
  const [description, setDescription] = useState('');
  const [severityLevel, setSeverityLevel] = useState('');
  const [location, setLocation] = useState('');

  
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [district, setDistrict] = useState(userInfo?.district || "");  // ✅ Set district from userInfo

//   const jurisdiction = userInfo ? userInfo.district : '';

  const handleInputChange = (setter, value) => {
    const numValue = parseInt(value) || 0;
    setter(Math.max(0, numValue));
  };

//   useEffect(() => {
//     const userData = getUserInfo();
//     setUserInfo(userData);
//   }, []);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const totalFiles = [...selectedFiles, ...newFiles];
    if (totalFiles.length > 5) {
      alert('Maximum 5 files can be uploaded.');
      return;
    }
    setSelectedFiles(totalFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const disasterData = {
      disaster_type: disasterType,
      description,
      severity_level: severityLevel,
      location,
      casualties: Number(casualties),
      injuries: Number(injuries),
      missing_persons: Number(missingPersons),
      district: district,
    };
    try {
      await reportDisaster(disasterData);
      alert('Disaster reported successfully!');
    } catch (error) {
      alert('Error reporting disaster.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-blue-600">Report a Disaster</h2>
        <p className="text-gray-600 text-center mb-6">Provide details to assist in response efforts.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium">Disaster Type*</label>
            <select className="w-full p-2 border rounded-md" required value={disasterType} onChange={(e) => setDisasterType(e.target.value)}>
              <option value="">Select Disaster Type</option>
              <option value="flood">Flood</option>
              <option value="earthquake">Earthquake</option>
              <option value="fire">Fire</option>
              <option value="landslide">Landslide</option>
              <option value="cyclone">Cyclone</option>
              <option value="gasLeak">Gas Leak</option>
            </select>
          </div>

          {/* <div>
            <label className="block font-medium">District*</label>
            <input type="text" className="w-full p-2 border rounded-md" required value={district} onChange={(e) => set(e.target.value)} />
          </div> */}
          <div>
            <label className="block font-medium">District*</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-md" 
              required 
              value={district} 
              onChange={(e) => setDistrict(e.target.value)} 
            />
          </div>

          <div>
            <label className="block font-medium">Location*</label>
            <input type="text" className="w-full p-2 border rounded-md" required value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea className="w-full p-2 border rounded-md" rows="4" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>

          <div>
            <label className="block font-medium">Severity Level*</label>
            <select className="w-full p-2 border rounded-md" required value={severityLevel} onChange={(e) => setSeverityLevel(e.target.value)}>
              <option value="">Select Severity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-medium">Casualties</label>
              <input type="number" min="0" value={casualties} onChange={(e) => handleInputChange(setCasualties, e.target.value)} className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block font-medium">Injuries</label>
              <input type="number" min="0" value={injuries} onChange={(e) => handleInputChange(setInjuries, e.target.value)} className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block font-medium">Missing Persons</label>
              <input type="number" min="0" value={missingPersons} onChange={(e) => handleInputChange(setMissingPersons, e.target.value)} className="w-full p-2 border rounded-md" />
            </div>
          </div>

          <div>
            <label className="block font-medium">Upload Proof (Max 5)</label>
            <input type="file" multiple accept="image/*,video/*" onChange={handleFileChange} className="w-full" />
          </div>

          <div className="flex justify-end gap-4">
            <button type="reset" className="bg-gray-500 hover:bg-gray-600 px-6 py-2 text-white rounded-md">Reset</button>
            <button type="submit" className="bg-green-500 hover:bg-green-600 px-6 py-2 text-white rounded-md">Submit Report</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DisasterReportPage;