
var cbnamesArray, editCbConditionsArray;

editCbConditionsArray = new Array();

function showEditCbModal()
{
    cbnamesArray = new Array();
    editCbConditionsArray['inputIpCBM'] = false;
    editCbConditionsArray['inputPortCBM'] = false;
    //editCbConditionsArray['selectProtocolCB'] = false;
    editCbConditionsArray['inputLatitudeCBM'] = false;
    editCbConditionsArray['inputLongitudeCBM'] = false;
   // editCbConditionsArray['inputLoginCBM'] = true;
    //editCbConditionsArray['inputPasswordCBM'] = true;

     //$("#editContextBrokerConfirmBtn").attr("disabled", true);
	 
	 
	
	$("#editInfoTabCB #inputIpCBM").on('input', checkEditCbIp);
	$("#editInfoTabCB #inputIpCBM").on('input', checkEditCbConditions);
	
	$("#editInfoTabCB #inputPortCBM").on('input', checkEditCbPort);
	$("#editInfoTabCB #inputPortCBM").on('input', checkEditCbConditions);
	
	
	$("#editGeoPositionTabCB #inputLatitudeCBM").on('input', checkEditCbLatitude);
	$("#editGeoPositionTabCB #inputLatitudeCBM").on('input', checkEditCbConditions);
	
	$("#editGeoPositionTabCB #inputLongitudeCBM").on('input', checkEditCbLongitude);
	$("#editGeoPositionTabCB #inputLongitudeCBM").on('input', checkEditCbConditions);
	
	/* 
	$("#editSecurityTabCB #inputLoginCBM").on('input', checkEditCbLogin);
	$("#editSecurityTabCB #inputLoginCBM").on('input', checkEditCbConditions);
	
	$("#editSecurityTabCB #inputPasswordCBM").on('input', checkEditCbpassword);
	$("#editSecurityTabCB #inputPasswordCBM").on('input', checkEditCbConditions);

 */

	checkEditCbIp();
	checkEditCbPort();
	checkEditCbLatitude();
	checkEditCbLongitude();
	//checkEditCbLogin();
    //checkEditCbpassword();
    
    // Author: Antonino Mauro Liuzzo
    // check CB service values
    checkEditCbServices();

    // Handle first service row
    $("#editServiceTenantTabCB").find('input[name="editInputServiceCB"]').on('input', checkEditCbServices);
    $("#editServiceTenantTabCB").find('input[name="editInputServiceCB"]').on('input', checkEditCbConditions);

    // Handle change protocol
    $('#selectProtocolCBM').on('change', checkEditCbServices);
    $('#selectProtocolCBM').on('change', checkEditCbConditions);

    // Handle the additional rows
    $("#editServiceTenantTabCB").on('input', 'div[name="additionalRow"]', checkEditCbServices);
    $("#editServiceTenantTabCB").on('input', 'div[name="additionalRow"]', checkEditCbConditions);

    // Observe the Multi-Service/Tenant Tab for child element creation/removal
    const targetNode = document.getElementById('editServiceTenantTabCB');
    // Options for the observer (which mutations to observe)
    const config = {childList: true};
    // Callback function to execute when mutations are observed
    const callback = function() {
        checkEditCbServices();
        checkEditCbConditions();
    };
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
}

/* 
function checkEditCbName()
{
    var message = null;
    
    if($("#editInfoTabCB #inputNameCBM").val().length === 0)
    {
        $("#inputNameCBMMsg").css("color", "red");
        message = 'Context Broker name is mandatory';
        editCbConditionsArray['inputNameCBM'] = false;
    }
    else if($("#editInfoTabCB #inputNameCBM").val().length < 5)
    {
        $("#inputNameCBMMsg").css("color", "red");
        message = 'Context Broker (at least 5 chars long)';
        editCbConditionsArray['inputNameCBM'] = false;
    }
    else
    {
		   $("#inputNameCBMMsg").css("color", "#337ab7");
            message = 'Ok';
            editCbConditionsArray['inputNameCBM'] = true;
        
    }
    
    $("#inputNameCBMMsg").html(message);
}

 */


function checkEditCbIp()
{
    var message = null;
    var value = document.getElementById("inputIpCBM").value;
	 
    if(value === '')
    {
        message = 'Ip is mandatory';
        editCbConditionsArray['inputIpCBM'] = false;
        $("#inputIpCBMMsg").css("color", "red");
    }
    else 
    {
        message = 'Ok';
        editCbConditionsArray['inputIpCBM'] = true;
        $("#inputIpCBMMsg").css("color", "#337ab7");
    }
    
    $("#inputIpCBMMsg").html(message);
}

function checkEditCbPort()
{
    var message = null;
    var pattern = /[0-9]{1,5}$/; /*  /^(0|[1-9][0-9]*)$/*/
    var value = document.getElementById("inputPortCBM").value;
	
    if(value === '')
    {
        message = 'Port is mandatory';
        editCbConditionsArray['inputPortCBM'] = false;
        $("#inputPortCBMMsg").css("color", "red");
    }
    else if(!pattern.test(value))
    {
        message = 'Port should be postive number';
        editCbConditionsArray['inputPortCBM'] = false;
        $("#inputPortCBMMsg").css("color", "red");
    }
    else if(pattern.test(value))
    {
        message = 'Ok';
        editCbConditionsArray['inputPortCBM'] = true;
        $("#inputPortCBMMsg").css("color", "#337ab7");
    }
    
    $("#inputPortCBMMsg").html(message);
}


function checkEditCbLatitude()
{
    var message = null;
    //var pattern = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
    var pattern = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
	var value = document.getElementById("inputLatitudeCBM").value;
	
    if(value === '')
    {
        message = 'Latitude is mandatory';
        editCbConditionsArray['inputLatitudeCBM'] = false;
        $("#inputLatitudeCBMMsg").css("color", "red");
    }
    else if(!pattern.test(value))
    {
        message = 'Latitude format is not correct ';
        editCbConditionsArray['inputLatitudeCBM'] = false;
        $("#inputLatitudeCBMMsg").css("color", "red");
    }
    else if(pattern.test(value))
    {
        message = 'Ok';
        editCbConditionsArray['inputLatitudeCBM'] = true;
        $("#inputLatitudeCBMMsg").css("color", "#337ab7");
    }
    
    $("#inputLatitudeCBMMsg").html(message);
}


function checkEditCbLongitude()
{
    var message = null;
   // var reg = new RegExp("^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}");
    var pattern = /^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
	var value = document.getElementById("inputLongitudeCBM").value;
	if(value === '')
    {
        message = 'Longitude is mandatory';
        editCbConditionsArray['inputLongitudeCBM'] = false;
        $("#inputLongitudeCBMMsg").css("color", "red");
    }
    else if(!pattern.test(value))
    {
        message = 'Latitude format is not correct ';
        editCbConditionsArray['inputLongitudeCBM'] = false;
        $("#inputLongitudeCBMMsg").css("color", "red");
    }
    else if(pattern.test(value))
    {
        message = 'Ok';
        editCbConditionsArray['inputLongitudeCBM'] = true;
        $("#inputLongitudeCBMMsg").css("color", "#337ab7");
    }
    
    $("#inputLongitudeCBMMsg").html(message);
}


function checkEditCbLogin()
{
    var message = null;
    var value = document.getElementById("inputLoginCBM").value;
	
    if ((value.length < 6) && (value.length > 0))
      {
        message = 'If you have a login, it should contain at least 5 characters';
        editCbConditionsArray['inputLoginCBM'] = false;
        $("#inputLoginCBMMsg").css("color", "red");
    }
    else if(value === '')
    {
        message = 'Longin is not mandatory but good to have';
        editCbConditionsArray['inputLoginCBM'] = true;
        $("#inputLoginCBMMsg").css("color", "yellow");
    }
    else if(value.length > 5)
    {
        message = 'Ok';
        editCbConditionsArray['inputLoginCBM'] = true;
        $("#inputLoginCBMMsg").css("color", "#337ab7");
    }
    
    $("#inputLoginCBMMsg").html(message);
}


function checkEditCbpassword()
{
    var message = null;
     var value = document.getElementById("inputPasswordCBM").value;
    if ((value.length < 6) && (value.length > 0))
      {
        message = 'If you have a password, it should contain at least 5 characters';
        editCbConditionsArray['inputPasswordCBM'] = false;
        $("#inputPasswordCBMMsg").css("color", "red");
    }
    else if(value === '')
    {
        message = 'Longin is not mandatory but good to have';
        editCbConditionsArray['inputPasswordCBM'] = true;
        $("#inputPasswordCBMMsg").css("color", "yellow");
    }
    else if(value.length > 5)
    {
        message = 'Ok';
        editCbConditionsArray['inputPasswordCBM'] = true;
        $("#inputPasswordCBMMsg").css("color", "#337ab7");
    }
    
    $("#inputPasswordCBMMsg").html(message);

}


function checkEditCbConditions()
{
    var enableButton = true;
    for(var key in editCbConditionsArray) 
    {
        if(editCbConditionsArray[key] === false)
        {
            enableButton = false;
            break;
        }
    }
    console.log("value enabled" +  enableButton);
    if(enableButton)
    {
        $("#editContextBrokerConfirmBtn").attr("disabled", false);
    }
    else
    {
        $("#editContextBrokerConfirmBtn").attr("disabled", true);
    }
}

// Author: Antonino Mauro Liuzzo

function checkEditCbServices(){

    // feedback message to the user
    var message = null;
    // service values
    var values = [];
    // check if the tab is hidden or not
    var isHidden = $('#editMultiServiceTabSelector').hasClass('hidden');

    // insert first row value 
    // the undefined check is done to avoid an error occuring when an update is done
    var firstValue = $('#editServiceCBRow1').find('input[name="editInputServiceCB"]').val();
    if (firstValue !== undefined) values.push(firstValue.trim());
    // get values of all the additional rows
    $('#editServiceTenantTabCB div[name="additionalRow"]').find('input[name="editInputServiceCB"]').each(function(){
        values.push($(this).val().trim());
    });

    // check if the MultiService tab is hidden
    if (isHidden) {
        editCbConditionsArray['inputServicesCBM'] = true;
        return;
    } else {

        if (values.length == 1){
            var serviceRegex = /^([a-z]|_){1,25}$/;
            if (values[0] !== "" && !serviceRegex.test(values[0])) {
                message = `Check your values <br>
                        <ul>
                            <li>white spaces are not allowed</li>
                            <li>use only lower case letters</li>
                            <li>special characters are not allowed (except for "_")</li>
                            <li>service/tenant name must not be longer than 25 characters</li>
                        </ul>`;
                editCbConditionsArray['inputServicesCBM'] = false;
                $("#editInputServiceCBMsg").removeClass("alert alert-info");
                $("#editInputServiceCBMsg").addClass("alert alert-danger");
                $("#editInputServiceCBMsg").html(message);
            } else {
                message = 'Ok';
                editCbConditionsArray['inputServicesCBM'] = true;
                $("#editInputServiceCBMsg").removeClass("alert alert-danger");
                $("#editInputServiceCBMsg").addClass("alert alert-info");
                $("#editInputServiceCBMsg").html(message);
            }
        } else {
            for(const value of values){
                var serviceRegex = /^([a-z]|_){1,25}$/;
                if(!serviceRegex.test(value)){
                    message = `Check your values <br>
                        <ul>
                            <li>white spaces are not allowed</li>
                            <li>use only lower case letters</li>
                            <li>special characters are not allowed (except for "_")</li>
                            <li>service/tenant name must not be longer than 25 characters</li>
                        </ul>`;
                    editCbConditionsArray['inputServicesCBM'] = false;
                    $("#editInputServiceCBMsg").removeClass("alert alert-info");
                    $("#editInputServiceCBMsg").addClass("alert alert-danger");
                    $("#editInputServiceCBMsg").html(message);
                    break;
                }else{
                    message = 'Ok';
                    editCbConditionsArray['inputServicesCBM'] = true;
                    $("#editInputServiceCBMsg").removeClass("alert alert-danger");
                    $("#editInputServiceCBMsg").addClass("alert alert-info");
                    $("#editInputServiceCBMsg").html(message);
                }
            }
        }
    }
}