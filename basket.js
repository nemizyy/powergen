class Product{
    constructor(id,image,name,price){
        this.name = name
        this.image = image
        this.price = price
        this.id = id
        this.count = 1
        this.total = price
    }
}
class Basket{
    constructor(){
        try{
            let b = localStorage.getItem("basket")
            b = JSON.parse(b)
            this.products = b.products
            this.total = b.total
            this.count = b.count
        }
        catch{
            this.total = 0
            this.products = []
            this.count = 0
        }
    }
    add(id,image,name,price){
        let p = new Product(id,image,name,price)  
        let flag = true  
        for (let pro of this.products){
            if (pro.id == p.id){
                flag = false
                pro.count += 1
                pro.total += pro.price
            }
        }
        if (flag == true){
            this.products.push(p)
        }
        this.total += p.price
        this.count += 1
    }
    del(id){
        for (let pro of this.products){
            if (pro.id == id){
                this.count -= 1
                this.total -= pro.total
                let i = this.products.indexOf(pro)
                this.products.splice(i,1)
            }
        }
    }
    delone(id,price){
        for (let pro of this.products){
            if (pro.id == id){
                if (pro.count >= 2){
                    pro.count -= 1
                    pro.total -= pro.price
                    this.count -= 1
                    this.total -= pro.price
                }
                else{
                this.count -= 1
                this.total -= pro.total
                let i = this.products.indexOf(pro)
                this.products.splice(i,1)
                return true
                }
            }
        }
    }
}











function Tmpload(nameTemplate, dataTemplate){
        fetch(nameTemplate)
        .then((res)=>res.text())
        .then((temp)=>{
                temp = Handlebars.compile(temp)
                temp = temp(dataTemplate)
            document.querySelector(".card-wrap").innerHTML = temp
            }
        )}
        



function Showbasket(){
    let basket = new Basket()
    Tmpload("../template/basket.hbs", {basket})
}
function Del(id){
    let basket = new Basket()
    basket.del(id)
    document.querySelector(".item-count").innerHTML = basket.count
    document.querySelector(".cart_summ").innerHTML = basket.total
    document.querySelector(`.tr${id}`).remove()
    basket = JSON.stringify(basket)
    localStorage.setItem("basket", basket)
}



function Add(id,image,name,price){
    let basket = new Basket()
    basket.add(id,image,name,price)
    document.querySelector(".item-count").innerHTML = basket.count
    basket = JSON.stringify(basket)
    localStorage.setItem("basket", basket)
}

function Delone(id, price){
    let basket = new Basket()
    let t = basket.delone(id,price)
    document.querySelector(".item-count").innerHTML = basket.count
    document.querySelector(".cart_summ").innerHTML = basket.total
    if (t == true){
    document.querySelector(`.tr${id}`).remove()
    }
    else{
        document.querySelector(".cart_num").value = +document.querySelector(".cart_num").value - 1
    }
    basket = JSON.stringify(basket)
    localStorage.setItem("basket", basket)
}
function Delone(id, price){
    let basket = new Basket()
    let t = basket.delone(id,price)
    document.querySelector(".item-count").innerHTML = basket.count
    document.querySelector(".cart_summ").innerHTML = basket.total
    if (t == true){
    document.querySelector(`.tr${id}`).remove()
    }
    else{
        document.querySelector(".cart_num").value = +document.querySelector(".cart_num").value - 1
    }
    basket = JSON.stringify(basket)
    localStorage.setItem("basket", basket)
}