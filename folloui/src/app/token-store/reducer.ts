import { TokenActionTypes, TokenActions } from './actions';

export let initialToken = null;

export function reducer(state, action: TokenActions) {
  switch (action.type) {
    case TokenActionTypes.ADD_TOKEN:
      console.log('setting token: ');
      console.log(action.payload);
      state = action.payload;
      return state;

    case TokenActionTypes.REMOVE_TOKEN:
      state = null;
      return state;

    default:
    console.log('returning from')
      return state;
  }
}
