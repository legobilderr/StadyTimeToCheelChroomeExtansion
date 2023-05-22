import React, { useContext, useEffect } from "react";
import { optionsContextType } from "../@types/Options";
import OptionContext from "../context/OptionsContext";
import useSettings from "../hooks/useSettings";

function MainSettingPage() {
  const { submitSettings, changeOption } = useSettings();
  const { state, dispatch } = useContext(OptionContext) as optionsContextType;

  useEffect(() => {
    chrome.storage.sync.get(["name"], (result) => {
      if (result.name) {
        dispatch({
          type: "UPDATE_SETTINGS",
          payload: {
            name: result.name,
          },
        });
      }
    });
  }, []);
  return (
    <>
      <div className=" container mx-auto px-4">
        <h1 className=" text-2xl">Main extension settings</h1>
        <form className=" mt-6" onSubmit={submitSettings}>
          <div className="form-item-wrapper flex flex-col my-4">
            <label htmlFor="name" className="mb-3">
              Your name
            </label>
            <input
              value={state.name}
              onChange={changeOption}
              id="name"
              name="name"
              type="text"
              placeholder="Write your name"
              className="input input-bordered input-warning w-full max-w-xs"
            />
          </div>
          <button type="submit" className="btn btn-primary ">
            Save
          </button>
        </form>
      </div>
    </>
  );
}

export default MainSettingPage;
