require('dotenv').config();
const { RTMClient } = require('@slack/rtm-api');
var token = process.env.SLACK_TOKEN;

var rtm = new RTMClient(token);
rtm.start();

//var food = require('./food');
//var movie = require('./movie');

rtm.on('message', function (message){
	var channel = message.channel;
	var text = message.text;
	
	switch(text){
		case 'movie':
			rtm.sendMessage('I would like to recommend a movie.', channel);//movie(rtm.channel);
			//console.log(channel);
			//console.log(message.user);
			break;
		case 'food':
			rtm.sendMessage('I would like to recommend a restaurant.', channel);//food(rtm.channel);
			break;
		case 'noree':
			rtm.sendMessage('Gomanhae.', channel);
			break;
		default:
			rtm.sendMessage('Hello. Please choose one from food, movie, noree.', channel);
	}
});
	
	/*if(text == 'Hi'){
		rtm.sendMessage('Hello',channel);
	}else{
		rtm.sendMessage('Eung???', channel);
	}
});*/

