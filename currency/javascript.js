function getdata(Data){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(Data);
            resolve("sucess");
        },2000);
    })
}
(async function(){
    await getdata(1);
    await getdata(2);
    await getdata(3);
})();

