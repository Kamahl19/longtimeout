export const TIMEOUT_MAX = 2147483647; // 2^31-1

class LongTimeout {
  private timeout?: NodeJS.Timeout;
  private unreffed: boolean;

  constructor(private listener: (...args: any[]) => void, private after: number) {
    this.unreffed = false;
    this.start();
  }

  start = () => {
    if (this.after <= TIMEOUT_MAX) {
      this.timeout = setTimeout(this.listener, this.after);
    } else {
      this.timeout = setTimeout(() => {
        this.after -= TIMEOUT_MAX;
        this.start();
      }, TIMEOUT_MAX);
    }
    if (this.unreffed) {
      this.timeout.unref();
    }
  };

  close = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  };

  unref = () => {
    if (!this.unreffed) {
      this.unreffed = true;
      this.timeout?.unref();
    }
  };

  ref = () => {
    if (this.unreffed) {
      this.unreffed = false;
      this.timeout?.ref();
    }
  };
}

export const setLongTimeout = (...args: ConstructorParameters<typeof LongTimeout>) =>
  new LongTimeout(...args);

export const clearLongTimeout = (timer: LongTimeout) => timer.close();
