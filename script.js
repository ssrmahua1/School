let studentsData = {};

function loadCSV() {
    fetch('students_data.csv')
        .then(response => response.text())
        .then(data => {
            parseCSV(data);
        })
        .catch(error => {
            console.error("Error loading CSV data: ", error); // You can keep this for debugging purposes
        });
}

// Parse CSV Data
function parseCSV(csvData) {
    const rows = csvData.split('\n');
    const headers = rows[0].split(','); // Assumes the first row contains headers

    rows.slice(1).forEach(row => {
        const columns = row.split(',');

        const school = columns[0].trim();
        const studentData = {
            class: columns[1].trim(),
            rollNo: columns[2].trim(),
            name: columns[3].trim(),
            hindi: parseInt(columns[4].trim()),
            english: parseInt(columns[5].trim()),
            math: parseInt(columns[6].trim()),
            science: parseInt(columns[7].trim()),
            social: parseInt(columns[8].trim()),
            computer: parseInt(columns[9].trim()),
            totalMarks: parseInt(columns[10].trim()),
            cgpa: parseFloat(columns[11].trim()),
            passFail: columns[12].trim()
        };

        if (!studentsData[school]) {
            studentsData[school] = [];
        }
        studentsData[school].push(studentData);
    });

    console.log("CSV data loaded:", studentsData);
}

function displayResult() {
    const schoolName = document.getElementById('school').value;
    const className = document.getElementById('class').value;
    const rollNumber = document.getElementById('roll-number').value;

    const student = studentsData[schoolName]?.find(s => s.rollNo == rollNumber && s.class == className);

    if (student) {
        document.getElementById('school-name').innerText = schoolName;
        document.getElementById('class-result').innerText = student.class;
        document.getElementById('roll-number-result').innerText = student.rollNo;
        document.getElementById('student-name-result').innerText = student.name;

        const resultTable = document.getElementById('result-table');
        resultTable.innerHTML = `
            <tr><td>Hindi</td><td>${student.hindi}</td></tr>
            <tr><td>English</td><td>${student.english}</td></tr>
            <tr><td>Maths</td><td>${student.math}</td></tr>
            <tr><td>Science</td><td>${student.science}</td></tr>
            <tr><td>Social</td><td>${student.social}</td></tr>
            <tr><td>Computer</td><td>${student.computer}</td></tr>
            <tr><td>Total Marks</td><td>${student.totalMarks}</td></tr>
            <tr><td>Percentage</td><td>${student.cgpa}</td></tr>
            <tr><td>Pass/Fail</td><td>${student.passFail}</td></tr>
        `;

        document.getElementById('result-container').style.display = 'block';
    } else {
        alert("Student not found. Please check the roll number and class.");
    }
}

// Load the CSV when the page loads
window.onload = loadCSV;
