var current_position = '';
var board_orientation = '';
var moves = '';
var opponent = 'anebir';
var chess_data;

/*
NEED SOMETHING LIKE CLICKABLE MOVE HISTORY etc
EACH STORES THE FEN OF THE PREVIOUS STEP PLUS THE ANIMATION

JSON THIS INTO A REST API EVENTUALLY WITH PYTHON RUNNING ON AWS!
*/

$(document).ready(function() {



  var board = ChessBoard('board', {
    position: 'start',
    orientation: 'black', // find way to not hardcode this
    showNotation: false
  });

  function loadPosition(position) {
    board.position(position, false);
  }

  function processData(chess_data) {
    chess_data.games.some(function(game){
      if (game['white'].indexOf(opponent) != -1
      || game['black'].indexOf(opponent) != -1) {

        moves = game['pgn'].split(/\n/).slice(-1)[0];
        current_position = game['fen'];
        return true;
      }
    });
  }

  function processMoves() {

    // if empty ..
    // if less than 10 etc...

    var moves_arr = moves.split(/\d+[.]/g);
    var hook_id;
    var hook;
    var move_num;
    var move_pair;
    var pair_arr;
    var seperator;

    for (i = 1; i < moves_arr.length; ++i) {
      move_pair = moves_arr[i].trim();
      pair_arr = move_pair.split(/\s/g);
      move_num = i.toString();
      hook_id = "#p" + move_num;
      hook = $(hook_id);
      if (pair_arr[0].length == 2) {
        seperator = "&nbsp;&nbsp;&nbsp;&nbsp;";
      }
      else if (pair_arr[0].length == 3) {
        seperator = "&nbsp;&nbsp;&nbsp;";
      }
      else if (pair_arr[0].length == 4) {
        seperator = "&nbsp;&nbsp";
      }
      else if (pair_arr[0].length == 5) {
        seperator = "&nbsp;";
      }

      hook.append("<p class=\"pair-margins\">" + move_num + ". " + pair_arr[0] + seperator + pair_arr[1] +  "</p>");
    }
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
      processMoves();
    });
});
