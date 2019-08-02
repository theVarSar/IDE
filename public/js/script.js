window.onload = $(function() {
  var height = $(window).height() - 40;
  var editor_open = "Python_editor";

  $(".codecontainer").css("height", height + "px");
  $(".selector").click(function() {
    $(this).toggleClass("selected");

    var id = $(this).attr("name");
    if(editor_open == "Python_editor") {
      $("#C_editorContainer").toggle();
      editor_open = "C_editor";
    } else {
      $("#Python_editorContainer").toggle();
      var editor_open = "Python_editor";
    }

    // console.log(editor_open);
    // var number = $('.codecontainer').filter(function() {
    //   return $(this).css('display') !== 'none';
    // }).length;

    // var width = 100 / number;
    // $(".resultwa").css("width", "50%");
  });

  $("#run").click(function() {
    console.log("call the api and render the result");
    var data = {
      pcode : $('#'+editor_open).val(),
      editor_open : editor_open
    };

    console.log("data", data)
    $.post( "/", data, function( data ) {
console.log("here");
  console.log("abc",data);
      $("#result").text(data.output);
    }, "json");
  });
});
