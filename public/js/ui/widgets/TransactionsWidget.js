class TransactionsWidget {
  constructor(element) {
    if (!element) {
      throw new Error("Element cannot be empty");
    }
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    // Находим кнопки для добавления дохода и расхода
    const createIncomeButton = this.element.querySelector('.create-income-button');
    const createExpenseButton = this.element.querySelector('.create-expense-button');

    // Проверяем, что кнопки найдены
    if (createIncomeButton) {
      createIncomeButton.addEventListener('click', () => {
        // Открываем модальное окно для создания нового дохода
        App.getModal('modal-new-income').open();
      });
    }

    if (createExpenseButton) {
      createExpenseButton.addEventListener('click', () => {
        // Открываем модальное окно для создания нового расхода
        App.getModal('modal-new-expense').open();
      });
    }
  }
}
