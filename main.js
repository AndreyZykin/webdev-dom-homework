import { comments, updateComments } from './modules/comments.js';
import { renderComments } from './modules/renderComments.js';
import { setupEventHandlers } from './modules/eventHandlers.js';

const commentsList = document.querySelector('.comments');
const nameInput = document.getElementById('name');
const commentInput = document.getElementById('comment');

function newComments(commentsArray) {
    comments.length = 0;
    comments.push(...commentsArray);
}

fetch("https://wedev-api.sky.pro/api/v1/:andrey-zykin/comments").then(response => {
    return response.json()
}).then(data => {
    newComments(data.comments)
    renderComments(comments, commentsList);
})


setupEventHandlers(nameInput, commentInput, addComment, comments, commentsList);

function addComment(name, text) {
  const personalKey = 'andrey-zykin';
  const url = `https://wedev-api.sky.pro/api/v1/${personalKey}/comments`;

  const bodyData = JSON.stringify({ name, text });
  console.log('Отправляем данные:', bodyData);

  return fetch(url, {
    method: 'POST',
    body: bodyData,
  })
  .then(res => {
    if (res.status === 201) {
      return { success: true };
    } else if (res.status === 400) {
      return res.json().then(data => {
        console.error('Ошибка API:', data);
        alert(`Ошибка: ${data.error}`);
        return { success: false };
      });
    } else if (res.status === 500) {
      alert('Ошибка сервера. Попробуйте позже.');
      return { success: false };
    } else {
      alert('Неизвестная ошибка.');
      return { success: false };
    }
  })
  .then(result => {
    if (result.success) {
      const newComment = {
        name,
        text,
        date: new Date().toISOString().slice(0,10),
        likes: 0,
        isLiked: false,
      };
      comments.push(newComment);
      renderComments(comments, commentsList);
    }
  });
}