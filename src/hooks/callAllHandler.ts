export type Callback = (...args: any[]) => unknown;

export type FunctionArguments<T extends Callback> = T extends (
  ...args: infer R
) => unknown
  ? R
  : undefined;
export type HandlerCommonType = React.EventHandler<any> | Callback;

export function callAllHandlers<T extends HandlerCommonType>(
  ...fns: (T | undefined)[]
) {
  return function func(event: FunctionArguments<T>[0]) {
    fns.some((fn) => {
      fn?.(event);
      return event.defaultPrevented;
    });
  };
}
