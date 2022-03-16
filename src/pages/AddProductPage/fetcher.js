import { ProductURL } from "../../utils/const";
import { post } from "../../utils/fetcher";

export const postUploadProduct = async ({ fetcher, data }) =>
  post({
    url: `${ProductURL}/add`,
    body: {
      data,
    },
    fetcher,
    params: {},
  });
