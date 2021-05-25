@import "00functions.js"
var sketch = require('sketch')
const Swatch = sketch.Swatch
const Style = sketch.Style
var doc = sketch.getSelectedDocument()
let swatches = doc.colors

var onRun = function(context) {
  var selectedLayers = context.selection;
  var selectedCount = selectedLayers.count();
  
  if (selectedCount == 0) {
    throwSelectError();
  } else {
    for (var i = 0; i < selectedCount; i++) {
      var layer = selectedLayers[i];
      
      
      var index = doc.sharedLayerStyles.findIndex(x => x.name==layer.name()); 
      // here you can check specific property for an object whether it exist in your array or not
      
      if (index === -1) { 
        doc.sharedLayerStyles.push({ name: layer.name(), style: layer.style() });
        sketch.UI.message('Styles created.');
      } else {
        sketch.UI.message('Styles already exist.');
      }
    }
  }
  
}
