console.log("hi");

var PARSE_APP_ID = 'oR6At8ymzgWaxLo9jmrjLNGupK8gjocw0LLDaUVN';
var PARSE_REST_KEY = 'zyznZiCdOzdZJ7PtGjxkBz0NTnTIxJdf8pvhesNF';

$(document).ready(function(){
	getMessages();
	$("send").click(function(){
		var username = $('input[name=username]').attr('value');
		var message = $('input[name=message]').attr('value');
		console.log(username + " " + message);

		$.ajax({
			url: 'https://api.parse.com/1/MessageBoard',
			headers: {
				'X-Parse-Application-Id': PARSE_APP_ID,
				'X-Parse-REST-API-Key' : PARSE_REST_KEY
			},
			contentType: 'application/json',
			dataType: 'json',
			processData: false,
			data: JSON.stringify({
				'username': username,
				'message': message
			}),
			type: 'POST',
			success: function() {
				console.log('sent');
				getMessages();
			},
			error: function() {
				console.log('error');
			}
		});

	});
});

function getMessages() {
	$.ajax({
		url: 'https://api.parse.com/i/classes/MessageBoard',
		headers: {
			'X-Parse-Application-Id': PARSE_APP_ID,
			'X-Parse-REST-API-Key': PARSE_REST_KEY
		},
		contentType: 'application/json',
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			console.log('get');
			updateView(data);
		},
		error: function(){
			console.log('error');
		}
	});
}

function updateView(messages){
	var board = $('#messages');
	board.html('');
	$.each(messages.results, function(index,value){
		var el = $('<div class="well">'
					+ value.username
					+ ": "
					+ value.message
					+ "</div>");
		board.append(el);
	});
	console.log(messages);
}