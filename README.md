Forked from [Phil Sinatra's Sketch Color Vars](http://github.com/philsinatra/Sketch-Color-Vars)
[![license](https://img.shields.io/github/license/philsinatra/Sketch-Color-Vars.svg?style=flat-square)]()

# Export Palette

A Sketch plugin that will export the fill color of selected layers to CSS, SCSS, XML, and CSV files.

## Installation

1. Download the plugin.
2. Double click "Export Palette.sketchplugin" to install it.

## How it works

1. Name the layers your preferred variable names.
2. Select the layers containing the colors you want exported.
3. Select the format to which you prefer to export colors.

## Limitations

1. Only solid fills will be exported, not gradients.
2. Only the first solid fill will be exported (in cases where multiple fills are applied to a single shape/element).

## What's next?

- [ ] Add select options dialog for user to spec which file type(s) should be exported.
- [ ] Add an iOS export.
- [ ] Add a modified export wherein SCSS exports maps as opposed to variables.
- [ ] Add a UI through which users can namespace variables without including namespaces in their layers / polluting the layer index.
