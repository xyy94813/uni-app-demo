export const safeExecuteDecorator = <
  FN extends (...args: any) => any = (...args: any) => any
>(
  fn: FN,
  defaultResult: any,
  debug?: true
) => {
  return (...args: Parameters<typeof fn>): ReturnType<typeof fn> => {
    try {
      return fn(...args);
    } catch (error) {
      if (debug) console.error(error);
      return defaultResult;
    }
  };
};

export const safeExecuteFn = (
  fn: (...args: any) => any,
  defaultResult: any,
  debug?: true
) => {
  const safeFn = safeExecuteDecorator(fn, defaultResult, debug);
  return safeFn();
};
