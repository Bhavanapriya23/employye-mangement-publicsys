//  Base API URL
// When deployed, replace with your Render backend URL.
// Example: const API_URL = "https://your-backend-service.onrender.com/api/employees";
const API_URL = "/api/employees"; // Relative path for public safety

/**
 * Fetch all employees
 * @returns {Promise<Array>} List of employees
 */
export async function getEmployees() {
  try {
    const res = await fetch(API_URL);
    return await res.json();
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
}

/**
 * Add a new employee
 * @param {Object} employee - Employee data
 */
export async function addEmployee(employee) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });
    return await res.json();
  } catch (error) {
    console.error("Error adding employee:", error);
    return { error: "Failed to add employee" };
  }
}

/**
 * Update an employee
 * @param {string} id - Employee ID
 * @param {Object} employee - Updated employee data
 */
export async function updateEmployee(id, employee) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });
    return await res.json();
  } catch (error) {
    console.error("Error updating employee:", error);
    return { error: "Failed to update employee" };
  }
}

/**
 * Delete an employee
 * @param {string} id - Employee ID
 */
export async function deleteEmployee(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return await res.json();
  } catch (error) {
    console.error("Error deleting employee:", error);
    return { error: "Failed to delete employee" };
  }
}

