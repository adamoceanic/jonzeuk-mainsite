$(document).ready(function() {

  $("#site-footer").load("html/footer.html");
  $("#site-header").load("html/header.html", function(){

    var modal = $("#modal");
    var modalOverlay = $("#modal-overlay");
    var closeButton = $("#close-modal");
    var openButton = $("#open-modal");
    var ep = $(".e-text");
    var e0 = "email: "
    var e1 = "mail";
    var e2 = "jonze";
    var e3 = ".io";

    openButton.click(function() {
      ep.append(e0 + e1 + "@" + e2 + e3);
      modal.toggleClass("closed");
      modalOverlay.toggleClass("closed");
    });

    closeButton.click(function() {
      ep.empty();
      modal.toggleClass("closed");
      modalOverlay.toggleClass("closed");
    });

    modalOverlay.click(function() {
      ep.empty();
      modal.toggleClass("closed");
      modalOverlay.toggleClass("closed");
    });

    var current_game1 = 'q3r1r1/p1p2pk1/1p1p4/2P3pQ/7n/1B1PN3/PP1P4/6KR w - - 3 22';
    var board = ChessBoard('board', {
      position: current_game1,
      showNotation: false
    });
  });
});
