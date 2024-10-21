import Navbar from '../../Components/Navbar/Navbar'
import './Home.scss'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="website-container">
        <div className="image-space">
          <img src="/design_Hub_image.webp" alt="Soap for every body" />
        </div>
        <div className="content">
          <h1>Create a Website</h1>

          <div className="feature">
            <h2>Sell your products and offerings</h2>
            <p>Set up an online store, book appointments, invoice clients, and sell your skills—all on a single platform built just for you.</p>
          </div>

          <div className="feature">
            <h2>Market your business</h2>
            <p>On-brand email campaigns and social tools make it easy to retain customers and grow your base.</p>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home
