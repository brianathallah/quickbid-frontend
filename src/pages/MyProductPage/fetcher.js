import { ProductURL, BidURL } from "../../utils/const";
import { get } from "../../utils/fetcher";

export const getProductListByUserID = async ({ fetcher, params }) =>
  get({
    url: `${ProductURL}/list`,
    fetcher,
    params,
  });

export const getProductBidList = async ({ fetcher, params }) =>
  get({
    url: `${BidURL}/get`,
    fetcher,
    params,
  });
