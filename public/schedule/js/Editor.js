window.RunJS = function RunJS(   ParA ) {	
	const route = ParA;

	/// Begining of LoginApp app page.
	var LoginApp = React.createClass({
		getInitialState:function() { 				
			return {				
				username: "",
				passWord: "",
				UsernameErrorMsg: <br />,
				PasswordErrorMsg: <br />
				
			};
		},
		usernameChange: function(event)  {
			var i = event.target.value;
			this.setState({username: i });
		},
		passWordChange: function(event) {
			var i = event.target.value;
			this.setState({passWord: i });
		},
		login: function() {
			/*
			var username = this.state.username;
			var passWord = this.state.passWord;
			var arr = [username, passWord];
			var jsonItem = JSON.stringify( arr );
			var destination = route+'Editor/Login/';			
			////console.log(jsonItem);
			var http = new XMLHttpRequest();						 //// set up http request and set item. 
			http.onreadystatechange = function() {
				if (http.readyState == 4 && http.status == 200) {
					var data = http.responseText;												
					////console.log(data);	
				}
			}.bind(this);
			http.open('POST', destination, true);							
			http.setRequestHeader('jsonInput', jsonItem);
			http.send();	
			*/
			
			
		},
		render: function() { 	
			var UsernameErrorMsg = this.state.UsernameErrorMsg;
			var PasswordErrorMsg = this.state.PasswordErrorMsg;
			return ( 				
				
			
			);
		},
	});/// End of LoginApp

	
	
	
	/// Begining of EditorApp app page, Parent for application.
	var EditorApp = React.createClass({
		getInitialState:function() { 				
			return {
				route: route
			};
		},
		render: function() { 
			
			return ( 
				<div id = "EditorApp">					
					<LoginApp />
				</div> 
			);
		},
	});/// End of EditorApp


	ReactDOM.render ( <EditorApp />, document.getElementById("EditorAppContainer") );	
};