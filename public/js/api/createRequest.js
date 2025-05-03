const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    
    const { url, data, method, callback } = options;
  
    // Формирование URL для GET-запроса
    if (method === 'GET' && data) {
      const queryParams = new URLSearchParams(data).toString();
      xhr.open(method, `${url}?${queryParams}`);
    } else {
      // Открываем соединение для POST и других методов
      xhr.open(method, url);
    }
  
    xhr.responseType = 'json';
  
    // Обработчик события при изменении состояния запроса
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 300) {
          callback(null, xhr.response);
        } else {
          callback(new Error(`Ошибка: ${xhr.status}`), null);
        }
      }
    };
  
    // Отправка данных
    if (method !== 'GET' && data) {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      xhr.send(formData);
    } else {
      xhr.send();
    }
  };
  
