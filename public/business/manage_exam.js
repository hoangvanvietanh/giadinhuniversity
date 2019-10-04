var examCode = document.getElementById("exam_code");
var studentCode = localStorage.getItem("student_code");
var theExam;


function checkExamCode(examCode) {
    var flag = 0;
    examList.forEach(exam => {
        if (exam.exam_code == examCode) {
            theExam = exam;
            localStorage.setItem("exam_code", exam.exam_code)
            flag++;
        }

    })
    if (flag != 0) {
        return true;
    } else {
        return false;
    }
}

function getInfoStudent(studentCode) {
    var theStudent;
    studentsList.forEach(student => {
        if (student.student_code == studentCode) {
            theStudent = student;
        }
    })
    return theStudent;
}
dong_y.onclick = () => {
    if (checkExamCode(examCode.value) == true) {
        ma_de_thi.innerHTML = theExam.exam_code;
        chu_de.innerHTML = theExam.topic;
        thoi_gian.innerHTML = theExam.time + " phút";
        so_cau_hoi.innerHTML = theExam.question_list.length + " câu";
        document.getElementById("nhap_ma_de").classList.add('hidden');
        document.getElementById("thong_tin").classList.remove('hidden');

    } else {
        thong_bao.innerHTML = "Mã đề không tồn tại"
    }
}