const URL='https://raw.githubusercontent.com/TheArmagan/currency/main/api';
const select=document.querySelectorAll('.select');
for(let data of  select){
    for(code in countryList){
        let newOp=document.createElement("option");
        newOp.innerText=code;
        newOp.value=code;
        if(data.name==="from" && code==="USD"){
            newOp.selected="selected";
        }
        if(data.name==="to" && code==="INR"){
            newOp.selected="selected";
        }
        data.append(newOp);
    }
    data.addEventListener("change",(e)=>{
        newFlag(e.target);
    })
}

const but=document.querySelector('.submit');
const msg=document.querySelector('.convertMsg');
const fromCur=document.querySelector('.from select');
const toCur=document.querySelector('.to select');
const updateExchange=async ()=>{
    let amount=document.querySelector('.amount input');
    let amtVal=amount.value;
    const curUrl=`${URL}/${fromCur.value}-to-${toCur.value}.json`;
    let res=await fetch(curUrl);
    let out=await res.json();
    let exchangeRate=out["value"];
    let ans=amtVal*exchangeRate;
    msg.innerText=`${amtVal} ${fromCur.value} = ${ans} ${toCur.value}`;
}
const newFlag=(el)=>{
    let code=el.value;
    let curCode=countryList[code];
    let newImgSrc=`https://flagsapi.com/${curCode}/flat/64.png`;
    let img=el.parentElement.querySelector("img");
    img.src=newImgSrc;
}
but.addEventListener('click',(e)=>{
    e.preventDefault();  
    updateExchange();
})
window.addEventListener("load",()=>{
    updateExchange();
})