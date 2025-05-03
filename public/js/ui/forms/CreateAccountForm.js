class CreateAccountForm extends AsyncForm {
  onSubmit(data) {
    // Отправляем запрос на создание счёта
    Account.createRequest(data, (err, response) => {
      if (response && response.success) {
        // Закрываем модальное окно
        const modal = App.getModal('modal-new-account');
        modal.close();

        // Сбрасываем форму
        this.element.reset();

        // Обновляем состояние приложения
        App.update();
      } else {
        console.error(err); // Обработка ошибок, если они есть
      }
    });
  }
}
