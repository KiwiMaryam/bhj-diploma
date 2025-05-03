class Modal {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не может быть пустым');
    }
    this.element = element;
    this.registerEvents();
  }

  // Метод для регистрации событий на кнопки закрытия
  registerEvents() {
    const closeButtons = this.element.querySelectorAll('[data-dismiss="modal"]');
    closeButtons.forEach(button => {
      button.addEventListener('click', this.onClose.bind(this));
    });
  }

  // Метод, который срабатывает при нажатии на кнопки закрытия
  onClose(e) {
    e.preventDefault(); // Предотвращаем переход по ссылке, если это ссылка
    this.close();
  }

  // Метод для открытия модального окна
  open() {
    this.element.style.display = 'block';
  }

  // Метод для закрытия модального окна
  close() {
    this.element.style.display = '';
  }
}
