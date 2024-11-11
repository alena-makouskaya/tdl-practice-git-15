export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

type InitialState = typeof initialState;

const initialState = {
  status: "idle" as RequestStatus,
  error: "TEST ERROR MESSAGE" as string | null
};

export const appReducer = (
  state: InitialState = initialState,
  action: ActionsType
): InitialState => {
  switch (action.type) {
    case "SET-STATUS": {
      return { ...state, status: action.status };
    }
    case "SET-ERROR": {
      return { ...state, error: action.error };
    }
    default:
      return state;
  }
};

export const setAppStatusAC = (status: RequestStatus) =>
  ({ type: "SET-STATUS", status } as const);

export const setAppErrorAC = (error: null | string) =>
  ({ type: "SET-ERROR", error } as const);

type setAppStatusActionType = ReturnType<typeof setAppStatusAC>;
type setAppErrorActionType = ReturnType<typeof setAppErrorAC>;

type ActionsType = setAppStatusActionType | setAppErrorActionType;
