type UserToken = {
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

const AUTH_KEY = "authToken";

const useAuth = {
  getUserDetails(): UserToken {
    return JSON.parse(localStorage.getItem(AUTH_KEY) ?? "{}");
  },
  getToken(): string | undefined {
    return this.getUserDetails().token;
  },
  getUserId(): string | undefined {
    return this.getUserDetails().user_id;
  },
  setUserToken(user: UserToken) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  },
  logout() {
    localStorage.removeItem(AUTH_KEY);
  },
};

export default useAuth;