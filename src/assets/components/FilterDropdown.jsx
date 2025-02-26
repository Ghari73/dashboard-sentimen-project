// src/components/FilterDropdown.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  margin: 20px auto;
  position: relative; /* Agar child absolute berada di dalam container */
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #00bfa5;
  color: white;
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
  border-radius: 4px;
  z-index: 1; /* Pastikan muncul di atas elemen lain */
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &.active {
    background-color: #00bfa5;
    color: white;
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
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ApplyButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #00bfa5;
  color: white;
  border: none;
  border-radius: 4px;
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
        <span>▼</span>
      </DropdownButton>

      {/* Dropdown Content */}
      <DropdownContent isOpen={isOpen}>
        {/* Tabs */}
        <Tabs>
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
          <DateTab className='p-12'>
            <p>From</p>
            <DateInput 
              type="date" 
              value={fromDate} 
              onChange={handleFromDateChange}
              placeholder="From"
              style={{ width: "100%" }} 
            />
            <br></br>
            <p>To</p>
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
        <ApplyButton onClick={applyFilters}>
          Apply Filters
        </ApplyButton>
      </DropdownContent>
    </Container>
  );
};

export default FilterDropdown;