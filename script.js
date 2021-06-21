

let country = ''
let latitude = ''
let longitude = ''
let place = ''
let state = ''
let stateAbbrev = ''

const searchResults = document.getElementById('searchResults')
const errorMessage = document.getElementById('error')
document.getElementById('submit').addEventListener("click", fetchZIP)

function fetchZIP(e) {
    e.preventDefault()

    const zip = document.getElementById('zip').value
    if (zip.length === 5) {

        errorMessage.innerHTML = ""
        searchResults.innerHTML = 'Searching...'
        
        fetch(`http://api.zippopotam.us/us/${zip}`)
        .then(response => response.json())
        .then(data => {

            country = data.country
            latitude = data.places[0].latitude
            longitude = data.places[0].longitude
            place = data.places[0]["place name"]
            state = data.places[0].state
            stateAbbrev = data.places[0]["state abbreviation"]

            searchResults.innerHTML = `
            <div><p>${place}, ${state}, ${country}</p>
            <p>Latitude: ${latitude}</p>
            <p>Longitude: ${longitude}</p>
            <p>Zip: ${zip}</p></div>
            <img src='/states/${stateAbbrev}.svg'>
            `

            document.getElementById('zip').value = ''
        })
        .catch(err => {
            searchResults.innerHTML = "Oops. That zip code doesn't exist. Try another one."
            document.getElementById('zip').value = ''
        })

    } else {
        errorMessage.innerHTML = "Please enter a valid, 5-digit zip code."
    }
}
