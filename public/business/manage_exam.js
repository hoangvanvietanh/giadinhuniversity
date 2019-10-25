function createListExam(studentClass,listExam) {
    var html = "";
    var j = 0;
    listExam.forEach(exam => {
        for (var i = 0; i < exam.class_take_exam.length; i++) {

            if (exam.class_take_exam[i] == studentClass) {
                j++;
                html += `<li class="header">Bài thi ${j}</li>
        <li class="grey">
            <div>
                <p style="float: left;margin-bottom: 5px;"> Mã đề :</p>
                <p style="float: right;margin-bottom: 5px;">${exam.exam_code}</p>
                <div style="clear: both;"></div>
            </div>
        </li>
        <li class="grey">
            <div>
                <p style="float: left;margin-bottom: 5px;"> Môn học:</p>
                <p style="float: right;margin-bottom: 5px;">${exam.subject}</p>
                <div style="clear: both;"></div>
            </div>
        </li>
        <li class="grey">
            <div>
                <p style="float: left;margin-bottom: 5px;"> Học kỳ:</p>
                <p style="float: right;margin-bottom: 5px;">${exam.semester}</p>
                <div style="clear: both;"></div>
            </div>
        </li>
        <li class="grey">
            <div>
                <p style="float: left;margin-bottom: 5px;"> Ngày làm:</p>
                <p style="float: right;margin-bottom: 5px;" >${Get_date_now()}</p>
                <div style="clear: both;"></div>
            </div>
        </li>
        <li class="grey">
            <div>
                <p style="float: left;margin-bottom: 5px;"> Thời gian:</p>
                <p style="float: right;margin-bottom: 5px;" >${exam.time}</p>
                <div style="clear: both;"></div>
            </div>
        </li>
        <li class="grey">
            <div>
                <p style="float: left;margin-bottom: 5px;"> Số câu hỏi:</p>
                <p style="float: right;margin-bottom: 5px;">${exam.question_list.length}</p>
                <div style="clear: both;"></div>
            </div>
        </li>
        <li class="grey">

            <button type="button" class="btn btn-primary" onclick="takeExam('${exam.exam_code}')"
                style="width: 100%;font-size: 30px;background-color: #214a80"><strong>Bắt đầu bài thi ${j}</strong> </button>
            
        </li>`
            }
        }
    });
    if (j == 0) {
        html = "Bạn không có bất cứ kỳ thi nào"
    }
    thongTinDeThi.innerHTML = html;
}

function takeExam(examCode) {
    //openFullscreen();
    localStorage.setItem("exam_code", examCode);
    document.location.href = "take_exam";
}

function lougout(studentCode) {
    btnLogout.onclick = () => {
        var dsNhatKy = Doc_Danh_sach_Nhat_ky();
        var nhatKy = {};
        if (dsNhatKy != undefined) {
            for (var i = 0; i < dsNhatKy.length; i++) {
                if (dsNhatKy[i].student_code == studentCode) {
                    nhatKy.student_code = dsNhatKy[i].student_code;
                    nhatKy.status = "offline";
                    nhatKy.keyConnect = "";
                    dsNhatKy[i] = nhatKy;
                    Ghi_nhat_ky(nhatKy);
                    localStorage.clear();
                    document.location.href = "/users/logout";
                }
            }
        }
    }
}

function Get_date_now()
{
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    return date;
}



    