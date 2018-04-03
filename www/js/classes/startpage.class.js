class Startpage extends Base {
	constructor(){
		super()
		this.render('main');
	}

	renderCourt(){
		let allCourtsHtml = '';

		for (let i = 0; i < app.allCourts.length; i++){
			allCourtsHtml += `
			<div class="py-2 px-4 court-item mb-3">
				<h5 class="mb-0">${app.allCourts[i].title}</h5>
				<p>Coordinates: ${app.allCourts[i].latitude}, ${app.allCourts[i].longitude}</p>
			</div>
			`
		}
		return allCourtsHtml;
	}


}
