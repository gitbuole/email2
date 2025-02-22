'use client';

import { useState } from 'react';
import FileUploader from './FileUploader';
import ResultsTable from './ResultsTable';
import { generateEmails } from '@/utils/emailGenerator';
import { parseCSV } from '@/utils/csvParser';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { EmailPattern, Prospect, PatternDictionary } from '@/types';
import DictionaryManager from './DictionaryManager';
import PatternsGuide from './PatternsGuide';
import Instructions from './Instructions';

type ActiveTab = 'results' | 'patterns' | 'guide' | 'instructions';

export default function EmailGeneratorApp() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [patterns, setPatterns] = useState<PatternDictionary[]>([]);
  const [generatedEmails, setGeneratedEmails] = useState<EmailPattern[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('results');

  const handleProspectsUpload = async (file: File) => {
    try {
      const data = await parseCSV<Prospect>(file);
      setProspects(data);
      setError(null);
    } catch (err) {
      setError('Error parsing prospects CSV file');
    }
  };

  const handlePatternsUpload = async (file: File) => {
    try {
      const data = await parseCSV<PatternDictionary>(file);
      setPatterns(data);
      setError(null);
    } catch (err) {
      setError('Error parsing patterns CSV file');
    }
  };

  const handleGenerate = () => {
    if (prospects.length === 0 || patterns.length === 0) {
      setError('Please upload both CSV files first');
      return;
    }

    const emails = generateEmails(prospects, patterns);
    setGeneratedEmails(emails);
  };

  const handleExport = () => {
    if (generatedEmails.length === 0) {
      setError('No emails to export');
      return;
    }

    const csv = Papa.unparse(generatedEmails);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'generated_emails.csv');
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FileUploader
          label="Upload Prospects CSV"
          onFileUpload={handleProspectsUpload}
          accept=".csv"
        />
        <FileUploader
          label="Upload Pattern Dictionary CSV"
          onFileUpload={handlePatternsUpload}
          accept=".csv"
        />
      </div>

      <DictionaryManager 
        currentPatterns={patterns}
        onLoadDictionary={setPatterns}
      />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleGenerate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Generate Emails
        </button>
        <button
          onClick={handleExport}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          disabled={generatedEmails.length === 0}
        >
          Export CSV
        </button>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('instructions')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'instructions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Instructions
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'results'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Results
          </button>
          <button
            onClick={() => setActiveTab('patterns')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'patterns'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pattern Dictionary
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'guide'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Patterns Guide
          </button>
        </nav>
      </div>

      {activeTab === 'instructions' ? (
        <Instructions />
      ) : activeTab === 'results' ? (
        <ResultsTable emails={generatedEmails} />
      ) : activeTab === 'patterns' ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Account
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Domain
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Pattern Code
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-600">
              {patterns.map((pattern, index) => (
                <tr key={index} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {pattern.account}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {pattern.domain}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {pattern.pattern_code}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <PatternsGuide />
      )}
    </div>
  );
} 