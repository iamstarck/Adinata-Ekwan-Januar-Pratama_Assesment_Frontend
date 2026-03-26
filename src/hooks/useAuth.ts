export const tokenStorageVariable = "token";

export const useAuth = () => {
  const token = localStorage.getItem(tokenStorageVariable);

  return {
    isAuthenticated: !!token,
    token,
  };
};
