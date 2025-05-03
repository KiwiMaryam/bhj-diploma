class AccountsWidget {
  constructor(element) {
    if (!element) {
      throw new Error("Element cannot be empty");
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  registerEvents() {
    // Обработчик нажатия на кнопку создания счета
    const createAccountButton = this.element.querySelector('.create-account');
    if (createAccountButton) {
        createAccountButton.addEventListener('click', (event) => {
            event.preventDefault(); // предотвращаем переход по ссылке
            const modal = App.getModal('newAccount'); // Получаем модальное окно для создания нового счета
            modal.open(); // Открываем модальное окно
        });
    }

    // Обработчик нажатия на существующие счета
    this.element.addEventListener('click', (event) => {
        const accountElement = event.target.closest('.account');
        if (accountElement) {
            this.onSelectAccount(accountElement); // Вызываем метод для выбора счета
        }
    });
}


  update() {
    if (!User.current()) return; // Проверка авторизации

    Account.list({}, (err, response) => {
      if (response && response.success) {
        this.clear();
        response.data.forEach(account => {
          this.renderItem(account);
        });
      } else {
        console.error(err);
      }
    });
  }

  clear() {
    const accounts = this.element.querySelectorAll('.account');
    accounts.forEach(account => account.remove());
  }

  onSelectAccount(accountElement) {
    const activeAccount = this.element.querySelector('.account.active');
    if (activeAccount) {
      activeAccount.classList.remove('active');
    }

    accountElement.classList.add('active');
    const accountId = accountElement.dataset.id;
    App.showPage('transactions', { account_id: accountId });
  }

  getAccountHTML(account) {
    return `
      <li class="account" data-id="${account.id}">
        <a href="#">
          <span>${account.name}</span> /
          <span>${account.sum.toFixed(2)} ₽</span>
        </a>
      </li>
    `;
  }

  renderItem(account) {
    const html = this.getAccountHTML(account);
    this.element.insertAdjacentHTML('beforeend', html);
  }
}
