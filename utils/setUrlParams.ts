import { ReadonlyURLSearchParams } from "next/navigation";

export const setUrlParams = (
  paramName: string,
  paramValue: string,
  searchParams: ReadonlyURLSearchParams
): URLSearchParams => {
  const params = new URLSearchParams(searchParams);

  if (paramValue) {
    params.set(paramName, paramValue);
  } else {
    params.delete(paramName);
  }

  return params;
};
