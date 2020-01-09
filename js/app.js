var app = {
    spaceXUrl: 'https://api.spacexdata.com/v3',

    init: function() {
        console.log('initiated');
        console.log('Et bien dites donc. Vous êtes curieux vous !');
        console.log('Puisque vous voulez tout savoir, ce site a été réalisé avec pas mal de Coca Zéro et beaucoup de Nightwish.');
        console.log('C\'est un terrain de jeu et d\'expérimentation donc il se peut que se soit parfois le bazar : revenez alors plus tard et/ou consultez le github https://github.com/CoolCodingCat/SpaceXnext pour les dernières notes');
        $('.goapi').on('click',app.handleClickNext);
        $('.upcoming').on('click',app.handleClickSoon);
        $('.the-rockets').on('click',app.handleClickSoon);
        $('.return-home').on('click',app.handleReturnHome);
        $('.answer').addClass("is-hidden");
        $('.coming-soon').addClass("is-hidden");
        $('.return-home').addClass("is-hidden");

    },
    handleClickSoon: function() {
        $('.menu-button').addClass("is-hidden");
        $(".return-home").removeClass('is-hidden');
        $(".coming-soon").removeClass('is-hidden');
    },
    handleReturnHome: function() {
        console.log('going home');
        $('.menu-button').removeClass('is-hidden');
        $('.menu-section').removeClass("is-hidden");
        $('.button').removeClass("is-loading");
        app.init();
    },
    handleClickNext: function() {
        $('.button').addClass("is-loading");

        app.nextLaunch();
    },
    nextLaunch: function(){
        var launch = $.ajax({
            url: app.spaceXUrl + '/launches/next',
            method: 'GET',
            dataType: 'json',
        });
        launch.done(function(response) {
            
            $(".answer").removeClass('is-hidden');
            $(".return-home").removeClass('is-hidden');


            $('.menu-button').addClass("is-hidden");
            $('.menu-section').addClass("is-hidden");

            //console.log(response);
            /* 
            console.log(response.details); //details
            console.log(response.crew); //crew
            console.log(response.mission_name); //mission name
            console.log(response.flight_number); //flight nb
            console.log(response.launch_date_utc); //launch date
            console.log(response.rocket.rocket_name); //rocket name
            console.log(response.launch_site.site_name_long); //site name */
            //console.log(response.rocket.second_stage.payloads[0].customers[0]);
            //console.log(response.rocket.second_stage.payloads[0].cargo_manifest);
            

            if (!response.crew) {
                $('#crew_details').html('');
                $('#crew_details').append("No crew");
            } else {
                $('#crew_details').html('');
                $('#crew_details').append(response.crew);
            }
            if (!response.rocket.second_stage.payloads[0].cargo_manifest) {
                $('#payload').html('');
                $('#payload').append("No payload");
            } else {
                $('#payload').html('');
                $('#payload').append(response.rocket.second_stage.payloads[0].cargo_manifest);
            }
            $('#name').html('');
            $('#name').append(response.mission_name);
            $('#number').html('');
            $('#number').append(response.flight_number);
            $('#details').html('');
            $('#details').append(response.details);
            
            var properDate = response.launch_date_utc;

            $('#date').html('');
            $('#date').append(properDate.slice(0,10));
            $('#time').html('');
            $('#time').append(properDate.slice(11,19));
            $('#rocket').html('');
            $('#rocket').append(response.rocket.rocket_name);
            $('#site').html('');
            $('#site').append(response.launch_site.site_name_long);
            $('#client').html('');
            $('#client').append(response.rocket.second_stage.payloads[0].customers[0]);



            /* for (i=0; i<response.rocket.second_stage.payloads.length; i++) {
                for (j=0; j<response.rocket.second_stage.payloads[i].customers.length; j++) {
                        $('#client').append("<li></li>")
                    }
                } */



        });
        launch.fail(function() {
            console.log('Fail...');
            $('#apistuff').html('<span class="fail-only">Communications are down - try again later</span>');
        });

       /*  launch.always(function() {

            $('#apistuff').find('.sr-only').remove();
        }); */
    }
};
$(app.init);