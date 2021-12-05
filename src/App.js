import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function App() {
  return (
    <div className="game">
      <Board></Board>
    </div>
  );
}

const Board = () => {
  // 1st player is X ie 1
  // State keeps track of next player and gameState
  const [player, setPlayer] = useState(1);
  const [gameState, setGameState] = useState([]);
  let status = `Winner is ${checkForWinner(gameState).player}`;
  console.log(player);

  if (checkForWinner(gameState).winner) {
    Swal.fire({
      title: status,
      text: "Do you want to restart the game?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload(false);
      }
    });
  }

  // Part 1 step 1 code goes here
  // Use conditional logic to set a variable to either 'Player O' or  'Player X'

  const takeTurn = (id) => {
    setGameState([...gameState, { id: id, player: player }]);
    setPlayer((player + 1) % 2); // get next player
    return player;
  };

  function renderSquare(i) {
    // use properties to pass callback function takeTurn to Child
    return <Square takeTurn={takeTurn} id={i}></Square>;
  }

  useEffect(() => {
    try {
      console.log(gameState.at(-1).player);
      console.log(`We have a winner ${status}`);
    } catch (error) {}
  }, [player, gameState, status]);

  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        {/* Part 1 step 2 code goes here. Display the player's turn <h1> */}
        <h1 id="turn">
          {" "}
          Next Pleyer: {player === 0 ? "Player O" : "Player X"}
        </h1>
        <h1>{status}</h1>
      </div>
    </div>
  );
};

const Square = ({ takeTurn, id }) => {
  const mark = ["O", "X", "+"];
  const color = ["white", "red", "black"];
  // id is the square's number
  // filled tells you if square has been filled
  // tik tells you symbol in square (same as player)
  // You call takeTurn to tell Parent that the square has been filled
  const [filled, setFilled] = useState(false);
  const [tik, setTik] = useState(2);

  console.log(`Filled: ${filled}`);

  return (
    <button
      // Part 2: update the return statement below to add css classes
      onClick={() => {
        setTik(takeTurn(id));
        setFilled(true);
        console.log(`Square: ${id} filled by player : ${tik}`);
      }}
    >
      <h1 className={color[tik]}>{mark[tik]}</h1>
    </button>
  );
};

// Checking for Winner takes a bit of work
// Use JavaScript Sets to check players choices
// against winning combinations
// Online there is more compact version but Dr. Williams prefers this one

const win = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // cols
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6],
];

const checkForWinner = (gameState) => {
  // get array of box id's
  // can't be a winner in less than 5 turns
  console.log(gameState);
  // if (gameState.length < 5) return "No Winner Yet";
  let p0 = gameState.filter((item) => {
    if (item.player === 0) return item;
    return null
  });
  p0 = p0.map((item) => item.id);
  let px = gameState.filter((item) => {
    if (item.player === 1) return item;
    return null
  });
  px = px.map((item) => item.id);
  if (p0 != null && px != null) {
    var win0 = win.filter((item) => {
      return isSuperset(new Set(p0), new Set(item));
    });
    var winX = win.filter((item) => {
      return isSuperset(new Set(px), new Set(item));
    });
  }
  if (win0.length > 0)
    return {
      winner: true,
      player: "Player O",
    };
  else if (winX.length > 0)
    return {
      winner: true,
      player: "Player X",
    };

  return {
    winner: false,
    player: "No Winner Yet",
  };
};
// check if subset is in the set
function isSuperset(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}

export default App;
