/**
 * @jest-environment jsdom
 */
import { debounce } from './common.utils';

describe('common.utils', () => {
  describe('debounce', () => {
    let mockFunction;
    let debouncedFunction;

    beforeEach(() => {
      mockFunction = jest.fn();
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
      jest.clearAllMocks();
    });

    it('function should call after 500ms', () => {
      debouncedFunction = debounce(mockFunction, 500);

      debouncedFunction();
      expect(mockFunction).not.toHaveBeenCalled();
      jest.advanceTimersByTime(500);

      expect(mockFunction).toHaveBeenCalledTimes(1);
    });

    it('need to clear if after 500ms', () => {
      debouncedFunction = debounce(mockFunction, 500);

      debouncedFunction();
      jest.advanceTimersByTime(300);
      debouncedFunction();
      jest.advanceTimersByTime(300);
      expect(mockFunction).not.toHaveBeenCalled();
      jest.advanceTimersByTime(200);
      expect(mockFunction).toHaveBeenCalledTimes(1);
    });

    it('params need to be passed', () => {
      debouncedFunction = debounce(mockFunction, 100);

      const arg1 = 'test';
      const arg2 = { key: 'value' };
      const arg3 = 42;

      debouncedFunction(arg1, arg2, arg3);

      jest.advanceTimersByTime(100);

      expect(mockFunction).toHaveBeenCalledWith(arg1, arg2, arg3);
    });
  });
});
