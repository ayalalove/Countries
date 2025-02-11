


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditCountryForm from './components/EditCountryForm.tsx';

import { RecoilRoot } from 'recoil'; // import RecoilRoot
import ErrorBoundary from './components/ErrorBoundary.tsx';
import SignUp from './components/SignUp.tsx';
import Login from './components/Login.tsx';
import HomePage from './pages/HomePage.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
    <ToastContainer />
    <ErrorBoundary>
    <RecoilRoot>
      <Router>
     
        <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<HomePage />} />
      
        
          <Route path="/" element= {
            <div>
              <SignUp/>
              <Login/>
           
            </div>
          } />

          <Route path="/edit/:id" element={<EditCountryForm />} />
     
        </Routes>
      </Router>
    </RecoilRoot>
    </ErrorBoundary>
    </>
  );
};

export default App;
