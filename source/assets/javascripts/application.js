//= require_tree .

$(document).ready(function(){
  uiSetup();

  $("#main").smoothState({
    onStart: {
      duration: 400,
      render: function($container) {
        $container.velocity('fadeOut', { duration: 200 });
      }
    },
    onReady: {
      duration: 400,
      render: function($container, $newContent) {
        $container.html($newContent);
        $container.velocity('fadeIn', { duration: 100 });
      }
    },
    onAfter: function($container, $newContent) {
      uiSetup();
    }
  })
});
