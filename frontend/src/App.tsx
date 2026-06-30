import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Url {
  id: number;
  originalUrl: string;
  shortUrl: string;
}

const App: React.FC = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [urls, setUrls] = useState<Url[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_URL}/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data: Url = await response.json();
      setShortUrl(data.shortUrl);
      setUrls((prevUrls) => [...prevUrls, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await fetch(`${API_URL}/urls`);
        const data: Url[] = await response.json();
        setUrls(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUrls();
  }, []);

  return (
    <div>
      <h1>Acortador de URLs</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={url} onChange={handleInputChange} />
        <button type="submit">Acortar</button>
      </form>
      {shortUrl && <p>URL acortada: {shortUrl}</p>}
      <ul>
        {urls.map((url) => (
          <li key={url.id}>
            <p>Original: {url.originalUrl}</p>
            <p>Acortada: {url.shortUrl}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;