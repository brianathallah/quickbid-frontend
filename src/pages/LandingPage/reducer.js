/* eslint-disable default-param-last */
export const initialState = {
  products: [],
};

export const resetState = {
  products: [],
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
