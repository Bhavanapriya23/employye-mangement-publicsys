const API_URL = "/api/employees";

const form = document.getElementById("employeeForm");
const tableBody = document.querySelector("#employeeTable tbody");
let editingEmployeeId = null;


// Load all employees when the page loads
window.onload = loadEmployees;

// Fetch and display all employees
async function loadEmployees() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to load employees");
    const employees = await res.json();
    tableBody.innerHTML = "";

    employees.forEach((emp) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${emp.name}</td>
        <td>${emp.employeeId}</td>
        <td>${emp.dob ? new Date(emp.dob).toLocaleDateString() : "-"}</td>
        <td>${emp.gender}</td>
        <td>${emp.designation}</td>
        <td>
          <button class="edit-btn" onclick="editEmployee('${emp._id}')">Edit</button>
          <button class="delete-btn" onclick="removeEmployee('${emp._id}')">Delete</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  } catch (err) {
    console.error("Error loading employees:", err);
  }
}

// Handle form submission (Create or Update)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const employee = {
    name: document.getElementById("name").value,
    employeeId: document.getElementById("employeeId").value,
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value,
    designation: document.getElementById("designation").value,
  };

  try {
    if (editingEmployeeId) {
      // Update existing employee
      const res = await fetch(`${API_URL}/${editingEmployeeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });
      if (!res.ok) throw new Error("Failed to update employee");
      editingEmployeeId = null;
    } else {
      // Create new employee
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });
      if (!res.ok) throw new Error("Failed to add employee");
    }

    form.reset();
    loadEmployees();
  } catch (err) {
    console.error("Error saving employee:", err);
  }
});

// Load employee data into form for editing
async function editEmployee(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch employee");
    const emp = await res.json();

    document.getElementById("name").value = emp.name;
    document.getElementById("employeeId").value = emp.employeeId;
    document.getElementById("dob").value = emp.dob ? emp.dob.split("T")[0] : "";
    document.getElementById("gender").value = emp.gender;
    document.getElementById("designation").value = emp.designation;

    editingEmployeeId = id;
  } catch (err) {
    console.error("Error editing employee:", err);
  }
}

// Delete an employee
async function removeEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete employee");
      loadEmployees();
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  }
}

