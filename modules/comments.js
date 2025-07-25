export const comments = [
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

export function addComment(name, text) {
    comments.push({
        name: escapeHTML(name),
        text: escapeHTML(text),
        date: new Date().toLocaleString(),
        likes: 0,
        isLiked: false,
    });
    async function handleAddComment() {
  const name = nameInput.value.trim();
  const text = commentInput.value.trim();

  if (!name || !text) {
    alert('Пожалуйста, заполните оба поля');
    return;
  }

  const result = await addComment(name, text);
  
  if (result.success) {
    await loadComments();
    
    nameInput.value = '';
    commentInput.value = '';
  }
}
}

export const updateComments = (newComments) => {
    comments = newComments
}

function escapeHTML(str) {
    return str.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    })[m]);
}