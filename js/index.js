// const { create } = require("joi/lib/ref");

// function for signing/register admin
function createAccount(event) {
    event.preventDefault();
    // triggers the spining animation
    const spinItem = document.querySelector(".spin");
    spinItem.style.display = "inline-block";
    const getName = document.getElementById("name").value;
    const getEmail = document.getElementById("email").value;
    const getPassword = document.getElementById("password").value;
    const getConfirm = document.getElementById("confirmPassword").value;
    // validation
    if (getName === "" || getEmail === "" || getPassword === "" || getConfirm === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: "#b93737"
        })
        spinItem.style.display = "none";
        return;
    }
    if (getConfirm !== getPassword) {
        Swal.fire({
            icon: 'warning',
            text: 'Passwords don\'t match',
            confirmButtonColor: "#b93737"
        })
        spinItem.style.display = "none";
        return;
    }
    // calling API
    const signData = {
        name: getName,
        email: getEmail,
        password: getPassword,
        confirmPassword: getConfirm
    }
    const signMethod = {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(signData)
    }
    const url = "http://localhost:3001/byc/api/users";
    fetch(url, signMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result._id) {
            Swal.fire({
                icon: 'success',
                text: "Registration Successful",
                confirmButtonColor: "#2D85DE"
            })  
            setTimeout(() => {
                location.href = "index.html"
            }, 4000)
        }   
        else {
            Swal.fire({
                icon: 'info',
                text: "registration failed, please try again",
                confirmButtonColor: "#2D85DE"
            })
            spinItem.style.display = "none";
        }   
    })
    .catch(error => {
        console.log('error', error)
        Swal.fire({
            icon: 'info',
            text: `An error occurred. Please try again.`,
            confirmButtonColor: "#2D85DE"
        })
        spinItem.style.display = "none";
    });
}

// function for Login
function logIn(event) {
    event.preventDefault();

        // start spinning animation
    const spinItem = document.querySelector(".spin");
    spinItem.style.display = "inline-block";

    const getEmail = document.getElementById("email").value;
    const getPassword = document.getElementById("password").value;

    // validation
if(getEmail === "" || getPassword === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: "#b93737"
        })
        spinItem.style.display = "none";
        return;
    }

    const logData = {
        email: getEmail,
        password: getPassword,
    }
    const logMethod = {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(logData)
    };
    
    const url = "http://localhost:3001/byc/api/login";

    fetch(url, logMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result._id) {
            Swal.fire({
                icon: 'success',
                text: "Login Successful",
                confirmButtonColor: "#2D85DE"
            })  
            setTimeout(() => {
                location.href = "dashboard.html"
            }, 4000)
        }   
        else {
            Swal.fire({
                icon: 'error    ',
                text: "Login failed, please try again",
                confirmButtonColor: "#2D85DE"
            })
            spinItem.style.display = "none";
        }   
    })
    .catch(error => {
        console.log('error', error)
        Swal.fire({
            icon: 'info',
            text: `An error occurred. Please try again.`,
            confirmButtonColor: "#2D85DE"
        })
        spinItem.style.display = "none";
    });
}

// function signUp(event) {
//     // prevents page refresh
    
//     else {
//         // convert to form data
//         const signData = new FormData();
//         signData.append("name", getName);
//         signData.append("email", getEmail);
//         signData.append("password", getPassword);
//         signData.append("password_confirmation", getConfirm);
//         // request method
//         const signMethod = {
//             method: 'POST',
//             body: signData
//         }
//         // endpoint
//         const url = "https://cyrilyoruba.juadebgabriel.com/yorubalearning/api/register_admin";
//         // callimg the api
//         fetch(url, signMethod)
//         .then(response => response.json())
//         .then(result => {
//             console.log(result)
//             if (result.status === "success") {
//                 Swal.fire({
//                     icon: 'success',
//                     text: `${result.message}`,
//                     confirmButtonColor: "#2D85DE"
//                 })
//                 setTimeout(() => {
//                     location.href = "index.html"
//                 }, 4000)
//             }
//             else {
//                 Swal.fire({
//                     icon: 'info',
//                     text: `${result.message}`,
//                     confirmButtonColor: "#2D85DE"
//                 })
//                 spinItem.style.display = "none";
//             }
//         })
//         .catch(error => {
//             console.log('error', error)
//             Swal.fire({
//                 icon: 'info',
//                 text: `${result.message}`,
//                 confirmButtonColor: "#2D85DE"
//             })
//             spinItem.style.display = "none";
//         });
//     }
// }


// function logIn(event) {
//     event.preventDefault();
//     const spinItem = document.querySelector(".spin");
//     spinItem.style.display = "inline-block";

//     const getEmail = document.getElementById("email").value;
//     const getPassword = document.getElementById("password").value;
    
//     if (getEmail === "" || getPassword === "") {
//         Swal.fire({
//             icon: 'info',
//             text: 'All fields are required!',
//             confirmButtonColor: "#2D85DE"
//         })
//         spinItem.style.display = "none";
//         return;
//     }
//     else {
//         const signData = new FormData();
//         signData.append("email", getEmail);
//         signData.append("password", getPassword);
        // this is for raw data
        // const signData = JSON.stringify({
        //     "email": getEmail,
        //     "password": getPassword
        // })
//         const signMethod = {
//             method: 'POST',
//             body: signData
//         }
//         const url = "https://cyrilyoruba.juadebgabriel.com/yorubalearning/api/admin_login";
//         fetch(url, signMethod)
//         .then(response => response.json())
//         .then(result => {
//             console.log(result)
//             if (result.hasOwnProperty("email")) {
//                 localStorage.setItem("key", result.token)
//                 location.href = "dashboard.html"
//             }
//             else {
//                 Swal.fire({
//                     icon: 'info',
//                     text: `${result.message}`,
//                     confirmButtonColor: "#2D85DE"
//                 })
//                 spinItem.style.display = "none";
//             }
//         })
//         .catch(error => {
//             console.log('error', error)
//             Swal.fire({
//                 icon: 'info',
//                 text: `${result.message}`,
//                 confirmButtonColor: "#2D85DE"
//             })
//         });
//     }
// }

// get dashboard api
function dashboardApi() {
    const category = document.getElementById("category");
    const learn = document.getElementById("learnmat");
    const sub = document.getElementById("subCat");
    const quiz = document.getElementById("quiz");
    const student = document.getElementById("student");
    const admin = document.getElementById("adminId");
    const getPageModal = document.querySelector(".pagemodal");
    getPageModal.style.display = "block";
    const token = localStorage.getItem("key");
    const dashItem = new Headers();
    dashItem.append("Authorization", `Bearer ${token}`);
    const dashMethod = {
        method: 'GET',
        headers: dashItem
    };
    const url = `${baseUrl}/admin_dashboardapi`;
    fetch(url, dashMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        category.textContent = `${result.total_number_of_categories}`;
        learn.textContent = `${result.total_number_of_learningmaterial}`;
        sub.textContent = `${result.total_number_of_subcategories}`;
        quiz.textContent = `${result.total_number_of_quize}`;
        student.textContent = `${result.total_number_of_students}`;
        admin.textContent = `${result.admin_name}`;
        getPageModal.style.display = "none";
    })
    .catch(error => console.log('error', error));
}

function studentModal(event) {
    const students = document.querySelector(".allstudent");
    event.preventDefault();
    const getModal = document.getElementById("dash-modal");
    getModal.style.display = "block";
    const token = localStorage.getItem("key");
    const dashItem = new Headers();
    dashItem.append("Authorization", `Bearer ${token}`);
    const dashMethod = {
        method: 'GET',
        headers: dashItem
    };
    let data = [];
    const url = `${baseUrl}/top_three_students`;
    fetch(url, dashMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.length === 0) {
            students.innerHTML = `<p class="text-center">No Records Found</p>`;
            return;
        }
        else {
            result.map((item) => {
                data += `
                   <div class="search-card">
                      <div class="d-flex justify-content-between">
                        <p>Name</p>
                        <p>${item.name}</p>
                      </div>
                      <div class="d-flex justify-content-between">
                        <p>Email</p>
                        <p>${item.email}</p>
                      </div>
                      <div class="d-flex justify-content-between">
                        <p>Phone Number</p>
                        <p>${item.phone_number}</p>
                      </div>
                      <div class="d-flex justify-content-between">
                        <p>Position</p>
                        <p>${item.position}</p>
                      </div>
                      <div class="d-flex justify-content-between">
                        <p>Total</p>
                        <p>${item.total_score}</p>
                      </div>
                   </div>
                `
                students.innerHTML = data;
            })
        }
    })
    .catch(error => console.log('error', error));
}

function closeDashModal() {
    const getModal = document.getElementById("dash-modal");
    getModal.style.display = "none";
}

function allStudent() {
    const token = localStorage.getItem("key");
    const dashItem = new Headers();
    dashItem.append("Authorization", `Bearer ${token}`);
    const table = document.getElementById("table-id")
    const dashMethod = {
        method: 'GET',
        headers: dashItem
    };
    let data = [];
    const url = `${baseUrl}/get_all_students`;
    fetch(url, dashMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.length === 0) {
            table.innerHTML = `<p class="text-center">No Records Found</p>`;
            return;
        }
        else {
            result.map((item) => {
                data += `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.total_score}</td>
                    <td>${item.position}</td>
                  </tr>
                `
                table.innerHTML = data;
            })
        }
    })
    .catch(error => console.log('error', error));
}

// function createCategory(event){
//     event.preventDefault();
//     const spinItem = document.querySelector(".spin");
//     spinItem.style.display = "inline-block";
//     const getName = document.getElementById("catName").value;
//     const getImg = document.getElementById("catImage").files[0];
//     const preview = document.getElementById("preview");
//     if (getName === "" || getImg === "") {
//         Swal.fire({
//             icon: 'info',
//             text: 'All fields are required!',
//             confirmButtonColor: "#2D85DE"
//         })
//         spinItem.style.display = "none";
//         return;
//     }
//     else {
//         const token = localStorage.getItem("key");
//         const dashItem = new Headers();
//         dashItem.append("Authorization", `Bearer ${token}`);
//         const catData = new FormData();
//         catData.append("name", getName);
//         catData.append("image", getImg);
//         const catMethod = {
//             method: 'POST',
//             headers: dashItem,
//             body: catData
//         };
//         const url = `localhost:3001/byc/document/api/categories`;
//         fetch(url, catMethod)
//         .then(response => response.json())
//         .then(result => {
//             console.log(result)
//             if (result.status === "success") {
//                 Swal.fire({
//                     icon: 'success',
//                     text: `${result.message}`,
//                     confirmButtonColor: "#2D85DE"
//                 })
//                 setTimeout(() => {
//                     location.reload();
//                 }, 4000)
//             }
//             else {
//                 Swal.fire({
//                     icon: 'info',
//                     text: `${result.message}`,
//                     confirmButtonColor: "#2D85DE"
//                 })
//                 spinItem.style.display = "none";
//             }
//         })
//         .catch(error => console.log('error', error));
//     }
// }

function getCategoryList() {
    const scroll = document.querySelector(".scroll-object");
    const token = localStorage.getItem("key");
    const dashItem = new Headers();
    dashItem.append("Authorization", `Bearer ${token}`);
    const catMethod = {
        method: 'GET',
        headers: dashItem,
    };
    let data = [];
    const url = `${baseUrl}/category_list`;
    fetch(url, catMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.length === 0) {
            scroll.innerHTML = `<p>No records found</p>`;
            return;
        }
        else {
            result.map((item) => {
                data += `
                  <div class="search-card">
                    <img src="${item.image}" alt="">
                    <p>${item.name}</p>
                    <div class="text-right">
                      <button class="update-button" onclick="update(${(item.id)})">Update</button>
                      <button class="delete-button" onclick="deleteCategory(${(item.id)})">Delete</button>
                    </div>
                  </div>
                `
                scroll.innerHTML = data;
            })
        }
    })
    .catch(error => console.log('error', error));
}

function update(id) {
    const getModal = document.getElementById("my-modal3");
    localStorage.setItem("catId", id);
    const name = document.getElementById("updateName")
    const token = localStorage.getItem("key");
    const dashItem = new Headers();
    dashItem.append("Authorization", `Bearer ${token}`);
    const catMethod = {
        method: 'GET',
        headers: dashItem,
    };
    const url = `${baseUrl}/get_details?category_id=${id}`;
    fetch(url, catMethod)
     .then(response => response.json())
     .then(result => {
        console.log(result)
        name.setAttribute("value", `${result.name}`);
        getModal.style.display = "block";
     })
     .catch(error => console.log('error', error));
}

function updateCategory(event) {
    event.preventDefault();
    const spinItem = document.querySelector(".spin2");
    spinItem.style.display = "inline-block";
    const getName = document.getElementById("updateName").value;
    const getImg = document.getElementById("updateImage").files[0];
    if (getName === "" || getImg === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: "#2D85DE"
        })
        spinItem.style.display = "none";
        return;
    }
    else {
        const token = localStorage.getItem("key");
        const dashItem = new Headers();
        dashItem.append("Authorization", `Bearer ${token}`);
        const myId = localStorage.getItem("catId");
        const catData = new FormData();
        catData.append("name", getName);
        catData.append("image", getImg);
        catData.append("category_id", myId);
        const catMethod = {
            method: 'POST',
            headers: dashItem,
            body: catData
        };
        const url = `${baseUrl}/update_category`;
        fetch(url, catMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: "#2D85DE"
                })
                setTimeout(() => {
                    location.reload();
                }, 4000)
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.status}`,
                    confirmButtonColor: "#2D85DE"
                })
                spinItem.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }
}

function deleteCategory(id) {
    // const getModal = document.getElementById("my-modal3");
    // localStorage.setItem("catId", id);
    const token = localStorage.getItem("key");
    const dashItem = new Headers();
    dashItem.append("Authorization", `Bearer ${token}`);
    const catMethod = {
        method: 'GET',
        headers: dashItem,
    };
    const url = `${baseUrl}/delete_category/${id}`;
    fetch(url, catMethod)
        .then(response => response.json())
        .then(result => {
        console.log(result)
        if (result.status === "success") {
        Swal.fire({
            icon: 'success',
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE"
        })
        setTimeout(() => {
            location.reload();
        }, 4000)
         }
         else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.status}`,
                    confirmButtonColor: "#2D85DE"
                })
                spinItem.style.display = "none";
         }

    })
    .catch(error => console.log('error', error));
}

function upDateAdmin(event) {
    event.preventDefault();

    const spinItem = document.querySelector(".spin");
    spinItem.style.display = "inline-block";

    const updateName = document.getElementById("updateName").value;
    const updateEmail = document.getElementById("updateEmail").value;

    if(updateName === "" || updateEmail === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: "#2D85DE"
        })
        spinItem.style.display = "none";
        return;
    }
    else {
        const token = localStorage.getItem("key");
        const dashItem = new Headers();
        dashItem.append("Authorization", `Bearer ${token}`);
        const updateData = new FormData();
        updateData.append("name", updateName);
        updateData.append("email", updateEmail);
        const updateMethod = {
            method: 'POST',
            headers: dashItem,
            body: updateData
        };
        const url = `${baseUrl}/admin_update_profile`;
        fetch(url, updateMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: "#2D85DE"
                })
                setTimeout(() => {
                    location.reload();
                }, 4000)
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message}`,
                    confirmButtonColor: "#2D85DE"
                })
                spinItem.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }

}

function upDatePassword(event) {
    event.preventDefault();

    const spinItem = document.querySelector(".spin2");
    spinItem.style.display = "inline-block";

    const updatePassEmail = document.getElementById("updatePassEmail").value;
    const updatePassword = document.getElementById("updatePassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if(updatePassEmail === "" || updatePassword === "" || confirmPassword === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: "#2D85DE"
        })
        spinItem.style.display = "none";
        return;
    }
    if (confirmPassword !== updatePassword) {
        Swal.fire({
            icon: 'warning',
            text: 'Passwords don\'t match',
            confirmButtonColor: "#2D85DE"
        })
        spinItem.style.display = "none";
        return;
    }

    else {
        const token = localStorage.getItem("key");
        const dashItem = new Headers();
        dashItem.append("Authorization", `Bearer ${token}`);
        const updateData = new FormData();
        updateData.append("email", updatePassEmail);
        updateData.append("password", updatePassword);
        updateData.append("password_confirmation", confirmPassword);

        const updateMethod = {
            method: 'POST',
            headers: dashItem,
            body: updateData
        };
        const url = `${baseUrl}/admin_update_password`;
        fetch(url, updateMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: "#2D85DE"
                })
                setTimeout(() => {
                    localStorage.clear();
                    location.href = "index.html";
                }, 4000)
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message}`,
                    confirmButtonColor: "#2D85DE"
                })
                spinItem.style.display = "none";
            }
        })

    }

}

//  LOGOUT FUNCTION
function logout() {
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Yes, Sure',
            cancelButtonText: 'No, Cancel',
            confirmButtonColor: "#2D85DE",
            cancelButtonColor: "#d33",
        })
        .then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                // localStorage.removeItem("key");
                Swal.fire({
                    icon: 'success',
                    text: 'You have successfully logged out',
                    confirmButtonColor: "#2D85DE",
                })
                setTimeout(() => {
                    location.href = "index.html";
                }, 2000);
            }
            else if (result.isDismissed) {
                Swal.fire({
                    icon: 'info',
                    text: 'You cancelled the logout',
                    confirmButtonColor: "#2D85DE",
                })
                 setTimeout(() => {
                    location.href = "dashboard.html";
                }, 1000);
            }
        })
}








