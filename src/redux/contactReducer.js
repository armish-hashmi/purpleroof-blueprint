const initialState = {
  name: "",
  email: "",
  phone: "",
  countryCode: "+92",
  subject: "",
  message: "",
  status: "idle", 
};

export const FIELD_CHANGED = "contact/fieldChanged";
export const SUBMIT_STARTED = "contact/submitStarted";
export const SUBMIT_SUCCEEDED = "contact/submitSucceeded";
export const SUBMIT_FAILED = "contact/submitFailed";
export const FORM_RESET = "contact/formReset";

export const fieldChanged = (field, value) => ({
  type: FIELD_CHANGED,
  payload: { field, value },
});
export const submitStarted = () => ({ type: SUBMIT_STARTED });
export const submitSucceeded = () => ({ type: SUBMIT_SUCCEEDED });
export const submitFailed = () => ({ type: SUBMIT_FAILED });
export const formReset = () => ({ type: FORM_RESET });

export default function contactReducer(state = initialState, action) {
  switch (action.type) {
    case FIELD_CHANGED:
      return { ...state, [action.payload.field]: action.payload.value };
    case SUBMIT_STARTED:
      return { ...state, status: "submitting" };
    case SUBMIT_SUCCEEDED:
      return { ...initialState, status: "success" };
    case SUBMIT_FAILED:
      return { ...state, status: "error" };
    case FORM_RESET:
      return initialState;
    default:
      return state;
  }
}
