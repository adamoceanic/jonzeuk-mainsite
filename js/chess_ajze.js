var current_position = '';
var board_orientation = '';
var moves = '';
var opponent = 'anebir';
var moves_arr;
var move_pair;
var fen_history_arr;
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
      if (game['white'].indexOf(opponent) != -1 || game['black'].indexOf(opponent) != -1) {
        moves = game['pgn'].split(/\n/).slice(-1)[0];
        moves_arr = moves.split(/\d+[.]/g);

        for (i = 1; i < moves_arr.length; ++i) {
          move_pair = moves_arr[i].trim();
          moves_arr[i] = move_pair.split(/\s/g);

          // remove weird asterisk when not waiting for b move
          if (moves_arr[i].length > 2) {
            moves_arr[i].pop();
          }
        }
        current_position = game['fen'];
        return true;
      }
    });
  }

// coming later
  /*
  function createFenHistory() {
    for (i = 1; i < moves_arr.length; ++i) {
      for (i = 1; i < moves_arr[i].length; ++i) {

      }
    }
  }
  */

  function processMoves() {

    // if empty edge cases need sorting etc..

    var hook_id;
    var scrollable_moves_hook = $("#scrollable-moves");
    var move_hook;
    var move_num;
    var seperator;
    var append_string;

    for (i = 1; i < moves_arr.length; ++i) {
      move_num = i.toString();
      hook_id = "#p" + move_num;
      move_hook = $(hook_id);

      // neatens up the columns
      if (moves_arr[i][0].length == 2) {
        seperator = "&nbsp;&nbsp;&nbsp;&nbsp;";
      }
      else if (moves_arr[i][0].length == 3) {
        seperator = "&nbsp;&nbsp;&nbsp;";
      }
      else if (moves_arr[i][0].length == 4) {
        seperator = "&nbsp;&nbsp";
      }
      else if (moves_arr[i][0].length == 5) {
        seperator = "&nbsp;";
      }

      // ensures the scrollable area fills up correctly as the number of
      // moves increases
      append_string = "<p class=\"pair-margins\">" + move_num
        + ". &nbsp;" + "<b>" + moves_arr[i][0] + seperator + moves_arr[i][1] + "</b>" + "</p>"

      if (i > 12) {
        var darkness;
        if (i % 2 == 0) {
          darkness = "pair-dark";
        } else {
          darkness = "pair-light";
        }
        append_string = "<div class=\"chess-move-pair " + darkness + "\" id=\"p"
          + move_num + "\">" + append_string + "</div>";

        scrollable_moves_hook.append(append_string);
      }
      else {
        move_hook.append(append_string);
      }
      //console.log(board.fen());
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
      processMoves();
      loadPosition(current_position);

    });
});
