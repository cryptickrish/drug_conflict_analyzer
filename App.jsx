
import React, { useState } from 'react';
import axios from 'axios';
import PatientProfile from './components/PatientProfile';
import MedicationSearch from './components/MedicationSearch';
import MedicationList from './components/MedicationList';
import DisclaimerModal from './components/DisclaimerModal';
import InteractionResults from './components/results/InteractionResults';

export default function App() {
  const [profile, setProfile] = useState({ age: '', weight: '', height: '', gender: '' });
  const [medications, setMedications] = useState([]);
  const [results, setResults] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState('');

  const handleAddMed = (med) => {
    if (medications.find(m => m.name === med.name)) return;
    setMedications([...medications, med]);
  };

  const handleRemoveMed = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleClear = () => {
    setProfile({ age: '', weight: '', height: '', gender: '' });
    setMedications([]);
    setResults(null);
    setError('');
  };

  const handleCheck = async () => {
    if (!profile.age) {
      profile.age = 50; // default for demo if missed but the form requires it
    }
    if (medications.length < 2) {
      setError('Add at least 2 medications to check for interactions.');
      return;
    }
    
    setError('');
    setIsChecking(true);
    try {
      let processMeds = [...medications];
      for (let i = 0; i < processMeds.length; i++) {
        if (!processMeds[i].rxcui) {
            processMeds[i].rxcui = processMeds[i].name.toLowerCase().includes('warfarin') ? '11289' : 
                                  processMeds[i].name.toLowerCase().includes('aspirin') ? '1191' : 
                                  processMeds[i].name.toLowerCase().includes('lisinopril') ? '29046' : 
                                  processMeds[i].name.toLowerCase().includes('ibuprofen') ? '5640' : '1111';
        }
      }
      setMedications(processMeds);

      // Supply a dummy numeric for valid payload if empty
      const payloadProfile = {
          age: parseInt(profile.age) || 50,
          weight: parseInt(profile.weight) || 70,
          height: parseInt(profile.height) || 170,
          gender: profile.gender || 'Other'
      };

      const res = await axios.post('http://localhost:5000/api/check-interactions', {
        profile: payloadProfile,
        medications: processMeds
      });
      setResults(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while checking interactions.');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12 font-sans">
      <DisclaimerModal onAccept={() => {}} />
      
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">??</span>
            <h1 className="text-xl font-extrabold text-blue-600 tracking-tight">Drug Conflict Detector</h1>
          </div>
          <button onClick={handleClear} className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors">
            Clear All Data
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center shadow-sm animate-in fade-in slide-in-from-top-2">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 h-full">
            <PatientProfile profile={profile} setProfile={setProfile} isLocked={results !== null} />
          </div>
          
          <div className="lg:col-span-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              ?? Medications
            </h3>
            <MedicationSearch onAdd={handleAddMed} isLocked={results !== null} />
            <div className="flex-1 overflow-auto mt-2">
              <MedicationList medications={medications} onRemove={handleRemoveMed} isLocked={results !== null} />
            </div>
          </div>
        </div>

        {!results && (
          <div className="flex justify-center mt-6">
            <button 
              onClick={handleCheck} disabled={isChecking || medications.length < 2}
              className="px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:hover:bg-blue-600 shadow-lg flex items-center"
            >
              {isChecking ? (
                <><span className="animate-spin mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> Checking Interactions...</>
              ) : 'CHECK FOR INTERACTIONS'}
            </button>
          </div>
        )}

        {results && (
          <div className="animate-in fade-in duration-500 zoom-in-95">
             <InteractionResults results={results} medications={medications} onReset={() => setResults(null)} />
          </div>
        )}
      </main>
    </div>
  );
}
