import { comments, addComment } from './modules/comments.js';
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





setupEventHandlers(nameInput, commentInput, addComment, commentsList);