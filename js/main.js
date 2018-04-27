$(document).ready(function() {

  $("#site-header").load("html/header.html");
  $("#site-footer").load("html/footer.html", function(){

    alert($(window).height());
    alert($(window).width());

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
  });
});
