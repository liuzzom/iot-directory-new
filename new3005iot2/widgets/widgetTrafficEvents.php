<?php

/* Dashboard Builder.
   Copyright (C) 2017 DISIT Lab https://www.disit.org - University of Florence

   This program is free software; you can redistribute it and/or
   modify it under the terms of the GNU General Public License
   as published by the Free Software Foundation; either version 2
   of the License, or (at your option) any later version.
   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.
   You should have received a copy of the GNU General Public License
   along with this program; if not, write to the Free Software
   Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA. */
   include('../config.php');
   header("Cache-Control: private, max-age=$cacheControlMaxAge");
?>

<script type='text/javascript' charset="utf-8">
    $(document).ready(function <?= $_GET['name'] ?>(firstLoad, metricNameFromDriver, widgetTitleFromDriver, widgetHeaderColorFromDriver, widgetHeaderFontColorFromDriver, fromGisExternalContent, fromGisExternalContentServiceUri, fromGisExternalContentField, fromGisExternalContentRange, /*randomSingleGeoJsonIndex,*/ fromGisMarker, fromGisMapRef)  
    {
        <?php
            $titlePatterns = array();
            $titlePatterns[0] = '/_/';
            $titlePatterns[1] = '/\'/';
            $replacements = array();
            $replacements[0] = ' ';
            $replacements[1] = '&apos;';
            $title = $_GET['title'];
        ?> 
        var timeFontSize, scroller, widgetProperties, styleParameters, icon, serviceUri, 
            eventName, eventType, newRow, newIcon, eventContentW, test, widgetTargetList, backgroundTitleClass, backgroundFieldsClass,
            background, originalHeaderColor, originalBorderColor, eventTitle, temp, day, month, hour, min, sec, eventStart, 
            eventName, serviceUri, eventLat, eventLng, eventTooltip, eventStartDate, eventStartTime, eventSeverityDesc,
            eventsNumber, widgetWidth, shownHeight, rowPercHeight, contentHeightPx, eventContentWPerc, eventSubtype, dataContainer, middleContainer, subTypeContainer, subTypeFontSize,
            dateContainer, timeContainer, dateTimeFontSize, severityContainer, mapPtrContainer, pinContainer, pinMsgContainer, 
            fontSizePin, dateFontSize, mapPinImg, eventNameWithCase, eventSeverity, 
            typeId, subtypeId, lastPopup = null;    
        var eventNames = new Array();
        var fontSize = "<?= $_GET['fontSize'] ?>";
        var speed = 50;
        var hostFile = "<?= $_GET['hostFile'] ?>";
        var widgetName = "<?= $_GET['name'] ?>";
        var divContainer = $("#<?= $_GET['name'] ?>_mainContainer");
        var widgetContentColor = "<?= $_GET['color'] ?>";
        var widgetHeaderColor = "<?= $_GET['frame_color'] ?>";
        var widgetHeaderFontColor = "<?= $_GET['headerFontColor'] ?>";
        var linkElement = $('#<?= $_GET['name'] ?>_link_w');
        var fontSize = "<?= $_GET['fontSize'] ?>";
        var timeToReload = <?= $_GET['freq'] ?>;
        var elToEmpty = $("#<?= $_GET['name'] ?>_rollerContainer");
        var url = "<?= $_GET['link_w'] ?>";
        
        var eventsArray = [];
        var eventsOnMaps = {};
        var allIncidentsOnMap = false;
        var allRoadWorksOnMap = false;
        var allSnowOnTheRoadsOnMap = false;
        var allWeatherDataOnMap = false;
        var allWindOnMap = false;
        
        var severitySortState = 0;
        var timeSortState = 0;
        var typeSortState = 0;
        var headerHeight = 25;
        var embedWidget = <?= $_GET['embedWidget'] ?>;
        var embedWidgetPolicy = '<?= $_GET['embedWidgetPolicy'] ?>';
        var showTitle = "<?= $_GET['showTitle'] ?>";
	var showHeader = null;
        
        if(((embedWidget === true)&&(embedWidgetPolicy === 'auto'))||((embedWidget === true)&&(embedWidgetPolicy === 'manual')&&(showTitle === "no"))||((embedWidget === false)&&(showTitle === "no")&&(hostFile === "index")))
	{
            showHeader = false;
	}
	else
	{
            showHeader = true;
	} 
        
        var targetsArrayForNotify = [];
        
        if(url === "null")
        {
            url = null;
        }
   
        timeFontSize = parseInt(fontSize*1.6);
        dateFontSize = parseInt(fontSize*0.95);
        fontSizePin = parseInt(fontSize*0.95);
        
        $(document).on("esbEventAdded", function(event){
           if(event.generator !== "<?= $_GET['name'] ?>")
           {
              $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").each(function(i){
                 if($("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(i).attr("data-onmap") === "true")
                 {
                    var evtType = null;
                    
                    for(widgetName in widgetTargetList)
                    {
                       evtType = $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(i).attr("data-eventtype");
                       
                       for(var index in widgetTargetList[widgetName])
                       {
                          if(evtType === widgetTargetList[widgetName][index])
                          {
                             $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(i).attr("data-onmap", "false");

                             $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(i).parent().parent().find("div.trafficEventPinMsgContainer").html("");
                             $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(i).removeClass("onMapTrafficEventPinAnimated");
                             $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(i).parent().parent().find("div.trafficEventPinMsgContainer").removeClass("onMapTrafficEventPinAnimated");

                             eventsOnMaps[widgetName].eventsNumber = 0; 
                             eventsOnMaps[widgetName].eventsPoints.splice(0);
                             eventsOnMaps[widgetName].mapRef = null;
                             
                             severitySortState = 0;
                             timeSortState = 0;
                             typeSortState = 0;
                             $("#<?= $_GET['name'] ?>_buttonsContainer div.trafficEventsButtonContainer").eq(0).find("img").attr("src", "../img/trafficIcons/severity.png");
                             $("#<?= $_GET['name'] ?>_buttonsContainer div.trafficEventsButtonContainer").eq(0).find("div.trafficEventsButtonIndicator").html("");
                             $("#<?= $_GET['name'] ?>_buttonsContainer div.trafficEventsButtonContainer").eq(1).find("img").attr("src", "../img/trafficIcons/time.png");
                             $("#<?= $_GET['name'] ?>_buttonsContainer div.trafficEventsButtonContainer").eq(1).find("div.trafficEventsButtonIndicator").html("");
                             $("#<?= $_GET['name'] ?>_buttonsContainer div.trafficEventsButtonContainer").eq(2).find("img").attr("src", "../img/trafficIcons/type.png");
                             $("#<?= $_GET['name'] ?>_buttonsContainer div.trafficEventsButtonContainer").eq(2).find("div.trafficEventsButtonIndicator").html("");
                             
                             $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").css("color", "black");
                             $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").html("");
                             $("#<?= $_GET['name'] ?>_incidentsButton img").attr("src", "../img/trafficIcons/crash.png");
                             allIncidentsOnMap = false;


                             $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").css("color", "black");
                             $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").html("");
                             $("#<?= $_GET['name'] ?>_roadOnWorksButton img").attr("src", "../img/trafficIcons/roadWorks.png");
                             allRoadWorksOnMap = false;

                             $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").css("color", "black");
                             $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").html("");
                             $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton img").attr("src", "../img/trafficIcons/snow.png");
                             allSnowOnTheRoadsOnMap = false;

                             $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").css("color", "black");
                             $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").html("");
                             $("#<?= $_GET['name'] ?>_weatherDataButton img").attr("src", "../img/trafficIcons/weatherData.png");
                             allWeatherDataOnMap = false;

                             $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").css("color", "black");
                             $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").html("");
                             $("#<?= $_GET['name'] ?>_windButton img").attr("src", "../img/trafficIcons/wind.png");
                             allWindOnMap = false;
                          }
                       }
                    }
                 }
              });
           }
        });
        
        //Definizioni di funzione
        function populateWidget(fromSort)
        {
           var i = 0;
           
           $('#<?= $_GET['name'] ?>_rollerContainer').empty();
           
           for(var key in eventsArray)
            {
             temp = eventsArray[key].payload.start_time;
             eventStart = new Date(temp);

             day = eventStart.getDate();
             if(day < 10)
             {
                day = "0" + day.toString();
             }

             month = eventStart.getMonth() + 1;
             if(month < 10)
             {
                month = "0" + month.toString();
             }

             hour = eventStart.getHours();
             if(hour < 10)
             {
                hour = "0" + hour.toString();
             }

             min = eventStart.getMinutes();
             if(min < 10)
             {
                min = "0" + min.toString();
             }

             sec = eventStart.getSeconds();
             if(sec < 10)
             {
                sec = "0" + sec.toString();
             }

             eventStartDate = day + "/" + month + "/" + eventStart.getFullYear().toString(); 
             eventStartTime = hour + ":" + min + ":" + sec;
             
             if(eventsArray[key].payload.hasOwnProperty("notes"))
             {
               eventNameWithCase = eventsArray[key].payload.notes.replace(/\./g, "");
               eventNameWithCase = eventsArray[key].payload.notes.replace(/'/g, "&apos;");
               eventNameWithCase = eventsArray[key].payload.notes.replace(/\u0027/g, "&apos;");
               //Queste due istruzioni (anche una sola delle due) fanno troncare il fumetto nella mappa se la stringa contiene solo singoli apostrofi
               //eventNameWithCase = eventsArray[key].payload.notes.replace(/"/g, "&quot;");
               //eventNameWithCase = eventsArray[key].payload.notes.replace(/\u0022/g, "&quot;");
            
               eventName = eventsArray[key].payload.notes.replace(/\./g, "").toLowerCase();
               eventName = eventsArray[key].payload.notes.replace(/'/g, "&apos;").toLowerCase();
               eventName = eventsArray[key].payload.notes.replace(/\u0027/g, "&apos;").toLowerCase();
             }
             else
             {
               eventNameWithCase = "Event with no name";
               eventName = "event with no name";
             }
             
             eventLat = eventsArray[key].payload.coords.latitude;
             eventLng = eventsArray[key].payload.coords.longitude;
             eventSeverity = eventsArray[key].payload.severity;
             typeId = eventsArray[key].payload.type_id;
             subtypeId = eventsArray[key].payload.sub_type_id;

             newRow = $("<div></div>");

             switch(eventSeverity)
             {
                case 0: case 1: case 2: case 3://low
                   backgroundTitleClass = "lowSeverityTitle";
                   backgroundFieldsClass = "lowSeverity";//Giallo
                   background = "#ffcc00"; 
                   eventSeverityDesc = "Low";
                   break;

                case 4: case 5: case 6://med
                   backgroundTitleClass = "medSeverityTitle";
                   backgroundFieldsClass = "medSeverity";//Arancio
                   background = "#ff9900"; 
                   eventSeverityDesc = "Med";
                   break;

                case 7: case 8: case 9: case 10://high
                   backgroundTitleClass = "highSeverityTitle";
                   backgroundFieldsClass = "highSeverity";//Rosso
                   background = "#ff6666";  
                   eventSeverityDesc = "High";
                   break;    
             }

             eventType = typeId.replace("urn:rixf:it.swarco.resolute/typeId/", "");
             eventSubtype = subtypeId.replace("urn:rixf:it.swarco.resolute/subTypeId/", "");
             icon = $('<img src="../img/trafficIcons/' + trafficEventTypes["type" + eventType].icon + '" />');
             eventTooltip = trafficEventTypes["type" + eventType].desc; 

             newRow.css("height", rowPercHeight + "%");
             eventTitle = $('<div class="eventTitle"><p class="eventTitlePar">' + eventName + '</p></div>');
             eventTitle.addClass(backgroundTitleClass);
             eventTitle.css("font-size", fontSize + "px");
             eventTitle.css("height", "30%");
             $('#<?= $_GET['name'] ?>_rollerContainer').append(newRow);

             newRow.append(eventTitle);

             dataContainer = $('<div class="trafficEventDataContainer"></div>');
             newRow.append(dataContainer);

             newIcon = $("<div class='trafficEventIcon centerWithFlex' data-toggle='tooltip' data-placement='top' title='" + eventTooltip + "'></div>");
             newIcon.append(icon); 
             newIcon.addClass(backgroundFieldsClass);
             dataContainer.append(newIcon);

             middleContainer = $("<div class='trafficEventMiddleContainer'></div>");
             subTypeContainer = $("<div class='trafficEventSubTypeContainer'></div>");

             subTypeContainer.html(trafficEventSubTypes["subType" + eventSubtype]);
             subTypeContainer.addClass(backgroundFieldsClass);
             subTypeFontSize = parseInt(fontSize) + 1;
             subTypeContainer.css("font-size", subTypeFontSize + "px");

             middleContainer.append(subTypeContainer);

             dateContainer = $("<div class='trafficEventDateContainer centerWithFlex'></div>"); 
             dateContainer.css("font-size", dateFontSize + "px");
             dateContainer.addClass(backgroundFieldsClass);
             dateContainer.html(eventStartDate);
             middleContainer.append(dateContainer);

             timeContainer = $("<div class='trafficEventTimeContainer centerWithFlex'></div>"); 
             timeContainer.css("font-size", dateFontSize + "px");
             timeContainer.addClass(backgroundFieldsClass);
             timeContainer.html(eventStartTime);
             middleContainer.append(timeContainer);

             dateTimeFontSize = parseInt(fontSize) - 1;
             dateContainer.css("font-size", dateTimeFontSize + "px");
             timeContainer.css("font-size", dateTimeFontSize + "px");

             severityContainer = $("<div class='trafficEventSeverityContainer centerWithFlex'></div>"); 
             severityContainer.css("font-size", dateFontSize + "px");
             severityContainer.addClass(backgroundFieldsClass);
             severityContainer.html(eventSeverity);
             middleContainer.append(severityContainer);

             dataContainer.append(middleContainer);

             mapPtrContainer = $("<div class='trafficEventMapPtr'></div>"); 
             mapPtrContainer.addClass(backgroundFieldsClass);

             pinContainer = $("<div class='trafficEventPinContainer'><a class='trafficEventLink' data-eventstartdate='" + eventStartDate + "' data-eventstarttime='" + eventStartTime + "' data-eventseveritynum='" + eventSeverity + "'  data-eventSeverity='" + eventSeverityDesc + "' data-eventType='" + eventType + "' data-eventsubtype='" + eventSubtype + "' data-eventname='" + eventNameWithCase + 
                                  "' data-eventlat='" + eventLat + "' data-eventlng='" + eventLng + "' data-background='" + background + "' data-onMap='false'><i class='material-icons' style='font-size:32px'>place</i></a></div>");
             mapPtrContainer.append(pinContainer);
             pinMsgContainer = $("<div class='trafficEventPinMsgContainer'></div>");
             pinMsgContainer.css("font-size", fontSizePin + "px");
             mapPtrContainer.append(pinMsgContainer);

             dataContainer.append(mapPtrContainer);

             if(i < (eventsNumber - 1))
             {
                newRow.css("margin-bottom", "4px");
             }
             else
             {
                newRow.css("margin-bottom", "0px");
             }

             $("#<?= $_GET['name'] ?>_rollerContainer").scrollTop(0);

             //Interazione cross-widget
             pinContainer.find("a.trafficEventLink").hover(
                function() 
                {
                   var localEventType = $(this).attr("data-eventType");
                   var localBackground = $(this).attr("data-background");

                   originalHeaderColor = {};
                   originalBorderColor = {};

                   for(var widgetName in widgetTargetList) 
                   {
                        originalHeaderColor[widgetName] = $("#" + widgetName + "_header").css("background-color");
                        originalBorderColor[widgetName] = $("#" + widgetName).css("border-color");

                        for(var key in widgetTargetList[widgetName]) 
                        {
                            if(widgetTargetList[widgetName][key] === localEventType)
                            {
                                if($(this).attr("data-onMap") === 'false')
                                {
                                   $(this).parent().parent().find("div.trafficEventPinMsgContainer").html("show");
                                }
                                else
                                {
                                   $(this).parent().parent().find("div.trafficEventPinMsgContainer").html("hide");
                                }

                                if($(this).attr("data-eventType") === localEventType)
                                {
                                   $(this).parent().parent().find("div.trafficEventPinMsgContainer").removeClass("onMapTrafficEventPinAnimated");
                                   $(this).find("i.material-icons").removeClass("onMapTrafficEventPinAnimated");
                                }

                                $(this).parent().parent().find("div.trafficEventPinMsgContainer").css("color", "white");

                                $("#" + widgetName + "_header").css("background", localBackground);
                                $("#" + widgetName).css("border-color", localBackground);
                            }
                            else
                            {
                                //Caso in cui non ci sono target per l'evento disponibile: per ora ok così, poi raffineremo il comportamento
                            }
                        }
                   }
                }, 
                function() 
                {
                   var localEventType = $(this).attr("data-eventType");
                   for(var widgetName in widgetTargetList) 
                   {
                        for(var key in widgetTargetList[widgetName]) 
                        {
                            if(widgetTargetList[widgetName][key] === localEventType)
                            {
                                if($(this).attr("data-onMap") === 'false')
                                {
                                   $(this).parent().parent().find("div.trafficEventPinMsgContainer").html("");
                                }
                                else
                                {
                                   $(this).parent().parent().find("div.trafficEventPinMsgContainer").html("on map");
                                }

                                if($(this).attr("data-eventType") === localEventType)
                                {
                                   $(this).parent().parent().find("div.trafficEventPinMsgContainer").addClass("onMapTrafficEventPinAnimated");
                                   $(this).find("i.material-icons").removeClass("onMapTrafficEventPinAnimated");
                                }

                                $(this).parent().parent().find("div.trafficEventPinMsgContainer").css("color", "black");

                                $("#" + widgetName + "_header").css("background", originalHeaderColor[widgetName]);
                                $("#" + widgetName).css("border-color", originalBorderColor[widgetName]);
                            }
                        }
                   }
                }
             );

             pinContainer.find("a.trafficEventLink").click(function()
             {  
                var localEventType = $(this).attr("data-eventType");
                var goesOnMap = false;

                if($(this).attr("data-onMap") === 'false')
                {
                   $(this).attr("data-onMap", 'true');
                   goesOnMap = true;
                   $(this).parent().parent().find("div.trafficEventPinMsgContainer").html("on map");
                   $(this).addClass("onMapTrafficEventPinAnimated");
                   $(this).parent().parent().find("div.trafficEventPinMsgContainer").addClass("onMapTrafficEventPinAnimated");
                }
                else
                {
                   $(this).attr("data-onMap", 'false');
                   goesOnMap = false;
                   $(this).parent().parent().find("div.trafficEventPinMsgContainer").html("");
                   $(this).removeClass("onMapTrafficEventPinAnimated");
                   $(this).parent().parent().find("div.trafficEventPinMsgContainer").removeClass("onMapTrafficEventPinAnimated");
                }
                
                 $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").css("color", "black");
                 $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").html("");
                 $("#<?= $_GET['name'] ?>_incidentsButton img").attr("src", "../img/trafficIcons/crash.png");
                 allIncidentsOnMap = false;


                 $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").css("color", "black");
                 $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").html("");
                 $("#<?= $_GET['name'] ?>_roadOnWorksButton img").attr("src", "../img/trafficIcons/roadWorks.png");
                 allRoadWorksOnMap = false;

                 $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").css("color", "black");
                 $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").html("");
                 $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton img").attr("src", "../img/trafficIcons/snow.png");
                 allSnowOnTheRoadsOnMap = false;

                 $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").css("color", "black");
                 $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").html("");
                 $("#<?= $_GET['name'] ?>_weatherDataButton img").attr("src", "../img/trafficIcons/weatherData.png");
                 allWeatherDataOnMap = false;

                 $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").css("color", "black");
                 $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").html("");
                 $("#<?= $_GET['name'] ?>_windButton img").attr("src", "../img/trafficIcons/wind.png");
                 allWindOnMap = false;

                switch(localEventType)
                {   
                   case "1": case "12":
                        if(allIncidentsOnMap === true)
                        {
                            $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").html("");
                            $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").css("color", "black");
                            $("#<?= $_GET['name'] ?>_incidentsButton img").attr("src", "../img/trafficIcons/crash.png");
                            allIncidentsOnMap = false;
                        }
                        break;

                   case "25":
                        if(allRoadWorksOnMap === true)
                        {
                           $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").html("");
                           $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").css("color", "black");
                           $("#<?= $_GET['name'] ?>_roadOnWorksButton img").attr("src", "../img/trafficIcons/roadWorks.png");
                           allRoadWorksOnMap = false;
                        }
                        break;
                        
                    case "30":
                        if(allSnowOnTheRoadsOnMap === true)
                        {
                           $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").html("");
                           $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").css("color", "black");
                           $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton img").attr("src", "../img/trafficIcons/snow.png");
                           allSnowOnTheRoadsOnMap = false;
                        }
                        break;
                        
                     case "32":
                        if(allWeatherDataOnMap === true)
                        {
                           $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").html("");
                           $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").css("color", "black");
                           $("#<?= $_GET['name'] ?>_weatherDataButton img").attr("src", "../img/trafficIcons/weatherData.png");
                           allWeatherDataOnMap = false;
                        }
                        break; 
                        
                     case "33":
                        if(allWindOnMap === true)
                        {
                           $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").html("");
                           $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").css("color", "black");
                           $("#<?= $_GET['name'] ?>_windButton img").attr("src", "../img/trafficIcons/wind.png");
                           allWindOnMap = false;
                        }
                        break;    
                }
                
                targetsArrayForNotify = [];

                for(var widgetName in widgetTargetList) 
                {
                   for(var key in widgetTargetList[widgetName]) 
                   {
                        if(widgetTargetList[widgetName][key] === localEventType)
                        {
                            if(goesOnMap)
                            {
                               targetsArrayForNotify.push(widgetName);
                               addEventToMap($(this), widgetName);
                            }
                            else
                            {
                                removeEventFromMap($(this), widgetName);
                            }
                        }
                   }
                }
                
                //Notifica agli altri widget esb affinché rimuovano lo stato "on map" dai propri eventi
               $.event.trigger({
                   type: "esbEventAdded",
                   generator: "<?= $_GET['name'] ?>",
                   targetsArray: targetsArrayForNotify
               });
                
             });
             i++;

            }//Fine del for 
            
            //Mappa vuota sui target - Commentata il 21/09/2017, la deve caricare da solo il widgetExternalContent solo se il suo link è valorizzato a "map" 
            /*if(fromSort !== true)
            {
               for(var widgetName in widgetTargetList) 
               {
                  if($("#" + widgetName + "_div").attr("data-emptymapshown") === "false")
                  {
                     $("#" + widgetName + "_wrapper").hide();
                     $("#" + widgetName + "_defaultMapDiv").show();
                     loadDefaultMap(widgetName);
                     $("#" + widgetName + "_div").attr("data-emptymapshown", "true");
                  }
               }
            }*/
            
            $('#<?= $_GET['name'] ?>_rollerContainer [data-toggle="tooltip"]').tooltip({
               html: true
            });
        }
        
        function loadDefaultMap(widgetName)
        {
            if($('#' + widgetName + '_defaultMapDiv div.leaflet-map-pane').length > 0)
            {
                //Basta nasconderla, tanto viene distrutta e ricreata ad ogni utilizzo (per ora).
               $('#' + widgetName + '_mapDiv').hide();
               $('#' + widgetName + '_defaultMapDiv').show();
            }
            else
            {
                var mapdiv = widgetName + "_defaultMapDiv";
                var mapRef = L.map(mapdiv).setView([43.769789, 11.255694], 11);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                   attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
                   maxZoom: 18
                }).addTo(mapRef);
                mapRef.attributionControl.setPrefix('');
            }
        }
        
        function removeAllEventsFromMap(eventType)
        {
            for(var widgetName in widgetTargetList) 
            {
               for(var key in widgetTargetList[widgetName]) 
               {
                    if(widgetTargetList[widgetName][key] === eventType)
                    {  
                        //Rimozione di tutti gli eventi dalla mappa
                        var marker = null;
                        for(var widgetName in eventsOnMaps)
                        {
                           if(eventsOnMaps[widgetName].mapRef !== null)
                           {
                              eventsOnMaps[widgetName].mapRef.off();
                              eventsOnMaps[widgetName].mapRef.remove();
                              eventsOnMaps[widgetName].mapRef = null;
                              $("#" + widgetName + "_mapDiv").remove();
                              $("#" + widgetName + "_content").append('<div id="' + widgetName + '_mapDiv" class="mapDiv"></div>');
                              $("#" + widgetName + "_mapDiv").hide();
                              $("#" + widgetName + "_wrapper").hide();
                              $("#" + widgetName + "_defaultMapDiv").show();
                           }

                           for(var index in eventsOnMaps[widgetName].eventsPoints)
                           {
                               eventsOnMaps[widgetName].eventsPoints[index][8] = null;
                           }

                           eventsOnMaps[widgetName].eventsPoints.splice(0);
                           eventsOnMaps[widgetName].eventsNumber = 0;
                           
                        }
                     }
                }
                
                $("#" + widgetName + "_driverWidgetType").val("");
                $("#" + widgetName + "_netAnalysisServiceMapUrl").val("");
                $("#" + widgetName + "_buttonUrl").val("");
                $("#" + widgetName + "_recreativeEventsUrl").val("");
                updateFullscreenPointsList(widgetName, eventsOnMaps[widgetName].eventsPoints);
            }
            
            $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink[data-eventtype=" + eventType + "]").each(function(i){
               $(this).attr("data-onMap", 'false');
               $(this).parent().parent().find("div.trafficEventPinMsgContainer").html("");
               $(this).removeClass("onMapTrafficEventPinAnimated");
               $(this).parent().parent().find("div.trafficEventPinMsgContainer").removeClass("onMapTrafficEventPinAnimated");
            });
         }
        
        function addAllEventsToMap(eventType)
        {
            var minLat, minLng, maxLat, maxLng, mapdiv = null;
            
            targetsArrayForNotify = [];
            
            for(var widgetName in widgetTargetList) 
            {
               for(var key in widgetTargetList[widgetName]) 
               {
                    if(widgetTargetList[widgetName][key] === eventType)
                    {  
                       targetsArrayForNotify.push(widgetName);
                       
                       //Leaflet
                        $("#" + widgetName + "_wrapper").hide();
                        $("#" + widgetName + "_defaultMapDiv").hide();
                        mapdiv = widgetName + "_mapDiv";

                        //Creazione della mappa
                        if(eventsOnMaps[widgetName].mapRef !== null)
                        {
                           eventsOnMaps[widgetName].mapRef.off();
                           eventsOnMaps[widgetName].mapRef.remove();
                        }

                        $("#" + widgetName + "_mapDiv").remove();
                        $("#" + widgetName + "_content").append('<div id="' + widgetName + '_mapDiv" class="mapDiv"></div>');
                        $("#" + widgetName + "_mapDiv").show();
                        
                        eventsOnMaps[widgetName].eventsPoints.splice(0);
                        eventsOnMaps[widgetName].eventsNumber = 0;

                        eventsOnMaps[widgetName].mapRef = L.map(mapdiv).setView([43.769805, 11.256064], 17);

                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                           attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
                           maxZoom: 18
                        }).addTo(eventsOnMaps[widgetName].mapRef);
                        eventsOnMaps[widgetName].mapRef.attributionControl.setPrefix('');
                        
                        $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").each(function(i){
                           $(this).attr("data-onMap", 'false');
                           $(this).parent().parent().find("div.trafficEventPinMsgContainer").html("");
                           $(this).parent().parent().find("div.trafficEventPinMsgContainer").css("color", "black");
                           $(this).removeClass("onMapTrafficEventPinAnimated");
                           $(this).parent().parent().find("div.trafficEventPinMsgContainer").removeClass("onMapTrafficEventPinAnimated");
                        });
                        
                        $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink[data-eventtype=" + eventType + "]").each(function(i){
                           var targetName, markerLocation, marker, popupText, pinIcon, insertIndex = null;
                           var lat = $(this).attr("data-eventlat");
                           var lng = $(this).attr("data-eventlng");
                           var eventType = $(this).attr("data-eventType");
                           var eventSubtype = $(this).attr("data-eventsubtype");
                           var eventName = $(this).attr("data-eventname");
                           var eventSeverity = $(this).attr("data-eventSeverity");
                           var eventseveritynum = $(this).attr("data-eventseveritynum");
                           var eventStartDate = $(this).attr("data-eventstartdate");
                           var eventStartTime = $(this).attr("data-eventstarttime");
                           var coordsAndType = [];
                           coordsAndType.push(lng);//OS vuole le coordinate alla rovescia
                           coordsAndType.push(lat);
                           coordsAndType.push(eventType);
                           coordsAndType.push(eventName);
                           coordsAndType.push(eventSeverity);
                           coordsAndType.push(eventSubtype);
                           coordsAndType.push(eventStartDate);
                           coordsAndType.push(eventStartTime);
                           coordsAndType[9] = eventseveritynum;

                           if(eventsOnMaps[widgetName]["noPointsUrl"] === null) 
                           {
                               targetName = widgetName + "_div";
                               eventsOnMaps[widgetName]["noPointsUrl"] = $("#" + targetName).attr("data-nopointsurl");
                            }

                           eventsOnMaps[widgetName].eventsPoints.push(coordsAndType);
                           eventsOnMaps[widgetName].eventsNumber++;

                           //console.log("Lat: " + lat + " - Lng: " + lng + " - Event type: " + eventType + " - Event name: " + eventName + " - Event severity: " + eventSeverity + " - Event subtype: " + eventSubtype + " - Event start date: " + eventStartDate + " - Event start time: " + eventStartTime);

                           var severityColor, mapPinImg = null;

                            switch(eventSeverity)
                            {
                               case "Low":
                                  mapPinImg = '../img/trafficIcons/' + trafficEventTypes["type" + eventType].mapIconLow;
                                  severityColor = "#ffcc00";
                                  break;

                               case "Med":
                                  mapPinImg = '../img/trafficIcons/' + trafficEventTypes["type" + eventType].mapIconMed;
                                  severityColor = "#ff9900";
                                  break;

                               case "High":
                                  mapPinImg = '../img/trafficIcons/' + trafficEventTypes["type" + eventType].mapIconHigh;
                                  severityColor = "#ff6666";
                                  break;   
                            } 

                            pinIcon = new L.DivIcon({
                                className: null,
                                html: '<img src="' + mapPinImg + '" class="leafletPin" />'
                            });

                            markerLocation = new L.LatLng(lat, lng);
                            marker = new L.Marker(markerLocation, {icon: pinIcon});
                            insertIndex = eventsOnMaps[widgetName].eventsNumber - 1;
                            eventsOnMaps[widgetName].eventsPoints[insertIndex][8] = marker;
                            popupText = "<span class='mapPopupTitle'>" + eventName + "</span>" + 
                                        "<span class='mapPopupLine'><i>Start date:</i>" + eventStartDate + " - " + eventStartTime + "</span>" + 
                                        "<span class='mapPopupLine'><i>Event type:</i> " + trafficEventTypes["type" + eventType].desc.toUpperCase() + "</span>" +
                                        "<span class='mapPopupLine'><i>Event subtype:</i> " + trafficEventSubTypes["subType" + eventSubtype].toUpperCase() + "</span>" +
                                        "<span class='mapPopupLine'><i>Event severity:</i> " + eventseveritynum + " - <span style='background-color: " + severityColor + "'>" + eventSeverity.toUpperCase() + "</span></span>";

                            eventsOnMaps[widgetName].mapRef.addLayer(marker);
                            marker.bindPopup(popupText, {offset: [-5, -40], maxWidth : 600});
                            
                           $(this).attr("data-onMap", 'true');
                           $(this).parent().parent().find("div.trafficEventPinMsgContainer").html("on map");
                           $(this).addClass("onMapTrafficEventPinAnimated");
                           $(this).parent().parent().find("div.trafficEventPinMsgContainer").addClass("onMapTrafficEventPinAnimated");
                       });//Fine each
                       
                       updateFullscreenPointsList(widgetName, eventsOnMaps[widgetName].eventsPoints);
                        
                       //Centratura mappa
                       if(eventsOnMaps[widgetName].eventsNumber > 1)
                       {
                           minLat = +90;
                           minLng = +180;
                           maxLat = -90;
                           maxLng = -180;

                           for(var i = 0; i < eventsOnMaps[widgetName].eventsNumber; i++)
                           {
                             if(eventsOnMaps[widgetName].eventsPoints[i][0] < minLng)
                             {
                                minLng = eventsOnMaps[widgetName].eventsPoints[i][0];
                             }

                             if(eventsOnMaps[widgetName].eventsPoints[i][0] > maxLng)
                             {
                                maxLng = eventsOnMaps[widgetName].eventsPoints[i][0];
                             }

                             if(eventsOnMaps[widgetName].eventsPoints[i][1] < minLat)
                             {
                                minLat = eventsOnMaps[widgetName].eventsPoints[i][1];
                             }

                             if(eventsOnMaps[widgetName].eventsPoints[i][1] > maxLat)
                             {
                                maxLat = eventsOnMaps[widgetName].eventsPoints[i][1];
                             }
                           }
                           
                           eventsOnMaps[widgetName].mapRef.fitBounds([
                              [minLat, minLng],
                              [maxLat, maxLng]
                           ]);
                       }
                       else
                       {
                          eventsOnMaps[widgetName].mapRef.panTo(new L.LatLng(eventsOnMaps[widgetName].eventsPoints[0][1], eventsOnMaps[widgetName].eventsPoints[0][0]));
                       }
                    }
               }
            }
            
            //Notifica agli altri widget esb affinché rimuovano lo stato "on map" dai propri eventi
            $.event.trigger({
                type: "esbEventAdded",
                generator: "<?= $_GET['name'] ?>",
                targetsArray: targetsArrayForNotify
            });
        }
        
        function updateFullscreenPointsList(widgetNameLocal, eventsPointsLocal)
        {
            var temp = null;
            $("#" + widgetNameLocal + "_driverWidgetType").val("trafficEvents");
            $('#' + widgetNameLocal + '_modalLinkOpen input.fullscreenEventPoint').remove();
            
            for(var i = 0; i < eventsPointsLocal.length; i++)
            { 
              if($('#' + widgetNameLocal + '_fullscreenEvent_' + i).length <= 0)
              {
                temp = $('<input type="hidden" class="fullscreenEventPoint" data-eventType="trafficEvent" id="<?= $_GET['name'] ?>_fullscreenEvent_' + i + '"/>');
                temp.val(eventsPointsLocal[i].join("||"));
                $('#' + widgetNameLocal + '_modalLinkOpen div.modalLinkOpenBody').append(temp);
              }
            }
        }
        
        function addEventToMap(eventLink, widgetName)
        {
           var minLat, minLng, maxLat, maxLng, targetName, mapdiv, markerLocation, marker, popupText, pinIcon = null;
           var lat = eventLink.attr("data-eventlat");
           var lng = eventLink.attr("data-eventlng");
           var eventType = eventLink.attr("data-eventType");
           var eventSubtype = eventLink.attr("data-eventsubtype");
           var eventName = eventLink.attr("data-eventname");
           var eventSeverity = eventLink.attr("data-eventSeverity");
           var eventseveritynum = eventLink.attr("data-eventseveritynum");
           var eventStartDate = eventLink.attr("data-eventstartdate");
           var eventStartTime = eventLink.attr("data-eventstarttime");
           
           var coordsAndType = [];
           coordsAndType.push(lng);//OS vuole le coordinate alla rovescia
           coordsAndType.push(lat);
           coordsAndType.push(eventType);
           coordsAndType.push(eventName);
           coordsAndType.push(eventSeverity);
           coordsAndType.push(eventSubtype);
           coordsAndType.push(eventStartDate);
           coordsAndType.push(eventStartTime);
           coordsAndType[9] = eventseveritynum;
           
           if(eventsOnMaps[widgetName]["noPointsUrl"] === null) 
           {
               targetName = widgetName + "_div";
               eventsOnMaps[widgetName]["noPointsUrl"] = $("#" + targetName).attr("data-nopointsurl");
            }
           
           eventsOnMaps[widgetName].eventsPoints.push(coordsAndType);
           eventsOnMaps[widgetName].eventsNumber++;
           
           updateFullscreenPointsList(widgetName, eventsOnMaps[widgetName].eventsPoints);
           
            //Leaflet
            $("#" + widgetName + "_wrapper").hide();
            $("#" + widgetName + "_defaultMapDiv").hide();
            mapdiv = widgetName + "_mapDiv";
            
            //Creazione della mappa
            if(eventsOnMaps[widgetName].mapRef !== null)
            {
               eventsOnMaps[widgetName].mapRef.off();
               eventsOnMaps[widgetName].mapRef.remove();
            }

            $("#" + widgetName + "_mapDiv").remove();
            $("#" + widgetName + "_content").append('<div id="' + widgetName + '_mapDiv" class="mapDiv"></div>');
            $("#" + widgetName + "_mapDiv").show();

            eventsOnMaps[widgetName].mapRef = L.map(mapdiv).setView([lat, lng], 17);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
               attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
               maxZoom: 18
            }).addTo(eventsOnMaps[widgetName].mapRef);
            eventsOnMaps[widgetName].mapRef.attributionControl.setPrefix('');
            
            minLat = +90;
            minLng = +180;
            maxLat = -90;
            maxLng = -180;
            
            for(var i = 0; i < eventsOnMaps[widgetName].eventsNumber; i++)
            {
               lat = eventsOnMaps[widgetName].eventsPoints[i][1];
               lng = eventsOnMaps[widgetName].eventsPoints[i][0];
               eventType = eventsOnMaps[widgetName].eventsPoints[i][2];
               eventName = eventsOnMaps[widgetName].eventsPoints[i][3];
               eventSeverity = eventsOnMaps[widgetName].eventsPoints[i][4];
               eventSubtype = eventsOnMaps[widgetName].eventsPoints[i][5];
               eventStartDate = eventsOnMaps[widgetName].eventsPoints[i][6];
               eventStartTime = eventsOnMaps[widgetName].eventsPoints[i][7];

               switch(eventSeverity)
               {
                  case "Low":
                     mapPinImg = '../img/trafficIcons/' + trafficEventTypes["type" + eventType].mapIconLow;
                     severityColor = "#ffcc00";
                     break;

                  case "Med":
                     mapPinImg = '../img/trafficIcons/' + trafficEventTypes["type" + eventType].mapIconMed;
                     severityColor = "#ff9900";
                     break;

                  case "High":
                     mapPinImg = '../img/trafficIcons/' + trafficEventTypes["type" + eventType].mapIconHigh;
                     severityColor = "#ff6666";
                     break;   
               } 

               pinIcon = new L.DivIcon({
                   className: null,
                   html: '<img src="' + mapPinImg + '" class="leafletPin" />'
               });

               markerLocation = new L.LatLng(lat, lng);
               marker = new L.Marker(markerLocation, {icon: pinIcon});
               eventsOnMaps[widgetName].eventsPoints[i][8] = marker;
               popupText = "<span class='mapPopupTitle'>" + eventName + "</span>" + 
                           "<span class='mapPopupLine'><i>Start date</i>: " + eventStartDate + " - " + eventStartTime + "</span>" + 
                           "<span class='mapPopupLine'><i>Event type</i>: " + trafficEventTypes["type" + eventType].desc.toUpperCase() + "</span>" +
                           "<span class='mapPopupLine'><i>Event subtype</i>: " + trafficEventSubTypes["subType" + eventSubtype].toUpperCase() + "</span>" +
                           "<span class='mapPopupLine'><i>Event severity</i>: " + eventseveritynum + " - <span style='background-color: " + severityColor + "'>" + eventSeverity.toUpperCase() + "</span></span>";

               eventsOnMaps[widgetName].mapRef.addLayer(marker);
               lastPopup = marker.bindPopup(popupText, {offset: [-5, -40], maxWidth : 600}).openPopup();
               
               //Calcolo del rettangolo di visualizzazione
               if(eventsOnMaps[widgetName].eventsPoints[i][0] < minLng)
               {
                  minLng = eventsOnMaps[widgetName].eventsPoints[i][0];
               }

               if(eventsOnMaps[widgetName].eventsPoints[i][0] > maxLng)
               {
                  maxLng = eventsOnMaps[widgetName].eventsPoints[i][0];
               }

               if(eventsOnMaps[widgetName].eventsPoints[i][1] < minLat)
               {
                  minLat = eventsOnMaps[widgetName].eventsPoints[i][1];
               }

               if(eventsOnMaps[widgetName].eventsPoints[i][1] > maxLat)
               {
                  maxLat = eventsOnMaps[widgetName].eventsPoints[i][1];
               }
            }
            
            if(eventsOnMaps[widgetName].eventsNumber > 1)
            {
               eventsOnMaps[widgetName].mapRef.fitBounds([
                  [minLat, minLng],
                  [maxLat, maxLng]
               ]);
            }
        }
        
        function removeAllEventsFromMaps(fromSort)
        {
           for(var widgetName in eventsOnMaps)
           {
              if(eventsOnMaps[widgetName].mapRef !== null)
              {
                 eventsOnMaps[widgetName].mapRef.off();
                 eventsOnMaps[widgetName].mapRef.remove();
                 eventsOnMaps[widgetName].mapRef = null;
                 $("#" + widgetName + "_mapDiv").remove();
                 $('<div id="' + widgetName + '_mapDiv" class="mapDiv"></div>').insertBefore("#" + widgetName + "_wrapper");
                 if(fromSort)
                 {
                    $("#" + widgetName + "_mapDiv").show();
                 }
                 else
                 {
                    $("#" + widgetName + "_driverWidgetType").val("");
                    $("#" + widgetName + "_netAnalysisServiceMapUrl").val("");
                    $("#" + widgetName + "_buttonUrl").val("");
                    $("#" + widgetName + "_recreativeEventsUrl").val(""); 
                    $("#" + widgetName + "_mapDiv").hide();
                    $("#" + widgetName + "_defaultMapDiv").show();
                    $("#" + widgetName + "_wrapper").hide();
                 }
              }
              
              for(var index in eventsOnMaps[widgetName].eventsPoints)
              {
                  eventsOnMaps[widgetName].eventsPoints[index][8] = null;
              }
               
              eventsOnMaps[widgetName].eventsPoints.splice(0);
              eventsOnMaps[widgetName].eventsNumber = 0;
              
              updateFullscreenPointsList(widgetName, eventsOnMaps[widgetName].eventsPoints);
           }
        }
        
        function removeEventFromMap(eventLink, widgetName)
        {
           var minLat, minLng, maxLat, maxLng, mapdiv, marker, pinIcon, index, eventseveritynum = null;
           var lat = eventLink.attr("data-eventlat");
           var lng = eventLink.attr("data-eventlng");
           var eventType = eventLink.attr("data-eventType");
           var eventName = eventLink.attr("data-eventname");
           var eventSeverity = eventLink.attr("data-eventSeverity");
           
           for(var j = 0; j < eventsOnMaps[widgetName].eventsPoints.length; j++)
           {
              if((eventsOnMaps[widgetName].eventsPoints[j][0] === lng)&&(eventsOnMaps[widgetName].eventsPoints[j][1] === lat)&&(eventsOnMaps[widgetName].eventsPoints[j][2] === eventType)&&(eventsOnMaps[widgetName].eventsPoints[j][3] === eventName))
              {
                 index = j;
                 break;
              }
           }
           
           eventsOnMaps[widgetName].eventsPoints.splice(index, 1);
           eventsOnMaps[widgetName].eventsNumber--;
           
           updateFullscreenPointsList(widgetName, eventsOnMaps[widgetName].eventsPoints);
           
           if(lastPopup !== null)
           {
              lastPopup.closePopup();
           }
           
           //Leaflet
            $("#" + widgetName + "_wrapper").hide();
            $("#" + widgetName + "_defaultMapDiv").hide();
            mapdiv = widgetName + "_mapDiv";
            
            //Creazione della mappa
            if(eventsOnMaps[widgetName].mapRef !== null)
            {
               eventsOnMaps[widgetName].mapRef.off();
               eventsOnMaps[widgetName].mapRef.remove();
            }

            $("#" + widgetName + "_mapDiv").remove();
            $("#" + widgetName + "_content").append('<div id="' + widgetName + '_mapDiv" class="mapDiv"></div>');
            $("#" + widgetName + "_mapDiv").show();

            eventsOnMaps[widgetName].mapRef = L.map(mapdiv).setView([43.769805, 11.256064], 17);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
               attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
               maxZoom: 18
            }).addTo(eventsOnMaps[widgetName].mapRef);
            eventsOnMaps[widgetName].mapRef.attributionControl.setPrefix('');
            
            minLat = +90;
            minLng = +180;
            maxLat = -90;
            maxLng = -180;
            
            for(var i = 0; i < eventsOnMaps[widgetName].eventsNumber; i++)
            {
               lat = eventsOnMaps[widgetName].eventsPoints[i][1];
               lng = eventsOnMaps[widgetName].eventsPoints[i][0];
               eventType = eventsOnMaps[widgetName].eventsPoints[i][2];
               eventName = eventsOnMaps[widgetName].eventsPoints[i][3];
               eventSeverity = eventsOnMaps[widgetName].eventsPoints[i][4];
               eventSubtype = eventsOnMaps[widgetName].eventsPoints[i][5];
               eventStartDate = eventsOnMaps[widgetName].eventsPoints[i][6];
               eventStartTime = eventsOnMaps[widgetName].eventsPoints[i][7];
               eventseveritynum = eventsOnMaps[widgetName].eventsPoints[i][9];

               switch(eventSeverity)
               {
                  case "Low":
                     mapPinImg = '../img/trafficIcons/' + trafficEventTypes["type" + eventType].mapIconLow;
                     severityColor = "#ffcc00";
                     break;

                  case "Med":
                     mapPinImg = '../img/trafficIcons/' + trafficEventTypes["type" + eventType].mapIconMed;
                     severityColor = "#ff9900";
                     break;

                  case "High":
                     mapPinImg = '../img/trafficIcons/' + trafficEventTypes["type" + eventType].mapIconHigh;
                     severityColor = "#ff6666";
                     break;   
               } 

               pinIcon = new L.DivIcon({
                   className: null,
                   html: '<img src="' + mapPinImg + '" class="leafletPin" />'
               });

               markerLocation = new L.LatLng(lat, lng);
               marker = new L.Marker(markerLocation, {icon: pinIcon});
               eventsOnMaps[widgetName].eventsPoints[i][8] = marker;
               popupText = "<span class='mapPopupTitle'>" + eventName + "</span>" + 
                           "<span class='mapPopupLine'><i>Start time:</i> " + eventStartDate + " - " + eventStartTime + "</span>" + 
                           "<span class='mapPopupLine'><i>Event type:</i> " + trafficEventTypes["type" + eventType].desc.toUpperCase() + "</span>" +
                           "<span class='mapPopupLine'><i>Event subtype</i>: " + trafficEventSubTypes["subType" + eventSubtype].toUpperCase() + "</span>" +
                           "<span class='mapPopupLine'><i>Event severity:</i> " + eventseveritynum + " - <span style='background-color: " + severityColor + "'>" + eventSeverity.toUpperCase() + "</span></span>";

               eventsOnMaps[widgetName].mapRef.addLayer(marker);
               lastPopup = marker.bindPopup(popupText, {offset: [-5, -40], maxWidth : 600});
               
               //Calcolo del rettangolo di visualizzazione
               if(eventsOnMaps[widgetName].eventsPoints[i][0] < minLng)
               {
                  minLng = eventsOnMaps[widgetName].eventsPoints[i][0];
               }

               if(eventsOnMaps[widgetName].eventsPoints[i][0] > maxLng)
               {
                  maxLng = eventsOnMaps[widgetName].eventsPoints[i][0];
               }

               if(eventsOnMaps[widgetName].eventsPoints[i][1] < minLat)
               {
                  minLat = eventsOnMaps[widgetName].eventsPoints[i][1];
               }

               if(eventsOnMaps[widgetName].eventsPoints[i][1] > maxLat)
               {
                  maxLat = eventsOnMaps[widgetName].eventsPoints[i][1];
               }
            }
            
            if(eventsOnMaps[widgetName].eventsNumber > 1)
            {
               eventsOnMaps[widgetName].mapRef.fitBounds([
                  [minLat, minLng],
                  [maxLat, maxLng]
               ]);
            }
            else
            {
              if(eventsOnMaps[widgetName].eventsNumber === 1)
              {
                  eventsOnMaps[widgetName].mapRef.setView([eventsOnMaps[widgetName].eventsPoints[0][1], eventsOnMaps[widgetName].eventsPoints[0][0]], 17);
              }
              else
              {
                 $("#" + widgetName + "_wrapper").hide(); 
                 $("#" + widgetName + "_mapDiv").hide();
                 $("#" + widgetName + "_defaultMapDiv").show();
                 $("#" + widgetName + "_driverWidgetType").val("");
                 $("#" + widgetName + "_netAnalysisServiceMapUrl").val("");
                 $("#" + widgetName + "_buttonUrl").val("");
                 $("#" + widgetName + "_recreativeEventsUrl").val("");
              }
            }
        }
        
        //Restituisce il JSON delle soglie se presente, altrimenti NULL
        function getThresholdsJson()
        {
            var thresholdsJson = null;
            if(jQuery.parseJSON(widgetProperties.param.parameters !== null))
            {
                thresholdsJson = widgetProperties.param.parameters; 
            }
            
            return thresholdsJson;
        }
        
        //Restituisce il JSON delle info se presente, altrimenti NULL
        function getInfoJson()
        {
            var infoJson = null;
            if(jQuery.parseJSON(widgetProperties.param.infoJson !== null))
            {
                infoJson = jQuery.parseJSON(widgetProperties.param.infoJson); 
            }
            
            return infoJson;
        }
        
        //Restituisce il JSON delle info se presente, altrimenti NULL
        function getStyleParameters()
        {
            var styleParameters = null;
            if(jQuery.parseJSON(widgetProperties.param.styleParameters !== null))
            {
                styleParameters = jQuery.parseJSON(widgetProperties.param.styleParameters); 
            }
            
            return styleParameters;
        }
        
        function stepDownInterval()
        {
            var oldPos = $("#<?= $_GET['name'] ?>_rollerContainer").scrollTop();
            var newPos = oldPos + 1;
            
            var oldScrollTop = $("#<?= $_GET['name'] ?>_rollerContainer").scrollTop();
            $("#<?= $_GET['name'] ?>_rollerContainer").scrollTop(newPos);
            var newScrollTop = $("#<?= $_GET['name'] ?>_rollerContainer").scrollTop();
            
            if(oldScrollTop === newScrollTop)
            {
               $("#<?= $_GET['name'] ?>_rollerContainer").scrollTop(0);
            }
        }
        //Fine definizioni di funzione 
        
        setWidgetLayout(hostFile, widgetName, widgetContentColor, widgetHeaderColor, widgetHeaderFontColor, showHeader, headerHeight);
        $("#<?= $_GET['name'] ?>_buttonsContainer").css("background-color", $("#<?= $_GET['name'] ?>_header").css("background-color"));
        
        if(firstLoad === false)
        {
            showWidgetContent(widgetName);
        }
        else
        {
            setupLoadingPanel(widgetName, widgetContentColor, firstLoad);
        }
        
        addLink(widgetName, url, linkElement, divContainer);
        $("#<?= $_GET['name'] ?>_titleDiv").html("<?= preg_replace($titlePatterns, $replacements, $title) ?>");
        widgetProperties = getWidgetProperties(widgetName);
        
        if((widgetProperties !== null) && (widgetProperties !== 'undefined'))
        {
            //Inizio eventuale codice ad hoc basato sulle proprietà del widget
            styleParameters = getStyleParameters();//Usato come misura tampone per scegliere fra gli ultimi XX eventi e gli ultimi YY minuti
            manageInfoButtonVisibility(widgetProperties.param.infoMessage_w, $('#<?= $_GET['name'] ?>_header'));
            //Fine eventuale codice ad hoc basato sulle proprietà del widget
            
            widgetTargetList = JSON.parse(widgetProperties.param.parameters);
            var targetName = null;
            
            for(var name in widgetTargetList) 
            {
               targetName = name + "_div";
               eventsOnMaps[name] = {
                  noPointsUrl: null,
                  eventsNumber: 0,
                  eventsPoints: [],//Array indicizzato con le coordinate dei punti mostrati
                  mapRef: null
               };
            }
            
            $.ajax({
               url: "../widgets/esbDao.php",
               type: "POST",
               data: {
                  operation: "getTrafficEvents",
                  choosenOption: styleParameters.choosenOption,
                  time: styleParameters.time,
                  timeUdm: styleParameters.timeUdm,
                  events: styleParameters.events
               },
               async: true,
               dataType: 'json',
               success: function (data) 
               {
                  if(firstLoad !== false)
                  {
                      showWidgetContent(widgetName);
                  }
                  else
                  {
                      elToEmpty.empty();
                  }
                  
                  //console.log("TRAFFIC EVENTS:");
                  //console.log(JSON.stringify(data));
                  
                  $("#<?= $_GET['name'] ?>_noDataAlert").hide();
                  $('#<?= $_GET['name'] ?>_buttonsContainer').show();
                  $("#<?= $_GET['name'] ?>_rollerContainer").show();
                  $("#<?= $_GET['name'] ?>_rollerContainer").height($("#<?= $_GET['name'] ?>_mainContainer").height() - 50); 
                
                  eventsNumber = Object.keys(data).length;
                  widgetWidth = $('#<?= $_GET['name'] ?>_div').width();
                  shownHeight = $("#<?= $_GET['name'] ?>_rollerContainer").prop("offsetHeight");
                  rowPercHeight =  75 * 100 / shownHeight;
                  contentHeightPx = eventsNumber * 100;
                  eventContentWPerc = null;

                  if(contentHeightPx > shownHeight)
                  {
                      eventContentW = parseInt(widgetWidth - 45 - 22);
                  }
                  else
                  {
                      eventContentW = parseInt(widgetWidth - 45 - 5);
                  }
                  
                  eventContentWPerc = Math.floor(eventContentW / widgetWidth * 100);
                  
                  //Inserimento una tantum degli eventi nell'apposito array (per ordinamenti)
                  for(var key in data)
                  {
                    var localPayload = JSON.parse(data[key].payload);
                    data[key].payload = localPayload;
                    eventsArray.push(data[key]); 
                  }
                  
                    /*eventsArray.sort(function(a,b) 
                    {
                        //return b.payload.start_time - a.payload.start_time;
                        var itemA = new Date(a.payload.start_time); 
                        var itemB = new Date(b.payload.start_time);
                        if (itemA < itemB)
                        {
                           return 1;
                        }
                        else
                        {
                           if (itemA > itemB)
                           {
                              return -1;
                           }
                           else
                           {
                              return 0; 
                           }
                        }
                    });*/
                  
                  populateWidget(false);
                  
                  $("#<?= $_GET['name'] ?>_buttonsContainer div.trafficEventsButtonContainer").eq(0).hover(
                        function()
                        {
                            $(this).css("cursor", "pointer");
                            $(this).css("color", "white");
                            $(this).find("img").attr("src", "../img/trafficIcons/severityWhite.png");
                            
                            switch(severitySortState)
                            {
                                case 0://Crescente verso il basso
                                    $(this).find("div.trafficEventsButtonIndicator").html('<i class="fa fa-caret-down" style="font-size: 20px"></i>');
                                    $(this).attr("title", "Sort by severity - Ascending");
                                    break;
                                    
                                case 1://Decrescente verso il basso
                                    $(this).find("div.trafficEventsButtonIndicator").html('<i class="fa fa-caret-up" style="font-size: 20px"></i>');
                                    $(this).attr("title", "Sort by severity - Descending");
                                    break;
                                    
                                case 2://No sort
                                    $(this).find("div.trafficEventsButtonIndicator").html('no sort');
                                    $(this).attr("title", "Sort by severity - None");
                                    break;
                            }
                        }, 
                        function()
                        {
                            $(this).css("cursor", "auto");
                            $(this).css("color", "black");
                            $(this).find("img").attr("src", "../img/trafficIcons/severity.png");
                            
                            switch(severitySortState)
                            {
                                case 0://No sort
                                    $(this).find("div.trafficEventsButtonIndicator").html('');
                                    break;
                                    
                                case 1://Crescente verso il basso
                                    $(this).find("div.trafficEventsButtonIndicator").html('<i class="fa fa-caret-down" style="font-size: 20px"></i>');
                                    break;
                                    
                                case 2://Decrescente verso il basso
                                    $(this).find("div.trafficEventsButtonIndicator").html('<i class="fa fa-caret-up" style="font-size: 20px"></i>');
                                    break;
                            }
                        }
                   );
               
                   $("#<?= $_GET['name'] ?>_buttonsContainer div.trafficEventsButtonContainer").eq(1).hover(
                        function()
                        {
                            $(this).css("cursor", "pointer");
                            $(this).css("color", "white");
                            $(this).find("img").attr("src", "../img/trafficIcons/timeWhite.png");
                            switch(timeSortState)
                            {
                                case 0://Crescente verso il basso
                                    $(this).find("div.trafficEventsButtonIndicator").html('<i class="fa fa-caret-down" style="font-size: 20px"></i>');
                                    $(this).attr("title", "Sort by time - Ascending");
                                    break;
                                    
                                case 1://Decrescente verso il basso
                                    $(this).find("div.trafficEventsButtonIndicator").html('<i class="fa fa-caret-up" style="font-size: 20px"></i>');
                                    $(this).attr("title", "Sort by time - Descending");
                                    break;
                                    
                                case 2://No sort
                                    $(this).find("div.trafficEventsButtonIndicator").html('no sort');
                                    $(this).attr("title", "Sort by time - None");
                                    break;
                            }
                        }, 
                        function()
                        {
                            $(this).css("cursor", "auto");
                            $(this).css("color", "black");
                            $(this).find("img").attr("src", "../img/trafficIcons/time.png");
                            
                            switch(timeSortState)
                            {
                                case 0://No sort
                                    $(this).find("div.trafficEventsButtonIndicator").html('');
                                    break;
                                    
                                case 1://Crescente verso il basso
                                    $(this).find("div.trafficEventsButtonIndicator").html('<i class="fa fa-caret-down" style="font-size: 20px"></i>');
                                    break;
                                    
                                case 2://Decrescente verso il basso
                                    $(this).find("div.trafficEventsButtonIndicator").html('<i class="fa fa-caret-up" style="font-size: 20px"></i>');
                                    break;
                            }
                        }
                   );
               
                   $("#<?= $_GET['name'] ?>_buttonsContainer div.trafficEventsButtonContainer").eq(2).hover(
                        function()
                        {
                            $(this).css("cursor", "pointer");
                            $(this).css("color", "white");
                            $(this).find("img").attr("src", "../img/trafficIcons/typeWhite.png");
                            switch(typeSortState)
                            {
                                case 0://Crescente verso il basso
                                    $(this).find("div.trafficEventsButtonIndicator").html('<i class="fa fa-caret-down" style="font-size: 20px"></i>');
                                    $(this).attr("title", "Sort by type - Ascending");
                                    break;
                                    
                                case 1://Decrescente verso il basso
                                    $(this).find("div.trafficEventsButtonIndicator").html('<i class="fa fa-caret-up" style="font-size: 20px"></i>');
                                    $(this).attr("title", "Sort by type - Descending");
                                    break;
                                    
                                case 2://No sort
                                    $(this).find("div.trafficEventsButtonIndicator").html('no sort');
                                    $(this).attr("title", "Sort by type - None");
                                    break;
                            }
                        }, 
                        function()
                        {
                            $(this).css("cursor", "auto");
                            $(this).css("color", "black");
                            $(this).find("img").attr("src", "../img/trafficIcons/type.png");
                            
                            switch(typeSortState)
                            {
                                case 0://No sort
                                    $(this).find("div.trafficEventsButtonIndicator").html('');
                                    break;
                                    
                                case 1://Crescente verso il basso
                                    $(this).find("div.trafficEventsButtonIndicator").html('<i class="fa fa-caret-down" style="font-size: 20px"></i>');
                                    break;
                                    
                                case 2://Decrescente verso il basso
                                    $(this).find("div.trafficEventsButtonIndicator").html('<i class="fa fa-caret-up" style="font-size: 20px"></i>');
                                    break;
                            }
                        }
                   );
               
                   $("#<?= $_GET['name'] ?>_buttonsContainer div.trafficEventsButtonContainer").eq(0).click(function(){
                        $("#<?= $_GET['name'] ?>_incidentsButton img").attr("src", "../img/trafficIcons/crash.png");
                        $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").css("color", "#000000");
                        $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").html("");
                        $("#<?= $_GET['name'] ?>_roadOnWorksButton img").attr("src", "../img/trafficIcons/roadWorks.png");
                        $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").css("color", "#000000");
                        $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").html("");
                        
                        $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton img").attr("src", "../img/trafficIcons/snow.png");
                        $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").css("color", "#000000");
                        $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").html("");
                        
                        $("#<?= $_GET['name'] ?>_weatherDataButton img").attr("src", "../img/trafficIcons/weatherData.png");
                        $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").css("color", "#000000");
                        $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").html("");
                        
                        $("#<?= $_GET['name'] ?>_windButton img").attr("src", "../img/trafficIcons/wind.png");
                        $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").css("color", "#000000");
                        $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").html("");
                     
                   
                        var localEventType = null;
                        switch(severitySortState)
                        {
                            case 0:
                                eventsArray.sort(function(a,b) {
                                    return a.payload.severity - b.payload.severity;
                                });
                                
                                populateWidget(true);
                                removeAllEventsFromMaps(true);
                                
                                //Aggiunta su mappa dell'elemento in prima posizione post ordinamento
                                localEventType = $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).attr("data-eventType");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).attr("data-onmap", "true");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).parent().parent().find("div.trafficEventPinMsgContainer").html("on map");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).addClass("onMapTrafficEventPinAnimated");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).parent().parent().find("div.trafficEventPinMsgContainer").addClass("onMapTrafficEventPinAnimated");
                                
                                targetsArrayForNotify = [];
                                
                                for(var widgetName in widgetTargetList) 
                                 {
                                    for(var key in widgetTargetList[widgetName]) 
                                    {
                                       if(widgetTargetList[widgetName][key] === localEventType)
                                       {
                                          targetsArrayForNotify.push(widgetName);
                                          $("#" + widgetName + "_wrapper").hide();
                                          $("#" + widgetName + "_mapDiv").show();
                                          addEventToMap($("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0), widgetName);
                                       }
                                    }
                                 }
                                 
                                 //Notifica agli altri widget esb affinché rimuovano lo stato "on map" dai propri eventi
                                 $.event.trigger({
                                     type: "esbEventAdded",
                                     generator: "<?= $_GET['name'] ?>",
                                     targetsArray: targetsArrayForNotify
                                 });
                                
                                severitySortState = 1;
                                $(this).find("div.trafficEventsButtonIndicator").html('<i class="fa fa-caret-down" style="font-size: 20px"></i>');
                                break;

                            case 1:
                                severitySortState = 2;
                                eventsArray.sort(function(a,b) {
                                    return b.payload.severity - a.payload.severity;
                                });
                                
                                populateWidget(true);
                                removeAllEventsFromMaps(true);
                                
                                //Aggiunta su mappa dell'elemento in prima posizione post ordinamento
                                localEventType = $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).attr("data-eventType");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).attr("data-onmap", "true");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).parent().parent().find("div.trafficEventPinMsgContainer").html("on map");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).addClass("onMapTrafficEventPinAnimated");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).parent().parent().find("div.trafficEventPinMsgContainer").addClass("onMapTrafficEventPinAnimated");
                                
                                for(var widgetName in widgetTargetList) 
                                 {
                                    for(var key in widgetTargetList[widgetName]) 
                                    {
                                       if(widgetTargetList[widgetName][key] === localEventType)
                                       {
                                          $("#" + widgetName + "_wrapper").hide();
                                          $("#" + widgetName + "_mapDiv").show();
                                          addEventToMap($("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0), widgetName);
                                       }
                                    }
                                 }
                                
                                $(this).find("div.trafficEventsButtonIndicator").html('<i class="fa fa-caret-up" style="font-size: 20px"></i>');
                                break;

                            case 2:
                                severitySortState = 0;
                                eventsArray.sort(function(a,b) {
                                    return a.id - b.id;
                                });
                                
                                populateWidget(true);
                                removeAllEventsFromMaps(false);
                                
                                $(this).find("div.trafficEventsButtonIndicator").html('');
                                break;
                        }
                        $("#<?= $_GET['name'] ?>_buttonsContainer div.trafficEventsButtonContainer").eq(1).find("div.trafficEventsButtonIndicator").html('');
                        $("#<?= $_GET['name'] ?>_buttonsContainer div.trafficEventsButtonContainer").eq(2).find("div.trafficEventsButtonIndicator").html('');
                        timeSortState = 0;
                        typeSortState = 0;
                   });
                   
                   $("#<?= $_GET['name'] ?>_buttonsContainer div.trafficEventsButtonContainer").eq(1).click(function(){
                        var localEventType = null;
                        
                        $("#<?= $_GET['name'] ?>_incidentsButton img").attr("src", "../img/trafficIcons/crash.png");
                        $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").css("color", "#000000");
                        $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").html("");
                        $("#<?= $_GET['name'] ?>_roadOnWorksButton img").attr("src", "../img/trafficIcons/roadWorks.png");
                        $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").css("color", "#000000");
                        $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").html("");
                        
                        $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton img").attr("src", "../img/trafficIcons/snow.png");
                        $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").css("color", "#000000");
                        $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").html("");
                        
                        $("#<?= $_GET['name'] ?>_weatherDataButton img").attr("src", "../img/trafficIcons/weatherData.png");
                        $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").css("color", "#000000");
                        $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").html("");
                        
                        $("#<?= $_GET['name'] ?>_windButton img").attr("src", "../img/trafficIcons/wind.png");
                        $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").css("color", "#000000");
                        $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").html("");
                        
                        switch(timeSortState)
                        {
                            case 0:
                                eventsArray.sort(function(a,b) 
                                {
                                    var itemA = new Date(a.payload.start_time); 
                                    var itemB = new Date(b.payload.start_time);
                                    if (itemA > itemB)
                                    {
                                       return 1;
                                    }
                                    else
                                    {
                                       if (itemA < itemB)
                                       {
                                          return -1;
                                       }
                                       else
                                       {
                                          return 0; 
                                       }
                                    }
                                });
                                
                                populateWidget(true);
                                removeAllEventsFromMaps(true);
                                
                                //Aggiunta su mappa dell'elemento in prima posizione post ordinamento
                                localEventType = $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).attr("data-eventType");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).attr("data-onmap", "true");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).parent().parent().find("div.trafficEventPinMsgContainer").html("on map");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).addClass("onMapTrafficEventPinAnimated");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).parent().parent().find("div.trafficEventPinMsgContainer").addClass("onMapTrafficEventPinAnimated");
                                
                                targetsArrayForNotify = [];
                                
                                for(var widgetName in widgetTargetList) 
                                 {
                                    for(var key in widgetTargetList[widgetName]) 
                                    {
                                       if(widgetTargetList[widgetName][key] === localEventType)
                                       {
                                          targetsArrayForNotify.push(widgetName);
                                          $("#" + widgetName + "_wrapper").hide();
                                          $("#" + widgetName + "_mapDiv").show();
                                          addEventToMap($("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0), widgetName);
                                       }
                                    }
                                 }
                                 
                                 //Notifica agli altri widget esb affinché rimuovano lo stato "on map" dai propri eventi
                                 $.event.trigger({
                                     type: "esbEventAdded",
                                     generator: "<?= $_GET['name'] ?>",
                                     targetsArray: targetsArrayForNotify
                                 });
                                
                                timeSortState = 1;
                                $(this).find("div.trafficEventsButtonIndicator").html('<i class="fa fa-caret-down" style="font-size: 20px"></i>');
                                break;

                            case 1:
                                eventsArray.sort(function(a,b) 
                                {
                                    //return b.payload.start_time - a.payload.start_time;
                                    var itemA = new Date(a.payload.start_time); 
                                    var itemB = new Date(b.payload.start_time);
                                    if (itemA < itemB)
                                    {
                                       return 1;
                                    }
                                    else
                                    {
                                       if (itemA > itemB)
                                       {
                                          return -1;
                                       }
                                       else
                                       {
                                          return 0; 
                                       }
                                    }
                                });
                                
                                populateWidget(true);
                                removeAllEventsFromMaps(true);
                                
                                //Aggiunta su mappa dell'elemento in prima posizione post ordinamento
                                localEventType = $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).attr("data-eventType");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).attr("data-onmap", "true");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).parent().parent().find("div.trafficEventPinMsgContainer").html("on map");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).addClass("onMapTrafficEventPinAnimated");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).parent().parent().find("div.trafficEventPinMsgContainer").addClass("onMapTrafficEventPinAnimated");
                                
                                for(var widgetName in widgetTargetList) 
                                 {
                                    for(var key in widgetTargetList[widgetName]) 
                                    {
                                       if(widgetTargetList[widgetName][key] === localEventType)
                                       {
                                          $("#" + widgetName + "_wrapper").hide();
                                          $("#" + widgetName + "_mapDiv").show();
                                          addEventToMap($("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0), widgetName);
                                       }
                                    }
                                 }
                                
                                timeSortState = 2;
                                $(this).find("div.trafficEventsButtonIndicator").html('<i class="fa fa-caret-up" style="font-size: 20px"></i>');
                                break;

                            case 2:
                                eventsArray.sort(function(a,b) 
                                {
                                    //return b.payload.start_time - a.payload.start_time;
                                    var itemA = new Date(a.payload.start_time); 
                                    var itemB = new Date(b.payload.start_time);
                                    if (itemA < itemB)
                                    {
                                       return 1;
                                    }
                                    else
                                    {
                                       if (itemA > itemB)
                                       {
                                          return -1;
                                       }
                                       else
                                       {
                                          return 0; 
                                       }
                                    }
                                });
                                
                                populateWidget(true);
                                removeAllEventsFromMaps(false);
                                
                                timeSortState = 0;
                                $(this).find("div.trafficEventsButtonIndicator").html('');
                                break;
                        }
                        $("#<?= $_GET['name'] ?>_buttonsContainer div.trafficEventsButtonContainer").eq(0).find("div.trafficEventsButtonIndicator").html('');
                        $("#<?= $_GET['name'] ?>_buttonsContainer div.trafficEventsButtonContainer").eq(2).find("div.trafficEventsButtonIndicator").html('');
                        severitySortState = 0;
                        typeSortState = 0;
                   });
                   
                   $("#<?= $_GET['name'] ?>_buttonsContainer div.trafficEventsButtonContainer").eq(2).click(function(){
                        var localEventType = null;
                        
                        $("#<?= $_GET['name'] ?>_incidentsButton img").attr("src", "../img/trafficIcons/crash.png");
                        $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").css("color", "#000000");
                        $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").html("");
                        $("#<?= $_GET['name'] ?>_roadOnWorksButton img").attr("src", "../img/trafficIcons/roadWorks.png");
                        $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").css("color", "#000000");
                        $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").html("");
                        
                        $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton img").attr("src", "../img/trafficIcons/snow.png");
                        $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").css("color", "#000000");
                        $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").html("");
                        
                        $("#<?= $_GET['name'] ?>_weatherDataButton img").attr("src", "../img/trafficIcons/weatherData.png");
                        $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").css("color", "#000000");
                        $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").html("");
                        
                        $("#<?= $_GET['name'] ?>_windButton img").attr("src", "../img/trafficIcons/wind.png");
                        $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").css("color", "#000000");
                        $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").html("");
                        
                        switch(typeSortState)
                        {
                            case 0:
                                eventsArray.sort(function(a,b) {
                                    var typeIndexA = a.payload.type_id.replace("urn:rixf:it.swarco.resolute/typeId/", "");
                                    var typeIndexB = b.payload.type_id.replace("urn:rixf:it.swarco.resolute/typeId/", "");
                                    var typeA = trafficEventTypes["type" + typeIndexA].desc.toLowerCase(); 
                                    var typeB = trafficEventTypes["type" + typeIndexB].desc.toLowerCase();
                                    if (typeA > typeB)
                                    {
                                       return 1;
                                    }
                                    else
                                    {
                                       if (typeA < typeB)
                                       {
                                          return -1;
                                       }
                                       else
                                       {
                                          return 0; 
                                       }
                                    }
                                });
                                
                                populateWidget(true);
                                removeAllEventsFromMaps(true);
                                
                                //Aggiunta su mappa dell'elemento in prima posizione post ordinamento
                                localEventType = $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).attr("data-eventType");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).attr("data-onmap", "true");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).parent().parent().find("div.trafficEventPinMsgContainer").html("on map");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).addClass("onMapTrafficEventPinAnimated");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).parent().parent().find("div.trafficEventPinMsgContainer").addClass("onMapTrafficEventPinAnimated");
                                
                                targetsArrayForNotify = [];
                                
                                for(var widgetName in widgetTargetList) 
                                 {
                                    for(var key in widgetTargetList[widgetName]) 
                                    {
                                       if(widgetTargetList[widgetName][key] === localEventType)
                                       {
                                          targetsArrayForNotify.push(widgetName);
                                          $("#" + widgetName + "_wrapper").hide();
                                          $("#" + widgetName + "_mapDiv").show();
                                          addEventToMap($("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0), widgetName);
                                       }
                                    }
                                 }
                                 
                                 //Notifica agli altri widget esb affinché rimuovano lo stato "on map" dai propri eventi
                                 $.event.trigger({
                                     type: "esbEventAdded",
                                     generator: "<?= $_GET['name'] ?>",
                                     targetsArray: targetsArrayForNotify
                                 });
                                
                                typeSortState = 1;
                                $(this).find("div.trafficEventsButtonIndicator").html('<i class="fa fa-caret-down" style="font-size: 20px"></i>');
                                break;

                            case 1:
                                eventsArray.sort(function(a,b) {
                                    var typeIndexA = a.payload.type_id.replace("urn:rixf:it.swarco.resolute/typeId/", "");
                                    var typeIndexB = b.payload.type_id.replace("urn:rixf:it.swarco.resolute/typeId/", "");
                                    var typeA = trafficEventTypes["type" + typeIndexA].desc.toLowerCase(); 
                                    var typeB = trafficEventTypes["type" + typeIndexB].desc.toLowerCase();
                                    if (typeA < typeB)
                                    {
                                       return 1;
                                    }
                                    else
                                    {
                                       if (typeA > typeB)
                                       {
                                          return -1;
                                       }
                                       else
                                       {
                                          return 0; 
                                       }
                                    }
                                });
                                
                                populateWidget(true);
                                removeAllEventsFromMaps(true);
                                
                                //Aggiunta su mappa dell'elemento in prima posizione post ordinamento
                                localEventType = $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).attr("data-eventType");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).attr("data-onmap", "true");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).parent().parent().find("div.trafficEventPinMsgContainer").html("on map");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).addClass("onMapTrafficEventPinAnimated");
                                $("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0).parent().parent().find("div.trafficEventPinMsgContainer").addClass("onMapTrafficEventPinAnimated");
                                
                                for(var widgetName in widgetTargetList) 
                                 {
                                    for(var key in widgetTargetList[widgetName]) 
                                    {
                                       if(widgetTargetList[widgetName][key] === localEventType)
                                       {
                                          $("#" + widgetName + "_wrapper").hide();
                                          $("#" + widgetName + "_mapDiv").show();
                                          addEventToMap($("#<?= $_GET['name'] ?>_rollerContainer a.trafficEventLink").eq(0), widgetName);
                                       }
                                    }
                                 }
                                
                                typeSortState = 2;
                                $(this).find("div.trafficEventsButtonIndicator").html('<i class="fa fa-caret-up" style="font-size: 20px"></i>');
                                break;

                            case 2:
                                eventsArray.sort(function(a,b) {
                                    return a.id - b.id;
                                });
                                
                                populateWidget(true);
                                removeAllEventsFromMaps(false);
                                
                                typeSortState = 0;
                                $(this).find("div.trafficEventsButtonIndicator").html('');
                                break;
                        }
                        $("#<?= $_GET['name'] ?>_buttonsContainer div.trafficEventsButtonContainer").eq(0).find("div.trafficEventsButtonIndicator").html('');
                        $("#<?= $_GET['name'] ?>_buttonsContainer div.trafficEventsButtonContainer").eq(1).find("div.trafficEventsButtonIndicator").html('');
                        severitySortState = 0;
                        timeSortState = 0;
                   });
                  
                  
               //Bottoni per categoria
               $("#<?= $_GET['name'] ?>_incidentsButton").hover(
               function(){
                  $("#<?= $_GET['name'] ?>_incidentsButton img").attr("src", "../img/trafficIcons/crashWhite.png");
                  $("#<?= $_GET['name'] ?>_incidentsButton img").css("cursor", "pointer");
                  
                  originalHeaderColor = {};
                  originalBorderColor = {};

                  for(var widgetName in widgetTargetList) 
                  {
                     originalHeaderColor[widgetName] = $("#" + widgetName + "_header").css("background-color");
                     originalBorderColor[widgetName] = $("#" + widgetName).css("border-color");

                     for(var key in widgetTargetList[widgetName]) 
                     {
                        if((widgetTargetList[widgetName][key] === "1") || (widgetTargetList[widgetName][key] === "12"))
                        {
                           $("#" + widgetName + "_header").css("background", "#ff6666");
                           $("#" + widgetName).css("border-color", "#ff6666");
                        }
                     }
                  }//Fine del for
                  
                  if(allIncidentsOnMap === false)
                  {
                     $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").css("color", "#FFFFFF");
                     $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").html("show");
                  }
                  else
                  {
                     $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").css("color", "#FFFFFF");
                     $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").html("hide");
                  }                  
               },
               function(){
                  $("#<?= $_GET['name'] ?>_incidentsButton img").attr("src", "../img/trafficIcons/crash.png");
                  $("#<?= $_GET['name'] ?>_incidentsButton img").css("cursor", "auto");
                  
                  for(var widgetName in widgetTargetList) 
                  {
                     for(var key in widgetTargetList[widgetName]) 
                     {
                        if((widgetTargetList[widgetName][key] === "1") || (widgetTargetList[widgetName][key] === "12"))
                        {
                           $("#" + widgetName + "_header").css("background", originalHeaderColor[widgetName]);
                           $("#" + widgetName).css("border-color", originalBorderColor[widgetName]);
                        }
                     }
                  }
                  
                  if(allIncidentsOnMap === false)
                  {
                     $("#<?= $_GET['name'] ?>_incidentsButton img").attr("src", "../img/trafficIcons/crash.png");
                     $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").css("color", "#000000");
                     $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").html("");
                  }
                  else
                  {
                     $("#<?= $_GET['name'] ?>_incidentsButton img").attr("src", "../img/trafficIcons/crashWhite.png");
                     $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").css("color", "#FFFFFF");
                     $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").html("on map");
                  }
               });
               
               $("#<?= $_GET['name'] ?>_incidentsButton").click(function(){
                  $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").css("color", "black");
                  $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").html("");
                  $("#<?= $_GET['name'] ?>_roadOnWorksButton img").attr("src", "../img/trafficIcons/roadWorks.png");
                  allRoadWorksOnMap = false;

                  $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").css("color", "black");
                  $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").html("");
                  $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton img").attr("src", "../img/trafficIcons/snow.png");
                  allSnowOnTheRoadsOnMap = false;

                  $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").css("color", "black");
                  $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").html("");
                  $("#<?= $_GET['name'] ?>_weatherDataButton img").attr("src", "../img/trafficIcons/weatherData.png");
                  allWeatherDataOnMap = false;

                  $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").css("color", "black");
                  $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").html("");
                  $("#<?= $_GET['name'] ?>_windButton img").attr("src", "../img/trafficIcons/wind.png");
                  allWindOnMap = false;
                 
                 
                 if(allIncidentsOnMap === false)
                 {
                     addAllEventsToMap("1");
                     allIncidentsOnMap = true;
                 }
                 else
                 {
                     removeAllEventsFromMap("1");
                     allIncidentsOnMap = false;
                 }
               });
               
               $("#<?= $_GET['name'] ?>_roadOnWorksButton").hover(
               function(){
                  $("#<?= $_GET['name'] ?>_roadOnWorksButton img").attr("src", "../img/trafficIcons/roadWorksWhite.png");
                  $("#<?= $_GET['name'] ?>_roadOnWorksButton img").css("cursor", "pointer");
                  
                  originalHeaderColor = {};
                  originalBorderColor = {};

                  for(var widgetName in widgetTargetList) 
                  {
                     originalHeaderColor[widgetName] = $("#" + widgetName + "_header").css("background-color");
                     originalBorderColor[widgetName] = $("#" + widgetName).css("border-color");

                     for(var key in widgetTargetList[widgetName]) 
                     {
                        if(widgetTargetList[widgetName][key] === "25")
                        {
                           $("#" + widgetName + "_header").css("background", "#ff6666");
                           $("#" + widgetName).css("border-color", "#ff6666");
                        }
                     }
                  }//Fine del for
                  
                  if(allRoadWorksOnMap === false)
                  {
                     $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").css("color", "#FFFFFF");
                     $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").html("show");
                  }
                  else
                  {
                     $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").css("color", "#FFFFFF");
                     $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").html("hide");
                  }                  
               },
               function(){
                  $("#<?= $_GET['name'] ?>_roadOnWorksButton img").attr("src", "../img/trafficIcons/roadWorks.png");
                  $("#<?= $_GET['name'] ?>_roadOnWorksButton img").css("cursor", "auto");
                  
                  for(var widgetName in widgetTargetList) 
                  {
                     for(var key in widgetTargetList[widgetName]) 
                     {
                        if(widgetTargetList[widgetName][key] === "25")
                        {
                           $("#" + widgetName + "_header").css("background", originalHeaderColor[widgetName]);
                           $("#" + widgetName).css("border-color", originalBorderColor[widgetName]);
                        }
                     }
                  }
                  
                  if(allRoadWorksOnMap === false)
                  {
                     $("#<?= $_GET['name'] ?>_roadOnWorksButton img").attr("src", "../img/trafficIcons/roadWorks.png");
                     $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").css("color", "#000000");
                     $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").html("");
                  }
                  else
                  {
                     $("#<?= $_GET['name'] ?>_roadOnWorksButton img").attr("src", "../img/trafficIcons/roadWorksWhite.png");
                     $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").css("color", "#FFFFFF");
                     $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").html("on map");
                  }
               });
               
               $("#<?= $_GET['name'] ?>_roadOnWorksButton").click(function(){
                  $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").css("color", "black");
                  $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").html("");
                  $("#<?= $_GET['name'] ?>_incidentsButton img").attr("src", "../img/trafficIcons/crash.png");
                  allIncidentsOnMap = false;

                  $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").css("color", "black");
                  $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").html("");
                  $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton img").attr("src", "../img/trafficIcons/snow.png");
                  allSnowOnTheRoadsOnMap = false;

                  $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").css("color", "black");
                  $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").html("");
                  $("#<?= $_GET['name'] ?>_weatherDataButton img").attr("src", "../img/trafficIcons/weatherData.png");
                  allWeatherDataOnMap = false;

                  $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").css("color", "black");
                  $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").html("");
                  $("#<?= $_GET['name'] ?>_windButton img").attr("src", "../img/trafficIcons/wind.png");
                  allWindOnMap = false;
      
                 if(allRoadWorksOnMap === false)
                 {
                     addAllEventsToMap("25");
                     allRoadWorksOnMap = true;
                 }
                 else
                 {
                     removeAllEventsFromMap("25");
                     allRoadWorksOnMap = false;
                 }
               });
               
               $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton").hover(
               function(){
                  $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton img").attr("src", "../img/trafficIcons/snowWhite.png");
                  $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton img").css("cursor", "pointer");
                  
                  originalHeaderColor = {};
                  originalBorderColor = {};

                  for(var widgetName in widgetTargetList) 
                  {
                     originalHeaderColor[widgetName] = $("#" + widgetName + "_header").css("background-color");
                     originalBorderColor[widgetName] = $("#" + widgetName).css("border-color");

                     for(var key in widgetTargetList[widgetName]) 
                     {
                        if(widgetTargetList[widgetName][key] === "30")
                        {
                           $("#" + widgetName + "_header").css("background", "#ff6666");
                           $("#" + widgetName).css("border-color", "#ff6666");
                        }
                     }
                  }//Fine del for
                  
                  if(allSnowOnTheRoadsOnMap === false)
                  {
                     $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").css("color", "#FFFFFF");
                     $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").html("show");
                  }
                  else
                  {
                     $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").css("color", "#FFFFFF");
                     $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").html("hide");
                  }                  
               },
               function(){
                  $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton img").attr("src", "../img/trafficIcons/snow.png");
                  $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton img").css("cursor", "auto");
                  
                  for(var widgetName in widgetTargetList) 
                  {
                     for(var key in widgetTargetList[widgetName]) 
                     {
                        if(widgetTargetList[widgetName][key] === "30")
                        {
                           $("#" + widgetName + "_header").css("background", originalHeaderColor[widgetName]);
                           $("#" + widgetName).css("border-color", originalBorderColor[widgetName]);
                        }
                     }
                  }
                  
                  if(allSnowOnTheRoadsOnMap === false)
                  {
                     $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton img").attr("src", "../img/trafficIcons/snow.png");
                     $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").css("color", "#000000");
                     $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").html("");
                  }
                  else
                  {
                     $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton img").attr("src", "../img/trafficIcons/snowWhite.png");
                     $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").css("color", "#FFFFFF");
                     $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").html("on map");
                  }
               });
               
               $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton").click(function(){
                 $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").css("color", "black");
                  $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").html("");
                  $("#<?= $_GET['name'] ?>_incidentsButton img").attr("src", "../img/trafficIcons/crash.png");
                  allIncidentsOnMap = false;


                  $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").css("color", "black");
                  $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").html("");
                  $("#<?= $_GET['name'] ?>_roadOnWorksButton img").attr("src", "../img/trafficIcons/roadWorks.png");
                  allRoadWorksOnMap = false;

                  $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").css("color", "black");
                  $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").html("");
                  $("#<?= $_GET['name'] ?>_weatherDataButton img").attr("src", "../img/trafficIcons/weatherData.png");
                  allWeatherDataOnMap = false;

                  $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").css("color", "black");
                  $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").html("");
                  $("#<?= $_GET['name'] ?>_windButton img").attr("src", "../img/trafficIcons/wind.png");
                  allWindOnMap = false;
      
                 if(allSnowOnTheRoadsOnMap === false)
                 {
                     addAllEventsToMap("30");
                     allSnowOnTheRoadsOnMap = true;
                 }
                 else
                 {
                     removeAllEventsFromMap("30");
                     allSnowOnTheRoadsOnMap = false;
                 }
               });
               
               $("#<?= $_GET['name'] ?>_weatherDataButton").hover(
               function(){
                  $("#<?= $_GET['name'] ?>_weatherDataButton img").attr("src", "../img/trafficIcons/weatherDataWhite.png");
                  $("#<?= $_GET['name'] ?>_weatherDataButton img").css("cursor", "pointer");
                  
                  originalHeaderColor = {};
                  originalBorderColor = {};

                  for(var widgetName in widgetTargetList) 
                  {
                     originalHeaderColor[widgetName] = $("#" + widgetName + "_header").css("background-color");
                     originalBorderColor[widgetName] = $("#" + widgetName).css("border-color");

                     for(var key in widgetTargetList[widgetName]) 
                     {
                        if(widgetTargetList[widgetName][key] === "32")
                        {
                           $("#" + widgetName + "_header").css("background", "#ff6666");
                           $("#" + widgetName).css("border-color", "#ff6666");
                        }
                     }
                  }//Fine del for
                  
                  if(allWeatherDataOnMap === false)
                  {
                     $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").css("color", "#FFFFFF");
                     $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").html("show");
                  }
                  else
                  {
                     $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").css("color", "#FFFFFF");
                     $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").html("hide");
                  }                  
               },
               function(){
                  $("#<?= $_GET['name'] ?>_weatherDataButton img").attr("src", "../img/trafficIcons/weatherData.png");
                  $("#<?= $_GET['name'] ?>_weatherDataButton img").css("cursor", "auto");
                  
                  for(var widgetName in widgetTargetList) 
                  {
                     for(var key in widgetTargetList[widgetName]) 
                     {
                        if(widgetTargetList[widgetName][key] === "32")
                        {
                           $("#" + widgetName + "_header").css("background", originalHeaderColor[widgetName]);
                           $("#" + widgetName).css("border-color", originalBorderColor[widgetName]);
                        }
                     }
                  }
                  
                  if(allWeatherDataOnMap === false)
                  {
                     $("#<?= $_GET['name'] ?>_weatherDataButton img").attr("src", "../img/trafficIcons/weatherData.png");
                     $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").css("color", "#000000");
                     $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").html("");
                  }
                  else
                  {
                     $("#<?= $_GET['name'] ?>_weatherDataButton img").attr("src", "../img/trafficIcons/weatherDataWhite.png");
                     $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").css("color", "#FFFFFF");
                     $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").html("on map");
                  }
               });
               
               $("#<?= $_GET['name'] ?>_weatherDataButton").click(function(){
                 $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").css("color", "black");
                  $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").html("");
                  $("#<?= $_GET['name'] ?>_incidentsButton img").attr("src", "../img/trafficIcons/crash.png");
                  allIncidentsOnMap = false;


                  $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").css("color", "black");
                  $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").html("");
                  $("#<?= $_GET['name'] ?>_roadOnWorksButton img").attr("src", "../img/trafficIcons/roadWorks.png");
                  allRoadWorksOnMap = false;

                  $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").css("color", "black");
                  $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").html("");
                  $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton img").attr("src", "../img/trafficIcons/snow.png");
                  allSnowOnTheRoadsOnMap = false;

                  $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").css("color", "black");
                  $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").html("");
                  $("#<?= $_GET['name'] ?>_windButton img").attr("src", "../img/trafficIcons/wind.png");
                  allWindOnMap = false;
      
                 if(allWeatherDataOnMap === false)
                 {
                     addAllEventsToMap("32");
                     allWeatherDataOnMap = true;
                 }
                 else
                 {
                     removeAllEventsFromMap("32");
                     allWeatherDataOnMap = false;
                 }
               });
               
               $("#<?= $_GET['name'] ?>_windButton").hover(
               function(){
                  $("#<?= $_GET['name'] ?>_windButton img").attr("src", "../img/trafficIcons/windWhite.png");
                  $("#<?= $_GET['name'] ?>_windButton img").css("cursor", "pointer");
                  
                  originalHeaderColor = {};
                  originalBorderColor = {};

                  for(var widgetName in widgetTargetList) 
                  {
                     originalHeaderColor[widgetName] = $("#" + widgetName + "_header").css("background-color");
                     originalBorderColor[widgetName] = $("#" + widgetName).css("border-color");

                     for(var key in widgetTargetList[widgetName]) 
                     {
                        if(widgetTargetList[widgetName][key] === "33")
                        {
                           $("#" + widgetName + "_header").css("background", "#ff6666");
                           $("#" + widgetName).css("border-color", "#ff6666");
                        }
                     }
                  }//Fine del for
                  
                  if(allWindOnMap === false)
                  {
                     $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").css("color", "#FFFFFF");
                     $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").html("show");
                  }
                  else
                  {
                     $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").css("color", "#FFFFFF");
                     $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").html("hide");
                  }                  
               },
               function(){
                  $("#<?= $_GET['name'] ?>_windButton img").attr("src", "../img/trafficIcons/wind.png");
                  $("#<?= $_GET['name'] ?>_windButton img").css("cursor", "auto");
                  
                  for(var widgetName in widgetTargetList) 
                  {
                     for(var key in widgetTargetList[widgetName]) 
                     {
                        if(widgetTargetList[widgetName][key] === "32")
                        {
                           $("#" + widgetName + "_header").css("background", originalHeaderColor[widgetName]);
                           $("#" + widgetName).css("border-color", originalBorderColor[widgetName]);
                        }
                     }
                  }
                  
                  if(allWindOnMap === false)
                  {
                     $("#<?= $_GET['name'] ?>_windButton img").attr("src", "../img/trafficIcons/wind.png");
                     $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").css("color", "#000000");
                     $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").html("");
                  }
                  else
                  {
                     $("#<?= $_GET['name'] ?>_windButton img").attr("src", "../img/trafficIcons/windWhite.png");
                     $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").css("color", "#FFFFFF");
                     $("#<?= $_GET['name'] ?>_windButton div.trafficEventsButtonIndicator").html("on map");
                  }
               });
               
               $("#<?= $_GET['name'] ?>_windButton").click(function(){
                  $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").css("color", "black");
                  $("#<?= $_GET['name'] ?>_incidentsButton div.trafficEventsButtonIndicator").html("");
                  $("#<?= $_GET['name'] ?>_incidentsButton img").attr("src", "../img/trafficIcons/crash.png");
                  allIncidentsOnMap = false;


                  $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").css("color", "black");
                  $("#<?= $_GET['name'] ?>_roadOnWorksButton div.trafficEventsButtonIndicator").html("");
                  $("#<?= $_GET['name'] ?>_roadOnWorksButton img").attr("src", "../img/trafficIcons/roadWorks.png");
                  allRoadWorksOnMap = false;

                  $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").css("color", "black");
                  $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton div.trafficEventsButtonIndicator").html("");
                  $("#<?= $_GET['name'] ?>_snowOnTheRoadsButton img").attr("src", "../img/trafficIcons/snow.png");
                  allSnowOnTheRoadsOnMap = false;

                  $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").css("color", "black");
                  $("#<?= $_GET['name'] ?>_weatherDataButton div.trafficEventsButtonIndicator").html("");
                  $("#<?= $_GET['name'] ?>_weatherDataButton img").attr("src", "../img/trafficIcons/weatherData.png");
                  allWeatherDataOnMap = false;
      
                 if(allWindOnMap === false)
                 {
                     addAllEventsToMap("33");
                     allWindOnMap = true;
                 }
                 else
                 {
                     removeAllEventsFromMap("33");
                     allWindOnMap = false;
                 }
               });
               
               scroller = setInterval(stepDownInterval, speed);
               var timeToClearScroll = (timeToReload - 0.5) * 1000;
               
               setTimeout(function()
               {
                   clearInterval(scroller);
                   $("#<?= $_GET['name'] ?>_rollerContainer").off();
                   
                   //$(document).off("esbEventAdded");
                   
                   $("#<?= $_GET['name'] ?>_buttonsContainer div.trafficEventsButtonContainer").eq(0).find("div.trafficEventsButtonIndicator").html("");
                   $("#<?= $_GET['name'] ?>_buttonsContainer div.trafficEventsButtonContainer").eq(1).find("div.trafficEventsButtonIndicator").html("");
                   $("#<?= $_GET['name'] ?>_buttonsContainer div.trafficEventsButtonContainer").eq(2).find("div.trafficEventsButtonIndicator").html("");

                    //Ripristino delle homepage native per gli widget targets al reload
                    for(var widgetName in widgetTargetList) 
                    {
                       if($("#" + widgetName + "_driverWidgetType").val() === 'trafficEvents')
                       {
                           loadDefaultMap(widgetName);
                       }
                       else
                       {
                           //console.log("Attualmente non pilotato da trafficEvents");
                       }
                    }
               }, timeToClearScroll);


               $("#<?= $_GET['name'] ?>_rollerContainer").mouseenter(function() 
               {
                   clearInterval(scroller);
               });

               $("#<?= $_GET['name'] ?>_rollerContainer").mouseleave(function()
               {    
                   clearInterval(scroller);    
                   scroller = setInterval(stepDownInterval, speed);
               });
                  
               },
               error: function (data)
               {
                  console.log("Ko");
                  console.log(JSON.stringify(data));
                  
                  showWidgetContent(widgetName);
                  $('#<?= $_GET['name'] ?>_buttonsContainer').hide();
                  $("#<?= $_GET['name'] ?>_rollerContainer").hide(); 
                  $("#<?= $_GET['name'] ?>_noDataAlert").show();
               }
            });
        }
        else
        {
            console.log("Errore in caricamento proprietà widget");
        }
        
        startCountdown(widgetName, timeToReload, <?= $_GET['name'] ?>, metricNameFromDriver, widgetTitleFromDriver, widgetHeaderColorFromDriver, widgetHeaderFontColorFromDriver, fromGisExternalContent, fromGisExternalContentServiceUri, fromGisExternalContentField, fromGisExternalContentRange, /*randomSingleGeoJsonIndex,*/ fromGisMarker, fromGisMapRef);
    });//Fine document ready
</script>

<div class="widget" id="<?= $_GET['name'] ?>_div">
    <div class='ui-widget-content'>
        <div id='<?= $_GET['name'] ?>_header' class="widgetHeader">
            <div id="<?= $_GET['name'] ?>_infoButtonDiv" class="infoButtonContainer">
               <a id ="info_modal" href="#" class="info_source"><i id="source_<?= $_GET['name'] ?>" class="source_button fa fa-info-circle" style="font-size: 22px"></i></a>
            </div>    
            <div id="<?= $_GET['name'] ?>_titleDiv" class="titleDiv"></div>
            <div id="<?= $_GET['name'] ?>_buttonsDiv" class="buttonsContainer">
                <div class="singleBtnContainer"><a class="icon-cfg-widget" href="#"><span class="glyphicon glyphicon-cog glyphicon-modify-widget" aria-hidden="true"></span></a></div>
                    <div class="singleBtnContainer"><a class="icon-remove-widget" href="#"><span class="glyphicon glyphicon-remove glyphicon-modify-widget" aria-hidden="true"></span></a></div>
            </div>
            <div id="<?= $_GET['name'] ?>_countdownContainerDiv" class="countdownContainer">
                <div id="<?= $_GET['name'] ?>_countdownDiv" class="countdown"></div> 
            </div>   
        </div>
        
        <div id="<?= $_GET['name'] ?>_loading" class="loadingDiv">
            <div class="loadingTextDiv">
                <p>Loading data, please wait</p>
            </div>
            <div class ="loadingIconDiv">
                <i class='fa fa-spinner fa-spin'></i>
            </div>
        </div>
        
        <div id="<?= $_GET['name'] ?>_content" class="content">
            <div id="<?= $_GET['name'] ?>_mainContainer" class="chartContainer">
               <div id="<?= $_GET['name'] ?>_noDataAlert" class="noDataAlert">
                    <div id="<?= $_GET['name'] ?>_noDataAlertText" class="noDataAlertText">
                        No data available
                    </div>
                    <div id="<?= $_GET['name'] ?>_noDataAlertIcon" class="noDataAlertIcon">
                        <i class="fa fa-times"></i>
                    </div>
               </div>  
               <div id="<?= $_GET['name'] ?>_buttonsContainer" class="trafficEventsButtonsContainer">
                   <div class="trafficEventsButtonContainer">
                       <div class="trafficEventsButtonIcon centerWithFlex">
                           <img src="../img/trafficIcons/severity.png" />                                         
                       </div>
                      <div class="trafficEventsButtonIndicator centerWithFlex"></div>                                         
                   </div>
                   <div class="trafficEventsButtonContainer">
                       <div class="trafficEventsButtonIcon centerWithFlex">
                           <img src="../img/trafficIcons/time.png" />
                       </div>
                      <div class="trafficEventsButtonIndicator centerWithFlex"></div>                                           
                   </div>
                   <div class="trafficEventsButtonContainer">
                       <div class="trafficEventsButtonIcon centerWithFlex">
                           <img src="../img/trafficIcons/type.png" />
                       </div>
                      <div class="trafficEventsButtonIndicator centerWithFlex"></div>                                           
                   </div>
                   <div id="<?= $_GET['name'] ?>_incidentsButton" class="trafficEventsButtonContainer">
                       <div class="trafficEventsButtonIcon centerWithFlex">
                           <img src="../img/trafficIcons/crash.png" />
                       </div>
                      <div class="trafficEventsButtonIndicator centerWithFlex"></div>                                           
                   </div>
                   <div id="<?= $_GET['name'] ?>_roadOnWorksButton" class="trafficEventsButtonContainer">
                       <div class="trafficEventsButtonIcon centerWithFlex">
                           <img src="../img/trafficIcons/roadWorks.png" />                                         
                       </div>
                      <div class="trafficEventsButtonIndicator centerWithFlex"></div>                                           
                   </div>
                   <div id="<?= $_GET['name'] ?>_snowOnTheRoadsButton" class="trafficEventsButtonContainer">
                       <div class="trafficEventsButtonIcon centerWithFlex">
                           <img src="../img/trafficIcons/snow.png" />
                       </div>
                      <div class="trafficEventsButtonIndicator centerWithFlex"></div>                                           
                   </div>
                   <div id="<?= $_GET['name'] ?>_weatherDataButton" class="trafficEventsButtonContainer">
                       <div class="trafficEventsButtonIcon centerWithFlex">
                           <img src="../img/trafficIcons/weatherData.png" />
                       </div>
                      <div class="trafficEventsButtonIndicator centerWithFlex"></div>                                           
                   </div>
                   <div id="<?= $_GET['name'] ?>_windButton" class="trafficEventsButtonContainer"> 
                       <div class="trafficEventsButtonIcon centerWithFlex">
                           <img src="../img/trafficIcons/wind.png" />
                       </div>
                      <div class="trafficEventsButtonIndicator centerWithFlex"></div>                                           
                   </div>
               </div>
               <div id="<?= $_GET['name'] ?>_rollerContainer" class="trafficEventsRollerContainer"></div>
            </div>
        </div>
    </div>	
</div> 