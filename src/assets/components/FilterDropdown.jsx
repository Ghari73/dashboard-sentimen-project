// src/components/FilterDropdown.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";



const Container = styled.div`
  width: 400px;
  margin: 20px 0 20px auto; /* Pindahkan ke kanan */
  position: relative;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 20px;
  padding-top: 20px;
  background-color: #00bfa5;
  color: #F5FFFF; /* Ubah warna teks */
  font-size: 20px; /* Perbesar font */
  font-weight: 500; /* Atur ketebalan font */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: #009688;
  }
`;


const DropdownContent = styled.div`
  position: absolute; /* Floating dropdown */
  top: 100%; /* Mulai dari bawah button */
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 12px;
  z-index: 1; /* Pastikan muncul di atas elemen lain */
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

const Tabs = styled.div`
  border-bottom: 1px solid #ddd;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  background-color: transparent;
  border: none;
  color:#0E8783;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px; /* Default size */
  font-weight: normal;
  border-bottom: 2px solid transparent; /* Awalnya transparan */

  &.active {
    font-size: 20px; /* Perbesar font */
    font-weight: bold; /* Bikin bold */
    border-bottom: 2px solid #0E8783; /* Tambahkan border bottom */
  }
`;


const VersionTab = styled.div`
  margin-top: 10px;
`;

const DateTab = styled.div`
  margin-top: 10px;
`;

const SelectInput = styled.select`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const DateInput = styled.input`
  width: calc(50% - 5px);
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #888888;
  color: #888888;
  border-radius: 5px;
`;

const ApplyButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #1BB8B3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #009688;
  }
`;

const FilterDropdown = ({ versions, onApplyFilters }) => {
  const [selectedTab, setSelectedTab] = useState('Version');
  const [selectedVersion, setSelectedVersion] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleVersionChange = (e) => {
    setSelectedVersion(e.target.value);
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const applyFilters = () => {
    if (selectedTab === 'Version') {
      onApplyFilters({ version: selectedVersion });
    } else {
      onApplyFilters({ fromDate, toDate });
    }
  };

  return (
    <Container>
      {/* Dropdown Button */}
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        Version / Date
        {isOpen ? <FaChevronUp size={24} /> : <FaChevronDown size={24} />}
      </DropdownButton>

      {/* Dropdown Content */}
      <DropdownContent isOpen={isOpen}>
        {/* Tabs */}
        <Tabs>
          <div className='grid grid-cols-2'>
            <TabButton 
              className={selectedTab === 'Version' ? 'active' : ''} 
              onClick={() => handleTabChange('Version')}
            >
              Version
            </TabButton>
            <TabButton 
              className={selectedTab === 'Date' ? 'active' : ''} 
              onClick={() => handleTabChange('Date')}
            >
              Date
            </TabButton>
          </div>
        </Tabs>

        {/* Tab Content */}
        {selectedTab === 'Version' && (
          <VersionTab>
            <SelectInput 
              value={selectedVersion} 
              onChange={handleVersionChange}
            >
              <option value="">Select Version</option>
              {versions.map((version) => (
                <option key={version} value={version}>
                  {version}
                </option>
              ))}
            </SelectInput>
          </VersionTab>
        )}

        {selectedTab === 'Date' && (
          <DateTab className='px-12 py-10'>
            <p className='text-[#666666] font-medium text-xl'>From</p>
            <DateInput 
              type="date" 
              value={fromDate} 
              onChange={handleFromDateChange}
              placeholder="From"
              style={{ width: "100%" }} 
            />
            <br></br>
            <p className='text-[#666666] font-medium text-xl mt-2'>To</p>
            <DateInput 
              type="date" 
              value={toDate} 
              onChange={handleToDateChange}
              placeholder="To"
              style={{ width: "100%" }} 
            />
          </DateTab>
        )}

        {/* Apply Filters Button */}
        <div className='px-12 py-4'>
          <ApplyButton onClick={applyFilters}>
            Apply Filters
          </ApplyButton>
        </div>
      </DropdownContent>
    </Container>
  );
};

export default FilterDropdown;