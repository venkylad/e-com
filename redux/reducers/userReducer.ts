export const userReducer = (state: any = null, action: any) => {
  switch (action.type) {
    case "USER_LOGGED_IN":
      return action.payload;
    case "USER_LOGGED_OUT":
      return action.payload;
    default:
      return state;
  }
};
