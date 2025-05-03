class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  renderAccountsList() {
    // Получаем список активных счетов пользователя
    Account.list({}, (err, response) => {
      if (err) {
        console.error(err);
        return;
      }
      
      const accountsSelect = this.element.querySelector('.accounts-select');
      accountsSelect.innerHTML = '';

      // Заполняем выпадающий список счетов
      response.forEach(account => {
        const option = document.createElement('option');
        option.value = account.id;
        option.textContent = account.name;
        accountsSelect.appendChild(option);
      });
    });
  }

  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (err) {
        console.error(err);
        return;
      }

      this.element.reset();
      const modal = App.getModal('newExpense');
      if (modal) {
        modal.close();
      }
      App.update();
    });
  }
}
