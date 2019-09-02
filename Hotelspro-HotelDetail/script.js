//******************************  Map-Function  ******************************
function myMap(lat,lng) {
    let uluru = {lat: lat,lng: lng};
      let map = new google.maps.Map(
      document.getElementById('googleMap'), {
      center: uluru,
      zoom: 7
      });
    let marker = new google.maps.Marker({position: uluru, map: map});
  }
  
  //******************************  Scroll-Function  ******************************
  function autoScrollTo(el) {
    document.getElementById(el).scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }
  
  //******************************  See-More-Function  ******************************
  function seeMore() {
    let dots = document.getElementById("more");
    let btnText = document.getElementById("more-button");
    let iconName = document.getElementById("icon-name");
    if (dots.style.height === "20px") {
      btnText.innerHTML = "See less";
      dots.style.height = "auto";
      iconName.className += "fa fa-angle-up"
    } 
    else {
      btnText.innerHTML = "See more"; 
      dots.style.height = "20px";
      iconName.className += "fa fa-angle-down"
    }
  }
  
  //******************************  All-Facilities-Render-Function  ******************************
  function renderFacilities(facilitiesArray) {
    for(let i = 0; i < facilitiesArray.length; i++){
      let newLi = document.createElement("li");
      let newI = document.createElement("i");
      let newDiv = document.createElement("div");
      document.getElementById("all-facilities-list").appendChild(newLi);
      newLi.className = "list-item";
      newLi.id = "list-item-id" + i;
      document.getElementById("list-item-id" + i).appendChild(newI);
      newI.className = "fa fa-check-circle";
      document.getElementById("list-item-id" + i).appendChild(newDiv);
      newDiv.className = "facility-name";
      newDiv.innerHTML = facilitiesArray[i].name;
    }
  }
  
  //******************************  Star-Function  ******************************
  
  function renderStar(starIndex){
    for(let i = 0; i < starIndex; i++){
      let newStarIcon = document.createElement("i");
      document.getElementById("star-base").appendChild(newStarIcon);
      newStarIcon.className = "fa fa-star";
      newStarIcon.id = "star" + i;
      newStarIcon.style.color = "orange";
    }
    for(let i = 0; i < ( 5-starIndex ) ; i++){ 
      console.log(i);
      let newStarIcon = document.createElement("i");
      document.getElementById("star-base").appendChild(newStarIcon);
      newStarIcon.className = "fa fa-star";
      newStarIcon.id = "star" + i;
      newStarIcon.style.color = "grey";
    }
  }
  
  //******************************  Get-Hotel-Detail-Function  ******************************
  function getHotelDetail() {
    $.get('https://virtserver.swaggerhub.com/faruk.cepni/XproAPI/1.0.0/hotel/hotels/114c94/detail')
      .done(function(response) {
      renderHotelDetail(response);
    });
  }
  
  //******************************  image-container ****************************** 
  function renderHotelDetail(data) {
      
  document.getElementById('images-container').innerHTML = 
    '<div class="image-left">' +
      '<img class="photo-left" src = " ' +data.images[0].url + ' "> ' +
      '<div class="icon-container">' +
        '<a href="#"> <i class="fa fa-heart" aria-hidden="true" style="color:red; " > </i> </a>' +
      '</div>' +  
    '</div>' +
    '<div class="image-right">' +
      '<div class="image-right-top">' +
        '<img class="photo-right-top" src = " ' +data.images[1].url + ' "> ' +
      '</div>' +
      '<div class="image-right-bottom">' +
        '<div class="image-right-bottom-left">' +
          '<img class="photo-right-bottom-left" src = " ' +data.images[2].url + ' "> ' +
        '</div>' +
        '<div class="image-right-bottom-right">' +
          '<img class="photo-right-bottom-left" src = " ' +data.images[3].url + ' "> ' +
        '</div>'
      '</div>'      
    '</div>'  
      
  // ******************************  Hotel info container ****************************** 
  document.getElementById('hotel-info-container').innerHTML = 
    '<div class="hotel-header-wrapper">' +
      '<div class="hotel-name-star-address-container">' +
        '<div class="name-star-container">' +
          '<div class="hotel-name-container">' +
            '<h3 class="hotel-name" id="hotel-name">' + data.name + '</h3>' +
          '</div>' +
          '<div class="star-container">' +
            '<div id="star-base">' +
              // renderStar(data.star) +
            '</div>' + 
          '</div>' +     
        '</div>' + 
        '<div class="address-container">' +
          '<p><i class="fa fa-map-marker " style="font-size:18px; margin-right: 10px; "> </i>' + data.address +'</p>' +
        '</div>' +
      '</div>' + 
      '<div class="excellent-reviews-container">'+
        '<div class="tripadvisor-rating">' +
          '<div class="badge">' + data.partners_info[0].average_rating +'</div>' +
          '<div class="rating-text"> Excellent </div>' +
        '</div>' +
        '<p class="review">' +
          '<span>'+ data.partners_info[0].review_count +'</span>' +
          '<span> Reviews </span>' +
        '</p>' 
      '</div>'  
    '</div>'
      
  // ******************************  Most Popular Facilities and See All Facility Button ****************************** 
  document.getElementById('most-popular').innerHTML = 
    '<div class="most-popular-facilities-detail">' +
      '<p class="most-popular-facilities-title">' +
        '<span>Most Popular Facilities</span>' +
      '</p>' +
      '<ul class="most-popular-facilities-list">' +
        '<li><i class="fa fa-check-circle "></i>'+ data.facilities[0].name +'</li>' +
        '<li><i class="fa fa-check-circle "></i>'+ data.facilities[1].name +'</li>' +
        '<li><i class="fa fa-check-circle "></i>'+ data.facilities[2].name +'</li>' +
        '<li><i class="fa fa-check-circle "></i>'+ data.facilities[3].name +'</li>' +
      '</ul>' +
    '</div>' +
    '<button class="see-all-button" type="button" id="see-all-facilities-button" onclick=autoScrollTo("more-facilities")>' +
      '<span>See All Facilities</span>' +
    '</button>'
  
  // ******************************  map-container ****************************** 
  myMap ( data.latitude , data.longitude )
    
  // ******************************  See All Facilities ****************************** 
  document.getElementById("more-facilities").innerHTML =
    '<div class="facilities-title">' +
      '<h1 class="hotel-info-title"><span> Hotel Facilities</span></h1>' +
    '</div>' +
    '<ul class="facilities-list" id="all-facilities-list">'
      renderFacilities(data.facilities) 
    '</ul>' 
    
  // ******************************  Descriptions ****************************** 
  document.getElementById("more-descriptions").innerHTML =
    '<h1 class="hotel-info-title">' +
      '<span> Hotel Information</span>' +
    '</h1>' +
    '<div class="hotel-info-information">' +
      '<div style = "height: 20px; overflow: hidden;" id="more">' +
        '<p class="information-desc">' +  data.descriptions[0].description +  '</p>' +
        '<p class="information-desc">' +  data.descriptions[1].description +  '</p>' +
        '<p class="information-desc">' +  data.descriptions[2].description +  '</p>' +
      '</div>' +
      '<button class="see-more-button" type = "button" onclick = seeMore() >' +
        '<span class="link-text">' +
          '<span id="more-button">See More</span>' +
          '<i class="fa fa-angle-down" id="icon-name" style = "font-size:12px"></i>' +
        '</span>' +
      '</button>'
    '</div>'
    renderStar(data.star)
  }