class Startpage extends Base {
  constructor() {
    super();
    this.markersArray = [];
		this.checkAllChecked();
		this.render();
		this.renderCourt();
		this.initMap();
  }

  renderCourt() {
    let allCourtsHtml = `<div class="court-heading py-1 pl-3"><i class="fas fa-road mr-2"></i>Lista på banor i Lunds kommun</div>`;
    let co = 1;
    for (let court of this.filteredArray) {
      allCourtsHtml += `
			<div class="py-2 px-4 court-item mb-3">
				<h5 class="mb-0">${co}. ${court.title}</h5>
				<p class="text-muted mb-0">${court.address}</p>
			</div>
      `;
      co++;
    }
    $('.court-holder').html(allCourtsHtml);
  }

  click() {
    if ($(event.target).hasClass("cmn-toggle")) {
      this.checkAllChecked();
    }
  }

  checkAllChecked() {
    let checkedObjects = $(":checked");
    this.courtType = [];
    this.surfaceType = [];
    this.qualityType = [];

    for (let filterItem of checkedObjects) {
      if (filterItem.name.includes("courtType")) {
        this.courtType.push(filterItem.value);
      } else if (filterItem.name.includes("courtSurface")) {
        this.surfaceType.push(filterItem.value);
      } else if (filterItem.name.includes("courtQuality")) {
        this.qualityType.push(filterItem.value);
      }
    }
		this.filterArray();
		this.renderCourt();
  }

  filterArray() {
    this.filteredArray = [];
    this.filteredArray = app.allCourts.filter(court => {
      let ctValid = checkIfValid(this.courtType, court.courtType);
      let stValid = checkIfValid(this.surfaceType, court.courtSurface);
			let qtValid = checkIfValid(this.qualityType, court.courtQuality);
			
			function checkIfValid(compareArray, fullArray){
				if (compareArray.length === 0) {
					return true;
				} else {
					for (let item of compareArray) {
						if (fullArray.includes(item)) {
							return true;
						}
					}
				}
				return false;
			}

      if (ctValid && stValid && qtValid) {
        return true;
      } else {
        return false;
      }
    });
    this.markOutFilteredArray();
  }

  

	initMap() {
		let mapElem = document.getElementById('map');

		if (!window.google){
			setTimeout(() => {
				this.initMap();
			}, 200);
			return
		}

    this.map = new google.maps.Map(mapElem, {
        center: {lat: 55.7209369679304, lng: 13.1598554523846},
        zoom: 11
    });

    this.markOutFilteredArray();
  }
  
  // Everything for map

  markOutFilteredArray(){
    this.deleteMarkers();
    let co = 1;
    for (let court of this.filteredArray){
      this.markOnMap(court, co)
      co++;
    };
  }
  
  markOnMap(court, co){
    let myLatLng = {lat: court.latitude / 1, lng: court.longitude / 1};
    let marker = new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      title: `${co}. ${court.title} (${court.address})`,
      icon: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${co}|5bc0de|000000`,
      courtReference: court
    });
    this.markersArray.push(marker);

  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markersArray.length; i++) {
      this.markersArray[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  showMarkers() {
    this.setMapOnAll(this.map);
  }

  deleteMarkers() {
    this.clearMarkers();
    this.markersArray = [];
  }

}
