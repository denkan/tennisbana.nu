class Footer extends Base {
	constructor(){
		super()
    this.render('footer')
    this.bodyFix();
    this.fixOnResize();
          
	}

  bodyFix(){
    let footerH = $('footer').height();
    let headerH = $('header').height();
    let bodyH = $('body').height();
    if (headerH < 25) {
      setTimeout(() => { this.bodyFix() }, 200); 
      return
    } else {
      let fullH = bodyH - (footerH + headerH + 20);
      $('.filter-holder').css({height: fullH});
      $('.court-holder').css({height: fullH});
      $('#map').css({height: fullH});
    }
  }

  fixOnResize(){
    $(window).on('resize',() => {
      this.bodyFix();
    });
  }

}
