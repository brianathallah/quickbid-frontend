/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-return-await */
import qs from "qs";

export const fetcher = async (url, options) => {
  const pathname = new URL(url).pathname || "";
  const { responseType = "" } = options;

  try {
    const res = await fetch(url, options);

    // return response json on success
    if (res.status >= 200 && res.status <= 299) {
      try {
        if (responseType === "raw") {
          return res;
        }
        if (responseType === "blob") {
          return await res.blob();
        }

        const data = await res.json();
        if (!data) {
          console.error(
            `[API error]: Message: Wrong data format from API,  Path: ${pathname}`
          );
          throw new Error("error not formated json api");
        }
        return data;
      } catch (err) {
        return err;
      }
    } else if (res.status >= 400 && res.status !== 401 && res.status !== 403) {
      console.error(
        `[API error]: Message: Failed fetching API, Path: ${pathname}, Status: ${res.status}`
      );
    }

    // return object on error
    return {
      url,
      is_error: true,
      status: res.status,
      response: await res.json(),
    };
  } catch (err) {
    return {
      is_error: true,
      status: 500,
      error: err,
    };
  }
};

export const get = async ({ url, params, fetcher }) => {
  const resourceURL = new URL(url);
  resourceURL.search = new URLSearchParams(qs.stringify(params));

  const requestOptions = {
    method: "GET",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  return await fetcher(resourceURL, requestOptions);
};

export const post = async ({ url, params, body, fetcher }) => {
  const resourceURL = new URL(url);
  resourceURL.search = new URLSearchParams(qs.stringify(params));

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  return await fetcher(resourceURL, requestOptions);
};
