
//document.addEventListener('DOMContentLoaded', loadTable);


function addExc(){
    document.getElementById('Load_ID').addEventListener('click', function(event){
        var request2 = new XMLHttpRequest();
        var payload = {input:null}
        payload.name = document.getElementById('name_input').value;
        payload.reps = document.getElementById('reps_input').value;
        payload.weight = document.getElementById('weight_input').value;
        payload.date = document.getElementById('date_input').value;
        console.log("Send Request");
        request2.open('post', 'http://flip3.engr.oregonstate.edu:7808/', true);
        request2.setRequestHeader('Content-Type', 'application/json');
        /*
        request2.addEventListener('load',function(){
          if(request2.status >= 200 && request2.status < 400){
            //document.getElementById("test").textContent = "row was added";
            var response2 = JSON.parse(request2.responseText);
           // console.log(response2); 
          } else {
            console.log("Error in network request: " + request2.statusText);
          }});
          console.log(payload);
          JSON.stringify(payload);
          request2.send(JSON.stringify(payload));
          event.preventDefault();
          event.stopPropagation();
          */

    });
}