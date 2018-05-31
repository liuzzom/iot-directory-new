	
	// var admin = "<?= $_SESSION['loggedRole'] ?>";
      //  var existingPoolsJson = null;
        // var internalDest = false;
        var tableFirstLoad = true;
     //   setGlobals(admin, existingPoolsJson);
	
  
		
		function buildMainTable(destroyOld, selected)
        {
		    console.log("dentro builtMaintable");
            if(destroyOld)
            {
                $('#valuesTable').bootstrapTable('destroy');
                tableFirstLoad = true;
            }
            
            var accountVisibile = true;
            var statusVisible = true;
            

            if($(window).width() < 992)
            {
                accountVisibile = false;
                statusVisible = false; 
                
            }
            if (selected==null)
			{
			  mydata = {action: "get_all_event_value"};
			}
			else
			{
			  mydata = {action: "get_subset_event_value", select : selected};
			}    

            $.ajax({
                url: "../api/value.php",
                data: mydata,
                type: "GET",
                async: true,
                datatype: 'json',
                success: function (data)
                {
					
					data = data["content"];
					console.log("sono qui");
					var creatorVisibile = true;
                    var detailView = true;
                    var statusVisibile = true;

                    if($(window).width() < 992)
                    {
                        detailView = false;
                        creatorVisibile = false; 
                        statusVisibile = false;
                    }
					
					
                    $('#valuesTable').bootstrapTable({
                            columns: [{
									field: 'cb',
									title: 'Context Broker',
									filterControl: 'select',
									sortable: true,
									valign: "middle",
									align: "center",
									halign: "center",
									formatter: function(value, row, index)
                                {
                                    var maxL = 50;
                                    if($(window).width() < 992)
                                    {
                                        maxL = 15;
                                    }
                                    
                                    if(value !== null)
                                    {
                                        if(value.length > maxL)
                                        {
                                           return value.substr(0, maxL) + " ...";
                                        }
                                        else
                                        {
                                           return value;
                                        } 
                                    }
                                },
                                cellStyle: function(value, row, index, field) {
                                    var fontSize = "1em"; 
                                    if($(window).width() < 992)
                                    {
                                        fontSize = "0.9em";
                                    }
                                    
                                    
                                    if(index%2 !== 0)
                                    {
                                        return {
                                            classes: null,
                                            css: {
                                                "color": "rgba(51, 64, 69, 1)", 
                                                "font-size": fontSize,
                                                "font-weight": "bold",
                                                "background-color": "rgb(230, 249, 255)",
                                                "border-top": "none"
                                            }
                                        };
                                    }
                                    else
                                    {
                                        return {
                                            classes: null,
                                            css: {
                                                "color": "rgba(51, 64, 69, 1)", 
                                                "font-size": fontSize,
                                                "font-weight": "bold",
                                                "background-color": "white",
                                                "border-top": "none"
                                            }
                                        };
                                    }
                                }
                            }, 
                            {
                                field: 'device',
								title: 'Device',
								filterControl: 'input',
								sortable: true,
								valign: "middle",
								align: "center",
								halign: "center",
								visible: creatorVisibile,
								formatter: function(value, row, index)
                                {
                                    if(value !== null)
									{
										if(value.length > 50)
										{
										   return value.substr(0, 50) + " ...";
										}
										else
										{
										   return value;
										} 
										
										
									}
                                },
                                cellStyle: function(value, row, index, field) {
								
								mycss = {"border-top": "none", "font-weight": "bold"};
								if(index%2 !== 0)
								{
								  mycss["background-color"]="rgb(230, 249, 255)";
								}
								else
								{
								   mycss["background-color"]="white"; 
								}
								if (row.kind=='sensor')
								{
								  mycss["color"]="rgb(69, 183, 175)";
								}
								else
								{
								   mycss["color"]="#e37777"; 
								}
							   return {
										classes: null,
										css: mycss
									};
                                    }
                            }, 
							{
                                field: 'value_name',
								title: 'Value Name',
								filterControl: 'input',
								sortable: true,
								valign: "middle",
								align: "center",
								halign: "center",
								visible: creatorVisibile,
								formatter: function(value, row, index)
                                {
                                    if(value !== null)
                                    {
                                        if(value.length > 50)
                                        {
                                           return value.substr(0, 50) + " ...";
                                        }
                                        else
                                        {
                                           return value;
                                        } 
                                    }
                                },
                                cellStyle: function(value, row, index, field) {
                                    if(index%2 !== 0)
                                    {
                                        return {
                                            classes: null,
                                            css: {
                                                "background-color": "rgb(230, 249, 255)",
                                                "border-top": "none"
                                            }
                                        };
                                    }
                                    else
                                    {
                                        return {
                                            classes: null,
                                            css: {
                                                "background-color": "white",
                                                "border-top": "none"
                                            }
                                        };
                                    }
                                }
                            },
                            {
                                field: 'value_type',
								title: 'Value Type',
								filterControl: 'select',
								sortable: true,
								valign: "middle",
								align: "center",
								halign: "center",
								visible: creatorVisibile,
								formatter: function(value, row, index)
                                {
                                    if(value !== null)
                                    {
                                        if(value.length > 50)
                                        {
                                           return value.substr(0, 50) + " ...";
                                        }
                                        else
                                        {
                                           return value;
                                        } 
                                    }
                                },
                                cellStyle: function(value, row, index, field) {
                                    if(index%2 !== 0)
                                    {
                                        return {
                                            classes: null,
                                            css: {
                                                "background-color": "rgb(230, 249, 255)",
                                                "border-top": "none"
                                            }
                                        };
                                    }
                                    else
                                    {
                                        return {
                                            classes: null,
                                            css: {
                                                "background-color": "white",
                                                "border-top": "none"
                                            }
                                        };
                                    }
                                }
                            },
                            {
                                field: 'healthiness_criteria',
								title: 'Healthiness Criteria',
								filterControl: 'select',
								sortable: true,
								valign: "middle",
								align: "center",
								halign: "center",
								visible: creatorVisibile,
								formatter: function(value, row, index)
                                {
                                    if(value !== null)
                                    {
                                        if(value.length > 50)
                                        {
                                           return value.substr(0, 50) + " ...";
                                        }
                                        else
                                        {
                                           return value;
                                        } 
                                    }
                                },
                                cellStyle: function(value, row, index, field) {
                                    if(index%2 !== 0)
                                    {
                                        return {
                                            classes: null,
                                            css: {
                                                "background-color": "rgb(230, 249, 255)",
                                                "border-top": "none"
                                            }
                                        };
                                    }
                                    else
                                    {
                                        return {
                                            classes: null,
                                            css: {
                                                "background-color": "white",
                                                "border-top": "none"
                                            }
                                        };
                                    }
                                }
                            },
							
							{
                                field: 'value_refresh_rate',
								title: 'Refresh Rate',
								filterControl: 'input',
								sortable: true,
								valign: "middle",
								align: "center",
								halign: "center",
								visible: creatorVisibile,
								formatter: function(value, row, index)
                                {
                                    if(value !== null)
                                    {
                                        if(value.length > 50)
                                        {
                                           return value.substr(0, 50) + " ...";
                                        }
                                        else
                                        {
                                           return value;
                                        } 
                                    }
                                },
                                cellStyle: function(value, row, index, field) {
                                    if(index%2 !== 0)
                                    {
                                        return {
                                            classes: null,
                                            css: {
                                                "background-color": "rgb(230, 249, 255)",
                                                "border-top": "none"
                                            }
                                        };
                                    }
                                    else
                                    {
                                        return {
                                            classes: null,
                                            css: {
                                                "background-color": "white",
                                                "border-top": "none"
                                            }
                                        };
                                    }
                                }
                            },
							
                            {
                                title: "",
								align: "center",
                                valign: "middle",
                                align: "center",
                                halign: "center",
                                formatter: function(value, row, index)
                                { 
								   if (editButton)
								     return '<button type="button" class="editDashBtn">edit</button>';
                                },
								cellStyle: function(value, row, index, field) {
                                    if(index%2 !== 0)
                                    {
                                        return {
                                            classes: null,
                                            css: {
                                                "background-color": "rgb(230, 249, 255)",
                                                "border-top": "none"
                                            }
                                        };
                                    }
                                    else
                                    {
                                        return {
                                            classes: null,
                                            css: {
                                                "background-color": "white",
                                                "border-top": "none"
                                            }
                                        };
                                    }
                                }
                            },
                            {
                                title: "",
                                align: "center",
                                valign: "middle",
                                align: "center",
                                halign: "center",
                                formatter: function(value, row, index)
                                {
                                    if (deleteButton)
                                    return '<button type="button" class="delDashBtn">del</button>';
                                },
                                cellStyle: function(value, row, index, field) {
                                    if(index%2 !== 0)
                                    {
                                        return {
                                            classes: null,
                                            css: {
                                                "background-color": "rgb(230, 249, 255)",
                                                "border-top": "none"
                                            }
                                        };
                                    }
                                    else
                                    {
                                        return {
                                            classes: null,
                                            css: {
                                                "background-color": "white",
                                                "border-top": "none"
                                            }
                                        };
                                    }
                                }        
                            },
							{
                                title: "",
                                align: "center",
                                valign: "middle",
                                align: "center",
                                halign: "center",
                                formatter: function(value, row, index)
                                {
								// console.log("prop" +row.mandatoryproperties + "value" +row.mandatoryvalues);
								if (row.mandatoryproperties==1 && row.mandatoryvalues==1)
								return '<button type="button" class="btn btn-success"></button>';
								else 
								return '<button type="button" class="btn btn-warning"></button>';
                                 },
                                cellStyle: function(value, row, index, field) {
                                    if(index%2 !== 0)
                                    {
                                        return {
                                            classes: null,
                                            css: {
                                                "background-color": "rgb(230, 249, 255)",
                                                "border-top": "none",
												
                                            }
                                        };
                                    }
                                    else
                                    {
                                        return {
                                            classes: null,
                                            css: {
                                                "background-color": "white",
                                                "border-top": "none"
                                            }
                                        };
                                    }
                                }        
                            },
							{
                                title: "",
                                align: "center",
                                valign: "middle",
                                align: "center",
                                halign: "center",
                                formatter: function(value, row, index)
                                {
								    if (mapButton)
                                    return '<div class="addMapBtn"><i data-toggle="modal" data-target="#addMap" class="fa fa-globe" onclick="drawMap(\''+ row.latitude +  "\',\'" + row.longitude + '\')\" style=\"font-size:36px; color: #0000ff\"></i></div>';
                                },
                                cellStyle: function(value, row, index, field) {
                                    if(index%2 !== 0)
                                    {
                                        return {
                                            classes: null,
                                            css: {
                                                "background-color": "rgb(230, 249, 255)",
                                                "border-top": "none",
												
                                            }
                                        };
                                    }
                                    else
                                    {
                                        return {
                                            classes: null,
                                            css: {
                                                "background-color": "white",
                                                "border-top": "none"
                                            }
                                        };
                                    }
                                }        
                            }							
							
							],
                            data: data,
                            search: true,
                            pagination: true,
                            pageSize: 10,
							filterControl: true,
                            locale: 'en-US',
                            searchAlign: 'left',
                            //uniqueId: "name",
                            striped: false,
                            classes: "table table-hover table-no-bordered",
							detailView: detailView,
							detailFormatter: function(index, row, element) {
                            return 'Data Type: ' + data[index].data_type   + ' | Editable: ' + data[index].editable + ' | Different Value: ' + data[index].different_values + " | Value Bound: " + data[index].value_bounds + " | Order: " + data[index].order + " | Kind: " + data[index].kind;
							},
                            rowAttributes: function(row, index){
                            return {
                                "data-cb": row.cb,
                                "data-device": row.device,
                                "data-value_name": row.value_name,
                                "data-data_type": row.data_type,
                                "data-value_type": row.value_type,
                                "data-editable": row.editable,
                                "data-value_unit": row.value_unit,
                                "data-healthiness_criteria": row.healthiness_criteria,
                                "data-value_refresh_rate": row.value_refresh_rate,
								"data-different_values": row.different_values,
                                "data-value_bounds": row.value_bounds,
                                "data-order": row.order,
								"data-kind" : row.kind,
								"data-latitude" : row.latitude,
								"data-longitude" : row.longitude,
								"data-mandatoryproperties" : row.mandatoryproperties,
								"data-mandatoryvalues" : row.mandatoryvalues
                              };
						  },
						   searchTimeOut: 250,
                            onPostBody: function()
                            {
							    console.log("Value first load" + tableFirstLoad);
                                if(tableFirstLoad)
                                {
                                    tableFirstLoad = false;
									
									var addMapDiv = $('<div id="displayDevicesMapSA" class="pull-left"><button type="button" class="btn btn-primary btn-round"><span class="glyphicon glyphicon-globe" style="font-size:36px; color: #0000ff"></span></button></div>');
									$('div.fixed-table-toolbar').append(addMapDiv);
                                    addMapDiv.css("margin-top", "10px");
									addMapDiv.css("margin-left", "150px");
									addMapDiv.find('button.btn btn-primary btn-round').off('hover');
                                    addMapDiv.find('button.btn btn-primary btn-round').hover(function(){
                                        $(this).css('color', '#e37777');
                                       // $(this).css('background', '#ffcc00');
									$(this).parents('tr').find('td').eq(1).css('background', '#ffcc00');
                                    }, 
                                    function(){
                                      $(this).css('background', '#e37777');
                                       //$(this).parents('tr').find('td').eq(1).css('background', $(this).parents('td').css('background'));
                                    });
									
									 
									 $('#displayDevicesMapSA').off('click');
									 $('#displayDevicesMapSA').click(function(){
										
										$.ajax({
											url: "../api/value.php",
											data: {
											action: "get_all_value_latlong"
											},
											type: "GET",
											async: true,
											datatype: 'json',
											success: function (data) 
											 {
												
												 if(data["status"] === 'ko')
													{
														  data = data["content"];
													}

												 else (data["status"] === 'ok')
													{
														var data = data["content"];
														var mylat =[];
														var mylong=[];
														
														for (var i=0; i<data.length; i++){
															 mylat.push(data[i].latitude);
															 mylong.push(data[i].longitude);
															}
															
														   $("#addMap1SA").modal('show');
														    //drawMapAll(mylat, mylong);
                                                            drawMapAll(data);
															 
														}
											 },
											 error: function (data) 
											 {
												 console.log("Ko result: " + data);
											 }
											
										});		
									
									
										});
                                    									
                                    //var addValueDiv = $('<div class="pull-right"><i id="addValueBtn" data-toggle="modal" data-target="#addValueModal" class="fa fa-plus-square" style="font-size:36px; color: #ffcc00"></i></div>');
									var addValueDiv = $('<div class="pull-right"><button id="addValueBtn"  class="btn btn-primary">New Value</button></div>');

                                    
                                     $('div.fixed-table-toolbar').append(addValueDiv);
                                    addValueDiv.css("margin-top", "10px");
                                    //addValueDiv.find('i.fa-plus-square').off('hover');
                                    //addValueDiv.find('i.fa-plus-square').hover(function(){
									addValueDiv.find('button.btn btn-primary').off('hover');
									addValueDiv.find('button.btn btn-primary').hover(function(){
										$(this).css('color', '#e37777');
                                        $(this).css('cursor', 'pointer');
                                    }, 
                                    function(){
                                        $(this).css('color', '#ffcc00');
                                        $(this).css('cursor', 'normal');
                                    });
									
									
				
									/* This is loading validation when the cursor is on */
								
									$("#addValueBtn").off("click");
                                    $("#addValueBtn").click(function(){
										
									  $("#addValueModal").modal('show');
									
                                      $("#addValueLoadingMsg").hide();
                                      $("#addValueLoadingIcon").hide();
                                      $("#addValueOkMsg").hide();
                                      $("#addValueOkIcon").hide();
                                      $("#addValueKoMsg").hide();
                                      $("#addValueKoIcon").hide();
									 
									  
									  /* will work on the validation  showAddDeviceModal(); */

                                   });
                                   
								
                                    $('#valuesTable thead').css("background", "rgba(0, 162, 211, 1)");
                                    $('#valuesTable thead').css("color", "white");
                                    $('#valuesTable thead').css("font-size", "1em");
                                }
                                else
                                {
                                    
                                }

                               
								
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
						
                                $('#valuesTable').css("border-bottom", "none");
                                $('span.pagination-info').hide();

                                $('#valuesTable tbody button.editDashBtn').off('hover');
                                $('#valuesTable tbody button.editDashBtn').hover(function(){
                                    $(this).css('background', '#ffcc00');
   									$(this).parents('tr').find('td').eq(2).css('background', '#ffcc00');
									$(this).parents('tr').find('td').eq(3).css('background', '#ffcc00');
									
                                }, 
                                function(){
                                    $(this).css('background', 'rgb(69, 183, 175)');                         
									$(this).parents('tr').find('td').eq(2).css('background', $(this).parents('td').css('background'));
									$(this).parents('tr').find('td').eq(3).css('background', $(this).parents('td').css('background'));
                                });

                                $('#valuesTable button.editDashBtn').off('click');
                               
                                $('#valuesTable button.editDashBtn').click(function(){
                                    // $("#editDeviceModalUpdating").hide();
									
									
									//******Edit Control function call
									
							/* must have it later		showEditDeviceModal(); */
									
									
									
                                    $("#editValueModalBody").show();


                                      $("#editValueLoadingMsg").hide();
                                      $("#editValueLoadingIcon").hide();
                                      $("#editValueOkMsg").hide();
                                      $("#editValueOkIcon").hide();
                                      $("#editValueKoMsg").hide();
                                      $("#editValueKoIcon").hide(); 
									  $("#editValueModalFooter").show();
									  $("#editValueModal").modal('show');
									  $("#editValueModalLabel").html("Edit value - " + $(this).parents('tr').attr("data-value_name"));
							
											
								  $('#selectContextBrokerM').val($(this).parents('tr').attr('data-cb'));
								  $('#inputNameDeviceM').val($(this).parents('tr').attr('data-device'));
								  $('#inputValueNameDeviceM').val($(this).parents('tr').attr('data-value_name'));
								  $('#selectDataTypeM').val($(this).parents('tr').attr('data-data_type'));
								  $('#selectValueTypeM').val($(this).parents('tr').attr('data-value_type'));
								  $('#inputEditableValueM').val($(this).parents('tr').attr('data-editable'));
								  $('#selectValueUnitM').val($(this).parents('tr').attr('data-value_unit'));
								  $('#selectHealthinessCriteriaM').val($(this).parents('tr').attr('data-healthiness_criteria'));
								  $('#inputHealthinessValueM').val($(this).parents('tr').attr('data-value_refresh_rate'));
								  $('#inputOrderM').val($(this).parents('tr').attr('data-order'));
								  
							
					
                                });

                                $('#valuesTable button.delDashBtn').off('hover');
                                $('#valuesTable button.delDashBtn').hover(function(){
                                    $(this).css('background', '#ffcc00');
                                    $(this).parents('tr').find('td').eq(2).css('background', '#ffcc00');
									$(this).parents('tr').find('td').eq(3).css('background', '#ffcc00');
									
                                }, 
                                function(){
                                    $(this).css('background', '#e37777');
                                    $(this).parents('tr').find('td').eq(2).css('background', $(this).parents('td').css('background'));
									$(this).parents('tr').find('td').eq(3).css('background', $(this).parents('td').css('background'));
                                });

                                $('#valuesTable button.delDashBtn').off('click');
                                $('#valuesTable button.delDashBtn').click(function(){
                                    var cb = $(this).parents("tr").find("td").eq(1).html();
									var device = $(this).parents("tr").find("td").eq(2).html();
								    var value_name = $(this).parents("tr").find("td").eq(3).html();
                                    var editable = $(this).parents("tr").find("td").eq(6).html();
									 
						            $("#deleteValueModal div.modal-body").html('<div class="modalBodyInnerDiv"><span data-value_name = "' + value_name + '" data-cb = "' + cb + '" data-device = "' + device + '" data-editable = "' + editable +'">Do you want to confirm deletion of value <b>' + value_name + '</b> from Device <b>' + device + '</b>?</span></div>');
                                    $("#deleteValueModal").modal('show');
                                });
								
							
							
							// This pieces of code works in device and also for value, it performs the intended function but let the browser  freeze can't find a reason .... 
						$('#valuesTable').bootstrapTable('hideColumn', 'edit');
							    								

						   }
							
							
                        });
                    },
					error: function (mydata)
					 {
					   console.log(JSON.stringify(mydata));
					 }
					
            });
        }
	
       
	   
	    $(document).ready(function () 
    {
       
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
        
		  // $('#valuesTable').bootstrapTable('showColumn', 'type');
           
		
        $(window).resize(function(){
            $('#mainContentCnt').height($('#mainMenuCnt').height() - $('#headerTitleCnt').height());
            if($(window).width() < 992)
            {
                $('#valuesTable').bootstrapTable('hideColumn', 'cb');
                $('#valuesTable').bootstrapTable('hideColumn', 'device');
                $('#valuesTable').bootstrapTable('hideColumn', 'value_name');
                $('#valuesTable').bootstrapTable('hideColumn', 'value_type');
                $('#valuesTable').bootstrapTable('hideColumn', 'healthiness_criteria');
                $('#valuesTable').bootstrapTable('hideColumn', 'value_refresh_rate');
               
            }
            else
            {
                $('#valuesTable').bootstrapTable('showColumn', 'cb');
                $('#valuesTable').bootstrapTable('showColumn', 'device');
                $('#valuesTable').bootstrapTable('showColumn', 'value_name');
                $('#valuesTable').bootstrapTable('showColumn', 'value_type');
                $('#valuesTable').bootstrapTable('showColumn', 'healthiness_criteria');
                $('#valuesTable').bootstrapTable('showColumn', 'value_refresh_rate');
    		
            }
        });
		
		if (functionality.length==0) console.log("ERRORE nella lettura delle funcionality");
		for (var func =0;func < functionality.length; func++)
		{
			
		  var element = functionality[func];
		  if (element.view=="view")
		  {
			  if (element[loggedRole]==1)  
			   {   console.log(loggedRole + " " + element[loggedRole] + " " + element["class"]); 
				   $(element["class"]).show();
			   }			   
			   else 
			   { 
				 $(element["class"]).hide();
				 console.log($(element.class));
				 console.log(loggedRole + " " + element[loggedRole] + " " + element["class"]);
			   }
			}
            else
			{
			  if (element[loggedRole]==1 && element.class==".editDashBtn")    editButton =1;
			  if (element[loggedRole]==0 && element.class==".editDashBtn")    editButton =0;
			  
			  if (element[loggedRole]==1 && element.class==".delDashBtn")    deleteButton =1;
			  if (element[loggedRole]==0 && element.class==".delDashBtn")    deleteButton =0;
			  
			  if (element[loggedRole]==1 && element.class==".addMapBtn")    mapButton =1;
			  if (element[loggedRole]==0 && element.class==".addMapBtn")    mapButton =0;
			   
			}			
		}
		
		
		
		$('#valueLink .mainMenuItemCnt').addClass("mainMenuItemCntActive");
        $('#mobMainMenuPortraitCnt #valueLink .mobMainMenuItemCnt').addClass("mainMenuItemCntActive");
        $('#mobMainMenuLandCnt #valueLink .mobMainMenuItemCnt').addClass("mainMenuItemCntActive");
	
     buildMainTable(false, null);

	
    });     // end of ready state   
	
	
   
  
		


        /*   ADD NEW VALUE CONFIRMATION */
		
		
        $('#addNewValueConfirmBtn').off("click");
        $("#addNewValueConfirmBtn").click(function(){
			
	        $("#addValueModalTabs").hide();
			$('#addValueModal div.modalCell').hide();
            $("#addValueModalFooter").hide();
            $('#addValueLoadingMsg').show();
            $('#addValueLoadingIcon').show();

             $.ajax({
                 url: "../api/value.php",
                 data:{
					  action: "insert",
					  contextbroker: $('#selectContextBroker').val(),
		 			  device: $('#inputNameDevice').val(),
					  value_name: $('#inputValueNameDevice').val(),
					  data_type: $('#selectDataType').val(),
					  value_type: $('#selectValueType').val(),
					  editable: $('#inputEditableValue').val(),
					  value_unit: $('#selectValueUnit').val(),
					  healthiness_criteria: $('#selectHealthinessCriteria').val(),
					  healthiness_value: $('#inputHealthinessValue').val(),
					  // order: $('#inputOrder').val()					 
					  },
                 type: "POST",
                 async: true,
				
                 success: function (data) 
                 {
				 console.log("Elf result: " + JSON.stringify(data));
				 
					if(data["status"] === 'ko')
                    {
                        console.log("Error adding value");
                        console.log(data);
						$('#addValueLoadingMsg').hide();
                        $('#addValueLoadingIcon').hide();
                        $('#addValueKoMsg').show();
                        $('#addValueKoIcon').show();
                      
                        setTimeout(function(){
                            $('#addValueKoMsg').hide();
                            $('#addValueKoIcon').hide();
                            $('#addValueModalTabs').show();
                            $('#addValueModal div.modalCell').show();
                            $('#addValueModalFooter').show();
                        }, 3000);
                    }			 
					else if (data["status"] === 'ok')
                    {
						
						
						$('#addValueLoadingMsg').hide();
                        $('#addValueLoadingIcon').hide();
                        $('#addValueKoMsg').hide();
                        $('#addValueKoIcon').hide();
                        $('#addValueOkMsg').show();
                        $('#addValueOkIcon').show();
                        
                       $('#dashboardTotNumberCnt .pageSingleDataCnt').html(parseInt($('#dashboardTotNumberCnt .pageSingleDataCnt').html()) + 1);
                       if (data["editable"])                       
							$('#dashboardTotPermCnt .pageSingleDataCnt').html(parseInt($('#dashboardTotPermCnt .pageSingleDataCnt').html()) + 1);
					   else
							$('#dashboardTotActiveCnt .pageSingleDataCnt').html(parseInt($('#dashboardTotActiveCnt .pageSingleDataCnt').html()) + 1);
	                 
					setTimeout(function(){
                            $('#addValueModal').modal('hide');
                            buildMainTable(true,null);

                            setTimeout(function(){
								  $('#addValueOkMsg').hide();
                                  $('#addValueOkIcon').hide();
								  
								  $('#selectContextBroker').val("");
								  $('#inputNameDevice').val("");
								  $('#inputValueNameDevice').val("");
								  $('#selectDataType').val("");
								  $('#selectValueType').val("");
								  $('#inputEditableValue').val("");
								  $('#selectValueUnit').val("");
								  $('#selectHealthinessCriteria').val("");
								  $('#inputHealthinessValue').val("");
								  // $('#inputOrder').val();		
							
																
								  $('#addValueModalTabs').show();
                                  $('#addValueModal div.modalCell').show();
                                  $('#addValueModalFooter').show();
                            }, 500);
                        }, 3000);
						
				
                    } 
					 
                 },
                 error: function (data) 
                 {
                     console.log("Error status -- Ko result: " +  data);

                        $('#addValueLoadingMsg').hide();
                        $('#addValueLoadingIcon').hide();
                        $('#addValueKoMsg').show();
                        $('#addValueKoIcon').show();
                        setTimeout(function(){
                            $('#addValueKoMsg').hide();
                            $('#addValueKoIcon').hide();
                            $('#addValueModalTabs').show();
                            $('#addValueModal div.modalCell').show();
                            $('#addValueModalFooter').show();
                        }, 3000);
                 }
             });
        });
        
		
		
		
        /*   DELETE VALUE CONFIRMATION */
		
		
        $('#deleteValueConfirmBtn').off("click");
        $("#deleteValueConfirmBtn").click(function(){
		  
			var device = $("#deleteValueModal span").attr("data-device");
			var cb = $("#deleteValueModal span").attr("data-cb");
			var value_name   = $("#deleteValueModal span").attr("data-value_name");
			
			var editable = $("#deleteValueModal span").attr("data-editable");
            
			
			
            $("#deleteValueModal div.modal-body").html("");
            $("#deleteValueCancelBtn").hide();
            $("#deleteValueConfirmBtn").hide();
            $("#deleteValueModal div.modal-body").append('<div id="deleteValueModalInnerDiv1" class="modalBodyInnerDiv"><h5>Value deletion in progress, please wait</h5></div>');
            $("#deleteValueModal div.modal-body").append('<div id="deleteValueModalInnerDiv2" class="modalBodyInnerDiv"><i class="fa fa-circle-o-notch fa-spin" style="font-size:36px"></i></div>');
			
            // Delete value
            $.ajax({
                url: "../api/value.php",
				data:{	
						action: "delete",
						device: device, 
						contextbroker: cb, 
						value_name: value_name,
       					  editable : editable						
						},
                type: "POST",
				datatype: "json",
                async: true,
				
                success: function (data) 
                {
					console.log(JSON.stringify(data));
                    if(data["status"] === 'ko')
                    {
                        $("#deleteValueModalInnerDiv1").html(data["msg"]);
                        $("#deleteValueModalInnerDiv2").html('<i class="fa fa-frown-o" style="font-size:42px"></i>');
                    }
                    else if(data["status"] === 'ok')
                    {
                        $("#deleteValueModalInnerDiv1").html('Value &nbsp; <b>' + value_name + '</b> &nbsp;deleted successfully');
                        $("#deleteValueModalInnerDiv2").html('<i class="fa fa-check" style="font-size:42px"></i>');
						
						
                       $('#dashboardTotNumberCnt .pageSingleDataCnt').html(parseInt($('#dashboardTotNumberCnt .pageSingleDataCnt').html()) - 1);
                       if (data["editable"])                       
							$('#dashboardTotPermCnt .pageSingleDataCnt').html(parseInt($('#dashboardTotPermCnt .pageSingleDataCnt').html()) - 1);
					   else
							$('#dashboardTotActiveCnt .pageSingleDataCnt').html(parseInt($('#dashboardTotActiveCnt .pageSingleDataCnt').html()) - 1);
                        setTimeout(function()
                        {
                            buildMainTable(true, null);
                            $("#deleteValueModal").modal('hide');
                            setTimeout(function(){
                                $("#deleteValueCancelBtn").show();
                                $("#deleteValueConfirmBtn").show();
                            }, 500);
                        }, 2000);
                    }
                },
                error: function (data) 
                {
				    console.log(JSON.stringify(data));
                    $("#deleteValueModalInnerDiv1").html(data["msg"]);
                    $("#deleteValueModalInnerDiv2").html('<i class="fa fa-frown-o" style="font-size:42px"></i>');
                }
            });
        });
		
        /*  EDIT VALUE CONFIRMATION */
		
        $('#editValueConfirmBtn').off("click");
        $("#editValueConfirmBtn").click(function(){
     
			
			$("#editValueModalTabs").hide();
			$('#editValueModal div.modalCell').hide();
            $("#editValueModalFooter").hide();
            $('#editValueLoadingMsg').show();
            $('#editValueLoadingIcon').show();
          

             // Edit Value
             $.ajax({
                 url: "../api/value.php",
                 data:{
				  action: "update", 
				  contextbroker: $('#selectContextBrokerM').val(),
			      device: $('#inputNameDeviceM').val(),
				  value_name: $('#inputValueNameDeviceM').val(),
				  data_type: $('#selectDataTypeM').val(),
				  value_type: $('#selectValueTypeM').val(),
				  editable: $('#inputEditableValueM').val(),
				  value_unit: $('#selectValueUnitM').val(),
				  healthiness_criteria: $('#selectHealthinessCriteriaM').val(),
				  healthiness_value: $('#inputHealthinessValueM').val(),
				  // order: $('#inputOrderM').val()
				 },
                 type: "POST",
                 async: true,
                 success: function (mydata) 
                 {
					if(mydata["status"] === 'ko')
                    {
  						     $("#editValueModal").modal('hide');
							 $("#editValueKoModalInnerDiv1").html(mydata["msg"]);
							 $("#editValueKoModal").modal('show');
							 $("#editValueModalUpdating").hide();
							 $("#editValueModalBody").show();
							 $("#editValueModalFooter").show();
                    }
					 
					else if (mydata["status"] === 'ok')
                    {
							
							 $("#editValueModal").modal('hide');
                             $("#editValueOkModalInnerDiv1").html('<h5>Value<b> ' + $('#inputValueNameDeviceM').val() + ' </b> successfully updated</h5>');
                             $("#editValueOkModal").modal('show');
                            // setTimeout(updateCBTimeout, 500);
							setTimeout (function(){
								$('#valueTable').bootstrapTable("load");
									location.reload();
									}, 500);
						
						
					} 	
					 
                 },
                 error: function (mydata) 
                 {
                     console.log("Ko result: " + JSON.stringify(mydata));
                     $("#editValueModal").modal('hide');
                     $("#editValueKoModalInnerDiv1").html(mydata["msg"]);
                     $("#editValueKoModal").modal('show');
                     $("#editValueModalUpdating").hide();
                     $("#editValueModalBody").show();
                     $("#editValueModalFooter").show();
                 }
             });
        });
		
	
        
        $("#addNewValueCancelBtn").off("click");
        $("#addNewValueCancelBtn").on('click', function(){
								  
			  $('#selectContextBroker').val("");
			  $('#inputNameDevice').val("");
			  $('#inputValueNameDevice').val("");
			  $('#selectDataType').val("");
			  $('#selectValueType').val("");
			  $('#inputEditableValue').val("");
			  $('#selectValueUnit').val("");
			  $('#selectHealthinessCriteria').val("");
			  $('#inputHealthinessValue').val("");
			  // $('#inputOrder').val();		
								  
			  $('#addValueModal').modal('hide'); 						
			  
				location.reload();    								  
								
        });
        
        $("#addValueKoBackBtn").off("click");
        $("#addValueKoBackBtn").on('click', function(){
            $("#addValueKoModal").modal('hide');
            $("#addValueModal").modal('show');
        });
        
        $("#addValueKoConfirmBtn").off("click");
        $("#addValueKoConfirmBtn").on('click', function(){
            $("#addValueKoModal").modal('hide');
            $("#addValueForm").trigger("reset");   
        });
        
        $("#editValueKoBackBtn").off("click");
        $("#editValueKoBackBtn").on('click', function(){
            $("#editValueKoModal").modal('hide');
            $("#editValueModal").modal('show');
        });
        
        $("#editValueKoConfirmBtn").off("click");
        $("#editValueKoConfirmBtn").on('click', function(){
            $("#editValueKoModal").modal('hide');
            $("#editValueForm").trigger("reset");
        });
        
 
	   
        function updateDeviceTimeout()
        {
            $("#editValueOkModal").modal('hide');
            setTimeout(function(){
               location.reload();
            }, 500);
        }
        
       
	 function drawMap(latitude,longitude){ 
	   map = L.map('addDeviceMapModalBody').setView([latitude,longitude], 10);
	   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	  }).addTo(map);
	   window.node_input_map = map;
	   L.marker([latitude,longitude]).addTo(map).bindPopup("Hi DEVICE");
	   setTimeout(function(){ map.invalidateSize()}, 400);
	  }
	
	 
	  function getLatLong(id, cb){
		     
			console.log(id);
			var id = id;
				$.ajax({
					url: "../api/value.php",
					data: {
						id: id, 
						contextbroker : cb,
						action: "get_value_latlong"
					},
					type: "GET",
					async: true,
					dataType: 'json',
					dataType: 'json',
					success: function (data) 
					{
					  console.log(data);
					  var mylat =[];
					  var mylong=[];
					  if (data["status"] === 'ok')
					  {
						var data = data["content"];								
						for (var i=0; i<data.length; i++){
							 mylat.push(data[i].latitude);
							 mylong.push(data[i].longitude);
							}
							
							latitude = mylat[0];
							longitude = mylong[0];
						  // $("#addMap").modal('show');
							drawMap(latitude,longitude);	 
						}			  
					},
					error: function (data)
					{
					   console.log("Error ajax in retrieving latitude and longitude data");
						console.log(JSON.stringify(data));
					}
					
				});
	   }
	   

	//$("#selectValueType, #slectValueTypeM").change(function() {
	$("#selectValueType").change(function() {
		var valType = document.getElementById("selectValueType").value;
				console.log(valType);
				$.ajax({
					url: "../api/value.php",
					data: {
						value_type: valType, 
						action: "get_value_unit_data"
					},
					type: "GET",
					async: true,
					dataType: 'json',
					success: function (data) 
					{
					  console.log(data);
					if(data["status"] === 'ko')
					{
						  //data = data["content"];
						}
					else (data["status"] === 'ok')
					{
						var data = data["content"];					
						var value_unit_default=[];
														
							for (var i=0; i<data.length; i++){
									 value_unit_default.push(data[i].value_unit_default);
									}
									
							  document.getElementById("selectValueUnit").value = value_unit_default;
															  
						    // $('#selectValueUnit').val(data[0].value_unit_default);
							 
						}			  
					},
					error: function (data)
					{
					   console.log("Error ajax in retrieving value Unit");
						console.log(JSON.stringify(data));
					}
				});
		
	});

function drawMapAll(data){
		var latitude = 43.7800;
		var longitude =11.2300;
if (typeof map === 'undefined' || !map) {
		map = L.map('searchDeviceMapModalBodySA').setView([latitude,longitude], 10);
	   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	  }).addTo(map);
	   window.node_input_map = map;
     
     var mapLayers = {};
    drawnItems = new L.FeatureGroup();
            map.addLayer(drawnItems);

            var editControl = new L.Control.Draw({
                draw: false,
                edit: {
                    featureGroup: drawnItems,
                    poly: {
                        allowIntersection: false
                    }
                }
            });
            map.addControl(editControl);
     
     drawControl = new L.Control.Draw({
                draw: {
                    position: 'topleft',
                    //polyline: false,
                    //marker: false,
                    circlemarker: false,
                    //polygon: false,
                    rectangle: false,
                    polygon: {
                        allowIntersection: false,
                        showArea: true
                    }
                }
            });
            map.addControl(drawControl);
     
      L.control.layers(mapLayers, {
                'drawlayer': drawnItems
            }, {
                collapsed: true
            }).addTo(map);
     
     map.on(L.Draw.Event.CREATED, function(e) {
                var fence = e.layer;
                if (drawnItems.hasLayer(fence) == false) {
                    drawnItems.addLayer(fence);
                }

                drawControl.remove();
                TYPE= e.layerType;
                layer = e.layer;
                
                
        
         
         var resultsOut=drawSelection(layer, TYPE, data);
         $('#addMap1SA').modal('hide');
		 buildMainTable(true, JSON.stringify(resultsOut));
         //console.log(resultsOut);
     
     });
     
     map.on('draw:edited', function(e) {
                var fences = e.layers;
                fences.eachLayer(function(fence) {
                    fence.shape = "geofence";
                    if (drawnItems.hasLayer(fence) == false) {
                        drawnItems.addLayer(fence);
                    }
                });
                drawnItems.eachLayer(function(layer) {
                        var resultsOut=drawSelection(layer, TYPE, data);     
                        // console.log(resultsOut);
						$('#addMap1SA').modal('hide');
						buildMainTable(true, JSON.stringify(resultsOut));
                    });

        
         
         

		
            });

            map.on('draw:deleted', function(e) {
                drawControl.addTo(map);
            });
     
   
   for (var i=0; i<data.length; i++) {
	var mylat=data[i].latitude;
    var mylong= data[i].longitude;   
															
    marker = new L.marker([mylat,mylong]).addTo(map).bindPopup(mylat);
	//console.log("Before My Marker: " + mylat);
	}
		setTimeout(function(){ map.invalidateSize()}, 400);
	
 }
}
	function drawSelection(layer, type, data){
        var resultsOut=[]; 
        switch(type){
                 
             case 'circle':
                 circles = {};
		
		                drawnItems.eachLayer(function(layer) {
		                    circles[layer.nodeID] = layer.toGeoJSON();
		                    circles[layer.nodeID].properties.radius = Math.round(layer.getRadius()) / 1000;
		                });
		
		               
						var lat_map = (circles[layer.nodeID].geometry.coordinates[1]);
						var long_map = (circles[layer.nodeID].geometry.coordinates[0]);
						var center_latlong = new L.LatLng(lat_map, long_map);
						var rad_map = (circles[layer.nodeID].properties.radius);
						
						
						for (var deviceTocheck in data){
							
							
							var deviceLatLng = new L.LatLng(Number(data[deviceTocheck]["latitude"]), Number(data[deviceTocheck]["longitude"]));
												
							
							if(Math.abs(center_latlong.distanceTo(deviceLatLng)/1000) <= rad_map){
								
								resultsOut.push(data[deviceTocheck]);
							
								}
						}
                        
                 break;
             case 'polygon':
                 
                 var polyPoints = layer._latlngs[0];
					for (var deviceTocheck in data){
						
						//Ray Casting algorithm for checking if a point lies inside of a polygon
						var x = Number(data[deviceTocheck]["latitude"]), y= Number(data[deviceTocheck]["longitude"]);
										
						var inside = false;
		                for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
		                    var xi = polyPoints[i].lat, yi = polyPoints[i].lng;
		                    var xj = polyPoints[j].lat, yj = polyPoints[j].lng;

		                    var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
		                    if (intersect) {
		                    	inside = !inside;
		                    }
		                }
						
						if(inside){
							
							resultsOut.push(data[deviceTocheck]);
						
							}
					}
                 break;
             case 'marker':
                 
                 var markerPoint = layer.getLatLng();
					
					for (var deviceTocheck in data){
						
						var deviceLatLng = new L.LatLng(Number(data[deviceTocheck]["latitude"]), Number(data[deviceTocheck]["longitude"]));
											
						
						if(Math.abs(markerPoint.distanceTo(deviceLatLng)/1000) <= 1){ //1 km 
							
							resultsOut.push(data[deviceTocheck]);
						
							}
					}
                 break;
             case 'polyline':
                   
          		var polyVerts = layer._latlngs;
					
					for (var deviceTocheck in data){
						
						isclose=false;
					
						var deviceLatLng = new L.LatLng(Number(data[deviceTocheck]["latitude"]), Number(data[deviceTocheck]["longitude"]));
						
						for (var vi=0, vl=polyVerts.length; vi<vl; vi++) {
	            	        var d = polyVerts[vi].distanceTo(deviceLatLng);
	            	        if (d/1000 <= 1) {
	            	        	isclose= true;
	            	        	break;
	            	        }
	            	    }
						
						if (isclose){
							resultsOut.push(data[deviceTocheck]);
						}
					}
                 break;
                 
                 
         }
        
        return resultsOut;
    }	

