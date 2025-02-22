'use client';

import { EmailPattern } from '@/types';

interface ResultsTableProps {
  emails: EmailPattern[];
}

export default function ResultsTable({ emails }: ResultsTableProps) {
  if (emails.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-600">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Account
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Domain
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Pattern
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-600">
          {emails.map((email, index) => (
            <tr key={index} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap text-white">
                {email.first_name} {email.last_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-white">{email.account}</td>
              <td className="px-6 py-4 whitespace-nowrap text-white">{email.domain}</td>
              <td className="px-6 py-4 whitespace-nowrap text-white">{email.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-white">{email.pattern_code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 