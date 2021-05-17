export const createAction = (
  name: string,
  payload: (string | number)[] = []
): string => `${name} ${payload.join(" ")}`;

export const getPayload = (action: string): string[] =>
  action.split(" ").slice(1);
