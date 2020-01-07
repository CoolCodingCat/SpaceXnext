var app = {
    spaceXUrl: 'https://api.spacexdata.com/v3',

    init: function() {
        console.log('initiated');
        console.log('Et bien dites donc. Vous êtes curieux vous !');
        $('.goapi').on('click',app.handleClick);
        $('.answer').addClass("hidden");
    },
    handleClick: function() {
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

            $(".answer").removeClass('hidden');


            $('.button').remove();


            /* console.log(response);
            console.log(response.details); //details
            console.log(response.crew); //crew
            console.log(response.mission_name); //mission name
            console.log(response.flight_number); //flight nb
            console.log(response.launch_date_utc); //launch date
            console.log(response.rocket.rocket_name); //rocket name
            console.log(response.launch_site.site_name_long); //site name */
            

            if (!response.crew) {
                $('#crew_details').append("No crew");
            } else {
                $('#crew_details').append(response.crew);
            }

            $('#name').append(response.mission_name);
            $('#number').append(response.flight_number);
            $('#details').append(response.details);
            
            var properDate = response.launch_date_utc;

            $('#date').append(properDate.slice(0,10));
            $('#time').append(properDate.slice(11,19));
            $('#rocket').append(response.rocket.rocket_name);
            $('#site').append(response.launch_site.site_name_long);



        });
        launch.fail(function() {
            console.log('Fail...');
            $('#apistuff').html('<span class="fail-only">Communications are down - try again later</span>');
        });

        // Cette méthode est toujours executée.
        // Que la requete réussisse ou échoue
        launch.always(function() {

            // Dans ma div swapi, trouve moi la roue, et supprime la.
            $('#apistuff').find('.sr-only').remove();
        });
    }
};
$(app.init);