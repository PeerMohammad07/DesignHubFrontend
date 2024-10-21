import { useEffect, useState } from 'react';
import './SideBar.scss';
import { useDispatch } from 'react-redux';
import { updateSiteName } from '../../Redux/Slices/canvasSlice';

const RightSidebar = ({ changeActiveTab, tabStatus }: any) => {
  const dispatch = useDispatch()
  const [siteName, setSiteName] = useState('');
  const [lengthName, setLengthName] = useState(100);
  const [selectedPersonality, setSelectedPersonality] = useState('professional');

  useEffect(() => {
    dispatch(updateSiteName(siteName))
  }, [siteName])


  const enterSiteName = (e: any) => {
    const inputValue = e.target.value;
    setSiteName(inputValue);
    setLengthName(100 - inputValue.length);
  };

  const sections = [
    'Intro section',
    'Products section',
    'Services section',
    'Appointments section'
  ];

  const brandOptions = [
    { label: 'Professional', value: 'professional' },
    { label: 'Playful', value: 'playful' },
    { label: 'Sophisticated', value: 'sophisticated' },
    { label: 'Friendly', value: 'friendly' },
    { label: 'Bold', value: 'bold' },
    { label: 'Quirky', value: 'quirky' },
    { label: 'Innovative', value: 'innovative' }
  ];

  const handleSelect = (value: string) => {
    setSelectedPersonality(value);
  };

  return (
    <div className="right-sidebar">
      {tabStatus == "site-info" && <>
        <h2>Choose a site title and brand personality</h2>
        <div className="form-group">
          <label>Site title</label>
          <input
            type="text"
            value={siteName}
            onChange={enterSiteName}
            placeholder="Your site title"
            maxLength={100}
          />
          <span className="char-limit">{lengthName}</span>
        </div>
        <div className="brand-personality">
          <h2>Select a Brand Personality</h2>
          <div className="personality-options">
            {brandOptions.map(option => (
              <button
                key={option.value}
                className={`personality-option ${selectedPersonality === option.value ? 'selected' : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </>
      }{
        tabStatus == "homepage" && <>
          <div className="homepage-builder">
            <h1>Build your homepage</h1>
            <p>Build your homepage section-by-section, adding as many or as few sections as you need.</p>
            <ul className="section-list">
              {sections.map((section, index) => (
                <li key={index}>
                  <label>
                    <input type="checkbox" />
                    <span>{section}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </>
      } 
      <div className="navigation">
        <button className="next-button" onClick={() => {
          changeActiveTab("next",tabStatus)
        }}>NEXT</button>
      </div>
    </div>
  );
};

export default RightSidebar;
