import React from 'react';
import ReactDom from 'react-dom';
import {Reply} from './reply.js';
import {Comment} from './comment.js';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';

/*
export class Comment extends React.Component{
	render(){

		{userName, comment, reply} =this.props.text;

		return (
			<div>
				{this.userName}
				<br />
				{comment}
				<br />
				<Reply reply = {this.reply} />
			</div>


			)
	}
}
*/

export class Comments extends React.Component{

	



	render(){
		const cardStyle =  {
			margin : 0,
			padding :0,
			width : '100%'

		}
		const formStyle2 = {
			display : 'flex',
			justifyContent : 'center'
		}
		const {comments, replySubmit,deleteComment, deleteReply, commentSubmit}=this.props;
		if (comments[0]==null)
		{
			return <div>nothing here</div>;
		}
		else{
			var formStyle = {
				display:'none'
			}

			

			var formElement=[]; 

			function replyShow(e){
				console.log('replyshow');
				console.log(formElement);
				if (formElement.style.display == 'none'){
					formElement.style.display= 'block'; 
				}
			}

			var commentList = comments.map(comment=>
				(
					<Comment
					key = {comment.id} 
					comment = {comment} 
					replySubmit = {replySubmit} 
					deleteComment = {deleteComment} 
					deleteReply = {deleteReply}/>
				
				)

			);
			
			return (<MuiThemeProvider>
							<List style = {cardStyle}>
									{commentList}
									<ListItem disabled>
										<form style = {formStyle2} name = 'whocares' onSubmit = {commentSubmit} >
											
											<TextField floatingLabelFixed = {true} floatingLabelText = "User Name" name = 'userName' hintText = "your name"/>
											<TextField floatingLabelFixed = {true} floatingLabelText = "Comment" name = 'newComment' hintText = "what do you think?"/>
											<FlatButton onClick = {commentSubmit} label = 'reply' />

											</form>
										</ListItem>
									</List>
					</MuiThemeProvider>);
		}
	}				

}