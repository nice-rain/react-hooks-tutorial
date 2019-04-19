import React from 'react';

//Import our Store (context)
import { Store } from './Store';

//React.lazy 
const EpisodesList = React.lazy(() => import('./EpisodesList'));

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


  // Action for toggling which episode is a favorite
  // onClick will call this action which will dispatch to our reducer.
  const toggleFavAction = episode => {
    const episodeInFavourites = state.favourites.includes(episode);
    let dispatchObj = {
      type: 'ADD_FAV',
      payload: episode
    };
    if (episodeInFavourites) {
      const favouritesWithoutEpisode = state.favourites.filter(fav => fav.id !== episode.id)
      dispatchObj = {
        type: 'REMOVE_FAV',
        payload: favouritesWithoutEpisode
      };
    }
    return dispatch(dispatchObj);
  };

  //Similar to componentDidMount, if the app loads with empty state, we call our action.
  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  });

  const props = {
    episodes: state.episodes,
    toggleFavAction: toggleFavAction,
    favourites: state.favourites
  };

  //Note: Eventually we will import Fragment as {Fragment} from react
  return (
    <React.Fragment>
      {/* React.Suspense displays the loading div while we wait for the fetch to complete */}
      <React.Suspense fallback={<div>Loading...</div>}>
      <header className='header'>
        <div>
          <h1>Rick and Morty</h1>
          <p>Pick your favourite episodes</p>
        </div>
        <div>
          Favourite(s) {state.favourites.length}
        </div>
      </header>
        {/* This uses a function to map out each episode into its own div (should just use a component and pass props) */}
        <section className='episode-layout'>
          <EpisodesList {...props} />
        </section>
        </React.Suspense>
    </React.Fragment>
  );
}