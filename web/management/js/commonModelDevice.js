// Author: Antonino Mauro Liuzzo
// This file contains some functions used during Models and Device management
$(document).ready(function(){

    // handle the click on "Add Model" button
    $('#addModelBtn').click(function(){
        checkServicePath($('#inputServicePathModel').val(), 'add');
        checkProtocol($('#selectProtocolModel').val(), 'add');
    });

    // handle the click on "Edit Model" buttons
    $('#modelTable tbody').on('click', 'button.editDashBtn', function(){
        checkServicePath($('#editInputServicePathModel').val(), 'edit');
        checkProtocol($('#selectProtocolModelM').val(), 'edit');
    });

    // handle the click on "Add Device" button
    $('#addDeviceBtn').click(function(){
        checkServicePath($('#inputServicePathModel').val(), 'add');
        checkProtocol($('#selectProtocolModel').val(), 'add');
    });

    // TODO: Handle "Edit Device" buttons

    // handle the "ServicePath" input into the "Add model" section
    $('#inputServicePathModel').on('input', function(){
        checkServicePath($('#inputServicePathModel').val(), 'add');
    });

    // handle the "ServicePath" input into the "Edit model" section
    $('#editInputServicePathModel').on('input', function(){
        checkServicePath($('#editInputServicePathModel').val(), 'edit');
    });

    // handle model protocol value change into "Add Model" section
    $('#selectProtocolModel').change(function(){
        checkProtocol($('#selectProtocolModel').val(), 'add');
    });

    // handle model protocol value change into "Edit Model" section
    $('#selectProtocolModelM').change(function(){
        checkProtocol($('#selectProtocolModelM').val(), 'edit');
    });

    // handle model protocol value change into "Add Model" section
    $('#selectProtocolDevice').change(function(){
        checkProtocol($('#selectProtocolDevice').val(), 'add');
    });

    // TODO: Handle model protocol change into "Edit Model" section
    
});

/**
 * 
 * @param value: servicePath value to chieck 
 * @param mode: add or edit
 */
function checkServicePath(value, mode){
    value = value.trim();
    var message = null;

    var servicePathModelMsg = null;

    if (mode === 'add') {
        // console.log('add check');
        servicePathModelMsg = $('#inputServicePathModelMsg');
    } else if (mode == 'edit') {
        // console.log('edit check');
        servicePathModelMsg = $('#editInputServicePathModelMsg');
    } else {
        console.log("checkServicePath: error case");
        return;
    }

    var checkValue = servicePathSyntaxCheck(value);
    switch(checkValue){
        case 0:
        case 1:

            if (value[0] !== "/" || checkValue === 1 && value !== "/") message = "servicePath preview: /" + value;
            else message = "servicePath preview: " + value;

            if(message.length >= 50) message = message.substring(0, 45) + "...";

            servicePathModelMsg.css("color", "#337ab7");
            servicePathModelMsg.html(message);
            break;
        case 2:
            message = "you can't use more than 10 levels";
            servicePathModelMsg.css("color", "red");
            servicePathModelMsg.html(message);
            break;
        case 3:
            message = "every level must be shorter than 50 characters";
            servicePathModelMsg.css("color", "red");
            servicePathModelMsg.html(message);
            break;
        case 4:
            message = "you can't use empty levels";
            servicePathModelMsg.css("color", "red");
            servicePathModelMsg.html(message);
            break;
    }
}

/**
 * 
 * @param {string} servicePath 
 * @returns:
 *      1 if the string is empty
 *      2 if there are more than 10 levels
 *      3 if some level has more than 50 characters
 *      4 there are some empty level
 *      0 otherwise
 */
function servicePathSyntaxCheck(servicePath){
    // replaces "/" with spaces and remove initial whitespace
    servicePath = servicePath.replace(/\//g, " ");
    if (servicePath[0] === " ") servicePath = servicePath.substr(1);

    // case: empty string
    if(servicePath === "") return 1;

    // get single servicePath "levels"
    var levels = servicePath.split(" ");
    console.log(levels)
    
    // case: too many levels
    if (levels.length > 10) return 2;

    for(let i = 0; i < levels.length; i++){
        // case: some level is too long
        if (levels[i].length > 50) return 3;

        // case: there are some empty level
        if (levels[i] === "") return 4;
    }

    // case: everything is ok
    return 0;
}

/**
 * @description this function enables/disables Service/Tenant select and ServicePath input, based on protocol value
 * @param value: protocol value to check
 * @param mode: add or edit
 */
function checkProtocol(value, mode){
    // servicePath elements
    var servicePathModel = null;
    var servicePathModelMsg = null;
    var servicePathModelLabel = null;

    // service elements
    var selectServiceModel = null;
    var selectServiceModelMsg = null;
    var selectServiceModelLabel = null
    
    if (mode === 'add') {
        console.log("checkProtocol add case");

        servicePathModel = $('#inputServicePathModel');
        servicePathModelMsg = $('#inputServicePathModelMsg');
        servicePathModelLabel = $('#inputServicePathModelLabel');

        selectServiceModel = $('#selectServiceModel');
        selectServiceModelMsg = $('#selectServiceModelMsg');
        selectServiceModelLabel = $('#selectServiceModelLabel');
    } else if (mode === 'edit') {
        console.log("checkProtocol edit case");

        servicePathModel = $('#editInputServicePathModel');
        servicePathModelMsg = $('#editInputServicePathModelMsg');
        servicePathModelLabel = $('#editInputServicePathModelLabel');

        selectServiceModel = $('#editSelectServiceModel');
        selectServiceModelMsg = $('#editSelectServiceModelMsg');
        selectServiceModelLabel = $('#editSelectServiceModelLabel');
    } else {
        console.log("checkProtocol error case");
        return;
    }

    if (value === "ngsi w/MultiService") {
        console.log("equal");
        // enable ServicePath input (and put some graphical sugar for the user)
        servicePathModel.prop('disabled', false);
        servicePathModelLabel.css("color", "black");
        checkServicePath(servicePathModel.val(), mode);

        // disable Service/Tenant select (and put some graphical sugar for the user)
        selectServiceModel.prop('disabled', false);
        selectServiceModelLabel.css("color", "black");
        selectServiceModelMsg.css("color", "#337ab7");
        selectServiceModelMsg.html("select one Service/Tenant");
    } else {
        console.log("not equal");
        // disable ServicePath input (and put some graphical sugar for the user)
        servicePathModel.val("");
        servicePathModelLabel.css("color", "lightgrey");
        servicePathModelMsg.css("color", "lightgrey");
        servicePathModelMsg.html("only ngsi w/MultiService supports ServicePath");
        servicePathModel.prop('disabled', true);

        // disable Service/Tenant select (and put some graphical sugar for the user)
        selectServiceModel.val("");
        selectServiceModelLabel.css("color", "lightgrey");
        selectServiceModelMsg.css("color", "lightgrey");
        selectServiceModelMsg.html("only ngsi w/MultiService supports Service/Tenant selection");
        selectServiceModel.prop('disabled', true);
    }
}