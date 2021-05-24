@import "00functions.js"

/** Variables
 ---------------------------------------------------------*/
var app = NSApplication.sharedApplication()
var file_path = '';
var color_array = [];
var str_map = '$rawColors: ( \n';

var onRun = function(context) {
  log('test run again');
  var doc = context.document;
  var selectedLayers = context.selection;
  var selectedCount = selectedLayers.count();
	var fileTypes = NSArray.arrayWithArray([@'scss'])
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
    // returns colors
    var set_array = [];
    for (var i = 0; i < selectedCount; i++) {
      var layer = selectedLayers[i];
      var set_name = layer.parentArtboard().name();
      var layer_name = layer.name();
      
      // parses color
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
      var red = Math.round(color_array[0] * 255);
      var green = Math.round(color_array[1] * 255);
      var blue = Math.round(color_array[2] * 255);
      var alpha = parseFloat(color_array[3]).toFixed(2);
      var rgbaValues = red + "," + green + "," + blue + "," + alpha;
      var isrgba = alpha === '1.00';
      if (isrgba) {
        var hexcode = '#' + hex;
      } else {
        var rgba = 'rgba(' + rgbaValues + ')';
      }
      
      // outputs name and value
      
      var colorCode = isrgba ? hexcode : rgba;
      // returns color name in a Set/Color+Modifier/Stop format
      layer_name = set_name + '/' + layer_name.match(/[a-z]+|[^a-z]+/gi).toString().replace(',', '/') + '/' + colorCode;
      // creates array of path-formatted color names
      set_array.push(layer_name);
      // empty object
    }
    
    var artboardNames = filterArray(set_array);
    console.log(transformArray(artboardNames));
   
    
  }
  str_map = JSON.stringify(artboardNames);

	var output = [
		[str_map, 'scss'],
	];

	for (z = 0; z < output.length; z++) {
		writeFile(output[z][0], output[z][1]);
	}

	var alertMessage = 'rawColors.scss saved to: ' + file_path;
  alert('Colors Exported!', alertMessage);
};