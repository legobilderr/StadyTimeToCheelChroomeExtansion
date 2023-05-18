export interface anyObject {
  [key: string]: any;
}

export type optionsContextType = {
  state: anyObject;
  dispatch: Dispatch<TimerAction>;
};

export type OptionAction = { type: "UPDATE_SETTINGS"; payload: anyObject };
