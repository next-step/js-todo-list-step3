import {test} from "../js/Team.js"



export class Router {
  nowPage = '';
  
  constructor({ pages }) {
    this.app = document.getElementById('app');

    window.onload = () => {
     // if()
      const Page = pages[0].page;
      const currentPage = new Page({router : this});
      this.app.innerHTML = currentPage.render();

      test();
    }
  
    window.onclick = (e) => {
      this.pages = pages;
      console.log(e.target);
      console.log(window.location.hash);
      // if(window.location.hash===''){
      //   console.log('goto main');
      //   this.nowPage = '';
      // } 
      // else {
      //   console.log('goto todoList');
      //   this.nowPage = window.location.hash.replace('#', '');
      // }
      
      // const page = this.pages.find((page) => page.path === this.nowPage);
      // const Page = page.page;
      // const currentPage = new Page({ router: this });
      
      // this.app.innerHTML = currentPage.render();
    };
  }

  push(pageName) {
    window.location.hash = pageName;
  }
}
  