const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2308-ACC-PT-WEB-PT';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;
//players Endpoint
const playersEndpoint = `https://fsa-puppy-bowl.herokuapp.com/api/2308-ACC-PT-WEB-PT`;
/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
//FETCH ALL PLAYERS -- THIS FUNCTION DOESNT SEEM COMPLETE IT STILL NEEDS TO RENDER TO THE PAGE SO HOW DO I DO IT
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`${playersEndpoint}/players`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error('Uh oh, trouble fetching players!', err);
    return [];
  }
};
//below is console.logs to check if fetch all players is working it can be deleted for final submission
fetchAllPlayers()
  .then((players) => {
    console.log('Players:', players);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// FETCH SINGLE PLAYER
const fetchSinglePlayer = async (playerId) => {
  try {
    //1.defined the API endpoint for single player
    const singlePlayerEndpoint = `${playersEndpoint}/players/${playerId}`;
    //2.make the fetch request
    const response = await fetch(singlePlayerEndpoint);
    //3. handle the response
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    //parse the response to get the player data
    const playerData = await response.json();
    //Return player data
    return playerData;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};
//below is a console.log of a specific player ID to pull up their information it can be deleted for final submission
const playerId = 1192;
fetchSinglePlayer(playerId)
  .then((player) => {
    console.log('Single Player', player);
  })
  .catch((error) => {
    console.log('Error:', error);
  });

//AddNewPlayer- i noticed it keeps adding the same player multiple times instead of just once,
// it may have to do with how forms work so might need to use event.preventDefault() when i start to
//render the players on the page.
const addNewPlayer = async (playerObj) => {
  try {
    //1. define the api endpoint for adding a new player
    const addPlayerEndpoint = `${playersEndpoint}/players`;

    //2. make the fetch request
    const response = await fetch(addPlayerEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerObj),
    });
    //3. Handle the response
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    // parse the response to get any additional info if needed
    const result = await response.json();
    //4. return result
    return result;
  } catch (err) {
    console.error('Oops, something went wrong with adding that player!', err);
  }
};

// Below is a log of how to add a new player and it will be updated in the console. can be deleted
//for final submission just used for testing
const newPlayerData = {
  name: 'Rufus',
  breed: 'Irish Setter',
  // Add other player properties as needed
};
addNewPlayer(newPlayerData)
  .then((result) => {
    console.log('New Player Added:', result);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

//Remove player
const removePlayer = async (playerId) => {
  try {
    const deletePlayerEndpoint = `${playersEndpoint}/players/${playerId}`;
    //make fetch request
    const response = await fetch(deletePlayerEndpoint, {
      method: 'DELETE',
    });

    //handle response
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    //parse response if needed
    const result = await response.json();
    //return result
    return result;
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

// This used for testing it can be deleted before final submission.Assuming you have a player ID to remove
const playerIdToRemove = 1189; // Replace with an actual player ID

// Call the removePlayer function
removePlayer(playerIdToRemove)
  .then((result) => {
    if (result) {
      console.log(`Player #${playerIdToRemove} removed successfully!`);
    } else {
      console.log(`Error removing player #${playerIdToRemove}.`);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players.
 *
 * Then it takes that larger string of HTML and adds it to the DOM.
 *
 * It also adds event listeners to the buttons in each player card.
 *
 * The event listeners are for the "See details" and "Remove from roster" buttons.
 *
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player.
 *
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster.
 *
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
  try {
  } catch (err) {
    console.error('Uh oh, trouble rendering players!', err);
  }
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
  } catch (err) {
    console.error('Uh oh, trouble rendering the new player form!', err);
  }
};

const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

init();
