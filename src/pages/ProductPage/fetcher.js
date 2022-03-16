import { BidURL, ProductURL } from "../../utils/const";
import { post, get } from "../../utils/fetcher";

export const postBidValue = async ({ fetcher, data }) =>
  post({
    url: `${BidURL}/bids`,
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

export const getProductHighestBid = async ({ fetcher, params }) =>
  get({
    url: `${BidURL}/gopaycoins/get`,
    fetcher,
    params,
  });
