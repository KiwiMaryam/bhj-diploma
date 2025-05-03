class UserWidget {
  constructor(element) {
    // Проверяем, что переданный элемент не пустой
    if (!element) {
      throw new Error("Element cannot be empty");
    }
    // Сохраняем элемент в свойство
    this.element = element;
    // Обновляем информацию о пользователе при инициализации
    this.update();
  }

  update() {
    // Получаем информацию о текущем пользователе
    const user = User.current();
    
    // Проверяем, авторизован ли пользователь
    if (user) {
      // Устанавливаем имя пользователя в элементе с классом .user-name
      this.element.querySelector('.user-name').textContent = user.name;
    } else {
      this.element.querySelector('.user-name').textContent = '';
    }
  }
}
