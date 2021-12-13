/* Global Variables */
const endpoint = {
    prefix: 'https://api.openweathermap.org/data/2.5/weather?zip=',
    suffix: '&appid=525109253259061f34290f354e64e2af&units=METRIC',
    url: function(zipcode) {
        return this.prefix + (zipcode) + this.suffix
    }
} 
const submitButton = document.getElementById('generate')
const zipcodeInput = document.getElementById('zipcode')
const feelingsInput = document.getElementById('feeling')
const entryHolder = document.getElementById('entryHolder')
const form = document.getElementById('form-page')
const result = document.getElementById('result-page')
const backBtn = document.getElementById('back-button')

// Events
submitButton.addEventListener('click',onFormSubmission)
backBtn.addEventListener('click', switchPages)

// Events Functions
function onFormSubmission(event){
    getTemperature(zipcodeInput.value)
    .then((temperature) => {
        let dataObject = {
            date:getDate(),
            text: feelingsInput.value,
            temperature: temperature,
        }
        postData(dataObject)
        updateUi()
    })

}
function switchPages(){
    form.classList.toggle('hidden')
    result.classList.toggle('hidden')
}


/* Request Functions */

// Api request to get the temperature
const getTemperature = async function(zipcode){
    let response = await fetch(endpoint.url(zipcode))
    try {
        responseData = await response.json()
        return {
            temp: responseData.main.temp,
            city: responseData.name,
            country: responseData.sys.country,
            icon: responseData.weather[0].icon,
            description: responseData.weather[0].description
            }

    }
    catch(error){
        console.log(error)
    }
}

// server post request to send the data
const postData = async function(dataObject){
    let response = await fetch('/post', {
        method: 'POST',
        body: JSON.stringify(dataObject),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    try {
        responseData = await response.json()
        return responseData
    } catch(error){
        console.log(error)
    }
}

// server get request to acquire the data and update the ui
const updateUi = async function(){
    let response = await fetch('/get')
    try {
        responseData = await response.json()
        // inject data to ui
        document.getElementById('city').innerHTML = (responseData.temperature.city) ? responseData.temperature.city : "N/A"
        document.getElementById('country').innerHTML = (responseData.temperature.country) ? responseData.temperature.country : "N/A"
        document.getElementById('icon').src = `http://openweathermap.org/img/wn/${((responseData.temperature.icon) ? responseData.temperature.icon : '01n')}@4x.png`
        document.getElementById('description').innerHTML = (responseData.temperature.description) ? responseData.temperature.description : "N/A"
        document.getElementById('temp').innerHTML = (responseData.temperature.temp) ? responseData.temperature.temp + "&deg;" : "N/A"
        document.getElementById('content').innerHTML = "Feeling: " + ((responseData.text) ? responseData.text : "N/A")
        document.getElementById('date').innerHTML = (responseData.date) ? responseData.date : 'N/A'
        // show result ui
        switchPages()
    } catch(error){
        console.log(error)
    }
}

// Helper Functions
function getDate(){
    let date = new Date()
    return  date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
}

