class Startpage extends Base {
  constructor() {
		super();
		this.checkAllChecked();
		this.render();
		this.renderCourt();
		this.initMap();
  }

  renderCourt() {
    let allCourtsHtml = `<div class="court-heading py-1 pl-3"><i class="fas fa-road mr-2"></i>Lista på banor i Lunds kommun</div>`;

    for (let court of this.filteredArray) {
      allCourtsHtml += `
			<div class="py-2 px-4 court-item mb-3">
				<h5 class="mb-0">${court.title}</h5>
				<p class="text-muted mb-0">${court.address}</p>
			</div>
			`;
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
		
	}
	initMap() {
		let mapElem = document.getElementById('map');

		if (!google){
			setTimeout(() => {
				this.initMap();
			}, 200);
			return
		}

    this.map = new google.maps.Map(mapElem, {
        center: {lat: 55.7209369679304, lng: 13.1598554523846},
        zoom: 11
		});
	}
}
