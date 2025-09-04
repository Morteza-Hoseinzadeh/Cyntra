// auth.service.ts
export const getToken = (): string | null => {
  try {
    const storedUserData = localStorage.getItem('authentication-data');
    if (!storedUserData) return null;

    const { token } = JSON.parse(storedUserData);
    return token || null;
  } catch {
    console.error('Invalid data in localStorage for key "authentication-data"');
    return null;
  }
};

export const clearAuthData = () => {
  localStorage.removeItem('authentication-data');
};
