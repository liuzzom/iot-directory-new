
var gb_datatypes ="";
var gb_value_units ="";
var gb_value_types = "";
var defaultPolicyValue = [];
// var mynewAttributes = [];

var gb_options = [];

var gb_device ="";
var gb_latitude ="";
var gb_longitude = "";
var gb_key1;
var gb_key2;


var dataTable ="";


  var filterDefaults = {
			myOwnPrivate: 'MyOwnPrivate',
			myOwnPublic: 'MyOwnPublic',
			myPrivate: 'private',
            		public: 'public'
        };
		
		
     //   var existingPoolsJson = null;
        // var internalDest = false;
        var tableFirstLoad = true;


		
 $.ajax({url: "../api/device.php",
         data: {
			 action: 'get_param_values',
             organization:organization
			 },
         type: "POST",
         async: true,
         dataType: 'json',
         success: function (mydata)
         {
		   gb_datatypes= mydata["data_type"];
		   gb_value_units= mydata["value_unit"];
		   gb_value_types= mydata["value_type"];		   
         },
		 error: function (mydata)
		 {
		   console.log(JSON.stringify(mydata));
		   alert("Network errors. <br/> Get in touch with the Snap4City Administrator<br/>"+ JSON.stringify(mydata));
		 }
});
     
function removeElementAt(parent,child) {
    var list = document.getElementById(parent);
	// var content = child.parentElement.parentElement.parentElement.innerHTML
  // console.log("elemento cancellato " + document.getElementById('deletedAttributes').innerHTML);
	if (parent=="editlistAttributes") 
	{     document.getElementById('deletedAttributes').appendChild(child.parentElement.parentElement.parentElement);}
	else list.removeChild(child.parentElement.parentElement.parentElement);
}


function drawAttributeMenu
(attrName, data_type, value_type, editable, value_unit, healthiness_criteria, value_refresh_rate, parent)
{
    options="";
    if (value_type!="") labelcheck= value_type;
    else labelcheck="";	
	for (var n=0; n < gb_value_types.length; n++)
	{
	  if (labelcheck == gb_value_types[n]) 
		 options += "<option value=\""+gb_value_types[n]+"\" selected>"+ gb_value_types[n]+ "</option>";
	  else options += "<option value=\""+gb_value_types[n]+"\">"+ gb_value_types[n]+ "</option>";
	}
	
    myunits="";// <option value=\"none\"></option>";
    if (value_unit!="") labelcheck= value_unit;
	else labelcheck="";
    for (var n=0; n < gb_value_units.length; n++)
	{
	  if (labelcheck == gb_value_units[n]) 
		 myunits += "<option value=\""+gb_value_units[n]+"\" selected>"+ gb_value_units[n]+ "</option>";
	  else myunits += "<option value=\""+gb_value_units[n]+"\">"+ gb_value_units[n]+ "</option>";
	}
	
	mydatatypes="";
    if (data_type!="") labelcheck= data_type;
	else labelcheck="";
    for (var n=0; n < gb_datatypes.length; n++)
	{
	  if (labelcheck == gb_datatypes[n]) 
		 mydatatypes += "<option value=\""+gb_datatypes[n]+"\" selected>"+ gb_datatypes[n]+ "</option>";
	  else mydatatypes += "<option value=\""+gb_datatypes[n]+"\">"+ gb_datatypes[n]+ "</option>";
	}
	
 return "<div class=\"row\" style=\"border:3px solid blue;\" ><div class=\"col-xs-6 col-md-3 modalCell\">" +
        "<div class=\"modalFieldCnt\"><input type=\"text\" class=\"modalInputTxt\""+
		"name=\"" +  attrName +  "\"  value=\"" + attrName + "\">" + 
        "</div><div class=\"modalFieldLabelCnt\">Value Name</div></div>"+
			
		"<div class=\"col-xs-6 col-md-3 modalCell\"><div class=\"modalFieldCnt\">"+
		"<select class=\"modalInputTxt\" name=\""+ attrName+"-type" +
		"\">" + mydatatypes + 
		"</select></div><div class=\"modalFieldLabelCnt\">Data Type</div></div>" + 
	
		"<div class=\"col-xs-6 col-md-3 modalCell\"><div class=\"modalFieldCnt\">" +
		"<select class=\"modalInputTxt\" name=\""+ value_type +
		"\">" + 		 options + 
		"</select></div><div class=\"modalFieldLabelCnt\">Value Type</div></div>" +
		
		"<div class=\"col-xs-6 col-md-3 modalCell\"><div class=\"modalFieldCnt\">" +
		"<select class=\"modalInputTxt\" name=\""+ editable +
		"\">" + 
		"<option value='0' default>false</option>" +
		"<option value='1'>true</option> </select>" +
		"</div><div class=\"modalFieldLabelCnt\">Editable</div></div>"+
		
		"<div class=\"col-xs-6 col-md-3 modalCell\"><div class=\"modalFieldCnt\">" +
		"<select class=\"modalInputTxt\" name=\""+ value_unit +
		"\">" + 
		 myunits + 
		"</select></div><div class=\"modalFieldLabelCnt\">Value Unit</div></div>"+
   		
		"<div class=\"col-xs-6 col-md-3 modalCell\"><div class=\"modalFieldCnt\">" +
		"<select class=\"modalInputTxt\" name=\"" + healthiness_criteria +
		"\" \>"+ 
			"<option value=\"refresh_rate\">Refresh rate</option>" +
			"<option value=\"different_values\">Different Values</option>" +
			"<option value=\"within_bounds\">Within bounds</option>" +
	       "</select></div><div class=\"modalFieldLabelCnt\">Healthiness Criteria</div></div>"+
		
		"<div class=\"col-xs-6 col-md-3 modalCell\"><div class=\"modalFieldCnt\">" +
		"<input type=\"text\" class=\"modalInputTxt\" name=\""+ value_refresh_rate +
		"\" value=\"" + value_refresh_rate + "\"></div><div class=\"modalFieldLabelCnt\">Healthiness_Value</div></div>"+
		
		
		"<div class=\"col-xs-6 col-md-3 modalCell\"><div class=\"modalFieldCnt\">" +
		//"<i class=\"fa fa-minus-square\" onclick=\"removeElementAt('" + parent + "',this); return true;\"  style=\"font-size:36px; color: #ffcc00\"></i></div></div></div>";
	    "<button class=\"btn btn-warning\" onclick=\"removeElementAt('" + parent + "',this); return true;\">Remove Value</button></div></div></div>";

		
}		
  
  
function format ( d ) {

		
		// `d` is the original data object for the row
  	return '<div class="container-fluid">' +
	'<div class="row">' +
		'<div class="col-xs-6 col-sm-6" style="background-color:#D6CADD;"><b>Frequency:</b>' + "  " + d.frequency +'</div>' +
		'<div class="clearfix visible-xs"></div>' +
		'<div class="col-xs-6 col-sm-6" style="background-color:#D6CADD;"><b>Contextbroker:</b>' + "  " + d.contextbroker + '</div>' +								
	'</div>' +
	'<div class="row">' +
		'<div class="col-xs-6 col-sm-6" style="background-color:#E6E6FA;"><b>Link:</b>' + "  " + d.link + '</div>' +
		'<div class="clearfix visible-xs"></div>' +
		'<div class="col-xs-6 col-sm-6" style="background-color:#E6E6FA;"><b>Key Generator:</b>' + "  " + d.kgenerator + '</div>' +
	'</div>' + 
	 
    '</div>' ;
	
}



  function updateDeviceTimeout()
        {
            $("#editModelOkModal").modal('hide');
            setTimeout(function(){
               location.reload();
            }, 500);
        }
        
  
  function fetch_data(destroyOld, selected=null)
  {
	  
	  
	  console.log("Enter:" + selected);
		if(destroyOld)
            {
				$('#modelTable').DataTable().clear().destroy();
                tableFirstLoad = true;			
            }
           
			if (selected==null)
			{
			  mydata = {action: "get_all_models_DataTable",username:loggedUser,loggedrole: loggedRole, token : sessionToken,  organization:organization, no_columns: ["position", "owner", "edit","delete"]}; 
			}
			else
			{			  
                //not used this case
                mydata = {action: "get_model", select : selected, token : sessionToken,loggedrole:loggedRole, organization:organization, no_columns: ["position", "owner", "edit","delete"]};
			}
			
   dataTable = $('#modelTable').DataTable({
    "processing" : true,
    "serverSide" : true,
	"responsive": {
        details: false
		},
	"paging"   : true,
 	"ajax" : {
	 url: "../api/model.php",
	 data: mydata,
	 datatype: 'json',
     type: "POST"
    },

	"columns": [
           {
			"class":          "details-control",
			"name": "position",
			"orderable":      false,
			"data":           null,
			"defaultContent": "",
			"render": function () {
					 return '<i class="fa fa-plus-square" aria-hidden="true"></i>';
				 },
			width:"15px"
            }, 	
			{"name": "name", "data": function ( row, type, val, meta ) {
			
				return row.name;
				} },			
			{"name": "description", "data": function ( row, type, val, meta ) {
				  return row.description;
				} },	
            {"name": "visibility", "data": function ( row, type, val, meta ) {
			
				  				  
				if (row.visibility=='MyOwnPrivate'){   
					return '<button type="button"  class=\"myOwnPrivateBtn\" onclick="changeVisibility(\''+ row.name + '\',\''+ row.visibility + '\',\''+ row.organization + '\',\''+ row.organization +':'+row.name+ '\')">' + row.visibility + '</button>';																				
					} 
				else if (row.visibility=='MyOwnPublic'){
					return '<button type="button"  class=\"myOwnPublicBtn\" onclick="changeVisibility(\''+ row.name + '\',\''+ row.visibility + '\',\''+ row.organization + '\',\''+ row.organization +':'+row.name + '\')">' + row.visibility + '</button>';
					}
				else if (row.visibility=='public') 
				{
					return '<button type="button"  class=\"publicBtn\" >' + row.visibility + '</button>';
					}
				else // value is private
				{
				  return "<div class=\"delegatedBtn\">"+ row.visibility + "</div>";								  
					}
					
				} },
			{"name": "organization", "data": function ( row, type, val, meta ) {
			
				  return row.organization;
				} },
			{"name": "owner", "data": function ( row, type, val, meta ) {
			
				  return row.owner;
				} },
			{"name": "kind", "data": function ( row, type, val, meta ) {
			
				  return row.kind;
				} },
			{"name": "producer", "data": function ( row, type, val, meta ) {
			
				  return row.producer;
				} },
			{"name": "devicetype", "data": function ( row, type, val, meta ) {
			
				  return row.devicetype;
				} },
       
			{
                data: null,
				"name": "edit",
				"orderable":      false,
                className: "center",
				render: function(d) {
                //defaultContent: '<button type="button" id="edit" class="editDashBtn data-id="'+ row.name +'"">Edit</button>'
				return '<button type="button" class="editDashBtn" ' +
				'data-id="'+d.id+'" ' +
				'data-organization="'+d.organization+'" ' +
				'data-name="'+d.name+'" ' +
				'data-kind="'+d.kind+'" ' +
				'data-description="'+d.description+'" ' +
				'data-devicetype="'+d.devicetype+'" ' +
				'data-producer="'+d.producer+'" ' +
				'data-frequency="'+d.frequency+'" ' +
				'data-format="'+d.format+'" ' +
				'data-link="'+d.link+'" ' +
				'data-protocol="'+d.protocol+'" ' +
				'data-contextbroker="'+d.contextbroker+'" ' +
				'data-healthiness_criteria="'+d.healthiness_criteria+'" ' +
				'data-healthiness_value="'+d.healthiness_value+'" ' +
				'data-kgenerator="'+d.kgenerator+'" ' +
				'data-edgegateway_type="'+d.edgegateway_type+'" ' +
				'data-attributes="'+d.attributes+'" ' +
				'data-k1="'+d.k1+'" ' +
				'data-k2="'+d.k2+'" ' +
				'data-policy="'+d.policy+'">Edit</button>';
				
				}
            },
			{
                data: null,
				"name": "delete",
				"orderable":      false,
                className: "center",
                //defaultContent: '<button type="button" id="delete" class="delDashBtn delete">Delete</button>'
				render: function(d) {
				return '<button type="button" class="delDashBtn" ' +
				'data-name="'+d.name+'" ' +
				'data-id="'+d.id+'">Delete</button>';
				}
            }
        ], 
    "order" : []
    
	 
   });
   
   
   	if (loggedRole!='RootAdmin' && loggedRole!='ToolAdmin') {		
	dataTable.columns( [4,5] ).visible( false );		
	}
      if (loggedRole=='ToolAdmin') {		
	dataTable.columns( [5] ).visible( false );		
	}
  
  }

  
    $(document).ready(function () 
    {
	
//fetch_data function will load the device table 	
		fetch_data(false);	
		
//detail control for device dataTable
	var detailRows = [];	

  $('#modelTable tbody').on('click', 'td.details-control', function () {
    var tr = $(this).closest('tr');
	var tdi = tr.find("i.fa");
    var row = dataTable.row( tr );
 
    if ( row.child.isShown() ) {
		// This row is already open - close it
        row.child.hide();
        tr.removeClass('shown');
		tdi.first().removeClass('fa-minus-square');
        tdi.first().addClass('fa-plus-square');
    }
    else {
		 // Open this row
        row.child( format(row.data()) ).show();
        tr.addClass('shown');
		 tdi.first().removeClass('fa-plus-square');
         tdi.first().addClass('fa-minus-square');
    }
});
	
	
	//Titolo Default
	if (titolo_default != ""){
		$('#headerTitleCnt').text(titolo_default);
	}
	
	if (access_denied != ""){
		alert('You need to log in with the right credentials before to access to this page!');
	}
	
		///// SHOW FRAME PARAMETER USE/////
		if (nascondi == 'hide'){
			$('#mainMenuCnt').hide();
			$('#title_row').hide();
			$('#mainCnt').removeClass('col-md-10');
			$('#mainCnt').addClass('col-md-12');
		}
		//// SHOW FRAME PARAMETER  ////
		
		$('#sessionExpiringPopup').css("top", parseInt($('body').height() - $('#sessionExpiringPopup').height()) + "px");
        $('#sessionExpiringPopup').css("left", parseInt($('body').width() - $('#sessionExpiringPopup').width()) + "px");
        
        setInterval(function(){
            var now = parseInt(new Date().getTime() / 1000);
            var difference = sessionEndTime - now;
            
            if(difference === 300)
            {
                $('#sessionExpiringPopupTime').html("5 minutes");
                $('#sessionExpiringPopup').show();
                $('#sessionExpiringPopup').css("opacity", "1");
                setTimeout(function(){
                    $('#sessionExpiringPopup').css("opacity", "0");
                    setTimeout(function(){
                        $('#sessionExpiringPopup').hide();
                    }, 1000);
                }, 4000);
            }
            
            if(difference === 120)
            {
                $('#sessionExpiringPopupTime').html("2 minutes");
                $('#sessionExpiringPopup').show();
                $('#sessionExpiringPopup').css("opacity", "1");
                setTimeout(function(){
                    $('#sessionExpiringPopup').css("opacity", "0");
                    setTimeout(function(){
                        $('#sessionExpiringPopup').hide();
                    }, 1000);
                }, 4000);
            }
            
            if((difference > 0)&&(difference <= 60))
            {
                $('#sessionExpiringPopup').show();
                $('#sessionExpiringPopup').css("opacity", "1");
                $('#sessionExpiringPopupTime').html(difference + " seconds");
            }
            
            if(difference <= 0)
            {
                location.href = "logout.php?sessionExpired=true";
            }
        }, 1000);
        
        $('#mainContentCnt').height($('#mainMenuCnt').height() - $('#headerTitleCnt').height());
        
        $(window).resize(function(){
            $('#mainContentCnt').height($('#mainMenuCnt').height() - $('#headerTitleCnt').height());
            if($(window).width() < 992)
            {
                //$('#modelTable').bootstrapTable('hideColumn', 'description');
                //$('#modelTable').bootstrapTable('hideColumn', 'kind');
            
            }
            else
            {
                //$('#modelTable').bootstrapTable('showColumn', 'name');
               // $('#modelTable').bootstrapTable('showColumn', 'description');
                //$('#modelTable').bootstrapTable('showColumn', 'devicetype');
                //$('#modelTable').bootstrapTable('showColumn', 'kind');
                //$('#modelTable').bootstrapTable('showColumn', 'producer');
           
            }
        });
		
		$("#addMyNewDeviceRow").hide();
		
		for (var func =0;func < functionality.length; func++)
		{
		  var element = functionality[func];
		  if (element.view=="view")
		  {
			  if (element[loggedRole]==1)  
			   {   // console.log(loggedRole + " " + element[loggedRole] + " " + element["class"]); 
				   $(element["class"]).show();
			   }			   
			   else 
			   { 
				 $(element["class"]).hide();
				 // console.log($(element.class));
				//  console.log(loggedRole + " " + element[loggedRole] + " " + element["class"]);
			   }
			}   
		}
		
		
		$('#modelLink .mainMenuItemCnt').addClass("mainMenuItemCntActive");
        $('#mobMainMenuPortraitCnt #modelLink .mobMainMenuItemCnt').addClass("mainMenuItemCntActive");
        $('#mobMainMenuLandCnt #modelLink .mobMainMenuItemCnt').addClass("mainMenuItemCntActive");
 
		
		 
//START ADD NEW Model  (INSERT INTO DB)
	
	
		// This is loading validation when the cursor is on 
	$("#addModelBtn").off("click");
	$('#addModelBtn').click(function(){
        
        $.ajax({
                url: "../api/value.php",
                data:{
                                          
                    action: "get_cb",
                    token : sessionToken, 
                    username: loggedUser, 
                    organization : organization, 
                    loggedrole:loggedRole                          
                },
                type: "POST",
                async: true,
                success: function (data)
                {
                        
                    if (data["status"] === 'ok')
                    {        
                        var $dropdown = $("#selectContextBroker");        
                        $dropdown.empty();
                        $.each(data['content'], function() {
                            $dropdown.append($("<option />").val(this.name).text(this.name));        
                        });
                        
                        $("#addModelLoadingMsg").hide();
                        $("#addModelLoadingIcon").hide();
                        $("#addModelOkMsg").hide();
                        $("#addModelOkIcon").hide();
                        $("#addModelKoMsg").hide();
                        $("#addModelKoIcon").hide();

		                showAddModelModal();
				
                        }
                    else{
                        console.log("error getting the context brokers "+data); 
                    }
                },
                error: function (data)
                {
                 console.log("error in the call to get the context brokers "+data);   
                }
          });
		
	});

	
		/* add lines related to attributes*/			
			$("#addAttrBtn").off("click");
			$("#addAttrBtn").click(function(){
			   console.log("#addAttrBtn");							   
			   content = drawAttributeMenu("","", "", "", "", "", "300",  'addlistAttributes');
				// addDeviceConditionsArray['addlistAttributes'] = true;
			   //console.log("contenuto drawAttr" +content);
			   $('#addlistAttributes').append(content);
			});	

		
  
		$('#addNewModelConfirmBtn').off("click");
        $('#addNewModelConfirmBtn').click(function(){
		
		    mynewAttributes = [];
			num1 = document.getElementById('addlistAttributes').childElementCount;
            for (var m=0; m< num1; m++)
			{
                var newatt= {value_name: document.getElementById('addlistAttributes').childNodes[m].childNodes[0].childNodes[0].childNodes[0].value.trim(), 
			                   data_type:document.getElementById('addlistAttributes').childNodes[m].childNodes[1].childNodes[0].childNodes[0].value.trim(),
				          value_type:document.getElementById('addlistAttributes').childNodes[m].childNodes[2].childNodes[0].childNodes[0].value.trim(),
					    editable:document.getElementById('addlistAttributes').childNodes[m].childNodes[3].childNodes[0].childNodes[0].value.trim(),
					  value_unit:document.getElementById('addlistAttributes').childNodes[m].childNodes[4].childNodes[0].childNodes[0].value.trim(),
		  	       healthiness_criteria: document.getElementById('addlistAttributes').childNodes[m].childNodes[5].childNodes[0].childNodes[0].value.trim(),
				  healthiness_value: document.getElementById('addlistAttributes').childNodes[m].childNodes[6].childNodes[0].childNodes[0].value.trim()};
				
				if (newatt.value_name!="" && newatt.data_type!="" && newatt.value_type!="" && newatt.editable!="" && newatt.value_unit!="" && newatt.healthiness_criteria!="" && newatt.healthiness_value!="") mynewAttributes.push(newatt);
			}
            document.getElementById('addlistAttributes').innerHTML = "";			
		
		
            $("#addModelModalTabs").hide();
			$('#addModelModal div.modalCell').hide();
            $("#addModelModalFooter").hide();
			$("#addAttrBtn").hide();
            $('#addModelLoadingMsg').show();
            $('#addModelLoadingIcon').show();
            console.log("XIEL" + JSON.stringify(mynewAttributes));
			
             $.ajax({
                 url: "../api/model.php",
                 data:{
					  action: "insert",   
					  //Sara2510 - for logging purpose
					  username: loggedUser,
					  organization: organization,
					  
					  attributes: JSON.stringify(mynewAttributes),
					  name: $('#inputNameModel').val(),
					  description: $('#inputDescriptionModel').val(),
					  type: $('#inputTypeModel').val(),
					  kind: $('#selectKindModel').val(),
					  producer: $('#inputProducerModel').val(),
					  frequency: $('#inputFrequencyModel').val(),	  
					  //policy: $('#inputPolicyModel').val(),
					  kgenerator: $('#selectKGeneratorModel').val(),
					  edgegateway_type:$('#selectEdgeGatewayType').val(),
					  contextbroker: $('#selectContextBroker').val(),
					  protocol: $('#selectProtocolModel').val(),
					  format: $('#selectFormatModel').val(),
					 //active: $('#selectActiveModel').val(),
					  hc: $('#selectHCModel').val(),
					  hv: $('#inputHVModel').val(),
				
					  token : sessionToken,

					 },
                 type: "POST",
                 async: true,
                 dataType: "JSON",
				 timeout: 0,
                 success: function (mydata) 
                 {
					if(mydata["status"] === 'ko')
                    {
                        console.log("Error adding Model");
                        console.log(mydata);
			            $('#addModelLoadingMsg').hide();
                        $('#addModelLoadingIcon').hide();
						$('#addModelKoMsg').show();
						$('#addModelKoMsg div:first-child').html(mydata["msg"]);
                        $('#addModelKoIcon').show();
                 
				 
				 	setTimeout(function(){
                            $('#addModelModal').modal('hide');
                          //  buildMainTable(true);

                            setTimeout(function(){
 							   
							    $('#addModelKoMsg').hide();
							    $('#addModelKoIcon').hide();
								  
								 
								$('#inputNameModel').val("");
								$('#inputDescriptionModel').val("");
								$('#inputTypeModel').val("");
								$('#selectKindModel').val("");
								//$('#selectActiveModel').val("");
								$('#selectHCModel').val("");
								$('#inputHVModel').val("");
								$('#selectContextBroker').val("");
								$('#selectProtocolModel').val("");
								$('#selectFormatModel').val("");
								
								$('#inputProducerModel').val("");
								$('#inputFrequencyModel').val("");
								//$('#inputPolicyModel').val("");
								$('#selectKGeneratorModel').val("");
								$('#addlistAttributes').html("");	
	                          
							  location.reload();                      								
										
								  $('#addModelModalTabs').show();
                                  $('#addModelModal div.modalCell').show();
                                  $('#addModelModalFooter').show();
                            }, 1000);
                        }, 3000);
				 
				 
                   
                    }			 
					else if (mydata["status"] === 'ok')
                    {
						console.log("Added Model");
						$('#addModelLoadingMsg').hide();
                        $('#addModelLoadingIcon').hide();
                        $('#addModelKoMsg').hide();
                        $('#addModelKoIcon').hide();
                        $('#addModelOkMsg').show();
                        $('#addModelOkIcon').show();
   
						$('#dashboardTotNumberCnt .pageSingleDataCnt').html(parseInt($('#dashboardTotNumberCnt .pageSingleDataCnt').html()) + 1);
             

						setTimeout(function(){
                            $('#addModelModal').modal('hide');
							fetch_data();
			
                            setTimeout(function(){
 							   
								  $('#addModelOkMsg').hide();
                                  $('#addModelOkIcon').hide();
								  
								$('#inputNameModel').val("");
								$('#inputDescriptionModel').val("");
								$('#inputTypeModel').val("");
								$('#selectKindModel').val("");
								//$('#selectActiveModel').val("");
								$('#selectHCModel').val("");
								$('#inputHVModel').val("");
								$('#selectContextBroker').val("");
								$('#selectProtocolModel').val("");
								$('#selectFormatModel').val("");
								
								$('#inputProducerModel').val("");
								$('#inputFrequencyModel').val("");
								//$('#inputPolicyModel').val("");
								$('#selectKGeneratorModel').val("");
								$('#addlistAttributes').html("");	
								
		                           location.reload();
								  $('#addModelModalTabs').show();
                                  $('#addModelModal div.modalCell').show();
                                  $('#addModelModalFooter').show();
                            }, 1000);
                        }, 3000);						
						
                    } 
					 
                 },
                 error: function (mydata)
                                        {
					   console.log("Error insert model");  
					   console.log("Error status -- Ko result: " + JSON.stringify(mydata));
                        $('#addModelLoadingMsg').hide();
                        $('#addModelLoadingIcon').hide();
                        $('#addModelKoMsg').show();
                        $('#addModelKoIcon').show();
                        setTimeout(function(){
                            $('#addModelKoMsg').hide();
                            $('#addModelKoIcon').hide();
							$('#addModelModal').hide();
                            // $('#addDeviceModalTabs').show();
                            // $('#addDeviceModal div.modalCell').show();
                            // $('#addDeviceModalFooter').show();
                        }, 5000);
                 }
             });
        });
 
 
// END ADD NEW MODEL  

  
//START DELETE MODEL 
	
		// Delete lines related to attributes 

	$("#attrNameDelbtn").off("click");
	$("#attrNameDelbtn").on("click", function(){
		console.log("#attrNameDelbtn");	
		$(this).parent('tr').remove();
		});	
				
	$('#modelTable tbody').on('click', 'button.delDashBtn', function () {

		var name = $(this).attr("data-name");
		var id = $(this).attr("data-id");
		
		$("#deleteModelModal div.modal-body").html('<div class="modalBodyInnerDiv"><span data-id = "' + id + '" data-name = "' + name + '" >Do you want to confirm deletion of model ID <b>' + id + " - " + name +'</b>?</span></div>');
		$("#deleteModelModal").modal('show');
	});

		
        $('#deleteModelConfirmBtn').off("click");
        $("#deleteModelConfirmBtn").click(function(){
			
            var id = $("#deleteModelModal span").attr("data-id");
            var name = $("#deleteModelModal span").attr("data-name");
			
			//Sara2510 - for logging purpose
			console.log("name "+name);
            $("#deleteModelModal div.modal-body").html("");
            $("#deleteModelCancelBtn").hide();
            $("#deleteModelConfirmBtn").hide();
            $("#deleteModelModal div.modal-body").append('<div id="deleteModelModalInnerDiv1" class="modalBodyInnerDiv"><h5>Model deletion in progress, please wait</h5></div>');
            $("#deleteModelModal div.modal-body").append('<div id="deleteModelModalInnerDiv2" class="modalBodyInnerDiv"><i class="fa fa-circle-o-notch fa-spin" style="font-size:36px"></i></div>');

            
            $.ajax({
                url: "../api/model.php",
				data:{
					action: "delete",
					id: id, 
					//Sara2510 - for logging purpose
					name: name,
					username: loggedUser,
                     organization:organization,
					
					token : sessionToken
					},
                type: "POST",
				datatype: "json",
                async: true,
                success: function (data) 
                {
					console.log(JSON.stringify(data));
                    if(data["status"] === 'ko')
                    {
                        $("#deleteModelModalInnerDiv1").html(data["msg"]);
                        $("#deleteModelModalInnerDiv2").html('<i class="fa fa-frown-o" style="font-size:42px"></i>');
                    
					    setTimeout(function()
                        {  $("#deleteModelModal").modal('hide');  
                        }, 2000);
					}
                    else if(data["status"] === 'ok')
                    {
                        $("#deleteModelModalInnerDiv1").html('Model &nbsp; <b>' + id + '</b> &nbsp;deleted successfully');
                        $("#deleteModelModalInnerDiv2").html('<i class="fa fa-check" style="font-size:42px"></i>');
						
						 
						$('#dashboardTotNumberCnt .pageSingleDataCnt').html(parseInt($('#dashboardTotNumberCnt .pageSingleDataCnt').html()) - 1);
                        
						
                        setTimeout(function()
                        {
							$('#modelTable').DataTable().destroy();
                            fetch_data(true);
                            $("#deleteModelModal").modal('hide');
							
                            setTimeout(function(){
                                $("#deleteModelCancelBtn").show();
                                $("#deleteModelConfirmBtn").show();
                            }, 500);
                        }, 2000);
                    }
                },
                error: function (data) 
                {
					console.log(JSON.stringify(data));
                    $("#deleteModelModalInnerDiv1").html(data["msg"]);
                    $("#deleteModelModalInnerDiv2").html('<i class="fa fa-frown-o" style="font-size:42px"></i>');
					setTimeout(function()
                        {  $("#deleteModelModal").modal('hide');  
                        }, 2000);
                }
            });
        });
        
// END DELETE MODEL
		
//START EDIT MODEL 

		//add lines related to attributes in case of edit
	$("#addAttrMBtn").off("click");
	$("#addAttrMBtn").click(function(){				
	   console.log("#addAttrMBtn");					
	   content = drawAttributeMenu("","", "", "", "", "", "300", 'addlistAttributesM');
		//editDeviceConditionsArray['addlistAttributesM'] = true;
	   $('#addlistAttributesM').append(content);
	});	
	
	

	$('#modelTable tbody').on('click', 'button.editDashBtn', function () {                         	
		$("#editModelModalBody").show();
		$('#editModelModalTabs').show();


		  $("#editModelLoadingMsg").hide();
		  $("#editModelLoadingIcon").hide();
		  $("#editModelOkMsg").hide();
		  $("#editModelOkIcon").hide();
		  $("#editModelKoMsg").hide();
		  $("#editModelKoIcon").hide(); 
		  $("#editModelModalFooter").show();
		  $("#editModelModal").modal('show');
		  $("#editModelModalLabel").html("Edit Model - " + $(this).attr("data-name"));
		  
		  var id = $(this).attr('data-id');
		  var obj_organization = $(this).attr('data-organization');
		  var name = $(this).attr('data-name');
		  var description = $(this).attr('data-description');
		  var type = $(this).attr('data-devicetype');
		  var kind =  $(this).attr('data-kind');
		  var producer = $(this).attr('data-producer');
		  var frequency = $(this).attr('data-frequency');
		  //var policy =  $(this).attr('data-policy');
		  var kgenerator = $(this).attr('data-kgenerator');
		  var edgegateway_type=$(this).attr('data-edgegateway_type');
		  var contextbroker = $(this).attr('data-contextBroker');
		  var protocol = $(this).attr('data-protocol');
		  var format = $(this).attr('data-format');
		  //var active = $(this).attr('data-active');
		  var hc = $(this).attr('data_healthiness_criteria');
		  var hv = $(this).attr('data_healthiness_value');
		  
		  
			$('#inputIdModelM').val(id);
			$('#inputOrganizationModelM').val(obj_organization);
			$('#inputNameModelM').val(name);
			$('#inputDescriptionModelM').val(description);
			$('#inputTypeModelM').val(type);
			$('#selectKindModelM').val(kind);
			$('#inputProducerModelM').val(producer);	
			$('#inputFrequencyModelM').val(frequency);	
			//$('#inputPolicyModelM').val(policy);	
			$('#selectKGeneratorModelM').val(kgenerator);
			$('#selectEdgeGatewayTypeM').val(edgegateway_type);
			$('#selectContextBrokerM').val(contextbroker);
			$('#selectProtocolModelM').val(protocol);
			$('#selectFormatModelM').val(format);
			//$('#selectActiveModelM').val(active);
			$('#selectHCModelM').val(hc);															  
			$('#inputHVModelM').val(hv);	
		 
        $.ajax({
                url: "../api/value.php",
                data:{
                                          
                    action: "get_cb",
                    token : sessionToken, 
                    username: loggedUser, 
                    organization : organization, 
                    loggedrole:loggedRole                          
                },
                type: "POST",
                async: true,
                success: function (data)
                {
                        
                    if (data["status"] === 'ok')
                    {        
                        var $dropdown = $("#selectContextBrokerM");        
                        $dropdown.empty();
                        $.each(data['content'], function() {
                            $dropdown.append($("<option />").val(this.name).text(this.name));        
                        });
                        
                        showEditModelModal();
				
                        }
                    else{
                        console.log("error getting the context brokers "+data); 
                    }
                },
                error: function (data)
                {
                 console.log("error in the call to get the context brokers "+data);   
                }
          });
        
        
		
	$.ajax({
		url: "../api/model.php",
		 data: {
			  action: "get_value_attributes", 
			   id: $(this).attr("data-id"),
              organization:organization
			  },
		type: "POST",
		async: true,
		dataType: 'json',
		success: function (mydata) 
		{
		  
		  var row = null;
		  $("#editUserPoolsTable tbody").empty();
		  var myattributes  = JSON.parse(mydata.content.attributes);
		  
		  
		  console.log(myattributes);
		  content="";
		  k=0;
		  while (k < myattributes.length)
		  {
			// console.log(k); 
			content += drawAttributeMenu(myattributes[k].value_name, 
				 myattributes[k].data_type, myattributes[k].value_type, myattributes[k].editable, myattributes[k].value_unit, myattributes[k].healthiness_criteria, 
				 myattributes[k].healthiness_value, 'editlistAttributes');
			k++;
		  }
		  $('#editlistAttributes').html(content);
		 },
		 error: function (data)
				{
				   console.log("Get values pool KO");
				   console.log(JSON.stringify(data));
				   alert("Error in reading data from the database<br/> Please get in touch with the Snap4city Administrator");
				   
					$('#inputNameModelM').val("");
					$('#inputDescriptionModelM').val("");
					$('#inputTypeModelM').val("");
					$('#selectKindModelM').val("");
					//$('#selectActiveModelM').val("");
					$('#selectHCModelM').val("");
					$('#inputHVModelM').val("");
					$('#selectContextBrokerM').val("");
					$('#selectProtocolModelM').val("");
					$('#selectFormatModelM').val("");
					
					$('#inputProducerModelM').val("");
					$('#inputFrequencyModelM').val("");
					//$('#inputPolicyModelM').val("");
					$('#selectKGeneratorModelM').val("");
					$('#selectEdgeGatewayTypeM').val("");
					$('#editlistAttributes').html("");	
		
							   
					$("#editModalModal").modal('hide');
						  
							}
						});

	});

      	
		 
	$('#editModelConfirmBtn').off("click");
	$("#editModelConfirmBtn").click(function(){
		
		//MARCO: in case of model I do not have to distinguish between updated attributes and new inserted 
		// attributes. I can use a single variable for keeping trace of both of them
		// mynewAttributes = [];
		myAttributes = [];
		num1 = document.getElementById('addlistAttributesM').childElementCount;
		//console.log(num1);
		for (var m=0; m< num1; m++)
		{
		  //var selOpt= document.getElementById('addlistAttributesM').childNodes[m].childNodes[2].childNodes[0].childNodes[0].options;
		  //var selIndex= document.getElementById('addlistAttributesM').childNodes[m].childNodes[2].childNodes[0].childNodes[0].selectedIndex;
		var newatt= {value_name: document.getElementById('addlistAttributesM').childNodes[m].childNodes[0].childNodes[0].childNodes[0].value.trim(), 
					data_type:document.getElementById('addlistAttributesM').childNodes[m].childNodes[1].childNodes[0].childNodes[0].value.trim(),
					value_type:document.getElementById('addlistAttributesM').childNodes[m].childNodes[2].childNodes[0].childNodes[0].value.trim(),
					editable:document.getElementById('addlistAttributesM').childNodes[m].childNodes[3].childNodes[0].childNodes[0].value.trim(),
					value_unit:document.getElementById('addlistAttributesM').childNodes[m].childNodes[4].childNodes[0].childNodes[0].value.trim(),
					healthiness_criteria: document.getElementById('addlistAttributesM').childNodes[m].childNodes[5].childNodes[0].childNodes[0].value.trim(),
					healthiness_value: document.getElementById('addlistAttributesM').childNodes[m].childNodes[6].childNodes[0].childNodes[0].value.trim()};
						   //MARCO: mynewAttributes.push(newatt);
							myAttributes.push(newatt);
		}
		
		//MARCO  myAttributes= [];
		num= document.getElementById('editlistAttributes').childElementCount;
		for (var j=0; j< num; j++)
		{
		  var selectOpt_value_type= document.getElementById('editlistAttributes').childNodes[j].childNodes[2].childNodes[0].childNodes[0].options;
		  var selectIndex_value_type= document.getElementById('editlistAttributes').childNodes[j].childNodes[2].childNodes[0].childNodes[0].selectedIndex;
		  
		  var selectOpt_data_type= document.getElementById('editlistAttributes').childNodes[j].childNodes[1].childNodes[0].childNodes[0].options;
		  var selectIndex_data_type= document.getElementById('editlistAttributes').childNodes[j].childNodes[1].childNodes[0].childNodes[0].selectedIndex;
		  
		  var selectOpt_value_unit= document.getElementById('editlistAttributes').childNodes[j].childNodes[4].childNodes[0].childNodes[0].options;
		  var selectIndex_value_unit= document.getElementById('editlistAttributes').childNodes[j].childNodes[4].childNodes[0].childNodes[0].selectedIndex;
		  
		  var selectOpt_hc= document.getElementById('editlistAttributes').childNodes[j].childNodes[5].childNodes[0].childNodes[0].options;
		  var selectIndex_hc= document.getElementById('editlistAttributes').childNodes[j].childNodes[5].childNodes[0].childNodes[0].selectedIndex;
		  
		  var selectOpt_edit= document.getElementById('editlistAttributes').childNodes[j].childNodes[3].childNodes[0].childNodes[0].options;
		  var selectIndex_edit= document.getElementById('editlistAttributes').childNodes[j].childNodes[3].childNodes[0].childNodes[0].selectedIndex;
		  
		  var att= {value_name: document.getElementById('editlistAttributes').childNodes[j].childNodes[0].childNodes[0].childNodes[0].value.trim(), 
			   data_type:selectOpt_data_type[selectIndex_data_type].value,
			   value_type:selectOpt_value_type[selectIndex_value_type].value,
			   editable:selectOpt_edit[selectIndex_edit].value,
			   value_unit:selectOpt_value_unit[selectIndex_value_unit].value,
			   healthiness_criteria: selectOpt_hc[selectIndex_hc].value,
			   healthiness_value: document.getElementById('editlistAttributes').childNodes[j].childNodes[6].childNodes[0].childNodes[0].value.trim()};
					 myAttributes.push(att);
		  
		}
		 
		//MARCO: in case of model, there is no need to consider the deleted attributes
		// I have not to remove from a table. 
		/* mydeletedAttributes= [];
		numDel= document.getElementById('deletedAttributes').childElementCount;
		for (var j=0; j< numDel; j++)
		{
		  var selectOpt_value_type= document.getElementById('deletedAttributes').childNodes[j].childNodes[2].childNodes[0].childNodes[0].options;
		  var selectIndex_value_type= document.getElementById('deletedAttributes').childNodes[j].childNodes[2].childNodes[0].childNodes[0].selectedIndex;
		  
		  var selectOpt_data_type= document.getElementById('deletedAttributes').childNodes[j].childNodes[1].childNodes[0].childNodes[0].options;
		  var selectIndex_data_type= document.getElementById('deletedAttributes').childNodes[j].childNodes[1].childNodes[0].childNodes[0].selectedIndex;
		  
		  var selectOpt_value_unit= document.getElementById('deletedAttributes').childNodes[j].childNodes[4].childNodes[0].childNodes[0].options;
		  var selectIndex_value_unit= document.getElementById('deletedAttributes').childNodes[j].childNodes[4].childNodes[0].childNodes[0].selectedIndex;
		  
		  var selectOpt_hc= document.getElementById('deletedAttributes').childNodes[j].childNodes[5].childNodes[0].childNodes[0].options;
		  var selectIndex_hc= document.getElementById('deletedAttributes').childNodes[j].childNodes[5].childNodes[0].childNodes[0].selectedIndex;
		  
		  var selectOpt_edit= document.getElementById('deletedAttributes').childNodes[j].childNodes[3].childNodes[0].childNodes[0].options;
		  var selectIndex_edit= document.getElementById('deletedAttributes').childNodes[j].childNodes[3].childNodes[0].childNodes[0].selectedIndex;
		  
		  var att= {value_name: document.getElementById('deletedAttributes').childNodes[j].childNodes[0].childNodes[0].childNodes[0].value.trim(), 
			   data_type:selectOpt_data_type[selectIndex_data_type].value,
			   value_type:selectOpt_value_type[selectIndex_value_type].value,
			   editable:selectOpt_edit[selectIndex_edit].value,
			   value_unit:selectOpt_value_unit[selectIndex_value_unit].value,
			   healthiness_criteria: selectOpt_hc[selectIndex_hc].value,
			   healthiness_value: document.getElementById('deletedAttributes').childNodes[j].childNodes[6].childNodes[0].childNodes[0].value.trim()};
					 mydeletedAttributes.push(att);
		}
		*/ 

		
		   document.getElementById('editlistAttributes').innerHTML = ""; 
		   document.getElementById('addlistAttributesM').innerHTML = ""; 
		   document.getElementById('deletedAttributes').innerHTML = "";  

		
		$("#editModelModalTabs").hide();
		$('#editModelModal div.modalCell').hide();
		$("#editModelModalFooter").hide();
		$("#addAttrMBtn").hide();
		
		
		$('#editModelLoadingMsg').show();
		$('#editModelLoadingIcon').show();
		// console.log(JSON.stringify(deviceJson));
			
		
		 $.ajax({
			 url: "../api/model.php",
			 data:{
			 action: "update", 
			 //MARCO newattributes: JSON.stringify(mynewAttributes),
			 attributes: JSON.stringify(myAttributes),
			 //MARCO deleteattributes: JSON.stringify(mydeletedAttributes), 
				  //Sara2510 - for logging purpose
				  username: loggedUser,
                  organization:organization,
                  obj_organization:$('#inputOrganizationModelM').val(),
	
				  id: $('#inputIdModelM').val(),
				  name: $('#inputNameModelM').val(),
				  description: $('#inputDescriptionModelM').val(),
				  type: $('#inputTypeModelM').val(),
				  kind: $('#selectKindModelM').val(),
				  producer: $('#inputProducerModelM').val(),
				  frequency: $('#inputFrequencyModelM').val(),	  
				  //policy: $('#inputPolicyModelM').val(),
				  kgenerator: $('#selectKGeneratorModelM').val(),
				  edgegateway_type:$('#selectEdgeGatewayTypeM').val(),
				  contextbroker: $('#selectContextBrokerM').val(),
				  protocol: $('#selectProtocolModelM').val(),
				  format: $('#selectFormatModelM').val(),
				 //active: $('#selectActiveModelM').val(),
				  hc: $('#selectHCModelM').val(),
				  hv: $('#inputHVModelM').val(),
			
				 },
			 type: "POST",
			 async: true,
			 success: function (data) 
			 {
				   if(data["status"] === 'ko')
				{
					console.log("Error editing Model type");
					console.log(data);
					$('#editModelLoadingMsg').hide();
					$('#editModelLoadingIcon').hide();
					$('#editModelLoadingIcon').hide();
					$('#editModelKoMsg').show();
					$('#editModelKoIcon').show();
				 
					setTimeout(function(){
						$('#editModelKoMsg').hide();
						$('#editModelKoIcon').hide();
						$('#editModelModal').hide();
						// $('#editModelModalTabs').show();
						// $('#editModelModal div.modalCell').show();
						// $('#editModelModalFooter').show();
					}, 3000);
				}
				 
				else if (data["status"] === 'ok')
				{
						
					$('#editModelLoadingMsg').hide();
					$('#editModelLoadingIcon').hide();
					$('#editModelOkMsg').show();
					$('#editModelOkIcon').show();
								
					$("#editModelModalInnerDiv1").html('Model &nbsp; successfully Updated');
					$("#editModelModalInnerDiv2").html('<i class="fa fa-check" style="font-size:42px"></i>');
				 
					setTimeout(function(){
						$('#editModelModal').modal('hide');
						fetch_data(true);

						setTimeout(function(){
						   // $('#addDeviceOkMsg').hide();
						   // $('#addDeviceOkIcon').hide();
							  $('#editModelOkMsg').hide();
							  $('#editModelOkIcon').hide();
							
								  $('#inputNameModelM').val("");
								  $('#inputDescriptionModelM').val("");
								  $('#inputTypeModelM').val("");
								  $('#selectKindModelM').val("");
								 //$('#selectActiveModel').val("");
								  $('#selectHCModelM').val("");
								  $('#inputHVModelM').val("");
								  $('#selectContextBrokerM').val("");
								  $('#selectProtocolModelM').val("");
								  $('#selectFormatModelM').val("");
								
								  $('#inputProducerModelM').val("");
								  $('#inputFrequencyModelM').val("");
								 //$('#inputPolicyModel').val("");
								  $('#selectKGeneratorModelM').val("");
								  $('#selectEdgeGatewayTypeM').val("");
								  $('#editlistAttributes').html("");	
							   $('#editModelModal').hide();
							   setTimeout(updateDeviceTimeout, 100);	  
							  
						}, 100);
					}, 100);
					
					
		} else {console.log(data);}
				 
			 },
			 error: function (data) 
			 {
				 console.log("Ko result: " + JSON.stringify(data));
				 $("#editModelKoModalInnerDiv1").html(data["msg"]);
				 $("#editModelKoModal").modal('show');
				 // $("#editModelModalUpdating").hide();
				 $("#editModelModalBody").show();
				 $("#editModelModalFooter").show();
				 
			  $('#inputNameModelM').val("");
			  $('#inputDescriptionModelM').val("");
			  $('#inputTypeModelM').val("");
			  $('#selectKindModelM').val("");
			 //$('#selectActiveModel').val("");
			  $('#selectHCModelM').val("");
			  $('#inputHVModelM').val("");
			  $('#selectContextBrokerM').val("");
			  $('#selectProtocolModelM').val("");
			  $('#selectFormatModelM').val("");
			
			  $('#inputProducerModelM').val("");
			  $('#inputFrequencyModelM').val("");
			 //$('#inputPolicyModel').val("");
			  $('#selectKGeneratorModelM').val("");
			  $('#editlistAttributes').html("");	
			  $('#editModelModal').hide();				
				   setTimeout(updateDeviceTimeout, 100);
				  
			 }
		 });
	});
        
//END EDIT MODEL 

		
		$("#editModelCancelBtn").off("click");
        $("#editModelCancelBtn").on('click', function(){
		
		   	   document.getElementById('editlistAttributes').innerHTML = ""; 
		       document.getElementById('addlistAttributesM').innerHTML = ""; 
               document.getElementById('deletedAttributes').innerHTML = "";  

		
		});	
			
        $("#addNewModelCancelBtn").off("click");
        $("#addNewModelCancelBtn").on('click', function(){
            
			  $('#addModelModal').modal('hide'); 
			  
			  
			  $('#inputNameModel').val("");
			  $('#inputDescriptionModel').val("");
			  $('#inputTypeModel').val("");
			  $('#selectKindModel').val("");
			 //$('#selectActiveModel').val("");
			  $('#selectHCModel').val("");
			  $('#inputHVModel').val("");
			  $('#selectContextBroker').val("");
			  $('#selectProtocolModel').val("");
			  $('#selectFormatModel').val("");
			
			  $('#inputProducerModel').val("");
			  $('#inputFrequencyModel').val("");
			 //$('#inputPolicyModel').val("");
			  $('#selectKGeneratorModel').val("");
			  $('#addlistAttributes').html("");	
	
			  location.reload();    								  
	
        });
        
        $("#addModelKoBackBtn").off("click");
        $("#addModelKoBackBtn").on('click', function(){
            $("#addModelKoModal").modal('hide');
            $("#addModelModal").modal('show');
        });
        
        $("#addModelKoConfirmBtn").off("click");
        $("#addModelKoConfirmBtn").on('click', function(){
            $("#addModelKoModal").modal('hide');
            $("#addModelForm").trigger("reset");
        });
        
        $("#editModelKoBackBtn").off("click");
        $("#editModelKoBackBtn").on('click', function(){
            $("#editModelKoModal").modal('hide');
            $("#editModelModal").modal('show');
        });
        
        $("#editModelKoConfirmBtn").off("click");
        $("#editModelKoConfirmBtn").on('click', function(){
            $("#editModelKoModal").modal('hide');
            $("#editModelForm").trigger("reset");
        });
		
	
  
  /*
	$("#selectPolicyModel").click(function() {
			
     var nameOpt =  document.getElementById('selectPolicyModel').options;
     var selectednameOpt = document.getElementById('selectPolicyModel').selectedIndex;
		
	
				$.ajax({
					url: "../api/model.php",
					data: {
					action: "get_model",
					name: nameOpt[selectednameOpt].value 
					},
					type: "POST",
					async: true,
					datatype: 'json',
					success: function (data) 
					 {
						
						 if(data["status"] === 'ko')
							{
								  // data = data["content"];
								  alert("An error occured when reading the data. <br/> Get in touch with the Snap4City Administrator<br/>"+ data["msg"]);
							}

						 else (data["status"] === 'ok')
							{					
								//console.log("maroc" + data.content.attributes);
								
								//var model = data.content.name;
								//var type = data.content.devicetype;
								//var kind = data.content.kind;
								//var producer = data.content.producer;
								//var mac = data.content.mac;
								//var frequency = data.content.frequency;
								var contextbroker = data.content.contextbroker;
								var protocol = data.content.protocol;
								var format = data.content.format;
								var active = data.content.active;
								var healthiness_criteria = data.content.healthiness_criteria;
								var healthiness_value =  data.content.healthiness_value;
								
								 
								var myattributes  = JSON.parse(data.content.attributes);
								var k =0;
								var content ="";
								// population of the value tab with the values taken from the db						
								while (k < myattributes.length)
								  {
									console.log(myattributes.length + " " +k); 
									content += drawAttributeMenu(myattributes[k].value_name, 
										 myattributes[k].data_type, myattributes[k].value_type, myattributes[k].editable, myattributes[k].value_unit, myattributes[k].healthiness_criteria, 
										 myattributes[k].healthiness_value, 'addlistAttributes');
									k++;
								  }
								$('#addlistAttributes').html(content);
							 					
								//$('#inputTypeDevice').val(data.content.devicetype);
								//$('#selectKindDevice').val(data.content.kind);
								//$('#inputProducerDevice').val(data.content.producer);
								//$('#inputFrequencyDevice').val(data.content.frequency);
								//$('#inputMacDevice').val(data.content.mac);
								$('#selectContextBroker').val(data.content.contextbroker);
								$('#selectProtocolModel').val(data.content.protocol);
								$('#selectFormatModel').val(data.content.format); 
								//addDeviceConditionsArray['inputTypeDevice'] = true;
								//checkDeviceType(); checkAddDeviceConditions();
								//addDeviceConditionsArray['inputFrequencyDevice'] = true;
								//checkFrequencyType(); checkAddDeviceConditions();
								

							}
					 },
					 error: function (data) 
					 {
						 console.log("Ko result: " + JSON.stringify(data));
						 $('#addlistAttributes').html("");
												
								$('#inputTypeDevice').val("");
								$('#selectKindDevice').val("");
								$('#inputProducerDevice').val("");
								$('#inputFrequencyDevice').val("");
								$('#inputMacDevice').val("");
								$('#selectContextBroker').val("");
								$('#selectProtocolDevice').val("");
								$('#selectFormatDevice').val("");
                                alert("An error occured when reading the information about model. <br/> Try again or get in touch with the Snap4City Administrator<br/>");

								// $("#addDeviceModal").modal('hide');								
					 }
					
				});		
				
				
		
			  $("#addDeviceModal").modal('show');
			 // console.log(name);
			 // $("#addDeviceModalBody").modal('show');
			  $("#addDeviceLoadingMsg").hide();
			  $("#addDeviceLoadingIcon").hide();
			  $("#addDeviceOkMsg").hide();
			  $("#addDeviceOkIcon").hide();
			  $("#addDeviceKoMsg").hide();
			  $("#addDeviceKoIcon").hide();
		
		else{
			$('#inputTypeDevice').val("");
			$('#selectKindDevice').val("");
			$('#inputProducerDevice').val("");
			$('#inputFrequencyDevice').val("");
			
			$('#inputMacDevice').val("");
			$('#selectContextBroker').val("");
			$('#selectProtocolDevice').val("");
			$('#selectFormatDevice').val(""); 
			gb_key1 = "";
		     gb_key2 = "";
			$('#KeyOneDeviceUserMsg').html("");
			$('#KeyTwoDeviceUserMsg').html("");
            $('#KeyOneDeviceUserMsg').val("");
			$('#KeyTwoDeviceUserMsg').val("");
		    // $('#addlistAttributes').html("");
			addDeviceConditionsArray['inputTypeDevice'] = false;
			checkDeviceType(); checkAddDeviceConditions();
			addDeviceConditionsArray['inputFrequencyDevice'] = false;
			checkFrequencyType(); checkAddDeviceConditions();

		} 		

   });
*/


  $("#selectContextBroker").change(function() {
	
		var index = document.getElementById("selectContextBroker").selectedIndex;
		var opt = document.getElementById("selectContextBroker").options;
		var valCB= opt[index].getAttribute("my_data");
		
		if(valCB ==='ngsi')
		{
			document.getElementById("selectProtocolModel").value = 'ngsi';
			document.getElementById("selectFormatModel").value = 'json';
		} 
		else if(valCB ==='mqtt')
		{
			document.getElementById("selectProtocolModel").value = 'mqtt';
			document.getElementById("selectFormatModel").value = 'csv';
		} 
		else if (valCB ==='amqp')
		{
			document.getElementById("selectProtocolModel").value = 'amqp';
			document.getElementById("selectFormatModel").value = 'csv';
		} 
		else
		{
			//alert("This is a new contextBroker");
			console.log("an error occurred");
		}
		
		
	});
	
	
	$('#modelTable thead').css("background", "rgba(0, 162, 211, 1)");
	$('#modelTable thead').css("color", "white");
	$('#modelTable thead').css("font-size", "1em");   
	   
        
        //Validation of the name of the new owner during typing
	$('#newOwner').on('input',function(e)
	{
		
		if($(this).val().trim() === '')
		{
			$('#newOwnerMsg').css('color', '#f3cf58');
			$('#newOwnerMsg').html('New owner username can\'t be empty');
			$('#newOwnershipConfirmBtn').addClass('disabled');
		}
		else
		{
			//if(($(this).val().trim() === "<?= $_SESSION['loggedUsername'] ?>")&&("<?= $_SESSION['loggedRole'] ?>" !== "RootAdmin"))
			if(($(this).val().trim() === loggedUser)&&(loggedRole !== "RootAdmin") && (loggedRole !== "ToolAdmin"))
				
			{
				$('#newOwnerMsg').css('color', '#f3cf58');
				$('#newOwnerMsg').html('New owner can\'t be you');
				$('#newOwnershipConfirmBtn').addClass('disabled');
			}
			else
			{
				$('#newOwnerMsg').css('color', 'white');
				$('#newOwnerMsg').html('User can be new owner');
				$('#newOwnershipConfirmBtn').removeClass('disabled');
			}
		}
	}); 
	
		// DELEGATIONS
function updateGroupList(ouname){
       $.ajax({
                url: "../api/ldap.php",
                data:{
                                          action: "get_group_for_ou",
                                          ou: ouname,
                                          token : sessionToken
                                          },
                type: "POST",
                async: true,
                success: function (data)
                {
                        if(data["status"] === 'ko')
                        {
                                $('#newDelegatedMsgGroup').css('color', '#f3cf58');
                                $('#newDelegatedMsgGroup').html(data["msg"]);
                        }
                        else if (data["status"] === 'ok')
                        {
                                var $dropdown = $("#newDelegationGroup");
                               //remove old ones
                                $dropdown.empty();
                               //adding empty to rootadmin
                               if ((loggedRole=='RootAdmin')||(loggedRole=='ToolAdmin')) {
                                       console.log("adding empty");
                                       $dropdown.append($("<option />").val("All groups").text("All groups"));
                               }
                               //add new ones
                                $.each(data['content'], function() {
                                    $dropdown.append($("<option />").val(this).text(this));
                                });

                        }
                },
                error: function (data)
                {
                               $('#newDelegatedMsgGroup').css('color', '#f3cf58');
                                $('#newDelegatedMsgGroup').html('Error calling internal API');
                }
          });
        }

    //populate organization list with any possibile value (if rootAdmin)
    if ((loggedRole=='RootAdmin')||(loggedRole=='ToolAdmin')) {
               $.ajax({
               url: "../api/ldap.php",
               data:{
                                         action: "get_all_ou",
                                          token : sessionToken
                                          },
                type: "POST",
                async: false,
                success: function (data)
               {
                        if(data["status"] === 'ko')
                       {
                                $('#newDelegatedMsgGroup').css('color', '#f3cf58');
                                $('#newDelegatedMsgGroup').html(data["msg"]);
                       }
                       else if (data["status"] === 'ok')
                       {
                               var $dropdown = $("#newDelegationOrganization");
                               $.each(data['content'], function() {
                                   $dropdown.append($("<option />").val(this).text(this));
                               });
                       }
               },
               error: function (data)
                {
                               $('#newDelegatedMsgGroup').css('color', '#f3cf58');
                                $('#newDelegatedMsgGroup').html('Error calling internal API');
                }
               });
       }
       //populate organization list with myorganization (otherwise)
       else {
               $.ajax({
                url: "../api/ldap.php",
                data:{
                                          action: "get_logged_ou",
                                          username: loggedUser,
                                          token : sessionToken
                                          },
                type: "POST",
                async: false,
                success: function (data)
                {
                        if(data["status"] === 'ko')
                        {
                                console.log("Error: "+data);
                               //TODO: manage error
                        }
                        else if (data["status"] === 'ok')
                        {
                                var $dropdown = $("#newDelegationOrganization");
                                $dropdown.append($("<option/>").val(data['content']).text(data['content']));
                        }
                },
                error: function (data)
                {
                       console.log("Error: " +  data);
                       //TODO: manage error
                }
        });
}

       //populate group list with selected organization
       updateGroupList($("#newDelegationOrganization").val());

       //eventually update the group list
       $('#newDelegationOrganization').change( function() {
               $(this).find(":selected").each(function () {
                       updateGroupList($(this).val());
               });
       });

       $('#newDelegation').val('');

       $('#newDelegation').off('input');

       $('#newDelegation').on('input',function(e)
       {
                               if($(this).val().trim() === '')
                               {
                                       $('#newDelegatedMsg').css('color', '#f3cf58');
                                       $('#newDelegatedMsg').html('Delegated username can\'t be empty');
                                       $('#newDelegationConfirmBtn').addClass('disabled');
                               }
                               else
                               {
                                       $('#newDelegatedMsg').css('color', 'white');
                                       $('#newDelegatedMsg').html('User can be delegated');
                                       $('#newDelegationConfirmBtn').removeClass('disabled');

                                       $('#delegationsTable tbody tr').each(function(i)
                                       {
                                          if($(this).attr('data-delegated').trim() === $('#newDelegation').val())
                                          {
                                                  $('#newDelegatedMsg').css('color', '#f3cf58');
                                                  $('#newDelegatedMsg').html('User already delegated');
                                                  $('#newDelegationConfirmBtn').addClass('disabled');
                                          }
                                       });
                               }
       });

       $('#valuesTable thead').css("background", "rgba(0, 162, 211, 1)");
       $('#valuesTable thead').css("color", "white");
       $('#valuesTable thead').css("font-size", "1em");

       $('#valuesTable tbody tr').each(function(i){
               if(i%2 !== 0)
               {
                       $(this).find('td').eq(0).css("background-color", "rgb(230, 249, 255)");
                       $(this).find('td').eq(0).css("border-top", "none");
               }
               else
               {
                       $(this).find('td').eq(0).css("background-color", "white");
                       $(this).find('td').eq(0).css("border-top", "none");
               }
       });

       $('#delegationsModal').on('hidden.bs.modal', function(e)
       {
               $(this).removeData();
       });	
        
});  // end of ready-state

//   START TO CHANGE THE VISIBILITY  & OWNERSHIP 
				
	function changeVisibility(name, visibility, obj_organization, accesslink) {	   	   
		$("#delegationsModal").modal('show');   
	    $("#delegationHeadModalLabel").html("Model - " + name);   			

        if(visibility=='MyOwnPrivate'){
				newVisibility = 'public';
				$('#visID').css('color', '#f3cf58');
				$("#visID").html("Visibility - Private");
				document.getElementById('newVisibilityPrivateBtn').style.visibility = 'hidden';
				document.getElementById('newVisibilityPublicBtn').style.visibility = 'show';
				
			} else
				
            {
				newVisibility = 'private';
				$('#visID').css('color', '#f3cf58');
				$("#visID").html("Visibility - Public");
				document.getElementById('newVisibilityPrivateBtn').style.visibility = 'show';
				document.getElementById('newVisibilityPublicBtn').style.visibility = 'hidden';
			}			  
	   
		$(document).on("click", "#newVisibilityPublicBtn", function(event){	
			$.ajax({
				url: "../api/contextbroker.php",
				data: 
				{	
					action: "change_visibility",
					username: loggedUser,	
                    object:"ModelID", //IOTModel
                    table:"model",
					organization : organization,
					obj_organization : obj_organization,
                    name:name,
					accesslink: accesslink,
					visibility: newVisibility,
					token : sessionToken
				},
				type: "POST",
				async: true,
				dataType: 'json',
				success: function(data) 
				{
					if (data["status"] === 'ok')
					{
						$('#newVisibilityResultMsg').show();
						$("#visID").html("");
						$('#visID').css('color', '#f3cf58');
						$("#visID").html("Visibility - Private");
						$('#newVisibilityResultMsg').html('New visibility set to Public');
						
						$('#newVisibilityPublicBtn').addClass('disabled');
						
						setTimeout(function()
						{
							$('#devicesTable').DataTable().destroy();
							fetch_data(true);
							location.reload();
						}, 3000);
					}
					else if (data["status"] === 'ko')
					{
						$('#newVisibilityResultMsg').show();
						$('#newVisibilityResultMsg').html('Error setting new visibility');
						$('#newVisibilityPublicBtn').addClass('disabled');
						
						setTimeout(function()
						{
							$('#newVisibilityPublicBtn').removeClass('disabled');
							$('#newVisibilityResultMsg').html('');
							$('#newVisibilityResultMsg').hide();
						}, 3000);
					}
					else {console.log(data);}
				},
				error: function(errorData)
				{
					$('#newVisibilityResultMsg').show();
					$('#newVisibilityResultMsg').html('Error setting new visibility');
					$('#newVisibilityPublicBtn').addClass('disabled');

					setTimeout(function()
					{
						$('#newVisibilityPublicBtn').removeClass('disabled');
						$('#newVisibilityResultMsg').html('');
						$('#newVisibilityResultMsg').hide();
					}, 3000);
				}
			});
		});
		
		
		$(document).on("click", "#newVisibilityPrivateBtn", function(event){
		$.ajax({
				url: "../api/contextbroker.php",
				data: 
				{	
					action: "change_visibility", 
					username: loggedUser,
                    object:"ModelID", //IOTModel
                    table:"model",
					organization : organization, 
					obj_organization : obj_organization, 
					name: name,
					accesslink: accesslink,
					visibility: newVisibility,
					token : sessionToken
					},
					type: "POST",
					async: true,
					dataType: 'json',	
            success: function(data) 
				{
					if (data["status"] === 'ok')
					{
						$('#newVisibilityResultMsg').show();
						$('#newVisibilityResultMsg').html('New visibility set Private');
						$('#newVisibilityPrivateBtn').addClass('disabled');
						setTimeout(function()
						{
							$('#devicesTable').DataTable().destroy();
							fetch_data(true);
							location.reload();
						}, 3000); 
					}
					else if (data["status"] === 'ko')
					{
						$('#newVisibilityResultMsg').show();
						$('#newVisibilityResultMsg').html('Error setting new visibility');
						$('#newVisibilityPrivateBtn').addClass('disabled');
						
						setTimeout(function()
						{
							$('#newVisibilityPrivateBtn').removeClass('disabled');
							$('#newVisibilityResultMsg').html('');
							$('#newVisibilityResultMsg').hide();
						}, 3000);
					}
					else {console.log(data);}
				},
				error: function(errorData)
				{
					$('#newVisibilityResultMsg').show();
					$('#newVisibilityResultMsg').html('Error setting new visibility');
					$('#newVisibilityPrivateBtn').addClass('disabled');

					setTimeout(function()
					{
						$('#newVisibilityPrivateBtn').removeClass('disabled');
						$('#newVisibilityResultMsg').html('');
						$('#newVisibilityResultMsg').hide();
					}, 3000);
				}
			});
		});		
	   
	$(document).on("click", "#newOwnershipConfirmBtn", function(event){
				$.ajax({
				 url: "../api/contextbroker.php",
				 data:{
				 action: "change_owner", 
				 name: name,
                 object: "ModelID", //IOTModel
				 table: "model",
                 accesslink: accesslink,
				 organization : organization, 
				 obj_organization : obj_organization, 
				 owner: loggedUser,
				 newOwner:  $('#newOwner').val(),
				 token : sessionToken
			 },	
			type: "POST",
			async: true,
			dataType: 'json',
			success: function(data) 
			{
				if (data["status"] === 'ok')
				{
					$('#newOwner').val('');
					$('#newOwner').addClass('disabled');
					$('#newOwnershipResultMsg').show();
					$('#newOwnershipResultMsg').html('New ownership set correctly');
					$('#newOwnershipConfirmBtn').addClass('disabled');
					
					
					setTimeout(function()
					{
						$('#devicesTable').DataTable().destroy();
						fetch_data(true);
						location.reload();
					}, 3000);
				}
				else if (data["status"] === 'ko')
				{
					$('#newOwner').addClass('disabled');
					$('#newOwnershipResultMsg').html('Error setting new ownership: please try again');
					$('#newOwnershipConfirmBtn').addClass('disabled');
					
					setTimeout(function()
					{
						$('#newOwner').removeClass('disabled');
						$('#newOwnershipResultMsg').html('');
						$('#newOwnershipResultMsg').hide();
					}, 3000);
				}
				else {console.log(data);}
			},
			error: function(errorData)
			{
				$('#newOwner').addClass('disabled');
				$('#newOwnershipResultMsg').html('Error setting new ownership: please try again');
				$('#newOwnershipConfirmBtn').addClass('disabled');

				setTimeout(function()
				{
					$('#newOwner').removeClass('disabled');
					$('#newOwnershipResultMsg').html('');
					$('#newOwnershipResultMsg').hide();
				}, 3000);
			}
		});
	});  
	


	$("#delegationsCancelBtn").off("click");
	$("#delegationsCancelBtn").on('click', function(){        
		$('#newDelegation').val("");
                $('#newDelegationGroup').val("");
                $('#newDelegationOrganization').val("");  
		$('#newOwner').val("");
		  $("#newVisibilityResultMsg").html("");
		  $("#newOwnershipResultMsg").html("");
		   location.reload(); 
		  $('#delegationsModal').modal('hide'); 		    								  		
	});
			

       $.ajax({
			url: "../api/contextbroker.php",   //Checking the delegation table
		   data:
			{
													   
                action: "get_delegations",  // check the action and to be specified
                accesslink: accesslink,
                obj_organization:obj_organization,
                name:name,
                object:"ModelID", //IOTModel
                user : loggedUser,
                token : sessionToken,
			},
			type: "POST",
			async: true,
			dataType: 'json',
			success: function(data)
			{
					   
                if (data["status"]=='ok')
                {
					   
                    console.log(JSON.stringify(data));																					   delegations = data["delegation"];
                    $('#delegationsTable tbody').html("");   
                    $('#delegationsTableGroup tbody').html("");
			          
                    for(var i = 0; i < delegations.length; i++)
			   {
		
                   if ((delegations[i].userDelegated !="ANONYMOUS")&&(delegations[i].userDelegated!=null)) {
			   
                       console.log("adding user delegation");
			   
                       $('#delegationsTable tbody').append('<tr class="delegationTableRow" data-delegationId="' + delegations[i].delegationId + '" data-delegated="' + delegations[i].userDelegated + '"><td class="delegatedName">' + delegations[i].userDelegated + '</td><td><i class="fa fa-remove removeDelegationBtn"></i></td></tr>');

	   
                   }
	   
                   else  if (delegations[i].groupDelegated !=null){
			   
                       console.log("adding user delegation"+delegations[i]);
                       //extract cn and ou
                       var startindex=delegations[i].groupDelegated.indexOf("cn=");
                       var endindex_gr= delegations[i].groupDelegated.indexOf(",");
                       var gr=delegations[i].groupDelegated.substring(3, endindex_gr);
                       var endindex_ou=delegations[i].groupDelegated.indexOf(",", endindex_gr+1);
                       var ou=delegations[i].groupDelegated.substring(endindex_gr+4, endindex_ou);

			   
                       var DN="";
                       if (startindex!=-1){
                           DN=ou+","+gr;
                       }
			   
                       else{
                           DN=gr;
                       }

			   
                       $('#delegationsTableGroup tbody').append('<tr class="delegationTableRowGroup" data-delegationId="' + delegations[i].delegationId + '" data-delegated="' + ou + "," +gr+ '"><td class="delegatedName">' + DN + '</td><td><i class="fa fa-remove removeDelegationBtnGroup"></i></td></tr>');
	   
                   }

               }
			   $('#delegationsTable tbody').on("click","i.removeDelegationBtn",function(){
					var rowToRemove = $(this).parents('tr');
					$.ajax({
						url: "../api/contextbroker.php",     //check the url
						data:
						{
                            action: "remove_delegation",    // to be specified
                            token : sessionToken,
                            user : loggedUser,
                            delegationId: $(this).parents('tr').attr('data-delegationId')
						},
						type: "POST",
						async: true,
						dataType: 'json',
						success: function(data)
						{
						   if (data["status"] === 'ok')
																				  {
								rowToRemove.remove();
								console.log("success removing delegation");
							}
							else
							{
								console.log("error removing delegation");
							}
						},
						error: function(errorData)
						{
						   console.log("error in call for removing delegation");
						}
					});
               });
                    $('#delegationsTableGroup tbody').on("click","i.removeDelegationBtnGroup",function(){
                        console.log("toremove:");
                        var rowToRemove = $(this).parents('tr');
                        $.ajax({
                            url: "../api/contextbroker.php",     //check the url
                            data:
                            {
                                action: "remove_delegation",
                                token : sessionToken,
                                user : loggedUser,
                                delegationId: $(this).parents('tr').attr('data-delegationId')				   
                            },				   
                            type: "POST",
                            async: true,
                            dataType: 'json',
                            success: function(data)				   
                            {
                                if (data["status"] === 'ok')
                                {
                                    rowToRemove.remove();	
                                }
                                else
                                {
                                   console.log("error removing delegation");	
                                }	
                            },
                            error: function(errorData)
                            {
                                console.log("error in the call ro remove delegation");
							}
                        });	
                    });

                }
                else
				{				 
				console.log(json_encode(data));
				}
				},
				error: function(errorData)
			   {
				  console.log(errorData);//TBD  insert a message of error
				}
			});


       //listen about the confimation
       $(document).on("click", "#newDelegationConfirmBtn", function(event){
               var newDelegation = document.getElementById('newDelegation').value;
                $.ajax({
						url: "../api/contextbroker.php",       //which api to use
						data:
						{
						  action: "add_delegation",
						  accesslink : accesslink,
						  user : loggedUser,
                          obj_organization: obj_organization,
                          obj_name: name,
                          object:"ModelID", //IOTModel
						  token : sessionToken,
                          organization:organization,
						  delegated_user: newDelegation,
						},
						type: "POST",
						async: true,
						dataType: 'json',
						success: function(data)
						{
								if (data["status"] === 'ok')
							   {
										$('#delegationsTable tbody').append('<tr class="delegationTableRow" data-delegationId="' + data["delegationId"] + '" data-delegated="' + $('#newDelegation').val() + '"><td class="delegatedName">' + $('#newDelegation').val() + '</td><td><i class="fa fa-remove removeDelegationBtn"></i></td></tr>');


										$('#newDelegation').val('');
										$('#newDelegation').addClass('disabled');
										$('#newDelegatedMsg').css('color', 'white');
										$('#newDelegatedMsg').html('New delegation added correctly');
										$('#newDelegationConfirmBtn').addClass('disabled');

										setTimeout(function()
										{
												$('#newDelegation').removeClass('disabled');
												$('#newDelegatedMsg').css('color', '#f3cf58');
												$('#newDelegatedMsg').html('Delegated username can\'t be empty');
										}, 1500);
								}
								else
								{
										var errorMsg = null;


										$('#newDelegation').val('');
										$('#newDelegation').addClass('disabled');
										$('#newDelegatedMsg').css('color', '#f3cf58');
										$('#newDelegatedMsg').html(data["msg"]);
										$('#newDelegationConfirmBtn').addClass('disabled');

										setTimeout(function()
										{
												$('#newDelegation').removeClass('disabled');
												$('#newDelegatedMsg').css('color', '#f3cf58');
												$('#newDelegatedMsg').html('Delegated username can\'t be empty');
										}, 2000);
								}
						},
						error: function(errorData)
						{
								var errorMsg = "Error calling internal API";
								$('#newDelegation').val('');
								$('#newDelegation').addClass('disabled');
								$('#newDelegatedMsg').css('color', '#f3cf58');
								$('#newDelegatedMsg').html(errorMsg);
								$('#newDelegationConfirmBtn').addClass('disabled');

								setTimeout(function()
								{
										$('#newDelegation').removeClass('disabled');
										$('#newDelegatedMsg').css('color', '#f3cf58');
										$('#newDelegatedMsg').html('Delegated username can\'t be empty');
								}, 2000);
						}
               });

       });

       //group delegation -start------------------------------------------------------------------------------------------------------------
        $(document).on("click", "#newDelegationConfirmBtnGroup", function(event){
               
            var delegatedDN="";
               var e = document.getElementById("newDelegationGroup");
               if ((typeof e.options[e.selectedIndex] !== 'undefined')&&(e.options[e.selectedIndex].text!=='All groups')){
                       delegatedDN = "cn="+e.options[e.selectedIndex].text+",";
               }
                var e2 = document.getElementById("newDelegationOrganization");
               delegatedDN=delegatedDN+"ou="+e2.options[e2.selectedIndex].text;

                $.ajax({
                       url: "../api/contextbroker.php",
			   data:
			   {
					   action: "add_delegation",
					   accesslink : accesslink,
					   user : loggedUser,
					   token : sessionToken,
                       obj_organization: obj_organization,
                       obj_name: name,
                       object:"ModelID", //IOTModel
					   delegated_group: delegatedDN
			   },
			   type: "POST",
			   async: true,
			   dataType: 'json',
			   success: function(data)
			   {
					   if (data["status"] === 'ok')
					   {
							   var toadd= $('#newDelegationOrganization').val();
							   if ( document.getElementById("newDelegationGroup").options[e.selectedIndex].text!=''){
									   toadd=toadd+","+$('#newDelegationGroup').val();
							   }

							   $('#delegationsTableGroup tbody').append('<tr class="delegationTableRowGroup" data-delegationId="' + data["delegationId"] + '" data-delegated="' + toadd+ '"><td class="delegatedNameGroup">' +toadd + '</td><td><i class="fa fa-remove removeDelegationBtnGroup"></i></td></tr>');
							   $('#newDelegatedMsgGroup').css('color', 'white');
							   $('#newDelegatedMsgGroup').html('New delegation added correctly');

							   setTimeout(function()
							   {
									   $('#newDelegatedMsgGroup').css('color', '#f3cf58');
									   $('#newDelegatedMsgGroup').html('Delegated groupname can\'t be empty');
							   }, 1500);
					   }
					   else
					   {
							   var errorMsg = null;
							   $('#newDelegatedMsgGroup').css('color', '#f3cf58');
							   $('#newDelegatedMsgGroup').html(data["msg"]);

							   setTimeout(function()
							   {
									   $('#newDelegationGroup').removeClass('disabled');
									   $('#newDelegationOrganization').removeClass('disabled');
									   $('#newDelegatedMsgGroup').css('color', '#f3cf58');
									   $('#newDelegatedMsgGroup').html('Delegated groupname can\'t be empty');
							   }, 2000);
					   }
			   },
			   error: function(errorData)
			   {
					   var errorMsg = "Error calling internal API";
					   $('#newDelegatedMsgGroup').css('color', '#f3cf58');
					   $('#newDelegatedMsgGroup').html(errorMsg);

					   setTimeout(function()
					   {
							   $('#newDelegatedMsgGroup').css('color', '#f3cf58');
							   $('#newDelegatedMsgGroup').html('Delegated groupname can\'t be empty');
					   }, 2000);
			   }
               });
       });     //group delegation -end
	
	}

// END TO CHANGE THE VISIBILITY 
	
  



