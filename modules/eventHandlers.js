import { comments, addComment } from './comments.js';
import { renderComments } from './renderComments.js';

export function setupEventHandlers(nameInput, commentInput, addCommentFn, comments, commentsList) {
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

      addCommentFn(name, text)
            .then(() => {
                renderComments(comments, commentsList);
                nameInput.value = '';
                commentInput.value = '';
            })
            .catch((err) => {
                console.error('Ошибка при добавлении:', err);
                alert('Не удалось добавить комментарий');
            });
    });
}