import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  previewImages = []

  constructor() {}
  
  ngOnInit() {
    fetch('https://www.reddit.com/r/pics/.json?&raw_json=1')
      .then(res => res.json())
      .then(res => {
        console.log('res: ', res)
        this.previewImages = res.data.children
          .filter(entry => entry.data.preview)
          .map(entry => entry.data.preview.images[0].source.url)
          
          console.log('this.previewImages: ', this.previewImages);
      })
  }

}
