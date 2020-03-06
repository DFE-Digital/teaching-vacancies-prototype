
$(document).ready(function(){

    // SERVICE START - Fake autocomplete on start screen
    $(".location").focusin(function() {
        $(".tool-tip").show();
    });

    // SERVICE START - Autocomplete options + Journey setting
    $("a#postcode").click(function(){
        $("div#commute-inset").show();
        $(".tool-tip").hide();
        $("button.start-search").attr("formaction", "results_p_map-1")
    });
    $("a#city").click(function(){
        $(".tool-tip").hide();
        $("div#commute-inset").hide();
        $("button.start-search").attr("formaction", "results_g_map-1")
    });

    // SERVICE START - filter expand link
    $("a#toggle").click(function(){
        $("div#expand").toggle();
        $(this).text($(this).text() == '- Hide search options' ? '+ Show more search options' : '- Hide search options');
    });

    // MAP RESULTS -  Pin toggle
    $("a#pinToggle").click(function(){
        $("div.pin-popup").toggle();
        $('body').scrollTo('div#mapScroll')
    });
    $("a.popup-close").click(function(){
        $("div.pin-popup").toggle();
        $('body').scrollTo('div#mapScroll')
    });

    // LISTING - show commute
    $("a#showCommute").click(function(){
        $("div.commute-results").show();
    });

    $("a.goBack").click(function(){
        window.history.back();
    });

    $("a.goForward").click(function(){
        window.history.forward();
    });

    // March 2020 - MAT
    // If review screen (Trust location) string includes "multiple" show preview button for multiple, else show preview button for trust role
    if (document.getElementById("schoolz").textContent.includes('multiple')) {
        $("a#p-trust").hide();
        $("a#p-multiple").show();
    } else {
        $("a#p-trust").show();
        $("a#p-multiple").hide();
    }


/*
    var local = document.getElementById("schoolz").value;
    if (local == "multiple") {
        $("a#p-trust").hide();
        $("a#p-multiple").show();
    }
    else {
        $("a#p-trust").show();
        $("a#p-multiple").hide();
    }
*/

});
