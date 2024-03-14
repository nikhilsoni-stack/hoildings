import {useEffect, useState} from 'react';
import {fetchPortfolioData} from '../service/portfolioService';

import {Holding} from '../types/Holding';

interface PortfolioDataState {
  data: Holding[] | null;
  loading: boolean;
  error: boolean;
}

const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioDataState>({
    data: null,
    loading: true,
    error: false,
  });

  const onRefresh = () => {
    setPortfolioData({
      loading: false,
      error: false,
      data: portfolioData.data,
    });
    fetchData();
  };
  const onRetry = () => {
    setPortfolioData({
      loading: true,
      error: false,
      data: null,
    });
    fetchData();
  };

  const fetchData = async () => {
    try {
      const data = await fetchPortfolioData();
      console.log(data);
      setPortfolioData({
        data: data?.userHolding ?? [],
        loading: false,
        error: false,
      });
    } catch (error) {
      setPortfolioData({
        data: null,
        loading: false,
        error: true,
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return {portfolioData, onRefresh, onRetry};
};

export default usePortfolioData;
