document.addEventListener("DOMContentLoaded", function () {
    const clientForm = document.getElementById("clientForm");
    const clientList = document.getElementById("clientList");
    const apiUrl = "http://localhost/API-REST-main/api-rest"; 

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
            });
    }

    clientForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const clientId = document.getElementById("clientId").value;
        const clientName = document.getElementById("clientName").value;
        const clientEmail = document.getElementById("clientEmail").value;
        const clientCity = document.getElementById("clientCity").value;
        const clientTelephone = document.getElementById("clientTelephone").value;

        const url = `${apiUrl}/${clientId ? "update_client.php" : "create_client.php"}?id=${clientId}&name=${encodeURIComponent(clientName)}&email=${encodeURIComponent(clientEmail)}&city=${encodeURIComponent(clientCity)}&telephone=${encodeURIComponent(clientTelephone)}`;
        
        fetch(url)
            .then(response => response.json())
            .then(() => {
                clientForm.reset();
                fetchClients();
            });
    });

    window.editClient = function (id, name, email, city, telephone) {
        document.getElementById("clientId").value = id;
        document.getElementById("clientName").value = name;
        document.getElementById("clientEmail").value = email;
        document.getElementById("clientCity").value = city;
        document.getElementById("clientTelephone").value = telephone;
    };

    window.deleteClient = function (id) {
        fetch(`${apiUrl}/delete_client.php?id=${id}`)
            .then(response => response.json())
            .then(() => fetchClients());
    };

    fetchClients();
});
