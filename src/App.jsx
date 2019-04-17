import React from 'react';

//Import our Store (context)
import { Store } from './Store';

export default function App() {
  // Declares our state(store) as well as our dispatch to call actions to our reducer
  // useContext is a react hook that gives us access to the 'value' attribute in our store.
  const { state, dispatch } = React.useContext(Store);

  // Action that fetches and returns the type and payload (same as actions in Redux)
  // Note: Normally this would be a global action stored inside of an actions.js file and imported
  const fetchDataAction = async () => {
    const data = await fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes');
    const dataJSON = await data.json();
    
    // In our store, we have a type 'FETCH_DATA' inside our reducer.
    // It returns a new object with the payload inside of it.
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    });
  };

  //Similar to componentDidMount, if the app loads with empty state, we call our action.
  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  });

  //Note: Eventually we will import Fragment as {Fragment} from react
  return (
    <React.Fragment>
      {console.log(state)}
      <div>
        <h1>Rick and Morty</h1>
        <p>Pick your favourite episodes</p>
        {/* This uses a function to map out each episode into its own div (should just use a component and pass props) */}
        <section>
          {state.episodes.map(episode => {
            return (
              <section key={episode.id}>
                <img
                  src={episode.image.medium}
                  alt={`Rick and Morty ${episode.name}`}
                />
                <div>{episode.name}</div>
                <section>
                  <div>
                    Season: {episode.season} Number: {episode.number}
                  </div>
                </section>
              </section>
            );
          })}
        </section>
      </div>
    </React.Fragment>
  );
}