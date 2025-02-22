import { Prospect, PatternDictionary, EmailPattern } from '@/types';

// Define all possible pattern codes with human-readable keys
export const EMAIL_PATTERNS = {
  FIRST: 'first',
  F_LAST: 'flast',
  FIRST_DOT_LAST: 'first.last',
  FIRST_LAST: 'firstlast',
  LAST: 'last',
  FIRST_L: 'firstl',
  F_DOT_LAST: 'f.last',
  LAST_F: 'lastf',
  FIRST_UNDERSCORE_LAST: 'first_last',
} as const;

export type PatternCode = keyof typeof EMAIL_PATTERNS;

export function generateEmails(
  prospects: Prospect[],
  patterns: PatternDictionary[]
): EmailPattern[] {
  return prospects.map((prospect) => {
    // Validate required fields
    if (!prospect.first_name || !prospect.last_name || !prospect.account) {
      return {
        ...prospect,
        domain: prospect.domain || '',
        email: '',
        pattern_code: 'INVALID_DATA',
      };
    }

    const pattern = patterns.find(
      (p) => p.account === prospect.account
    );

    if (!pattern) {
      return {
        ...prospect,
        domain: prospect.domain || '',
        email: '',
        pattern_code: 'NO_MATCH',
      };
    }

    const email = generateEmailFromPattern(
      prospect.first_name,
      prospect.last_name,
      pattern.domain,
      pattern.pattern_code
    );

    return {
      ...prospect,
      domain: pattern.domain,
      email,
      pattern_code: pattern.pattern_code,
    };
  });
}

function generateEmailFromPattern(
  firstName: string,
  lastName: string,
  domain: string,
  pattern: string
): string {
  // Ensure inputs are strings and not empty
  if (!firstName || !lastName || !domain) {
    return '';
  }

  const f = firstName.trim().toLowerCase();
  const l = lastName.trim().toLowerCase();
  const d = domain.trim().toLowerCase();

  // Check if we have valid strings after trimming
  if (!f || !l || !d) {
    return '';
  }

  // Map pattern codes to their email format
  const patterns: { [key: string]: string } = {
    'first': `${f}@${d}`,
    'flast': `${f[0]}${l}@${d}`,
    'first.last': `${f}.${l}@${d}`,
    'firstlast': `${f}${l}@${d}`,
    'last': `${l}@${d}`,
    'firstl': `${f}${l[0]}@${d}`,
    'f.last': `${f[0]}.${l}@${d}`,
    'lastf': `${l}${f[0]}@${d}`,
    'first_last': `${f}_${l}@${d}`,
    // Legacy pattern support
    'FL_DOT': `${f[0]}.${l}@${d}`,
    'F_DOT_L': `${f}.${l[0]}@${d}`,
    'FLAST': `${f}${l}@${d}`,
    'FIRSTL': `${f}${l[0]}@${d}`,
  };

  return patterns[pattern] || '';
} 