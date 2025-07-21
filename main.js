import { comments, updateComments } from './modules/comments.js';
import { renderComments } from './modules/renderComments.js';
import { setupEventHandlers } from './modules/eventHandlers.js';

const commentsList = document.querySelector('.comments');
const nameInput = document.getElementById('name');
const commentInput = document.getElementById('comment');

let isLoadingComments = false; 
let isAddingComment = false;  

function showLoader() {
  document.querySelector('.loader').style.display = 'block';
}

function hideLoader() {
  document.querySelector('.loader').style.display = 'none';
}

showLoader();
fetch("https://wedev-api.sky.pro/api/v1/:andrey-zykin")
  .then(response => response.json())
  .then(data => {
    newComments(data.comments);
    renderComments(comments, commentsList);
  })
  .catch(error => {
    console.error('Ошибка при загрузке комментариев:', error);
  })
  .finally(() => {
    hideLoader();
  });

setupEventHandlers(nameInput, commentInput, addComment, comments, commentsList);

function addComment(name, text) {
  if (isAddingComment) return; 
  isAddingComment = true;
  showLoader();

  const personalKey = 'andrey-zykin';
  const url = `https://wedev-api.sky.pro/api/v1/${personalKey}/comments`;
  const bodyData = JSON.stringify({ name, text });

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
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
      return fetchComments();
    }
  })
  .then(data => {
    if (data) {
      newComments(data.comments);
      renderComments(comments, commentsList);
    }
  })
  .catch(error => {
    console.error('Ошибка при добавлении комментария:', error);
  })
  .finally(() => {
    hideLoader();
    enableAddButton();
    isAddingComment = false;
    commentInput.value = '';
  });
}

function fetchComments() {
  return fetch("https://wedev-api.sky.pro/api/v1/:andrey-zykin/comments")
    .then(response => response.json());
}

function newComments(commentsArray) {
  comments.length = 0; 
  commentsArray.forEach(comment => comments.push(comment));
}

function disableAddButton() {
  document.querySelector('#addButton').disabled = true;
}

function enableAddButton() {
  document.querySelector('#addButton').disabled = false;
}