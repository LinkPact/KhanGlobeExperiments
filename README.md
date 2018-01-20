# Khan data visualization globe

It is built on two code examples and some D3 parsing:

* [3D-globe with country lines](http://www.delimited.io/blog/2015/5/16/interactive-webgl-globes-with-threejs-and-d3) (threejs)
* [Coloring individual countries on map](http://bl.ocks.org/rveciana/f46df2272b289a9ce4e7) (D3)

# Used data

Four data files are used:

* `world-50m.json` contains country geometry, and country IDs
* `iso_3166.csv` is used to map country IDs to country names
* `world_languages_parsed.csv` is a semi-manually parsed file mapping countries to their official language
* `khan_translation_information.csv` contains KhanAcademy translation rate information

So. The data is mapped in the following way:

* IDs for each country is received from the geometry. These IDs are then mapped to country names.
* Each country name is mapped to its language and that is used to retrieve its translation percentage.

Translation percentage is then visualized using a gradient scale.

