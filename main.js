import { getComments, addComment } from './modules/api.js';
import { renderComments } from './modules/renderComments.js';

const commentsList = document.querySelector('.comments');
const nameInput = document.getElementById('name');
const commentInput = document.getElementById('comment');
const loadingIndicator = document.getElementById('loadingIndicator');

let comments = [];

// Функция для отображения лоадера
function showLoader() {
    loadingIndicator.style.display = 'block';
}

// Функция для скрытия лоадера
function hideLoader() {
    loadingIndicator.style.display = 'none';
}

// Функция для загрузки комментариев
async function loadComments() {
    showLoader();
    try {
        const data = await getComments();
        comments.push(...data);
        renderComments(data, commentsList);
    } catch (error) {
        console.error('Ошибка при загрузке комментариев:', error);
        alert('Не удалось загрузить комментарии');
    } finally {
        hideLoader();
    }
}

// Загрузка комментариев при старте приложения
loadComments();

// Обработчик события для добавления комментария
document.getElementById('button').addEventListener('click', async () => {
    const name = nameInput.value.trim();
    const text = commentInput.value.trim();

    if (!name || !text) {
        alert('Пожалуйста, заполните оба поля');
        return;
    }

    showLoader();
    const result = await addComment(name, text);
    hideLoader();

    if (result.success) {
        renderComments(result.comments, commentsList);
        nameInput.value = '';
        commentInput.value = '';
    }
});