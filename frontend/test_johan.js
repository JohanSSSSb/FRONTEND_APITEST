document.addEventListener("DOMContentLoaded", function () {
    const clientForm = document.getElementById("clientForm");
    const clientList = document.getElementById("clientList");
    const cancelButton = document.getElementById("cancelButton");
    const apiUrl = "http://localhost/FRONTEND_APITEST/api-rest";

    function fetchClients() {
        fetch(`${apiUrl}/get_all_client.php`)
            .then(response => response.json())
            .then(data => {
                clientList.innerHTML = "";
                data.forEach(client => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${client.id}</td>
                        <td>${client.name}</td>
                        <td>${client.email}</td>
                        <td>${client.city}</td>
                        <td>${client.telephone}</td>
                        <td>
                            <button onclick="editClient(${client.id}, '${client.name}', '${client.email}', '${client.city}', '${client.telephone}')">Edit</button>
                            <button onclick="deleteClient(${client.id})">Delete</button>
                        </td>
                    `;
                    clientList.appendChild(row);
                });
            })
            .catch(error => console.error("Error fetching clients:", error));
    }

    clientForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const clientId = document.getElementById("clientId").value;
        const clientName = document.getElementById("clientName").value;
        const clientEmail = document.getElementById("clientEmail").value;
        const clientCity = document.getElementById("clientCity").value;
        const clientTelephone = document.getElementById("clientTelephone").value;

        const url = clientId ? `${apiUrl}/update_client.php` : `${apiUrl}/create_client.php`;

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: clientId,
                name: clientName,
                email: clientEmail,
                city: clientCity,
                telephone: clientTelephone
            })
        })
        .then(response => response.json())
        .then(() => {
            clientForm.reset();
            fetchClients();
        })
        .catch(error => console.error("Error saving client:", error));
    });

    window.editClient = function (id, name, email, city, telephone) {
        document.getElementById("clientId").value = id;
        document.getElementById("clientName").value = name;
        document.getElementById("clientEmail").value = email;
        document.getElementById("clientCity").value = city;
        document.getElementById("clientTelephone").value = telephone;
    };

    window.deleteClient = function (id) {
        fetch(`${apiUrl}/delete_client.php?id=${id}`, { method: "DELETE" })
            .then(response => response.json())
            .then(() => fetchClients())
            .catch(error => console.error("Error deleting client:", error));
    };

    cancelButton.addEventListener("click", function () {
        clientForm.reset();
    });

    fetchClients();
});
