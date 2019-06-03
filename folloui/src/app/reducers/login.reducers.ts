import * as LoginActions from './../actions/login.actions';

const isLoggedIn = false;

export function loginReducer(state: boolean = isLoggedIn, action: LoginActions.Actions) {
  switch (action.type) {
    case LoginActions.IS_LOGGED_IN:
      return action.payload;
    default:
      return state;
  }
}
