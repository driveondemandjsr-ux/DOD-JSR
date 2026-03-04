// script.js

// Booking Form
function openForm(service){
    localStorage.setItem('bookingService', service);
    window.location.href = 'checkout.html';
}

// Fare Calculator
function calculateFare(){
    var drop = document.getElementById("drop").value;
    if(!drop){ alert("Select drop city"); return; }

    var distanceData = {"Ranchi":130,"Dhanbad":140,"Bokaro":110,"Kolkata":270,"Patna":470,"Gaya":300};
    var kms = drop==="Other" ? Number(document.getElementById("customDistance").value) : distanceData[drop];
    if(!kms || kms<=0){ alert("Enter valid distance"); return; }
    kms +=20; // buffer
    var totalFare=0;
    if(["Ranchi","Dhanbad","Bokaro","Kolkata"].includes(drop)) totalFare=1500;
    else if(kms>500) totalFare=kms*5;
    else totalFare=(2*1000)+((["Patna","Gaya"].includes(drop))?1000:500);

    document.getElementById("result").innerHTML="Distance: "+kms+" KM<br><b>Total Fare: ₹"+totalFare+"</b>";
    
    var btn=document.createElement("button");
    btn.innerText="Book Now";
    btn.onclick=function(){
        localStorage.setItem("bookingService","Outstation Trip to "+drop);
        localStorage.setItem("bookingFare",totalFare);
        window.location.href="checkout.html";
    };
    var container=document.getElementById("bookNowContainer");
    container.innerHTML="";
    container.appendChild(btn);
}

// Terms popup
function showTerms(){ document.getElementById("termsPopup").classList.remove("hidden"); }
function closeTerms(){ document.getElementById("termsPopup").classList.add("hidden"); }
document.getElementById("termsPopup")?.addEventListener('click',function(e){if(e.target===this) closeTerms();});
