import { escapeHTML } from './comments.js';
import { delay } from '../main.js';

export function renderComments(comments, commentsList) {
    commentsList.innerHTML = comments.map((comment, index) => {
        const formattedDate = new Date(comment.date)
            .toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
            .replace(/\./g, '.')
            .replace(/,/g, ', ');

        return `
        <li class="comment">
            <div class="comment-header">
                <div>${escapeHTML(comment.author.name)}</div>
                <div>${formattedDate}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">${escapeHTML(comment.text)}</div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">${comment.likes}</span>
                    <button class="like-button${comment.isLiked ? ' -active-like' : ''}" data-index="${index}">
                    </button>
                </div>
            </div>
        </li>`;
    }).join('');

    document.querySelectorAll('.like-button').forEach(btn => {
        btn.addEventListener('click', async function () {
            const index = this.dataset.index;
            const comment = comments[index];

            // Добавляем класс для анимации
            this.classList.add('-loading-like');

            // Запускаем задержку
            await delay(2000); // Задержка в 2 секунды

            // Обновляем состояние лайка
            comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
            comment.isLiked = !comment.isLiked;

            // Убираем класс анимации
            this.classList.remove('-loading-like');

            // Обновляем отображение комментариев
            renderComments(comments, commentsList);
        });
    });
}