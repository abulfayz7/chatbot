require('dotenv').config();

var status=0;

const token = process.env.SLACK_TESTER_TOKEN;
const tchannel = process.env.TESTING_CHANNEL;
const tuser = process.env.TESTING_USER;

const { RTMClient, LogLevel } = require('@slack/rtm-api');

const rtm = new RTMClient(token, {
	//logLevel: LogLevel.DEBUG,
});

rtm.start()
	.catch(console.error);
	
rtm.on('ready', async() => {
	const res = await rtm.sendMessage("Start Testing.", tchannel);
	console.log("Message sent : Start testing");
	status++;
});
rtm.on('message', function(message) {
	var text = message.text;
	//console.log(message.text, message.channel, message.user);
	if(message.user == tuser) {
		switch(status) {
			case 1:
			  if(text != "Hello. Please choose one from food, movie, noree."){
				console.log("Test fail: basic message");
				process.exit(1);
			  }
			  console.log("Received message:", text);
			  rtm.sendMessage("movie", tchannel);
			  status++;
			  break;
			case 2:
				console.log("Message sent : movie");
				if(text != "I would like to recommend a movie."){
					console.log("Test fail: movie");
					process.exit(1);
				}
				console.log("Received message:", text);
				rtm.sendMessage("food", tchannel);
				status++;
				break;
			case 3:
				console.log("Message sent : food");
				if(text != "I would like to recommend a restaurant."){
					console.log("Test fail: food");
					process.exit(1);
				}
				console.log("Received message:", text);
				rtm.sendMessage("noree", tchannel);
				status++;
				break;
			case 4:
				console.log("Message sent : noree");
				if(text != "Gomanhae."){
					console.log("Test fail: noree");
					process.exit(1);
				}
				console.log("Received message:", text);
				console.log("Tested successfully");
				process.exit(0);
				break;
			default:
				console.log("Test status is abnormal.");
		}
	}
});