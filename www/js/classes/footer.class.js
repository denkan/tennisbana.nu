class Footer extends Base {
	constructor(){
		super()
		this.footerFix();
		this.fixOnResize();
		this.render('footer');
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
