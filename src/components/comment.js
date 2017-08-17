import React from 'react';
import ReactDom from 'react-dom';
import {Reply} from './reply.js';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

	


export class Comment extends React.Component{

	constructor(props){
		super(props);
		this.state ={
			expanded : false
		};

		this.handleExpand = this.handleExpand.bind(this);
		this.handleExpandChange = this.handleExpandChange.bind(this);
	}

	handleExpandChange(expanded) {
    	this.setState({expanded: expanded});
  	};

	handleExpand () {
    	this.setState({expanded: true});
  	};

	render(){
		const cardStyle =  {
			margin : 0,
			padding :0

		}
		const formStyle = {
			display : 'flex',
			justifyContent : 'center' 
		}
		console.log('comment child here');
		const {comment, replySubmit,deleteComment, deleteReply}=this.props;
		return(
				<MuiThemeProvider key = {comment.id}>
					<ListItem disabled style = {cardStyle}>

						<Card style = {cardStyle} expanded = {this.state.expanded} onExpandChange={this.handleExpandChange}>
							<CardHeader
						      title={comment.userName}
						    />
						     <CardText>
						     		{comment.comment}
	    					</CardText>
							<CardActions>
								<FlatButton onClick = {(e)=>deleteComment(e, comment.id)} label = 'delete' />
								<FlatButton onClick = {this.handleExpand} label = 'reply' />
								<Divider />
								<Reply reply = {comment.reply} commentId = {comment.id} deleteReply = {deleteReply}/>
							</CardActions>
						    

							
							<CardActions expandable ={true}>
							<Divider />
							<form style = {formStyle} name = 'reply' onSubmit = {(e)=>replySubmit(e,comment.id)}>
								<TextField floatingLabelFixed = {true} floatingLabelText="User Name" name = 'userName' hintText = "your name plz"/>
								<TextField floatingLabelFixed = {true} floatingLabelText="Reply" name = 'newReply' hintText = "what do you think reply"/>
								<FlatButton onClick = {(e)=>replySubmit(e,comment.id)} label = 'reply' />
							</form>
							</CardActions>
						</Card>
					</ListItem>
				</MuiThemeProvider>
			)


	}
}
