class Entity {
  static URL = ''; // Статическое свойство URL

  static list(data, callback) {
    // Формируем URL для запроса
    const url = this.URL;

    // Выполняем GET запрос через createRequest
    createRequest({
      url: url,
      data: data,
      method: 'GET',
      callback: callback
    });
  }


  // Создаем счёт или доход/расход с помощью запроса на сервер
  static create(data, callback) {
    // Формируем URL для запроса
    const url = this.URL;

    // Выполняем PUT запрос через createRequest
    createRequest({
      url: url,
      data: data,
      method: 'PUT',
      callback: callback
    });
  }

  static remove(data, callback) {
    // Формируем URL для запроса
    const url = this.URL;

    // Выполняем DELETE запрос через createRequest
    createRequest({
      url: url,
      data: data,
      method: 'DELETE',
      callback: callback
    });
  }
}
