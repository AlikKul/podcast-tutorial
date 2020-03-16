export function isValid(value) {
    if (value.length >= 10 && value.length < 256) {
        return true;
    }
    return false;
}

export function createModal(title, content) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `
        <h1>${title}</h1>
        <div class="modal-content">${content}</div>
    `;

    mui.overlay('on', modal);
}