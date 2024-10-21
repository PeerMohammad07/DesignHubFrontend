import './HomePageBuilder.scss';

const HomepageBuilder = () => {
  const sections = [
    'Intro section',
    'Products section',
    'Services section',
    'Appointments section'
  ];

  return (
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
  );
};

export default HomepageBuilder;