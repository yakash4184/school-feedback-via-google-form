const teachers = [
  {
    name: "Mr. YATENDRA KUMAR YADAV",
    photo: "../assets/teachers/YATENDRA_KUMAR_YADAV-removebg-preview.png",
  },
  {
    name: "Ms. SUSHAMA UPADHAYAY",
    photo: "../assets/teachers/SUSHAMA_UPADHAYAY-removebg-preview.png",
  },
  {
    name: "Ms. SHUSAMA SHASTRI",
    photo: "../assets/teachers/SHUSAMA_SHASTRI-removebg-preview.png",
  },
  {
    name: "Ms. VARTIKA YADAV",
    photo: "../assets/teachers/SHIWANI_YADAV-removebg-preview.png",
  },
  {
    name: "Ms. SAVITA SINGH",
    photo: "../assets/teachers/SAVITA_SINGH-removebg-preview.png",
  },
  {
    name: "Ms. RESHAMA YADAV",
    photo: "../assets/teachers/RESHAMA_YADAV-removebg-preview.png",
  },
  {
    name: "Mr. RAKESH KUMAR BIND",
    photo: "../assets/teachers/RAKESH_KUMAR_BIND-removebg-preview.png",
  },
  {
    name: "Mr. RAHUL GUPTA",
    photo: "../assets/teachers/RAHUL_GUPTA-removebg-preview.png",
  },
  {
    name: "Ms. POOJA TIWARI",
    photo: "../assets/teachers/POOJA_TIWARI-removebg-preview.png",
  },
  {
    name: "Ms. NEELAM YADAV",
    photo: "../assets/teachers/NEELAM_YADAV-removebg-preview.png",
  },
  {
    name: "Ms. KANCHAN YADAV",
    photo: "../assets/teachers/KANCHAN_YADAV-removebg-preview.png",
  },
  {
    name: "Ms. HARSITA DIXIT",
    photo: "../assets/teachers/HARSITA_DIXIT-removebg-preview.png",
  },
  {
    name: "Ms. BABITA YADAV",
    photo: "../assets/teachers/BABITA_YADAV-removebg-preview.png",
  },
  {
    name: "Ms. ANJUM BANO",
    photo: "../assets/teachers/ANJUM_BANO-removebg-preview.png",
  },
  {
    name: "Mr. ANAND KUMAR BIND",
    photo: "../assets/teachers/ANAND_KUMAR_BIND-removebg-preview.png",
  },
];

const welcomePanel = document.getElementById("welcomePanel");
const formPanel = document.getElementById("formPanel");
const successPanel = document.getElementById("successPanel");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const teacherPhoto = document.getElementById("teacherPhoto");
const teacherName = document.getElementById("teacherName");
const teacherMeta = document.getElementById("teacherMeta");
const skipTeacherBtn = document.getElementById("skipTeacher");
const prevBtn = document.getElementById("prevBtn");

const form = document.getElementById("feedbackForm");
const studentName = document.getElementById("studentName");
const studentClass = document.getElementById("studentClass");
const studentSection = document.getElementById("studentSection");
const studentNameError = document.getElementById("studentNameError");
const comments = document.getElementById("comments");
const statusNote = document.getElementById("statusNote");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

if (teacherPhoto) {
  teacherPhoto.loading = "lazy";
  teacherPhoto.decoding = "async";
}


const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf5nwZnYLhpkd3euTwvkPRFKh144iv3m8QuScpCc00Nzh9paA/formResponse";

const ENTRY = {
  studentName: "entry.1595149144",
  studentClass: "entry.444093797",
  studentSection: "entry.253041247",
  teacherName: "entry.1611097108",
  rating: "entry.1604027573",
  clarity: "entry.373365873",
  behaviour: "entry.1707014077",
  comments: "entry.1476556732",
};

const ratingFields = ["rating", "clarity", "behaviour"];
const ratings = {
  rating: 0,
  clarity: 0,
  behaviour: 0,
};

let currentIndex = 0;
const responses = [];

function setupRatings() {
  document.querySelectorAll(".rating").forEach((container) => {
    const field = container.dataset.field;
    container.innerHTML = "";
    for (let i = 1; i <= 5; i += 1) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = i;
      btn.addEventListener("click", () => {
        ratings[field] = i;
        updateRatingUI(field);
      });
      container.appendChild(btn);
    }
  });
}

function updateRatingUI(field) {
  const container = document.querySelector(`.rating[data-field="${field}"]`);
  if (!container) return;
  const buttons = container.querySelectorAll("button");
  buttons.forEach((btn, index) => {
    btn.classList.toggle("active", index < ratings[field]);
  });
}


function scrollToFormTop() {
  formPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function loadTeacher() {
  const teacher = teachers[currentIndex];
  teacherPhoto.src = teacher.photo;
  teacherName.textContent = teacher.name;
  if (teacher.meta) {
    teacherMeta.textContent = teacher.meta;
    teacherMeta.style.display = "block";
  } else {
    teacherMeta.textContent = "";
    teacherMeta.style.display = "none";
  }

  ratingFields.forEach((field) => {
    ratings[field] = 0;
    updateRatingUI(field);
  });

  comments.value = "";
  statusNote.textContent = "";

  if (currentIndex === teachers.length - 1) {
    nextBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
  } else {
    nextBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
  }

  if (prevBtn) {
    prevBtn.classList.toggle("hidden", currentIndex === 0);
  }

  scrollToFormTop();
}

function showPanel(panel) {
  [welcomePanel, formPanel, successPanel].forEach((el) => {
    if (!el) return;
    el.classList.toggle("hidden", el !== panel);
  });
}

function collectResponse(skipped) {
  const teacher = teachers[currentIndex];
  teacherPhoto.src = teacher.photo;
  responses.push({
    teacher: teacher.name,
    skipped,
    rating: ratings.rating,
    clarity: ratings.clarity,
    behaviour: ratings.behaviour,
    comments: comments.value.trim(),
    studentName: studentName.value.trim(),
    studentClass: studentClass.value.trim(),
    studentSection: studentSection.value.trim(),
  });
}

function validateBasics() {
  if (!studentName.value.trim() || !studentClass.value.trim() || !studentSection.value) {
    if (studentNameError) {
      studentNameError.textContent = "Please fill in student details before continuing.";
    }
    scrollToField(studentName);
    return false;
  }
  if (studentNameError) {
    studentNameError.textContent = "";
  }
  return true;
}

function scrollToField(field) {
  field.scrollIntoView({ behavior: "smooth", block: "center" });
  field.focus({ preventScroll: true });
}

[studentName, studentClass, studentSection].forEach((field) => {
  field.addEventListener("input", () => {
    if (studentNameError) {
      studentNameError.textContent = "";
    }
  });
});

async function submitToGoogleForm(response) {
  const data = new URLSearchParams();
  data.append(ENTRY.studentName, response.studentName);
  data.append(ENTRY.studentClass, response.studentClass);
  data.append(ENTRY.studentSection, response.studentSection);
  data.append(ENTRY.teacherName, response.teacher);
  data.append(ENTRY.rating, response.skipped ? "Not taught" : String(response.rating || ""));
  data.append(ENTRY.clarity, response.skipped ? "" : String(response.clarity || ""));
  data.append(ENTRY.behaviour, response.skipped ? "" : String(response.behaviour || ""));
  data.append(ENTRY.comments, response.skipped ? "Not taught" : response.comments);

  await fetch(GOOGLE_FORM_URL, {
    method: "POST",
    mode: "no-cors",
    body: data,
  });
}

async function submitAll() {
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";
  statusNote.textContent = "Submitting your feedback...";

  for (const response of responses) {
    await submitToGoogleForm(response);
  }

  submitBtn.disabled = false;
  submitBtn.textContent = "Submit Feedback";
  showPanel(successPanel);
}

startBtn.addEventListener("click", () => {
  showPanel(formPanel);
  currentIndex = 0;
  responses.length = 0;
  setupRatings();
  loadTeacher();
  scrollToFormTop();
});

restartBtn.addEventListener("click", () => {
  studentName.value = "";
  studentClass.value = "";
  studentSection.value = "";
  showPanel(welcomePanel);
});

skipTeacherBtn.addEventListener("click", () => {
  if (!validateBasics()) return;
  collectResponse(true);
  if (currentIndex < teachers.length - 1) {
    currentIndex += 1;
    loadTeacher();
  } else {
    submitAll();
  }
});

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (currentIndex === 0) return;
    responses.pop();
    currentIndex -= 1;
    loadTeacher();
  });
}

nextBtn.addEventListener("click", () => {
  if (!validateBasics()) return;
  collectResponse(false);
  if (currentIndex < teachers.length - 1) {
    currentIndex += 1;
    loadTeacher();
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!validateBasics()) return;
  collectResponse(false);
  await submitAll();
});

showPanel(welcomePanel);
setupRatings();
