let users = [];
let isSorted = false;

// Fetch API Context Data stream
function getUsers() {
    $("#loading").show();
    
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            users = data;
            displayUsers(users);
            $("#loading").hide();
        })
        .catch(function(error) {
            $("#loading").html(`
                <div class="text-danger p-4">
                    <i class="fa-solid fa-circle-exclamation display-4 mb-2"></i>
                    <p class="fw-bold">Synchronization Failure</p>
                    <button class="btn btn-sm btn-outline-danger mt-2" onclick="getUsers()">Retry Connection</button>
                </div>
            `);
            console.log(error);
        });
}

// Render dynamic User elements to structural DOM containers
function displayUsers(data) {
    $("#userContainer").html("");
    $("#count").text(data.length);

    // Dynamic verification matching query output criteria lengths
    if (data.length == 0) {
        $("#userContainer").html(`
            <div class="col-12 empty-state text-center">
                <i class="fa-solid fa-user-slash display-4 mb-3 opacity-50"></i>
                <h3>No Directory Matches Found</h3>
                <p class="small">Refine filter inputs or structural configurations</p>
            </div>
        `);
        return;
    }

    data.forEach(function(user) {
        let card = `
            <div class="col-xl-4 col-md-6">
                <div class="card user-card p-4 text-center">
                    <div class="avatar-wrapper mb-3">
                        <img src="https://i.pravatar.cc/150?img=${user.id}" class="card-img-top" alt="${user.name}">
                    </div>
                    <div class="card-body p-0">
                        <h4 class="mb-3">${user.name}</h4>
                        <div class="card-info-text">
                            <i class="fa-regular fa-envelope"></i>
                            <span>${user.email}</span>
                        </div>
                        <div class="card-info-text">
                            <i class="fa-solid fa-phone-flip"></i>
                            <span>${user.phone}</span>
                        </div>
                        <div>
                            <span class="company-badge">
                                <i class="fa-solid fa-briefcase me-1 opacity-75"></i> ${user.company.name}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $("#userContainer").append(card);
    });
}

// Realtime operational user runtime sorting listeners
$("#searchBox").keyup(function() {
    let value = $(this).val().toLowerCase();
    let filtered = users.filter(function(user) {
        return user.name.toLowerCase().includes(value);
    });
    displayUsers(filtered);
});

// Structural Alphabetical sorting function handlers
$("#sortBtn").click(function() {
    if (!isSorted) {
        users.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
        $(this).addClass("active-sort").html('<i class="fa-solid fa-sort-alpha-up me-2"></i>Sorted A-Z');
        isSorted = true;
    } else {
        // Revert to initial base ID metric array sort order on double click
        users.sort(function(a, b) { return a.id - b.id; });
        $(this).removeClass("active-sort").html('<i class="fa-solid fa-sort-alpha-down me-2"></i>Sort Alphabetical (A-Z)');
        isSorted = false;
    }
    displayUsers(users);
});

// Initialize environment procedures
$(document).ready(function() {
    getUsers();
});