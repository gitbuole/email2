'use client';

interface PatternExample {
  code: string;
  description: string;
  example: string;
}

const PATTERN_EXAMPLES: PatternExample[] = [
  {
    code: 'first',
    description: 'First name only',
    example: 'john@company.com',
  },
  {
    code: 'flast',
    description: 'First initial + last name',
    example: 'jsmith@company.com',
  },
  {
    code: 'first.last',
    description: 'First name + dot + last name',
    example: 'john.smith@company.com',
  },
  {
    code: 'firstlast',
    description: 'First name + last name',
    example: 'johnsmith@company.com',
  },
  {
    code: 'last',
    description: 'Last name only',
    example: 'smith@company.com',
  },
  {
    code: 'firstl',
    description: 'First name + last initial',
    example: 'johns@company.com',
  },
  {
    code: 'f.last',
    description: 'First initial + dot + last name',
    example: 'j.smith@company.com',
  },
  {
    code: 'lastf',
    description: 'Last name + first initial',
    example: 'smithj@company.com',
  },
  {
    code: 'first_last',
    description: 'First name + underscore + last name',
    example: 'john_smith@company.com',
  },
];

export default function PatternsGuide() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-600">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Pattern Code
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Example Output
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-600">
          {PATTERN_EXAMPLES.map((pattern) => (
            <tr key={pattern.code} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap text-white font-mono">
                {pattern.code}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-white">
                {pattern.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-white font-mono">
                {pattern.example}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 