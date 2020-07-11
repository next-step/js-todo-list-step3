export const isValidContent = (content) => {
  if (typeof content === 'string' && content.trim()) {
    return true;
  }

  return false;
};

export const requestApi = async (url, option) => {
  try {
    const response = await fetch(url, option);
    const data = await response.json();
    if (!response.ok) {
      return { error: response, errorMessage: data.message || '요청 실패' };
    }
    return { result: data };
  } catch (error) {
    return { error, errorMessage: '요청 실패' };
  }
};
