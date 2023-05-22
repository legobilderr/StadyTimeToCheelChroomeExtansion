import React, { ChangeEvent, FormEvent, useContext } from "react";
import { anyObject, optionsContextType } from "../@types/Options";
import OptionContext from "../context/OptionsContext";

function useSettings() {
  const {
    state: { name },
    dispatch,
  } = useContext(OptionContext) as optionsContextType;

  const submitSettings = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formObj: anyObject = {};

    var formData = new FormData(e.currentTarget).entries();
    for (const [key, value] of formData) {
      formObj[key] = value;
    }

    chrome.storage.sync.set({ name: formObj["name"] }).then(() => {
      console.log("Value is set to " + formObj["name"]);
    });
  };

  const changeOption = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_SETTINGS",
      payload: {
        name: e.currentTarget.value,
      },
    });
  };

  return { submitSettings, changeOption };
}

export default useSettings;
