let count = 0;
function btn_click(){
    let btns = document.querySelectorAll(".cart-btn")
    for (let btn of btns){
        btn.addEventListener("click", ()=>{
            count = count + 1
            document.querySelector(".item-count").innerHTML = count
        })
    }
}
async function getData() {
    const response = await fetch("https://api.zerosheets.com/v1/ymd", {
        method: "GET",
        headers: {
            Authorization: "Bearer hNDFXo1EaRgwUXH3Onub14axvggPUwBJ"
        }
    });
    const data = await response.json();

    // will return an array of objects with the _lineNumber
    return data;
}

function loadTmp(nameBtn, nameTemplate, dataTemplate=null, typeproduct=null){
    document.querySelector(nameBtn).addEventListener("click",()=>{
        fetch(nameTemplate)
        .then((res)=>res.text())
        .then((temp)=>{
            if (dataTemplate){
                let info = []
                for (let dt of dataTemplate){
                    if (dt ["type"] == typeproduct){
                        info.push(dt)
                    }
                }
                if (typeproduct == null){
                    info = dataTemplate
                }
                temp = Handlebars.compile(temp)
                temp = temp(info)
            }

            document.querySelector(".card-wrap").innerHTML = temp
            
        })
        .then((dt)=>{
            btn_click()
        })
    })
}

getData().then((data)=>{
    fetch("../template/card.hbs")
        .then((res)=>res.text())
        .then((temp)=>{
                temp = Handlebars.compile(temp)
                temp = temp(data)
            document.querySelector(".card-wrap").innerHTML = temp
})
.then((dt) =>{
    loadTmp(".all_products", "../template/card.hbs", data)
    loadTmp(".powerbanks", "../template/card.hbs", data, "powerbank")
    loadTmp(".generators", "../template/card.hbs", data, "generators")
    loadTmp(".electro", "../template/card.hbs", data, "electro")
})
})