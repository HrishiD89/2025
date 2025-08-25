console.log("start");

function fetchData(callback){
    // pretend thsi takes 2 seconds
    setTimeout(()=>{
        console.log("Data fetched!");
        callback("here is your data"); //runs the callback
    },2000)
}


fetchData((result)=>{
    console.log("Callback got: ",result)
})

console.log("End");