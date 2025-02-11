import { useRecoilValue } from 'recoil';
import { selectedCountryState } from '../recoil/atoms.ts';
import '../styles/Navbar.scss';
import { userState } from '../recoil/atoms';
// import { userState } from "../store/userStore";
import '../styles/Header.scss'
;

const Navbar: React.FC = () => {
  const editingCountryName = useRecoilValue(selectedCountryState);
  const user = useRecoilValue(userState);
  return (
    <nav>
     
      {user ? (
        <div>
          {user.profileImage && (
            <img
              src={`http://localhost:5000/api${user.profileImage}`}
              alt="Profile"
              width="40"
              height="40"
            />
          )}
          <h1>hellow, {user.firstName} </h1>
          <h1>Welcome to the Country Project</h1>
        </div>
      ) : (
        <>
        <h1>Countries Project</h1>
        <h1>לא מחובר</h1>
        </>
      )}
      {editingCountryName && <p>Edit {editingCountryName}</p>}
    </nav>
  );
};

export default Navbar;
