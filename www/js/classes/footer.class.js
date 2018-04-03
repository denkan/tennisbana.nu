class Footer extends Base {
	constructor(){
		super()

    this.render('footer');
    this.footerFix();
		this.fixOnResize();
	}

	footerFix(){
    let height = $('footer').height() + 40;
    $('body').css({marginBottom: height});
  }

  fixOnResize(){
    $(window).on('resize',() => {
      this.footerFix();
    });
  }

}
