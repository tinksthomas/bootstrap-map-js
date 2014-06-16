define(["esri/map","esri/dijit/Scalebar" , "dojo/domReady!"],
  function (Map,Scalebar) {
    "use strict";
    return {
      setupScalebar: function (map) {
      	var scalebar = new Scalebar({
      		map: map,
            scalebarUnit: "metric"
        });
        }
      }})


          
	