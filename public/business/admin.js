if(imageExists(`/img/<%= user.student_code %>.jpg`) == false)
        {
            document.getElementById("imageid").src="/img/andanh.png";
        }


        function imageExists(image_url) {

            var http = new XMLHttpRequest();

            http.open('HEAD', image_url, false);
            http.send();

            return http.status != 404;

        }