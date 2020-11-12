var timer;
var clickTimer;
var touchduration = 500;
var addEventChanged=false;
var touch;
var count = 0;
var date =0;
var mode="cut";
var move=false;
var tapedTwice = true;
var tap = false;
var prevDay =null;
let moving = null;
var startX;
var doubleTouch = false;
var startY;
dates=["","October 1","October 2","October 3","October 4","October 5","October 6","October 7","October 8","October 9","October 10","October 11","October 12","October 13","October 14","October 15","October 16","October 17","October 18","October 19","October 20","October 21","October 22","October 23","October 24","October 25","October 26","October 27","October 28","October 29","October 30","October 31"] 

// let dateMap = new Map([[1,[]],[2,[]],[3,[]],[4,[]],[5,[]],[6,[]],[7,[]],[8,[]],[9,[]],[10,[]],[11,[]],[12,[]],[13,[]],[14,[]],[15,[]],[16,[]],[17,[]],[18,[]],[19,[]],[20,[]],[21,[]],[22,[]],[23,[]],[24,[]],[25,[]],[26,[]],[27,[]],[28,[]],[29,[]],[30,[]],[31,[]]])
dateMap=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
// console.log(dateMap);


document.getElementById("month-view").addEventListener('touchstart',touchs,false);
document.getElementById("month-view").addEventListener('touchend',touche,false);
document.getElementById("day-view").addEventListener('touchstart',touchs,false);
document.getElementById("day-view").addEventListener('touchend',touche,false);
// const evMon = interact('.eventMonth') 

// document.getElementById("month-view").addEventListener('touchmove',touchm,false);
// document.getElementById("day-view").addEventListener('touchmove',touchm,false);

function touchs(event){
    event.preventDefault();
    // console.log(event);
    if (event.targetTouches.length == 1) {
        timer = setTimeout(function(){ 
            if (move == false){
                if( event.targetTouches[0].target.parentElement.id=="calendar-day"||event.targetTouches[0].target.parentElement.id=="events" ||event.targetTouches[0].target.parentElement.className=="eventMonth"||event.targetTouches[0].target.className=="eventMonth"){
                    
                    var touch = event.targetTouches[0];
                    // console.log(touch);
                    date = parseInt(touch.target.id);
                    document.querySelector('.menu').classList.value="menu open";
                    var menu = document.getElementById("menu");
                    void menu.offsetWidth; 
                    menu.style.top = (touch.pageY-50) + 'px';
                    menu.style.left = (touch.pageX-50) + 'px';
                }

            }
            
        },touchduration); 
        touch = event.targetTouches[0];
        // console.log(event);
        if(event.targetTouches[0].target.parentElement.id=="calendar-day"||event.targetTouches[0].target.parentElement.id=="events" || event.targetTouches[0].target.id=="bars"||event.targetTouches[0].target.parentElement.className=="eventMonth"||event.targetTouches[0].target.className=="eventMonth"){
            // console.log(touch);
            var menu_state = document.querySelector('.menu').classList.value;
            if(menu_state=="menu open"){
                document.querySelector('.menu').classList.value = "menu";
            }
            document.getElementById("addEvent").style.display = "none";
            document.getElementById("moveEvent").style.display = "none";
            document.getElementById("deleteEvent").style.display = "none";
    
        }
        if (touch.target.parentElement.className=="eventMonth"||touch.target.className=="eventMonth"){
            event.target.parentElement.style.width =  event.target.parentElement.clientWidth +'px';
            event.target.parentElement.style.height =  event.target.parentElement.clientHeight+'px';
            event.target.parentElement.style.position = "fixed";
        }
        doubleTouch=false;
}}

function touche(event){
    move=false;
    event.preventDefault ();
    document.getElementById("startTime").click();
    if (prevDay !=null){
        document.getElementById(prevDay).firstElementChild.style.background="white";
    }
    if( event.target.parentElement.id=="calendar-day"){
        document.getElementById("present-month-selector").innerText = dates[event.target.id];
        document.getElementById(event.target.id).firstElementChild.style.background="#7FC8BD";
        updateDayView(event.target.id);
        prevDay = event.target.id;
        }

    if (touch.target.parentElement.className=="eventMonth"&& doubleTouch==false){
        var currentElememt = event.target.parentElement;
        var oldparent = event.target.parentElement.parentElement;
        var newParent = document.elementFromPoint( event.changedTouches[0].clientX,  event.changedTouches[0].clientY);
        if (newParent.className=="calendar-day"){
            console.log(oldparent,newParent);
            oldparent.removeChild(currentElememt);
            currentElememt.style.position = "relative";
            currentElememt.style.width="";
            currentElememt.style.height="";
            currentElememt.style.left="";
            currentElememt.style.top="";
            currentElememt.dataset.date = newParent.id;
            newParent.appendChild(currentElememt);
            const index = dateMap[parseInt(oldparent.id)].indexOf(currentElememt);
            if (index > -1) {
                dateMap[parseInt(oldparent.id)].splice(index, 1);
            }
            dateMap[parseInt(newParent.id)].push(currentElememt);
            
            updateDayView(parseInt(oldparent.id));
        }
        currentElememt.style.position = "relative";
      
    }
    
    EVENT = event;
    if (timer)
        clearTimeout(timer);
}

function touchm(event){
    
    move = true;
    if (touch.target.parentElement.className=="eventMonth"||touch.target.className=="eventMonth"){
        var oldParent = document.getElementById(touch.target.dataset.date);
        // console.log(oldParent);
        // var ele = event.target.parentElement;
        var touchLocation = event.targetTouches[0];
        // console.log(par.style);
        // ele.style.display="absolute";
        // ele.style.transform = "translateX(" + touchLocation.pageX-480 + "px) translateY(" + touchLocation.pageY-450 + "px) translateZ(0)";
        event.target.parentElement.style.left = (touchLocation.clientX) +'px';
        event.target.parentElement.style.top = (touchLocation.clientY - 50 ) + 'px';
        event.preventDefault();
    }
    
}
function onMove (event) {
    console.log("what");
    tgt = event.target;
  
    const dataX = tgt.getAttribute('data-x');
    const dataY = tgt.getAttribute('data-y');
    const initialX = parseFloat(dataX) || 0;
    const initialY = parseFloat(dataY) || 0;
  
    const deltaX = event.dx;
    const deltaY = event.dy;
  
    const newX = initialX + deltaX;
    const newY = initialY + deltaY;
  
    tgt
      .style
      .transform = `translate(${newX}px, ${newY}px)`;
  
      tgt.setAttribute('data-x', newX);
      tgt.setAttribute('data-y', newY);
  }
  
function updateDayView(currentDay){
    dayEvents = dateMap[parseInt(currentDay)];
    myNode = document.getElementById("events").getElementsByClassName("event");
    for (i = 0; i < myNode.length; i++) {
        document.getElementById("events").removeChild(myNode[i]);
    } 
    // while (myNode.firstChild) {
    //     myNode.removeChild(myNode.lastChild);
    //   }
    for (i = 0; i < dayEvents.length; i++) {
        curr = dayEvents[i];
        var ev = document.createElement("div");
        ev.id = "event"+curr.dataset.count;
        ev.className = "event";
        ev.innerHTML="<span class=\"title\">"+curr.dataset.eventName+"</span><p class=\"desc\">"+curr.dataset.desc+"<p>";
        ev.style="margin-top:"+curr.dataset.t+"px;height:"+curr.dataset.h+"px";
        document.getElementById("events").insertBefore(ev,document.getElementById("events").firstChild);
        // console.log("updating day view");
      }
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
function cutEvent(){

    if (touch.target.parentElement.className=="eventMonth"||touch.target.className=="eventMonth"){
        document.getElementById("moveEvent").style.display = "block";
        document.getElementById("moveEvent").style.top = (touch.pageY-50) + 'px';
        document.getElementById("moveEvent").style.left = (touch.pageX-50) + 'px';
        var el = touch.target.dataset.date;
        document.getElementById("currentDate").value = el;
        var menu_state = document.querySelector('.menu').classList.value;
            if(menu_state=="menu open"){
                document.querySelector('.menu').classList.value = "menu";
            }
        mode = "cut";
    }
    
}
function copyEvent(){

    if (touch.target.parentElement.className=="eventMonth"||touch.target.className=="eventMonth"){
        document.getElementById("moveEvent").style.display = "block";
        document.getElementById("moveEvent").style.top = (touch.pageY-50) + 'px';
        document.getElementById("moveEvent").style.left = (touch.pageX-50) + 'px';
        var el = touch.target.dataset.date;
        document.getElementById("currentDate").value = el;
        var menu_state = document.querySelector('.menu').classList.value;
            if(menu_state=="menu open"){
                document.querySelector('.menu').classList.value = "menu";
            }
        mode = "copy";
    }
    
}

function deleteEvent(){

    if (touch.target.parentElement.className=="eventMonth"||touch.target.className=="eventMonth"){
        document.getElementById("deleteEvent").style.display = "block";
        document.getElementById("deleteEvent").style.top = (touch.pageY-50) + 'px';
        document.getElementById("deleteEvent").style.left = (touch.pageX-50) + 'px';
        var el = touch.target.dataset.date;
        document.getElementById("currentDate").value = el;
        var menu_state = document.querySelector('.menu').classList.value;
            if(menu_state=="menu open"){
                document.querySelector('.menu').classList.value = "menu";
            }
        
    }
    
}

function moveEvent(){
    var oldParent = document.getElementById(touch.target.dataset.date);
    // console.log(dateMap[parseInt(oldParent.id)]);
    var eve = touch.target.parentElement;
    var cln = eve.cloneNode(true);
    cln.addEventListener("touchstart",dbltouch,false);
    cln.addEventListener("touchmove",touchm,false);
    if (mode=="cut"){
        oldParent.removeChild(eve);
        const index = dateMap[parseInt(oldParent.id)].indexOf(eve);
        if (index > -1) {
            dateMap[parseInt(oldParent.id)].splice(index, 1);
        }
        document.getElementById(document.getElementById("newDate").value).appendChild(eve);
        
    }
    else{
        document.getElementById(document.getElementById("newDate").value).appendChild(cln);
    }
    dateMap[parseInt(document.getElementById("newDate").value)].push(cln);
    document.getElementById("moveEvent").style.display = "none";
    updateDayView(parseInt(oldParent.id));
}

function dbltouch(event){
    if (clickTimer == null) {
        clickTimer = setTimeout(function () {
            clickTimer = null;
            // alert("single");

        }, 300)
    } else {
        clearTimeout(clickTimer);
        clickTimer = null;
        console.log("double");
        doubleTouch = true;
        var dupev = event.target.parentElement;
        var cln = dupev.cloneNode(true);
        cln.id="eventMonth"+count;
        cln.addEventListener("touchstart",dbltouch,false);
        cln.addEventListener("touchmove",touchm,false);
        document.getElementById(dupev.dataset.date).appendChild(cln);

    }
    // if(!tapedTwice) {
    //     tapedTwice = true;
    //     setTimeout( function() { 
    //         console.log("double");
    //         tapedTwice = false;
            
    //     }, 200 );
    //     return false;
    // }
    // event.preventDefault();
    // //action on double tap goes below
    // console.log("double-tap");
    // var dupev = event.target.parentElement;
    // document.getElementById(dupev.dataset.date).appendChild(dupev);
    // // console.log(dupev.dataset.date); 
    // // alert('You tapped me Twice !!!');
    
}
function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log("am i here?")
    ev.target.appendChild(document.getElementById(data));
  }

function addEvent(){
    var eventName = document.getElementById("eventName").value;
    var eventDesc = document.getElementById("eventDesc").value;
    var date =document.getElementById("dateentry").value;
    var startTime = document.getElementById("startTime").value;
    var endTime = document.getElementById("endTime").value;
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
        // var ev = document.createElement("div");
        // ev.id = "event"+count;
        // ev.className = "event";
        // ev.innerHTML="<span class=\"title\">"+eventName+"</span><p class=\"desc\">"+eventDesc+"<p>";
        // ev.style="margin-top:"+t+"px;height:"+h+"px";
        // document.getElementById("events").insertBefore(ev,document.getElementById("events").firstChild);
        if (date!=""){
            var mev = document.createElement("div");
            mev.id = "eventMonth"+count;
            mev.dataset.desc = eventDesc;
            mev.dataset.count = count;
            mev.dataset.t = t;
            mev.dataset.h = h;
            mev.dataset.eventName = eventName;
            mev.dataset.date = date;
            mev.draggable=true;
            ondragstart="drag(event)"
            mev.className = "eventMonth";
            mev.innerHTML="<p style=\"width:100%\" class=\"eventMonthtitle\" data-date="+date+">"+ eventName+"</p>";
            document.getElementById(date).appendChild(mev);
            mev.addEventListener("touchstart",dbltouch,false);
            mev.addEventListener("touchmove",touchm,false);
            dateMap[parseInt(date)].push(mev);
            // dateMap.put(date, dateMap.get(parseInt(date)).push(mev));
            // mev.contain
            // console.log(dateMap);

        }
        count = count+1;
        // console.log("creating event");
        updateDayView(date);
    
}
   
    cancelEvent();
}

function del(){
    var eve = touch.target.parentElement;
    console.log(eve);
    const index = dateMap[parseInt(touch.target.dataset.date)].indexOf(eve);
    if (index > -1) {
        dateMap[parseInt(touch.target.dataset.date)].splice(index, 1);
    }
    eve.remove();
    document.getElementById("deleteEvent").style.display = "none";
    updateDayView(parseInt(touch.target.dataset.date));
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
