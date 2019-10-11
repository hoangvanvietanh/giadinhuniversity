var Dia_chi_Dich_vu = "https://dv-webtracnghiem.herokuapp.com/"
//var Dia_chi_Dich_vu = "http://localhost:1200"

function Doc_Danh_sach_Nhat_ky() {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Doc_Danh_sach_Nhat_ky`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    Xu_ly_HTTP.send("")
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}

function Ghi_nhat_ky(Nhat_ky) {
    var Kq = ""
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Ghi_Nhat_ky`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_goi = JSON.stringify(Nhat_ky)
    Xu_ly_HTTP.send(Chuoi_goi)
    Kq = Xu_ly_HTTP.responseText
    return Kq
}

function getConnectionWebSocket(studentCode) {
    var connection = new WebSocket("wss://dv-webtracnghiem.herokuapp.com/");

    connection.onopen = function (message) {
        connection.send(studentCode);
    };

    connection.onmessage = function (message) {
        try {
            var mssv = JSON.parse(message.data).data
            if (mssv == studentCode) {
                logoutOldUser(studentCode);
            }
        } catch (error) {

        }

    };
}


function checkKeyConnect() {
    if (localStorage.getItem("keyConnect") != undefined) {
        return localStorage.getItem("keyConnect");
    }
    else {
        return Math.random().toString(36).substring(7);
    }

}

function loginNewUser(studentCode) {
    var dsNhatKy = Doc_Danh_sach_Nhat_ky();
    var key = checkKeyConnect();
    var nhatKy = {};
    if (dsNhatKy != undefined) {
        for (var i = 0; i < dsNhatKy.length; i++) {
            if (dsNhatKy[i].student_code == studentCode) {
                if ((dsNhatKy[i].status == "active" || dsNhatKy[i].status == "anotherUserLogin") && dsNhatKy[i].keyConnect != localStorage.getItem("keyConnect")) {
                    nhatKy.student_code = dsNhatKy[i].student_code;
                    nhatKy.status = "anotherUserLogin";
                    localStorage.setItem("keyConnect", key);
                    nhatKy.keyConnect = key;
                    dsNhatKy[i] = nhatKy;
                    Ghi_nhat_ky(nhatKy);
                }
                else if (dsNhatKy[i].status == "offline") {
                    nhatKy.student_code = dsNhatKy[i].student_code;
                    nhatKy.status = "active";
                    localStorage.setItem("keyConnect", key);
                    nhatKy.keyConnect = key;
                    dsNhatKy[i] = nhatKy;
                    Ghi_nhat_ky(nhatKy);
                }
            }
        }
    }

}

function logoutOldUser(studentCode) {
    var nhatKy = {};
    var dsNhatKy = Doc_Danh_sach_Nhat_ky();
    var keyLocal = localStorage.getItem("keyConnect");
    if (dsNhatKy != undefined) {
        for (var i = 0; i < dsNhatKy.length; i++) {
            if (dsNhatKy[i].student_code == studentCode) {
                if (dsNhatKy[i].status == "anotherUserLogin" && dsNhatKy[i].keyConnect != keyLocal) {
                    nhatKy.student_code = dsNhatKy[i].student_code;
                    nhatKy.status = "active";
                    nhatKy.keyConnect = dsNhatKy[i].keyConnect;
                    dsNhatKy[i] = nhatKy;
                    Ghi_nhat_ky(nhatKy);
                    localStorage.removeItem("keyConnect");
                    document.location.href = "/users/logout";
                }
            }
        }
    }


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
                    localStorage.removeItem("keyConnect");
                    document.location.href = "/users/logout";
                }
            }
        }

    }
}

function checkExamAlready() {
    if (localStorage.getItem("timeCount") != undefined && localStorage.getItem("student_code") == `<%= user.student_code %>`) {
        document.location.href = "/exam/take_exam";
    }
}