import { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Browse from './components/Browse';
import About from './components/About';
import Contact from './components/Contact';

type Page = 'home' | 'browse' | 'about' | 'contact';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigate = (page: string, query?: string) => {
    setCurrentPage(page as Page);
    if (query !== undefined) {
      setSearchQuery(query);
    } else {
      setSearchQuery('');
    }
  };

  return (
    <>
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
      {currentPage === 'browse' && <Browse onNavigate={handleNavigate} initialSearch={searchQuery} />}
      {currentPage === 'about' && <About onNavigate={handleNavigate} />}
      {currentPage === 'contact' && <Contact onNavigate={handleNavigate} />}
    </>
  );
}

export default App;
