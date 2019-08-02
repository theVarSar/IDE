$(function() {
  var height = $(window).height() - 40;
  var editor_open = "Python_editor";

  $(".codecontainer").css("height", height + "px");

  $("#run").click(function() {
      $("#result").text('');
    console.log(editor_open);
    console.log("call the api and render the result");
    var data = {
      pcode : $('#'+editor_open).val().trim(),
      editor_open : editor_open
    };

let loader_element = $('#loader_element');

if( loader_element.hasClass("show_no")) {
  loader_element.toggleClass("show_no");
}

    console.log("data", data);
    $.post( "/", data, function( data ) {
    console.log("here");
    console.log("abc",data);

    if(! loader_element.hasClass("show_no")) {
      loader_element.toggleClass("show_no");
    }

      $("#result").text(data.output);
    }, "json");
  });


  $("#python_selected").click(function() {
    let python_title = $("#python_selected");
     let c_title = $("#c_selected");
     let python_block = $("#Python_editorContainer");
      let c_block = $("#C_editorContainer");

    if( ! python_title.hasClass("selected")) {
      python_title.toggleClass("selected")
    }
    if( c_title.hasClass("selected")) {
      c_title.toggleClass("selected")
    }
    editor_open = "Python_editor";

    if( python_block.hasClass("show_no")) {
      python_block.toggleClass("show_no")
      console.log("i am toggle python cont");
      if( ! c_block.hasClass("show_no")) {
    }
      c_block.toggleClass("show_no")
    }


  });


  $("#c_selected").click(function() {
    let python_title = $("#python_selected");
     let c_title = $("#c_selected");
     let python_block = $("#Python_editorContainer");
      let c_block = $("#C_editorContainer");

      editor_open = "C_editor";

    if( python_title.hasClass("selected")) {
      python_title.toggleClass("selected")
    }
    if( ! c_title.hasClass("selected")) {
      c_title.toggleClass("selected")
    }

        if(! python_block.hasClass("show_no")) {
          python_block.toggleClass("show_no")
        }
        if(  c_block.hasClass("show_no")) {
          c_block.toggleClass("show_no")
        }

     });
  });
