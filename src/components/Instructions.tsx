'use client';

export default function Instructions() {
  return (
    <div className="space-y-8 text-white">
      <section>
        <h2 className="text-xl font-bold mb-4">How to Use This Tool</h2>
        <ol className="list-decimal list-inside space-y-4">
          <li>Upload your CSV files:
            <ul className="list-disc list-inside ml-6 mt-2 text-gray-300">
              <li>A prospects CSV file containing your contact information</li>
              <li>A pattern dictionary CSV file containing email patterns for different companies</li>
            </ul>
          </li>
          <li>Click "Generate Emails" to create email addresses</li>
          <li>View results in the Results tab</li>
          <li>Export the generated emails as a CSV file</li>
        </ol>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">CSV File Requirements</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Prospects CSV Format</h3>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="font-mono mb-2">Required columns:</p>
            <ul className="list-disc list-inside ml-4 text-gray-300">
              <li>first_name</li>
              <li>last_name</li>
              <li>account (company name)</li>
            </ul>
            <div className="mt-4">
              <p className="font-mono mb-2">Example:</p>
              <pre className="bg-gray-900 p-2 rounded text-sm">
                first_name,last_name,account
                John,Smith,Apple
                Jane,Doe,Google
              </pre>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Pattern Dictionary CSV Format</h3>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="font-mono mb-2">Required columns:</p>
            <ul className="list-disc list-inside ml-4 text-gray-300">
              <li>account (company name)</li>
              <li>domain (email domain)</li>
              <li>pattern_code (see Patterns Guide tab)</li>
            </ul>
            <div className="mt-4">
              <p className="font-mono mb-2">Example:</p>
              <pre className="bg-gray-900 p-2 rounded text-sm">
                account,domain,pattern_code
                Apple,apple.com,first.last
                Google,google.com,flast
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Check the Patterns Guide tab to see all supported email patterns</li>
          <li>Save commonly used pattern dictionaries for future use</li>
          <li>Make sure your CSV files use correct column names (case-sensitive)</li>
          <li>The account names in both files must match exactly for patterns to be applied</li>
        </ul>
      </section>
    </div>
  );
} 