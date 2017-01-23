import { Injectable } from '@angular/core';
import { Constants } from './Constants';

@Injectable()
export class HtmlContentParser {
  public scriptList: any[] = [];
  public scriptSrcList: string[] = [];
  public count: number = 0;
  public length: number = 0;
  public parser: any = window['contentParser'];

  public contentHref(content) {
    let categoryToSection = Constants.CATEGORYTOSECTION;
    let paragraphContent = document.createElement('div');
    try {
      paragraphContent.innerHTML = '<div>' + content + '</div>';
      var aTag = paragraphContent.querySelectorAll('a[href*="nana.co.il"],a[href*="nana10.co.il"]');
      for (let i = 0; i < aTag.length; i++) {
        let href = aTag[i].getAttribute('href');
        let result = '';
        let func1 = ['ArticleID', 'SectionID', 'CategoryID'];
        func1.forEach(element => {
          let id = this.getParameterByName(element, href);
          console.log('element', element);
          if (id !== null) {
            switch (element) {
              case 'ArticleID':
                aTag[i].setAttribute('href', '/article/' + id);
                break;
              case 'SectionID':
                aTag[i].setAttribute('href', '/section/' + id);
                break;
              case 'CategoryID':
                let sections = Constants.CATEGORYTOSECTION;
                let secId = sections[id];
                typeof secId !== 'undefined' ? aTag[i].setAttribute('href', '/section/' + sections[id]) : aTag[i].setAttribute('href', '/main');
                break;
              default:
                break;
            }
          }
        });
      }
      return paragraphContent.innerHTML;
    } catch (error) {
      console.log('contentParser.contentHref failed to parse');
      return paragraphContent.innerHTML;
    }
  }

  public getParameterByName(name: string, url: string) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    let results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }


  public contentScript(content) {
    try {
      let script = document.createElement('div');
      script.innerHTML = content;
      let elem = script.getElementsByTagName('script')[0];
      let elem1 = document.createElement('script');
      this.count++;
      if (typeof elem === 'undefined' || typeof elem.src === 'undefined')
        return false;
      elem1.src = elem.src;

      if (elem1 !== undefined) {
        elem1.className = 'third-party';
        if (this.scriptList.indexOf(elem1) === -1) {
          this.scriptList.push(elem1);
        }
      }
      if (this.count === this.length) {
        this.scriptList.forEach((item) => {
          console.log('JS get query', item);
          this.parser.appendToDom(this.scriptList[0]);
        });
      }

    } catch (error) {
      console.log('contentParser.contentHref failed to parse');
      return content;
    }
  }
}

