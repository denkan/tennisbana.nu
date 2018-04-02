class Popstate extends Base{

  constructor(app){
    super();
    this.app = app;
    this.clickEvents();
    this.changePage();
    this.eventHandlerSet = false;
    window.addEventListener('popstate', () => this.changePage());
  }




  clickEvents(){
    let that = this;
    $(document).on('click','.pop',function(e){
      let href = $(this).attr('href');
      href = that.makeUrl(href);
      history.pushState(null, null, href);
      that.changePage();
      e.preventDefault();
    })};

  scrollToTop(){
    $('html,body').scrollTop(0);
  }

  changePage(){

    let urls = {
      '/' : 'startpage'
    }

    let url = location.pathname;
    let methodName = urls[url];

    this[methodName]();
  }

  startpage(){

  }

}
