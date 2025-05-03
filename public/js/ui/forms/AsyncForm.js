class AsyncForm {
  constructor(element) {
    if (!element) {
      throw new Error("Element cannot be empty");
    }
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('submit', (event) => {
      event.preventDefault(); // Запрещаем перезагрузку страницы
      this.submit(); // Вызываем метод submit при успешной отправке
    });
  }

  getData() {
    const formData = new FormData(this.element);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
      data[key] = value; // Заполняем объект данными из формы
    }
    
    return data; // Возвращаем объект с данными
  }

  onSubmit(data) {
  }

  submit() {
    const data = this.getData(); // Получаем данные формы
    this.onSubmit(data); // Вызываем onSubmit с полученными данными
  }
}
