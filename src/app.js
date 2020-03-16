import './styles.css';
import { isValid, createModal } from './utils';
import { Question } from './question';
import { getAuthFrom, authWithEmailAndPassword } from './auth';

const form = document.getElementById('form');
const modalBtn = document.getElementById('modal-btn');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');

window.addEventListener('load', Question.renderList);
form.addEventListener('submit', submitFromHandler);
modalBtn.addEventListener('click', openModal);
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value);
});

function submitFromHandler(event) {
    event.preventDefault();
    if (isValid(input.value)) {
        const question = {
            text: input.value,
            date: new Date().toJSON()
        };
    
        submitBtn.disabled = true;
        Question.create(question).then(() => {
            submitBtn.disabled = false;
            input.value = '';
            input.classList = '';
        });
    
    }
}

function openModal() {
    createModal('Authorization (v@mail.ru/123456)', getAuthFrom());
    document.getElementById('auth-form')
        .addEventListener('submit', authFormHandler, {once: true});
}

function authFormHandler(event) {
    event.preventDefault();

    const btn = event.target.querySelector('button');
    const email = event.target.querySelector('#email').value;
    const password = event.target.querySelector('#password').value;
    
    btn.disabled = true;
    authWithEmailAndPassword(email, password)
        .then(Question.fetch)
        .then(renderModalAfterAuth)
        .then(() => btn.disabled = false);
}

function renderModalAfterAuth(content) {
    if (typeof content === 'string') {
        createModal('Error', content);
    } else {
        createModal('Questions', Question.listToHTML(content));
    }
}