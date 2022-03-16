/* eslint-disable default-param-last */
export const initialState = {
  seller_id: "",
  name: "",
  initial_price: "",
  bid_increment: "",
  image_url: "",
  start_time: "",
  end_time: "",
};

export const resetState = {
  seller_id: "",
  name: "",
  initial_price: "",
  bid_increment: "",
  image_url: "",
  start_time: "",
  end_time: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DATA": {
      return { ...state, ...action.payload };
    }

    default: {
      return { ...state };
    }
  }
};
