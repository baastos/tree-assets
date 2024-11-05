
export const getCompanies = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/companies`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar as companies');
    }
    const data = await response.json()
    
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const getLocations = async (companyId:string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/companies/${companyId}/locations`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar as locations');
    }
    const data = await response.json()
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const getAssets = async (companyId:string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/companies/${companyId}/assets`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar as assets');
    }
    const data = await response.json()
    
    return data;
  } catch (error) {
    console.error(error);
  }
}
