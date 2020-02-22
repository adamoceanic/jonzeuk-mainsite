var current_position = '';
var board_orientation = '';
var moves = '';
var opponent = 'anebir';
var moves_arr;
var move_pair;
var fen_history;
var chess_data;

/*
JSON THIS INTO A REST API EVENTUALLY WITH PYTHON RUNNING ON AWS!
*/

$(document).ready(function() {

  var board = ChessBoard('board', {
    position: 'start',
    orientation: 'black', // find way to not hardcode this
    showNotation: false
  });

  //==============================================================
  function loadPosition(position) {
    board.position(position);  // second arg false for no animation
  }

  //==============================================================
  function processData(chess_data) {
    chess_data.games.some(function(game){
      if (game['white'].indexOf(opponent) != -1/* || game['black'].indexOf(opponent) != -1 */) {
        console.log("processData:");
        console.log(game);

        moves = game['pgn'].split(/\n/).slice(-1)[0];
        moves_arr = moves.split(/\d+[.]/g);

        temp_arr = [];

        for (i = 1; i < moves_arr.length; ++i) {

          if (i % 2 != 0) {
            single_move = moves_arr[i].trim();
            single_move = single_move.split("{", 1);
            single_move = single_move[0].trim();
          }
          else {
            single_move = moves_arr[i].trim();
            single_move = single_move.split(" ");
            single_move = single_move[1].trim();
          }

          temp_arr.push(single_move);
        }

        move_count = temp_arr.length;
        moves_arr = [];

        if (move_count % 2 == 0) {
          for (i = 0; i < move_count; i+=2) {
            move_arr = [temp_arr[i], temp_arr[i+1]]
            moves_arr.push(move_arr);
          }
        }
        else {
          for (i = 0; i <= move_count; i+=2) {
            if (i == move_count-1) {
              move_arr = [temp_arr[i], "*"];
              moves_arr.push(move_arr)
              break;
            }
            else {
              move_arr = [temp_arr[i], temp_arr[i+1]]
              moves_arr.push(move_arr);
            }
          }
        }

        // // remove weird asterisk when not waiting for b move
        // if (moves_arr[i].length > 2) {
        //   moves_arr[i].pop();
        // }


        current_position = game['fen'];
        return true;
      }
    });
  }

  //==============================================================
  // build the scrollable move list
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
        seperator = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
      }
      else if (moves_arr[i][0].length == 3) {
        seperator = "&nbsp;&nbsp;&nbsp;&nbsp;";
      }
      else if (moves_arr[i][0].length == 4) {
        seperator = "&nbsp;&nbsp&nbsp;";
      }
      else if (moves_arr[i][0].length == 5) {
        seperator = "&nbsp;&nbsp;";
      }

      // ensures the scrollable area fills up correctly as the number of
      // moves increases
      append_string = "<div class=\"pair-margins\"><div class=\"move-num\">"
        + move_num + ". &nbsp;</div>"
        + "<div class=\"move-clickable\" id=\"a" + move_num + "\"><b>"
        + moves_arr[i][0] + "</b></div>"
        + "<p style=\"float: left;\">" + seperator + "</p>"
        + "<div class=\"move-clickable\" id=\"b" + move_num + "\"><b>"
        + moves_arr[i][1] + "</b></div>"
        + "</p>";

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
    }
  }

  //==============================================================
  // enables the clickable move history
  function createFenHistory() {
    fen_history = {};

    debugger;

    $.getScript('chess.min.js', function() {
      var cb = new Chess();

      debugger;

      var move_number;
      var move_letter;

      for (i = 0; i < moves_arr.length -1; ++i) {
        for (j = 0; j < 2; ++j) {
          cb.move(moves_arr[i+1][j]);

          move_number = i+1;
          if (j == 0) { move_letter = 'a'; }
          else { move_letter = 'b'; }
          fen_history[move_letter + move_number.toString()] = cb.fen();
        }
      }
    });
  }

//==============================================================
// get the chess.com JSON

  let url = 'https://api.chess.com/pub/player/ajze/games';
  //let url = 'https://api.chess.com/pub/player/anebir/games';
  fetch(url)
    .then(
      function(response) {
        console.log(response);
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          throw new Error('Error with fetching from chess.com API');
        }
        return response.json()
    })
    .then(function(data) {

          // need to check for empty response / no games

          chess_data = data;
          console.log(chess_data);
          processData(chess_data);
          processMoves();
          createFenHistory();
          loadPosition(current_position);
    })
    .then(function(){
      $(".move-clickable").click(function(){
        board.position(fen_history[$(this).attr('id')]);
      });
    })
    .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
});
