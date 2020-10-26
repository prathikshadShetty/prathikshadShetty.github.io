var timer;
var touchduration = 500;

function cutEvent(){
    console.log("cut")
}
function copyEvent(){
    console.log("copy")
}

// drag drop event starts

function _(id) {
    return document.getElementById(id);
}
var droppedIn = false;

window.onload = function () {
    // Drag zone functionality
    var dropZone = _('drop_zone');

    dropZone.addEventListener('dragenter', handleDragEnter, false);
    dropZone.addEventListener('dragleave', handleDragLeave, false);
    dropZone.addEventListener('drop', handleDragDrop, false);

    function handleDragEnter(e) {
        _('app_status').innerHTML = "You are dragging over the " + e
            .target
            .getAttribute('id');
    }

    function handleDragLeave(e) {
        _('app_status').innerHTML = "You left the " + e
            .target
            .getAttribute('id');
    }

    function handleDragDrop(e) {
        e.preventDefault();
        var element_id = e
            .dataTransfer
            .getData("text");
        e
            .target
            .appendChild(_(element_id));
        _(element_id).removeAttribute("draggable")
        _(element_id).style.cursor = "default";
        droppedIn = true;
        _('app_status').innerHTML = "You droped " + element_id + " into drop zone";
    }

    // Draggable element functionality
    var event_1 = _('event');
//     var calendar_2 = _('calendar-day-empty2');
//     var calendar_3 = _('calendar-day-empty3');

    var activeEvent = '';
    var originalX = '';
    var originalY = '';

    event.addEventListener('dragstart', handleDragStart, false);
    event.addEventListener('dragend', handleDragEnd, false);
    event.addEventListener('touchstart', handleTouchStart, false);
    event.addEventListener('touchmove', handleTouchMove, false);
    event.addEventListener('touchend', handleTouchEnd, false);

//     object2.addEventListener('dragstart', handleDragStart, false);
//     object2.addEventListener('dragend', handleDragEnd, false);
//     object2.addEventListener('touchstart', handleTouchStart, false);
//     object2.addEventListener('touchmove', handleTouchMove, false);
//     object2.addEventListener('touchend', handleTouchEnd, false);

//     object3.addEventListener('dragstart', handleDragStart, false);
//     object3.addEventListener('dragend', handleDragEnd, false);
//     object3.addEventListener('touchstart', handleTouchStart, false);
//     object3.addEventListener('touchmove', handleTouchMove, false);
//     object3.addEventListener('touchend', handleTouchEnd, false);

    function handleDragStart(e) {
        _('app_status').innerHTML = "Dragging the element " + e
            .target
            .getAttribute('id');
        e.dataTransfer.dropEffect = "move";
        e
            .dataTransfer
            .setData("text", e.target.getAttribute('id'));
    }

    function handleDragEnd(e) {
        if (droppedIn == false) {
            _('app_status').innerHTML = "You let the " + e
                .target
                .getAttribute('id') + " go.";
        }
        droppedIn = false;
    }

    function handleTouchStart(e) {
        _('app_status').innerHTML = "Touch start with element " + e
            .target
            .getAttribute('id');
        originalX = (e.target.offsetLeft - 10) + "px";
        originalY = (e.target.offsetTop - 10) + "px";
        activeEvent = 'start';
    }

    function handleTouchMove(e) {
        var touchLocation = e.targetTouches[0];
        var pageX = (touchLocation.pageX - 50) + "px";
        var pageY = (touchLocation.pageY - 50) + "px";
        _('app_status').innerHTML = "Touch x " + pageX + " Touch y " + pageY;
        e.target.style.position = "absolute";
        e.target.style.left = pageX;
        e.target.style.top = pageY;
        activeEvent = 'move';
    }

    function handleTouchEnd(e) {
        e.preventDefault();
        if (activeEvent === 'move') {
            var pageX = (parseInt(e.target.style.left) - 50);
            var pageY = (parseInt(e.target.style.top) - 50);

            if (detectTouchEnd(dropZone.offsetLeft, dropZone.offsetTop, pageX, pageY, dropZone.offsetWidth, dropZone.offsetHeight)) {
                dropZone.appendChild(e.target);
                e.target.style.position = "initial";
                droppedIn = true;
                _('app_status').innerHTML = "You droped " + e
                    .target
                    .getAttribute('id') + " into drop zone";
            } else {
                e.target.style.left = originalX;
                e.target.style.top = originalY;
                _('app_status').innerHTML = "You let the " + e
                    .target
                    .getAttribute('id') + " go.";
            }
        }
    }

    function detectTouchEnd(x1, y1, x2, y2, w, h) {
        //Very simple detection here
        if (x2 - x1 > w) 
            return false;
        if (y2 - y1 > h) 
            return false;
        return true;
    }
}
// drag drop event ends

function addEvent(){
    let node = document.createElement("DIV");
    node.className = "event";
    node.innerHTML="yay";
    // node.innerHTML = 
    // "<span class='title'> Sample Item </span> \
    // <br><span class='location'> Sample Location </span>";
  
    // Customized CSS to position each event
    // node.style.width = (containerWidth/units) + "px";
    // node.style.height = height + "px";
    node.style.top = "110px";
    // node.style.left = 100 + left + "px";
  
    document.getElementById("events").appendChild(node);
}
function deleteEvent(){
    console.log("delete")
}
document.addEventListener('touchstart', function(event) {
    // console.log("touch");
  // If there's exactly one finger inside this element
  event.preventDefault ();
  if (event.targetTouches.length == 1) {
    timer = setTimeout(function(){ 
        // console.log("long-press")
        console.log(event);
        if(event.targetTouches[0].target.parentElement.id=="calendar-days"||event.targetTouches[0].target.parentElement.id=="events" ){
            var touch = event.targetTouches[0];
            document.querySelector('.menu').classList.value="menu open";
            var menu = document.getElementById("menu");
            void menu.offsetWidth; 
            menu.style.top = (touch.pageY-50) + 'px';
            menu.style.left = (touch.pageX-50) + 'px';
            
        }
        },touchduration); 
    var touch = event.targetTouches[0];
    if(event.targetTouches[0].target.parentElement.id=="calendar-days"||event.targetTouches[0].target.parentElement.id=="events" || event.targetTouches[0].target.id=="bars"){
        var menu_state = document.querySelector('.menu').classList.value;
        if(menu_state=="menu open"){
            document.querySelector('.menu').classList.value = "menu";
        }
    }

    if(event.targetTouches[0].target.id=="delete"){
        deleteEvent();
    }
    if(event.targetTouches[0].target.id=="cut"){
        cutEvent();
    }
    if(event.targetTouches[0].target.id=="copy"){
        copyEvent();
    }
    if(event.targetTouches[0].target.id=="add"){
       addEvent();
    }
        


}},{passive: false});

document.addEventListener('touchend',function(event){
    event.preventDefault ();
    // console.log("touch end");
    EVENT = event;
    if (timer)
        clearTimeout(timer);
},{passive:false});


// document.addEventListener("DOMContentLoaded", function(event) { 
//     window.addEventListener("touchstart", touchstart, false);
//     window.addEventListener("touchend", touchend, false);
// });
