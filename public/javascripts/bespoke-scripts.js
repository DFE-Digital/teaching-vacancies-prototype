
$(document).ready(function(){

    // SERVICE START - Fake autocomplete on start screen
    $(".location").focusin(function() {
        $(".tool-tip").show();
    });

    // SERVICE START - Autocomplete options + Journey setting
    $("a#postcode").click(function(){
        $("div#commute-inset").show();
        $(".tool-tip").hide();
        $("button.start-search").attr("formaction", "results_p_list-1.html")
    });
    $("a#city").click(function(){
        $(".tool-tip").hide();
        $("div#commute-inset").hide();
        $("button.start-search").attr("formaction", "results_g_list-1.html")
    });

    // SERVICE START - filter expand link
    $("a#toggle").click(function(){
        $("div#expand").toggle();
        $(this).text($(this).text() == '- Hide search options' ? '+ Show more search options' : '- Hide search options');
    });

    // MAP RESULTS -  Pin toggle
    $("a#pinToggle").click(function(){
        $("div.pin-popup").toggle();
    });
    $("a.popup-close").click(function(){
        $("div.pin-popup").toggle();
    });

    // LISTING - show commute
    $("a#showCommute").click(function(){
        $("div.commute-results").show();
    });

});
