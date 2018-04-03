declare class Timeout extends Number {
  +ref?: () => this;
  +unref?: () => this;
}

declare function setTimeout(fn: Function, ms?: number): Timeout;
declare function clearTimeout(timeout: Timeout): void;

declare class Interval extends Number {
  +ref?: () => this;
  +unref?: () => this;
}

declare function setInterval(fn: Function, ms?: number): Interval;
declare function clearInterval(timeout: Interval): void;
