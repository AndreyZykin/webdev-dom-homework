import { comments, addComment } from './comments.js';
import { renderComments } from './renderComments.js';

export function setupEventHandlers(nameInput, commentInput, addComment, commentsList) {
    const addButton = document.getElementById('button');

    addButton.addEventListener('click', function () {
        const name = nameInput.value.trim();
        const text = commentInput.value.trim();

        if (!name) {
            alert('Пожалуйста, введите Ваше имя.');
            return;
        }
        if (!text) {
            alert('Пожалуйста, введите текст комментария.');
            return;
        }

        addComment(name, text); 
        renderComments(comments, commentsList); 

        
        nameInput.value = '';
        commentInput.value = '';
    });
}