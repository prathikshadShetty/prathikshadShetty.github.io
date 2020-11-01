var timer;
var touchduration = 500;
var addEventChanged=false;
var touch;
var count = 0;
var date =0;
dates=["","October 1","October 2","October 3","October 4","October 5","October 6","October 7","October 8","October 9","October 10","October 11","October 12","October 13","October 14","October 15","October 16","October 17","October 18","October 19","October 20","October 21","October 22","October 23","October 24","October 25","October 26","October 27","October 28","October 29","October 30","October 31"] 

document.getElementById("month-view").addEventListener('touchstart',touchs,false);
document.getElementById("month-view").addEventListener('touchend',touche,false);
document.getElementById("day-view").addEventListener('touchstart',touchs,false);
document.getElementById("day-view").addEventListener('touchend',touche,false);

function touchs(event){
    event.preventDefault();
    console.log(event);
    if (event.targetTouches.length == 1) {
        timer = setTimeout(function(){ 
            // console.log("long-press")
            // console.log(event);
            if(event.targetTouches[0].target.parentElement.id=="calendar-days"||event.targetTouches[0].target.parentElement.id=="events" ){
                var touch = event.targetTouches[0];
                console.log(touch);
                date = parseInt(touch.target.id);
                document.querySelector('.menu').classList.value="menu open";
                var menu = document.getElementById("menu");
                void menu.offsetWidth; 
                menu.style.top = (touch.pageY-50) + 'px';
                menu.style.left = (touch.pageX-50) + 'px';
            }
        },touchduration); 
        touch = event.targetTouches[0];
        if(event.targetTouches[0].target.parentElement.id=="calendar-days"||event.targetTouches[0].target.parentElement.id=="events" || event.targetTouches[0].target.id=="bars"){
            var menu_state = document.querySelector('.menu').classList.value;
            if(menu_state=="menu open"){
                document.querySelector('.menu').classList.value = "menu";
            }
            document.getElementById("addEvent").style.display = "none";
    
        }
}}

function touche(event){
    event.preventDefault ();
    document.getElementById("startTime").click();
    // console.log("touch end");
    EVENT = event;
    if (timer)
        clearTimeout(timer);
}

function add(){
    document.getElementById("addEvent").style.display = "block";
    document.getElementById("addEvent").style.top = (touch.pageY-50) + 'px';
    document.getElementById("addEvent").style.left = (touch.pageX-50) + 'px';
    if (date!=""){
        document.getElementById("dateentry").value = date;
    }
    else{
        document.getElementById("dateentry").value = 1;

    }
    
    var menu_state = document.querySelector('.menu').classList.value;
        if(menu_state=="menu open"){
            document.querySelector('.menu').classList.value = "menu";
        }
}

function addEvent(){
    var eventName = document.getElementById("eventName").value;
    var eventDesc = document.getElementById("eventDesc").value;
    var date =document.getElementById("dateentry").value;
    var startTime = document.getElementById("startTime").value;
    var endTime = document.getElementById("endTime").value;
    count = count+1;
    var t =0;
    var h =0;
    if (startTime >0){
        t = (startTime-9)*61
    }

    if (endTime>0){
        h = 30;
        if (endTime-startTime>0){
            h = (endTime-startTime)*60;
        }
    }
    if (eventName=="" && eventDesc=="" && date==""){
        cancelEvent();
    }
    else{
        var ev = document.createElement("div");
        ev.id = "event"+count;
        ev.className = "event";
        ev.innerHTML="<span class=\"title\">"+eventName+"</span><p class=\"desc\">"+eventDesc+"<p>";
        ev.style="margin-top:"+t+"px;height:"+h+"px";
        document.getElementById("events").insertBefore(ev,document.getElementById("events").firstChild);
        if (date!=""){
            var mev = document.createElement("div");
            mev.id = "eventMonth"+count;
            mev.className = "eventMonth";
            mev.innerHTML="<span class=\"title\">"+ eventName+"</span>";
            document.getElementById(date).appendChild(mev);
            console.log(mev);

        }



    }
    
    cancelEvent();


}

function cancelEvent(){
    document.getElementById("eventName").value ="";
    document.getElementById("eventDesc").value="";
    document.getElementById("startTime").value=9;
    document.getElementById("endTime").value=9;
    document.getElementById("addEvent").style.display = "none";
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
    var event_1 = _('dragevent');
//     var calendar_2 = _('calendar-day-empty2');
//     var calendar_3 = _('calendar-day-empty3');

    var activeEvent = '';
    var originalX = '';
    var originalY = '';

    dragevent.addEventListener('dragstart', handleDragStart, false);
    dragevent.addEventListener('dragend', handleDragEnd, false);
    dragevent.addEventListener('touchstart', handleTouchStart, false);
    dragevent.addEventListener('touchmove', handleTouchMove, false);
    dragevent.addEventListener('touchend', handleTouchEnd, false);

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

// .getElementById("month-view")