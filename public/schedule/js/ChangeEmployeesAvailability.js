window.RunJS = function RunJS(  BASE_URL,  EMPLOYEE_ARR  ) {	
	class Availabilityform extends React.Component {    	 
		render() {

			var formData = this.props.formData;
			 
			var id = formData["id"]; var firstname = formData["firstname"]; var lastname = formData["lastname"]; var Availability = formData["Availability"];
			var EmployeeName = "";
			var Sunday = ""; var Monday = ""; var Tuesday = ""; var Wednesday = ""; var Thrusday = ""; var Friday = ""; var Saturday = ""; var Generalnote = "";
			var savebtnCls = "btn_UpdateEmployeeNotActive";
			var abled  = true;
			/// if id is not "" then it has been set.
			if (id != "" ) {
				Sunday = Availability["Sunday"];  Monday = Availability["Monday"];  Tuesday = Availability["Tuesday"];  Wednesday = Availability["Wednesday"];  Thrusday = Availability["Thrusday"];  Friday = Availability["Friday"];  Saturday = Availability["Saturday"]; Generalnote = Availability["Generalnote"];
				EmployeeName = firstname+" "+lastname;
				savebtnCls = "btn_UpdateEmployeeColorActive";
				abled = false;
			} else {
				savebtnCls = "btn_UpdateEmployeeNotActive";
				abled = true;;
			}
			return (  
			<div>								
				<div id = "AvailabilityEditorContainer">					
					<h3> Selected Employee: <span id = "SelectedEmployeeName">{EmployeeName}</span> <button id = "btn_clear" className = {savebtnCls} disabled = {abled} onClick = {this.props.clearform}  >Clear</button>	</h3>						
					<div className ="AV_Booxes" id= "Av_Sundays" >
						<h4>Sunday</h4>
						<textarea rows="6" cols="50" value = {Sunday} name = "Sunday" disabled = {abled}  onKeyUp  = {  this.props.textareachange } onChange = {  this.props.textareachange } ></textarea>
					</div>
					<div className ="AV_Booxes" id= "Av_Mondays"> 						
						<h4>Monday</h4> 
						<textarea rows="6" cols="50" value = {Monday} name = "Monday"  disabled = {abled} onKeyUp  = {  this.props.textareachange } onChange = {  this.props.textareachange }  ></textarea>
					</div>						
					<div className ="AV_Booxes" id= "Av_Tuesdays">
						<h4>Tuesday</h4>
						<textarea rows="6" cols="50" value = {Tuesday} name = "Tuesday"  disabled = {abled} onKeyUp  = {  this.props.textareachange } onChange = {   this.props.textareachange }   ></textarea>
					</div>
					<div className ="AV_Booxes" id= "Av_Wednesdays">
						<h4>Wednesday</h4>
						<textarea rows="6" cols="50" value = {Wednesday}  name = "Wednesday" disabled = {abled} onKeyUp  = {  this.props.textareachange } onChange = {  this.props.textareachange }  ></textarea>
					</div>
					<div className ="AV_Booxes" id= "Av_Thrusdays">
						<h4>Thrusday</h4> 
						<textarea rows="6" cols="50" value = {Thrusday} name = "Thrusday"  disabled = {abled} onKeyUp  = {  this.props.textareachange } onChange = { this.props.textareachange }  ></textarea>
					</div>
					<div className ="AV_Booxes" id= "Av_Fridays" >
						<h4>Friday</h4>
						<textarea rows="6" cols="50" value = {Friday}  name = "Friday" disabled = {abled} onKeyUp  = {  this.props.textareachange } onChange = { this.props.textareachange }  ></textarea>
					</div>
					<div className ="AV_Booxes" id= "Av_Saturdays">
						<h4>Saturday</h4> 
						<textarea rows="6" cols="50" value = {Saturday} name = "Saturday"  disabled = {abled}  onKeyUp  = {  this.props.textareachange } onChange = {   this.props.textareachange }  ></textarea>
					</div>
				
					<div className ="AV_Booxes" id= "Av_General" >
						<h4>General Notes</h4> 
						<textarea rows="6" cols="50" value = {Generalnote}  name = "Generalnote" disabled = {abled}  onKeyUp  = {  this.props.textareachange } onChange = {  this.props.textareachange }  ></textarea>
					</div>						
					<button id = "btn_saveAvailability" className = {savebtnCls} disabled = {abled} onClick = {this.props.saveAvailability}  >Save</button>					
				</div>
			</div>
		  )
		}
	}
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
	class Setavailability extends React.Component {    
		constructor( props) {
			super( props);
			
			var Availability = { Sunday: "", Monday: "", Tuesday: "", Wednesday: "", Thrusday: "", Friday: "", Saturday: "", Generalnote: "" };
			
			var formData = { id : "", firstname: "", lastname: "", Availability: Availability }			
			this.state = { formData: formData, employees: EMPLOYEE_ARR };
			this.fillform = this.fillform.bind(this);
			this.sortbyID = this.sortbyID.bind(this);	
			this.sortbyFirstname = this.sortbyFirstname.bind(this);
			this.sortbyLastname = this.sortbyLastname.bind(this);
			this.clearform = this.clearform.bind(this);
			this.saveAvailability = this.saveAvailability.bind(this);
			this.textareachange = this.textareachange.bind(this);
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

			if (id != this.state.formData.id ) {
				var jsonItem = JSON.stringify( id );	 
				var destination = BASE_URL+'Editor/getAvailabilityArr/';
				var http = new XMLHttpRequest();
				http.onreadystatechange = function() {
					if (http.readyState == 4 && http.status == 200) {
						var data = http.responseText;	
						////////console.log(data);						
						if (data[0] == '<') { 
							window.location.replace(BASE_URL+"/Editor/");
						} else {	
							var Arr = JSON.parse( data );	
						
							if( Arr[0] ==1) 
							{
								var strArr = Arr[1];
								
								var a = JSON.parse( Arr[1] );
								var Availability = a[0].Availability;
								var employees = this.state.employees;
								var employee = employees.find( emp =>  emp.id == id );									
								var formData = { id : id, firstname: employee.Firstname, lastname: employee.Lastname, Availability: Availability }
								this.setState({formData:formData});
								
							}
							else {
								alert("An error occured. ");							
							}
						}	
					}
				}.bind(this);
				http.open('GET', destination, true);			
				http.setRequestHeader('jsonInput', jsonItem);
				http.send();				
			} else {
				this.clearform();
					
			}
		}
		clearform() {
			var Availability = { Sunday: "", Monday: "", Tuesday: "", Wednesday: "", Thrusday: "", Friday: "", Saturday: "", Generalnote: "" };
			var formData = { id : "", firstname: "", lastname: "", Availability: Availability }		
			this.setState({formData: formData});
			
		}
		saveAvailability() {
				 
			var id = this.state.formData.id;
			var Availability = this.state.formData.Availability;
			var jsonItem = JSON.stringify( [ id, Availability ] );	 
			var destination = BASE_URL+'Editor/setAvailability/';
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
							
							this.clearform();
							alert("Availability was set.");
							
						} else if( Arr[0] == 3)  {
							alert("An error occured. data was inncorect.");
							
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
		textareachange(event) {
			var val = event.target.value;			 										
			var name = event.target.name;
			var Availability = this.state.formData.Availability;			
			var formData = this.state.formData;	
			Availability[name] = val;
			formData.Availability = Availability;
			this.setState({formData: formData});
			
				
		}
		render() {		
			return (  
			  <div>
				<Employeetable  sortbyLastname = {this.sortbyLastname} sortbyFirstname = {this.sortbyFirstname} sortbyID = {this.sortbyID} Employees = {this.state.employees}   fillform = { this.fillform} formData = {this.state.formData}  />	
				<Availabilityform formData = {this.state.formData}  saveAvailability = {this.saveAvailability}  clearform = {this.clearform}  textareachange = {this.textareachange}  />
			  </div>	  
			)
		}
	}

		
	ReactDOM.render ( <Setavailability />, document.getElementById("SetAvailabilityApp") );
};