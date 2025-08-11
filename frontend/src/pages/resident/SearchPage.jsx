import React, { useState } from 'react';
import SearchBar from '../../components/search/SearchBar';
import VaccineList from '../../components/search/VaccineList';
import RoleNavbar from '../../components/navs/RoleNavbar.jsx';

const SearchPage = () => {
  const [vaccines, setVaccines] = useState([]);

  return (<>
  
  
      <RoleNavbar/>
    <div className='h-screen bg-black text-white flex-col  justify-center items-center '>
      <SearchBar setVaccines={setVaccines} />
      <VaccineList vaccines={vaccines} />
    </div>
  </>
  );
};

export default SearchPage;
