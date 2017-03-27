$(document).ready(function() {
    $.get("domains.json", function(data) {
        $(".scan").click(function() {
            $(".scanbutton").hide();
            $(".loadingbar").show();
            var domains = data.domains;
            var faileddomains = [];
            var cnt = 0;
            $(".count").html("0 / " + domains.length);
            $.each(domains, function(i, data) {
                var image = new Image();
                image.setAttribute("domain", data.domain.replace("~", ""));
                image.setAttribute("title", data.title);
                image.onerror = function() {
                    cnt++;
                    $(".count").html(cnt + " / " + domains.length);
                    faileddomains.push({
                        "title": this.getAttribute("title"),
                        "domain": this.getAttribute("domain"),
                        "img": this.src
                    });
                    $(".bar").width(((cnt / domains.length) * 100) + '%');
                    $(".failedresults").show();
                    if (faileddomains.length == 1) {
                        $(".failed").html('1 domain could not be reached');
                    } else {
                        $(".failed").html(faileddomains.length + ' domains could not be reached');
                    }
                    if (cnt == domains.length) {
                        $(".loadingbar").hide();
                    }
                    $(".table tbody").prepend("<tr><td>" + data.title + "<p class='right'><a href='javascript:void(0);' onclick=\"swal('" + data.title + "','<a target=_blank href=" + data.img + ">" + data.domain + "</a> could not be reached','error');\"><i class='info circle icon'></i></a></p></td></tr>");
                };

                image.onload = function() {
                    cnt++;
                    $(".count").html(cnt + " / " + domains.length);
                    $(".bar").width(((cnt / domains.length) * 100) + '%');
                    if (cnt == domains.length && faileddomains.length == 0) {
                        $(".loadingbar").hide();
                        $(".successresults").show();
                    } else if (cnt == domains.length) {
                        $(".loadingbar").hide();
                    }
                };
                if (data.domain.match("^~")) {
                    image.src = 'http://' + data.domain.replace("~", "") + '/' + data.img + '?no-cache=' + (new Date).getTime();
                } else {
                    image.src = 'http://www.' + data.domain + '/' + data.img + '?no-cache=' + (new Date).getTime();
                }
            });
        });
    });
});