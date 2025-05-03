class User {
  static URL = '/user'; // Статическое свойство URL

  // Устанавливает авторизованного пользователя в локальное хранилище
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Удаляет авторизованного пользователя из локального хранилища
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  // Возвращает текущего авторизованного пользователя
  static current() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : undefined;
  }

  // Извлекает данные о текущем авторизованном пользователе
  static fetch(callback) {
    createRequest({
      url: this.URL + '/current',
      method: 'GET',
      callback: (err, response) => {
        if (response && response.success) {
          this.setCurrent(response.user); // Обновляем данные текущего пользователя
        } else {
          this.unsetCurrent(); // Удаляем данные о пользователе, если он не авторизован
        }
        callback(err, response);
      }
    });
  }

  // Авторизация пользователя
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.success) {
          this.setCurrent(response.user); // Устанавливаем текущего пользователя
        }
        callback(err, response);
      }
    });
  }

  // Регистрация пользователя
  static register(data, callback) {
    createRequest({
      url: this.URL + '/register',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.success) {
          this.setCurrent(response.user); // Устанавливаем текущего пользователя
        }
        callback(err, response);
      }
    });
  }

  // Выход из системы
  static logout(callback) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      callback: (err, response) => {
        if (response && response.success) {
          this.unsetCurrent(); // Удаляем данные о пользователе при выходе
        }
        callback(err, response);
      }
    });
  }
}
