const fetchData = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    //console.error('Error fetching data:', error);
    throw error;
  }
};

export {fetchData};
