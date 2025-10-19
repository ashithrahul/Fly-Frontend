/**
 * @jest-environment jsdom
 */
import { fetchListAPI } from './api.utils';

global.fetch = jest.fn();

describe('api.utils', () => {
  describe('fetchListAPI', () => {
    beforeEach(() => {
      fetch.mockClear();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('return data correclty', async () => {
      const mockData = {
        results: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' }
        ],
        total: 2
      };

      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockData)
      };

      fetch.mockResolvedValue(mockResponse);

      const url = 'https://api.example.com/data';
      const result = await fetchListAPI({ url });

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(url);
      expect(mockResponse.json).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockData);
    });

    it('mocked with empty data', async () => {
      const mockData = { results: [], total: 0 };

      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockData)
      };

      fetch.mockResolvedValue(mockResponse);

      const url = 'https://api.example.com/empty';
      const result = await fetchListAPI({ url });

      expect(result).toEqual(mockData);
    });

    it('error on 404', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found'
      };

      fetch.mockResolvedValue(mockResponse);

      const url = 'https://api.example.com/notfound';
      
      await expect(fetchListAPI({ url })).rejects.toThrow('Network error');
      expect(fetch).toHaveBeenCalledWith(url);
    });

  });
});