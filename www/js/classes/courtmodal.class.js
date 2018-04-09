class CourtModal extends Base {
  constructor() {
		super();
		this.eventHandler();
	}
	
	setCourt(court){
		this.court = court;
		console.log(this.court);
	}

	eventHandler(){
		$(document).on('click', '.thumbnail-image', function(){
			let imgSource = $(this).attr('src');
			$('.big-image').attr('src', imgSource);
		})
	}
}
