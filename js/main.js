// GrabX
const GRABX_1 = 8000;
const GRABX_2 = 7500;
const GRABX_3 = 7000;
const GRABX_WAIT = 2000;
// GrabSUV
const GRAB_SUV_1 = 9000;
const GRAB_SUV_2 = 8500;
const GRAB_SUV_3 = 8000;
const GRAB_SUV_WAIT = 3000;
// GrabBLACK
const GRAB_BLACK_1 = 10000;
const GRAB_BLACK_2 = 9500;
const GRAB_BLACK_3 = 9000;
const GRAB_BLACK_WAIT = 3500;
var tienKm_1;
var tienKm_2;
var tienKm_3;
var tongTien;
var content="";
document.getElementById("btninHD").disabled = true;

document.getElementById("btnTinhTien").onclick = function () {
  var soKm = document.getElementById("soKm").value * 1;
  var tgCho = document.getElementById("tgCho").value * 1;
  var loaiXe = layLoaiXe();
  var currentFormat = new Intl.NumberFormat("vn-VN");
  switch (loaiXe) {
    case "grabX":
      // tính tiền grabX
      tinhTienTong(soKm, tgCho, GRABX_WAIT, GRABX_1, GRABX_2, GRABX_3);
      inHoaDon(soKm, tgCho, GRABX_WAIT, GRABX_1, GRABX_2, GRABX_3);
      break;
    case "grabSUV":
      // tính tiền grabSUV
      tinhTienTong(
        soKm,
        tgCho,
        GRAB_SUV_WAIT,
        GRAB_SUV_1,
        GRAB_SUV_2,
        GRAB_SUV_3
      );
      inHoaDon(soKm, tgCho, GRAB_SUV_WAIT, GRAB_SUV_1, GRAB_SUV_2, GRAB_SUV_3);

      break;
    case "grabBlack":
      // tính tiền grabBlack
      tinhTienTong(
        soKm,
        tgCho,
        GRAB_BLACK_WAIT,
        GRAB_BLACK_1,
        GRAB_BLACK_2,
        GRAB_BLACK_3
      );
      inHoaDon(
        soKm,
        tgCho,
        GRAB_BLACK_WAIT,
        GRAB_BLACK_1,
        GRAB_BLACK_2,
        GRAB_BLACK_3
      );
    default:
      alert("Vui lòng chọn loại xe!");
      break;
  }
  document.getElementById("divThanhTien").style.display = "block";
  document.getElementById("xuatTien").innerHTML =
    currentFormat.format(tongTien);
  document.getElementById("btninHD").disabled = false;
};

// Lấy loại xe:
function layLoaiXe() {
  var grabX = document.getElementById("grabX");
  var grabSUV = document.getElementById("grabSUV");
  var grabBlack = document.getElementById("grabBlack");
  var loaiXe = "";
  if (grabX.checked) {
    loaiXe = "grabX";
  } else if (grabSUV.checked) {
    loaiXe = "grabSUV";
  } else if (grabBlack.checked) {
    loaiXe = "grabBlack";
  }
  return loaiXe;
}
// Tính tiền chờ:
function tinhTienCho(tgCho, giaCho) {
  var kq = 0;
  if (tgCho >= 3) {
    kq = Math.floor(tgCho / 3) * giaCho;
  }
  return kq;
}
// Tính tiền Km:
function tinhKm_1(soKm, giaKM) {
  var kq = soKm * giaKM;
  return kq;
}

function tinhKm_2(soKm, giaKM) {
  var kq = (soKm - 1) * giaKM;
  return kq;
}

function tinhKm_3(soKm, giaKM) {
  var kq = (soKm - 19) * giaKM;
  return kq;
}
// Tính tiền tổng
function tinhTienTong(soKm, tgCho, giaCho, giaKm_1, giaKm_2, giaKm_3) {
  tienCho = tinhTienCho(tgCho, giaCho);
  if (0 <= soKm && soKm <= 1) {
    tienKm_1 = tinhKm_1(soKm, giaKm_1);
    tongTien = tienKm_1 + tienCho;
  } else if (soKm <= 19) {
    tienKm_1 = tinhKm_1(1, giaKm_1);
    tienKm_2 = tinhKm_2(soKm, giaKm_2);
    tongTien = tienKm_1 + tienKm_2 + tienCho;
  } else {
    tienKm_1 = tinhKm_1(1, giaKm_1);
    tienKm_2 = tinhKm_2(19, giaKm_2);
    tienKm_3 = tinhKm_3(soKm, giaKm_3);
    tongTien = tienKm_1 + tienKm_2 + tienKm_3 + tienCho;
  }
}
// In hoá đơn:
document.getElementById("btninHD").onclick = function () {
  document.getElementById("tbody").innerHTML = content;
};
function inHoaDon(soKm, tgCho, giaCho, giaKm_1, giaKm_2, giaKm_3) {
  if (0 <= soKm && soKm <= 1) {
    content += "<tr>";
    content += "<td>Km đầu tiên</td>";
    content += "<td>" + soKm + "</td>";
    content += "<td>" + giaKm_1 + "</td>";
    content += "<td>" + tienKm_1 + "</td>";
    content += "</tr>";

    content += "<tr>";
    content += "<td>Thời gian chờ</td>";
    content += "<td>" + tgCho + "</td>";
    content += "<td>" + giaCho + "</td>";
    content += "<td>" + tienCho + "</td>";
    content += "</tr>";

    content += "<tr>";
    content += "<td colspan='3' style='text-align: right'>Tổng tiền: </td>";
    content += "<td" + tongTien + "</td>";
    content += "</tr>";
  } else if (soKm <= 19) {
    content += "<tr>";
    content += "<td>Km đầu tiên</td>";
    content += "<td>" + 1 + "</td>";
    content += "<td>" + giaKm_1 + "</td>";
    content += "<td>" + tienKm_1 + "</td>";
    content += "</tr>";

    content += "<tr>";
    content += "<td>Từ " + 1 + " đến " + soKm + "</td>";
    content += "<td>" + (soKm - 1) + "</td>";
    content += "<td>" + giaKm_2 + "</td>";
    content += "<td>" + tienKm_2 + "</td>";
    content += "</tr>";

    content += "<tr>";
    content += "<td>Thời gian chờ</td>";
    content += "<td>" + tgCho + "</td>";
    content += "<td>" + giaCho + "</td>";
    content += "<td>" + tienCho + "</td>";
    content += "</tr>";

    content += "<tr>";
    content += "<td colspan='3' style='text-align: right'>Tổng tiền: </td>";
    content += "<td>" + tongTien + "</td>";
    content += "</tr>";
  } else {
    content += "<tr>";
    content += "<td>Km đầu tiên</td>";
    content += "<td>" + 1 + "</td>";
    content += "<td>" + giaKm_1 + "</td>";
    content += "<td>" + tienKm_1 + "</td>";
    content += "</tr>";

    content += "<tr>";
    content += "<td>Từ " + 1 + " đến " + 19 + "</td>";
    content += "<td>" + (19 - 1) + "</td>";
    content += "<td>" + giaKm_2 + "</td>";
    content += "<td>" + tienKm_2 + "</td>";
    content += "</tr>";

    content += "<tr>";
    content += "<td>Từ " + 19 + " đến " + soKm + "</td>";
    content += "<td>" + (soKm - 19) + "</td>";
    content += "<td>" + giaKm_3 + "</td>";
    content += "<td>" + tienKm_3 + "</td>";
    content += "</tr>";

    content += "<tr>";
    content += "<td>Thời gian chờ</td>";
    content += "<td>" + tgCho + "</td>";
    content += "<td>" + giaCho + "</td>";
    content += "<td>" + tienCho + "</td>";
    content += "</tr>";

    content += "<tr>";
    content += "<td colspan='3' style='text-align: right'>Tổng tiền: </td>";
    content += "<td>" + tongTien + "</td>";
    content += "</tr>";
  }
}
