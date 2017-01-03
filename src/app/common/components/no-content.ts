import { Component } from '@angular/core';

@Component({
  selector: 'no-content',
  template: `
    <div style='{top:65px;position:absolute;}'>
    <br><br><br>
      <h1 style='text-align:center'>404: page missing</h1>
    </div>
  `
})
export class NoContent {

}
