const form = document.querySelector('#team-form')
const pname = document.querySelector('#pname')
const message = document.querySelector('#message')
const age = document.querySelector('#age')
const image = document.querySelector('#image')
const pnameFeedback = document.querySelector('#pname-feedback')
const messageFeedback = document.querySelector('#message-feedback')
const ageFeedback = document.querySelector('#age-feedback')
const imageFeedback = document.querySelector('#image-feedback')

form.addEventListener('submit', (e) => {
  if (pname.value === '') {
    e.preventDefault()
    pnameFeedback.textContent = 'Please add a name'
  } else {
    pnameFeedback.textContent = ''
  }
  if (age.value === '') {
    e.preventDefault()
    ageFeedback.textContent = 'Please add an age'
  } else {
    ageFeedback.textContent = ''
  }
  if (image.value === '') {
    e.preventDefault()
    imageFeedback.textContent = 'Please add an image url'
  } else {
    imageFeedback.textContent = ''
  }
  if (message.value === '') {
    e.preventDefault()
    messageFeedback.textContent = 'Please add a bio description'
  } else {
    messageFeedback.textContent = ''
  }
})
