
document.addEventListener('DOMContentLoaded', loadTable);



function loadTable(){
    document.getElementById("test").textContent = "This Test Worked still";
    var request = new XMLHttpRequest();
  
    request.open("GET", "http://flip3.engr.oregonstate.edu:7808/test" , true);
   
    request.addEventListener('load',function(){
        if(request.status >= 200 && request.status < 400){
        
          var response = JSON.parse(request.responseText);
          console.log(response);
          document.getElementById('test').textContent = response;

        } else {
          console.log("Error: " + request.statusText);
        }});
        request.send(null);
       
}