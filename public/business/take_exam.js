var _0xdaf4=["\x65\x78\x61\x6D\x5F\x63\x6F\x64\x65","\x67\x65\x74\x49\x74\x65\x6D","\x73\x74\x75\x64\x65\x6E\x74\x5F\x63\x6F\x64\x65",""];var examCode=sessionStorage[_0xdaf4[1]](_0xdaf4[0]);var studentCode=sessionStorage[_0xdaf4[1]](_0xdaf4[2]);var cau_hoi_thi=_0xdaf4[3];var html=_0xdaf4[3];var htmlTienDo=_0xdaf4[3];var j=0;var timeCount=0;var status=0;var cauDaLam=0;var submit=false;createTheExam(examCode)

//***Create the exam**********************
function createTheExam(examCode) {
    examList.forEach(exam => {
        if (exam.exam_code == examCode) {
            ma_de.innerHTML = exam.exam_code; //Get code of the exam
            chu_de.innerHTML = exam.topic; //Get the exam topic
            thoi_gian.innerHTML = exam.time + " phút"; //Get the time of the exam
            timeCount = exam.time; //Set time count down
            //Create the questions for the exam
            tongCauHoi.innerHTML = `Tổng: ${exam.question_list.length}`
            tongCauHoi2.innerHTML = `${exam.question_list.length} câu`
            exam.question_list.sort(function (a, b) {
                return 0.5 - Math.random()
            });
            //console.log(item)
            exam.question_list.forEach(content => {
                j++;
                if (j < 10) {
                    if (j % 3 == 0) {
                        htmlTienDo += `<a id="${j}TA" href="#${j}CH">Câu 0${j} :</a> <input type="checkbox" readonly="readonly" name="type" value="${j}"/></br>`
                    } else {
                        htmlTienDo += `<a id="${j}TA" href="#${j}CH">Câu 0${j} :</a> <input type="checkbox" readonly="readonly" name="type" value="${j}"/>`
                    }

                } else if (j % 3 == 0 && j > 10 && j < 100) {
                    htmlTienDo += `<a id="${j}TA" href="#${j}CH">Câu ${j} :</a> <input type="checkbox" readonly="readonly" name="type" value="${j}"/> </br>`
                } else {
                    if (j % 2 != 0 && j >= 100) {
                        htmlTienDo += `<a id="${j}TA" href="#${j}CH">Câu ${j} :</a> <input type="checkbox" readonly="readonly" name="type" value="${j}"/> </br>`
                    } else {
                        htmlTienDo += `<a id="${j}TA" href="#${j}CH">Câu ${j} :</a> <input type="checkbox" readonly="readonly" name="type" value="${j}"/>`
                    }

                }

                var deBai = content.question.split("_")
                if (deBai.length == 2) {
                    html += `<tbody width="100%"> <tr>
            <td id="${j}CH"><b> Câu ${j}: ${deBai[0]} </b></br>
            <img src="${deBai[1]}" alt="" height=25% width=50%></img></td>
            `
                } else {
                    html += `<tbody width="100%"> <tr>
            <td id="${j}CH"><b> Câu ${j}: ${content.question} </b></td>
            `
                }
                //console.log("==>" + deBai.length)
                content.answer_list.sort(function (a, b) {
                    return 0.5 - Math.random()
                });
                for (var k = 0; k < content.answer_list.length; k++) {
                    html += `
            <tr>
            <td id="${j}-${k}"><input type="radio" name="CH_${j}" value="${k}_${
                        content.answer_list[k]
                        }"> ${content.answer_list[k]}</td>
            </tr>
            `
                }
                html += `
            <tr>
            <input type="hidden" id="Cau_${j}" value="${content.correct_answer}">
        </tr><tbody>`;
            });

        }
    });
}


//*****Change javascript to html with innerHTML************
noi_dung_thi.innerHTML = html;
tien_do.innerHTML = htmlTienDo;
tien_do2.innerHTML = htmlTienDo;
time_count.innerHTML = timeCount + ":" + 00
bam_nop_bai.innerHTML = `<button type="button" class="btn btn-primary" style="width: 100%" id="nop_bai">Nộp bài</button>`
soCauLam.innerHTML = `Số câu đã làm: 0`
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
                        if (correctAnswer.value == valueChecked[1]) {
                            $("td#" + `${i + "-" + valueChecked[0]}`).css("background-color", "green"); //Change color with id tag "td" of correct sentence 
                            $("a#" + `${i}TA`).css("color", "green"); //Change color tag "a" of correct sentence
                            numberOfCorrectSentences++;
                            flag++;
                        }
                    }

                    //**********Check incorrect sentence***********
                    if (valueChecked[1] == correctAnswer.value && flag == 0) {
                        $("td#" + `${i + "-" + valueChecked[0]}`).css("background-color", "red"); //Change color with id tag "td" of incorrect sentce
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
    var scores = numberOfCorrectSentences / i * 10;
    tongDiem.innerHTML = `Tổng điểm: ${scores.toFixed(2)}`
}

//*****Submit exam*******************
nop_bai.onclick = () => {
    submit = true;
    sessionStorage.removeItem("time");
    status++;
    time_count.innerHTML = "Hoàn thành bài thi";
    $(':radio:not(:checked)').attr('disabled', true); //Cannot allow people can check radio
    gradingExam(examCode);


    doc.fromHTML($('#thong_tin_bai_thi').html(), 15, 15, {
        'width': 170,
        'elementHandlers': specialElementHandlers
    });
    doc.save('sample-file.pdf');
};
var array = [];
var flag2 = 0;
//*********************Can click on tag "tr" on table ************************************
$('#noi_dung_thi tr').click(function () {
    if (status == 0) {
        //****Click td can selected radio*******************
        $(this).find('td input:radio').prop('checked', true);

        //*****Change color when click tag "tr" on table********
        $(this)
            .closest("tr")
            .siblings()
            .css("background-color", "white")
            .end()
            .css("background-color", "skyblue");

        //******Get value "name" in tag "input"*********************
        var a = $(this).find('td input:radio').prop('checked', true)
        if (a[0] != undefined) {
            //console.log("Vào" + a[0])

            var laySttCH = a[0].name.split("_");

            //******Find checkbox with value******************************
            var as = $(`input[type=checkbox][value=${laySttCH[1]}]`).prop("checked", true);


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
    console.log(status.innerHTML)
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
            nop_bai.click();
        } else {
            time_count.innerHTML = "Hoàn thành bài thi";
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