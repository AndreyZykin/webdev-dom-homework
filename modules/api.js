const personalKey = 'andrey-zykin';

export async function getComments() {
  const response = await fetch(`https://wedev-api.sky.pro/api/v1/${personalKey}/comments`);
  if (!response.ok) {
    throw new Error('Ошибка при получении комментариев');
  }
  const data = await response.json();
  return data.comments; 
}

export async function addComment(name, text) {
  const url = `https://wedev-api.sky.pro/api/v1/${personalKey}/comments`;
  const bodyData = JSON.stringify({ name, text });
  
  const res = await fetch(url, {
    method: 'POST',
    body: bodyData,
  });
  
  if (res.status === 201) {
     const updatedComments = await getComments();
    return { success: true, comments: updatedComments };
  } else if (res.status === 400) {
    const data = await res.json();
    alert(`Ошибка: ${data.error}`);
    return { success: false };
  } else if (res.status === 500) {
    alert('Ошибка сервера. Попробуйте позже.');
    return { success: false };
  } else {
    alert('Неизвестная ошибка.');
    return { success: false };
  }
}