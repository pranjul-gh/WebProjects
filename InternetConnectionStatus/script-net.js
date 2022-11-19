//check your system is connected to a network or not but it will not check your system has active internet connection.
//  ---->
window.addEventListener("load", (event)=>{
    const statusDisplay=document.getElementById("status");
    statusDisplay.textContent=navigator.onLine ? "Online" : "Offline" ;
})

window.addEventListener("offline", (event)=>{
    const statusDisplay=document.getElementById("status");
    statusDisplay.textContent="Offline" ;
})

window.addEventListener("online", (event)=>{
    const statusDisplay=document.getElementById("status");
    statusDisplay.textContent="Online" ;
})                               //<----

//VARIABLES

const image = document.getElementById("image");
const statusDisplay = document.getElementById("status");
const bgColor = document.getElementById("main");

function setColor(){
    bgColor.classList.add("online");
}

async function connectionStatus() {
    try{
        const fetchResult = await fetch('https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/Lenna_%28test_image%29.png/440px-Lenna_%28test_image%29.png?time=' + (new Date()).getTime());
        image.src = "./images-used/online.png" ;
        setColor();
        return fetchResult.status >= 200 && fetchResult.status < 300;

    }   catch(error){
        // console.log(error);
        statusDisplay.textContent = "OOPS!! Your are not connected";
        image.src = "./images-used/offline.png" ;
        bgColor.classList.remove("online");
    }
}

//Monitor The Connection 
setInterval(async ()=> {
    const result  = await connectionStatus();
    if (result){
        statusDisplay.textContent = "Your are conneted back Online";
        setColor();
    }
}, 5000);

//Check Connection when the page load
window.addEventListener("load", async(event) => {
    if (connectionStatus()){
        statusDisplay.textContent = "You're ONLINE";
        setColor();
    } else{
        statusDisplay.textContent = "You're OFFLINE";
    }
})