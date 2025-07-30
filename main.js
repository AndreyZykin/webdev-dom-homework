import { getComments, addComment } from './modules/api.js';
import { renderComments } from './modules/renderComments.js';
import { setupEventHandlers } from './modules/eventHandlers.js';

const commentsList = document.querySelector('.comments');
const nameInput = document.getElementById('name');
const commentInput = document.getElementById('comment');

let comments = [];


async function loadComments() {
  try {
    const data = await getComments();
    comments.length = 0; 
    comments.push(...data); 
    renderComments(comments, commentsList);
  } catch (error) {
    console.error('Ошибка при загрузке комментариев:', error);
    alert('Не удалось загрузить комментарии');
  }
}

loadComments();

setupEventHandlers(nameInput, commentInput, async () => {
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
}, comments, commentsList);
