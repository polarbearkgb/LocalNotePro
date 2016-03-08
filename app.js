//TODO delete button and cool features

$(document).ready(function () {

    if (localStorage.getItem('constantCount') !== null) {
        constantCount = localStorage.getItem('constantCount');
    }
    else {
        var constantCount = 0;

    }
    //check if boxCount exists
    if (localStorage.getItem('boxCount') !== null) {
        boxCount = localStorage.getItem('boxCount');
        // console.log(boxCount);
    }
    else {
        var boxCount = 0;
        //console.log(boxCount);
    }
    //make boxes only if exits boxCount
    if (boxCount !== null) {

        var j = 1;
        //  declare new array to hold number values
        var numArray = new Array();
        for (var u = 0; u < localStorage.length; u++) {
            //match numbers after refresh
            if (localStorage.key(u).match(/Date-/i)) {
                var locDate = localStorage.key(u);
                var splitDate = locDate.split("-");
                var number = splitDate[1];
                numArray.push(number);
            }


        }
        //     console.log(numArray);


        for (var i = 0; i < boxCount; i++) {

            var name = $('.iname').val();
            var subj = $('.isubject').val();
            var message = $('.imessage').val();

            $('#blocky').append('<div id="boxCount-' + numArray[j - 1] + '" class="noteBlock" data-toggle="modal" data-target="#myModal-' + numArray[j - 1] + '"  data-tooltip="true" title="' + localStorage.getItem('Date-' + numArray[j - 1]) + '"><h1>' + localStorage.getItem('name-' + numArray[j - 1]) + '</h1></div>');

            $('body').append('<div class="modal fade" id="myModal-' + numArray[j - 1] + '" role="dialog">' +
                '  <div class="modal-dialog modal-lg"> ' +
                '<div class="modal-content">' +
                '  <div class="modal-header">' +
                '  <button type="button" class="close" data-dismiss="modal">&times;</button>' +
                '<h4 class="modal-title">New Note</h4>' +
                ' </div>' +
                ' <div class="modal-body">' +
                ' <section>' +
                '   <div class="container fitIt">' +
                ' <div class="row">' +
                ' <div class="col-sm-12">' +
                ' <form>' +
                ' <div class="row">' +
                '  <div class="col-md-12">' +
                ' <div class="form-group">' +
                '   <input type="text"  class="form-control iname"' +
                ' placeholder="Name it*">' +
                ' </div>' +
                ' <div class="form-group">' +
                ' <input type="text" class="form-control isubject"' +
                ' placeholder="Subject*">' +
                ' </div>' +
                '<div class="form-group">' +
                '  <textarea class="form-control imessage" rows="8"></textarea>' +
                ' </div>' +
                '<div><h2>' + localStorage.getItem("Date-" + numArray[j - 1]) + '</h2></div>' +
                '</div>' +
                ' <div class="clearfix"></div>' +
                '   <div class="col-lg-12 text-center">' +
                ' <button type="button"  class="btn btn-xl delBox" data-dismiss="modal">Delete</button>' +
                '</div>' +
                ' </div>' +
                ' </form>' +
                '  </div>' +
                '   </div>' +
                ' </div>' +
                ' </section>' +
                '</div>' +
                '<div class="modal-footer">' +
                ' <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
                '</div>' +
                ' </div>' +
                ' </div>' +
                ' </div>');


            // add new modal valaues
            $("#myModal-" + numArray[j - 1] + " .iname").val(localStorage.getItem("name-" + numArray[j - 1], name));
            $("#myModal-" + numArray[j - 1] + " .isubject").val(localStorage.getItem("subject-" + numArray[j - 1], subj));
            $("#myModal-" + numArray[j - 1] + " .imessage").val(localStorage.getItem("message-" + numArray[j - 1], message));

            j++;


        }
        $('.delBox').click(function () {

//find closest parent id that starts with myModal
            var currModal = $(this).closest("[id^='myModal']");
            //   console.log(currModal);
            //get id of this element
            var currModalId = $(currModal).attr("id");
            //split into two parts to get number
            var splitId = $(currModal).attr("id").split("-");
            //console.log(splitId[1]);
            //if boxcount exists, delete it
            if ($("#boxCount-" + splitId[1]).length > 0) {

                $("#boxCount-" + splitId[1]).remove();
                localStorage.removeItem('name-' + splitId[1]);
                localStorage.removeItem('subject-' + splitId[1]);
                localStorage.removeItem('message-' + splitId[1]);
                localStorage.removeItem('Date-' + splitId[1]);
                localStorage.setItem("boxCount", --boxCount);

            }


        });


    }

    $('#noteBlockNew').click(function () {
        $(this).effect("bounce", {times: 2}, "slow");
        $("#myModal .iname").val("");
        $("#myModal .isubject").val("");
        $("#myModal .imessage").val("");
    });
    $('.noteBlock').click(function () {
        $(this).effect("bounce", {times: 2}, "fast");
    });

    $('.saveData').click(function () {


        if ($('.iname').val().length===0 || $('.imessage').val().length===0 || $('.isubject').val().length===0) {
            alert("Required Fields Missing!");
        }
        else {


            //get date
            var dateStamp = new Date();
            //  console.log(dateStamp);


            boxCount++;
            constantCount++;

            var name = $('.iname').val();
            var subj = $('.isubject').val();
            var message = $('.imessage').val();

            //have to set date before appending block so doesnt display null
            localStorage.setItem("Date-" + constantCount, dateStamp);


            //generate new box
            //boxCount
            $('#blocky').append('<div id="boxCount-' + constantCount + '" class="noteBlock" data-toggle="modal"  data-target="#myModal-' + constantCount + '" data-tooltip="true" title="' + localStorage.getItem('Date-' + constantCount) + '"><h1>' + name + '</h1></div>');

            //genarate new modal
            $('body').append('<div class="modal fade" id="myModal-' + constantCount + '" role="dialog">' +
                '  <div class="modal-dialog modal-lg"> ' +
                '<div class="modal-content">' +
                '  <div class="modal-header">' +
                '  <button type="button" class="close" data-dismiss="modal">&times;</button>' +
                '<h4 class="modal-title">New Note</h4>' +
                ' </div>' +
                ' <div class="modal-body">' +
                ' <section>' +
                '   <div class="container fitIt">' +
                ' <div class="row">' +
                ' <div class="col-sm-12">' +
                ' <form>' +
                ' <div class="row">' +
                '  <div class="col-md-12">' +
                ' <div class="form-group">' +
                '   <input type="text"  class="form-control iname"' +
                ' placeholder="Name it*">' +
                ' </div>' +
                ' <div class="form-group">' +
                ' <input type="text" class="form-control isubject"' +
                ' placeholder="Subject*">' +
                ' </div>' +
                '<div class="form-group">' +
                '  <textarea class="form-control imessage" rows="8"></textarea>' +
                ' </div>' +
                '<div><h2>' + localStorage.getItem("Date-" + constantCount) + '</h2></div>' +
                '</div>' +
                ' <div class="clearfix"></div>' +
                '   <div class="col-lg-12 text-center">' +
                ' <button type="button"  class="btn btn-xl delBox" data-dismiss="modal">Delete</button>' +
                '</div>' +
                ' </div>' +
                ' </form>' +
                '  </div>' +
                '   </div>' +
                ' </div>' +
                ' </section>' +
                '</div>' +
                '<div class="modal-footer">' +
                ' <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
                '</div>' +
                ' </div>' +
                ' </div>' +
                ' </div>');

            //to make new boxes bounce
            $('#boxCount-' + boxCount).click(function () {
                $(this).effect("bounce", {times: 2}, "fast");
            });

            // Store


            localStorage.setItem("name-" + constantCount, name);
            localStorage.setItem("subject-" + constantCount, subj);
            localStorage.setItem("message-" + constantCount, message);
            localStorage.setItem("boxCount", boxCount);
            localStorage.setItem("constantCount", constantCount);


            // add new modal valaues
            $("#myModal-" + constantCount + " .iname").val(localStorage.getItem("name-" + constantCount, name));
            $("#myModal-" + constantCount + " .isubject").val(localStorage.getItem("subject-" + constantCount, subj));
            $("#myModal-" + constantCount + " .imessage").val(localStorage.getItem("message-" + constantCount, message));

        }
        // alert(boxCount);

        //make delete button work for ones created in this sessions
        $('.delBox').click(function () {

//find closest parent id that starts with myModal
            var currModal = $(this).closest("[id^='myModal']");
            //get id of this element
            var currModalId = $(currModal).attr("id");
            //split into two parts to get number
            var splitId = $(currModal).attr("id").split("-");
            //console.log(splitId[1]);
            //if boxcount exists, delete it
            if ($("#boxCount-" + splitId[1]).length > 0) {

                $("#boxCount-" + splitId[1]).remove();
                localStorage.removeItem('name-' + splitId[1]);
                localStorage.removeItem('subject-' + splitId[1]);
                localStorage.removeItem('message-' + splitId[1]);
                localStorage.removeItem('Date-' + splitId[1]);
                localStorage.setItem("boxCount", --boxCount);

            }


        });
    });


        $('[data-toggle="tooltip"]').tooltip();
    }
);


