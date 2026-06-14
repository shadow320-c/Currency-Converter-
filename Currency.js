const currencyCountryList = {
  INR: "IN",
  AFN: "AF",
  ALL: "AL",
  DZD: "DZ",
  ARS: "AR",
  AUD: "AU",
  EUR: "EU",
  BSD: "BS",
  BDT: "BD",
  BRL: "BR",
  CAD: "CA",
  CNY: "CN",
  DKK: "DK",
  EGP: "EG",
  FJD: "FJ",
  HKD: "HK",
  IDR: "ID",
  IRR: "IR",
  IQD: "IQ",
  ILS: "IL",
  JPY: "JP",
  JOD: "JO",
  KES: "KE",
  KWD: "KW",
  MYR: "MY",
  MXN: "MX",
  NPR: "NP",
  NZD: "NZ",
  NGN: "NG",
  NOK: "NO",
  OMR: "OM",
  PKR: "PK",
  PHP: "PH",
  PLN: "PL",
  QAR: "QA",
  RUB: "RU",
  SAR: "SA",
  SGD: "SG",
  ZAR: "ZA",
  KRW: "KR",
  LKR: "LK",
  SEK: "SE",
  CHF: "CH",
  THB: "TH",
  TRY: "TR",
  AED: "AE",
  GBP: "GB",
  USD: "US",
  VND: "VN",
  YER: "YE"
};



const dropdown = document.querySelectorAll(".dropdown select")

const btn = document.querySelector(".but")

const fromCurr = document.querySelector(".from select")

const toCurr = document.querySelector(".to select")

const msg = document.querySelector(".msg")


for(let select of dropdown){
  for(let curr in currencyCountryList){
    newops = document.createElement("option")
    newops.innerText = curr;
    newops.value = curr;
    if (select.parentElement.classList.contains("from") && curr.code === "USD") {
      newOps.selected = "selected";
    } else if (select.parentElement.classList.contains("to") && curr.code === "INR") {
      newOps.selected = "selected";
    }

    select.append(newops);
    
    select.addEventListener("change",(evt)=>{
      changeflag(evt.target);
    })
    
  }
}



const changeflag = (ele) =>{
  let currcode = ele.value;
  let country = currencyCountryList[currcode];
  let newsrc =`https://flagsapi.com/${country}/flat/64.png`
  let  img = ele.parentElement.querySelector("img");
  img.src = newsrc
}

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let inp = document.querySelector(".inp");
  let val = inp.value;
  if (val === "" || val < 1) {
    val = 100;
    inp.value = "100";
  }


  const fromCode = fromCurr.value.toUpperCase();
  const toCode = toCurr.value.toUpperCase();

  if (fromCode === toCode) {
    msg.innerText = `${val} ${fromCode} = ${val} ${toCode}`;
    return;
  }

  const url = `https://open.er-api.com/v6/latest/${fromCode}`;
  

  let resp = await fetch(url);
  let data = await resp.json();
    
    
  let rate = data.rates[toCode]; 
  let finalamnt = (val * rate).toFixed(2); 

  msg.innerText = `${val} ${fromCode} = ${finalamnt} ${toCode}`;
    
  
})