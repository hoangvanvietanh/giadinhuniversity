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
soCauLam.innerHTML = `Số câu đã làm: 0`
createTheExam(examCode);

//***Create the exam**********************
function createTheExam(examCode) {
    examList.forEach(exam => {
        if (exam.exam_code == examCode) {
            ma_de.innerHTML = exam.exam_code; //Get code of the exam
            chu_de.innerHTML = exam.topic; //Get the exam topic
            thoi_gian.innerHTML = exam.time + " phút"; //Get the time of the exam
            var time = localStorage.getItem("timeCount");
            if(time!=undefined)
            {
                timeCount = localStorage.getItem("timeCount");
            }
            else
            {
                timeCount = exam.time; //Set time count down
            }
            
            //Create the questions for the exam
            tongCauHoi.innerHTML = `Tổng: ${exam.question_list.length}`
            tongCauHoi2.innerHTML = `${exam.question_list.length} câu`
            exam.question_list.sort(function (a, b) {
                return 0.5 - Math.random()
            });
            //console.log(item)
            var totalAnswerInStore = 0;
            exam.question_list.forEach(content => {
                var deBai = content.question.split("_")
                var store_Anser;
                var checkAnswer = 0;
                j++;

                if (deBai.length == 2) {
                    html += `<tbody class="form"  width="100%"> <tr>
            <td id="${j}CH"><b> Câu ${j}: ${deBai[0]} </b></br>
            <img src="${deBai[1]}" alt="" height=25% width=50%></img></b>
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
                content.answer_list.sort(function (a, b) {
                    return 0.5 - Math.random()
                });
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

                    if (j < 10) {
                        if (j % 3 == 0) {
                            htmlTienDo += `<a id="${j}TA" href="#${j}CH">Câu 0${j} :</a>
                            <input type="checkbox" class="cbx"  id="${j}TAIP" style="display: none;" readonly="readonly" value="${j}">
                            <label for="${j}TAIP" class="check">
                              <svg width="18px" height="18px" viewBox="0 0 18 18">
                                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                <polyline points="1 9 7 14 15 4"></polyline>
                              </svg>
                            </label>
            </br>`
                        } else {
                            htmlTienDo += `<a id="${j}TA" href="#${j}CH">Câu 0${j} :</a>
                            <input type="checkbox" class="cbx"  id="${j}TAIP" style="display: none;" readonly="readonly" value="${j}">
                            <label for="${j}TAIP" class="check">
                              <svg width="18px" height="18px" viewBox="0 0 18 18">
                                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                <polyline points="1 9 7 14 15 4"></polyline>
                              </svg>
                            </label>`
                        }

                    } else if (j % 3 == 0 && j > 10 && j < 100) {
                        htmlTienDo += `<a id="${j}TA" href="#${j}CH">Câu ${j} :</a>
                        <input type="checkbox" class="cbx"  id="${j}TAIP" style="display: none;" readonly="readonly" value="${j}">
                        <label for="${j}TAIP" class="check">
                          <svg width="18px" height="18px" viewBox="0 0 18 18">
                            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                            <polyline points="1 9 7 14 15 4"></polyline>
                          </svg>
                        </label></br>`
                    } else {
                        if (j % 2 != 0 && j >= 100) {
                            htmlTienDo += `<a id="${j}TA" href="#${j}CH">Câu ${j} :</a>
                            <input type="checkbox" class="cbx"  id="${j}TAIP" style="display: none;" readonly="readonly" value="${j}">
                            <label for="${j}TAIP" class="check">
                              <svg width="18px" height="18px" viewBox="0 0 18 18">
                                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                <polyline points="1 9 7 14 15 4"></polyline>
                              </svg>
                            </label></br>`
                        } else {
                            htmlTienDo += `<a id="${j}TA" href="#${j}CH">Câu ${j} :</a>
                            <input type="checkbox" class="cbx"  id="${j}TAIP" style="display: none;" readonly="readonly" value="${j}">
                            <label for="${j}TAIP" class="check">
                              <svg width="18px" height="18px" viewBox="0 0 18 18">
                                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                <polyline points="1 9 7 14 15 4"></polyline>
                              </svg>
                            </label>`
                        }

                    }
                }
                else {
                    array.push(`${j}`);
                    totalAnswerInStore++;
                    if (j < 10) {
                        if (j % 3 == 0) {
                            htmlTienDo += `<a id="${j}TA" href="#${j}CH">Câu 0${j} :</a>
                            <input type="checkbox" class="cbx"  id="${j}TAIP" style="display: none;" readonly="readonly" value="${j}" checked>
                            <label for="${j}TAIP" class="check">
                              <svg width="18px" height="18px" viewBox="0 0 18 18">
                                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                <polyline points="1 9 7 14 15 4"></polyline>
                              </svg>
                            </label></br>`
                        } else {
                            htmlTienDo += `<a id="${j}TA" href="#${j}CH">Câu 0${j} :</a>
                            <input type="checkbox" class="cbx"  id="${j}TAIP" style="display: none;" readonly="readonly" value="${j}" checked>
                            <label for="${j}TAIP" class="check">
                              <svg width="18px" height="18px" viewBox="0 0 18 18">
                                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                <polyline points="1 9 7 14 15 4"></polyline>
                              </svg>
                            </label>`
                        }

                    } else if (j % 3 == 0 && j > 10 && j < 100) {
                        htmlTienDo += `<a id="${j}TA" href="#${j}CH">Câu ${j} :</a>
                        <input type="checkbox" class="cbx"  id="${j}TAIP" style="display: none;" readonly="readonly" value="${j}" checked>
                        <label for="${j}TAIP" class="check">
                          <svg width="18px" height="18px" viewBox="0 0 18 18">
                            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                            <polyline points="1 9 7 14 15 4"></polyline>
                          </svg>
                        </label></br>`
                    } else {
                        if (j % 2 != 0 && j >= 100) {
                            htmlTienDo += `<a id="${j}TA" href="#${j}CH">Câu ${j} :</a>
                            <input type="checkbox" class="cbx"  id="${j}TAIP" style="display: none;" readonly="readonly" value="${j}" checked>
                            <label for="${j}TAIP" class="check">
                              <svg width="18px" height="18px" viewBox="0 0 18 18">
                                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                <polyline points="1 9 7 14 15 4"></polyline>
                              </svg>
                            </label></br>`
                        } else {
                            htmlTienDo += `<a id="${j}TA" href="#${j}CH">Câu ${j} :</a>
                            <input type="checkbox" class="cbx"  id="${j}TAIP" style="display: none;" readonly="readonly" value="${j}" checked>
                            <label for="${j}TAIP" class="check">
                              <svg width="18px" height="18px" viewBox="0 0 18 18">
                                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                <polyline points="1 9 7 14 15 4"></polyline>
                              </svg>
                            </label>`
                        }

                    }
                }
            });
            soCauLam.innerHTML = `Số câu đã làm: ${totalAnswerInStore}`
            cauDaLam = totalAnswerInStore
            //console.log(array);
        }
    });
}


//*****Change javascript to html with innerHTML************
noi_dung_thi.innerHTML = html;
tien_do.innerHTML = htmlTienDo;
tien_do2.innerHTML = htmlTienDo;
tien_do3.innerHTML = htmlTienDo;
time_count.innerHTML = timeCount + ":" + 00
bam_nop_bai.innerHTML = `<button type="button" class="btn btn-primary" style="width: 100%;background-color:#214a80" id="nop_bai">Nộp bài</button>`
soCauLam2.innerHTML = `0 /`
//Create grading function
var i = 0;

function gradingExam(examCode) {
    var numberOfCorrectSentences = 0; //A number of correct answers
    var totalNumberOfSentences = 0; //A number of total question

    //Get the exam
    examList.forEach(exam => {
        //Get the question
        exam.question_list.forEach(question => {
            //Get the exam with the code
            if (exam.exam_code == examCode) {
                i++;
                totalNumberOfSentences = question.length; //Get length of answer system
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
            }
        });
    });
    bam_nop_bai.innerHTML = `Số câu đúng : ${numberOfCorrectSentences}/${i}`
    scores = numberOfCorrectSentences / i * 10;
    tongDiem.innerHTML = `Tổng điểm: ${scores.toFixed(2)}`
    tongDiem2.innerHTML = `Tổng điểm: ${scores.toFixed(2)}`
}

//*****Submit exam*******************
nop_bai.onclick = () => {
    submit = true;
    sessionStorage.removeItem("time");
    status++;
    time_count.innerHTML = "Hoàn thành bài thi";
    $(':radio:not(:checked)').attr('disabled', true); //Cannot allow people can check radio
    gradingExam(examCode);
    
    var SinhVien = ListDiemSinhVien.find(x => x.student_code == studentCode);
    SinhVien.marks.computer_science = scores;
    var kq = Cap_nhat_Diem_Sinh_vien(SinhVien);
    console.log(kq)
    localStorage.clear();
};

var flag2 = 0;
//*********************Can click on tag "tr" on table ************************************
$('#noi_dung_thi tr').click(function () {
    if (status == 0) {
        //****Click td can selected radio*******************
        $(this).find('td input:radio').prop('checked', true);
        var contentAnswer = $(this).find('td input:radio')[0];
        var idQues = contentAnswer.name.split("_");
        var ans = contentAnswer.value.toString().slice(2);
        var ques = document.getElementById(idQues[1] + idQues[0]).textContent.slice(8).trim();

        if (typeof (Storage) !== "undefined") {
            // Store
            localStorage.setItem(ques, ans);
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
                //cauDaLam++;
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