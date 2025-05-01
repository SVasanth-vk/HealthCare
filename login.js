const users = [
    { email: "admin@gmail.com", password: "Admin123", role: "admin" },
    { email: "doctor@gmail.com", password: "Doctor123", role: "doctor" },
    { email: "patient@gmail.com", password: "Patient123", role: "patient" }
  ];
   
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
   
    const role = document.getElementById("role").value;
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
   
    if (!role || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }
   
  const user = users.find(u => u.email === email && u.password === password && u.role === role);
   
    if (!user) {
      alert("Invalid email, password, or role.");
      return;
    }
   
    if (role === "admin") {
      window.location.href = "admin-dashboard.html";
    } else if (role === "doctor") {
      window.location.href = "doctor-dashboard.html";
    } else if (role === "patient") {
      window.location.href = "patient-dashboard.html";
    }
  });