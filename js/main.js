/**
 * Created by jakob on 2018-01-18.
 */

/*eslint-disable */
var projection = d3.geo.equirectangular()
    .translate([512, 256]).scale(163);

d3.json('data/world.json', function (err, data) {

    d3.select("#loading").transition().duration(500)
        .style("opacity", 0).remove();

    var countries = topojson.feature(data, data.objects.countries);

    // Setup the canvas
    var canvas = d3.select("body").append("canvas")
        .attr({width: "1024px", height: "512px"});

    var context = canvas.node().getContext("2d");
    var path = d3.geo.path()
        .projection(projection).context(context);

    // Setup stroke style
    context.strokeStyle = "#990";
    context.lineWidth = 0.25;
    context.fillStyle = "#050";

    // Perform path drawing
    context.beginPath();
    path(countries);

    // Fill countries with white content
    context.fill();

    // Draw lines between countries
    context.stroke();
    // console.log(canvas.node().toDataURL());

    // // Next step in the tutorial

    // Setup Three scene
    var scene = new THREE.Scene();

    // Setup camera
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 6000);
    camera.position.z = 500;

    // Setup THREE renderer
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add light
    var light = new THREE.HemisphereLight('#fff', '#666', 1.5);
    light.position.set(0, 500, 0);
    scene.add(light);

    // Generate material (and color) for base globe
    var waterMaterial = new THREE.MeshBasicMaterial({color: '#003', transparent: true});

    // Setup a geometry
    var sphere = new THREE.SphereGeometry(200, 100, 100);

    // Generate a mesh layer based on materials and geometry
    var baseLayer = new THREE.Mesh(sphere, waterMaterial);

    // Generate a texture
    var mapTexture = new THREE.Texture(canvas.node());
    mapTexture.needsUpdate = true;

    var mapMaterial = new THREE.MeshBasicMaterial({map: mapTexture, transparent: true});
    var mapLayer = new THREE.Mesh(sphere, mapMaterial);

    var root = new THREE.Object3D();
    root.add(baseLayer);
    root.add(mapLayer);
    scene.add(root);

    function render() {
        root.rotation.y += 0.02;
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    render();

});