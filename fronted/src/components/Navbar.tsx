import { useRecoilValue } from 'recoil';
import { selectedCountryState } from '../recoil/atoms.ts';
import '../styles/Navbar.scss';

const Navbar: React.FC = () => {
  const editingCountryName = useRecoilValue(selectedCountryState);

  return (
    <nav>
      <h1>Countries Project</h1>

      {editingCountryName && <p>Edit {editingCountryName}</p>}
    </nav>
  );
};

export default Navbar;
