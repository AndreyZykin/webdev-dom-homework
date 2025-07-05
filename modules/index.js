   // Стейт всех комментариев:
    const comments = [
        {
            name: "Глеб Фокин",
            text: "Это будет первый комментарий на этой странице",
            date: "12.02.22 12:18",
            likes: 3,
            isLiked: false,
        },
        {
            name: "Варвара Н.",
            text: "Мне нравится как оформлена эта страница! ❤",
            date: "13.02.22 19:22",
            likes: 75,
            isLiked: true,
        },
    ];

    const nameInput = document.getElementById('name');
    const commentInput = document.getElementById('comment');
    const addButton = document.getElementById('button');
    const commentsList = document.querySelector('.comments');

   // Экранирование html-спецсимволов
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[m]);
}

// Добавляем комментарий
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

    comments.push({
        name: escapeHTML(name),
        text: escapeHTML(text),
        date: new Date().toLocaleString(),
        likes: 0,
        isLiked: false,
    });

    // После push сразу рендерим
    renderComments();

    // Очищаем поля
    nameInput.value = '';
    commentInput.value = '';
});

// Рендерим все комментарии
function renderComments() {
    commentsList.innerHTML = comments.map((comment, index) => `
        <li class="comment" data-index="${index}">
            <div class="comment-header">
                <div>${comment.name}</div>
                <div>${comment.date}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">${comment.text}</div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">${comment.likes}</span>
                    <button class="like-button${comment.isLiked ? ' -active-like' : ''}" data-index="${index}"></button>
                </div>
            </div>
        </li>
    `).join('');

    // После рендера навешиваем обработчики на кнопки
    document.querySelectorAll('.like-button').forEach(btn => {
        btn.addEventListener('click', function (event) {
           event.stopPropagation(); 
            const index = this.dataset.index;
            // Инвертируем isLiked и изменяем likes
            if (!comments[index].isLiked) {
                comments[index].likes += 1;
                comments[index].isLiked = true;
            } else {
                comments[index].likes -= 1;
                comments[index].isLiked = false;
            }
            renderComments();
        });
    });

    // Добавляем обработчик клика на комментарии для ответа
    document.querySelectorAll('.comment').forEach(commentElement => {
        commentElement.addEventListener('click', function () {
            const index = this.dataset.index;
            const comment = comments[index];
            nameInput.value = comment.name;
            commentInput.value = `> ${comment.text}\n`; // Добавляем символ ">" перед текстом
            commentInput.focus();
        });
    });
}

// Инициализация рендеринга при загрузке страницы
renderComments();