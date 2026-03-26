export const useAuth = () => {
  const auth = localStorage.getItem("auth");

  if (!auth) {
    return {
      isAuthenticated: false,
      user: null,
      token: null,
    };
  }

  const parsed = JSON.parse(auth);

  return {
    isAuthenticated: true,
    user: parsed,
    token: parsed.token,
  };
};
