import {Holding} from '../types/Holding';

export const getIndividualPNL = (holding: Holding): String => {
  const investedValue = holding.avgPrice * holding.quantity;
  const currentValue = holding.ltp * holding.quantity;
  const pnl = currentValue - investedValue;
  return isNaN(pnl)
    ? '--'
    : addCommasAndRupeeSignToNumber(pnl.toFixed(2), true);
};

export const addCommasAndRupeeSignToNumber = (
  number: String | number,
  rupeeSignRequired: boolean,
): String => {
  //@ts-ignore
  if (isNaN(number)) {
    return number.toString();
  }
  let prefix = '';
  if (rupeeSignRequired) {
    prefix = '₹ ';
  }
  return prefix + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
