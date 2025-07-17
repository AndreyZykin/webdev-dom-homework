export function renderComments(comments, commentsList) {
    commentsList.innerHTML = comments.map((comment, index) => `
        <li class="comment">
            <div class="comment-header">
                <div>${comment.author.name}</div>
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

    document.querySelectorAll('.like-button').forEach(btn => {
        btn.addEventListener('click', function () {
            const index = this.dataset.index;
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