document.addEventListener("DOMContentLoaded", ()=>{
    //creating a variable for div
    let profitArray = []// used to caltulate the profit
const displayCars = document.getElementById("displayCars")

//creating a function that fetches all the cars and puts them in specific divs
function viewCars(){
    
    fetch("http://localhost:3000/cars")
        .then(response => response.json())
        .then(dataFromCars =>
            //use of for each iterator method to loop through every car 
            dataFromCars.forEach(car => {
                displayEachCar(car)
        }))
         //to search for the vehicle
         function searchCar(){
            fetch("http://localhost:3000/cars")
            .then(response => response.json())
            .then(availableCars => {
                // creating a variable for the search button and show car
                const searchButton = document.getElementById('btn')
                const showCar = document.getElementById("showCar")
                //creating an event listener for the search button
                searchButton.addEventListener('click', function(e){
                    e.preventDefault()
                    const searchInput = document.getElementById("search").value
                    console.log(searchInput)
                       //looping through the available car objects to get one object using the filter method
                    availableCars.filter(car=> {
                        if((car.make).toLowerCase() === searchInput.toLowerCase()){
                            showCar.innerHTML = ``
                            showCar.innerHTML = `
                            <img src="${car.image}" alt="">
                            <h2>Make: ${car.make}</h2>
                            <p>Model: ${car.model}</p>
                            <p>Model: ${car.model}</p>
                            <p>Model: ${car.engine_no}</p>
                            <p>Model: ${car.price}</p>
                            <p>Model: ${car.description}</p>
                            `
                        }
                    })
                })
                
            })
               
         }
        searchCar()
        function displayEachCar(car){
            
             //creating elements 
             const div1 = document.createElement("div")
             const vmake = document.createElement("p")
             const vmodel = document.createElement("p")
             const vengineno = document.createElement("p")
             const vprice = document.createElement("p")
             const vdescription = document.createElement("p")
             const sold = document.createElement("button")
             const image = document.createElement("img")
             sold.textContent = "sold"
             const deleteInput = document.createElement("button")
             deleteInput.textContent = "delete"
             // converting an image link to an image in the div
            image.src = car.image
            image.style.height= "30vh"
            vmake.textContent = `Make: ${car.make}`
            vmodel.textContent = `Model: ${car.model}`
            vengineno.textContent = `Engine No: ${car.engine_no}`
            vprice.textContent = `Buying price: ${car.price}`
            vdescription.textContent= `Description: ${car.description}`
            div1.appendChild(image)
            div1.appendChild(vmake)
            div1.appendChild(vmodel)
            div1.appendChild(vengineno)
            div1.appendChild(vprice)
            div1.appendChild(vdescription)
            div1.appendChild(sold)
            div1.appendChild(deleteInput)
            displayCars.appendChild(div1)
            //creating an input for the submit button
            const sellInput = document.createElement("input")
            sellInput.type = "number"
            sellInput.id = 'sellInput'
            sellInput.placeholder = "Enter the selling price"
            sellInput.setAttribute("required", "");
            sold.addEventListener("click",function(event){
                event.preventDefault()
                event.stopPropagation()
                function getInput(){
                    //creating a button that submits the input above and automaically calculates the profit 
                    const submitInput = document.createElement("button")
                    submitInput.textContent = "Submit"
                    submitInput.addEventListener("click", function(event){
                            event.preventDefault()
                            
                            div1.remove()//removing the item on the div and taking it to the table  
                        //creating a variables and elements to a table 
                        const tr1 = document.createElement("tr")
                        const td1 = document.createElement("td")
                        const td2 = document.createElement("td")
                        const td3 = document.createElement("td")
                        const td4 = document.createElement("td")
                        const td5 = document.createElement("td")
                        const td6 = document.createElement("td")
                        const td7 = document.createElement("td")
                        const td8 = document.createElement('td')
                        const td9 = document.createElement('td')
                        const tr2 = document.getElementById("tr2")  
                        //transfering the data from the divs to the table once the vehicle has been sold
                        td1.textContent = `${car.make}`
                        td2.textContent = `${car.model}`
                        td3.textContent = `${car.engine_no}`
                        //creating the image that should be appended to the table
                        let image1 = document.createElement('img')
                        image1.src = car.image
                        image1.style= "height: 200px; border-radius: 15px;"
                        td4.appendChild(image1)
                        td5.textContent = `${car.price}`
                        td6.textContent = `${car.description}`
                   
                        //calculating the profit 
                        
                        const sellingPrice = parseInt(sellInput.value)
                        const buyingPrice = parseInt(car.price.split(",").join(""))
                        profit = sellingPrice - buyingPrice
                        td7.textContent = sellingPrice
                        profitArray.push(profit)
                        
                        td8.textContent = profit
                    // td10.textContent = ''
                    td9.textContent = profit
                     //appending the elements to the tbody and trow
                     tr1.appendChild(td1)
                     tr1.appendChild(td2)
                     tr1.appendChild(td3)
                     tr1.appendChild(td4)
                     tr1.appendChild(td5)
                     tr1.appendChild(td6)
                     tr1.appendChild(td7)
                     tr1.appendChild(td8)
                     tbody.appendChild(tr1)
                     tbody.appendChild(tr2)
                     tr2.appendChild(td9)
                    })
                    let totalProfit = 0
                    function sumOfTotal(){
                        for(let i = 0; i <= profitArray.length-1; i++){
                            totalProfit+=profitArray[i]
                        }
                        
                        console.log(totalProfit)
                    }sumOfTotal()
                    //disabling the sold button so that when it is clicked, it does not display multiple times
                    sold.disabled = true
                    //appending the submit Input
                    div1.appendChild(submitInput)
                    postSoldCar(car.id)
                }
                getInput()
            div1.appendChild(sellInput)
            
            // updateServer(car.id)
            })
            //adding an event listener to the delete button whereby it will remove the image 
            deleteInput.addEventListener("click", function(){
                div1.remove()
                //fetching the car we want to delete from the server
                fetch(`http://localhost:3000/cars/${car.id}`,{
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(response => response.json())
                .then(deleteImage => console.log(deleteImage))
            })
        }
        //creating postSoldCar function that fetches the data from the div and takes it to the table 
        function postSoldCar(carId){ 
            console.log(carId,"carId")
            //targeting the value of the input given on the form
            const make = document.getElementById("make").value;
            const model = document.getElementById("model").value;
            const engineno = document.getElementById("engineno").value;
            const image = document.getElementById("image").value;
            const price = document.getElementById("price").value;
            const description = document.getElementById("description").value;
           //creating a javascript object
           let carData = {
               make: make,
               model: model,
               engine_no: engineno,
               image: image,
               price: price,
               description: description
           }
           //using fetch method to post the car in the soldCars Database
           fetch(`http://localhost:3000/soldCars/${carId}`, {
               method: "POST",
               headers: {
                   "Content-Type" : "application/json",
                   "Accept" : "application/json",
               },
               body: JSON.stringify(carData)
           })
           .then(response => console.log(response))
        }  
        
        //creating an event listener on the submit button so that when the input is submitted, it fetches the data using post method and displays it to the user and database as well
        //assigning a variable to our form
        const form = document.getElementById("form")
        form.addEventListener("submit", function(event){
            event.preventDefault()
            function postCar(){
              //targeting the value of the input given on the form
                const make = document.getElementById("make").value;
                const model = document.getElementById("model").value;
                const engineno = document.getElementById("engineno").value;
                const image = document.getElementById("image").value;
                const price = document.getElementById("price").value;
                const description = document.getElementById("description").value;
              //creating a javascript object 
            let carData1 = {
                make: make,
                model: model,
                engine_no: engineno,
                image: image,
                price: price,
                description: description
            }
            //to clear the form fields immediately after the  submission button is pressed
            document.getElementById("make").value = ''
            document.getElementById("model").value = ''
            document.getElementById("engineno").value = ''
            document.getElementById("image").value = ''
            document.getElementById("price").value = ''
            document.getElementById("description").value = ''
            // fetching our data from the input value of the form using Post
            fetch("http://localhost:3000/cars",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
                //converting the javascript object to the JSON format 
                body: JSON.stringify(carData1)
            })
            .then(response => response.json())
            .then(formData => {
                if(formData.ok){
                    return formData
                }
                else{
                    return "error"
                }
            })
            }
            postCar()
        })
}
viewCars()
})
