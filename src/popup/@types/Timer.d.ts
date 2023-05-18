export interface Timer {
  formatedTime: string;
  hours: number;
  minutes: number;
  seconds: number;
  submited: boolean;
  paused: boolean;
  timerId: number | undefined | false;
  initTimerValue: string;
}

type TimerAction =
  | { type: "UPDATE_TIMER"; payload: Timer }
  | { type: "SUBMIT_FORM"; payload: Timer }
  | { type: "RUN_INTERVAL"; payload: Timer }
  | { type: "FINISH_TIMER"; payload: Timer }
  | { type: "PAUSE_TIMER"; payload: Timer };

export interface dammy {
  [key: string]: any;
}

export type TimerContextType = {
  state: Timer;
  dispatch: Dispatch<TimerAction>;
};

export interface extendProperties
  extends Properties<string | number, string & {}> {
  "--value"?: string | number;
}
