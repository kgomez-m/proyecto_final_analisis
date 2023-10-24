document.addEventListener('click', function (event) {

    if (event.target.id.startsWith('deleteButton')) {
      var buttonId = event.target.id;
      var index = buttonId.replace('deleteButton', '');
      console.log('Se hizo clic en el botón con índice ' + index);
  
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      };
  
      fetch(`http://localhost:4000/api/project/pf_user/${index}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  
      $('#deleteModal' + index).modal('hide');
      window.location.href = "admin-user.html";
    }
  });