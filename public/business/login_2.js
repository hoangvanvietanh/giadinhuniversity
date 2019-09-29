//var listStudent = Doc_Danh_sach_Sinh_vien_Thong_tin_Co_ban().Danh_sach_Sinh_vien;
var studentCode = document.getElementById("student_code");
var password = document.getElementById("password");

function Tim_Sinh_vien_theo_MSSV(mssv) {
    var Kq = ""
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Lay_Danh_sach_Sinh_vien_Theo_MSSV`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_goi = mssv
    Xu_ly_HTTP.send(Chuoi_goi)
    Kq = Xu_ly_HTTP.responseText
    return Kq
}

function kiemTraDangNhap(studentCode, password) {
    var flag = 0;
    listStudent.forEach(student => {
        if (student.student_code == studentCode && student.password == password) {
            flag++;
        }
    });
    if (flag != 0) {
        return true;
    } else {
        return false;
    }
}

dang_nhap.onclick = () => {
    if (kiemTraDangNhap(studentCode.value, password.value) == true) {
        sessionStorage.setItem("student_code", studentCode.value)
        //document.location.href = "manage_exam2.html";
    }
}