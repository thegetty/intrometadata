//= require_tree .

// Use this to wrap selectors that contain : characters
function jq(myid) { return myid.replace( /(:|\.|\[|\]|,)/g, "\\$1" );}

// Make Turbolinks respect anchor links on page w/o reloading
// https://github.com/turbolinks/turbolinks/issues/75
Turbolinks.Controller.prototype.nodeIsVisitableOld = Turbolinks.Controller.prototype.nodeIsVisitable;
Turbolinks.Controller.prototype.nodeIsVisitable = function (elem) {
  var href = elem.getAttribute('href') || '',
      anchor = href[0] === "#"? anchor = jq(href): false;
  return !anchor && Turbolinks.Controller.prototype.nodeIsVisitableOld(elem);
};

Turbolinks.start();
uiSetup();

document.addEventListener("turbolinks:load", function() {
})

// $(document).ready(function(){
//   uiSetup();
//   Turbolinks.start();
// });

