
let students = JSON.parse(localStorage.getItem("students")) || [];

function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}

function addStudent() {
  const name = document.getElementById("name").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const grade = Number(document.getElementById("grade").value);

  if (!name || !subject || document.getElementById("grade").value === "") {
    alert("من فضلك املئي جميع البيانات");
    return;
  }

  if (grade < 0 || grade > 100) {
    alert("الدرجة لازم تكون من 0 إلى 100");
    return;
  }

  students.push({ name, subject, grade });
  saveStudents();

  document.getElementById("name").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("grade").value = "";

  displayStudents();
}

function displayStudents() {
  const list = document.getElementById("studentList");
  const search = document.getElementById("search").value.toLowerCase();

  list.innerHTML = "";

  students.forEach((student, index) => {
    if (
      student.name.toLowerCase().includes(search) ||
      student.subject.toLowerCase().includes(search)
    ) {
      const status = student.grade >= 50 ? "ناجح" : "راسب";
      const evaluation =
        student.grade >= 90 ? "ممتاز" :
        student.grade >= 80 ? "جيد جداً" :
        student.grade >= 65 ? "جيد" :
        student.grade >= 50 ? "مقبول" : "ضعيف";

      list.innerHTML += `
        <tr>
          <td>${student.name}</td>
          <td>${student.subject}</td>
          <td>${student.grade}</td>
          <td>${status}</td>
          <td>${evaluation}</td>
          <td><button onclick="deleteStudent(${index})">حذف</button></td>
        </tr>
      `;
    }
  });

  updateStats();
}

function deleteStudent(index) {
  if (confirm("هل تريد حذف هذه النتيجة؟")) {
    students.splice(index, 1);
    saveStudents();
    displayStudents();
  }
}

function updateStats() {
  document.getElementById("total").textContent = students.length;

  document.getElementById("success").textContent =
    students.filter(student => student.grade >= 50).length;

  const average = students.length
    ? students.reduce((sum, student) => sum + student.grade, 0) / students.length
    : 0;

  document.getElementById("average").textContent = average.toFixed(2);
}

displayStudents();
