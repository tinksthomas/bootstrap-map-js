define(["esri/map","esri/dijit/Scalebar", "esri/toolbars/navigation" , "dojo/on",
        "dojo/parser",
        "dijit/registry",
        "dijit/Toolbar",
        "dijit/form/Button",
        "dojo/domReady!"],
  function (Map,Scalebar, Navigation, on, parser, registry) {
    "use strict";
    parser.parse();
    return {
      setupScalebar: function (map) {
        var scalebar = new Scalebar({
          map: map,
          scalebarUnit: "metric"
        });
      },
      setupNavTools: function (map) {
        var navToolbar = new Navigation(map);
        on(navToolbar, "extent-history-change", extentHistoryChangeHandler);

          registry.byId("zoomin").on("click", function () {
            navToolbar.activate(Navigation.ZOOM_IN);
          });

          registry.byId("zoomout").on("click", function () {
            navToolbar.activate(Navigation.ZOOM_OUT);
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

          registry.byId("deactivate").on("click", function () {
            navToolbar.deactivate();
          });

          function extentHistoryChangeHandler () {
            registry.byId("zoomprev").disabled = navToolbar.isFirstExtent();
            registry.byId("zoomnext").disabled = navToolbar.isLastExtent();
          }        

      }
    }})
          
	