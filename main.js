import { getComments, addComment } from './modules/api.js';
import { renderComments } from './modules/renderComments.js';

const commentsList = document.querySelector('.comments');
const nameInput = document.getElementById('name');
const commentInput = document.getElementById('comment');
const loadingIndicator = document.getElementById('loadingIndicator');
const commentLoadingIndicator = document.getElementById('commentLoadingIndicator');
const submitButton = document.getElementById('button');
const loginButton = document.getElementById('loginButton');
const loginForm = document.getElementById('loginForm');
const addForm = document.getElementById('addForm');

let comments = [];
let isLoading = false;
let token = null;

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
    showPageLoader();
    try {
        const data = await getComments();
        comments.push(...data);
        renderComments(data, commentsList);
    } catch (error) {
        console.error('Ошибка при загрузке комментариев:', error);
        alert('Не удалось загрузить комментарии');
    } finally {
        hidePageLoader();
    }
}

// Обработчик события для авторизации
loginButton.addEventListener('click', async () => {
    const username = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    // Проверка логина и пароля
    if (username === 'admin' && password === 'admin') {
        alert('Вы успешно авторизованы!');
        loginForm.style.display = 'none'; // Скрываем форму входа
        addForm.style.display = 'block'; // Показываем форму добавления комментариев
        await loadComments(); // Загружаем комментарии
    } else {
        alert('Неправильный логин или пароль. Попробуйте снова.');
    }
});

// Обработчик события для добавления комментария
submitButton.addEventListener('click', async () => {
    if (isLoading) return;

    const text = commentInput.value.trim();

    // Проверка длины текста комментария
    if (text.length < 3) {
        alert('Комментарий должен содержать не менее 3 символов.');
        return;
    }

    isLoading = true;
    showCommentLoader();

    // Имитация задержки перед добавлением комментария
    await delay(2000); // Задержка в 2 секунды для имитации запроса к API

    const result = await addComment(token, text);
    hideCommentLoader();
    isLoading = false;

    if (result.success) {
        renderComments(await getComments(), commentsList); // Обновляем комментарии
        commentInput.value = ''; // Очищаем поле ввода
    }
});