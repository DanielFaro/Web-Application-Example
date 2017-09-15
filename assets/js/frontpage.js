//var me = {};
//me.avatar = "https://lh6.googleusercontent.com/-lr2nyjhhjXw/AAAAAAAAAAI/AAAAAAAARmE/MdtfUmC0M4s/photo.jpg?sz=48";

//var you = {};
//you.avatar = "https://a11.t26.net/taringa/avatares/9/1/2/F/7/8/Demon_King1/48x48_5C5.jpg";

//function formatAMPM(date) {
//  var hours = date.getHours();
//var minutes = date.getMinutes();
// var ampm = hours >= 12 ? 'PM' : 'AM';
//hours = hours % 12;
//hours = hours ? hours : 12; // the hour '0' should be '12'
//minutes = minutes < 10 ? '0' + minutes : minutes;
//var strTime = hours + ':' + minutes + ' ' + ampm;
//return strTime;
//}
var Raina = ["Hello there! I'm Raina", "Hope you are doing well! Do you know the mission here at Raise the Barr?",
    "No problem, Raise the Barr provides online corporate diversity training through our web application and uses me," +
    "Raina an AI chatbot to answer any questions you may have during the training.", "Of course ask away", "Great question, first what is your name?"];
var User = ["Hi Raina", "No, what is it?", "That's awesome! I have a question", "How can I participate in your Beta?"];

var scrollheight = 400;

//-- No use time. It is a javaScript effect.
function insertChat(who, text, delay) {
    var newList = "";
    // var date = formatAMPM(new Date());

    if (who == "Raina") {

        newList = '<li style="width: 100%; display: block">' +
            '<div class="msj-rta macro" style= "display: block">' +
            '<div class="text text-r">' +
            '<p>' + text + '</p>' +
            '</div>' +
            '</div>' +
            '</li>';
    } else {
        newList = '<li style="width: 100%; display: block">' +
            '<div class="msj macro" style="display: block">' +
            '<div class="text text-l">' +
            '<p>' + text + '</p>' +
            '</div>' +
            '</div>' +
            '</li>';
    }

    setTimeout(
        function () {
            $("ul").append(newList);
            console.log("appending");
        }, delay);

    document.getElementsByClassName("flex-column").scrollTop = 4400;
    $("ul").scrollTop = 440;

}

function resetChat() {
    $("ul").empty();
}

//welcom iffy
var delay = 8000;
var RainaWelcome = (() => {
    document.getElementById("user-msg").disabled = true;

    for (var n = 0; n < 5; n++) {
        insertChat("Raina", Raina[n], delay);
        if (n < 4) {
            insertChat("user", User[n], delay + 2000);
            delay += 4000;
        };
        document.getElementById("user-msg").disabled = false;
    }

    
})();



//if send button used for message
//$("#btn-chat").click(() => {
//  var text = usermsg;
//if (text !== "") {
//  insertChat("user", text);
//usermsg = ''; //resets value of user-msg back to placeholder
//} else {
//  alert("No message entered")
//}
//});

//If enter pressed for message

var i = 0;
var UserResponse = [];


$(document).keyup(e => {
    if (e.which == 13) {  //if 'enter' key is pressed

        if ($("#user-msg").val() !== "") {
            var usermsg = $("#user-msg").val();
            var letters = /^[A-Za-z]+$/;
            var emailcharacters = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            UserResponse.push(usermsg);
            console.log(usermsg);
            console.log(UserResponse);

            if (i == 0) {

                if (UserResponse[0].match(letters)) {
                    var Raina6 = "Hi " + UserResponse[0] + " nice to officially meet you, what is your email?"
                    insertChat("user", UserResponse[0], 1500);
                    $("#user-msg").val(''); //clears input text val
                    insertChat("Raina", Raina6, 3000);
                    i++;
                    console.log(i);
                } else {
                    alert("Sorry that's an invalid name. Letters only please.")
                    UserResponse = []; //reset to blank      
                }
            }

            else if (i == 1) {
                if (emailcharacters.test(UserResponse[1])) {
                    console.log("testing email");
                    var Raina7 = "So its" + UserResponse[1] + " that's a great email, thank you we will send you a message!"
                    console.log(UserResponse[1]);
                    insertChat("user", UserResponse[1], 1500);
                    $("#user-msg").val(''); //clears input text val
                    insertChat("Raina", Raina7, 3000);
                    //call send email function here
                    i = 0; //reset i
                    sendemail();
                    UserResponse = []; //reset to blank

                } else {
                    alert("Sorry that's an invalid email, please try again");
                    console.log(UserResponse[1]);
                    UserResponse.splice(1, 1); //resets users email to blank
                    console.log(i);
                    $("#user-msg").val(''); //clears input text val
                    console.log(UserResponse[1]);

                }
            }
        } else {
            alert("No message entered");
        }
    }

});

function sendemail() {
    var email = UserResponse[1];
    var subject = ('My permanent subject line');
    var body = ('My permanent body contents');
    document.write('<a href="mailto:' + email + '?subject=' + subject + '&body=' + body + '">' + '<' + '/a>');
}

function sendemail() {
    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': 'YOUR API KEY HERE',
        'message': {
          'from_email': 'YOUR@EMAIL.HERE',
          'to': [
              {
                'email': 'RECIPIENT@EMAIL.HERE',
                'name': 'RECIPIENT NAME (OPTIONAL)',
                'type': 'to'
              }
            ],
          'autotext': 'true',
          'subject': 'YOUR SUBJECT HERE!',
          'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!'
        }
      }
     }).done(function(response) {
       console.log(response); // if you're into that sorta thing
     });
}


//-- Clear Chat
//resetChat();

//-- Print Messages



//-- NOTE: No use time on insertChat.