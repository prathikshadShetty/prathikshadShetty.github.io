var timer;
var touchduration = 500;

function cutEvent(){
    console.log("cut")
}
function copyEvent(){
    console.log("copy")
}
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