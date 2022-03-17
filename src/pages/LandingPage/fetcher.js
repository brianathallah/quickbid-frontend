import { ProductURL, BidURL } from "../../utils/const";
import { get } from "../../utils/fetcher";

export const getProductList = async ({ fetcher, params }) =>
  get({
    url: `${ProductURL}/list`,
    fetcher,
    params,
  });

export const getProductBid = async ({ fetcher, params }) =>
  get({
    url: `${BidURL}/get`,
    fetcher,
    params,
  });
