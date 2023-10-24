document.getElementById("createButton").addEventListener("click", function () {

    var id_client = document.getElementById("id_client").value;
    var id_vehicle = document.getElementById("id_vehicle").value;
    var rental_init_date = document.getElementById("start_date").value;
    var rental_end_date = document.getElementById("end_date").value;
    var init_milieage = document.getElementById("init_milieage").value;    
    var rental_fee = document.getElementById("rental_fee").value;  

    var rentData = {
        "id_client": id_client,
        "id_vehicle": id_vehicle,
        "rental_init_date": rental_init_date,
        "rental_end_date": rental_end_date,
        "init_milieage": init_milieage,
        "rental_fee": rental_fee
    }
    console.log(rentData)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(rentData),
        redirect: 'follow'
    };

    fetch("http://localhost:4000/api/project/pf_rent/", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            if (result.success) {
                window.location.href = "rental-list.html";
            }
        })
        .catch(error => console.log('error', error));

    $('#product_add_modal').modal('hide');
    // window.location.href = "rental-list.html";
});