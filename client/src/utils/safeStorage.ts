export const safeStorage = {
  getItem: (key: string) => {
    try {
      if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
      }
      return null;
    } catch {
      return null;
    }
  },
  
  setItem: (key: string, value: string) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
      }
    } catch {
      console.error('Error setting item in localStorage');
    }
  },
  
  removeItem: (key: string) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch {
      console.error('Error removing item from localStorage');
    }
  }
};