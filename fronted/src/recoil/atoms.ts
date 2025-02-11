import { atom } from 'recoil';
import { IUser } from '../types/user';
import { useSetRecoilState } from "recoil";

export const selectedCountryState = atom<string | null>({
  key: 'selectedCountryState',
  default: null,
});




export const userState = atom<IUser | null>({
  key: "userState",
  default: null, 
});


export const useUserStore = () => {
  const setUser = useSetRecoilState(userState); 
  return { setUser };
};

