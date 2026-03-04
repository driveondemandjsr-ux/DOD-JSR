// script.js

// Booking Form
function openForm(service){
    localStorage.setItem('bookingService', service);
    window.location.href = 'checkout.html';
}

// Custom distance toggle
function toggleCustom(){
    var drop = document.getElementById("drop").value;
    document.getElementById("customKM").classList.toggle("hidden", drop !== "Other");
}

// Fare Calculator
function calculateFare(){
    var drop = document.getElementById("drop").value;
    if(!drop){ alert("Please select a drop city."); return; }

    var distanceData = {"Ranchi":130,"Dhanbad":140,"Bokaro":110,"Kolkata":270,"Patna":470,"Gaya":300};
    var kms = drop === "Other" ? Number(document.getElementById("customDistance").value) : distanceData[drop];
    
    if(!kms || kms<=0){
        document.getElementById("result").innerHTML="Enter valid distance.";
        document.getElementById("bookNowContainer").innerHTML='';
        return;
    }
    
    kms += 20; // buffer
    var totalFare = 0;

    if(["Ranchi","Dhanbad","Bokaro","Kolkata"].includes(drop)){
        totalFare = 1500;
    } else if(kms>500){
        totalFare = kms*5;
    } else {
        var days = 2;
        var ticket = (["Patna","Gaya"].includes(drop))?1000:500;
        totalFare = (days*1000)+ticket;
    }

    document.getElementById("result").innerHTML = 
        "Distance (with buffer): "+kms+" KM<br><b>Total Fare: ₹"+totalFare+"</b>";

    var container = document.getElementById("bookNowContainer");
    container.innerHTML = '';
    var btn = document.createElement("button");
    btn.innerText="Book Now";
    btn.onclick = function(){ 
        localStorage.setItem('bookingService','Outstation Trip to '+drop);
        localStorage.setItem('bookingFare', totalFare);
        window.location.href='checkout.html';
    };
    container.appendChild(btn);
}

// Terms
function showTerms(){ document.getElementById("termsPopup").classList.remove("hidden"); }
function closeTerms(){ document.getElementById("termsPopup").classList.add("hidden"); }
document.getElementById("termsPopup")?.addEventListener('click', function(e){
    if(e.target === this) closeTerms();
});
