// A Promise is like a box that will eventually have a value (success or error). Instead of nesting callbacks, you chain .then().

console.log('Start');

function fetchData(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Data fetched!");
            resolve("Here is your data"); //fulfilled
        },2000
    );
    })
}

fetchData().then((result)=>{
    console.log("Promise got:",result);
});


console.log("End!");