//!                       ||-----------------Gemini Chatbot-----------------||
const api_input=document.getElementById("my_api");
const button=document.getElementById("send_btn");
const output=document.getElementById("output");
const input=document.getElementById("input");
const clear_button=document.getElementById("clear");

//?Load saved api key if user already entered it before
api_input.value=localStorage.getItem("my_api_key") || "";

api_input.addEventListener("change",function(){
    localStorage.setItem("my_api_key",api_input.value);
})

clear_button.addEventListener("click",function(){
    output.textContent="";
})

button.addEventListener("click",async function(event){
  const api=api_input.value;
  const prompt=input.value;
  input.value="";

  if(!api){
    alert("Please enter your Gemini API key first!");
    return;
  }
const Api_url=`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${api}`;

  output.innerHTML+="<hr><br><br>"+prompt+"<br><br>";
  try{
    const response = await fetch(Api_url,
{
    method : "POST",

   headers : {
    "Content-Type" : "application/json"

   },
   body : JSON.stringify({
    "contents": [
      {
        "parts" : [
            {
                text : prompt
            }
        ]
      }
    ]
            })
    }

)
let data= await response.json();
console.log(data);

if(data.error){
   output.innerHTML+="<br> Error : "+data.error.message;
   return;
}

output.innerHTML+="<br><br>"+ data.candidates[0].content.parts[0].text + "<hr>";
  }
catch(error){
    console.log(error);
    output.innerHTML+="<br> Error Limit Reached ! : "+error.message;
  }
});