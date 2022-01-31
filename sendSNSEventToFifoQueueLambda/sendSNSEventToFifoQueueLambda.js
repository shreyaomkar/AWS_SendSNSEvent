
var AWS = require('aws-sdk');
var sqs = new AWS.SQS({region : 'us-east-1'});
var config = require('./config.json');

exports.handler = function(event, context) {
  const messagebody= JSON.stringify(event);
  //messagebody.MessageGroupId= 'test';
  var params = {
	MessageBody: messagebody,
	MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
    MessageGroupId: "Group1",  // Required for FIFO queues
    QueueUrl: "https://sqs.us-east-1.amazonaws.com/118198795607/gcgdemofifoqueue.fifo"
  };
  sqs.sendMessage(params, function(err,data){
    if(err) {
		console.log('data:',params);
      console.log('error:',"Fail Send Message" + err);
	  
      context.done('error', "ERROR Put SQS");  // ERROR with message
    }else{
      console.log('data:',data.MessageGroupId);
	  console.log('data:',data);
	  console.log('data:',JSON.stringify(data));
	  context.done(null,'');  // SUCCESS 
    }
  });
}