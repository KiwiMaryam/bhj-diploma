class LoginForm extends AsyncForm {
  
  onSubmit(data) {
    // Вызов метода User.login с полученными данными
    User.login(data, (err, response) => {
      if (response && response.success) {
        // Если авторизация успешна, сбрасываем форму
        this.element.reset();

        // Устанавливаем состояние приложения на 'user-logged'
        App.setState('user-logged');

        // Закрываем окно, в котором находится форма
        const modal = App.getModal('modal-login');
        if (modal) {
          modal.close();
        }
      } else {
        // Обработка ошибок
        console.error(err || response.error);
      }
    });
  }
}
