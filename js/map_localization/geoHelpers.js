/**
 * Created by jakob on 2018-01-21.
 */

var geodecoder = function (features) {

    var store = {};

    for (var i = 0; i < features.length; i++) {
        store[features[i].id] = features[i];
    }

    var pointInPolygon = function(poly, point) {
        var x = point[0];
        var y = point[1];

        var inside = false, xi, xj, yi, yj, xk;

        for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
            xi = poly[i][0];
            yi = poly[i][1];
            xj = poly[j][0];
            yj = poly[j][1];

            xk = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

            if (xk) {
                inside = !inside;
            }
        }

        return inside;
    };

    return {
        find: function(id) {
            return store[id];
        },
        search: function(lat, lng) {

            var match = false;

            var country;
            var coords;

            for (var i = 0; i < features.length; i++) {
                country = features[i];

                if (country.geometry.type === 'Polygon') {
                    match = pointInPolygon(country.geometry.coordinates[0], [lng, lat]);
                    if (match) {
                        return {
                            code: features[i].id,
                            name: features[i].properties.name
                        };
                    }
                }

                else if (country.geometry.type === 'MultiPolygon') {
                    coords = country.geometry.coordinates;
                    for (var j = 0; j < coords.length; j++) {
                        match = pointInPolygon(coords[j][0], [lng, lat]);
                        if (match) {
                            return {
                                code: features[i].id,
                                name: features[i].properties.name
                            };
                        }
                    }

                }
            }

            return null;
        }
    }
};

var getPoint = function(event) {

    var a = this.geometry.vertices[event.face.a];
    var b = this.geometry.vertices[event.face.b];
    var c = this.geometry.vertices[event.face.c];

    var point = {
        x: (a.x + b.x + c.x) / 3,
        y: (a.y + b.y + c.y) / 3,
        z: (a.z + b.z + c.z) / 3
    };

    return point;
};

var getEventCenter = function(event, radius) {
    radius = radius || 200;

    var point = getPoint.call(this, event);
    var latRads = Math.acos(point.y / radius);
    var lngRads = Math.atan2(point.z, point.x);
    var lat = (Math.PI / 2 - latRads) * (180 / Math.PI);
    var lng = (Math.PI - lngRads) * (180 / Math.PI);

    return [lat, lng - 180];
};

