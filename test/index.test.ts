import { setLongTimeout, clearLongTimeout, TIMEOUT_MAX } from '../src';

const day1 = 1000 * 60 * 60 * 24;
const days30 = day1 * 30;

describe('LongTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('creates Timeout for less than TIMEOUT_MAX', () => {
    const fn = jest.fn();

    setLongTimeout(fn, day1);

    expect(fn).not.toBeCalled();

    jest.runAllTimers();

    expect(setTimeout).toHaveBeenCalledTimes(Math.ceil(day1 / TIMEOUT_MAX));
    expect(setTimeout).toHaveBeenLastCalledWith(fn, day1);
  });

  it('creates Timeout for more than TIMEOUT_MAX', () => {
    const fn = jest.fn();

    setLongTimeout(fn, days30);

    expect(fn).not.toBeCalled();

    jest.runOnlyPendingTimers();

    expect(setTimeout).toHaveBeenNthCalledWith(1, expect.any(Function), TIMEOUT_MAX);

    jest.runOnlyPendingTimers();

    expect(setTimeout).toHaveBeenNthCalledWith(2, fn, days30 - TIMEOUT_MAX);

    expect(setTimeout).toHaveBeenCalledTimes(Math.ceil(days30 / TIMEOUT_MAX));
  });

  it('cancels Timeout before execution', () => {
    const fn = jest.fn();

    const timer = setLongTimeout(fn, day1);

    clearLongTimeout(timer);

    jest.runAllTimers();

    expect(fn).not.toBeCalled();
  });
});
