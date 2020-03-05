console.log(" client side js file is loaded in console")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
messageOne.textContent = ""
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    console.log(location)
    messageOne.textContent = "loading..."

    fetch(`http://localhost:8000/weather?address=${location}`)
        .then((res) => {
            res.json().then((data) => {
                console.log("result ", data)
                if (data.error) {
                    console.log("inside error")
                    console.log("messageOne ", messageOne)
                    messageOne.textContent = data.error
                }
                else {
                    messageOne.textContent = data.forecast
                    messageTwo.textContent = data.location
                }
            })
        })
})