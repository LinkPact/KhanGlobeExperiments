/**
 * Created by jakob on 2018-01-21.
 */

var raycaster = new THREE.Raycaster();

function setEvents(camera, items, type, wait) {

    var listener = function(event)  {

        var mouse = {
            x: ((event.clientX - 1) / window.innerWidth) * 2 - 1,
            y: -((event.clientY - 1) / window.innerHeight) * 2 + 1
        };

        var vector = new THREE.Vector3();
        vector.set(mouse.x, mouse.y, 0.5);
        vector.unproject(camera);

        raycaster.ray.set(camera.position, vector.sub(camera.position).normalize());

        var target = raycaster.intersectObjects(items);

        if (target.length) {
            target[0].type = type;
            target[0].object.dispatchEvent(target[0]);
        }
    };

    if (!wait) {
        document.addEventListener(type, listener, false);
    }
    else {
        document.addEventListener(type, debounce(listener, wait), false);
    }
}