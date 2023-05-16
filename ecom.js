url="https://crudcrud.com/api/ee1714baa73f48d18e4d6d9da2fae2f6"

const form = document.getElementById("theForm")
const elecAdder = document.getElementById("elec-adder")
const foodAdder = document.getElementById("food-adder")
const skinAdder = document.getElementById("skin-adder")

form.addEventListener('submit',addProduct)
window.addEventListener("DOMContentLoaded",loader)


async function loader() {
    
    try {
      const res = await axios.get(`${url}/Products`);
      const data = res.data;
      
      if (data.length > 0) {
        for (const item of data) {
          addToSite(item);
        }
      }
    } catch (error) {
      alert(error);
    }
  }

  async function addProduct(event) {
    event.preventDefault();
  
    const pnInput = document.getElementById("pname");
    const pname = pnInput.value;
    const pInput = document.getElementById("price");
    const price = pInput.value;
    const catInput = document.getElementById("category");
    const category = catInput.options[catInput.options.selectedIndex].text;
  
    if (category === "Choose an Option") {
      alert("Please choose an option!");
      return;
    }
  
    const obj = {
      productName: pname,
      price: price,
      category: category
    };
  
    try {
      const result = await axios.post(`${url}/Products`, obj);
      const data = result.data;
      addToSite(data);
    } catch (err) {
      alert(err);
    }
  
    pInput.value = "";
    pnInput.value = "";
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
