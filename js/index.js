
// function for signing/register admin
function createAccount(event) {
    event.preventDefault();
    // triggers the spinning animation
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
        });
        spinItem.style.display = "none";
        return;
    }

    if (getConfirm !== getPassword) {
        Swal.fire({
            icon: 'warning',
            text: "Passwords don't match",
            confirmButtonColor: "#b93737"
        });
        spinItem.style.display = "none";
        return;
    }

    // calling API
    const signData = {
        name: getName,
        email: getEmail,
        password: getPassword,
        confirmPassword: getConfirm
    };

    const signMethod = {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(signData)
    };

    const url = "http://localhost:3001/byc/api/users";
    fetch(url, signMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result);

            if (result._id) {
                localStorage.setItem("token", result.token);
                localStorage.setItem("adminName", result.name);
                Swal.fire({
                    icon: 'success',
                    text: "Registration Successful",
                    confirmButtonColor: "#2D85DE"
                });
                setTimeout(() => {
                    location.href = "index.html";
                }, 4000);
            } else {
                Swal.fire({
                    icon: 'info',
                    text: "Registration failed, please try again",
                    confirmButtonColor: "#2D85DE"
                });
                spinItem.style.display = "none";
            }
        })
        .catch(error => {
            console.log('error', error);
            Swal.fire({
                icon: 'info',
                text: "An error occurred. Please try again.",
                confirmButtonColor: "#2D85DE"
            });
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
    if (getEmail === "" || getPassword === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: "#b93737"
        });
        spinItem.style.display = "none";
        return;
    }

    const logData = {
        email: getEmail,
        password: getPassword
    };

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
            console.log(result);
            localStorage.setItem("token", result.token);
            localStorage.setItem("adminName", result.name);

            if (result.token) {
                Swal.fire({
                    icon: 'success',
                    text: "Login Successful",
                    confirmButtonColor: "#2D85DE"
                });
                setTimeout(() => {
                    location.href = "dashboard.html";
                }, 4000);
            } else {
                Swal.fire({
                    icon: 'error',
                    text: "Login failed, please try again",
                    confirmButtonColor: "#2D85DE"
                });
                spinItem.style.display = "none";
            }
        })
        .catch(error => {
            console.log('error', error);
            Swal.fire({
                icon: 'info',
                text: "An error occurred. Please try again.",
                confirmButtonColor: "#2D85DE"
            });
            spinItem.style.display = "none";
        });
}


// function for filling admin name
function fillAdminName() {
    

    const adminName = localStorage.getItem("adminName");
    if (!adminName) return;

    const adminElement = document.getElementById('adminId');
    if (!adminElement) return;

    if (adminElement.tagName === "INPUT" || adminElement.tagName === "TEXTAREA") {
        adminElement.value = adminName;
    } else {
        adminElement.textContent = adminName;
    }
}

// Function to get total products
function totalProducts() {
    const totalProd = document.getElementById("totalprod");
    const token = localStorage.getItem("token");
    fetch("http://localhost:3001/byc/api/products", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(result => {
            totalProd.textContent = result.length;
        })
        .catch(err => console.error("Error fetching products:", err));
}

// function for counting categories
function totalCategory() {
    const countElement = document.getElementById("category");
    const token = localStorage.getItem("token");
    fetch("http://localhost:3001/byc/document/api/categories", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(result => {
            countElement.textContent = result.length;
        })
        .catch(err => console.error("Error fetching categories:", err));
}

function showModal(id) {
    document.getElementById(id).style.display = "block";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

function createCategory(event) {
    event.preventDefault();
    const spinItem = document.querySelector(".spin");
    spinItem.style.display = "inline-block";

    const catName = document.getElementById("catName").value;

    if (catName === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: "#b93737"
        });
        spinItem.style.display = "none";
        return;
    }

    const token = localStorage.getItem("token");
    const catData = { name: catName };

    const catMethod = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(catData)
    };

    const url = "http://localhost:3001/byc/document/api/categories";

    fetch(url, catMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result);

            if (result._id) {
                localStorage.setItem("catId", result._id);
                Swal.fire({
                    icon: 'success',
                    text: "Category created successfully",
                    confirmButtonColor: "#2D85DE"
                });
                setTimeout(() => {
                    location.reload();
                }, 4000);
                totalCategory();
                totalProducts();
            } else {
                Swal.fire({
                    icon: 'error',
                    text: "Category creation failed, please try again",
                    confirmButtonColor: "#2D85DE"
                });
                spinItem.style.display = "none";
            }
        })
        .catch(error => {
            console.log('error', error);
            Swal.fire({
                icon: 'error',
                text: "An error occurred. Please try again.",
                confirmButtonColor: "#2D85DE"
            });
            spinItem.style.display = "none";
        });
}

    //  function for get all category
function categorybody() {
    const category = document.getElementById("category-body");
    const token = localStorage.getItem("token");
   
    const catItem = new Headers();
    catItem.append("Authorization", `Bearer ${token}`);
    const catMethod = {
        method: 'GET',
        headers: catItem,
    };
    let data = [];

    const url = "http://localhost:3001/byc/document/api/categories";
    fetch(url, catMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if(result.length === 0) {
            category.innerHTML = `<p class="text-center">No Records Found</p>`;
            return;
        }
        else {
            result.map((item) => {
                data += `
                <tr>
                    <td>${item.name}</td>
                    <td>
                        <div class="text-start text-lg-center">
                            <button class="update-button" onclick="updateCategory('${(item._id)}')">Update</button>
                            <button class="delete-button" onclick="deleteCategory('${(item._id)}')">Delete</button>
                        </div>
                    </td>
                </tr>
                `
                category.innerHTML = data;
            })
        }
    })
    .catch(error => console.log('error', error));
}


    // function for updating category 
function updateCategory(id) {
    const getModal = document.getElementById("my-modal3");
    localStorage.setItem("catId", id);

    const catId = document.getElementById("updateId");  
    const token = localStorage.getItem("token");

    const catItem = new Headers();
    catItem.append("Authorization", `Bearer ${token}` );
    
    const catMethod = {
        method: 'GET',
        headers: catItem,
    };
    const url = `http://localhost:3001/byc/document/api/categories/${id}`;
    fetch(url, catMethod)
    .then(response => response.json())
    .then(result => {
        if(result._id) {
        console.log(result._id)
            catId.setAttribute("value", result._id);
            document.getElementById("updateName").setAttribute("value", result.name);
        }
        getModal.style.display = "block";
    })
    .catch((error) => console.log("Error", error));

}

// FUNCTION TO CLOSE CATEGORY MODAL
function closeCatModal() {
    const getModal = document.getElementById("my-modal3");
    getModal.style.display = "none";
}

// function to update category from the modal
function updateCategorymodel(event) {
    event.preventDefault();
    const spinItem = document.querySelector(".spin2");
    spinItem.style.display = "inline-block";
    const getModal = document.getElementById("my-modal3");
    const getName = document.getElementById("updateName").value;
    const catIdInput = document.getElementById("updateId").value;
    if (getName === "" || catIdInput === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: "#2D85DE"
        });
        spinItem.style.display = "none";
        return;
    }
    const token = localStorage.getItem("key");
    // Send plain JSON instead of FormData for consistency with your backend
    const catData = JSON.stringify({ name: getName });
    fetch(`http://localhost:3001/byc/document/api/categories/${catIdInput}`, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: catData
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        if (result._id || result.status === "id") {
            Swal.fire({
                icon: 'success',
                text: result.message || "Category updated successfully!",
                confirmButtonColor: "#2D85DE"
            });
            setTimeout(() => {
                location.reload();
            }, 2000);
        } else {
            Swal.fire({
                icon: 'error',
                text: result.message || "Failed to update category",
                confirmButtonColor: "#2D85DE"
            });
        }
    })
    .catch(error => console.error("Update error:", error))
    .finally(() => {
        spinItem.style.display = "none";
    });
}

           // function to delete a category
function deleteCategory(categoryId) {
  const token = localStorage.getItem('token');
  Swal.fire({
    title: 'Are you sure?',
    text: 'This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085D6',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:3001/byc/document/api/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log('Delete response:', result);
          if (result._id) {
            // :white_check_mark: Remove the category div instantly
            const element = document.getElementById(`cat-${categoryId}`);
            if (element) {
              element.remove();
            }
            setTimeout(() => {
              location.reload();
            }, 2000);
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: result.message || 'Category deleted successfully!',
              timer: 1500,
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              icon: 'error',
              text: result.message || 'Failed to delete category',
            });
          }
        })
        .catch((err) => {
          console.error('Delete error:', err);
          Swal.fire({
            icon: 'error',
            text: 'Network or server error while deleting.',
          });
        });
    }
  });
}

// PRODUCT DASHBOARD STARTS HERE
function createProduct(event) {
    event.preventDefault();
    const spinItem = document.querySelector(".spin");
    spinItem.style.display = "inline-block";
    const prodName = document.getElementById("product-name").value;
    const prodImageUrl = document.getElementById("product-image").value; // Cloud URL
    const prodPrice = document.getElementById("product-price").value;
    const prodDesc = document.getElementById("product-description").value;
    const prodNumber = document.getElementById("product-Number").value;
    const prodStock = document.getElementById("numberInStock").value;
    const prodCategoryId = document.getElementById("product-categoryId").value;
    // Simple validation
    if (!prodName || !prodImageUrl || !prodPrice || !prodDesc || !prodNumber || !prodStock || !prodCategoryId) {
        Swal.fire("Info", "All fields are required!", "info");
        spinItem.style.display = "none";
        return;
    }
    if (prodName.length < 3) {
        Swal.fire("Info", "Product Name Must be at least 3 characters long!", "info");
        return;
    }
    if(prodDesc.length < 5){
        Swal.fire("Info", "Product Description Must be at least 5 characters long!", "info");
        return;
    }
    if(prodNumber.length < 1 ){
        Swal.fire("Info", "Product Number Must be at least 3 characters long!", "info");
        return;
    }
    if(prodCategoryId.length < 15){
        Swal.fire("Info", "Please enter a valid Category ID! or Create New Category", "info");
        return;
    }
    if(prodImageUrl.length < 10){
        Swal.fire("Info", "Please enter a valid Cloudinary Image URL!", "info");
        return;
    }else{
        const prodData = JSON.stringify({
        name: prodName,
        image: prodImageUrl,
        price: prodPrice,
        description: prodDesc,
        productNumber: prodNumber,
        numberInStock: prodStock,
        categoryId: prodCategoryId
    });

const prodMethod = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: prodData
    };
const url = "http://localhost:3001/byc/api/products";
fetch(url, prodMethod)
    .then(async response => {
        // always parse JSON, even for error responses
        const result = await response.json();
        if (response.ok) return result; // HTTP 200-299
        throw result; // forward error JSON
    })
    .then(result => {
        Swal.fire({
            icon: 'success',
            text: result.message || 'Product created successfully!',
            confirmButtonColor: "#2D85DE"
        });
        setTimeout(() => location.reload(), 2000);
        totalCategory();
        totalProducts();
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            text: error.message || 'Something went wrong. Please try again.',
            confirmButtonColor: "#2D85DE"
        });
    })
    .finally(() => {
        spinItem.style.display = "none";
    });
    }
}

// function to get all PRODUCTS
function getAllProducts() {
    const table = document.getElementById("products-body");
    const toggleBtn = document.getElementById("toggle-orders");
    let showingAll = false; // default: show only 3
    const token = localStorage.getItem("token");
    const dashItem = new Headers();
    dashItem.append("Authorization", `Bearer ${token}`);
    const catMethod = {
        method: 'GET',
        headers: dashItem,
    };
    const url = "http://localhost:3001/byc/api/products";
    fetch(url, catMethod)
        .then(response => response.json())
        .then(result => {
        console.log(result)

            if (!result || result.length === 0) {
                table.innerHTML = `<tr><td colspan="9" class="text-center">No records found</td></tr>`;
                return;
            }
            // render function
            function renderProducts() {
                let data = "";
                const slice = showingAll ? result : result.slice(0, 3);
                slice.forEach(item => {
                    data += `
                    <tr>
                        <td>${item.name}</td>
                        <td><img src="${item.image}" alt="${item.name}" width="50"></td>
                        <td>${item.price}</td>
                        <td>${item.description}</td>
                        <td>${item.productNumber}</td>
                        <td>${item.numberInStock}</td>
                        <td>${item.category?.name || ''}</td>
                        <td>
                            <div class="text-start text-lg-center">
                                <button class="update-button js-btn mx-lg-2 px-lg-3 mb-2" onclick="updateProduct('${item._id}')">Update</button>
                                <button class="delete-button js-btn mx-lg-2 px-lg-3" onclick="deleteProduct('${item._id}')">Delete</button>
                            </div>
                        </td>
                    </tr>
                    `;
                });
                table.innerHTML = data;
                toggleBtn.textContent = showingAll ? "View Less" : "View All";
            }
            // initial render (3 only)
            renderProducts();
            // toggle button
            toggleBtn.onclick = function () {
                showingAll = !showingAll;
                renderProducts();
            };
        })
        .catch(error => console.error('Error:', error));
}

// function to get single product for updating
function updateProduct(id) {
  const getModal = document.getElementById("my-modal3");
  localStorage.setItem("productId", id);
  const token = localStorage.getItem("key");
  const dashItem = new Headers();
  dashItem.append("Authorization", `Bearer ${token}`);
  const prodMethod = {
    method: "GET",
    headers: dashItem,
  };
  fetch(`http://localhost:3001/byc/api/products/${id}`, prodMethod)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

    if (!result || !result._id) {
        console.error("No product in response!");
        return;
    }
        const product = result;

      // Prefill inputs
    //   document.getElementById("product-id").value = product._id;
      document.getElementById("productUpdate-name").value = product.name;
      document.getElementById("productUpdate-image").value = product.image;
      document.getElementById("productUpdate-price").value = product.price;
      document.getElementById("productUpdate-description").value = product.description;
      document.getElementById("productUpdate-Number").value = product.productNumber;
      document.getElementById("Update-numberInStock").value = product.numberInStock;
      // Category
      if (product.category) {
        document.getElementById("category-Name").value = product.category.name;
        document.getElementById("category-Id").value = product.category._id;
      }
      // Show modal
      getModal.style.display = "block";
    })
    .catch((error) => console.error("Error:", error));
}
// function to delete a product
function deleteProduct(id) {
    const spinItem = document.querySelector(".spin");
    Swal.fire({
        title: 'Are you sure?',
        text: "This action will permanently delete the product!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085D6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            spinItem.style.display = "inline-block";
            const token = localStorage.getItem("key");
            const headers = new Headers();
            headers.append("Authorization", `Bearer ${token}`);
            fetch(`http://localhost:3001/byc/api/products/${id}`, {
                method: 'DELETE',
                headers
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.success === true || result.status === "success") {
                    Swal.fire({
                        icon: 'success',
                        text: result.message || 'Product deleted successfully!',
                        confirmButtonColor: "#2D85DE"
                    });
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                    localStorage.removeItem("productId");
                } else {
                    Swal.fire({
                        icon: 'info',
                        text: result.message || 'Failed to delete product',
                        confirmButtonColor: "#2D85DE"
                    });
                    spinItem.style.display = "none";
                }
            })
            .catch(error => {
                console.log('Error:', error);
                Swal.fire({
                    icon: 'error',
                    text: 'Something went wrong. Please try again.',
                    confirmButtonColor: "#2D85DE"
                });
                spinItem.style.display = "none";
            });
        }
    });
}
// function to update product from the modal
async function updateProductModel(event) {
  event.preventDefault();
  const spinItem = document.querySelector(".spin2");
  spinItem.style.display = "inline-block";
  const productIdStored = localStorage.getItem("productId");
  const productId = document.getElementById("product-ID").value  = productIdStored;
  const prodUpdateName = document.getElementById("productUpdate-name").value;
  const prodUpdateImage = document.getElementById("productUpdate-image").value;
  const prodUpdatePrice = document.getElementById("productUpdate-price").value;
  const prodUpdateDescription = document.getElementById("productUpdate-description").value;
  const prodUpdateNumber = document.getElementById("productUpdate-Number").value;
  const prodUpdateInStock = document.getElementById("Update-numberInStock").value;
  const prodCatId = document.getElementById("category-Id").value;
  const prodCatName = document.getElementById("category-Name").value;
  const token = localStorage.getItem("key");
  const prodData = {
    name: prodUpdateName,
    image: prodUpdateImage,
    price: prodUpdatePrice,
    description: prodUpdateDescription,
    productNumber: prodUpdateNumber,
    numberInStock: prodUpdateInStock,
    categoryId: prodCatId,
  };
  try {
    const response = await fetch(`http://localhost:3001/byc/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prodData),
    });
    // :white_check_mark: Handle non-JSON responses
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Server did not return JSON. Status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
    if (result.success) {
      Swal.fire({
        icon: "success",
        text: result.message || "Product updated successfully!",
        confirmButtonColor: "#2D85DE",
      });
      setTimeout(() => location.reload(), 2000);
    } else {
      Swal.fire({
        icon: "error",
        text: result.message || "Failed to update product",
        confirmButtonColor: "#2D85DE",
      });
    }
  } catch (error) {
    console.error("Update error:", error);
    Swal.fire({
      icon: "error",
      text: `Update failed: ${error.message}`,
      confirmButtonColor: "#2D85DE",
    });
  } finally {
    spinItem.style.display = "none";
  }
}
// FUNCTION TO CLOSE PRODUCT MODAL
function closeCatModal() {
    const getModal = document.getElementById("my-modal3");
    getModal.style.display = "none";
}

// Function TO GET TOTAL PRODUCTS
function totalProducts() {
    const totalProd = document.getElementById("totalprod");
    const token = localStorage.getItem("key");
    fetch("http://localhost:3001/byc/api/products", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(result => {
        totalProd.textContent = result.length;
    })
    .catch(err => console.error("Error fetching products:", err));
}
// PRODUCT DASHBOARD ENDS HERE


// UPDATING ADMIN PROFILE AND PASSWORD / UNFINISHED

    function upDateAdmin(event) {
    event.preventDefault();
    const spinItem = document.querySelector(".spin");
    const updateName = document.getElementById("updateName").value;
    const updateEmail = document.getElementById("updateEmail").value;
    if (updateName === "" || updateEmail === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: "#BD3A3A"
        })
        spinItem.style.display = "none";
        return;
    }
    else {
        const token = localStorage.getItem("key");
        const updateItem = new Headers();
        updateItem.append("Authorization", `Bearer ${token}`);
        const myId = localStorage.getItem("catId");
        const updateData = new FormData();
        updateData.append("name", updateName);
        updateData.append("email", updateEmail);
        // catData.append("category_id", myId);
        const updateMethod = {
            method: 'POST',
            headers: updateItem,
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
                spinItem.style.display = "inline-block";
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

    // LOG OUT FUNCTION
// logout page
function logout() {
    localStorage.clear();
    location.href = "index.html"
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


    // dashboard functions




































// get dashboard api
// function dashboardApi() {
//     const category = document.getElementById("category");
//     const learn = document.getElementById("learnmat");
//     const sub = document.getElementById("subCat");
//     const quiz = document.getElementById("quiz");
//     const student = document.getElementById("student");
//     const admin = document.getElementById("adminId");
//     const getPageModal = document.querySelector(".pagemodal");
//     getPageModal.style.display = "block";
//     const token = localStorage.getItem("key");
//     const dashItem = new Headers();
//     dashItem.append("Authorization", `Bearer ${token}`);
//     const dashMethod = {
//         method: 'GET',
//         headers: dashItem
//     };
//     const url = `${baseUrl}/admin_dashboardapi`;
//     fetch(url, dashMethod)
//     .then(response => response.json())
//     .then(result => {
//         console.log(result)
//         category.textContent = `${result.total_number_of_categories}`;
//         learn.textContent = `${result.total_number_of_learningmaterial}`;
//         sub.textContent = `${result.total_number_of_subcategories}`;
//         quiz.textContent = `${result.total_number_of_quize}`;
//         student.textContent = `${result.total_number_of_students}`;
//         admin.textContent = `${result.admin_name}`;
//         getPageModal.style.display = "none";
//     })
//     .catch(error => console.log('error', error));
// }

// function studentModal(event) {
//     const students = document.querySelector(".allstudent");
//     event.preventDefault();
//     const getModal = document.getElementById("dash-modal");
//     getModal.style.display = "block";
//     const token = localStorage.getItem("key");
//     const dashItem = new Headers();
//     dashItem.append("Authorization", `Bearer ${token}`);
//     const dashMethod = {
//         method: 'GET',
//         headers: dashItem
//     };
//     let data = [];
//     const url = `${baseUrl}/top_three_students`;
//     fetch(url, dashMethod)
//     .then(response => response.json())
//     .then(result => {
//         console.log(result)
//         if (result.length === 0) {
//             students.innerHTML = `<p class="text-center">No Records Found</p>`;
//             return;
//         }
//         else {
//             result.map((item) => {
//                 data += `
//                    <div class="search-card">
//                       <div class="d-flex justify-content-between">
//                         <p>Name</p>
//                         <p>${item.name}</p>
//                       </div>
//                       <div class="d-flex justify-content-between">
//                         <p>Email</p>
//                         <p>${item.email}</p>
//                       </div>
//                       <div class="d-flex justify-content-between">
//                         <p>Phone Number</p>
//                         <p>${item.phone_number}</p>
//                       </div>
//                       <div class="d-flex justify-content-between">
//                         <p>Position</p>
//                         <p>${item.position}</p>
//                       </div>
//                       <div class="d-flex justify-content-between">
//                         <p>Total</p>
//                         <p>${item.total_score}</p>
//                       </div>
//                    </div>
//                 `
//                 students.innerHTML = data;
//             })
//         }
//     })
//     .catch(error => console.log('error', error));
// }

// function closeDashModal() {
//     const getModal = document.getElementById("dash-modal");
//     getModal.style.display = "none";
// }

// function allStudent() {
//     const token = localStorage.getItem("key");
//     const dashItem = new Headers();
//     dashItem.append("Authorization", `Bearer ${token}`);
//     const table = document.getElementById("table-id")
//     const dashMethod = {
//         method: 'GET',
//         headers: dashItem
//     };
//     let data = [];
//     const url = `${baseUrl}/get_all_students`;
//     fetch(url, dashMethod)
//     .then(response => response.json())
//     .then(result => {
//         console.log(result)
//         if (result.length === 0) {
//             table.innerHTML = `<p class="text-center">No Records Found</p>`;
//             return;
//         }
//         else {
//             result.map((item) => {
//                 data += `
//                   <tr>
//                     <td>${item.name}</td>
//                     <td>${item.email}</td>
//                     <td>${item.phone_number}</td>
//                     <td>${item.total_score}</td>
//                     <td>${item.position}</td>
//                   </tr>
//                 `
//                 table.innerHTML = data;
//             })
//         }
//     })
//     .catch(error => console.log('error', error));
// }

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

// function getCategoryList() {
//     const scroll = document.querySelector(".scroll-object");
//     const token = localStorage.getItem("key");
//     const dashItem = new Headers();
//     dashItem.append("Authorization", `Bearer ${token}`);
//     const catMethod = {
//         method: 'GET',
//         headers: dashItem,
//     };
//     let data = [];
//     const url = `${baseUrl}/category_list`;
//     fetch(url, catMethod)
//     .then(response => response.json())
//     .then(result => {
//         console.log(result)
//         if (result.length === 0) {
//             scroll.innerHTML = `<p>No records found</p>`;
//             return;
//         }
//         else {
//             result.map((item) => {
//                 data += `
//                   <div class="search-card">
//                     <img src="${item.image}" alt="">
//                     <p>${item.name}</p>
//                     <div class="text-right">
//                       <button class="update-button" onclick="update(${(item.id)})">Update</button>
//                       <button class="delete-button" onclick="deleteCategory(${(item.id)})">Delete</button>
//                     </div>
//                   </div>
//                 `
//                 scroll.innerHTML = data;
//             })
//         }
//     })
//     .catch(error => console.log('error', error));
// }

// function update(id) {
//     const getModal = document.getElementById("my-modal3");
//     localStorage.setItem("catId", id);
//     const name = document.getElementById("updateName")
//     const token = localStorage.getItem("key");
//     const dashItem = new Headers();
//     dashItem.append("Authorization", `Bearer ${token}`);
//     const catMethod = {
//         method: 'GET',
//         headers: dashItem,
//     };
//     const url = `${baseUrl}/get_details?category_id=${id}`;
//     fetch(url, catMethod)
//      .then(response => response.json())
//      .then(result => {
//         console.log(result)
//         name.setAttribute("value", `${result.name}`);
//         getModal.style.display = "block";
//      })
//      .catch(error => console.log('error', error));
// }

// function updateCategory(event) {
//     event.preventDefault();
//     const spinItem = document.querySelector(".spin2");
//     spinItem.style.display = "inline-block";
//     const getName = document.getElementById("updateName").value;
//     const getImg = document.getElementById("updateImage").files[0];
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
//         const myId = localStorage.getItem("catId");
//         const catData = new FormData();
//         catData.append("name", getName);
//         catData.append("image", getImg);
//         catData.append("category_id", myId);
//         const catMethod = {
//             method: 'POST',
//             headers: dashItem,
//             body: catData
//         };
//         const url = `${baseUrl}/update_category`;
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
//                     text: `${result.status}`,
//                     confirmButtonColor: "#2D85DE"
//                 })
//                 spinItem.style.display = "none";
//             }
//         })
//         .catch(error => console.log('error', error));
//     }
// }

// function deleteCategory(id) {
//     // const getModal = document.getElementById("my-modal3");
//     // localStorage.setItem("catId", id);
//     const token = localStorage.getItem("key");
//     const dashItem = new Headers();
//     dashItem.append("Authorization", `Bearer ${token}`);
//     const catMethod = {
//         method: 'GET',
//         headers: dashItem,
//     };
//     const url = `${baseUrl}/delete_category/${id}`;
//     fetch(url, catMethod)
//         .then(response => response.json())
//         .then(result => {
//         console.log(result)
//         if (result.status === "success") {
//         Swal.fire({
//             icon: 'success',
//             text: `${result.message}`,
//             confirmButtonColor: "#2D85DE"
//         })
//         setTimeout(() => {
//             location.reload();
//         }, 4000)
//          }
//          else {
//                 Swal.fire({
//                     icon: 'info',
//                     text: `${result.status}`,
//                     confirmButtonColor: "#2D85DE"
//                 })
//                 spinItem.style.display = "none";
//          }

//     })
//     .catch(error => console.log('error', error));
// }

// function upDateAdmin(event) {
//     event.preventDefault();

//     const spinItem = document.querySelector(".spin");
//     spinItem.style.display = "inline-block";

//     const updateName = document.getElementById("updateName").value;
//     const updateEmail = document.getElementById("updateEmail").value;

//     if(updateName === "" || updateEmail === "") {
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
//         const updateData = new FormData();
//         updateData.append("name", updateName);
//         updateData.append("email", updateEmail);
//         const updateMethod = {
//             method: 'POST',
//             headers: dashItem,
//             body: updateData
//         };
//         const url = `${baseUrl}/admin_update_profile`;
//         fetch(url, updateMethod)
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

// function upDatePassword(event) {
//     event.preventDefault();

//     const spinItem = document.querySelector(".spin2");
//     spinItem.style.display = "inline-block";

//     const updatePassEmail = document.getElementById("updatePassEmail").value;
//     const updatePassword = document.getElementById("updatePassword").value;
//     const confirmPassword = document.getElementById("confirmPassword").value;

//     if(updatePassEmail === "" || updatePassword === "" || confirmPassword === "") {
//         Swal.fire({
//             icon: 'info',
//             text: 'All fields are required!',
//             confirmButtonColor: "#2D85DE"
//         })
//         spinItem.style.display = "none";
//         return;
//     }
//     if (confirmPassword !== updatePassword) {
//         Swal.fire({
//             icon: 'warning',
//             text: 'Passwords don\'t match',
//             confirmButtonColor: "#2D85DE"
//         })
//         spinItem.style.display = "none";
//         return;
//     }

//     else {
//         const token = localStorage.getItem("key");
//         const dashItem = new Headers();
//         dashItem.append("Authorization", `Bearer ${token}`);
//         const updateData = new FormData();
//         updateData.append("email", updatePassEmail);
//         updateData.append("password", updatePassword);
//         updateData.append("password_confirmation", confirmPassword);

//         const updateMethod = {
//             method: 'POST',
//             headers: dashItem,
//             body: updateData
//         };
//         const url = `${baseUrl}/admin_update_password`;
//         fetch(url, updateMethod)
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
//                     localStorage.clear();
//                     location.href = "index.html";
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

//     }

// }

// //  LOGOUT FUNCTION
// function logout() {
//         Swal.fire({
//             showCancelButton: true,
//             confirmButtonText: 'Yes, Sure',
//             cancelButtonText: 'No, Cancel',
//             confirmButtonColor: "#2D85DE",
//             cancelButtonColor: "#d33",
//         })
//         .then((result) => {
//             if (result.isConfirmed) {
//                 localStorage.clear();
//                 // localStorage.removeItem("key");
//                 Swal.fire({
//                     icon: 'success',
//                     text: 'You have successfully logged out',
//                     confirmButtonColor: "#2D85DE",
//                 })
//                 setTimeout(() => {
//                     location.href = "index.html";
//                 }, 2000);
//             }
//             else if (result.isDismissed) {
//                 Swal.fire({
//                     icon: 'info',
//                     text: 'You cancelled the logout',
//                     confirmButtonColor: "#2D85DE",
//                 })
//                  setTimeout(() => {
//                     location.href = "dashboard.html";
//                 }, 1000);
//             }
//         })
// }








