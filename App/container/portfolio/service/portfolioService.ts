import {fetchData} from './serviceApiUtils';
import {UserHoldingData} from '../types/Holding';

const fetchPortfolioData = async (): Promise<UserHoldingData> => {
  const data = await fetchData(
    'https://run.mocky.io/v3/bde7230e-bc91-43bc-901d-c79d008bddc8',
  );
  return data;
};

export {fetchPortfolioData};
