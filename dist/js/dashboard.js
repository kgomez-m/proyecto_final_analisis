var api_url = "http://localhost:4000/api/project/pf_dashboard/";
const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

dashboard = {
    init: function () {
        dashboard.vehicle_summary();
        dashboard.rent_summary();
        dashboard.rent_summary_by_status();
        dashboard.invoice_summary();
    },

    vehicle_summary: function () {
        fetch(api_url + 'vehicle-summary')
            .then(response => {
                if (!response.ok) {
                    throw new Error('La solicitud de la API falló');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    dashboard.counter("count-total-cars", data.response[0].total_cars)
                    dashboard.counter("count-rents", data.response[0].total_cars_reserved)
                    dashboard.counter("count-available", data.response[0].total_cars_available)
                    dashboard.counter("count-maintenance", data.response[0].total_cars_maintenance)
                }
            })
            .catch(error => {
                console.error('Error al obtener información de vehículos:', error);
            });
    },

    rent_summary: function () {
        fetch(api_url + 'rent-summary')
            .then(response => {
                if (!response.ok) {
                    throw new Error('La solicitud de la API falló');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    data.response.forEach(last_rent => {
                        $("#tb-last-rents").append(`<tr id="id_billing-${last_rent.id_rent}">                            
                            <td>
                                <img src="${last_rent.image}" alt="" class="img-thumbnail" />
                            </td>
                            <td>
                                <h3 class="td-title">${last_rent.vehicle_brand}</h3>
                                <h3 class="td-value">${last_rent.vehicle_model_year}</h3>
                            </td>
                            <td>
                                <h3 class="td-title">Inicio</h3>
                                <h3 class="td-value">${dashboard.format_date(last_rent.rental_init_date)}</h3>
                            </td>
                            <td>
                                <h3 class="td-title">Fin</h3>
                                <h3 class="td-value">${dashboard.format_date(last_rent.rental_end_date)}</h3>
                            </td>
                            <td>${dashboard.rental_status(last_rent.rental_status)}</td>
                        </tr>`)
                    });
                }
            })
            .catch(error => {
                console.error('Error al obtener información de vehículos:', error);
            });
    },

    rental_status: function (_rental_status) {
        if (_rental_status == "Creado") {
            return `<span class="label label-primary">${_rental_status}</span>`
        } else if (_rental_status == "En Curso") {
            return `<span class="label label-success">${_rental_status}</span>`
        } else if (_rental_status == "Finalizado") {
            return `<span class="label label-default">${_rental_status}</span>`
        } else {
            return `<span class="label label-danger">${_rental_status}</span>`
        }
    },

    rent_summary_by_status: function () {
        fetch(api_url + 'rent-summary/by-status')
            .then(response => {
                if (!response.ok) {
                    throw new Error('La solicitud de la API falló');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    let rent_summary_pie_data = [];

                    data.response.map(item => {
                        rent_summary_pie_data.push({ label: item.rental_status, value: item.total_rents })
                    })

                    Morris.Donut({
                        element: 'pie-chart',
                        data: rent_summary_pie_data
                    });
                }
            })
            .catch(error => {
                console.error('Error al obtener información de vehículos:', error);
            });
    },

    invoice_summary: function () {
        fetch(api_url + 'invoice-summary')
            .then(response => {
                if (!response.ok) {
                    throw new Error('La solicitud de la API falló');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    // console.log("invoice_summary", data);
                    let invoice_summary_line_chart_data = [];

                    $("#total-revenue").html("Q" + data.response[0].revenue)
                    $("#total-orders").html(data.response[0].total_orders)
                    data.response[0].orders_current_month.map(item => {
                        invoice_summary_line_chart_data.push({ period: dashboard.format_date(item.invoice_created), Q: item.total_invoice })
                    })
                    
                    Morris.Line({
                        element: 'sales-chart',
                        data: invoice_summary_line_chart_data,
                        lineColors: ['#0b62a4'],
                        xkey: 'period',
                        ykeys: ['Q'],
                        labels: ['Q'],
                        xLabels: 'day',
                        resize: true
                    });
                }
            })
            .catch(error => {
                console.error('Error al obtener información de vehículos:', error);
            });
    },

    format_date: function (_date_value) {
        // let { date, date_format, date_formatted } = "";

        // date = _date_value;
        // date_format = new Date(date)
        // date_formatted = date_format.toLocaleDateString("es-CL", options);

        var d = new Date(_date_value),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    },

    counter: function (elementId, limit) {
        let counts = setInterval(updated);
        let upto = 0;
        function updated() {
            let count = document.getElementById(elementId);
            count.innerHTML = ++upto;
            if (upto === limit) {
                clearInterval(counts);
            }
        }
    }
}
$(document).ready(function () {
    dashboard.init();
});