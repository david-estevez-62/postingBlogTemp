$(function(){


    $.ajax({
        url: "/content",
        method: "GET"
    }).done(function(data){
            for (var i = 0; i < data.length; i++) {
                // Retrieve the template html from the 
                //handlebars script tag embed within the html
                var template = $('#postPartialTemp').html();
                // Compile the template data into a function
                var templateModel = Handlebars.compile(template);
                var context = data[i]; // the obj and its data for said temp 
                var tempInstance = templateModel(context);
                $('#staticPostCont').append(tempInstance);
            }
    })
    
})



