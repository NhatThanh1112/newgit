function loadCartItems() {
    const bodyItem = document.getElementById('body-item');
    const deleteAllButton = document.getElementById('del-all');
    const payNowButton = document.getElementById('pay-now');
    bodyItem.innerHTML = '';

    db.collection("products").where("onCart", "==", true).get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                bodyItem.innerHTML = '<tr><td colspan="4">Giỏ hàng trống.</td></tr>';
                deleteAllButton.style.display = 'none';
                payNowButton.style.display = 'none';
                return;
            }

            // Có sản phẩm trong giỏ, hiện nút
            deleteAllButton.style.display = 'block';
            payNowButton.style.display = 'block';

            querySnapshot.forEach((doc) => {
                const product = doc.data();

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><img src="${product.image}" alt="${product.name}" width="50"></td>
                    <td>${product.name}</td>
                    <td>${Number(product.price).toLocaleString('vi-VN')} VND</td>
                    <td><button class="remove-from-cart" data-id="${doc.id}">Delete</button></td>
                `;
                bodyItem.appendChild(tr);
            });

            document.querySelectorAll('.remove-from-cart').forEach(btn => {
                btn.addEventListener('click', function () {
                    const productId = this.getAttribute('data-id');
                    removeProductFromCart(productId);
                });
            });
        })
        .catch((error) => {
            console.error("Lỗi khi load giỏ hàng:", error);
        });
}

function removeProductFromCart(productId) {
    db.collection('products').doc(productId).update({
        "onCart": false
    })
    .then(() => {
        console.log("Đã xóa sản phẩm khỏi giỏ hàng");
        loadCartItems();
    })
    .catch((error) => {
        console.error("Lỗi khi xóa sản phẩm:", error);
    });
}

function deleteAllCartItems() {
    db.collection("products").where("onCart", "==", true).get()
        .then((querySnapshot) => {
            const batch = db.batch();
            querySnapshot.forEach((doc) => {
                batch.update(doc.ref, { onCart: false });
            });
            return batch.commit();
        })
        .then(() => {
            console.log("Tất cả sản phẩm đã bị xóa khỏi giỏ hàng.");
            loadCartItems();
        })
        .catch((error) => {
            console.error("Lỗi khi xóa tất cả sản phẩm:", error);
        });
}

function handlePayNow() {
    alert("🟢 Thanh toán thành công! Cảm ơn bạn đã mua hàng.");

    db.collection("products").where("onCart", "==", true).get()
        .then((querySnapshot) => {
            const batch = db.batch();
            querySnapshot.forEach((doc) => {
                batch.update(doc.ref, { onCart: false });
            });
            return batch.commit();
        })
        .then(() => {
            loadCartItems();
        })
        .catch((error) => {
            console.error("Lỗi khi xử lý thanh toán:", error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('del-all').addEventListener('click', deleteAllCartItems);
    document.getElementById('pay-now').addEventListener('click', handlePayNow);
    loadCartItems();
});


