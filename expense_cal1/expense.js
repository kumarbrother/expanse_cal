const expenseForm = document.querySelector('#expense-form');
const expenseList = document.querySelector('#expense-items');
const categoryDropdown = document.querySelector('#expense-category');

// Track the item being edited
let editingItem = null;

// Add new expense or update existing one
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const expenseName = document.querySelector('#expense-name').value.trim();
    const expenseAmount = document.querySelector('#expense-amount').value.trim();
    const expenseCategory = categoryDropdown.value;

    if (!expenseName || !expenseAmount) {
        alert('Please fill in all fields!');
        return;
    }

    if (editingItem) {
        // Update the existing expense
        editingItem.querySelector('.expense-name').textContent = expenseName;
        editingItem.querySelector('.expense-amount').textContent = `$${expenseAmount}`;
        editingItem.querySelector('.expense-category').textContent = `(${expenseCategory})`;

        editingItem = null; // Clear the editing reference
    } else {
        // Create new list item
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong class="expense-name">${expenseName}</strong>: 
            <span class="expense-amount">$${expenseAmount}</span> 
            <span class="expense-category">(${expenseCategory})</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;

        expenseList.appendChild(listItem);
    }

    // Reset the form
    expenseForm.reset();
});

// Handle edit and delete buttons
expenseList.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('delete-btn')) {
        // Delete the expense
        target.parentElement.remove();
    } else if (target.classList.contains('edit-btn')) {
        // Edit the expense
        const listItem = target.parentElement;

        // Ensure the necessary elements exist before accessing their properties
        const expenseNameElement = listItem.querySelector('.expense-name');
        const expenseAmountElement = listItem.querySelector('.expense-amount');
        const expenseCategoryElement = listItem.querySelector('.expense-category');

        if (expenseNameElement && expenseAmountElement && expenseCategoryElement) {
            // Populate the form with current details
            const expenseName = expenseNameElement.textContent;
            const expenseAmount = expenseAmountElement.textContent.replace('$', '');
            const expenseCategory = expenseCategoryElement.textContent.replace(/[()]/g, '');

            document.querySelector('#expense-name').value = expenseName;
            document.querySelector('#expense-amount').value = expenseAmount;
            categoryDropdown.value = expenseCategory.toLowerCase();

            editingItem = listItem; // Keep track of the item being edited
        } else {
            console.error('Error: Missing elements inside the list item.');
        }
    }
});
