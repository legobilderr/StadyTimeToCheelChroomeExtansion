import { Reducer } from "react";
import { anyObject, OptionAction } from "../@types/Options";

const optionsReduser: Reducer<anyObject, OptionAction> = (state, action) => {
  switch (action.type) {
    case "UPDATE_SETTINGS":
      return {
        ...state,
        name: action.payload?.name ? action.payload.name : "",
      };
    default:
      return state;
  }
};

export default optionsReduser;
