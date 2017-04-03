$(document).ready(function() {
    $.get("https://mrluit.github.io/CensorRadar/domains.json", function(data) {
        $(".scan").removeClass("disabled");
        $(".scan").click(function() {
            var domains = data.domains;
            var faileddomains = {};
            var cnt = 0;
            $(".count").html("0 / " + domains.length);
            $(".scanbutton").hide();
            $(".loadingbar").show();
            $.each(domains.reverse(), function(i, data) {
                var image = new Image();
                image.setAttribute("domain", data.domain.replace("~", ""));
                image.setAttribute("title", data.title);
                image.onerror = function() {
                    cnt++;
                    $(".count").html(cnt + " / " + domains.length);
					/* This is a server-side check to determine if a domain might be fully offline. The server just replies '1' or '0' depending if it can reach the domain. Keep in mind that CensorRadar will never rely on this backup server. It's just an extra feature for the end user. */
					$.get("https://luithollander.nl/censorradar.php?url=" + encodeURIComponent(image.src), function(online) {
						faileddomains[data.title] = parseInt(online);
					}.bind(this)).fail(function() {
						faileddomains[data.title] = 2;
					}.bind(this)).always(function() {
						$(".bar").width(((cnt / domains.length) * 100) + '%');
						$(".failedresults").fadeIn(500);
						if (Object.keys(faileddomains).length == 1) {
							$(".failed").html(Object.keys(faileddomains).length + ' domain could not be reached');
						} else {
							$(".failed").html(Object.keys(faileddomains).length + ' domains could not be reached');
						}
						if (cnt == domains.length) {
							$(".loadingbar").fadeOut(500);
						}
						if(faileddomains[data.title] == 0) {
						new_row = $("<tr><td><i class='warning circle icon'></i>" + data.title + "<p class='right'><a href='javascript:void(0);' onclick=\"swal('" + data.title + "','<a target=_blank href=http://www." + data.domain.replace("~", "") + '/' + data.img + ">" + data.domain.replace("~", "") + "</a> could not be reached on both server and client. This probably means the website is offline.','warning');\"><i class='info circle icon'></i></a></p></td></tr>");
						}
						else if(faileddomains[data.title] == 1 || faileddomains[data.title] == 2) {
						new_row = $("<tr><td><i class='remove circle icon'></i> " + data.title + "<p class='right'><a href='javascript:void(0);' onclick=\"swal('" + data.title + "','<a target=_blank href=http://www." + data.domain.replace("~", "") + '/' + data.img + ">" + data.domain.replace("~", "") + "</a> could not be reached','error');\"><i class='info circle icon'></i></a></p></td></tr>");
						}
						new_row.hide();
						$(".table tbody").prepend(new_row);
						new_row.fadeIn(200);
					})
                };

                image.onload = function() {
                    cnt++;
                    $(".count").html(cnt + " / " + domains.length);
                    $(".bar").width(((cnt / domains.length) * 100) + '%');
                    if (cnt == domains.length && faileddomains.length == 0) {
                        $(".loadingbar").fadeOut(500);
                        $(".successresults").fadeIn(500);
                    } else if (cnt == domains.length) {
                        $(".loadingbar").fadeOut(500);
                    }
                };
                if (data.domain.match("^~")) {
                    image.src = 'http://' + data.domain.replace("~", "") + '/' + data.img + '?no-cache=' + (new Date).getTime();
                } else {
                    image.src = 'http://www.' + data.domain + '/' + data.img + '?no-cache=' + (new Date).getTime();
                }
            });
        });
    }).fail(function() {
        swal('Connection error', 'The domains database could not be loaded', 'error');
    })
});