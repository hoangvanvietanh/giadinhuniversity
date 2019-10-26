var examCode = localStorage.getItem("exam_code");
var studentCode = localStorage.getItem("student_code")

var cau_hoi_thi = "";
var html = "";
var htmlTienDo = "";
var j = 0;
var timeCount = 0;
var status = 0;
var cauDaLam = 0;
var submit = false;
var array = [];
var scores = 0;
var l = 1;
var examTake = {};
var totalNumberOfSentences = 0; //A number of total question
var SinhVien = JSON.parse(idUser.value);
soCauLam.innerHTML = `Số câu đã làm: 0`
createTheExam(examCode, JSON.parse(idListExam.value));
//***Create the exam**********************
function createTheExam(examCode, listExam) {

    listExam.forEach(exam => {
        if (exam.exam_code == examCode) {
            examTake = exam;
            totalNumberOfSentences = exam.question_list.length; //Get length of answer system
            ma_de.innerHTML = exam.exam_code; //Get code of the exam
            thoi_gian.innerHTML = exam.time + " phút"; //Get the time of the exam
            localStorage.setItem("timeOfExam", exam.time + ":0");
            mon_hoc.innerHTML = exam.subject;
            hoc_ky.innerHTML = exam.semester;
            ngay_lam.innerHTML = Get_date_now();
            var time = localStorage.getItem("timeCount");
            if (time != undefined) {
                timeCount = localStorage.getItem("timeCount");
            }
            else {
                timeCount = exam.time; //Set time count down
            }

            if (timeCount == exam.time) {
                $(window).on('load', function () {
                    $('#modelId').modal('show');
                });
                $(document).ready(function () {
                    $("#modelId").modal({
                        show: false,
                        backdrop: 'static'
                    });

                });
                exam.question_list.sort(function (a, b) {
                    return 0.5 - Math.random()
                });
                //localStorage.setItem("listQuestionRandom",JSON.stringify(exam.question_list));
            }

            //Create the questions for the exam
            tongCauHoi.innerHTML = `Tổng: ${exam.question_list.length}`
            tongCauHoi2.innerHTML = `${exam.question_list.length} câu`
            var examListQuestion = exam.question_list;

            if (localStorage.getItem("listQuestionRandom") != undefined && timeCount != exam.time) {
                examListQuestion = JSON.parse(localStorage.getItem("listQuestionRandom"))
            }

            var totalAnswerInStore = 0;
            examListQuestion.forEach(content => {
                var deBai = content.question.split("_")
                var store_Anser;
                var checkAnswer = 0;
                j++;

                if (deBai.length == 2) {
                    html += `<tbody class="form"  width="100%"> <tr>
            <td id="${j}CH"><b> Câu ${j}: ${deBai[0]} </b></br>
            <img src="https://dv-media-vietanh.herokuapp.com/${deBai[1]}" alt="" height=25% width=50%></img></b>
            </td>
            `
                    store_Anser = localStorage.getItem(deBai[0])
                    if (store_Anser != null) {
                        store_Anser = store_Anser.trim()
                    }
                } else {
                    html += `<tbody width="100%"> <tr>
            <td id="${j}CH"><b> Câu ${j}: ${content.question} </b></td>
            `
                    store_Anser = localStorage.getItem(content.question)
                    if (store_Anser != null) {
                        store_Anser = store_Anser.trim()
                    }
                }

                if (store_Anser == null) {
                    checkAnswer++;
                }
                if (timeCount == exam.time) {
                    content.answer_list.sort(function (a, b) {
                        return 0.5 - Math.random()
                    });
                }

                for (var k = 0; k < content.answer_list.length; k++) {
                    //console.log("=>" + store_Anser + "--" + content.answer_list[k] + "<-")
                    if (store_Anser == content.answer_list[k]) {

                        html += `
            <tr >
            <td class="inputGroup" style="padding: 0rem;border-top: none;" id="${j}-${k}"><input type="radio" id="CH_${j}-${k}_lb" name="CH_${j}" value="${k}_${
                            content.answer_list[k]
                            } " checked> <label style="margin-bottom:1px;" for="CH_${j}-${k}_lb">${content.answer_list[k]}</label> </td>
            </tr>
            `
                    }
                    else {
                        html += `
            <tr >
            <td class="inputGroup" style="padding: 0rem;border-top: none;" id="${j}-${k}"><input type="radio" id="CH_${j}-${k}_lb" name="CH_${j}" value="${k}_${
                            content.answer_list[k]
                            }"> <label style="margin-bottom:1px;" for="CH_${j}-${k}_lb">${content.answer_list[k]}</label> </td>
            </tr>
            `
                    }

                }
                html += `
            <tr>
            <input type="hidden" id="Cau_${j}" value="${content.correct_answer}">
        </tr><tbody>`;

                if (checkAnswer != 0) {
                    if (j == l) {
                        l = l + 3;
                        htmlTienDo += `<tr><td style="padding: 0;"> ${createCheckBoxNotCheckedHTML(j)} </td>`
                    }
                    else if (j % 3 == 0) {
                        htmlTienDo += `<td style="padding: 0;"> ${createCheckBoxNotCheckedHTML(j)} </td></tr>`
                    } else {
                        htmlTienDo += `<td style="padding: 0;"> ${createCheckBoxNotCheckedHTML(j)} </td>`
                    }
                }
                else {
                    array.push(`${j}`);
                    totalAnswerInStore++;
                    if (j == l) {
                        l = l + 3;
                        htmlTienDo += `<tr><td style="padding: 0;"> ${createCheckBoxCheckedHTML(j)} </td>`
                    }
                    else if (j % 3 == 0) {
                        htmlTienDo += `<td style="padding: 0;"> ${createCheckBoxCheckedHTML(j)} </td></tr>`
                    } else {
                        htmlTienDo += `<td style="padding: 0;"> ${createCheckBoxCheckedHTML(j)} </td>`
                    }
                }
            });
            if (timeCount == exam.time) {
                localStorage.setItem("listQuestionRandom", JSON.stringify(exam.question_list));
            }
            soCauLam.innerHTML = `Số câu đã làm: ${totalAnswerInStore}`;
            cauDaLam = totalAnswerInStore;
        }
    });
}



//*****Change javascript to html with innerHTML************
noi_dung_thi.innerHTML = html;
tien_do.innerHTML = htmlTienDo;
tien_do2.innerHTML = htmlTienDo;
time_count.innerHTML = timeCount + ":" + 00
bam_nop_bai.innerHTML = `<button type="button" class="btn btn-primary" style="width: 100%;background-color:#214a80" id="nop_bai">Nộp bài</button>`
soCauLam2.innerHTML = `0 /`
//Create grading function
var i = 0;
var numberOfCorrectSentences = 0;

function gradingExam(examCode, exam) {
    //A number of correct answers
    //Get the question
    exam.question_list.forEach(question => {
        //Get the exam with the code

        i++;
        
        var radios = document.getElementsByName(`CH_${i}`); //Get the answer
        var correctAnswer = document.getElementById(`Cau_${i}`); //Get results
        var answer = "";

        for (var j = 0, length = radios.length; j < length; j++) {
            var flag = 0;


            var valueChecked = radios[j].value.split("_"); //Get value of radio checked
            //*****Check radio checked*****
            if (radios[j].checked) {

                answer = valueChecked[1];
                //********Check correct sentence**********
                if (correctAnswer.value == valueChecked[1].trim()) {
                    // $("td#" + `${i + "-" + valueChecked[0]}`).css("background-color", "green"); //Change color with id tag "td" of correct sentence 
                    $("a#" + `${i}TA`).css("color", "green"); //Change color tag "a" of correct sentence
                    numberOfCorrectSentences++;
                    flag++;
                }
            }

            //**********Check incorrect sentence***********
            if (valueChecked[1] == correctAnswer.value && flag == 0) {
                $("td#" + `${i + "-" + valueChecked[0]}`).css("background-color", "#96f23a") //Change color with id tag "td" of incorrect sentce
                $("a#" + `${i}TA`).css("color", "red"); //Change color tag "a" of incorrect sentence
            }
        }
        //console.log(dap_an_dung.value + dap_an_tra_loi)

        // if (dap_an_dung.value == dap_an_tra_loi) {
        //     cauDung++; //count the correct sentence
        // }

    });
    bam_nop_bai.innerHTML = `Số câu đúng : ${numberOfCorrectSentences}/${i}`
    scores = numberOfCorrectSentences / i * 10;
    tongDiem.innerHTML = `Tổng điểm: ${scores.toFixed(2)}`
}

//*****Submit exam*******************
nop_bai.onclick = () => {

    var checkTime = time_count.innerHTML;
    if (checkTime != "Hoàn thành bài thi") {
        var logout = confirm("Bạn vẫn còn thời gian làm bài, bạn có chắc chắc muốn nộp bài ?");
        if (logout) {
            nopBaiThi(SinhVien);
        }
        else {
            setTimeout(function () {
                openFullscreen();
            }, 1000);
        }
    }
    else {
        nopBaiThi(SinhVien);
    }
};


function nopBaiThi(SinhVien) {
    submit = true;
    sessionStorage.removeItem("time");
    status++;
    time_count.innerHTML = "Hoàn thành bài thi";
    $(':radio:not(:checked)').attr('disabled', true); //Cannot allow people can check radio
    gradingExam(examCode, examTake);

    var duLieu = {};
    duLieu.exam_code = examCode;
    duLieu.subject = mon_hoc.innerHTML;
    duLieu.semester = hoc_ky.innerHTML;
    duLieu.date = ngay_lam.innerHTML;
    duLieu.exam_score = scores.toFixed(2);

    post("/exam/take_exam", duLieu);
    createReport(SinhVien.full_name, SinhVien.student_code, SinhVien.student_class.class_name, SinhVien.student_class.faculty, SinhVien.identity_card_number, SinhVien.sex, SinhVien.date_of_birth, SinhVien.place_of_birth, examCode, mon_hoc.innerHTML, `${numberOfCorrectSentences}/${totalNumberOfSentences}`, `${scores.toFixed(2)}`, ngay_lam.innerHTML)

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
            }
        }
    }
    alert("Bạn có 10 giây kể từ lúc thông báo này để xem lại đáp án đúng trước khi tự động logout");
}

var flag2 = 0;
//*********************Can click on tag "tr" on table ************************************
$('#noi_dung_thi tr').click(function () {
    if (status == 0) {
        //****Click td can selected radio*******************
        $(this).find('td input:radio').prop('checked', true);
        var contentAnswer = $(this).find('td input:radio')[0];
        if (contentAnswer != undefined) {
            var idQues = contentAnswer.name.split("_");
            var ans = contentAnswer.value.toString().slice(2);
            var ques = document.getElementById(idQues[1] + idQues[0]).textContent.slice(8).trim();
            //openFullscreen();
            if (typeof (Storage) !== "undefined") {
                // Store
                localStorage.setItem(ques, ans);
            }
        }


        //*****Change color when click tag "tr" on table********
        // $(this)
        //     .closest("tr")
        //     .siblings()
        //     .css("background-color", "white")
        //     .end()
        //     .css("background-color", "skyblue");

        //******Get value "name" in tag "input"*********************
        var a = $(this).find('td input:radio').prop('checked', true)
        if (a[0] != undefined) {
            //console.log("Vào" + a[0])

            var laySttCH = a[0].name.split("_");

            //******Find checkbox with value******************************
            var as = $(`input[type=checkbox][value=${laySttCH[1]}]`).prop("checked", true);
            //console.log(laySttCH[1])

            var flag3 = 0;
            if (flag2 != 0) {
                for (var i = 0; i < array.length; i++) {
                    // console.log(array[i] + "------" + as[0].value)
                    if (as[0].value == array[i]) {
                        flag3++;
                        break;
                    }
                    // console.log("flag: " + flag3 + "---" + as[0].value)
                }
                if (flag3 == 0) {
                    cauDaLam++;
                    soCauLam.innerHTML = `Số câu đã làm: ${cauDaLam}`
                    soCauLam2.innerHTML = `${cauDaLam} /`
                }
            } else {
                cauDaLam++;
                soCauLam.innerHTML = `Số câu đã làm: ${cauDaLam}`
                soCauLam2.innerHTML = `${cauDaLam} /`
            }
            array.push(as[0].value)
            //console.log(as[0].value)
            flag2++;
        }

    }
})

//************************************Checkbox readonly*******************************************
$(document.body).delegate('[type="checkbox"][readonly="readonly"]', 'click', function (e) {
    e.preventDefault();
});


//******************************Time count down***************************************
function startTimer() {
    var presentTime = document.getElementById('time_count').innerHTML;
    var status = document.getElementById("time_count");
    //console.log(status.innerHTML)
    localStorage.setItem("timeCount", status.innerHTML);
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) {
        m = m - 1
    }
    document.getElementById('time_count').innerHTML =
        m + ":" + s;
    if (m >= 0 && s >= 0) {
        setTimeout(startTimer, 1000);
    } else {
        if (submit == false) {
            time_count.innerHTML = "Hoàn thành bài thi";
            localStorage.clear();
            nop_bai.click();
        } else {
            time_count.innerHTML = "Hoàn thành bài thi";
            localStorage.clear();
        }

    }

}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {
        sec = "0" + sec
    }; // add zero in front of numbers < 10
    if (sec < 0) {
        sec = "59"
    };
    return sec;
}
//**********************************************************************************

// window.onresize = function(event) {

// };

if (screen.width >= 992 && screen.width <= 1196) {
    if (document.getElementById("lam_bai_thi").classList.contains('col-lg-7')) {
        document.getElementById("lam_bai_thi").classList.remove('col-lg-7');
        document.getElementById("lam_bai_thi").classList.add('col-lg-6');
        document.getElementById("thong_tin_bai_thi").classList.remove('col-lg-3');
        document.getElementById("thong_tin_bai_thi").classList.add('col-lg-4');
    } else if (document.getElementById("lam_bai_thi").classList.contains('col-lg-9')) {
        document.getElementById("lam_bai_thi").classList.remove('col-lg-9');
        document.getElementById("lam_bai_thi").classList.add('col-lg-8');
    }
} else {
    if (document.getElementById("lam_bai_thi").classList.contains('col-lg-6')) {
        document.getElementById("lam_bai_thi").classList.remove('col-lg-6');
        document.getElementById("lam_bai_thi").classList.add('col-lg-7');
        document.getElementById("thong_tin_bai_thi").classList.remove('col-lg-4');
        document.getElementById("thong_tin_bai_thi").classList.add('col-lg-3');
    } else if (document.getElementById("lam_bai_thi").classList.contains('col-lg-8')) {
        document.getElementById("lam_bai_thi").classList.remove('col-lg-8');
        document.getElementById("lam_bai_thi").classList.add('col-lg-9');
    }

}

if (screen.width >= 992) {
    $("#btn_tien_do").hide();
    $("#thong_tin_tien_do").show();
} else {
    $("#btn_tien_do").show();
    $("#thong_tin_tien_do").hide();
}

function do_change() {
    document.getElementById("btn_tien_do").style.display = "block";
}

function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

function createReport(name, stu_code, class_name, faculty, id_card, gender, dob, pob, exam_code, topic, results, score, date) {
    var doc = new jsPDF({
        unit: 'pt',
        orientation: 'p',
        format: [500, 400],
        //lineHeight: 1.2
    })
    var imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAACAvzbMAAAACXBIWXMAAC4jAAAuIwF4pT92AAAgAElEQVR42uxdB5gcxdHl7gQIBMJEyQSDTQaBkMg5ZzBBM7uHRI4i52xMkACByTnbBBPnSCJJJAMm2BjtKYBQxERjG/NjjDFcmr9ed9VMTe/saU86SadT1/f1t3l2dqe7Xld6tcACXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFixcvXrx48eLFS7k0NoRmJPejMHnOfW1unmMpst9fUvcbo3CunY/9/iD9z9R9/V968eLFy+xVSFGqqEk51swupd3YEChACPC9+K5aUsp19L09Gs1tUJN3fl0C3HB+DUENnW8t3a/Rv2VugYgWe25BHb3Wg29r3evZ2ecqxzMAFoW1c/uaefHiZQ5KSSkVKMX2FNSs7t7Nfat8SRGHNe18hpSeUdS98d45bYFkgCNi4IiCvPeZ36EtgjkD+KK0Q4BEb/N/5QCvUuY4RwMoDiB22gZEX7tkXkWBX2BevHRby0MtcigXVgbrk8JfYlZ3kY61UVPKUcJ0/KXpPZvQOJJeG0G399N4gd77BxqT6f41c9Idk7U4zPnXOa/vTuNZeu1quv2pAuEskMxmsHMso+sa7X+F/+x5un2AbvFfHkljU/pfl875rLGkrMUZzNL5qvPoRWODzFxq8FaIFy/d2vpgZSm7/I1pTKXR17VIZsXt47y+Lo2zSHE9R0D1twlPFuJJz9TH018YHE8fNTieOLI+/uzlg2J6zyQaS8/seXQU6LTFQefl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ujqJJ+ODFjAUZlkNyiq1N8cqvM0r/KBUKcJIWiNfFoPIjlmfw664bJB/BnXnays4cV9OnjecBFE8rA7itCUTpW65RC37VFNQE/0HTN/KAXYdlRtMW4aMa2+cn12cRQI5DcDNCQuf4+SUG9nXmgSPSCjonrOM3mE/qAa9RJLJktpF3B9IWHgwSzGj2QtrmSfdpIni90XoX4q24vaaxlmbN8pR6ivwJNyy+EPmPu4C5gq+T6smSCBFLOHNtO53Je5lqep0DxAlpXyQlxI9kU4EE7enic1wcwp9bnT4ofgTSOcesDpOvxp3dfTlVK6m50ymZ9xqGFUiZ1OhPwiMr4Or6/1UtssGIHzE+QPoulvoGZM47fkVxjAbcpMqptPl+xmjBShIL74/f87Fk8tuk534PZFlVuqE9OSL2P32KWqPuZnsNJYDwqEmvX4ofhvdB+nOJwAsxFPJ3pwK6ck52+8DnA6/0lI12Rt67Uifp0K1Bu8uzgz8In3vazkUBPav5SCA55bT+eP5PW/lFPqDEDSZTfqz+g6qvHN5gYJ7TIZzAB37Z9oqIMP9oHatBvib9gpR3UImE/L59H3XXKRJJSWlRgBI0CZDfhWDxVgLbfBIl0mWJ2pBmnxRhem2g/W7bmaa6BbjLMwBIBsllWVSTWWVPhqxYVK2+6Y1YodigeDlP8feITGobkFqKnuHwwxtnrZN/f2bTuLLpkrKVQ2Waz/520xJSSn/ICLR1kX2ZGfVQLHvvIwqIZsh8fVF/j2qgyQAK04hKwOxdrkrsJ5RZBveG7GrXxJDbgwDS2GMZcn1kW2Ak7akzeKJZQOk791S2lCex+qgIhso/M9hFU9RQB8V+7Y5zgp6/rql699sY4TtE6n3aUzb+1LvpKuXkpJSC6qzUtKTl6UY2xvDiANTqVtMPz2QZd+yNuk620XWfl6uIOJ/Zq7SR7q6+9vOLr5d9dIyV3FSkPMtj6oCvxSYrr3975N0P7s+OfRvunf02VoC1YLZ7pPSj41o/0xtH3Q/lUCUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSU0tH/AyG+VdO0wx1MAAAAAElFTkSuQmCC'

    doc.addImage(imgData, 'JPEG', 140, 0, 100, 100)

    doc.setFont('times')
    doc.setFontType('bold')
    doc.text(70, 120, 'REPORT CARD EXAM RESULTS')

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 150, `Full name             : ${xoa_dau(name)}`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 170, `Student Code       : ${stu_code}`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 190, `Class                    : ${class_name}`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 210, `Faculty                 : ${xoa_dau(faculty)}`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 230, `ID Card                : ${id_card}`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 250, `Gender                 : ${xoa_dau(gender)}`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 270, `Date of birth         : ${dob}`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 290, `Place of birth        : ${xoa_dau(pob)}`)

    doc.setFont('times')
    doc.setFontType('bold')
    doc.text(140, 310, 'YOUR RESULTS')

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 330, `Exam code           : ${exam_code}`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 350, `Subject                  : ${xoa_dau(topic)}`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 370, `Exam result          : ${results} sentences`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 390, `Total score            : ${score} point`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 410, `Date                      : ${date}`)

    doc.save(`${name}-${stu_code}.pdf`);

}
if (localStorage.getItem("timeCount") != undefined) {
    setTimeout(function () {
        openFullscreen();
    }, 500);
    startTimer();
}

noiQuyThi.onclick = () => {
    openFullscreen();
    startTimer();
}





// window.addEventListener('beforeunload', (event) => {
//     event.returnValue = `Bạn đang làm bài thi, cố ý tắt sẽ đồng nghĩa nộp bài, bạn có chắc muốn làm điều đó`;
// });


function post(path, params, method = 'post') {

    const form = document.createElement('form');
    form.method = method;
    form.action = path;

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = params[key];

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}



function createCheckBoxCheckedHTML(stt) {
    var html = "";
    if (stt < 10) {
        html = `<a id="${stt}TA" href="#${stt}CH">Câu 0${stt} : </a>
    <input type="checkbox" class="cbx"  id="${stt}TAIP" style="display: none;" readonly="readonly" value="${stt}" checked>
    <label for="${stt}TAIP" class="check">
      <svg width="18px" height="18px" viewBox="0 0 18 18">
        <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
        <polyline points="1 9 7 14 15 4"></polyline>
      </svg>
    </label>`;
    }
    else {
        html = `<a id="${stt}TA" href="#${stt}CH">Câu ${stt} : </a>
    <input type="checkbox" class="cbx"  id="${stt}TAIP" style="display: none;" readonly="readonly" value="${stt}" checked>
    <label for="${stt}TAIP" class="check">
      <svg width="18px" height="18px" viewBox="0 0 18 18">
        <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
        <polyline points="1 9 7 14 15 4"></polyline>
      </svg>
    </label>`;
    }

    return html;
}

function createCheckBoxNotCheckedHTML(stt) {
    var html = "";
    if (stt < 10) {
        html = `<a id="${stt}TA" href="#${stt}CH">Câu 0${stt} : </a>
    <input type="checkbox" class="cbx"  id="${stt}TAIP" style="display: none;" readonly="readonly" value="${stt}" >
    <label for="${stt}TAIP" class="check">
      <svg width="18px" height="18px" viewBox="0 0 18 18">
        <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
        <polyline points="1 9 7 14 15 4"></polyline>
      </svg>
    </label>`;
    }
    else {
        html = `<a id="${stt}TA" href="#${stt}CH">Câu ${stt} : </a>
    <input type="checkbox" class="cbx"  id="${stt}TAIP" style="display: none;" readonly="readonly" value="${stt}" >
    <label for="${stt}TAIP" class="check">
      <svg width="18px" height="18px" viewBox="0 0 18 18">
        <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
        <polyline points="1 9 7 14 15 4"></polyline>
      </svg>
    </label>`;
    }

    return html;
}

document.getElementById("idListExam").remove();
document.getElementById("idUser").remove();

function Get_date_now()
{
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    return date;
}