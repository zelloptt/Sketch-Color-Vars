@import "00functions.js"
var sketch = require('sketch')
const Swatch = sketch.Swatch
var doc = sketch.getSelectedDocument()
let swatches = doc.colors

var onRun = function(context) {
  var selectedLayers = context.selection;
  var selectedCount = selectedLayers.count();
  
  if (selectedCount == 0) {
    sketch.UI.message('􀒊 Please select at least one layer.')
  } else {
    for (var i = 0; i < selectedCount; i++) {
      var layer = selectedLayers[i];
      var layer_name = layer.name();
      var value = firstVisibleFill(layer).color();
      
      const swatch = Swatch.from({
        name: layer_name,
        color: value,
      })
      doc.swatches.push(swatch)
      sketch.UI.message(selectedCount + ' color variables created.')
    }
  }
}
