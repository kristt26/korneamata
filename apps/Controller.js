angular.module("Ctrl", [])

.controller("MainController", function($scope, SessionService) {
    $scope.Init = function() {
        SessionService.cek();
    }
})


.controller("penyakitController", function($scope, $http, $rootScope, SessionService, fileUpload) {
    $scope.datainput = {};
    $scope.DatasPenyakit = [];
    $scope.DataSelected = {};
    $scope.Foto;
    $scope.LastRecord;
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

    $scope.TombolTambahPenyakit = function() {
        var a = $scope.DatasPenyakit.length;
        $scope.LastRecord = $scope.DatasPenyakit[a - 1];
        var datakode = $scope.LastRecord.kd_penyakit;
        var lastcode = "P0" + (parseInt(datakode.substring(2)) + 1);
        $scope.datainput.kd_penyakit = lastcode;
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
            //$scope.DataSelected.photo = $scope.files[0].namefile;
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
        if ($scope.files == undefined) {


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
                                value.photo = Data.photo;
                                value.solusi = Data.solusi;
                                alert(response.data.message);
                            }
                        })
                    } else
                        alert(response.data.message);
                }, function(error) {
                    alert(error.message);
                })
        } else {
            var photoname = $scope.DataSelected;
            $http({
                    url: "http://localhost/mata/api/datas/delFile.php", //or your add enquiry services
                    method: "POST",
                    data: photoname
                })
                .then(function(response) {

                }, function(error) {

                })
            $http({
                url: "api/datas/upload.php", //or your add enquiry services
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
                    $scope.DataSelected.photo = $scope.photo;
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
                                        value.photo = Data.photo;
                                        value.solusi = Data.solusi;
                                        alert(response.data.message);
                                        window.location.href = 'admin.html#!/Penyakit';
                                    }
                                })
                            } else
                                alert(response.data.message);
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
    }
})

.controller("gejalaController", function($scope, $http, $rootScope, SessionService) {
    $scope.datainput = {};
    $scope.DatasGejala = [];
    $scope.DataSelected = {};
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

    $scope.TombolTambahGejala = function() {
        var a = $scope.DatasGejala.length;
        $scope.LastRecord = $scope.DatasGejala[a - 1];
        var datakode = $scope.LastRecord.kd_gejala;
        var lastcode = "G0" + (parseInt(datakode.substring(2)) + 1);
        $scope.datainput.kd_gejala = lastcode;
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

    $scope.Selected = function(item) {
        $scope.DataSelected = item;
    }

    $scope.UpdateGejala = function() {
        if ($scope.files == undefined) {
            var Data = $scope.DataSelected;
            var UrlUpdateGejala = "api/datas/updateGejala.php";
            $http({
                    method: "post",
                    url: UrlUpdateGejala,
                    data: Data
                })
                .then(function(response, data) {
                    if (response.data.message == "Gejala was updated") {
                        angular.forEach($scope.DatasGejala, function(value, key) {
                            if (value.IdGejala == Data.IdGejala) {
                                value.kd_gejala = Data.kd_gejala;
                                value.nm_gejala = Data.nm_gejala;
                                value.Pertanyaan = Data.Pertanyaan;
                                value.Keterangan = Data.Keterangan;
                                value.Photo = Data.Photo;
                                alert(response.data.message);
                            }
                        })
                    } else
                        alert(response.data.message);
                }, function(error) {
                    alert(error.message);
                })
        } else {
            var photoname = $scope.DataSelected;
            $http({
                    url: "http://localhost/mata/api/datas/delFile.php", //or your add enquiry services
                    method: "POST",
                    data: photoname
                })
                .then(function(response) {

                }, function(error) {

                })
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
                    $scope.DataSelected.Photo = $scope.photo;
                    var Data = $scope.DataSelected;
                    var UrlUpdateGejala = "api/datas/updateGejala.php";
                    $http({
                            method: "post",
                            url: UrlUpdateGejala,
                            data: Data
                        })
                        .then(function(response, data) {
                            if (response.data.message == "Gejala was updated") {
                                angular.forEach($scope.DatasGejala, function(value, key) {
                                    if (value.IdGejala == Data.IdGejala) {
                                        value.kd_gejala = Data.kd_gejala;
                                        value.nm_gejala = Data.nm_gejala;
                                        value.Pertanyaan = Data.Pertanyaan;
                                        value.Keterangan = Data.Keterangan;
                                        value.Photo = Data.Photo;
                                        alert(response.data.message);
                                    }
                                })
                            } else
                                alert(response.data.message);
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
    }
})

.controller("PengetahuanController", function($scope, $http, $rootScope, SessionService) {
    $scope.DatasPengetahuan = [];
    $scope.SelectedPenyakit = {};
    $scope.DatasGejala = [];
    $scope.SelectedGejala = {};
    $scope.DataSimpan = {};
    $scope.ItemSelected = {};
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

    $scope.Delete = function(item) {
        $scope.ItemSelected = item;
        var Data = $scope.ItemSelected;
        var URLDelete = "api/datas/deletePengetahuan.php";
        $http({
                method: "post",
                url: URLDelete,
                data: Data
            })
            .then(function(response) {
                if (response.data.message == "Pengetahuan was deleted") {
                    angular.forEach($scope.DatasPengetahuan, function(valuePenyakit, keyPenyakit) {
                        if (valuePenyakit.IdPenyakit == Data.IdPenyakit) {
                            angular.forEach(valuePenyakit.Gejala, function(valueGejala, keyGejala) {
                                if (valueGejala.IdGejala == Data.IdGejala) {
                                    valuePenyakit.Gejala.splice(Data, 1);
                                }
                            })
                        }
                    })
                }

            }, function(error) {

            })

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

.controller("KonsultasiController", function($scope, $http, $rootScope, $routeParams) {
    $scope.DatasPasien = {};
    $scope.DatasPenyakit = [];
    $scope.DatasGejala = {};
    $scope.Nilai = 0;
    $scope.NilaiIndex = 0;
    $scope.DataTampung = [];
    $scope.JumlahIndex = 0;
    $scope.TampilGejala = {};
    $scope.Hasil = "true";
    $scope.Pesan = "";




    $scope.Init = function() {
        $scope.DatasPasien = JSON.parse($routeParams.Datakirim);
        $scope.DatasPasien.noip = $rootScope.ip;
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

    $scope.refresh = function() {
        window.location.href = 'index.html#!/Konsultasi';
    }

    $scope.Pertanyaan = function(item) {
        $scope.Nilai = 1;
        $scope.DatasGejala = item;
        $scope.JumlahIndex = $scope.DatasGejala.Gejala.length;
        $scope.TambahGejala = $scope.DatasGejala.Gejala[$scope.NilaiIndex];
    }
    $scope.PilihYa = function() {
        //$scope.DataTampung.push(angular.copy($scope.TambahGejala));
        if (($scope.JumlahIndex - 1) != $scope.NilaiIndex) {
            $scope.NilaiIndex++;
            $scope.TambahGejala = $scope.DatasGejala.Gejala[$scope.NilaiIndex];
        } else {
            if ($scope.Hasil == "true") {
                $scope.DatasGejala.Pasien = $scope.DatasPasien;
                $scope.DatasGejala.Hasil = $scope.Hasil;
                var Data = $scope.DatasGejala;
                var UrlDiagnosa = "api/datas/createDataPasien.php";
                $http({
                        method: "post",
                        url: UrlDiagnosa,
                        data: Data
                    })
                    .then(function(response) {
                        if (response.data.message == "true") {
                            $scope.Pesan = $scope.DatasGejala.Pasien.nama + "Anda mengidap Penyakit " + $scope.DatasGejala.nm_penyakit;

                        } else
                            alert("Data Gagal disimpan");
                    }, function(error) {
                        alert(error.message);
                    })
            } else {
                $scope.DatasGejala.Pasien = $scope.DatasPasien;
                $scope.DatasGejala.Hasil = $scope.Hasil;
                var Data = $scope.DatasGejala;
                var UrlDiagnosa = "api/datas/createDataPasien.php";
                $http({
                        method: "post",
                        url: UrlDiagnosa,
                        data: Data
                    })
                    .then(function(response) {
                        if (response.data.message == "false") {
                            $scope.Pesan = $scope.DatasGejala.Pasien.nama + "Anda Kemungkinan anda Tidak Mengidap Penyakit " + $scope.DatasGejala.nm_penyakit;

                        } else
                            alert("Data Gagal disimpan");
                    }, function(error) {
                        alert(error.message);
                    })
            }

        }
    }

    $scope.PilihTidak = function() {
        $scope.Hasil = "false";
        if (($scope.JumlahIndex - 1) != $scope.NilaiIndex) {
            $scope.NilaiIndex++;
            $scope.TambahGejala = $scope.DatasGejala.Gejala[$scope.NilaiIndex];
        } else {
            $scope.DatasGejala.Pasien = $scope.DatasPasien;
            $scope.DatasGejala.Hasil = $scope.Hasil;
            var Data = $scope.DatasGejala;
            var UrlDiagnosa = "api/datas/createDataPasien.php";
            $http({
                    method: "post",
                    url: UrlDiagnosa,
                    data: Data
                })
                .then(function(response) {
                    if (response.data.message == "false") {
                        $scope.Pesan = $scope.DatasGejala.Pasien.nama + "Anda Kemungkinan anda Tidak Mengidap Penyakit " + $scope.DatasGejala.nm_penyakit;
                        alert(mes);

                    } else
                        alert("Data Gagal disimpan");
                }, function(error) {
                    alert(error.message);
                })
        }

    }
})

.controller("PasienController", function($scope, $http, $rootScope, SessionService, $location) {
    $scope.InputPasien = {};
    $scope.DatasPasien = [];
    $scope.Init = function() {

    }

    $scope.Daftar = function(ip) {
        $rootScope.DataKirim = $scope.InputPasien;
        $rootScope.DataKirim.noip = $rootScope.ip;
        $location.path('/Pertanyaan');
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

.controller("LaporanController", function($scope, $http, $rootScope, SessionService, $location) {
    $scope.dataSource = {};
    $scope.Init = function() {
        var UrlGetPengetahuan = "api/datas/readDataAnalisa.php";
        $http({
                method: "get",
                url: UrlGetPengetahuan
            })
            .then(function(response) {
                // $scope.labels = response.data.Nama;
                // $scope.data = response.data.Jumlah;
                $scope.dataSource = {
                    "chart": {
                        caption: "Laporan Hasil Diagnosa Penyakit Kornea Mata",
                        startingangle: "120",
                        showlabels: "0",
                        showlegend: "1",
                        enablemultislicing: "0",
                        slicingdistance: "15",
                        showpercentvalues: "1",
                        showpercentintooltip: "0",
                        plottooltext: "Penyakit : $label Total visit : $datavalue",
                        theme: "fint"

                    },
                    "data": response.data.data
                };

            }, function(error) {
                alert(error.message);
            })
    }


})

.controller("LogoutController", function($scope, $http, SessionService) {
    $scope.Init = function() {
        var Url = "api/datas/logout.php";
        $http({
                method: "get",
                url: Url
            })
            .then(function(response) {
                if (response.data.message == true) {
                    SessionService.get();
                }
            }, function(error) {
                alert(error.message);
            })
    }


});