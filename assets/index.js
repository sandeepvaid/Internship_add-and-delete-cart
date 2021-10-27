var head = document.getElementById("Category");
var mainDiv = document.getElementById("main-div")
let product = new Map()

function addToHtml(data){

    const div1 = document.createElement('div');
    div1.innerHTML = `
        <h1>${data.name}</h1>
        <hr>
    `
    mainDiv.append(div1)
    for(let j of data.productList){

        const div = document.createElement("div");
            
             div.innerHTML = `
                    <div id="products">
                        <p>Name : ${j.name}</p>
                        <p>Price : ${j.price}</p>

                        <button id='add' name="${j.name}" class="cart-button">Add to cart</button>
                        <button id='delete' name="${j.name}" class="cart-button">Remove from cart</button>
                    
                    </div>  
            `
            mainDiv.append(div);
          
    }
}

//Here we fetch the data json file to fetch the data in it
fetch('../assets/data.json')
.then((response)=>{
    return response.json();
}).then((products)=>{

    var singleProduct = products.data;
    for (let i of singleProduct){
       
        addToHtml(i);
    }
});

//This function is used to add and delete task to the map and the cart is printed in console

function addandDeleteProducts(event){
   
    if(event.target.innerHTML == "Add to cart"){
   
        if(product.has(event.target.name)){
            var value = product.get(event.target.name);
            product.set(event.target.name, parseInt(value) + 1 );
        }else{
            product.set(event.target.name,1);
        }
        console.log(product)
    }else if(event.target.innerHTML == "Remove from cart"){
        if(product.has(event.target.name)){
            let productCount = parseInt(product.get(event.target.name))
            if( productCount >= 2){
                product.set(event.target.name,productCount-1)
                console.log(product);
                console.log("Product instance remove from cart!!")
            }else{
                product.delete(event.target.name);
                console.log(product);
                console.log("Product remove from cart!!")
            }
           
        }else{
            console.log("This product is not added in cart till now !!");
        }
    }
}

//Here we use delegation listner to add and delete the task in our map
let addToCart = document.getElementsByClassName("cart-button");
document.addEventListener("click",addandDeleteProducts);