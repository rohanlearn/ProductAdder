url="https://crudcrud.com/api/a772880837b24569bab9f734ee7a7efb"

const form = document.getElementById("theForm")
const elecAdder = document.getElementById("elec-adder")
const foodAdder = document.getElementById("food-adder")
const skinAdder = document.getElementById("skin-adder")

form.addEventListener('submit',addProduct)

window.onload=loader()

function loader(e){
    axios.get(`${url}/Products`)
    .then((res)=>{

        let data = res.data
        if(data.length>1){
            for(i of data){
                addToSite(i)
            }
        }   
    })
    .catch(function(error){
        alert(error)
        
    });
    

}

function addProduct(event){
    event.preventDefault()
   let pnInput = document.getElementById("pname")
   let pname = pnInput.value
   let pInput = document.getElementById("price")
   let price = pInput.value
   let catInput = document.getElementById("category")
   let category = catInput.options[catInput.options.selectedIndex].text
   if(category=="Choose an Option"){
    alert("please choose an option!!")
    return
   };

   let obj = {
    productName:pname,
    price:price,
    category:category
   };
   axios.post(`${url}/Products`,obj)
   .then((result) => {
    a = result.data
    addToSite(a);
    
    
   }).catch((err) => {
    alert(err)
    
   });
   pInput.value=""
   pnInput.value=""
   

   
}

function addToSite(object){
   
    var name = object.productName
    var price=object.price
    var category=object.category
    finalAdder = ""

    switch(category){
        case "Electronics":
            finalAdder = elecAdder
            break
        case "Food":
            finalAdder=foodAdder
            break
        case "Skincare":
            finalAdder=skinAdder
            break        
    }

    var li = document.createElement("li");
    var btn = document.createElement("button")
    btn.appendChild(document.createTextNode("Delete Order"))
    btn.id="button"
    btn.addEventListener("click",function a(e){
        deletion(e,object)
    })
    li.appendChild(document.createTextNode(name+" - "));
    li.appendChild(document.createTextNode(price+" - "));
    li.appendChild(document.createTextNode(category+" - "))
    li.appendChild(btn)

    finalAdder.appendChild(li)
    


 
    



}

function deletion(e,object){
    e.preventDefault()
    var li = e.target.parentNode

    var finalAdder = "";
    category = object.category
    switch(category){
        case "Electronics":
            finalAdder = elecAdder
            break
        case "Food":
            finalAdder=foodAdder
            break
        case "Skincare":
            finalAdder=skinAdder
            break        
    }
    if(confirm(`Are you sure you wanna delete the product ${object.productName}?`)){
        axios.delete(`${url}/Products/${object._id}`)
    .then((result) => {
        alert("succesfully deleted the product")
        console.log(li)
        finalAdder.removeChild(li)
        

        
    })
    .catch(function(error){
        console.log(error)
        
    });

    }
    
}