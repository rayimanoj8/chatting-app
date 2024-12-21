let stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/gs-guide-websocket'
});

stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);
    const roomname = $('#roomname').val();
    stompClient.subscribe('/topic/'+roomname, (greeting) => {
        const message = JSON.parse(greeting.body);
        showGreeting(message.sender + " : " + message.message);
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    // var check = $('#ismobile').prop('checked');  // Use .prop('checked') for checkbox
    // console.log("Checkbox is checked:", check);
    // if (check){
    //     stompClient = new StompJs.Client({
    //         brokerURL: 'ws://192.168.202.236:8080/gs-guide-websocket'
    //     });
    // }
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.publish({
        destination: "/app/hello",
        body: JSON.stringify({
            'sender': $("#sender").val(),
            'message': $("#message").val(),
            'reciever': $("#roomname").val(),
        })
    });
    $('#message').val("");
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendName());
});