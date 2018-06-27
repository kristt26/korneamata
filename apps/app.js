var app = angular.module("app", ["ngRoute", "Ctrl", "ng-fusioncharts"]);

app.run(function($rootScope, $http) {
    var url = "//freegeoip.net/json/";
    $http.get(url).then(function(response) {
        console.log(response.data.ip);
        $rootScope.ip = response.data.ip;
    });
});

app.directive("fileInput", function($parse) {
    return {
        link: function($scope, element, attrs) {
            element.on("change", function(event) {
                var files = event.target.files;
                console.log(files[0].name);
                $parse(attrs.fileInput).assign($scope, element[0].files);
                $scope.$apply();
            });
        }
    }
});

app.controller("LoginController", function($scope, $http) {
    $scope.DataLogin = {};
    $scope.Login = function() {
        var Data = $scope.DataLogin;
        var UrlLogin = "api/datas/login.php";
        $http({
                method: "post",
                url: UrlLogin,
                data: Data
            })
            .then(function(response) {
                if (response.data.Message == "Success") {
                    window.location.href = 'admin.html';
                } else
                    alert("Data Gagal disimpan");
            }, function(error) {
                alert(error.message);
            })

    }
});

// app.controller("LogoutController", function($scope, $http) {
//     $scope.Logout = function() {
//         var Urlauth = "api/datas/logout.php";
//         $http({
//                 method: "get",
//                 url: Urlauth,
//             })
//             .then(function(response) {
//                 if (response.data.message == true) {
//                     window.location.href = 'index.html';
//                 }
//             }, function(error) {
//                 alert(error.message);
//             })
//     }

// });

app.config(function($routeProvider) {  
    $routeProvider   
        .when("/Main", {
            templateUrl: "apps/Views/main.html",
            controller: "MainController"
        })

    .when("/Penyakit", {
        templateUrl: "apps/Views/penyakit.html",
        controller: "penyakitController"
    })

    .when("/Gejala", {
        templateUrl: "apps/Views/gejala.html",
        controller: "gejalaController"
    })

    .when("/Logout", {
        templateUrl: "apps/Views/log.html",
        controller: "LogoutController"
    })

    .when("/Pengetahuan", {
        templateUrl: "apps/Views/pengetahuan.html",
        controller: "PengetahuanController"
    })

    .when("/Pertanyaan/:Datakirim", {
        templateUrl: "apps/Views/pertanyaan.html",
        controller: "KonsultasiController"
    })


    .when("/login", {
        templateUrl: "apps/Views/login.html",
        controller: "LoginController"
    })

    .when("/PenyakitUser", {
        templateUrl: "apps/Views/penyakitUser.html",
        controller: "DaftarPenyakitController"
    })

    .when("/GejalaUser", {
        templateUrl: "apps/Views/gejalauser.html",
        controller: "DaftarGejalaController"
    })

    .when("/Konsultasi", {
        templateUrl: "apps/Views/konsultasi.html",
        controller: "PasienController"
    })

    .when("/Laporan", {
        templateUrl: "apps/Views/chart.html",
        controller: "LaporanController"
    })

    .otherwise({ redirectTo: '/Main' });

    // ChartJsProvider.setOptions({ colors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
})





.service('fileUpload', ['$http', function($http) {
    this.uploadFileToUrl = function(file, uploadUrl, name) {
        var fd = new FormData();
        fd.append('file', file);
        fd.append('name', name);
        $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined, 'Process-Data': false }
            })
            .success(function() {
                console.log("Success");
            })
            .error(function() {
                console.log("Success");
            });
    }
}])


.factory("SessionService", function($http, $rootScope, $location) {

    var service = {};
    service.get = function() {
        $rootScope.Session = {};
        var Urlauth = "api/datas/auth.php";
        $http({
                method: "get",
                url: Urlauth,
            })
            .then(function(response) {
                if (response.data.Session == false) {
                    window.location.href = 'index.html';
                } else
                    $rootScope.Session = response.data.Session;
            }, function(error) {
                alert(error.message);
            })
    }

    service.cek = function() {
        var url = $location.absUrl();
        if (url == "http://localhost/korneamata/admin.html#!/Main") {
            service.get();
        }
        // $scope.firstParameter = url[2];
        // $scope.secondParameter = url[3];
    }

    return service;
})

;