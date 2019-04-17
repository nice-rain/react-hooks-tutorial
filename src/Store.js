import React from 'react'

//Create a context object (similar to redux store) that can be accessed by all children.
export const Store = React.createContext();


//Stores our default state values (same as we had in Redux)
const initialState = {
    episodes: [],
    favourites: []
  };

//Same reducer setup that we had in react-redux
function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_DATA':
        return { ...state, episodes: action.payload }; //Seems to be shorthand for object.assign
      default:
        return state;
    }
}

//Props will allow us to get access to the other children components
export function StoreProvider(props) {
    
    // useReducer is a hook that is the same as using a reducer in redux.
    // This is preferable to useState when you have more complex logic or components.
    const [state, dispatch] = React.useReducer(reducer, initialState);

    //Assigns value to an object containing our state and our dispatch
    const value = { state, dispatch };

    //Setup our provider to use our state value (in our store)
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
  }