import { getComments, addComment } from './modules/api.js';
import { renderComments } from './modules/renderComments.js';

const commentsList = document.querySelector('.comments');
const nameInput = document.getElementById('name');
const commentInput = document.getElementById('comment');
const loadingIndicator = document.getElementById('loadingIndicator');
const commentLoadingIndicator = document.getElementById('commentLoadingIndicator');
const submitButton = document.getElementById('button');

let comments = [];
let isLoading = false; // Флаг для отслеживания состояния загрузки

// Функция для отображения индикатора загрузки страницы
function showPageLoader() {
    loadingIndicator.style.display = 'block';
}

// Функция для скрытия индикатора загрузки страницы
function hidePageLoader() {
    loadingIndicator.style.display = 'none';
}

// Функция для отображения индикатора загрузки комментария
function showCommentLoader() {
    commentLoadingIndicator.style.display = 'block';
}

// Функция для скрытия индикатора загрузки комментария
function hideCommentLoader() {
    commentLoadingIndicator.style.display = 'none';
}

// Функция delay
export function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

// Функция для загрузки комментариев
async function loadComments() {
    showPageLoader(); // Показываем индикатор загрузки страницы
    try {
        const data = await getComments();
        comments.push(...data);
        renderComments(data, commentsList);
    } catch (error) {
        console.error('Ошибка при загрузке комментариев:', error);
        alert('Не удалось загрузить комментарии');
    } finally {
        hidePageLoader(); // Скрываем индикатор загрузки страницы
    }
}

// Загрузка комментариев при старте приложения
loadComments();

// Обработчик события для добавления комментария
submitButton.addEventListener('click', async () => {
    if (isLoading) return; // Если уже идет загрузка, ничего не делаем

    const name = nameInput.value.trim();
    const text = commentInput.value.trim();

    // Проверка длины имени и текста комментария
    if (name.length < 3) {
        alert('Имя должно содержать не менее 3 символов.');
        return;
    }
    if (text.length < 5) {
        alert('Комментарий должен содержать не менее 5 символов.');
        return;
    }

    isLoading = true; // Устанавливаем флаг загрузки
    showCommentLoader(); // Показываем индикатор загрузки комментария

    try {
        const result = await addComment(name, text);
        
        if (result.success) {
            renderComments(result.comments, commentsList); // Обновляем комментарии
            nameInput.value = '';
            commentInput.value = '';
        }
    } catch (error) {
        console.error('Ошибка при добавлении комментария:', error);
        alert('Проблема с интернет-соединением. Попробуйте позже.');
    } finally {
        hideCommentLoader(); // Скрываем индикатор загрузки комментария
        isLoading = false; // Сбрасываем флаг загрузки
    }
});