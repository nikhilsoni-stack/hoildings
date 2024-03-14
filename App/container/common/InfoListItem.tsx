import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface InfoListItemProps {
  label: String | number;
  value: String | number;
  style?: Object;
  prefix?: String | null;
  labelStyle?: Object;
  valueStyle?: Object;
}

const InfoListItem: React.FC<InfoListItemProps> = ({
  label,
  value,
  style,
  prefix,
  labelStyle,
  valueStyle,
}) => {
  return (
    <View style={[styles.symbolView, style]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View style={styles.valueView}>
        {prefix ? <Text style={styles.prefix}>{prefix}</Text> : null}
        <Text style={[styles.value, valueStyle]}>{value}</Text>
      </View>
    </View>
  );
};

export default InfoListItem;

export const styles = StyleSheet.create({
  symbolView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {fontFamily: 'Arial', fontSize: 16, color: 'black', flex: 1},
  value: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: 'black',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  prefix: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: 'black',
    textAlign: 'right',
  },
  valueView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
