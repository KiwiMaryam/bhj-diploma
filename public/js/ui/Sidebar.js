class Sidebar {
  // Запускаем initAuthLinks и initToggleButton
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    const toggleButton = document.querySelector('.sidebar-toggle');

    // Проверяем, что кнопка найдена
    if (toggleButton) {
      toggleButton.addEventListener('click', (event) => {
        event.preventDefault();

        const body = document.body;

        // Проверяем наличие классов и переключаем их
        if (body.classList.contains('sidebar-open')) {
          body.classList.remove('sidebar-open');
          body.classList.add('sidebar-collapse');
        } else {
          body.classList.remove('sidebar-collapse');
          body.classList.add('sidebar-open');
        }
      });
    }
  }

  static initAuthLinks() {
    // Находим кнопки для регистрации, входа и выхода
    const registerButton = document.querySelector('.register-link');
    const loginButton = document.querySelector('.login-link');
    const logoutButton = document.querySelector('.logout-link');

    // Обработчик для кнопки "Регистрация"
    if (registerButton) {
      registerButton.addEventListener('click', (event) => {
        event.preventDefault();
        const modal = App.getModal('modal-register'); // Получаем модальное окно регистрации
        modal.open(); // Открываем модальное окно
      });
    }

    // Обработчик для кнопки "Войти"
    if (loginButton) {
      loginButton.addEventListener('click', (event) => {
        event.preventDefault();
        const modal = App.getModal('modal-login'); // Получаем модальное окно входа
        modal.open(); // Открываем модальное окно
      });
    }

    // Обработчик для кнопки "Выйти"
    if (logoutButton) {
      logoutButton.addEventListener('click', (event) => {
        event.preventDefault();
        User.logout((err, response) => {
          if (response && response.success) {
            App.setState('init'); // Меняем состояние приложения
          }
        });
      });
    }
  }
}
