import React from 'react';
import ReactDom from 'react-dom';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';

/*class List extends React.component{
	
	render(){
		{replies} = this.props.reply;
		replies.map(reply => {
			let userName = reply.userName,
				text = reply.comment;

			return ( <h1>
						{userName}
						 <br/>		
						 {comment}
					 </h1>
				)
		
		});
	}
}*/

export class Reply extends React.Component{
	render(){
		const cardStyle =  {
			padding : 0,
			margin : 0

		}
		const listStyle ={
			display : 'flex',
			justifyContent : 'flex-end'
		}
		const width = {

			width :'75%'
		}
		const {reply, commentId, deleteReply} = this.props;
		const replyList = reply.map(reply=>
			(
			<MuiThemeProvider key = {reply.id} disabled>
				<ListItem disabled primaryText = {reply.userName} secondaryText = {reply.comment}

				rightIconButton = {<FlatButton onClick = {(e)=>deleteReply(e, commentId, reply.id)} label = 'delete'/>} />


			</MuiThemeProvider>
			)
		);
		return <div style = {listStyle}><List style = {width}>{replyList}</List></div>
	}
}

