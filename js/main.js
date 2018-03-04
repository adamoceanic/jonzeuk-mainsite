$(document).ready(function() {

  $("#site-footer").load("html/footer.html");
  $("#site-header").load("html/header.html", function(){

    $(".book0").flip({
      trigger: 'hover'
    });
    $(".book1").flip({
      trigger: 'hover'
    });
    $(".book2").flip({
      trigger: 'hover'
    });
    $(".book3").flip({
      trigger: 'hover'
    });
    $(".book4").flip({
      trigger: 'hover'
    });
    $(".book5").flip({
      trigger: 'hover'
    });
    $(".book6").flip({
      trigger: 'hover'
    });
    $(".book7").flip({
      trigger: 'hover'
    });
    $(".book8").flip({
      trigger: 'hover'
    });
    $(".book9").flip({
      trigger: 'hover'
    });
    $(".book10").flip({
      trigger: 'hover'
    });
    $(".book11").flip({
      trigger: 'hover'
    });
    $(".book12").flip({
      trigger: 'hover'
    });
    $(".book13").flip({
      trigger: 'hover'
    });
    $(".book14").flip({
      trigger: 'hover'
    });


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
