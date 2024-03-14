import {getIndividualPNL} from '../holdingUtils';
import {it, describe, expect} from '@jest/globals';

describe('getIndividualPNL function', () => {
  it('calculates PNL correctly', () => {
    // Mock Holding objects for testing
    const holding1 = {symbol: 'TATA', avgPrice: 100, quantity: 10, ltp: 110}; // holding with profit
    const holding2 = {symbol: 'TATA', avgPrice: 100, quantity: 10, ltp: 90}; // holding with loss

    // Test calculations
    expect(getIndividualPNL(holding1)).toBe('₹ 100.00'); // Expected profit: ₹ 100.00
    expect(getIndividualPNL(holding2)).toBe('₹ -100.00'); // Expected loss: ₹ -100.00
  });

  it('handles invalid input gracefully', () => {
    // Test NaN input
    const holding = {symbol: '', avgPrice: NaN, quantity: NaN, ltp: NaN};

    // Expected result is '--' when any input is NaN
    expect(getIndividualPNL(holding)).toBe('--');
  });
});
