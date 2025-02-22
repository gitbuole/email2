import { PatternDictionary } from '@/types';

const STORAGE_KEY = 'pattern_dictionaries';

interface SavedDictionary {
  id: string;
  name: string;
  patterns: PatternDictionary[];
  createdAt: string;
}

export function saveDictionary(name: string, patterns: PatternDictionary[]): void {
  try {
    const saved = getSavedDictionaries();
    const newDictionary: SavedDictionary = {
      id: Date.now().toString(), // Simple unique ID generation
      name,
      patterns,
      createdAt: new Date().toISOString(),
    };
    
    saved.push(newDictionary);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  } catch (error) {
    console.error('Error saving dictionary:', error);
    throw new Error('Failed to save dictionary');
  }
}

export function getSavedDictionaries(): SavedDictionary[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error getting dictionaries:', error);
    return [];
  }
}

export function deleteDictionary(id: string): void {
  try {
    const saved = getSavedDictionaries();
    const filtered = saved.filter(dict => dict.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting dictionary:', error);
    throw new Error('Failed to delete dictionary');
  }
} 