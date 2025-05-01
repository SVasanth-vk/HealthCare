let appointments = [];
let appointmentId = 1;
 
// Handle form submission
document.getElementById("appointment-form").addEventListener("submit", function (e) {
  e.preventDefault();
 
  const department = document.getElementById("department").value;
  const doctor = document.getElementById("doctor").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const gender = document.getElementById("gender").value;
  const contact = document.getElementById("contact").value;
  const reason = document.getElementById("reason").value;
 
  const dateTime = `${date} ${time}`;
 
  const appointment = {
    id: appointmentId++,
    dateTime,
    doctor,
    department,
    gender,
    contact,
    reason,
    status: "Scheduled"
  };
 
  appointments.push(appointment);
  renderAppointments();
  updateAppointmentCount();
  document.getElementById("appointment-form").reset();
});
 
function renderAppointments() {
    const tbody = document.querySelector("#appointments-table tbody");
    tbody.innerHTML = "";  // Clear previous content in the table
   
    appointments.forEach(appt => {
      const row = document.createElement("tr");
   
      // Correct action buttons rendering using template literals
      const actions = appt.status === "Scheduled"
  ? `<button onclick="editAppointment(${appt.id})">Edit</button>
     <button onclick="cancelAppointment(${appt.id})">Cancel</button>`
        : `<span style="color: gray;">No Action</span>`; // No actions if cancelled
   
      row.innerHTML = `
        <td>${appt.dateTime}</td>
        <td>${appt.doctor}</td>
        <td>${appt.department}</td>
        <td>${appt.gender}</td>
        <td>${appt.contact}</td>
        <td>${appt.reason || "-"}</td>
        <td>${appt.status}</td>
        <td>${actions}</td>
      `;
   
      tbody.appendChild(row);  // Add row to the table body
    });
  }
 
function updateAppointmentCount() {
  const count = appointments.filter(a => a.status === "Scheduled").length;
  document.getElementById("appointment-count").textContent = count;
}
 
function cancelAppointment(id) {
const appt = appointments.find(a => a.id === id);
  if (appt) {
    appt.status = "Cancelled";
    renderAppointments();
    updateAppointmentCount();
  }
}
 
function editAppointment(id) {
const appt = appointments.find(a => a.id === id);
  if (appt) {
    document.getElementById("department").value = appt.department;
    populateDoctors(appt.department);
    document.getElementById("doctor").value = appt.doctor;
 
    const [date, time] = appt.dateTime.split(" ");
    document.getElementById("date").value = date;
    document.getElementById("time").value = time;
    document.getElementById("gender").value = appt.gender;
    document.getElementById("contact").value = appt.contact;
    document.getElementById("reason").value = appt.reason;
 
    // Remove old entry
appointments = appointments.filter(a => a.id !== id);
    updateAppointmentCount();
    renderAppointments();
  }
}
 
// Department and Doctor Mapping
const departmentDoctors = {
  Cardiology: ["Dr. Smith", "Dr. Green"],
  Neurology: ["Dr. Adams", "Dr. Brown"],
  Dermatology: ["Dr. White", "Dr. Patel"],
};
 
// Populate doctors based on department
function populateDoctors(department) {
  const doctorSelect = document.getElementById("doctor");
  doctorSelect.innerHTML = '<option value="">-- Choose Doctor --</option>';
 
  if (departmentDoctors[department]) {
    departmentDoctors[department].forEach(doc => {
      const option = document.createElement("option");
      option.value = doc;
      option.textContent = doc;
      doctorSelect.appendChild(option);
    });
  }
}
 
document.getElementById("department").addEventListener("change", function () {
  const selectedDept = this.value;
  populateDoctors(selectedDept);
});
 
// Optional: Logout button behavior
document.getElementById("logout-btn").addEventListener("click", () => {
  alert("Logging out...");
  window.location.href = "login.html";
});
let patientProfile = {
    name: "John Doe",
    age: 35,
    email: "john.doe@example.com"
  };
   
  // Function to render profile data
  function renderProfile() {
  document.getElementById("profile-name").textContent = patientProfile.name;
    document.getElementById("profile-age").textContent = patientProfile.age;
  document.getElementById("profile-email").textContent = patientProfile.email;
  }
   
  // When "Edit Profile" is clicked
  document.getElementById("edit-profile-btn").addEventListener("click", () => {
  document.getElementById("edit-name").value = patientProfile.name;
    document.getElementById("edit-age").value = patientProfile.age;
  document.getElementById("edit-email").value = patientProfile.email;
    document.getElementById("edit-profile-form").style.display = "block";
  });
   
  // When "Save" is clicked
  document.getElementById("save-profile-btn").addEventListener("click", () => {
  patientProfile.name = document.getElementById("edit-name").value;
    patientProfile.age = parseInt(document.getElementById("edit-age").value);
  patientProfile.email = document.getElementById("edit-email").value;
    renderProfile();
    document.getElementById("edit-profile-form").style.display = "none";
  });
   
  // When "Cancel" is clicked
  document.getElementById("cancel-edit-btn").addEventListener("click", () => {
    document.getElementById("edit-profile-form").style.display = "none";
  });
   
  // Initial render
  renderProfile();