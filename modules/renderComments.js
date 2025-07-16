export function renderComments(comments, commentsList) {
    commentsList.innerHTML = comments.map((comment, index) => `
        <li class="comment">
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
        btn.addEventListener('click', function () {
            const index = this.dataset.index;
            // Инвертируем isLiked и изменяем likes
            if (!comments[index].isLiked) {
                comments[index].likes += 1;
                comments[index].isLiked = true;
            } else {
                comments[index].likes -= 1;
                comments[index].isLiked = false;
            }
            renderComments(comments, commentsList);
        });
    });
}