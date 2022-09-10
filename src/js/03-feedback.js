import throttle from 'lodash.throttle';

const FEEDBACK_FORM_STATE = "feedback-form-state";

let saveLocalData = {};//сохранить массив с данными

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

getLocalData();//вызов получения данных с хранилища

refs.form.addEventListener("submit", handleSubmit);
refs.form.addEventListener("input", throttle(saveLocalInput, 500));

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

  console.log(userData)
};


function saveLocalInput(event) {

  saveLocalData[event.target.name] = event.target.value;

  localStorage.setItem(FEEDBACK_FORM_STATE, JSON.stringify(saveLocalData));
  
};

function getLocalData() {
  const getSavedData = localStorage.getItem(FEEDBACK_FORM_STATE) || "";

  const writeData = JSON.parse(getSavedData);

  if (writeData) {
    refs.input.value = writeData.email;
    refs.textarea.value = writeData.message;
  }
};













