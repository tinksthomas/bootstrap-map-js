define(["esri/map","esri/dijit/Scalebar", "esri/toolbars/navigation" , "dojo/on",
        "dojo/parser",
        "dijit/registry",
        "dijit/Toolbar",
        "dijit/form/Button",
        "dojo/domReady!"],
  function (Map,Scalebar, Navigation, on, parser, registry) {
    "use strict";
    parser.parse();
    var currentTool;
    return {
      setupScalebar: function (map) {
        //TODO: move out of Navigation
        var scalebar = new Scalebar({
          map: map,
          scalebarUnit: "metric"
        });
      },
      setCurrentTool: function (toolname){
        currentTool = toolname;
      },
      getCurrentTool: function (){
        return currentTool;
      },
      myMapClick: function (){
        console.log('clicked on the map');
      },
      setupNavTools: function (map) {
        navToolbar = new Navigation(map);
      
        on(navToolbar, "extent-history-change", extentHistoryChangeHandler);

          registry.byId("zoomin").on("click", function () {
            navToolbar.activate(Navigation.ZOOM_IN);
            currentTool = Navigation.ZOOM_IN;
          });

          registry.byId("zoomout").on("click", function () {
            navToolbar.activate(Navigation.ZOOM_OUT);
            currentTool = Navigation.ZOOM_OUT;
          });

          registry.byId("zoomfullext").on("click", function () {
            navToolbar.zoomToFullExtent();
          });

          registry.byId("zoomprev").on("click", function () {
            navToolbar.zoomToPrevExtent();
          });

          registry.byId("zoomnext").on("click", function () {
            navToolbar.zoomToNextExtent();
          });

          registry.byId("pan").on("click", function () {            
            navToolbar.activate(Navigation.PAN);
          });

          //registry.byId("deactivate").on("click", function () {
          //  navToolbar.deactivate();
          //});      
          function extentHistoryChangeHandler() {
            registry.byId("zoomprev").disabled = navToolbar.isFirstExtent();
            registry.byId("zoomnext").disabled = navToolbar.isLastExtent();           
            navToolbar.activate(Navigation.PAN);
            currentTool = Navigation.PAN;
          };
      }
    }})
          
	