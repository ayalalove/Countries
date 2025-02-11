import CountryTable from "../components/CountryTable";
import Navbar from "../components/Navbar";
import "../styles/HomePage.scss"
const HomePage = () => {
    return (
      <div className="home-container">
       
       <Navbar></Navbar>
       <CountryTable></CountryTable>
      </div>
    );
  };
  
  export default HomePage;
  