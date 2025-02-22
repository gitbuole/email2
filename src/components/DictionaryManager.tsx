'use client';

import { useState, useEffect } from 'react';
import { PatternDictionary } from '@/types';
import { saveDictionary, getSavedDictionaries, deleteDictionary } from '@/utils/dictionaryStorage';

interface DictionaryManagerProps {
  currentPatterns: PatternDictionary[];
  onLoadDictionary: (patterns: PatternDictionary[]) => void;
}

interface SavedDictionary {
  id: string;
  name: string;
  patterns: PatternDictionary[];
  createdAt: string;
}

export default function DictionaryManager({ currentPatterns, onLoadDictionary }: DictionaryManagerProps) {
  const [dictionaryName, setDictionaryName] = useState('');
  const [savedDictionaries, setSavedDictionaries] = useState<SavedDictionary[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDictionaries();
  }, []);

  const loadDictionaries = () => {
    try {
      const dictionaries = getSavedDictionaries();
      setSavedDictionaries(dictionaries);
      setError(null);
    } catch (err) {
      setError('Failed to load dictionaries');
    }
  };

  const handleSave = () => {
    if (!dictionaryName.trim() || currentPatterns.length === 0) return;
    
    try {
      saveDictionary(dictionaryName, currentPatterns);
      loadDictionaries();
      setDictionaryName('');
      setError(null);
    } catch (err) {
      setError('Failed to save dictionary');
    }
  };

  const handleDelete = (id: string) => {
    try {
      deleteDictionary(id);
      loadDictionaries();
      setError(null);
    } catch (err) {
      setError('Failed to delete dictionary');
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="flex gap-2">
        <input
          type="text"
          value={dictionaryName}
          onChange={(e) => setDictionaryName(e.target.value)}
          placeholder="Dictionary name"
          className="flex-1 px-3 py-2 border rounded text-black"
        />
        <button
          onClick={handleSave}
          disabled={!dictionaryName.trim() || currentPatterns.length === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Save Dictionary
        </button>
      </div>

      {savedDictionaries.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <h3 className="bg-gray-50 px-4 py-2 font-medium">Saved Dictionaries</h3>
          <ul className="divide-y">
            {savedDictionaries.map((dict) => (
              <li key={dict.id} className="px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">{dict.name}</p>
                  <p className="text-sm text-gray-500">
                    {dict.patterns.length} patterns • {new Date(dict.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onLoadDictionary(dict.patterns)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Load
                  </button>
                  <button
                    onClick={() => handleDelete(dict.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 