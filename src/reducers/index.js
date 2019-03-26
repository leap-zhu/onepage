import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { RootNavigator } from '../navigators/AppNavigator';

const mainAction = RootNavigator.router.getActionForPathAndParams('Main');

const initialNavState = RootNavigator.router.getStateForAction(
  mainAction
);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    // case 'Login':
    //   nextState = RootNavigator.router.getStateForAction(
    //     NavigationActions.back(),
    //     state
    //   );
    //   break;
    // case 'Logout':
    //   nextState = RootNavigator.router.getStateForAction(
    //     NavigationActions.navigate({ routeName: 'Login' }),
    //     state
    //   );
    //   break;
    default:
      nextState = RootNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
}

const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  nav,
  auth,
});

export default AppReducer;
