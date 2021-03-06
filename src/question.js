export class Question {
    static create(question) {
        return fetch('https://podcast-tutorial.firebaseio.com/question.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(respons => respons.json())
            .then(respons => {
                question.id = respons.name;
                return question;
            })
            .then(addToLocalStorage)
            .then(Question.renderList);
    }

    static fetch(token) {
        if (!token) {
            return Promise.resolve('<p class="error">Unauthrized</p>')
        }
        return fetch (`https://podcast-tutorial.firebaseio.com/question.json?auth=${token}`)
            .then(response => response.json())
            .then(response => {
                if (response && response.error) {
                    return `<p class="error">${questions.error}</p>`;
                }

                return response ? Object.keys(response).map(key => ({
                    ...response[key],
                    id: key
                })) : [];
            });
    }

    static renderList() {
        const questions = getFromLocalStorage();

        const html = questions.length
            ? questions.map(toCard).join('')
            : `<div class="mui--text-headline">No question submited yet.</div>`;
        
        const list = document.getElementById('list');
        list.innerHTML = html;
    }

    static listToHTML(questions) {
        return questions.length 
            ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
            : '<p>There is no submited questions yet.</p>';
    }
}

function addToLocalStorage(question) {
    const all = getFromLocalStorage();
    all.push(question);
    localStorage.setItem('questions', JSON.stringify(all));
}

function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]');
}

function toCard(question) {
    return `
    <div class="mui--text-black-54">
    ${new Date(question.date).toLocaleDateString()}
    ${new Date(question.date).toLocaleTimeString()}
    </div>
    <div>${question.text}</div>
    <br>
    `;
}