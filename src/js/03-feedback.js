import throttle from 'lodash.throttle';

const FEEDBACK_FORM_STATE = "feedback-form-state";

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

getLocalData(refs.input, refs.textarea);

refs.form.addEventListener("submit", handleSubmit);
refs.form.addEventListener("input", throttle(saveLocalInput, 500));

// refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));
// refs.input.addEventListener('input', throttle(onTextareaInput, 500));

getLocalData(refs.input, refs.textarea);

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message }
  } = event.currentTarget;

  if (email.value === "" || message.value === "") {
    return alert("Please fill in all the fields!");
  }

  const userData = {};
  userData.email = email.value;
  userData.message = message.value;

  event.currentTarget.reset();

  localStorage.removeItem(FEEDBACK_FORM_STATE);
};

function saveLocalInput(event) {
  
  const saveLocalData = JSON.stringify({ [event.target.name]: event.target.value });
  
  localStorage.setItem(FEEDBACK_FORM_STATE, saveLocalData);
};

function getLocalData(email, textarea) {
  const getSavedData = localStorage.getItem(FEEDBACK_FORM_STATE);
  const writeData = JSON.parse(getSavedData);

  console.log(writeData);

  email.value = writeData.email 
  textarea.value = writeData.textarea;

};







