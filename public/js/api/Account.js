class Account extends Entity {
  static URL = '/account'; // Статическое свойство URL

  static get(id = '', callback) {
    // Формируем URL для запроса, добавляя идентификатор
    const url = `${this.URL}/${id}`;

    // Выполняем GET запрос через createRequest
    createRequest({
      url: url,
      method: 'GET',
      callback: callback
    });
  }
}
