//  for reload and response ________________
function reload() {
    var data = {
        "IBIF_ex": "MAIN",
        "TAG": "REPORT",
        "RELOAD": "Y"
    };
    $.post(gc_RpcType, data, function (response) {
        $("#up_TEST").html(response);
    });

}

function checkUser() {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var data = {
        "IBIF_ex": "SUPERUSER",
        "TAG": "cUSER",
        "EMAIL": email,
        "PASSWORD": password

    };

    $.post(gc_RpcType, data, function (response) {
        if (response.includes(data.EMAIL) && response.includes(data.PASSWORD)) {
            mainPage();
        } else {
            console.log("Something went wrong!");
        }


    });
}

function mainPage() {
    var data = {
        "IBIF_ex": "MAIN"
    };
    $.post(gc_RpcType, data, function (response) {
        $("#innerdiv").html(response);
    });

}



//SIGN OUT FROM THE MAIN PAGE
function signOut() {
    signOutPage();
    localStorage.removeItem('authToken');
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('signOutBtn').addEventListener('click', signOut);

});

function signOutPage() {
    var data = {
        "IBIF_ex": "SIGNOUT",

    };
    $.post(gc_RpcType, data, function (response) {

        $(".container-fluid").html(response);
    });

}

//For shwing sidebar options

function dashboard() {

    $("#dashboard").removeClass("hidden");
    $("#customers").addClass("hidden");
    $("#exchange").addClass("hidden");
    $("#exchangeDiv").addClass("hidden");
};



function transfer() {
    $("#exchangeDiv").removeClass("hidden");
    $("#exchange").addClass("hidden");
    $("#customers").addClass("hidden");
    $("#dashboard").addClass("hidden");
    $("#updateCustomer").addClass("hidden");

};


function exchange() {
    $("#exchange").removeClass("hidden");
    $("#exchangeDiv").addClass("hidden");
    $("#customers").addeClass("hidden");
    $("#dashboard").addClass("hidden");
    $("#up_TEST").addClass("hidden");
};

function customers() {
    $("#customers").removeClass("hidden");
    $("#exchange").addClass("hidden");
    $("#exchangeDiv").addClass("hidden");
    $("#dashboard").addClass("hidden");
    $("#updateCustomer").addClass("hidden");
};



//for INSETING DATA TO  cuurency transfer
function currencyTransfer() {

    var id = document.getElementById('id').value;
    var date = document.getElementById('date').value;
    var sender = document.getElementById('sender').value;
    var receiver = document.getElementById('receiver').value;
    var src_location = document.getElementById('src_location').value;
    var dest_location = document.getElementById('dest_loaction').value;
    var amount = document.getElementById('amount').value;
    var rate = document.getElementById('rate').value;
    var r_amount = document.getElementById('r_amount').value;
    var sending_cur = document.getElementById('sending_cur').value;
    var receving_cur = document.getElementById('receiving_cur').value;
    var user = document.getElementById('user').value;
    var location = document.getElementById('location').value;

    var data = {
        "IBIF_ex": "CURRENCY_TRANSFER",
        "TAG": "CUR_TRANSFER",
        "ID": id,
        "DATE": date,
        "SENDER": sender,
        "RECEIVER": receiver,
        "SRC_LOCATION": src_location,
        "DEST_LOCATION": dest_location,
        "AMOUNT": amount,
        "RATE": rate,
        "R_AMOUNT": r_amount,
        "SENDING_CUR": sending_cur,
        "RECEIVING_CUR": receving_cur,
        "USER": user,
        "LOCATION": location,

    };
    $.post(gc_RpcType, data, function (resp) {
        $("#customers").html(resp);
    });
}

function multiplyAndFill(amount, rate) {
    var result = amount * rate;
    return result;
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        var amount = parseFloat(document.getElementById('amount').value);
        var rate = parseFloat(document.getElementById('rate').value);

        if (!isNaN(amount) && !isNaN(rate)) {
            var result = multiplyAndFill(amount, rate);
            document.getElementById('r_amount').value = result;
        } else {
            alert('Please enter valid numbers.');
        }
    }
}
document.addEventListener('keypress', handleKeyPress);


function back() {
    $("#customers").removeClass("hidden");
    $("#updateCustomer").addClass("hidden");
}


function updateCustomer(ID) {

    var data = {
        "IBIF_ex": "UPDATE_FILE",
        "TAG": "B_TEST",
        "ID": ID
    };
    $.post(gc_RpcType, data, function (resp) {
        console.log(ID);
        $("#updateCustomer").html(resp);
    });
    $("#updateCustomer").removeClass("hidden");
    $("#customers").addClass("hidden");
}



function Update() {
    var data = {
        "IBIF_ex": "UPDATE_ID",
        "ID": $("#input_id").val(),
        "DATE": $("#input_date").val(),
        "SENDER": $("#input_sender").val(),
        "RECEIVER": $("#input_receiver").val(),
        "SRC_LOCATION": $("#input_src_location").val(),
        "DEST_LOCATION": $("#input_dest_location").val(),
        "AMOUNT": parseInt($("#input_amount").val()),
        "SENDING_CUR": $("#input_sending_cur").val(),
        "RECEIVING_CUR": $("#input_receiving_cur").val()
    };


    $.post(gc_RpcType, data, function (resp) {
        // customers();
        $("#up_TEST").addClass("hidden");

    });
    $("#up_TEST").removeClass("hidden");
}


// Function to show confirmation modal
function confirmDelete() {
    $('#confirmDeleteModal').modal('show');

    // Action when Yes button is clicked
    $('#yesBtn').click(function () {
        // Here you can place your code to delete the record from the database
        // For now, let's just log a message
        console.log("Record deleted!");
        // Hide the modal
        $('#confirmDeleteModal').modal('hide');
    });
}


function delete_Cur(ID) {
    var data = {
        "IBIF_ex": "CURRENCY_TRANSFER",
        "TAG": "DELETE_CUR",
        "ID": ID
    };
    $.post(gc_RpcType, data, function (resp) {
        transfer();
    });
}
