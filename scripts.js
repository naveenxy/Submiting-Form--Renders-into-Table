var jsonData =
  JSON.parse(window.localStorage.getItem("data")) === null
    ? []
    : JSON.parse(window.localStorage.getItem("data"));
window.onload = function () {
  console.log("window.onload ")
  const form = document.querySelector("form");
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const messageInput = document.querySelector("#message");

  var JsonDataFromLocalStorage = JSON.parse(
    window.localStorage.getItem("data")
  );
  //  if (JsonDataFromLocalStorage != null)
  RenderDataintoTable(JsonDataFromLocalStorage);

  form.addEventListener("submit", (event) => {
    console.log("On-Submit");
    event.preventDefault(); // prevent the form from submitting

    // if (nameInput.value === "") {
    //   alert("Please enter your name");
    //   return;
    // }
    // if (!isValidEmail(emailInput.value)) {
    //   alert("Please enter a valid email address");
    //   return;
    // }

    // if (passwordInput.value.length < 5) {
    //   alert("Password must be at least 8 characters long");
    //   return;
    // }
    // if (!isMessageValid(messageInput.value)) {
    //   alert("Message must be 5-50 chracters");
    //   return;
    // }
   

    //Adding data into Json Array
    var primaryId =
      jsonData.slice(-1)[0] == undefined ? 1 : jsonData.slice(-1)[0].Id + 1;
    var myObject = {
      Id: primaryId,
      name: nameInput.value,
      email: emailInput.value,
    };
    jsonData.push(myObject);
    localStorage.setItem("data", JSON.stringify(jsonData));
    var JsonDataFromLocalStorage = JSON.parse(
      window.localStorage.getItem("data")
    );

    RenderDataintoTable(JsonDataFromLocalStorage);
    form.reset();
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function isMessageValid(message) {
    const messageRegex = /^.{5,100}$/;
    return messageRegex.test(message);
  }
};

function RenderDataintoTable(JsonDataFromLocalStorage) {
  var tbody = document.getElementById("tablebody");
  tbody.innerHTML = "";
  if (JsonDataFromLocalStorage != null) {
    if(JsonDataFromLocalStorage.length ===0)  NoRecordFound()
    for (var i = 0; i < JsonDataFromLocalStorage.length; i++) {
      var item = JsonDataFromLocalStorage[i];
      var row = document.createElement("tr");
      row.innerHTML =
        "<td>" +
        item.name +
        "</td>" +
        "<td>" +
        item.email +
        "</td>" +
        `<td><button type='button' class='btn btn-success'  onclick =EditFunction(${item.Id}) >Edit</button></td>
        <td><button type='button' class='btn btn-outline-danger' onclick =DeleteFunction(${item.Id})  >Delete</button></td>`;
      tbody.appendChild(row);
    }
  } 
  else {
    NoRecordFound()
  }
}
function DeleteFunction(id) {
  jsonData = jsonData.filter((item) => item.Id !== id);
  localStorage.setItem("data", JSON.stringify(jsonData));
  var JsonDataFromLocalStorage = JSON.parse(
    window.localStorage.getItem("data")
  );
  RenderDataintoTable(JsonDataFromLocalStorage);
}
function NoRecordFound()
{
    var tbody = document.getElementById("tablebody");
     tbody.innerHTML = "";
    var row = document.createElement("tr");
    row.innerHTML =
      "<div id= 'text'><td colspan=4>" + "No Record Found" + "</td></div>";
    tbody.appendChild(row);
}
$(document).ready(function(){
  $("#liveToastBtn").click(function(){

   // $("#After-Submit-message").html("<b>Form Submitted</b>").fadeIn(500);
    // const message = document.getElementById("After-Submit-message");
    // console.log("fade out")
    // message.innerHTML = "Form submitted!"; // update the message text
    $("#After-Submit-message").html("<b>Form Submitted</b>").show(2000).delay(1000).fadeOut(500);
    //$("#After-Submit-message").val("Form submitted!").delay(1000).fadeOut(500);
  });
});
function EditFunction(id)
{
  var data = jsonData.find(item=> item.Id== id)
  $("#name").val(data.name);
  $("#email").val(data.email);
  $("#liveToastBtn").hide();
  $("#UpdateBtn").show();
  $("BackBtn").show();
  $("#ClearBtn").show();

  localStorage.setItem("data_Id",data.Id)
}

function UpdateFunction(value)
{
  console.log(value);
 var id = localStorage.getItem("data_Id")
const nameInput = document.querySelector("#name").value;
 const emailInput = document.querySelector("#email").value;
jsonData= jsonData.map(obj => {
  if (obj.Id == id) {
  obj.name= nameInput;
  obj.email=emailInput
  }
 return obj;
 })
 localStorage.setItem("data", JSON.stringify(jsonData));
console.log(jsonData)
var JsonDataFromLocalStorage = JSON.parse(
  window.localStorage.getItem("data")
);
RenderDataintoTable(JsonDataFromLocalStorage)
//localStorage.removeItem("data_Id");

}
$(document).ready(function(){
  $("#ClearBtn").click(function(){
   location.reload();
   });
});


// $(document).ready(function(){
//   $("#UpdateBtn").click(function(){
//    console.log("hi")
//    const nameInput = document.querySelector("#name").value;
//    const emailInput = document.querySelector("#email").value;
//    });
// });