

export async function fetchWithRefresh(url, options = {}) {
  
  let response = await fetch(url, {
    ...options,
    credentials: 'include', 
  });

  if (response.status === 401) {
    try {
      const refreshResponse = await fetch('http://localhost:5000/user/refresh-token', {
        method: 'POST',
        credentials: 'include', 
      });

      if (!refreshResponse.ok) {
        throw new Error('Refresh token expired');
      }

      
      response = await fetch(url, {
        ...options,
        credentials: 'include',
      });
    } catch (error) {
      console.error("Token refresh failed:", error);
      throw new Error('Session expired. Please login again.');
    }
  }

  return response;
}
