import React from 'react';
import ReactDom from 'react-dom';

class list extends React.component{
	
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
}

export class Reply extends React.Component{
	render(){
		{reply}=this.props;
		return
		}
	}
}
