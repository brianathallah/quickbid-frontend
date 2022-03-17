import moment from "moment";

export const UserTypeBuyer = "1";
export const UserTypeSeller = "2";

const BaseURL = process.env.REACT_APP_API_BASE_URL;
export const ProductURL = `${BaseURL}/product`;
export const BidURL = `${BaseURL}/bid`;

export const userMock = {
  user_id: "1234",
  user_type: "2",
  user_name: "brian",
};

export const productMock = {
  name: "Mobil Ferrari",
  image_url:
    "https://cdn.motor1.com/images/mgl/ZoN4r/s1/4x3/ferrari-812-superfast-versione-speciale.webp",
  initial_price: 10000000000,
  bid_increment: 1000000,
  start_time: moment().unix(),
  end_time: moment().unix(),
  seller_name: "Bri**",
};

export const bidMock = {
  value: 100000000000,
  user_name: "Jo***",
};
