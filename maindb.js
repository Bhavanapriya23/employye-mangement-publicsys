// maindb.js

// Base API URL (your backend server)
const API_URL = "http://localhost:3000/api/employees";

// Fetch all employees
async function getEmployees() {
  const res = await fetch(API_URL);
  return res.json();
}

// Add a new employee
async function addEmployee(employee) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  return res.json();
}

// Update an employee
async function updateEmployee(id, employee) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  return res.json();
}

// Delete an employee
async function deleteEmployee(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.json();
}
