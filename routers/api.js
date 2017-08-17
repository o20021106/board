var express = require('express');
var router = express.Router();
var comments = require('../comments.json');

function reorder(){
	for (i = 0; i < comments.data.length; i++) {
    	comments.data[i].id=i;
    	for (j = 0; j < comments.data[i].reply.length;j++){
    		comments.data[i].reply[j].id = j; 
    	}
	} 
}


router.get('/comments',function(req,res){
	console.log('get json');
	res.json(comments);
});



router.post('/comments',function(req,res){
	console.log('post json');
	const length = comments.data.length;
	var data = req.body;
	data.id = length;
	data.reply = [];
	comments.data[length]=req.body;
	res.json({text:'POST request to the homepage'});
});

router.post('/comments/reply',function(req,res){
	console.log('post json reply');
	const data = req.body;
	const commentId = data.id;
	const length = comments.data[commentId].reply.length;
	var reply ={id : length, userName : data.userName, comment : data.reply}
	console.log(JSON.stringify(reply));
	comments.data[commentId].reply[length] = reply;
	res.json({text:'POST request to the homepage'});
});

router.delete('/comment/delete',function(req,res){
	console.log('delete comment');
	var commentData1 = comments.data.splice(0,req.body.id);
	var commentData2 = comments.data.splice(req.body.id+1,comments.data.length);
	comments = {data : commentData1.concat(commentData2)};
	reorder();
	res.json({text :'delete comment succeed'});

});

router.delete('/reply/delete',function(req,res){
	console.log('delete comment');
	const commentId = req.body.commentId;
	const replyId = req.body.replyId;
	var replyData1 = comments.data[commentId].reply.splice(0,replyId);
	var replyData2 = comments.data[commentId].reply.splice(replyId+1,comments.data[commentId].reply.length);
	comments.data[commentId].reply = replyData1.concat(replyData2);
	reorder();
	res.json({text :'delete reply succeed'});

});

module.exports = router;