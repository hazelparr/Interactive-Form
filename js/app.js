//On load, cursor is on the name field and hides "Other Role" text field, hides the color text field and
// the paypal and bitcoin information
$(document).ready ( function(){
    $("#name").focus();
    $("#other-title").hide();
    $("#colors-js-puns").hide();
    $("#paypal, #bitcoin").hide();
});

//If user selects "other" on job role, the "other" text field is shown for their input
$("#title").on("change", function(){
    //reset hide
    $("#other-title").hide();
    
    if ($("#title").val() === "other") {
        console.log("selected other");
    $("#other-title").show();
    }
});

//Color options only built until user selects theme
$("#design").on("change", function() {
    if ($(this).val() == "js puns") {
        $("#colors-js-puns").show();
        $("#color").html("<option>Cornflower Blue</option><option>Dark Slate Grey</option><option>Gold</option>");
    } else if (($(this).val() == "heart js")) {
        $("#colors-js-puns").show();
        $("#color").html("<option>Tomato</option><option>Steel Blue</option><option>Dim Grey</option>");
    } else {
        $("#colors-js-puns").hide();
    }

});

//Disables checkbox if activities are in conflict with each other timewise
//Displays total cost of conference
$(".activities").on("change", event, function() {
    
    var totalCost = 0; // initialising total cost of conference
    
    // resetting to default
    $(".cost").remove();
    $("p.act-error").remove();
    $("label").removeClass("disabled");
    $(".activities input").prop("disabled", false);

    console.log(event.target.name);

    $("input:checked").each (function () {
        if ($(this).attr("name") == "all") {
            totalCost += 200;
        } else {
            totalCost += 100;
            if ($(this).attr("name") == "js-frameworks") {
                $("[name=express]").prop("disabled", true).parent().addClass("disabled").after("<p class='act-error'>Conflicts with selected workshop</p>");
            } else if ($(this).attr("name") == "express"){
                $("[name=js-frameworks]").prop("disabled", true).parent().addClass("disabled").after("<p class='act-error'>Conflicts with selected workshop</p>");
            } else if ($(this).attr("name") == "js-libs"){
                $("[name=node]").prop("disabled", true).parent().addClass("disabled").after("<p class='act-error'>Conflicts with selected workshop</p>");
            } else if ($(this).attr("name") == "node") {
                $("[name=js-libs]").prop("disabled", true).parent().addClass("disabled").after("<p class='act-error'>Conflicts with selected workshop</p>");
            }
        }
    });

    if (totalCost > 0) {
        $(".activities").append("<p class='cost'>Total cost is: $"+ totalCost + "</p>"); 
    }

});

//removing select option as per instructions credit card should be default show
$("option[value=select_method]").remove();


// Credit card is shown as default payment, hides paypal and bitcoin info until selected
$("#payment").on("change", event, function() {
    $("#credit-card").show();

    if ($(this).val() == "paypal") {
        $("#paypal").show();
        $("#bitcoin, #credit-card").hide();
    } else if ($(this).val() == "bitcoin"){
        $("#bitcoin").show();
        $("#paypal, #credit-card").hide();
    }
});


//Real time email validation
var emailError;
$("#mail").on("keyup", function() {
    //clear error messages
    $("p.error-text").remove();
    emailError = false;

    var mail = $("#mail").val();
    

    //simple email validator
    var emailVal = /(.+)@(.+){2,}\.(.+){2,}/;

    if( !emailVal.test(mail) ){
        $("#mail").after("<p class='error-text'>Invalid email address format</p>");
        emailError = true;
    } else {
        emailError = false;
   }
    console.log(emailError); 
    return emailError;
});




//// Validation Upon Submission//////
$("button[type='submit']").on("click", function(e){
    
    var cardVal = /\b\d{4}(| |-)\d{4}\1\d{4}\1\d{4}\b/g; //credit card validation
    var zipVal = /^\d{5}(?:[-\s]\d{4})?$/; //zip code validation
    var cvv = /^[0-9]{3}$/; // cvv validation

    //clear error messages
    $("p.error-text").remove();

    if (emailError === true) {
        $("#mail").after("<p class='error-text'>Invalid email address format</p>");
        e.preventDefault();
        console.log("form not submitted");
    } else if ($("#mail").val() === "") {
        $("#mail").after("<p class='error-text'>Please enter your email</p>");
        e.preventDefault();
    }

    if ($("#name").val() === "") {
        $("#name").after("<p class='error-text'>Please enter your name</p>");
        e.preventDefault();
        console.log("form not submitted");
    }

    if ($("#title").val() === "other" && $("#other-title").val() === "") {
        $("#other-title").after("<p class='error-text'>Please enter your job role</p>");
        e.preventDefault();
    }

    if ($("input:checked").length === 0) {
        $(".activities").after("<p class='error-text'>Please select an activity</p>");
        e.preventDefault();
    }

    if ($("#payment").val() === "credit card" && !cardVal.test($("#cc-num").val())) {
        $("[for='exp-month']").before("<p class='error-text'>Please enter a valid 16-digit credit card number</p>");
        e.preventDefault();
    }

    if ($("#payment").val() === "credit card" && !zipVal.test($("#zip").val())) {
        $("[for='exp-month']").before("<p class='error-text'>Please enter a valid 5-digit zip code</p>");
        e.preventDefault();
    } 
    if ($("#payment").val() === "credit card" && !cvv.test($("#cvv").val())) {
        $("[for='exp-month']").before("<p class='error-text'>Please enter a valid 3-digit CVV number</p>");
        e.preventDefault();
    } else {
        
        $("p.error-text").remove();
        alert("Thank you for registering. See you at the conference!");
        }
    
});










