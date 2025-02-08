import React, { useState } from 'react';
import SearchBar from '../../components/search/SearchBar';
import VaccineList from '../../components/search/VaccineList';
import ResidentNavbar from '../../components/navs/ResidentNavbar';

const SearchPage = () => {
  const [vaccines, setVaccines] = useState([]);

  return (<>
  
  
      <ResidentNavbar/>
    <div className='h-screen bg-black text-white flex-col  justify-center items-center '>
      <SearchBar setVaccines={setVaccines} />
      <VaccineList vaccines={vaccines} />
    </div>
  </>
  );
};

export default SearchPage;
