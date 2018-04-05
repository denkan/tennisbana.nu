class Startpage extends Base {
  constructor() {
		super();
		this.checkAllChecked();
		this.render();
		this.renderCourt();
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
      let ctValid = false;
      let stValid = false;
      let qtValid = false;

      if (this.courtType.length === 0) {
        ctValid = true;
      } else {
        for (let item of this.courtType) {
          if (court.courtType.includes(item)) {
            ctValid = true;
          }
        }
      }

      if (this.surfaceType.length === 0) {
        stValid = true;
      } else {
        for (let item of this.surfaceType) {
          if (court.courtSurface.includes(item)) {
            stValid = true;
          }
        }
      }

      if (this.qualityType.length === 0) {
        qtValid = true;
      } else {
        for (let item of this.qualityType) {
          if (court.courtQuality.includes(item)) {
            qtValid = true;
          }
        }
      }

      if (ctValid && stValid && qtValid) {
        return true;
      } else {
        return false;
      }
    });
		
  }
}
