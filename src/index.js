import React from 'react';
import ReactDom from 'react-dom';
import {Comments} from './components/comments.js';import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends React.Component{	

	constructor(props){
		super(props);
		this.state = {
			data:[]
		};
		this.commentSubmit = this.commentSubmit.bind(this);
		this.replySubmit = this.replySubmit.bind(this);
		this.update = this.update.bind(this);
		this.deleteComment = this.deleteComment.bind(this);
		this.deleteReply = this.deleteReply.bind(this);
	}

	componentDidMount(){
		console.log('in did mount');

		fetch('/api/comments')
			.then(function(response) {
				console.log('i am a response '+response);
			    return response.json();
			})
			.then(json=>{
				console.log('i am parse json'+json.data[0].userName);
				this.setState({data: json.data});
			})
			.catch(err=>{
				console.log(err);
			});
	}

	update(){
		fetch('/api/comments')
			.then(function(response) {
				console.log('i am a response '+response);
			    return response.json();
			})
			.then(json=>{
				console.log('i am parse json'+json.data[0].userName);
				this.setState({data: json.data});
			})
			.catch(err=>{
				console.log(err);
			});
	}

	commentSubmit(e){
		e.preventDefault();
		console.log(e.target.nodeName);
		var refresh =this.update;
		if(e.target.nodeName == 'BUTTON'){
			e = e.target.parentNode;
		}
		else{
			e=e.target;
		}
		fetch("/api/comments",
		{
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    method: "POST",
		    body: JSON.stringify({ comment: e.newComment.value, userName: e.userName.value})
		})
		.then(function(res){
			return res.json();
		})
		.then(function(res){ 
			console.log('what'+res.text);
			refresh();

		})
		.catch(function(res){ console.log("not"+res) })
	}

	replySubmit(e,commentId){
		console.log('commentId '+ commentId + e.target.nodeName);
		e.preventDefault();
		if(e.target.nodeName == 'BUTTON'){
			e = e.target.parentNode;
		}
		else{
			e=e.target;
		}
		var refresh =this.update;
		fetch('api/comments/reply',
		{
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    method: "POST",
		    body: JSON.stringify({ reply: e.newReply.value, userName: e.userName.value, id: commentId})
		}).then(function(res){
			return res.json();
		})
		.then(function(res){ 
			console.log('what'+res.text);
			refresh();

		})
		.catch(err=>{
			console.log(err);
		});

		
	}

	deleteComment(e,id){
		var refresh =this.update;

		fetch('api/comment/delete',
		{
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    method: "DELETE",
		    body: JSON.stringify({id:id})
		}).then(function(res){
			return res.json()
		}).then(function(res){
			console.log('deleteComment '+res.text);
			refresh();
		}).catch(err=>{
			console.log(err);
		});

	}

	deleteReply(e,commentId,replyId){
		var refresh =this.update;

		fetch('api/reply/delete',
		{
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    method: "DELETE",
		    body: JSON.stringify({commentId : commentId, replyId : replyId})
		}).then(function(res){
			return res.json()
		}).then(function(res){
			console.log('delete reply '+res.text);
			refresh();
		}).catch(err=>{
			console.log(err);
		});


	}

	render(){
		const divStyle ={
			padding : 30
		};
		const cente = {
			textAlign : 'center'
		};
		const width = {
			width :'75%'
		}
		const centerStyle = {
			display: 'flex', 
			justifyContent: 'center',
			flexWrap: 'wrap'
		};
		console.log('in render');
		return (
			<div style = {centerStyle}>
				<div style ={width}>
					<Comments comments = {this.state.data} 
							replySubmit = {this.replySubmit} 
							deleteComment = {this.deleteComment} 
							deleteReply = {this.deleteReply}
							commentSubmit = {this.commentSubmit}/>
				</div>
			</div>);
	}

} 

ReactDom.render(<App />, document.getElementById('root'));


	