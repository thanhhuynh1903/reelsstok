export type UserToken = {
  token?: string;
  user_id?: string;
  email?: string;
  username?: string;
  profile_pic?: string;
  bio?: string;
  followers_count?: number;
  following_count?: number;
  posts_count?: number;
  created_at?: string;
  updated_at?: string;
};
interface Token {
  token?: string;
  message?: string;
}
const AUTH_KEY = "authToken";

function getUserDetails(): UserToken {
  if (typeof window === "undefined") return {};
  return JSON.parse(localStorage.getItem(AUTH_KEY) ?? "{}");
}

export default function useAuth() {
  // Get user details
  const getUserDetailsFn = () => getUserDetails();

  // Get token
  const getToken = () => getUserDetails();

  // Set user token
  const setUserToken = (authToken: Token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_KEY, JSON.stringify(authToken.token));
    }
  };

  // Logout
  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  };

  return {
    getUserDetails: getUserDetailsFn,
    getToken,
    setUserToken,
    logout,
  };
}