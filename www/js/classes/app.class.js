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
    this.header = new Header();
    this.footer = new Footer();
    this.startpage = new Startpage();
    for (let i = 0; i < this.allCourts.length; i++){
      $('.test').append(`<li> ${this.allCourts[i].show.film} </li>`);
    }
  }
}
