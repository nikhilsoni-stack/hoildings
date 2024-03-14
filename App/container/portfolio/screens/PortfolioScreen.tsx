import React, {useMemo} from 'react';
import {View, FlatList, StyleSheet, Text, RefreshControl} from 'react-native';

import HoldingItem from '../components/HoldingItem';

import PortfolioSummary from '../components/PortfolioSummary';
import usePortfolioData from '../hooks/usePortfolioData';
import Page from '../../common/Page';

const PortfolioScreen: React.FC = () => {
  const {portfolioData, onRefresh, onRetry} = usePortfolioData();
  const {loading, data: holdings, error} = portfolioData;
  const calculateCurrentValue = useMemo((): number => {
    return (
      holdings?.reduce(
        (total, holding) => total + holding.ltp * holding.quantity,
        0,
      ) ?? 0
    );
  }, [holdings]);

  const calculateInvestmentValue = useMemo((): number => {
    return (
      holdings?.reduce(
        (total, holding) => total + holding.avgPrice * holding.quantity,
        0,
      ) ?? 0
    );
  }, [holdings]);

  const calculateTotalPNL = (): number => {
    return calculateCurrentValue - calculateInvestmentValue;
  };

  const calculateTodaysPNL = (): number => {
    return (
      holdings?.reduce((total, holding) => {
        return total + (holding.avgPrice - holding.ltp) * holding.quantity;
      }, 0) ?? 0
    );
  };

  console.log(loading, 'loading');

  return (
    <Page isLoading={loading} isError={error} retry={onRetry}>
      <View style={styles.headingView}>
        <Text style={styles.holding}>Holdings</Text>
      </View>
      <View style={styles.listView}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={holdings}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
          renderItem={({item}) => <HoldingItem holding={item} />}
        />
      </View>
      <PortfolioSummary
        currentValue={calculateCurrentValue}
        investmentValue={calculateInvestmentValue}
        totalPNL={calculateTotalPNL()}
        todaysPNL={calculateTodaysPNL()}
      />
    </Page>
  );
};

export default PortfolioScreen;

export const styles = StyleSheet.create({
  headingView: {
    backgroundColor: '#4d0749',
  },
  listView: {flex: 1, marginHorizontal: 16},
  holding: {
    fontFamily: 'Arial',
    fontSize: 24,
    color: 'white',
    textAlign: 'left',
    padding: 16,
  },
});
