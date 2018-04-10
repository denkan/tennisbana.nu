class App extends Base {
  constructor(){
    super()
    this.loadJSON();
  }

  async loadJSON(){
    await JSON._load('courts').then((courts) => {
      this.allCourts = courts;
    })
    this.start();
  }

  start(){
    this.startpage = new Startpage();
    this.header = new Header();
    this.footer = new Footer();
  }
}
