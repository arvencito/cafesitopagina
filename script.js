let invoice = [];
let total = 0;

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function addToInvoice(product, price) {
    const item = invoice.find(p => p.product === product);
    if (item) {
        item.quantity++;
        item.subtotal += price;
    } else {
        invoice.push({ product, price, quantity: 1, subtotal: price });
    }
    total += price;
    updateInvoiceTable();
}

function updateInvoiceTable() {
    const tableBody = document.getElementById('invoice-table');
    tableBody.innerHTML = '';
    invoice.forEach(item => {
        tableBody.innerHTML += `
            <tr>
                <td>${item.product}</td>
                <td>S/${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>S/${item.subtotal.toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm" onclick="removeFromInvoice('${item.product}')">Eliminar</button></td>
            </tr>
        `;
    });
    document.getElementById('total-amount').textContent = total.toFixed(2);
}

function removeFromInvoice(product) {
    const index = invoice.findIndex(p => p.product === product);
    if (index !== -1) {
        total -= invoice[index].subtotal;
        invoice.splice(index, 1);
        updateInvoiceTable();
    }
}

function printInvoice() {
    const clientName = document.getElementById('client-name').value.trim();
    if (!clientName) {
        alert('Por favor, ingresa el nombre del cliente.');
        return;
    }

    let invoiceContent = `Factura para ${clientName}\n\nProducto\tPrecio\tCantidad\tSubtotal\n`;
    invoice.forEach(item => {
        invoiceContent += `${item.product}\tS/${item.price.toFixed(2)}\t${item.quantity}\tS/${item.subtotal.toFixed(2)}\n`;
    });
    invoiceContent += `\nTotal: S/${total.toFixed(2)}`;
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`<pre>${invoiceContent}</pre>`);
    newWindow.document.close();
    newWindow.print();
}