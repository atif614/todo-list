import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    // Search the tags in the DOM
  bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
  htmlTag: HTMLElement = document.getElementsByTagName('html')[0];

  constructor() { }

  ngOnInit() {
    // add the css-style to the html and body tags
    this.bodyTag.classList.add('login-page');
    this.htmlTag.classList.add('login-page');
  }

}
