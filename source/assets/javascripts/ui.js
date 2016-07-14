var NAVHEIGHT = 60;


function anchorScroll(href) {
  $anchorLinks = $("a[href*='#']")
  $anchorLinks.click(function(e) {
    var target = $(this).attr("href");
    var distance = $(jq(target)).offset().top;

    $("html, body").animate({
      scrollTop: distance - NAVHEIGHT
    }, 250);
  })
}

function footnoteScroll() {
  $(".footnote, .reversefootnote").click(function(event){

    var target = $(this).attr("href");
    var distance = $(jq(target)).offset().top;

    $("html, body").animate({
      scrollTop: distance - NAVHEIGHT
    }, 250);

  });
}

function offCanvasNav() {
  var $sidebar = $(".nav-sidebar");
  var $menuButton = $("#navbar-menu");
  var $closeButton = $("#nav-menu-close");
  var $curtain = $(".sliding-panel-fade-screen");

  $menuButton.on("click", function() {
    $sidebar.toggleClass("visible");
    $curtain.toggleClass("visible");
    // Force css repaint to deal with webkit "losing" the menu contents
    // on mobile devices
    $('<style></style>').appendTo($(document.body)).remove();
  });

  $closeButton.on("click", function() {
    $sidebar.removeClass("visible");
    $curtain.removeClass("visible");
  });

  $curtain.on("click", function() {
    $sidebar.removeClass("visible");
    $curtain.removeClass("visible");
  });

  // bind escape key to menu close if menu is open
  $(document).keydown(function(event) {
    if (event.which === 27 && $sidebar.hasClass("visible")) {
      $sidebar.removeClass("visible");
      $curtain.removeClass("visible");
    }
  });
}

function expanderSetup() {
  var $expanderContent  = $(".expander-content");
  var $expanderTriggers = $(".expander-trigger");

  $($expanderContent).addClass("expander--hidden");

  $expanderTriggers.on("click", function() {
    var $target = $(this).parent().find(".expander-content");
    $target.slideToggle("fast", function() {
      $target.toggleClass("expander--hidden");
    });
  });
}

// Get today's current date, using Moment JS
function citationDate() {
  var today = moment().format("D MMM. YYYY");
  $(".cite-current-date").empty();
  $(".cite-current-date").text(today);
}

function keyboardNav(){
  $(document).keydown(function(event) {
    var prev, next;
    prev = document.getElementById("prev-link");
    next = document.getElementById("next-link");

    // 37 = left arrow key
    if (event.which === 37 && prev) {
      prev.click();
      event.preventDefault();
    }
    // 39 = right arrow key
    else if (event.which === 39 && next) {
      next.click();
      event.preventDefault();
    }
  });
}


// Call the other setup functions inside of this setup function
// Call this function inside of $(document).ready();
function uiSetup() {
  offCanvasNav();
  expanderSetup();
  citationDate();
  keyboardNav();
  // anchorScroll();
  // footnoteScroll();
}
