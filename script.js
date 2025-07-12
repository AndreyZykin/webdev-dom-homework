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