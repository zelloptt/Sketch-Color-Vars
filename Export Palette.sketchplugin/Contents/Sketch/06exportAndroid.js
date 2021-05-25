@import "00functions.js"

/** Variables
 ---------------------------------------------------------*/
var app = NSApplication.sharedApplication()
var file_path = '';
var color_array = [];
var str_xml = '<?xml version="1.0" encoding="utf-8"?>' + '\n' + '<resources>'+ '\n';

var onRun = function(context) {
  log('test run again');
  var doc = context.document;
  var selectedLayers = context.selection;
  var selectedCount = selectedLayers.count();
	var fileTypes = NSArray.arrayWithArray([@'xml'])
	var panel = [NSOpenPanel openPanel];
  [panel setCanChooseDirectories:true];
  [panel setCanCreateDirectories:true];
	[panel setAllowedFileTypes:fileTypes];
  panel.setPrompt('Export Color Variables');

  var clicked = [panel runModal];

  if (clicked == NSFileHandlingPanelOKButton) {
    var isDirectory = true;
    var firstURL = [[panel URLs] objectAtIndex:0];
    file_path = [NSString stringWithFormat:@'%@', firstURL];

    if (0 === file_path.indexOf('file://'))
      file_path = file_path.substring(7);
  }

  if (selectedCount == 0) {
    sketch.UI.message('􀒊 Please select at least one layer.')
  } else {
    for (var i = 0; i < selectedCount; i++) {
      var layer = selectedLayers[i];
      var layer_name = layer.name();
      var seed = firstVisibleFill(layer).color();
      var color = String(seed);
      var hex = String(seed.immutableModelObject().hexValue());
      
      color = color.replace('r:', '');
      color = color.replace('g:', '');
      color = color.replace('b:', '');
      color = color.replace('a:', '');
      color = color.replace('(', '');
      color = color.replace(')', '');
      
      color_array = color.split(" ");
      
      var alpha = ((parseFloat(color_array[3]) * 255) | 1 << 8).toString(16).slice(1);
      var alphahex = hex + alpha;

      str_xml += '  <color name="' + layer_name + '">#';
      str_xml += alphahex;
      str_xml += "</color>";
      str_xml += "\n";
    }
  }
  str_xml += "</resources>";

	var output = [
		[str_xml, 'xml'],
	];

	for (z = 0; z < output.length; z++) {
		writeFile(output[z][0], output[z][1]);
	}

	var alertMessage = 'rawColors.xml saved to: ' + file_path;
  alert('Colors Exported!', alertMessage);
};