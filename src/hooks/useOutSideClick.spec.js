/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { useRef } from 'react';
import useOutsideClick from './useOutSideClick';

describe('useOutsideClick Hook', () => {
  let mockCallback;
  let mockElement;

  beforeEach(() => {
    mockCallback = jest.fn();
    mockElement = document.createElement('div');
    document.body.appendChild(mockElement);
  });

  afterEach(() => {
    document.body.removeChild(mockElement);
    jest.clearAllMocks();
  });

  it('need to call the event when clicked outside', () => {
    const { result } = renderHook(() => useOutsideClick(mockCallback));
    
    result.current.current = mockElement;

    fireEvent.mouseDown(document.body);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('not to be called if click the element', () => {
    const { result } = renderHook(() => useOutsideClick(mockCallback));
    
    result.current.current = mockElement;

    fireEvent.mouseDown(mockElement);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('same for touch events outside', () => {
    const { result } = renderHook(() => useOutsideClick(mockCallback));
    
    result.current.current = mockElement;

    fireEvent.touchStart(document.body);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('remove the event on un load', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    
    const { unmount } = renderHook(() => useOutsideClick(mockCallback));
    
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
  });

  it('should not call callback when clicking on excluded element', () => {
    const excludedElement = document.createElement('button');
    document.body.appendChild(excludedElement);
    
    const { result: excludeRefResult } = renderHook(() => useRef(null));
    excludeRefResult.current.current = excludedElement;
    
    const { result } = renderHook(() => useOutsideClick(mockCallback, excludeRefResult.current));
    result.current.current = mockElement;

    fireEvent.mouseDown(excludedElement);

    expect(mockCallback).not.toHaveBeenCalled();
    
    document.body.removeChild(excludedElement);
  });

  it('should call callback when clicking outside both main and excluded elements', () => {
    const excludedElement = document.createElement('button');
    document.body.appendChild(excludedElement);
    
    const { result: excludeRefResult } = renderHook(() => useRef(null));
    excludeRefResult.current.current = excludedElement;
    
    const { result } = renderHook(() => useOutsideClick(mockCallback, excludeRefResult.current));
    result.current.current = mockElement;

    fireEvent.mouseDown(document.body);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    
    document.body.removeChild(excludedElement);
  });
});