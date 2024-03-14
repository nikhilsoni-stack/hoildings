import React, {useState} from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import InfoListItem from '../../common/InfoListItem';
import {addCommasAndRupeeSignToNumber} from '../utils/holdingUtils';

interface PortfolioSummaryProps {
  currentValue: number;
  investmentValue: number;
  totalPNL: number;
  todaysPNL: number;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  currentValue,
  investmentValue,
  totalPNL,
  todaysPNL,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={toggleExpand}
        hitSlop={{top: 50, bottom: 500, left: 200, right: 200}}>
        <Icon
          name={expanded ? 'triangle-down' : 'triangle-up'}
          color={'black'}
          size={32}
          style={{alignSelf: 'center'}}
        />
      </TouchableWithoutFeedback>

      {expanded && (
        <View style={styles.summaryContainer}>
          <InfoListItem
            label={'Current Value:'}
            value={addCommasAndRupeeSignToNumber(currentValue.toFixed(2), true)}
            style={styles.infoContainer}
            labelStyle={styles.labelStyle}
            valueStyle={styles.valueStyle}
          />
          <InfoListItem
            label={'Total Investment:'}
            value={addCommasAndRupeeSignToNumber(
              investmentValue.toFixed(2),
              true,
            )}
            style={styles.infoContainer}
            labelStyle={styles.labelStyle}
            valueStyle={styles.valueStyle}
          />
          <InfoListItem
            label={`Today's Profit & Loss`}
            value={addCommasAndRupeeSignToNumber(todaysPNL.toFixed(2), true)}
            style={styles.infoContainer}
            labelStyle={styles.labelStyle}
            valueStyle={styles.valueStyle}
          />
        </View>
      )}
      <InfoListItem
        label={`Profit & Loss`}
        value={addCommasAndRupeeSignToNumber(totalPNL.toFixed(2), true)}
        style={styles.profitContainer}
        labelStyle={styles.labelStyle}
        valueStyle={styles.valueStyle}
      />
    </View>
  );
};

export default PortfolioSummary;

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    borderTopWidth: 1,
    borderColor: 'black',
  },
  summaryContainer: {marginVertical: 16},
  labelStyle: {
    fontWeight: 'bold',
  },
  valueStyle: {
    fontWeight: 'normal',
  },

  infoContainer: {
    marginVertical: 8,
  },
  profitContainer: {
    marginBottom: 16,
  },
});
