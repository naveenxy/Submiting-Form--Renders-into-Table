var jsonData =
  JSON.parse(window.localStorage.getItem("data")) === null
    ? []
    : JSON.parse(window.localStorage.getItem("data"));
window.onload = function () {
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
    const message = document.getElementById("After-Submit-message");

    message.innerHTML = "Form submitted!"; // update the message text

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
        `<td><button type='button' class='btn btn-outline-danger' onclick =DeleteFunction(${item.Id})  >Delete</button></td>`;
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
      "<div id= 'text'><td colspan=3>" + "No Record Found" + "</td></div>";
    tbody.appendChild(row);
}
