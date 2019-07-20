window.RunJS = function RunJS(  BASE_URL, EMPLOYEE_ARR ) {			
	
var Employeerow = React.createClass({ 
	RowClick: function(event) {
		//// Get data of row from the event.
		 
		var id = event.currentTarget.firstChild.innerHTML;
		////console.log(id);
		this.props.fillform(id);
		
		
	},
	render: function() {	
	
		var id = this.props.arr["id"];
		var Firstname = this.props.arr["Firstname"];
		var Lastname = this.props.arr["Lastname"];			
		var Inst = (this.props.arr["instructor"] ) ? "Yes" : "No";
		var Life = (this.props.arr["lifeguard"]  ) ? "Yes" : "No";
		var Head = (this.props.arr["headguard"]  ) ? "Yes" : "No";
		var Supe = (this.props.arr["supervisor"] ) ? "Yes" : "No";						
		
		
		var isselected = "row ";
		if (this.props.formData.id == id ) {
			isselected += "rowSelected";
		}
		return (
			<div className = {isselected} onClick = {this.RowClick} >
				<div className = "idColumn" >{id}</div>
				<div className = "FirstNameTD">{Firstname}</div>
				<div className = "LastNameTD">{Lastname}</div>				
				<div className = "certColumn" >{Life}</div>
				<div className = "certColumn" >{Inst}</div>
				<div className = "certColumn" >{Head}</div>
				<div className = "certColumn" >{Supe}</div>
			</div>
		)			
	},	
});
var Employeetable = React.createClass({		
	render: function() {	
		var employeeRows = [];
		for (var i = 0; i < this.props.Employees.length; i++ ) {			
			var employee = this.props.Employees[i];			
			employeeRows.push(<Employeerow arr={employee} key = {i} fillform = {this.props.fillform} formData = {this.props.formData} /> );			
		}
		var updownsymbl = String.fromCharCode(8645);
		return (
			<div>		
				<div id = "mytable">
				<div id = "tableUpper"  >
					<div id = "capt">Employees</div>
					<div id = "myheader">
					  <div className = "thid"  >ID <button id = "SortBtn" onClick = {this.props.sortbyID} > {updownsymbl} </button></div>
					  <div className = "ColOne">Firstname <button id = "SortBtn" onClick = {this.props.sortbyFirstname} > {updownsymbl} </button></div>
					  <div className = "ColTwo">Lastname <button id = "SortBtn" onClick = {this.props.sortbyLastname} >{updownsymbl} </button></div>
					  <div className = "certTh">Lifeguard</div>
					  <div className = "certTh">Instructor</div>
					  <div className = "certTh">Headguard</div>
					  <div className = "certTh">Supervisor</div>
					</div>
				</div>			
				<div id = "tablelower">				 				 
					{employeeRows}					 
				</div>
				</div>
			</div>
		)			
	},
});

var UpateForm = React.createClass({			 
	setposition: function(event) {
		event.preventDefault();		
		var p = event.target.value;
		p = parseInt( p );
		this.props.certbtnClick(p);
					
	},
	firstnameChange: function(event) {
		var i = event.target.value;	
		this.props.firstnameChange(i);
		
	},
	lastnameChange: function(event) {
		var i = event.target.value;		 
		this.props.lastnameChange(i);
		
	},
	render: function() {	
		var formData = this.props.formData;
		var firstname  = formData.firstname;
		var lastname   = formData.lastname;
		var ID = formData.id;
	
		var lifeguard  = formData.lifeguard;
		var instructor = formData.instructor;
		var headguard  = formData.headguard;
		var supervisor = formData.supervisor;
	
		var checkedSymbol = String.fromCharCode(9745);
		var unCheckedSymbol = String.fromCharCode(9744);
		var CertSelected = " CertSelected";
		
			
		var lifeSymbol = unCheckedSymbol; 
		var instSymbol = unCheckedSymbol;
		var headSymbol = unCheckedSymbol; 
		var supeSymbol = unCheckedSymbol;							
		
		var lifeCLS = "Lifeguard"; 
		var instCLS = "Instructor"; 
		var headCLS = "Headguard"; 
		var supeCLS = "Supervisor";		
		
		
		
		if( lifeguard ) {
			lifeSymbol = checkedSymbol;
			lifeCLS += CertSelected;
		}
		if( instructor ) {
			instSymbol = checkedSymbol;
			instCLS += CertSelected;
		}
		if( headguard ) {
			headSymbol = checkedSymbol;
			headCLS += CertSelected;
		}
		if( supervisor ) {
			supeSymbol = checkedSymbol;
			supeCLS += CertSelected;
		}
		
		var Disabled;
		 
		if (ID != "" ) {
			Disabled = false;
		} else {
			Disabled = true;
			lifeCLS = "btnDisabled";
		    instCLS = "btnDisabled";
		    headCLS = "btnDisabled"; 
		    supeCLS = "btnDisabled";
		}
		
		return (
			<div id = "UpdateForm" >
				
				<button id = "ClearForm" onClick = {this.props.clear} > Clear Form </button>
				
				<div className="IDFormGroup">				
					<label htmlFor = "ID"> ID: </label>
					<input type ="text" name="ID"  value = {ID} readOnly disabled size = "3" />		
				</div>
				
				
				<div className="FirstnameFormGroup">				
					<label htmlFor = "Firstname"> Firstname: </label>
					<input type ="text" name="Firstname" maxLength = "21" value = { firstname} disabled={Disabled} onChange = {this.firstnameChange} />
				</div>
				
				<div className="LastnameFormGroup">				
					<label htmlFor = "Lastname"> Lastname: </label>
					<input type ="text" name="Lasttname"  maxLength = "21" value = {lastname} disabled={Disabled} onChange = {this.lastnameChange} />		
				</div>
				
				 
				<div id = "CertSelectorGroup"> 
				<h4> Must have atleast one certification. </h4>
				<button  className  = {lifeCLS}  name="Cert" value = "1"   disabled={Disabled} onClick={this.setposition} >							
					{lifeSymbol} Lifeguard
				</button>
				
				<button  className  = {instCLS} name="Cert" value = "2"    disabled={Disabled}  onClick={this.setposition} >	
					{instSymbol} Instructor
				</button>
				
				<button  className  = {headCLS}   name="Cert" value = "3"   disabled={Disabled}  onClick={this.setposition}>		
					{headSymbol} Headguard
				</button>
				
				<button  className  = {supeCLS}  name="Cert" value = "4"    disabled={Disabled} onClick={this.setposition}>	
					{supeSymbol} Supervisor					
				</button>						
				</div>	
				 
				<button id = "Changebtn"  disabled={Disabled}  onClick = {this.props.submitClick} >Change Employee</button>
				
			</div>
		)			
	},
});
		

var Updateapp = React.createClass({
	getInitialState:function() { 		
		var formData = {
			id : "", firstname: "", lastname: "", lifeguard: false, instructor: false,	headguard: false, supervisor: false		
		};
	
		return {
			employees: EMPLOYEE_ARR,
			formData: formData,	
			sortType: 1
		};
	},	
	sortbyID: function(e) {
		e.preventDefault();
		var sortType = this.state.sortType;				
		var employees = this.state.employees;
		if(sortType == 2) { 
			employees.sort((a, b) =>  a.id - b.id);
			sortType = 1; 
		} else { 
			employees.sort((a, b) => b.id - a.id);			 
			sortType = 2; 
		}	
		this.setState({ employees: employees, sortType: sortType });
 
	},
	sortbyFirstname: function(e) {
		e.preventDefault();
		var sortType = this.state.sortType;
		var employees = this.state.employees;
	 
		if(sortType == 3) {
			employees.sort((b, a) => a.Firstname.localeCompare(b.Firstname));
			sortType = 4; 
		} else {
			employees.sort((a, b) =>  a.Firstname.localeCompare(b.Firstname));
			sortType = 3; 
		}	
		this.setState({ employees: employees, sortType: sortType });
	},
	sortbyLastname: function(e) {
		e.preventDefault();
		var sortType = this.state.sortType;
		var employees = this.state.employees;
		if(sortType == 5) {
			employees.sort((b, a) =>  a.Lastname.localeCompare(b.Lastname));
			sortType = 6; 
		} else {
			employees.sort((a, b) =>  a.Lastname.localeCompare(b.Lastname));
			sortType = 5; 
		}	
		this.setState({ employees: employees, sortType: sortType });
	},
	clear: function(event) {
		event.preventDefault();		
		var formData = {
			id : "",
			firstname: "",
			lastname: "",
			lifeguard: false,
			instructor: false,
			headguard: false,
			supervisor: false		
		};
		this.setState({				
			formData: formData
		});
	},
	fillform: function(id) {
		
		if( id == this.state.formData.id )
		{
			var formData = {
				id : "",
				firstname: "",
				lastname: "",
				lifeguard: false,
				instructor: false,
				headguard: false,
				supervisor: false		
			};
			this.setState({				
				formData: formData
			});
			
		} else {	
			var employees = this.state.employees;
			
			var employee = employees.find( emp =>  emp.id == id );
			////console.log(employee);
			
			var id = employee.id;
			var f = employee.Firstname;
			var l = employee.Lastname;
			var Li, I, H, S;
			Li = employee.lifeguard ;
			I = employee.instructor ;
			H = employee.headguard ;
			S = employee.supervisor ;
			var mewData = {
				id: id,
				firstname: f,
				lastname: l,
				lifeguard: Li,
				instructor: I,
				headguard: H,
				supervisor: S		
			};				
			this.setState({				
				formData: mewData
			});
			
		}
	},
	lastnameChange: function(i) {
		var formData = this.state.formData;
		formData["lastname"] = removeAndCapitalize(i);
		this.setState({formData: formData});
	},
	firstnameChange: function(i) {
		var formData = this.state.formData;
		formData["firstname"] = removeAndCapitalize(i);
		this.setState({formData: formData});
	},
	certbtnClick: function(p) {
		var type = "";
		switch(p) {
			case 1: type = "lifeguard"; break;
			case 2: type = "instructor"; break; 
			case 3: type = "headguard"; break;
			case 4: type = "supervisor"; break;			
		}
		var formData = this.state.formData;
		if(formData[type] == true) {
			formData[ type ] = false;
		}else {
			formData[type] = true;
		}
		this.setState({formData: formData});
	},
	submitClick: function(event) {
		event.preventDefault();
		var message = "Are you sure you would like to update this employee?";
		if(confirm(message)) 
		{
			var formData = this.state.formData;
			var inputArr = formData;					
			var jsonItem = JSON.stringify( inputArr );	 
			var destination = BASE_URL+'doEmployeeUpdate/';
			var http = new XMLHttpRequest();
			http.onreadystatechange = function() {
				if (http.readyState == 4 && http.status == 200) {
					var data = http.responseText;
					if (data[0] == '<') { 
						window.location.replace(BASE_URL+"/Editor/");
					} else {	
						var Arr = JSON.parse( data );	
						////console.log(data);
						if( Arr[0] == 5) 
						{
							var strArr = Arr[1];
							////console.log(strArr);
							var employees = JSON.parse( Arr[1] )
							this.setState({employees:employees});
						}
						else {
							alert("An error occured. ");							
						}
					}	
				}
			}.bind(this);
			http.open('POST', destination, true);			
			http.setRequestHeader('jsonInput', jsonItem);
			http.send();		
			
		} else {
			alert("not updated");
		}
		
	},
	render: function() {		
		//////console.log(this.state.employees);
		return (
		  <div>
			<Employeetable sortbyLastname = {this.sortbyLastname} sortbyFirstname = {this.sortbyFirstname} sortbyID = {this.sortbyID} Employees = {this.state.employees} fillform = {this.fillform} formData = {this.state.formData}  />	
			<UpateForm submitClick = {this.submitClick} certbtnClick= {this.certbtnClick} lastnameChange = {this.lastnameChange} firstnameChange = {this.firstnameChange} SelectedEmployee = {0} formData = {this.state.formData} clear = {this.clear} />
		  </div>
		)
		 
	},
});
	

ReactDOM.render ( <Updateapp />, document.getElementById("UpdateApp") );	
};


function removeAndCapitalize( value ) {				
	if (value.length > 0 ) {			
		var result = value.replace( /[^A-Za-z]/g, "" );
		var R = "";
		if (result.length > 0 ) {										
			result = result.toLowerCase();		
			var R = result.charAt(0).toUpperCase()+result.slice(1); 
			result = R;				
		}			
		return result;			
	}	
}