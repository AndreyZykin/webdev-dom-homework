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

        addComment(name, text); // Добавляем комментарий
        renderComments(comments, commentsList); // Рендерим комментарии

        // Очищаем поля
        nameInput.value = '';
        commentInput.value = '';
    });
}