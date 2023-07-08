import React, { useState } from 'react';
import NavTabs from './NavTabs';
import Footer from './Footer';
import Home from '../pages/Home';
import Map from '../pages/Map';

export default function SiteContainer() {
  const [currentPage, setCurrentPage] = useState('Home');

  const renderPage = () => {
    if (currentPage === 'Map') {
      return <Map />;
    }
    return <Home />;
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
      {renderPage()}
      <Footer />
    </div>
  );
}
