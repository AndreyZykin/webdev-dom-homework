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

function escapeHTML(str) {
    return str.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[m]);
}

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
    renderComments();
    nameInput.value = '';
    commentInput.value = '';
});



    document.querySelectorAll('.like-button').forEach(btn => {
        btn.addEventListener('click', function (event) {
           event.stopPropagation(); 
            const index = this.dataset.index;
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

    document.querySelectorAll('.comment').forEach(commentElement => {
        commentElement.addEventListener('click', function () {
            const index = this.dataset.index;
            const comment = comments[index];
            nameInput.value = comment.name;
            commentInput.value = `> ${comment.text}\n`;
            commentInput.focus();
        });
    });


renderComments();