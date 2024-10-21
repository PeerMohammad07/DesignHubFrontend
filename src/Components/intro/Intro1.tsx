import './intro1.scss';

const Intro1 = () => {
  return (
    <div className="hero-section">
      <header>
        <h1>Your Site Title</h1>
        <nav>
          <ul>
            <li><a href="#shop">Shop</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <div className="hero-content">
        <h2>Introduce your brand</h2>
      </div>
    </div>
  );
};

export default Intro1;


