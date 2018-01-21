/**
 * Created by jakob on 2018-01-21.
 */

var projection = d3.geo.equirectuangular()
    .translate([1024, 512])
    .scale(325);

function mapTexture(geojson, color) {
    var texture;
    var context;
    var canvas;

    canvas = d3.select("body").append("canvas")
        .style("display")
}
