class RegisterForm extends AsyncForm {
  onSubmit(data) {
    // Вызываем метод User.register для регистрации пользователя
    User.register(data, (err, response) => {
      if (response && response.success) {
        // Если регистрация успешна, сбрасываем форму
        this.element.reset();

        // Устанавливаем состояние приложения на 'user-logged'
        App.setState('user-logged');

        // Закрываем модальное окно, в котором находится форма
        const modal = App.getModal('register');
        if (modal) {
          modal.close();
        }
      } else {
        // Если произошла ошибка, можно обработать её (например, показать сообщение)
        console.error(err || response.error);
      }
    });
  }
}
