angular.module("Ctrl", [])

.controller("MainController", function($scope, $http, SessionService) {
    $scope.Init = function() {
        //Auth
        // var Urlauth = "api/datas/auth.php";
        // $http({
        //         method: "get",
        //         url: Urlauth,
        //     })
        //     .then(function(response) {
        //         if (response.data.Session == false) {
        //             window.location.href = 'login.html';
        //         } else
        //             $rootScope.Session = response.data.Session;
        //     }, function(error) {
        //         alert(error.message);
        //     })
    }
})

.controller("penyakitController", function($scope, $http, $rootScope, SessionService, fileUpload) {
    $scope.datainput = {};
    $scope.DatasPenyakit = [];
    $scope.DataSelected = {};
    $scope.Init = function() {
        var UrlGetPenyakit = "api/datas/readPenyakit.php";
        $http({
                method: "get",
                url: UrlGetPenyakit
            })
            .then(function(response) {
                $scope.DatasPenyakit = response.data.records;
            }, function(error) {
                alert(error.message);
            })
    }

    $scope.uploadedFile = function(element) {
        // var reader = new FileReader();
        // reader.onload = function(event) {
        //     $scope.$apply(function($scope) {
        //         $scope.files = element.files;
        //         $scope.src = event.target.result
        //     });
        // }
        // reader.readAsDataURL(element.files[0]);
        $scope.$apply(function($scope) {
            $scope.files = element.files;
        });
    }

    $scope.Simpan = function() {
        $http({
            url: "http://localhost/mata/api/datas/upload.php", //or your add enquiry services
            method: "POST",
            processData: false,
            headers: { 'Content-Type': undefined },
            data: $scope.formdata,
            transformRequest: function(data) {
                var formData = new FormData();
                var file = $scope.files[0];
                //var data = $base64.encode(file);
                formData.append("file_upload", file); //pass the key name by which we will recive the file

                angular.forEach(data, function(value, key) {
                    formData.append(key, value);
                });

                return formData;
            }
        }).then(function(data, status, headers, config) {
            $scope.status = data.data.status;
            if (data.status == 200) {
                $scope.formdata = "";
                //$scope.myform.$setPristine(); //for flush all the validation errors/messages previously
                $scope.photo = data.data.namefile;
                $scope.datainput.photo = $scope.photo;
                var DataPenyakit = $scope.datainput;
                var UrlInsertPenyakit = "api/datas/createPenyakit.php";
                $http({
                        method: "post",
                        url: UrlInsertPenyakit,
                        data: DataPenyakit
                    })
                    .then(function(response) {
                        if (response.data.message != "0") {
                            Data.IdPenyakit = response.data;
                            $scope.DatasPenyakit.push(angular.copy(Data));
                            alert("Success");
                        } else
                            alert("Data Gagal disimpan");
                    }, function(error) {
                        alert(error.message);
                    })
            } else {
                alert(data.message);
            }

        }).error(function(data, status, headers, config) {
            alert("Something Error in form process");
        });
    }

    $scope.Selected = function(item) {
        $scope.DataSelected = item;
    }

    $scope.UpdatePenyakit = function() {
        var Data = $scope.DataSelected;
        var UrlUpdatePenyakit = "api/datas/updatePenyakit.php";
        $http({
                method: "post",
                url: UrlUpdatePenyakit,
                data: Data
            })
            .then(function(response, data) {
                if (response.data.message == "Penyakit was updated") {
                    angular.forEach($scope.DatasPenyakit, function(value, key) {
                        if (value.IdPenyakit == Data.IdPenyakit) {
                            value.kd_penyakit = Data.kd_penyakit;
                            value.nm_penyakit = Data.nm_penyakit;
                            value.penyebab = Data.penyebab;
                            value.keterangan = Data.keterangan;
                            value.solusi = Data.solusi;
                            alert(response.data.message);
                        }
                    })
                } else
                    alert(response.data.message);
            }, function(error) {
                alert(error.message);
            })
    }
})

.controller("gejalaController", function($scope, $http, $rootScope, SessionService) {
    $scope.datainput = {};
    $scope.DatasGejala = [];
    $scope.Init = function() {
        var UrlGetGejala = "api/datas/readGejala.php";
        $http({
                method: "get",
                url: UrlGetGejala
            })
            .then(function(response) {
                $scope.DatasGejala = response.data.records;
            }, function(error) {
                alert(error.message);
            })
    }

    $scope.uploadedFile = function(element) {
        var reader = new FileReader();
        reader.onload = function(event) {
            $scope.$apply(function($scope) {
                $scope.files = element.files;
                $scope.src = event.target.result
            });
        }
        reader.readAsDataURL(element.files[0]);
    }

    $scope.Simpan = function() {
        $http({
            url: "http://localhost/mata/api/datas/upload.php", //or your add enquiry services
            method: "POST",
            processData: false,
            headers: { 'Content-Type': undefined },
            data: $scope.formdata,
            transformRequest: function(data) {
                var formData = new FormData();
                var file = $scope.files[0];
                //var data = $base64.encode(file);
                formData.append("file_upload", file); //pass the key name by which we will recive the file

                angular.forEach(data, function(value, key) {
                    formData.append(key, value);
                });

                return formData;
            }
        }).then(function(data, status, headers, config) {
            $scope.status = data.data.status;
            if (data.status == 200) {
                $scope.formdata = "";
                //$scope.myform.$setPristine(); //for flush all the validation errors/messages previously
                $scope.datainput.photo = data.data.namefile;
                var Data = $scope.datainput;
                var UrlInsertPenyakit = "api/datas/createGejala.php";
                $http({
                        method: "post",
                        url: UrlInsertPenyakit,
                        data: Data
                    })
                    .then(function(response) {
                        if (response.data.message != "0") {
                            Data.IdGejala = response.data;
                            $scope.DatasGejala.push(angular.copy(Data));
                            alert("Success");
                        } else
                            alert("Data Gagal disimpan");
                    }, function(error) {
                        alert(error.message);
                    })
            } else {
                alert(data.message);
            }

        }).error(function(data, status, headers, config) {
            alert("Something Error in form process");
        });
    }
})

.controller("PengetahuanController", function($scope, $http, $rootScope, SessionService) {
    $scope.DatasPengetahuan = [];
    $scope.SelectedPenyakit = {};
    $scope.DatasGejala = [];
    $scope.SelectedGejala = {};
    $scope.DataSimpan = {};
    $scope.Init = function() {
        var UrlGetPengetahuan = "api/datas/readPengetahuan.php";
        $http({
                method: "get",
                url: UrlGetPengetahuan
            })
            .then(function(response) {
                $scope.DatasPengetahuan = response.data.Penyakit;
                $scope.DatasGejala = response.data.Gejala;
            }, function(error) {
                alert(error.message);
            })
    }

    $scope.TambahGejala = function() {
        $scope.DataSimpan.IdPenyakit = $scope.SelectedPenyakit.IdPenyakit;
        $scope.DataSimpan.IdGejala = $scope.SelectedGejala.IdGejala;
        var Data = $scope.DataSimpan;
        var UrlSimpanPengetahuan = "api/datas/createPengetahuan.php";
        $http({
                method: "post",
                url: UrlSimpanPengetahuan,
                data: Data
            })
            .then(function(response) {
                if (response.data.message == "Success") {
                    angular.forEach($scope.DatasPengetahuan, function(valuePengetahuan, keypengetahuan) {
                        if ($scope.SelectedPenyakit.IdPenyakit == valuePengetahuan.IdPenyakit) {
                            valuePengetahuan.Gejala.push(angular.copy($scope.SelectedGejala));
                            alert("Berhasil Ditambah");
                            window.location.href = 'admin.html#!/Pengetahuan';
                        }
                    })

                } else
                    alert("Data Gagal disimpan");
            }, function(error) {
                alert(error.message);
            })
    }

    $scope.ShowGejala = function(item) {
        $scope.DataTampung = angular.copy($scope.DatasGejala);
        angular.forEach($scope.SelectedPenyakit.Gejala, function(valueSelected, keySelected) {
            angular.forEach($scope.DatasGejala, function(value, key) {
                if (valueSelected.IdGejala == value.IdGejala) {
                    $scope.DataTampung.splice(valueSelected, 1);
                }
            })
        })
        $scope.SelectedPenyakit.Nilai = 1;
        var a = $scope.SelectedPenyakit;
    }
})

.controller("DaftarPenyakitController", function($scope, $http, $rootScope, SessionService) {
    $scope.DatasPenyakit = [];
    $scope.Init = function() {
        var UrlGetPenyakit = "api/datas/readPenyakit.php";
        $http({
                method: "get",
                url: UrlGetPenyakit
            })
            .then(function(response) {
                $scope.DatasPenyakit = response.data.records;
            }, function(error) {
                alert(error.message);
            })
    }

})

.controller("DaftarGejalaController", function($scope, $http, $rootScope, SessionService) {
    $scope.DatasGejala = [];
    $scope.Init = function() {
        var UrlGetGejala = "api/datas/readGejala.php";
        $http({
                method: "get",
                url: UrlGetGejala
            })
            .then(function(response) {
                $scope.DatasGejala = response.data.records;
            }, function(error) {
                alert(error.message);
            })
    }

})

.controller("KonsultasiController", function($scope, $http, $rootScope, SessionService) {
    $scope.DatasPasien = {};
    $scope.DatasPenyakit = [];
    $scope.DatasGejala = {};
    $scope.Nilai = 0;
    $scope.NilaiIndex = 0;
    $scope.DataTampung = [];
    $scope.JumlahIndex = 0;
    $scope.TampilGejala = {};


    $scope.Init = function() {
        $scope.DatasPasien = $rootScope.DataKirim;
        var UrlGetPengetahuan = "api/datas/readPengetahuan.php";
        $http({
                method: "get",
                url: UrlGetPengetahuan
            })
            .then(function(response) {
                $scope.DatasPenyakit = response.data.Penyakit;
                //$scope.DatasGejala = response.data.Gejala;
            }, function(error) {
                alert(error.message);
            })
    }

    $scope.Pertanyaan = function(item) {
        $scope.Nilai = 1;
        $scope.DatasGejala = item;
        $scope.JumlahIndex = $scope.DatasGejala.Gejala.length;
        $scope.TambahGejala = $scope.DatasGejala.Gejala[$scope.NilaiIndex];
    }
    $scope.PilihYa = function() {
        $scope.DataTampung.push(angular.copy($scope.TambahGejala));
        if (($scope.JumlahIndex - 1) != $scope.NilaiIndex) {
            $scope.NilaiIndex++;
            $scope.TambahGejala = $scope.DatasGejala.Gejala[$scope.NilaiIndex];
        } else {
            $scope.DatasGejala.Pasien = $scope.DatasPasien;
            $scope.DatasGejala.Hasil = "true";
            var Data = $scope.DatasGejala;
            var UrlDiagnosa = "api/datas/createDataPasien.php";
            $http({
                    method: "post",
                    url: UrlDiagnosa,
                    data: Data
                })
                .then(function(response) {
                    if (response.data.message == "true") {
                        var mes = "Anda mengidap Penyakit " + $scope.DatasGejala.nm_penyakit;
                        alert(mes);

                    } else
                        alert("Data Gagal disimpan");
                }, function(error) {
                    alert(error.message);
                })
        }
    }

    $scope.PilihTidak = function() {
        $scope.DatasGejala.Pasien = $scope.DatasPasien;
        $scope.DatasGejala.Hasil = "false";
        var Data = $scope.DatasGejala;
        var UrlDiagnosa = "api/datas/createDataPasien.php";
        $http({
                method: "post",
                url: UrlDiagnosa,
                data: Data
            })
            .then(function(response) {
                if (response.data.message == "false") {
                    var mes = "Anda Kemungkinan Tidak Mengidap Penyakit " + $scope.DatasGejala.nm_penyakit;
                    alert(mes);

                } else
                    alert("Data Gagal disimpan");
            }, function(error) {
                alert(error.message);
            })
    }
})

.controller("PasienController", function($scope, $http, $rootScope, SessionService) {
    $scope.InputPasien = {};
    $rootScope.DataKirim = {};
    $scope.DatasPasien = [];
    $scope.Init = function() {

    }

    $scope.Daftar = function(ip) {
        $rootScope.DataKirim = $scope.InputPasien;
        $rootScope.DataKirim.noip = $rootScope.ip;
        window.location.href = 'index.html#!/Pertanyaan';
        // var UrlDataPasien = "api/datas/createDataPasien.php";
        // $http({
        //         method: "post",
        //         url: UrlDataPasien,
        //         data: Data
        //     })
        //     .then(function(response) {
        //         $scope.DatasPasien = response.records;
        //     }, function(error) {
        //         alert("Proses Gagal");
        //     })

    }

})


.controller("DaftarAbsenController", function($scope, $http, $rootScope, SessionService) {
    $scope.DataTanggal = {};
    $scope.DatasAbsenPegawai = [];
    //$rootScope.Session = {};
    $scope.Init = function() {
        //Auth
        var Urlauth = "api/datas/auth.php";
        $http({
                method: "get",
                url: Urlauth,
            })
            .then(function(response) {
                if (response.data.Session == false) {
                    window.location.href = 'login.html';
                } else
                    $rootScope.Session = response.data.Session;
            }, function(error) {
                alert(error.message);
            })

        var UrlPrices = "api/Prices.php?action=GetPrices";
        $http({
                method: "get",
                url: UrlPrices
            })
            .then(function(response) {
                $scope.DataPrices = response.data;
            }, function(error) {
                alert(err.Massage);
            })
    }

    $scope.Cari = function() {
        var Data = $scope.DataTanggal;
        var UrlAbsen = "api/datas/readAbsenPegawai.php";
        $http({
                method: "post",
                url: UrlAbsen,
                data: Data
            })
            .then(function(response) {
                $scope.DatasAbsenPegawai = response.data.records[0];
            }, function(error) {
                alert(error.message);
            })

    }
})

.controller("ViewAbsenController", function($scope, $http, $rootScope, SessionService) {
    //$rootScope.Session = {};
    $scope.DatasAbsen = [];
    $scope.DataTanggal = {};
    $scope.DataPegawai = {};

    $scope.Init = function() {
        //Auth
        var Urlauth = "api/datas/auth.php";
        $http({
                method: "get",
                url: Urlauth,
            })
            .then(function(response) {
                if (response.data.Session == false) {
                    window.location.href = 'login.html';
                } else
                    $rootScope.Session = response.data.Session;
            }, function(error) {
                alert(error.message);
            })

    }
    $scope.Cari = function() {
        var Data = $scope.DataTanggal;
        var UrlAbsen = "api/datas/readAbsen.php";
        $http({
                method: "post",
                url: UrlAbsen,
                data: Data
            })
            .then(function(response) {
                $scope.DatasAbsen = response.data;
            }, function(error) {
                alert(error.message);
            })
    }

    $scope.Cetak = function() {
        var Data = $scope.DataTanggal;
        var date = $scope.DataTanggal;

        //Convert Dtate  Tostring
        startDate = date.Year + " " + date.Month + " " + date.Day;



        //$scope.DataTanggal.DTanggal = $filter('date')($scope.DataTanggal.DariTanggal, "yyyy-MM-dd");
        var UrlAbsen = "api/datas/dataTanggal.php";
        $http({
                method: "post",
                url: UrlAbsen,
                data: Data
            })
            .then(function(response) {
                if (response.data.message == true)
                    window.open('apps/laporan/LaporanAbsen.html', '_blank')
            }, function(error) {
                alert(error.message);
            })
    }

    $scope.CetakPegawai = function(item) {
        $scope.DataPegawai = item;
        var Data = $scope.DataPegawai;
        var UrlDataPegawai = "api/datas/setTanggal.php";
        $http({
                method: "post",
                url: UrlDataPegawai,
                data: Data
            })
            .then(function(response) {
                if (response.data.message == true)
                    window.open('apps/laporan/LaporanPegawai.html', '_blank')
            }, function(error) {
                alert(error.message);
            })

    }

})

.controller("HariLiburController", function($scope, $http, $rootScope, SessionService) {
    $scope.DatasHariLibur = [];
    //$rootScope.Session = {};
    $scope.DataInputHariLibur = {};
    $scope.DataSelected = {};
    $scope.Init = function() {
        //Auth
        var Urlauth = "api/datas/auth.php";
        $http({
                method: "get",
                url: Urlauth,
            })
            .then(function(response) {
                if (response.data.Session == false) {
                    window.location.href = 'login.html';
                } else
                    $rootScope.Session = response.data.Session;
            }, function(error) {
                alert(error.message);
            })

        //Get Hari Libur
        var UrlAbsen = "api/datas/readHariLibur.php";
        $http({
                method: "get",
                url: UrlAbsen,
            })
            .then(function(response) {
                if (response.data.message != "No Hari Libur found")
                    $scope.DatasHariLibur = response.data.records;
                else
                    alert(response.data.message);
            }, function(error) {
                alert(error.message);
            })
    }

    //insert Hari Libur
    $scope.InsertHariLibur = function() {
        var Data = $scope.DataInputHariLibur;
        var UrlInsertHariLibur = "api/datas/createHariLibur.php";
        $http({
                method: "post",
                url: UrlInsertHariLibur,
                data: Data
            })
            .then(function(response) {
                if (response.data.message != "0") {
                    Data.IdHari = response.data.message;
                    $scope.DatasHariLibur.push(angular.copy(Data));
                } else
                    alert("Data Gagal disimpan");
            }, function(error) {
                alert(error.message);
            })
    }

    $scope.Selected = function(item) {
        //$scope.DataSelected = item;
        $scope.DataSelected.DariTgl = new Date(item.DariTgl);
        $scope.DataSelected.SampaiTgl = new Date(item.SampaiTgl);
        $scope.DataSelected.Keterangan = item.Keterangan;
        $scope.DataSelected.IdHari = item.IdHari;
    }

    $scope.UpdateDataHariLibur = function() {
        var Data = $scope.DataSelected;
        var UrlUpdateHariLibur = "api/datas/updateHariLibur.php";
        $http({
                method: "post",
                url: UrlUpdateHariLibur,
                data: Data
            })
            .then(function(response) {
                if (response.data.message == "Bidang was updated") {
                    angular.forEach($scope.DatasHariLibur, function(value, key) {
                        if (value.IdHari == Data.IdHari) {
                            value.DariTgl = Data.DariTgl;
                            value.SampaiTgl = Data.SampaiTgl;
                            value.Keterangan = Data.Keterangan;
                            alert(response.data.message);
                        }
                    })
                } else
                    alert(response.data.message);
            }, function(error) {
                alert(error.message);
            })
    }
    $scope.Delete = function(item) {
        $scope.DataSelected = item;
        var Data = $scope.DataSelected;
        var UrlDeleteHariLibur = "api/datas/deleteHariLibur.php";
        $http({
                method: "post",
                url: UrlDeleteHariLibur,
                data: Data
            })
            .then(function(response) {
                if (response.data.message == "Hari Libur Berhasil Di Hapus") {
                    $scope.DatasHariLibur.splice(Data, 1);
                    alert(response.data.message);
                } else
                    alert("Data Tidak Terhapus");
            }, function(error) {
                alert(error.message);
            })
    }


})

.controller("StatusAbsenController", function($scope, $http) {
    $scope.DatasStatusAbsen = [];
    $scope.DatasPegawai = [];
    $scope.DataJenis = [{ 'jenis': 'Izin' }, { 'jenis': 'Cuti' }, { 'jenis': 'Sakit' }, { 'jenis': 'DL' }];
    $scope.DataInput = {};
    $scope.SelectedItemPegawai = {};
    $scope.SelectedJenis = {};
    $scope.DataSelected = {};
    $scope.Init = function() {
        //Get Data Pegawai
        var UrlPegawai = "api/datas/readPegawai.php";
        $http({
                method: "get",
                url: UrlPegawai
            })
            .then(function(response) {
                $scope.DatasPegawai = response.data.records;
            }, function(error) {
                alert(error.message);
            })

        //Get Data Status
        var UrldataStatus = "api/datas/readStatusAbsen.php";
        $http({
                method: "get",
                url: UrldataStatus
            })
            .then(function(response) {
                $scope.DatasStatusAbsen = response.data.records;
            }, function(error) {
                alert(error.message);
            })

    }

    $scope.Selected = function(item) {
        $scope.DataSelected = angular.copy(item);
        $scope.DataSelected.Pengajuan = new Date(item.Pengajuan);
        $scope.DataSelected.TglMulai = new Date(item.TglMulai);
        $scope.DataSelected.TglSelesai = new Date(item.TglSelesai);
        angular.forEach($scope.DatasPegawai, function(value, key) {
            if (value.Nip == item.Nip) {
                $scope.SelectedItemPegawai = value;
            }
        })
        $scope.SelectedJenis.jenis = item.Jenis;

    }

    $scope.InsertStatusAbsen = function() {
        $scope.DataInput.Nip = $scope.SelectedItemPegawai.Nip;
        $scope.DataInput.Nama = $scope.SelectedItemPegawai.Nama;
        $scope.DataInput.Jenis = $scope.SelectedJenis.jenis;
        var Data = $scope.DataInput;
        var UrlStatus = "api/datas/createStatusAbsen.php";
        $http({
                method: "post",
                url: UrlStatus,
                data: Data
            })
            .then(function(response) {
                if (response.data.message > 1) {
                    Data.Id = response.data.message;
                    $scope.DatasStatusAbsen.push(Data);
                }
            }, function(error) {
                alert(error.message);
            })

        $scope.SelectedItemPegawai = {};
        $scope.SelectedJenis = {};
    }

    $scope.UpdateStatusAbsen = function() {
        var newdateMulai = $scope.DataSelected.TglMulai.getFullYear() + '-' + ($scope.DataSelected.TglMulai.getMonth() + 1) + '-' + ($scope.DataSelected.TglMulai.getDate() - 1);
        $scope.DataSelected.TglMulai = newdateMulai;
        var newdateSelesai = $scope.DataSelected.TglSelesai.getFullYear() + '-' + ($scope.DataSelected.TglSelesai.getMonth() + 1) + '-' + ($scope.DataSelected.TglSelesai.getDate() - 1);
        $scope.DataSelected.TglSelesai = newdateSelesai;
        var newdatePengajuan = $scope.DataSelected.Pengajuan.getFullYear() + '-' + ($scope.DataSelected.Pengajuan.getMonth() + 1) + '-' + ($scope.DataSelected.Pengajuan.getDate() - 1);
        $scope.DataSelected.Pengajuan = newdatePengajuan;
        var Data = $scope.DataSelected;
        var UrlStatusAbsen = "api/datas/updateStatusAbsen.php";
        $http({
                method: "post",
                url: UrlStatusAbsen,
                data: Data
            })
            .then(function(response) {
                if (response.data.message == "Status Was Update") {
                    angular.forEach($scope.DatasStatusAbsen, function(value, key) {
                        if (value.Id == Data.Id) {
                            value.Jenis = Data.Jenis;
                            value.TglPengajuan = response.data.TglPengajuan;
                            value.TglMulai = response.data.TglMulai;
                            value.TglSelesai = response.data.TglSelesai;
                            value.Keterangan = Data.Keterangan;
                            alert(response.data.message);
                            window.location.href = 'index.html#!/StatusAbsen';
                        }
                    })
                } else
                    alert(response.data.message);
            }, function(error) {
                alert(error.message);
            })
    }

    $scope.Delete = function(item) {
        $scope.DataSelected = item;
        var Data = $scope.DataSelected;
        var UrlDeleteStatusAbsen = "api/datas/deleteStatusAbsen.php";
        $http({
                method: "post",
                url: UrlDeleteStatusAbsen,
                data: Data
            })
            .then(function(response) {
                if (response.data.message == "Perangkat Berhasil Di Hapus") {
                    $scope.DatasStatusAbsen.splice(Data, 1);
                    alert(response.data.message);
                } else
                    alert("Data Tidak Terhapus");
            }, function(error) {
                alert(error.message);
            })
    }

});