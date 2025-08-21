const personalKey = 'andrey-zykin';
let token = null;

export async function login(username, password) {
    const response = await fetch('https://wedev-api.sky.pro/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: username, password }), // Передаем логин и пароль
    });

    if (response.ok) {
        const data = await response.json();
        token = data.user.token; // Сохраняем токен
        return { success: true, token }; // Возвращаем токен
    } else {
        const errorData = await response.json();
        alert(`Ошибка авторизации: ${errorData.error || 'Неизвестная ошибка'}`);
        return null; // Возвращаем null в случае ошибки
    }
}

export async function getComments() {
    const response = await fetch(`https://wedev-api.sky.pro/api/v2/${personalKey}/comments`);
    if (!response.ok) {
        throw new Error('Ошибка при получении комментариев');
    }
    const data = await response.json();
    return data.comments; 
}

export async function addComment(token, text) {
    const url = `https://wedev-api.sky.pro/api/v2/${personalKey}/comments`;
    const bodyData = JSON.stringify({ text });

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: bodyData,
    });

    if (res.status === 201) {
        return { success: true };
    } else if (res.status === 400) {
        const data = await res.json();
        alert(`Ошибка: ${data.error}`);
        return { success: false };
    } else {
        alert('Ошибка сервера. Попробуйте позже.');
        return { success: false };
    }
}