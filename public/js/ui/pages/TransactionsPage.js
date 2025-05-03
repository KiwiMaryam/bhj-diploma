class TransactionsPage {
  constructor(element) {
    if (!element) {
      throw new Error("Element cannot be empty");
    }
    this.element = element;
    this.lastOptions = {}; // для хранения последних опций
    this.registerEvents();
  }

  update() {
    if (!this.lastOptions) return;
    this.render(this.lastOptions);
  }

  // Регистрируем события для удаления транзакций и счета
  registerEvents() {
    const removeAccountButton = this.element.querySelector('.remove-account');
    if (removeAccountButton) {
      removeAccountButton.addEventListener('click', () => this.removeAccount());
    }

    this.element.addEventListener('click', (event) => {
      if (event.target.classList.contains('transaction__remove')) {
        const transactionId = event.target.dataset.id;
        this.removeTransaction(transactionId);
      }
    });
  }

  // Удаляем счет
  removeAccount() {
    if (!this.lastOptions) return; // ничего не делаем, если lastOptions не задан
    if (confirm("Вы действительно хотите удалить счёт?")) {
      Account.remove(this.lastOptions.account_id, (err, response) => {
        if (response && response.success) {
          App.updateWidgets(); // обновляем виджеты
          App.updateForms(); // обновляем формы
        }
      });
    }
  }

  // Удаляем конкретную транзакцию
  removeTransaction(id) {
    if (confirm("Вы действительно хотите удалить эту транзакцию?")) {
      Transaction.remove(id, (err, response) => {
        if (response && response.success) {
          this.update(); // обновляем текущую страницу
        }
      });
    }
  }

  // Отрисовываем содержимое страницы
  render(options) {
    if (!options) return; // ничего не делаем, если опции не заданы
    this.lastOptions = options; // сохраняем последние опции

    Account.get(options.account_id, (err, response) => {
      if (response && response.name) {
        this.renderTitle(response.name); // отрисовываем заголовок
      }
    });

    Transaction.list(options.account_id, (err, response) => {
      if (response && response.length) {
        this.renderTransactions(response); // отрисовываем транзакции
      }
    });
  }

  // Очищаем страницу
  clear() {
    const content = this.element.querySelector('.content');
    content.innerHTML = ''; // очищаем содержимое
  }

  // Отрисовываем заголовок
  renderTitle(name) {
    const title = this.element.querySelector('.content-title');
    title.innerHTML = name; // устанавливаем имя счёта
  }

  // Форматируем дату
  formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleString('ru-RU', options); // форматируем дату
  }

  // Формируем HTML-код транзакции
  getTransactionHTML(item) {
    const transactionClass = item.type === 'expense' ? 'transaction_expense' : 'transaction_income';
    return `
      <div class="transaction ${transactionClass} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <div class="transaction__date">${this.formatDate(item.created_at)}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
            ${item.sum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
          </button>
        </div>
      </div>
    `;
  }

  // Отрисовываем список транзакций
  renderTransactions(data) {
    const content = this.element.querySelector('.content');
    content.innerHTML = ''; // очищаем старые транзакции
    data.forEach(item => {
      content.innerHTML += this.getTransactionHTML(item); // добавляем новые транзакции
    });
  }
}
