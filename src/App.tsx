import { useState } from 'react';
import Home from './components/Home';
import Browse from './components/Browse';

type Page = 'home' | 'browse';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigate = (page: Page, query?: string) => {
    setCurrentPage(page);
    if (query !== undefined) {
      setSearchQuery(query);
    } else {
      setSearchQuery('');
    }
  };

  return (
    <>
      {currentPage === 'home' ? (
        <Home onNavigate={handleNavigate} />
      ) : (
        <Browse onNavigate={handleNavigate} initialSearch={searchQuery} />
      )}
    </>
  );
}

export default App;
