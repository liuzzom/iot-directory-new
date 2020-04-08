// Author: Antonino Mauro Liuzzo
// This file contains some functions used during Models and Device management
$(document).ready(function () {

    // handle the click on "Add Model" button
    $('#addModelBtn').click(function () {
        checkServicePath($('#inputServicePathModel').val(), 'add', 'model');
        checkProtocol($('#selectProtocolModel').val(), 'add', 'model');
        getServicesByCBName($('#selectContextBroker').val(), 'add');
        checkAddModelConditions();
    });

    // handle the click on "Edit Model" buttons
    $('#modelTable tbody').on('click', 'button.editDashBtn', function () {
        checkServicePath($('#editInputServicePathModel').val(), 'edit', 'model');
        checkProtocol($('#selectProtocolModelM').val(), 'edit', 'model');
        getServicesByCBName($('#selectContextBrokerM').val(), 'edit');
        checkEditModelConditions();
    });

    // handle the click on "Add Device" button
    $('#addDeviceBtn').click(function () {
        checkServicePath($('#inputServicePathDevice').val(), 'add', 'device');
        checkProtocol($('#selectProtocolDeviceM').val(), 'add', 'device');
        checkAddDeviceConditions();
    });

    // TODO: Handle "Edit Device" buttons

    // handle the "ServicePath" input into the "Add model" section
    $('#inputServicePathModel').on('input', function () {
        checkServicePath($('#inputServicePathModel').val(), 'add', 'model');
        checkAddModelConditions();
    });

    // handle the "ServicePath" input into the "Edit model" section
    $('#editInputServicePathModel').on('input', function () {
        checkServicePath($('#editInputServicePathModel').val(), 'edit', 'model');
        checkEditModelConditions();
    });

    // handle the "ServicePath" input into the "Add device" section
    $('#inputServicePathDevice').on('input', function () {
        checkServicePath($('#inputServicePathDevice').val(), 'add', 'device');
        checkAddDeviceConditions();
    });

    // handle the "ServicePath" input into the "Edit device" section
    $('#editInputServicePathDevice').on('input', function () {
        checkServicePath($('#editInputServicePathDevice').val(), 'edit', 'device');
        checkEditDeviceConditions();
    });

    // handle model protocol value change into "Add Model" section
    $('#selectProtocolModel').change(function () {
        checkProtocol($('#selectProtocolModel').val(), 'add', 'model');
        checkAddModelConditions();
    });

    // handle model protocol value change into "Edit Model" section
    $('#selectProtocolModelM').change(function () {
        checkProtocol($('#selectProtocolModelM').val(), 'edit', 'model');
        checkEditModelConditions();
    });

    // handle model protocol value change into "Add Device" section
    $('#selectProtocolDevice').change(function () {
        checkProtocol($('#selectProtocolDevice').val(), 'add', 'device');
        checkAddDeviceConditions();
    });

    // TODO: Handle model protocol change into "Edit Model" section

    // Handle changes in "Add Model" broker select element
    $('#selectContextBroker').change(function(){
        getServicesByCBName($('#selectContextBroker').val(), 'add');
    });

    // Handle changes in "Add Model" broker select element
    $('#selectContextBrokerM').change(function(){
        getServicesByCBName($('#selectContextBrokerM').val(), 'edit');
    });
});

/**
 * 
 * @param value: servicePath value to check 
 * @param mode: add or edit
 * @param context: model or device
 */
function checkServicePath(value, mode, context) {
    value = value.trim();
    var message = null;

    var servicePathModelMsg = null;
    var conditionsArray = null;

    if (mode === 'add') {
        servicePathModelMsg = $('#inputServicePathMsg');

        if (context === 'model') {
            console.log('checkServicePath: add model');
            conditionsArray = addModelConditionsArray;
        } else if (context === 'device') {
            console.log('checkServicePath: add device');
            conditionsArray = addDeviceConditionsArray;
        } else {
            console.log('checkServicePath: (add) error in context value: ' + context);
            return;
        }
    } else if (mode == 'edit') {
        servicePathModelMsg = $('#editInputServicePathMsg');

        if (context === 'model') {
            console.log('checkServicePath: edit model');
            conditionsArray = editModelConditionsArray;
        } else if (context === 'device') {
            console.log('checkServicePath: edit device');
            conditionsArray = editDeviceConditionsArray;
        } else {
            console.log('checkServicePath: (edit) error in context value: ' + context);
            return;
        }
    } else {
        console.log("checkServicePath: error in mode value");
        return;
    }

    var checkValue = servicePathSyntaxCheck(value);
    switch (checkValue) {
        case 0:
        case 1:

            // In this case, following operations are made only for graphical pourpose
            // During model creation, these operations must be done before sending data to server
            var valueToPrint = value;
            console.log(valueToPrint);
            if (valueToPrint[0] !== "/" || valueToPrint === "") valueToPrint = "/" + valueToPrint;
            if (valueToPrint[valueToPrint.length -1] === "/" && valueToPrint.length > 1) valueToPrint = valueToPrint.substr(0, valueToPrint.length -1); 
            message = "servicePath preview: " + valueToPrint;

            if (message.length >= 50) message = message.substring(0, 45) + "...";

            // set the message color and text
            servicePathModelMsg.css("color", "#337ab7");
            servicePathModelMsg.html(message);

            conditionsArray['servicePath'] = true;
            break;
        case 2:
            message = "you can't use more than 10 levels";

            // set the message color and text
            servicePathModelMsg.css("color", "red");
            servicePathModelMsg.html(message);

            conditionsArray['servicePath'] = false;
            break;
        case 3:
            message = "every level must be shorter than 50 characters";

            // set the message color and text
            servicePathModelMsg.css("color", "red");
            servicePathModelMsg.html(message);

            conditionsArray['servicePath'] = false;
            break;
        case 4:
            message = "you can't use empty levels";

            // set the message color and text
            servicePathModelMsg.css("color", "red");
            servicePathModelMsg.html(message);

            conditionsArray['servicePath'] = false;
            break;
        case 5:
            message = "you can't use whitespaces";

            // set the message color and text
            servicePathModelMsg.css("color", "red");
            servicePathModelMsg.html(message);

            conditionsArray['servicePath'] = false;
            break;
        default:
            message = "error in servicePathSyntaxCheck function";

            // set the message color and text
            servicePathModelMsg.css("color", "red");
            servicePathModelMsg.html(message);

            conditionsArray['servicePath'] = false;
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
 *      4 if there are some empty level
 *      5 if some level contains some whitespaces
 *      0 otherwise
 */
function servicePathSyntaxCheck(servicePath) {
    // remove initial and final "/", if any
    if (servicePath[0] === "/") servicePath = servicePath.substr(1);
    if (servicePath[servicePath.length -1] === "/") servicePath = servicePath.substr(0, servicePath.length -1);

    // case: empty string
    if (servicePath === "") return 1;

    // get single servicePath "levels"
    var levels = servicePath.split("/");
    // console.log(levels);

    // case: too many levels
    if (levels.length > 10) return 2;

    for (let i = 0; i < levels.length; i++) {
        // case: some level is too long
        if (levels[i].length > 50) return 3;

        // case: there are some empty level
        if (levels[i] === "") return 4;

        // case: some level contains some whitespaces
        if (/\s/.test(levels[i])) return 5;
    }

    // case: everything is ok
    return 0;
}

/**
 * @description this function enables/disables Service/Tenant select and ServicePath input, based on protocol value
 * @param value: protocol value to check
 * @param mode: add or edit
 * @param context: model or device
 */
function checkProtocol(value, mode, context) {
    // servicePath elements
    var servicePath = null;
    var servicePathMsg = null;
    var servicePathLabel = null;

    // service elements
    var selectService = null;
    var selectServiceMsg = null;
    var selectServiceLabel = null

    if (mode === 'add') {

        if (context === "model"){
            console.log("checkProtocol add model case");
            servicePath = $('#inputServicePathModel');
        } else if (context === "device") {
            console.log("checkProtocol add device case");
            servicePath = $('#inputServicePathDevice');
        } else {
            console.log('checkServicePath: (add) error in context value: ' + context);
            return;
        }

        servicePathMsg = $('#inputServicePathMsg');
        servicePathLabel = $('#inputServicePathLabel');

        selectService = $('#selectService');
        selectServiceMsg = $('#selectServiceMsg');
        selectServiceLabel = $('#selectServiceLabel');
    } else if (mode === 'edit') {
        console.log("checkProtocol edit case");

        if (context === "model"){
            console.log("checkProtocol model case");
            servicePath = $('#editInputServicePathModel');
        } else if (context === "device") {
            console.log("checkProtocol device case");
            servicePath = $('#editInputServicePathDevice');
        } else {
            console.log('checkServicePath: (edit) error in context value: ' + context);
            return;
        }

        servicePathMsg = $('#editInputServicePathMsg');
        servicePathLabel = $('#editInputServicePathLabel');

        selectService = $('#editSelectService');
        selectServiceMsg = $('#editSelectServiceMsg');
        selectServiceLabel = $('#editSelectServiceLabel');
    } else {
        console.log("checkProtocol error case");
        return;
    }

    if (value === "ngsi w/MultiService") {
        // console.log("checkProtocol: equal");
        // enable ServicePath input (and put some graphical sugar for the user)
        servicePath.prop('disabled', false);
        servicePathLabel.css("color", "black");
        checkServicePath(servicePath.val(), mode, context);

        // enable Service/Tenant select (and put some graphical sugar for the user)
        selectService.prop('disabled', false);
        selectServiceLabel.css("color", "black");
        selectServiceMsg.css("color", "#337ab7");
        selectServiceMsg.html("select one Service/Tenant");
    } else {
        // console.log("checkProtocol: not equal");
        // disable ServicePath input (and put some graphical sugar for the user)
        servicePath.val("");
        servicePathLabel.css("color", "lightgrey");
        servicePathMsg.css("color", "lightgrey");
        servicePathMsg.html("only ngsi w/MultiService supports ServicePath");
        servicePath.prop('disabled', true);

        // disable Service/Tenant select (and put some graphical sugar for the user)
        selectService.val("");
        selectServiceLabel.css("color", "lightgrey");
        selectServiceMsg.css("color", "lightgrey");
        selectServiceMsg.html("only ngsi w/MultiService supports Service/Tenant selection");
        selectService.prop('disabled', true);
    }
}

/**
 * 
 * @param name: context broker's name
 * @param mode: add or edit
 */
function getServicesByCBName(name, mode){
    console.log('getServicesByCBName');

    // data to send to server
    var data = {
        action : "get_services_by_cb_name",
        brokerName : name
    };

    // send POST request to server and manage its result
    $.post('../api/contextbroker.php', data).done(function(data){

        var servicesObj = data['content'];
        var services = [];

        for (let i = 0; i < servicesObj.length; i++){
            services.push(servicesObj[i]['name']);
        }
        
        var selectService = null;

        if (mode == 'add'){
            console.log('getServicesByCBName : add case');
            selectService = $('#selectService');
        } else if (mode == 'edit') {
            console.log('getServicesByCBName : edit case');
            selectService = $('#editSelectService');
        } else {
            console.log('getServicesByCBName : ERROR');
            return;
        }

        // remove "old" services
        selectService.find('.extraService').remove();

        // option creations
        for(let i = 0; i < services.length; i++){
            var option = document.createElement('option');
            $(option).attr('class', 'extraService');
            $(option).attr('value', services[i]);
            $(option).html(services[i]);

            selectService.append(option)
        }
        return;
    }).fail(function(){
        alert("Something wrong during getting services");
    });
}