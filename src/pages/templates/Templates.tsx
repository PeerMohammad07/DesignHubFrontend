// import { useState } from "react";
// import './Templates.scss'
// import RightSidebar from "../SideBar/SideBar";
// import { useSelector } from "react-redux";
// import { RootState } from "../../Redux/store";
// import Intro1 from "../../Components/intro/Intro1";
// import Intro2 from "../../Components/intro/Intro2";


// const Templates = () => {
//   const [activeTab, setActiveTab] = useState('site-info');

//   const siteName = useSelector((state: RootState) => state.canvas.siteName)
//   const canvasDetails = useSelector((state:RootState)=> state.canvas.canvas)

//   const handleTabChange = (tab: any) => {
//     setActiveTab(tab);
//   };
//   const steps = ["Site Info",
//     "Homepage",
//     "Pages",
//     "Colors",
//     "Fonts"
//   ]

//   const changeActiveTab = (tab: string) => {
//     setActiveTab(tab)
//   }

//   return (
//     <>
//       <div className="setup-container">
//         <div className="content-wrapper">
//           <div className="left-content-area">
//             {activeTab === "site-info" && <div>
//               <h1>{siteName}</h1>
//             </div>}
//             {activeTab === "Homepage" && <>
//               <div>
//               {canvasDetails.length == 0 ? <>
//                 <div>
//                   <h1>Add Sections to build your homepage</h1>
//                   <p>Your homepage will showcase what your site is about and what you offer.</p>
//                 </div>
//               </> : <>
//               <Intro2/>
//               </>}
//               </div>
//             </>}
//           </div>
//           <div className="">
//             <RightSidebar changeActiveTab={changeActiveTab} tabStatus={activeTab}/>
//           </div>
//         </div>
//         <div className="tab-navigation">
//           <span
//             className={`tab-item ${activeTab === 'site-info' ? 'active' : ''}`}
//             onClick={() => handleTabChange('site-info')}
//           >
//             SITE INFO
//           </span>
//           <span
//             className={`tab-item ${activeTab === 'pages' ? 'active' : ''}`}
//             onClick={() => handleTabChange('pages')}
//           >
//             PAGES
//           </span>
//           <span
//             className={`tab-item ${activeTab === 'colors' ? 'active' : ''}`}
//             onClick={() => handleTabChange('colors')}
//           >
//             COLORS
//           </span>
//           <span
//             className={`tab-item ${activeTab === 'fonts' ? 'active' : ''}`}
//             onClick={() => handleTabChange('fonts')}
//           >
//             FONTS
//           </span>
//         </div>

//         <div className="navigation">
//           <button className="next-button">NEXT</button>
//         </div>
//       </div>

//     </>
//   )
// }
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import RightSidebar from "../SideBar/SideBar";
import './Templates.scss';

const Templates: React.FC = () => {
  const [activeTab, setActiveTab] = useState('site-info');
  const siteName = useSelector((state: RootState) => state.canvas.siteName);
  const canvasDetails = useSelector((state: RootState) => state.canvas.canvas);

  const pages = ["site-info", "homepage", "pages", "colors", "fonts"];

  const handleTabChange = (state: string, tab: string) => {
    if (state === "next") {
      const index = pages.indexOf(tab);
      if (pages[index + 1]) {
        setActiveTab(pages[index + 1]);
      }
    } else if (state === "back") {
      const index = pages.indexOf(tab);
      if (pages[index - 1]) {
        setActiveTab(pages[index - 1]);
      }
    } else {
      setActiveTab(tab);
    }
  };

  const renderLeftContent = () => {
    switch (activeTab) {
      case 'site-info':
        return (
          <div className="site-info">
            <h2>{siteName || "Your Site"}</h2>
            <p>Welcome to your site setup. Here you can customize various aspects of your website.</p>
          </div>
        );
      case 'homepage':
        return (
          <div className="site-preview">
            <div className="site-header">
              <span>{siteName || "Your Site Title"}</span>
              <nav>Menu</nav>
            </div>
            <div className="hero-image">
              <div className="hero-text">Introduce your brand</div>
            </div>
          </div>
        );
      case 'colors':
        return (
          <div className="color-palette">
            <h2>Color Palette</h2>
            <div className="color-samples">
              {/* Add color sample divs here */}
            </div>
          </div>
        );
      case 'pages':
        return (
          <div className="pages-preview">
            <h2>Site Pages</h2>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Services</li>
              <li>Contact</li>
            </ul>
          </div>
        );
      case 'fonts':
        return (
          <div className="font-preview">
            <h2>Typography</h2>
            <p style={{ fontFamily: 'Arial' }}>This is Arial</p>
            <p style={{ fontFamily: 'Helvetica' }}>This is Helvetica</p>
            <p style={{ fontFamily: 'Times New Roman' }}>This is Times New Roman</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="setup-container">
      <header className="header">
        <div className="logo">Design Hub</div>
        <button className="close-button">&times;</button>
      </header>
      
      <div className="content-wrapper">
        <div className="left-content-area">
          {renderLeftContent()}
        </div>
        <div className="right-content-area">
            <RightSidebar changeActiveTab={handleTabChange} tabStatus={activeTab} />
        </div>
      </div>

      <div className="tab-navigation">
        <button className="back-button" onClick={() => handleTabChange("back", activeTab)}>
          BACK
        </button>
        <div className="tabs">
          {pages.map((page) => (
            <div
              key={page}
              className={`tab-item ${activeTab === page ? 'active' : ''}`}
              onClick={() => handleTabChange('', page)}
            >
              {page.toUpperCase().replace('-', ' ')}
            </div>
          ))}
        </div>
        <button className="next-button" onClick={() => handleTabChange("next", activeTab)}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Templates;