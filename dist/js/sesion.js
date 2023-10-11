function sesion() {
    if (!localStorage.getItem('id_user')) {
        window.location.href = 'index.html';
    }
}