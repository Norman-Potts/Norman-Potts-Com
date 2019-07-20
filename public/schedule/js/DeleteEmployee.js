window.RunJS = function RunJS(  BASE_URL, EMPLOYEE_ARR  ) {	
 
 const AMPM12HourArray = [ "12:00am", "12:15am", "12:30am", "12:45am", "1:00am", "1:15am", "1:30am", "1:45am", "2:00am", "2:15am", "2:30am", "2:45am", "3:00am", "3:15am", "3:30am", "3:45am", "4:00am", "4:15am", "4:30am", "4:45am", "5:00am", "5:15am", "5:30am", "5:45am", "6:00am", "6:15am", "6:30am", "6:45am", "7:00am", "7:15am", "7:30am", "7:45am", "8:00am", "8:15am", "8:30am", "8:45am", "9:00am", "9:15am", "9:30am", "9:45am", "10:00am", "10:15am", "10:30am", "10:45am", "11:00am", "11:15am", "11:30am", "11:45am", "12:00pm", "12:15pm", "12:30pm", "12:45pm", "1:00pm", "1:15pm", "1:30pm", "1:45pm", "2:00pm", "2:15pm", "2:30pm", "2:45pm", "3:00pm", "3:15pm", "3:30pm", "3:45pm", "4:00pm", "4:15pm", "4:30pm", "4:45pm", "5:00pm", "5:15pm", "5:30pm", "5:45pm", "6:00pm", "6:15pm", "6:30pm", "6:45pm", "7:00pm", "7:15pm", "7:30pm", "7:45pm", "8:00pm", "8:15pm", "8:30pm", "8:45pm", "9:00pm", "9:30pm", "9:45pm", "10:00pm", "10:15pm", "10:30pm", "10:45pm", "11:00pm", "11:15pm", "11:30pm", "11:45pm" ];									
 
class Employeerow extends React.Component {    	
 
	render() {
		 
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
		<div className = {isselected} onClick = {this.props.clickID} >
		  <div className = "idColumn" >{id}</div>
		  <div className = "FirstNameTD">{Firstname}</div>
		  <div className = "LastNameTD">{Lastname}</div>				
		  <div className = "certColumn" >{Life}</div>
		  <div className = "certColumn" >{Inst}</div>
		  <div className = "certColumn" >{Head}</div>
		  <div className = "certColumn" >{Supe}</div>
		</div>
	  )
	}
} 
class Employeetable extends React.Component {        
	render() {
		var employeeRows = [];
		for (var i = 0; i < this.props.Employees.length; i++ ) {			
			var employee = this.props.Employees[i];			
			employeeRows.push(<Employeerow arr={employee} key = {i} clickID = {this.props.fillform} formData = {this.props.formData} /> );			
		}
		var updownsymbl = String.fromCharCode(8645);
		return (  
		<div>		
			
		  <div id = "mytable">
		  <div id = "tableUpper" >
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
	}
} 

class Shift extends React.Component {    	
	
	render() {
		var shift = this.props.arr;
		
		var st = shift.startTime;
		var et = shift.endTime;
		var p = shift.Position;
		var d = shift.date;
		var h = shift.hours;
		var cls = "boxShift "+p;
		return (
	 
		<div className = {cls} >
		  <div className = "innerboxShift" >
			<div> Position: {p}</div>
			<div> Date: {d}</div>
			<div> Time: {st} - {et}  <span className = "twoEmLeft"> Hours: {h}</span> </div>			
			<button className="giveawayshift" onClick = { () => this.props.giveawayshift(shift)} >Give this shift to someone else.</button>
		  </div>
		</div>
	 
		)
	}	
}
class DeleteLoginForm extends React.Component {    
  render() {			
	return (
		<div id = "DeleteLoginForm" >
			<h1> Login again to confirm deletion of employee </h1> 											
				<div id = "LoginApp">
					
						<legend> Schedule Editor Login  </legend>		
						<div className="form-group">
							<br />
							<label htmlFor = "Username"> Username </label>
							<input type = "text" id="username" name ="username" maxLength = "21" autoFocus value = {this.props.Username} onChange = {this.props.UsernameChange} ></input>						
						</div>		
						<div className="form-group">
							<br />
							<label htmlFor ="Password"> Password </label>
							<input type = "password" id="password" name = "password" maxLength = "21" value = {this.props.Password} onChange = {this.props.PasswordChange} ></input>
						</div>						
						<button className = "marginRightOne" onClick = {this.props.doDeleteLogin} >Confirm Deletion of Employee</button> 
						<button className = "marginLeftOne" onClick = {this.props.CloseModal} >Cancel</button>
					
				</div>
			</div>	
	)
  }
}
class Areyousure extends React.Component {	
	render() {	 
		return (		
		<div>
		  <h1> Are you sure you wish to delete this employee? </h1> 			
		  <button onClick ={this.props.ConfirmDelete} >Yes, Delete This Employee</button><button  onClick = {this.props.CloseModal} >No</button>
		</div>	 		 
		)
	}	
}
class Theemployeehasbeendeleted extends React.Component {	
	render() {	 
		return (		
		<div>
		  <h1> The employee and their shifts have beeen deleted. </h1> 			
		  <button onClick = {this.props.CloseModal} >Okeydokie</button>
		</div>	 		 
		)
	}	
}
class Shifttradecomplete extends React.Component {
	render() {		
		
		return (
		<div>
		  <h1> The Shift has been given to that employee. </h1> 			
		  <button onClick = {this.props.CloseModal} >Okeydokie</button>
		</div>	 		 		
		)		
	}
}
class Nooneisavailable extends React.Component {
	render() {		
		
		return (
		<div className = "EmployeeCell" >
		  <h3 className = "bold" > No one is available. </h3> 			
		  <button onClick = {this.props.CloseModal} >Okeydokie</button>
		</div>	 		 		
		)		
	}
}
class Theavailableemployees extends React.Component {
	render() {
		var avaiableEmployeesCells  = [];
		if(this.props.avaiableEmployees.length > 0 )
		{ 	for (var i =0; i<this.props.avaiableEmployees.length; i++ )
			{	
				var arr = this.props.avaiableEmployees[i];
				avaiableEmployeesCells.push(<Availableemployee Employee = {arr} key = {i} GiveShiftTo = {this.props.GiveShift} />);			
			}
		}else {
			avaiableEmployeesCells.push(<Nooneisavailable CloseModal = {this.props.CloseModal}  key = {0} />);			
		}		
		return (
		  <div>
		  <h1>These are the employees available. </h1>
		  <div className = "EmployeeListBox" >
		  <div className = "EmployeeListInner" > 
		  {avaiableEmployeesCells} 
		  </div>
		  </div>
		  </div>
		)
	}	
}

class Availableemployee extends React.Component {
	constructor(props) {
		super(props);
		
		this.GiveShiftTo = this.GiveShiftTo.bind(this);
	}
	GiveShiftTo() {
		var arr = this.props.Employee;		
		var id = arr["id"];
		var ShiftID;
		
		this.props.GiveShiftTo(id);
	}
	render() {		
		var arr = this.props.Employee;		
		var Firstname, Lastname, id, Lif, Ins, Hea, Sup, Availability,  Hours;
		Firstname = arr["Firstname"]; Lastname = arr["Lastname"]; id = arr["id"]; Ins = (arr["instructor"] == 1 ) ? "Yes" : "No"; Lif = (arr["lifeguard"]  == 1 ) ? "Yes" : "No"; Hea = (arr["headguard"]  == 1 ) ? "Yes" : "No"; Sup = (arr["supervisor"] == 1 ) ? "Yes" : "No"; Availability = arr["Availability"]; Hours = arr["HoursThisWeek"];		
		return (
		  <div className = "EmployeeCell"  >
			<div className = "bold" > {Firstname}  {Lastname}</div>
			<div>
			  <div>Lifeguard: {Lif} </div>
			  <div>Instructor: {Ins} </div>
			  <div>Headguard: {Hea} </div>
			  <div>Supervisor: {Sup} </div>
			</div>
			<div> Hours this week already: {Hours}</div>
			<div> <span className = "bold" > Availability </span>
				<div>
				<div>Sunday: {Availability["Sunday"] } </div>					
				<div>Monday:   {Availability["Monday"]} </div>
				<div>Tuesday:  {Availability["Tuesday"] } </div>
				<div>Wednesday:{Availability["Wednesday"]}  </div>
				<div>Thrusday: {Availability["Thrusday"]} </div>
				<div>Friday:   {Availability["Friday"]}</div>
				<div>Saturday:   {Availability["Saturday"]}  </div>
				<div>General Notes:   {Availability["Generalnote"]}  </div>
				</div>
			</div>
			<button onClick = {this.GiveShiftTo} >Give Shift to this employee </button> 
		  </div>
		)
	}	
}
class Modal extends React.Component {	
	constructor(props) {
		super(props);
		
		this.state = { Username:"", Password: ""  };
		this.UsernameChange = this.UsernameChange.bind(this);
		this.PasswordChange = this.PasswordChange.bind(this);
		this.doDeleteLogin = this.doDeleteLogin.bind(this);
		this.GiveShiftToEmployee = this.GiveShiftToEmployee.bind(this);
	}
	GiveShiftToEmployee(id) {
		
		var ShiftID = this.props.selectedShift.ShiftID;
		var jsonItem = JSON.stringify( [ id, ShiftID ] );	 
		var destination = BASE_URL+'Editor/GiveShiftToEmployee/';
		var http = new XMLHttpRequest();
		http.onreadystatechange = function() {
			if (http.readyState == 4 && http.status == 200) {
				var data = http.responseText;
					
				if (data[0] == '<') { 
					window.location.replace(BASE_URL+"/Editor/");
				} else {	
					var Arr = JSON.parse( data );					
					if( Arr[0] == 1) 
					{						 
						//// reload shifts list.
						//// Change modal.
						var EmployeeID = this.props.formData.id;
						jsonItem = JSON.stringify( EmployeeID );	 
						destination = BASE_URL+'Editor/getEmployeeShifts/';
						http = new XMLHttpRequest();
						http.onreadystatechange = function() {
							if (http.readyState == 4 && http.status == 200) {
								var data = http.responseText;
								if (data[0] == '<') { 
									window.location.replace(BASE_URL+"/Editor/");
								} else {	
									var Arr = JSON.parse( data );	
								
									if( Arr[0] == 5) 
									{
										var strArr = Arr[1];										
										var Shifts = JSON.parse( Arr[1] );						
										var formData = this.props.formData;
										formData["Shifts"] =  Shifts;
										this.props.CompletedShiftSwitch(formData );
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
						alert("An error occured. ");							
					}
				}	
			}
		}.bind(this);
		http.open('POST', destination, true);			
		http.setRequestHeader('jsonInput', jsonItem);
		http.send();		
		
		
		
		
	}
	doDeleteLogin(e) {		
		e.preventDefault();
		var username = this.state.Username;
		var password = this.state.Password;		
		var id = this.props.formData.id;
		var jsonItem = JSON.stringify( [ id, username , password ] );	 
		var destination = BASE_URL+'Editor/doDeleteEmployeeNShifts/';
		var http = new XMLHttpRequest();
		http.onreadystatechange = function() {
			if (http.readyState == 4 && http.status == 200) {
				var data = http.responseText;
					
				if (data[0] == '<') { 
					window.location.replace(BASE_URL+"/Editor/");
				} else {	
					var Arr = JSON.parse( data );					
					if( Arr[0] == 1) 
					{						 
						
						//// clear form.
						//// have modal say employee was deleted.
						//// need ot rest page.
						this.props.completedDelete();
						
						
					} else if( Arr[0] == 3)  {
						alert("Password was inncorect.");
						
					} else {
						
						alert("An error occured. ");							
					}
				}	
			}
		}.bind(this);
		http.open('POST', destination, true);			
		http.setRequestHeader('jsonInput', jsonItem);
		http.send();		
		
	}
	UsernameChange(e) {
		var val = e.target.value;		
		
		this.setState({ Username: val });
	}
	PasswordChange(e) {
		var val = e.target.value;		 
		
		this.setState({ Password: val });
	}
	render() {
		
		var cls = "";
		var modalContent;
	
		
		if(this.props.modal == true) {
			
		    if (this.props.stage == 1) {		        
				modalContent = <Areyousure CloseModal = {this.props.CloseModal}  ConfirmDelete = {this.props.ConfirmDelete}   />;
				cls = "showModal" ;
		    } else if (this.props.stage == 2) {
				modalContent  = <DeleteLoginForm doDeleteLogin = {this.doDeleteLogin} CloseModal = {this.props.CloseModal}  Password = {this.props.Password} Username= {this.props.Username}  PasswordChange = {this.PasswordChange} UsernameChange = {this.UsernameChange} />;
				cls = "showModal" ;
		    } else if (this.props.stage == 3 ) {
				modalContent = <Theemployeehasbeendeleted CloseModal = {this.props.CloseModal}  />;
				cls = "showModal" ;
			} else if ( this.props.stage == 4 ) {
				modalContent = <Theavailableemployees CloseModal = {this.props.CloseModal}  avaiableEmployees = {this.props.emeployeesAvailable} GiveShift = {this.GiveShiftToEmployee} />;
				cls = "showModal" ;						
			} else if (  this.props.stage == 5) {
				
				modalContent = <Shifttradecomplete CloseModal = {this.props.CloseModal} />;
				cls = "showModal" ;			
			} else {
				cls = "hideModal";
			}		
		}
		else {
			cls = "hideModal";
		}		
		
		return (		
		<div className = {cls} >
			<div className = "modalContent" >  <span className="close" onClick = {this.props.CloseModal} >&times;</span>			
			{modalContent}			
			</div>
		</div>
		 
		)
		
	}	
}

class DeleteForm extends React.Component {    
	constructor( props) {
        super( props);
		var emps = {};
		var shift = {};
	    this.state = { modal: false,  stage: 0, emeployeesAvailable: emps, SelectedShift: shift };
		this.CloseModal = this.CloseModal.bind(this);
		this.ConfirmDelete = this.ConfirmDelete.bind(this);		
		this.completedDelete = this.completedDelete.bind(this);
		this.giveawayshift = this.giveawayshift.bind(this);
		this.CompletedShiftSwitch = this.CompletedShiftSwitch.bind(this);
	}
	completedDelete() {
		
		var jsonItem = ""; 
		var destination = BASE_URL+'Editor/getEmployeeandShiftsfordeleteTable/';
		var http = new XMLHttpRequest();
		http.onreadystatechange = function() {
			if (http.readyState == 4 && http.status == 200) {
				var data = http.responseText;
				
				if (data[0] == '<') { 
					window.location.replace(BASE_URL+"/Editor/");
				} else {	
					var Arr = JSON.parse( data );					
					if( Arr[0] == 1) 
					{						 
						var employees = JSON.parse( Arr[1] );						
						this.props.completedDelete(employees);
						this.setState({ stage: 3 });
						
					} else if( Arr[0] == 3)  {
						alert("Password was inncorect.");
						
					} else {
						
						alert("An error occured. ");							
					}
				}	
			}
		}.bind(this);
		http.open('GET', destination, true);			
		http.setRequestHeader('jsonInput', jsonItem);
		http.send();		
		
		
		
	}
	ConfirmDelete() {
		this.setState({ modal: true,  stage: 2});
	}
	CloseModal(e) {
		
		e.preventDefault();
		this.setState({ modal: false,  stage: 0});
	}
	runDelete(formData) {				
		var ID = formData.id;
		var firstname  = formData.firstname;
		var lastname   = formData.lastname;
		this.setState({ modal: true,  stage: 1 });		
	}
	giveawayshift(shift) {

		
	
		var jsonItem =  JSON.stringify(shift);
		var destination = BASE_URL+'Editor/getEmployeeShiftswhoCantakeshift/';
		var http = new XMLHttpRequest();
		http.onreadystatechange = function() {
			if (http.readyState == 4 && http.status == 200) {
				var data = http.responseText;
				
				if (data[0] == '<') { 
					window.location.replace(BASE_URL+"/Editor/");
				} else {	
					var Arr = JSON.parse( data );					
					if( Arr[0] == 1) 
					{						 
						var employees = JSON.parse( Arr[1] );						
						this.setState({ modal: true,  emeployeesAvailable:employees, SelectedShift: shift, stage: 4});
						
						
					} else {
						alert("An error occured. ");							
					}
				}	
			}
		}.bind(this);
		http.open('GET', destination, true);			
		http.setRequestHeader('jsonInput', jsonItem);
		http.send();		
		
		
		
		
	}
	CompletedShiftSwitch(formData) {		
		
		this.setState({ formData: formData, stage: 5 });
	}
	render() {
		var FutureShifts = [] ;
		var FutureShiftsContainer;
		var formData = this.props.formData;	
		var firstname  = formData.firstname;
		var lastname   = formData.lastname;
		var disaable = true;
		if(this.props.formData.id != "" ) 
		{	
			disaable = false;
			for (var i = 0; i < this.props.formData.Shifts.length; i++ ) {			
				var s = this.props.formData.Shifts[i];			
				FutureShifts.push(<Shift arr={s} key = {i} giveawayshift = {this.giveawayshift}     /> );			
			}			
			FutureShiftsContainer =<div><p>Below is a list of this employee's shifts after today. They will be deleted when the employee gets deleted. </p>  <div id = "FutureShiftsContainer">{FutureShifts}</div> </div>;
		}
		else
		{
			FutureShiftsContainer = <div></div>;			
		}
		
		var ID = formData.id;
		return (  
		  <div id = "DeleteForm" >
			<Modal CompletedShiftSwitch = {this.CompletedShiftSwitch} selectedShift = {this.state.SelectedShift} stage = {this.state.stage} completedDelete = {this.completedDelete} emeployeesAvailable= {this.state.emeployeesAvailable} modal = {this.state.modal}  formData = {this.props.formData}  CloseModal = {this.CloseModal}  ConfirmDelete = {this.ConfirmDelete}   />			
			<div id = "deleteformupper">
				<div className="IDFormGroup">				
					<label htmlFor = "ID"> ID: </label>
					<input type ="text" name="ID"  value = {ID} readOnly disabled size = "3" />		
				</div>								
				<div className="FirstnameFormGroup">				
					<label htmlFor = "Firstname"> Firstname: </label>
					<input type ="text" name="Firstname" maxLength = "21" readOnly disabled  value = { firstname}    />
				</div>				
				<div className="LastnameFormGroup">				
					<label htmlFor = "Lastname"> Lastname: </label>
					<input type ="text" name="Lasttname"  maxLength = "21" readOnly disabled value = {lastname}   />		
				</div>	
			</div>						
			{FutureShiftsContainer}
			<button  id = "deleteBtn" disabled={disaable}  onClick = { () => this.runDelete(formData)} >Delete employee and any shifts they have </button>
		  </div>	  
	  )
	}
} 
class Deleteapp extends React.Component {    
	constructor( props) {
        super( props);
		 
		var formData = {
			id : "", firstname: "", lastname: "", Shifts: []
		};
		
		
		///[{"startTime":5,"endTime":16,"date":"2018-12-19","Position":2,"ShiftID":4},{"startTime":17,"endTime":22,"date":"2018-12-19","Position":1,"ShiftID":5},
		var Shifts = [ ];
        this.state = { employees: EMPLOYEE_ARR, formData: formData, sortType: 1 };
		this.fillform = this.fillform.bind(this);
		this.sortbyID = this.sortbyID.bind(this);
		this.sortbyFirstname = this.sortbyFirstname.bind(this);
		this.sortbyLastname = this.sortbyLastname.bind(this);
		this.completedDelete = this.completedDelete.bind(this);
    }
	sortbyID() {
		 
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
 
	}
	completedDelete(employeeArr) {
		
		var formData = {
			id : "", firstname: "", lastname: "", Shifts: []
		};
		this.setState({ employees: employeeArr, formData: formData, });
		
	}
	sortbyFirstname() {
		
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
	}
	sortbyLastname() {
	 
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
	}
	fillform(event) {
		var id = event.currentTarget.firstChild.innerHTML;		
			 				
			var jsonItem = JSON.stringify( id );	 
			var destination = BASE_URL+'Editor/getEmployeeShifts/';
			var http = new XMLHttpRequest();
			http.onreadystatechange = function() {
				if (http.readyState == 4 && http.status == 200) {
					var data = http.responseText;
					if (data[0] == '<') { 
						window.location.replace(BASE_URL+"/Editor/");
					} else {	
						var Arr = JSON.parse( data );	
					
						if( Arr[0] == 5) 
						{
							var strArr = Arr[1];
							
							var Shifts = JSON.parse( Arr[1] );
							var employees = this.state.employees;
							var employee = employees.find( emp =>  emp.id == id );									
							var formData = { id : id, firstname: employee.Firstname, lastname: employee.Lastname, Shifts: Shifts }
							this.setState({formData:formData});
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
		
		
		
	}
	formData() {
		
	}
	render() {
		
		return (  
		  <div>
			<Employeetable  sortbyLastname = {this.sortbyLastname} sortbyFirstname = {this.sortbyFirstname} sortbyID = {this.sortbyID} Employees = {this.state.employees}  fillform = { this.fillform} formData = {this.state.formData}  />	
			<DeleteForm  completedDelete = {this.completedDelete} formData = {this.state.formData}  Shifts = {this.state.Shifts} />
		  </div>
	  
	  )
	}
}

	
	ReactDOM.render ( <Deleteapp />, document.getElementById("DeleteApp") );
};