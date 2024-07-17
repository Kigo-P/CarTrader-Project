
document.addEventListener("DOMContentLoaded", ()=>{
    //comment
    const tbody = document.getElementById("tbody")
    const tr1 = document.createElement('tr')
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    const td3 = document.createElement('td')
    const td4 = document.createElement('td')
    const td5 = document.createElement('td')
    const td6 = document.createElement('td')
    const td7 = document.createElement('td')
    const td8 = document.createElement('td')
    const td9 = document.createElement('td')

    const sold = document.createElement('button')
    const forsale = document.createElement('button')

    // creating a function for fetching data using the get verb
    function viewCars(){
        fetch("http://localhost:3000/cars")
        .then(response => response.json())
        .then(dataFromCars => {
            dataFromCars.forEach(car => {
            // creating table elements  and appending them to the tbody 
            const tr1 = document.createElement('tr')
            const td1 = document.createElement('td')
            const td2 = document.createElement('td')
            const td3 = document.createElement('td')
            const td4 = document.createElement('td')
            const td5 = document.createElement('td')
            const td6 = document.createElement('td')
            const td7 = document.createElement('td')
            //getting the text content/data from the server
            td1.textContent = car.make
            td2.textContent = car.model
            td3.textContent = car["engine no"]
            // creating and appending an image to td4
            const image = document.createElement('img')
            image.src = `${car.image}`
            image.style.height = "35px"
            image.style.width = "70px"
            td4.appendChild(image)
            //getting the text content of the other remaining data from the server
            td5.textContent = car.price
            td6.textContent = car.description
            // creating elements for the status/td 7
            const sold = document.createElement('button')
            const forsale = document.createElement('button')
            sold.textContent = "sold"
            forsale.textContent = "forsale"
            td7.appendChild(sold)
            td7.appendChild(forsale)
            // appending the elements to the tbody and tr
            tbody.appendChild(tr1)
            tr1.appendChild(td1)
            tr1.appendChild(td2)
            tr1.appendChild(td3)
            tr1.appendChild(td4)
            tr1.appendChild(td5)
            tr1.appendChild(td6)
            tr1.appendChild(td7)
            //creating an event listener for the sold button
            sold.addEventListener("click", function(event){
                event.preventDefault()
            //creating an input that displays after sold is pressed
            const input = document.createElement("input")
            input.type = "number"//type of input expected
            //creating a submit button such that when input has been added, it calcultes the profit
            const submitInput = document.createElement('button')
            submitInput.textContent = "submit"
            //adding an event listener to the submitInput button 
            submitInput.addEventListener('click', function(){
                //calculating the profit 
                const sellingPrice = input.value
                const buyingPrice = car.price
                const profit = sellingPrice- buyingPrice
                // creating td8 and td9 and appending them to tr1
                const td8 = document.createElement('td')
                const td9 = document.createElement('td')
                td8.textContent = sellingPrice
                td9.textContent = profit
                tr1.appendChild(td8)
                tr1.appendChild(td9)  
              
            })
             
              // Append input and submit button to td7
              td7.appendChild(input);
              td7.appendChild(submitInput);
            })
            })
        })
    }
    viewCars()
     //creating an event listener on the submit button so that when the input is submitted, it fetches the data using post method and displays it to the user and database as well
    //assigning a variable to our form
    const form  = document.getElementById("form");
    form.addEventListener('submit', function(event){
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
         let carData = {
            make : make,
            model : model,
            "engine no"  : engineno,
            image : image,
            price : price,
            description : description
        }
         //to clear the form fields immediately after the  submission button is pressed
         document.getElementById("make").value = ''
         document.getElementById("model").value = ''
         document.getElementById("engineno").value = ''
         document.getElementById("image").value = ''
         document.getElementById("price").value = ''
         document.getElementById("description").value = ''
        // fetching our data from the input value of the form using Post
        fetch("http://localhost:3000/cars", {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, 
            //converting the javascript object to the JSON format 
            body: JSON.stringify(carData)
        })
        .then(response => response.json())
        .then (formData => {
            if(formData.ok){
                return formData
            }
            else{
                return "error"
            }
        }
        )   
        }
        postCar()
    })

})


