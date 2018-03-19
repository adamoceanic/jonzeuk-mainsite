var current_position = '';
var board_orientation;
var opponent = "anebir";
var chess_data;

/*
NEED SOMETHING LIKE CLICKABLE MOVE HISTORY etc
EACH STORES THE FEN OF THE PREVIOUS STEP PLUS THE ANIMATION

JSON THIS INTO A REST API EVENTUALLY WITH PYTHON RUNNING ON AWS!
*/

$(document).ready(function() {
  var board = ChessBoard('board', {
    position: 'start',
    orientation: 'black',
    showNotation: false
  });

  function loadPosition(position) {
    console.log("load position called");
    board.position(position, false);
  }

  function processData(chess_data) {
    chess_data.games.some(function(game){
      if (game['white'].indexOf(opponent) != -1
      || game['black'].indexOf(opponent) != -1) {
         current_position = game['fen'];
         orientation = 'black';
         return true;
      }
    });
  }
 //==============================================================
// get the chess.com JSON

  let url = 'https://api.chess.com/pub/player/ajze/games';
  fetch(url)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        return response.json()
    })
    .then(function(data) {
          chess_data = data;
          //console.log(chess_data);
          processData(chess_data);
    })
    .catch(function(err) {
    console.log('Fetch Error :-S', err);
    })
    .then(function(){
      loadPosition(current_position);
    });
});
