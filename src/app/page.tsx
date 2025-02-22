import EmailGeneratorApp from '@/components/EmailGeneratorApp';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Email Pattern Generator</h1>
        <EmailGeneratorApp />
      </div>
    </main>
  );
}
