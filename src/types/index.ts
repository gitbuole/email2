export interface Prospect {
  first_name: string;
  last_name: string;
  account: string;
  domain?: string;
}

export interface PatternDictionary {
  account: string;
  domain: string;
  pattern_code: string;
}

export interface EmailPattern extends Omit<Prospect, 'domain'> {
  email: string;
  pattern_code: string;
  domain: string;
} 