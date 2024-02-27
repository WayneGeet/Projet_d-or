import { getData, setData } from "nuxt-storage/local-storage";
import { jwtDecode } from "jwt-decode";

export const hasexp = (accessToken) => {
  const dayjs = useDayjs();
  const expirationTime = jwtDecode(`${accessToken}`).exp;
  const isExpired = dayjs.unix(expirationTime).diff(dayjs()) < 1;
  return isExpired;
};

export const getSlug = (accessToken) => {
  const token = jwtDecode(accessToken);
  return token.slug;
};
