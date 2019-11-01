
$(document).ready(function(){

    // SERVICE START - Fake autocomplete on start screen
    $(".location").focusin(function() {
        $(".tool-tip").show();
    });

    // SERVICE START - Autocomplete options
    $("a#postcode").click(function(){
        $("div#commute-inset").show();
        $(".tool-tip").hide();
    });
    $("a#city").click(function(){
        $(".tool-tip").hide();
        $("div#commute-inset").hide();
    });

    // SERVICE START - filter expand link
    $("a#toggle").click(function(){
        $("div#expand").toggle();
        $(this).text($(this).text() == '- Hide search options' ? '+ Show more search options' : '- Hide search options');
    });



});
