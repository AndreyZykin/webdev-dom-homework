import { comments, addComment } from './modules/comments.js';
import { renderComments } from './modules/renderComments.js';
import { setupEventHandlers } from './modules/eventHandlers.js';

const nameInput = document.getElementById('name');
const commentInput = document.getElementById('comment');
const commentsList = document.querySelector('.comments');

renderComments(comments, commentsList);

setupEventHandlers(nameInput, commentInput, addComment, commentsList);