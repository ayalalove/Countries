import { atom } from 'recoil';

export const selectedCountryState = atom<string | null>({
  key: 'selectedCountryState',
  default: null,
});
