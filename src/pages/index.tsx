import { useState } from 'react';

export default function Home() {
  const [code, setCode] = useState('');
  const [documentation, setDocumentation] = useState('');

  const handleGenerateDoc = async () => {
    const response = await fetch('/api/generate-doc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    setDocumentation(data.documentation);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Code Documentation Generator</h1>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your TypeScript or JavaScript code here..."
        rows={10}
        style={{ width: '100%', padding: '1rem' }}
      />
      <button onClick={handleGenerateDoc} style={{ marginTop: '1rem', padding: '1rem' }}>
        Generate Documentation
      </button>
      {documentation && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Generated Documentation</h2>
          <pre style={{ backgroundColor: '#f4f4f4', padding: '1rem' }}>
            {documentation}
          </pre>
        </div>
      )}
    </div>
  );
}
