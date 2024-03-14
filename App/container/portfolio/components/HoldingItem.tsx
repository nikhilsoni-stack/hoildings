import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import InfoListItem from '../../common/InfoListItem';
import {Holding} from '../types/Holding';
import {getIndividualPNL} from '../utils/holdingUtils';

interface HoldingItemProps {
  holding: Holding;
}

const HoldingItem: React.FC<HoldingItemProps> = ({holding}) => {
  return (
    <View style={styles.container}>
      <InfoListItem
        label={holding.symbol}
        value={holding.ltp.toFixed(2)}
        prefix="LTP: "
        labelStyle={styles.labelStyle}
      />
      <InfoListItem
        label={holding.quantity}
        value={getIndividualPNL(holding)}
        prefix="P/L:"
      />
    </View>
  );
};

export default HoldingItem;

export const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingVertical: 16,
  },
  labelStyle: {
    fontWeight: 'bold',
  },
});
