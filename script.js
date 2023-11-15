const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2308-ACC-PT-WEB-PT-B';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

const state = {
  players: [],
};
/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
//FETCH ALL PLAYERS
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`${APIURL}/players`);
    if (!response.ok) {
      throw new Error('Failed to fetch players');
    }

    const result = await response.json();
    const players = result.data.players;

    return players;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
};

// FETCH SINGLE PLAYER
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}/players/${playerId}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const playerData = await response.json();
    console.log(`Player Details for ID ${playerId}:`, playerData);

    return playerData;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    return null;
  }
};

//AddNewPlayer-
const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(`${APIURL}/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerObj),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('New Player Added:', result);

    // Add the new player to the state
    state.players.push(result);

    return result;
  } catch (err) {
    console.error('Oops, something went wrong with adding that player!', err);
    return null;
  }
};

//Remove player
const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}/players/${playerId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Remove the player from the state
    state.players = state.players.filter((player) => player.id !== playerId);

    console.log(`Player #${playerId} removed successfully!`);
    return true;
  } catch (err) {
    console.error(`Error removing player #${playerId}.`, err);
    return false;
  }
};

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
const renderAllPlayers = (players) => {
  const playersContainer = document.getElementById('all-players-container');

  if (!players || players.length === 0) {
    playersContainer.innerHTML = '<p>No players to render.</p>';
    return;
  }

  const playerContainerHTML = players
    .map((player) => {
      return `
      <div class="player">
        <img src="${player.imageUrl}" alt="${player.name}">
        <p>Name: ${player.name}</p>
        <p>Breed: ${player.breed}</p>
        <p>Status: ${player.status}</p>
        <button class="details-button" data-player-id="${player.id}">See details</button>
        <button class="remove-button" data-player-id="${player.id}">Remove from roster</button>
      </div>
    `;
    })
    .join('');

  playersContainer.innerHTML = playerContainerHTML;

  // Add event listeners to the buttons
  playersContainer.querySelectorAll('.details-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const playerId = event.target.dataset.playerId;
      fetchSinglePlayer(playerId)
        .then((playerDetails) => {
          // Handle displaying player details as needed
        })
        .catch((error) => {
          console.error('Error fetching player details:', error);
        });
    });
  });

  playersContainer.querySelectorAll('.remove-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const playerId = event.target.dataset.playerId;
      removePlayer(playerId)
        .then((result) => {
          console.log('Player removed:', result);
          // Handle any UI updates after removing the player
        })
        .catch((error) => {
          console.error('Error removing player:', error);
        });
    });
  });
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    //  form element
    const form = document.createElement('form');
    form.id = 'add-player-form';

    //  input fields for name and breed
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Enter name';
    nameInput.name = 'name';

    const breedInput = document.createElement('input');
    breedInput.type = 'text';
    breedInput.placeholder = 'Enter breed';
    breedInput.name = 'breed';

    //  submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add Player';

    // Add event listener to the form for submission
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevents the default form submission behavior

      // Get input values
      const name = nameInput.value.trim();
      const breed = breedInput.value.trim();

      // Check if both name and breed are provided
      if (name && breed) {
        // Create an object with player data
        const newPlayerData = { name, breed };

        // Call the addNewPlayer function to add the new player
        try {
          const result = await addNewPlayer(newPlayerData);
          console.log('New Player Added:', result);

          // After adding the new player, fetch all players and render them
          const updatedPlayers = await fetchAllPlayers();
          renderAllPlayers(updatedPlayers);
        } catch (error) {
          console.error('Error adding new player:', error);
        }

        // Clear the form inputs after submission
        nameInput.value = '';
        breedInput.value = '';
      } else {
        console.log('Please enter both name and breed.');
      }
    });

    // Append input fields and submit button to the form
    form.appendChild(nameInput);
    form.appendChild(breedInput);
    form.appendChild(submitButton);

    // Append the form to the newPlayerFormContainer
    const newPlayerFormContainer = document.getElementById('new-player-form');
    newPlayerFormContainer.appendChild(form);
  } catch (err) {
    console.error('Uh oh, trouble rendering the new player form!', err);
  }
};

const init = async () => {
  try {
    const players = await fetchAllPlayers();
    console.log('Fetched Players:', players);
    renderAllPlayers(players);

    renderNewPlayerForm();
  } catch (error) {
    console.error('Error initializing:', error);
  }
};

init();
