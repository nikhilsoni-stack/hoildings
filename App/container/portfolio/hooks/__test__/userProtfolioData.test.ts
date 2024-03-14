import {renderHook, act} from '@testing-library/react-hooks';
import {fetchPortfolioData} from '../../service/portfolioService';
import {UserHoldingData} from '../../types/Holding';
import usePortfolioData from '../usePortfolioData';

// Define a type for the mocked function
type FetchPortfolioDataMock = jest.Mock<Promise<UserHoldingData>, []>;

// Mock the fetchPortfolioData function
const mockFetchPortfolioData = fetchPortfolioData as FetchPortfolioDataMock;
jest.mock('../../service/portfolioService', () => ({
  fetchPortfolioData: jest.fn(),
}));
describe('usePortfolioData', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
  });

  it('should fetch portfolio data on mount', async () => {
    // Mock response data
    const responseData = {
      userHolding: [
        {
          symbol: 'TCS',
          quantity: 10,
          ltp: 3250.5,
          avgPrice: 2480.3,
          close: 3312,
        },
      ],
    };
    mockFetchPortfolioData.mockResolvedValue(responseData);

    const {result, waitForNextUpdate} = renderHook(() => usePortfolioData());

    await waitForNextUpdate();

    expect(result.current.portfolioData.loading).toBe(false);
    expect(result.current.portfolioData.error).toBe(false);
    expect(result.current.portfolioData.data).toEqual(responseData.userHolding);
  });

  it('should refresh portfolio data', async () => {
    // Mock initial response data
    const initialData = {
      userHolding: [
        {
          symbol: 'TCS',
          quantity: 10,
          ltp: 3250.5,
          avgPrice: 2480.3,
          close: 3312,
        },
      ],
    };
    mockFetchPortfolioData.mockResolvedValue(initialData);

    const {result, waitForNextUpdate} = renderHook(() => usePortfolioData());

    await waitForNextUpdate();

    // Mock new response data after refresh
    const newData = {
      userHolding: [
        {
          symbol: 'PVM',
          quantity: 120,
          ltp: 4250.5,
          avgPrice: 4480.3,
          close: 4312,
        },
      ],
    };
    mockFetchPortfolioData.mockResolvedValue(newData);

    await act(async () => {
      result.current.onRefresh();
    });

    expect(result.current.portfolioData.loading).toBe(false);
    expect(result.current.portfolioData.error).toBe(false);
    expect(result.current.portfolioData.data).toEqual(newData.userHolding);
  });

  it('should handle retry on error', async () => {
    mockFetchPortfolioData.mockRejectedValue(new Error('Failed to fetch data'));

    const {result, waitForNextUpdate} = renderHook(() => usePortfolioData());

    await waitForNextUpdate();

    await act(async () => {
      result.current.onRetry();
    });

    expect(result.current.portfolioData.loading).toBe(false);
    expect(result.current.portfolioData.error).toBe(true);
    expect(result.current.portfolioData.data).toBeNull();
  });
});
