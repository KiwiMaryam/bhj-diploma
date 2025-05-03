class Transaction extends Entity {
    static URL = '/transaction'; // Статическое свойство URL
  
    /**
     @param {string} id // Идентификатор транзакции
     @param {function} callback // Функция обратного вызова
     */
    static get(id = '', callback) {
      // Формируем URL для запроса с добавлением идентификатора
      const url = `${this.URL}/${id}`;
  
      // Выполняем GET запрос через createRequest
      createRequest({
        url: url,
        method: 'GET',
        callback: callback
      });
    }
  }
  