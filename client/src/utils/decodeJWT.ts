import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userID: string;
  exp: number;
}

export function decodeJWT(token: string): DecodedToken | null {
  try {
    const decoded: DecodedToken = jwtDecode<DecodedToken>(token);

    const exp = decoded.exp * 1000;

    const now = Date.now();

    if (exp <= now) {
      console.warn("Token has experied");
      localStorage.removeItem("token");
      return null;
    }
    return decoded;
  } catch (error) {
    return null;
  }
}
