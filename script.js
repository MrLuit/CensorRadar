$(document).ready(function() {
    $(".scan").click(function() {
        $(".undertext").html("<div class='ui progress'><div class='bar'></div></div>");
        $.get("domains.json", function(data) {
            var domains = data.domains;
            var faileddomains = [];
            var cnt = 0;
            $(".undertext").prepend("<b class='count'>0 / " + domains.length + "</b><BR><BR>");
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
                    $(".bar").width((((cnt + 1) / domains.length) * 100) + '%');
                    if (cnt == domains.length) {
                        if (faileddomains.length == 0) {
                            $(".undertext").html("<h4><i class='checkmark icon'></i> Success! No domains are blocked.</h4>");
                        } else {
                            if (faileddomains.length == 1) {
                                failedtext = '1 domain could not be reached';
                            } else {
                                failedtext = faileddomains.length + ' domains could not be reached';
                            }
                            var table = ("<h4 class='failed'>" + failedtext + "</h4><BR><table class='ui celled table'><thead><tr><th>Title</th></tr></thead><tbody>");
                            $.each(faileddomains, function(i, data) {
                                table += "<tr><td>" + data.title + "<p class='right'><a href='javascript:void(0);' onclick=\"swal('" + data.title + "','<a target=_blank href=" + data.img + ">" + data.domain + "</a> could not be reached','error');\"><i class='info circle icon'></i></a></p></td></tr>";
                            });
                            table += "</tbody></table>";
                            $(".undertext").css("padding-top", "5%");
                            $(".undertext").html(table);
                        }
                    }
                };

                image.onload = function() {
                    cnt++;
                    $(".count").html(cnt + " / " + domains.length);
                    $(".bar").width((((cnt + 1) / domains.length) * 100) + '%');
                    if (cnt == domains.length) {
                        if (faileddomains.length == 0) {
                            $(".undertext").html("<h4><i class='checkmark icon'></i> Success! No domains are blocked.</h4>");
                        } else {
                            if (faileddomains.length == 1) {
                                failedtext = '1 domain could not be reached';
                            } else {
                                failedtext = faileddomains.length + ' domains could not be reached';
                            }
                            var table = ("<h4 class='failed'>" + failedtext + "</h4><BR><table class='ui celled table'><thead><tr><th>Title</th></tr></thead><tbody>");
                            $.each(faileddomains, function(i, data) {
                                table += "<tr><td>" + data.title + "<p class='right'><a href='javascript:void(0);' onclick=\"swal('" + data.title + "','<a target=_blank href=" + data.img + ">" + data.domain + "</a> could not be reached','error');\"><i class='info circle icon'></i></a></p></td></tr>";
                            });
                            table += "</tbody></table>";
                            $(".undertext").css("padding-top", "5%");
                            $(".undertext").html(table);
                        }
                    }
                };
                if (data.domain.match("^~")) {
                    image.src = 'http://' + data.domain.replace("~", "") + '/' + data.img;
                } else {
                    image.src = 'http://www.' + data.domain + '/' + data.img;
                }
            });
        });
    });
});