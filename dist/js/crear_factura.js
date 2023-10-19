document.getElementById("createButton").addEventListener("click", function () {

    var id_rent = document.getElementById("id_rent").value;
    var payment_method = document.getElementById("payment_method").value;
    var total_invoice = document.getElementById("total_invoice").value;
    var rental_details = document.getElementById("rental_details").value;
    var taxes = document.getElementById("taxes").value;    

    var billData = {
        "id_rent": id_rent,
        "payment_method": payment_method,
        "total_invoice": total_invoice,
        "rental_details": rental_details,
        "taxes": taxes
    }
    console.log(billData)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(billData),
        redirect: 'follow'
    };

    fetch("http://localhost:5000/api/project/pf_billing/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    $('#product_add_modal').modal('hide');
    window.location.href = "rental-invoice.html";
});