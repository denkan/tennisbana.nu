class Startpage extends Base {
	constructor(){
		super()
		this.render('main');
	}

	renderCourt(){
		let allCourtsHtml = '';

		for (let court of app.allCourts){
			allCourtsHtml += `
			<div class="py-2 px-4 court-item mb-3">
				<h5 class="mb-0">${court.title}</h5>
				<p class="text-muted mb-0">${court.address}</p>
			</div>
			`
		}
		return allCourtsHtml;
	}

	click(){
		if($(event.target).hasClass('cmn-toggle')){
			console.log('I clicked a checkbox');
		}
	}


}
