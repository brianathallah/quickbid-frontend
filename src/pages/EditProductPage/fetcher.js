import { ProductURL } from "../../utils/const";
import { post, get } from "../../utils/fetcher";

export const postEditProduct = async ({ fetcher, data }) =>
  post({
    url: `${ProductURL}/edit`,
    body: {
      data,
    },
    fetcher,
    params: {},
  });

export const getProductDetail = async ({ fetcher, params }) =>
  get({
    url: `${ProductURL}/list`,
    fetcher,
    params,
  });
