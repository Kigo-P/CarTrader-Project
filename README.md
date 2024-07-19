## For this project, you're going build a Single Page Application (SPA). Building this application will be challenging because it will integrate everything you've learned up to this point. Your frontend will be built with HTML, CSS, and JavaScript and will communicate with a public API.
## Project Requirements

 ### Your app must be a HTML/CSS/JS frontend that accesses data from a public API or from a db.json file using json-server. Your API or db.json should return a collection of at least 5 objects with each object having at least 3 attributes. All interactions between the client and the API should be handled asynchronously and use JSON as the communication format. Try to avoid using an API that requires a key. APIs that are free and require no authorization will be easiest to use. For ideas, see this list of no-auth APIs 

 My app contains a html and a CSS file that are used to structure the app. 
 It is single page application that is in one html file
 The db.json has atleast 5 objects containing 11 attributes as shown below:
 {
      "id": "2",
      "make": "Ford",
      "model": "Mustang",
      "engine_no": "C5AE6015E",
      "image": "https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg",
      "price": "4,800,000",
      "description": "red",
      "status": "",
      "selling_price": 5000000,
      "profit": 200000,
      "sold": true
    }
 In my javascript file, I have used asynchronous fetch with the get, post, patch and delete verbs. The functions have really come in handy when displaying the data from the db.json to th frontend for the user to see


### Use at least 3 distinct event listeners
### Links to an external site. (3 events of different types) that enable interactivity. What this means is that, if you had 3 click events, that would only count as 1 distinct event and you would need to add at least 2 more. Think search or filter functionality, toggling dark/light mode, upvoting posts, etc. Each of your event listeners should also have its own unique callback function. These must be added using JavaScript's .addEventListener() method. Events embedded into HTML elements and CSS will not count toward the total. Please ask your instructor if you have questions regarding this requirement.
My project has 3 different event listeners namely click,submit and DOMContent loaded
Example: form.addEventListener("submit", function(event){
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
        


### Your project must implement at least one instance of array iteration using available array methods (map, forEach, filter, etc). Manipulating your API data in some way should present an opportunity to implement your array iteration.

My code has used 2 instances of array iteraion namely filter and for each method
Filter has been used while searching for a product while for each loops through each object in the server giving a display to the user
The project has a div whereby it contains the available stock which is the transferred to the table once sold