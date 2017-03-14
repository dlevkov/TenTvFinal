import { CompileTypeSummary } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Constants } from './Constants';

@Injectable()
export class HtmlContentParser {
  public scriptList: any[] = [];
  public parser: any = window['contentParser'];
  public count: number = 0;
  private length: number = 0;


  public reset() {
    this.count = 0;
    this.scriptList = [];
  }

  public setLength(len: number) {
    this.length = len;
  }

  public contentHref(content) {
    let categoryToSection = Constants.CATEGORYTOSECTION;
    let paragraphContent = document.createElement('div');
    try {
      paragraphContent.innerHTML = '<div>' + content + '</div>';
      let aTag = paragraphContent.querySelectorAll('a[href*="nana.co.il"],a[href*="nana10.co.il"]');
      for (let i = 0; i < aTag.length; i++) {
        let href = aTag[i].getAttribute('href');
        let result = '';
        let func1 = ['ArticleID', 'SectionID', 'CategoryID'];
        func1.forEach(element => {
          let id = this.getParameterByName(element, href);
          if (id !== null) {
            aTag[i].setAttribute('target', '_self');
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
                typeof secId !== 'undefined'
                  ? aTag[i].setAttribute('href', '/section/' + sections[id])
                  : aTag[i].setAttribute('href', '/main');
                break;
              default:
                break;
            }
          }
        });
      }
      return paragraphContent.innerHTML;
    } catch (error) {
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
    if (!results)
      return null;
    if (!results[2])
      return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  public contentScript(content) {
    try {
      let script = document.createElement('div');
      script.innerHTML = content;
      let elem = script.getElementsByTagName('script')[0];
      let elem1 = document.createElement('script');
      this.count++;
      if (typeof elem === 'undefined' || typeof elem.src === 'undefined') {
        if (this.count === this.length) {
          this.appendToDom();
        }
        return false;
      }
      elem1.src = elem.src;

      if (elem1 !== undefined) {
        if (this.indexOf(elem1) === -1) {
          this.scriptList.push(elem1);
        }
      }
      if (this.count === this.length) {
        this.appendToDom();
      }

    } catch (error) {
      console.log('contentParser.contentHref failed to parse');
      return content;
    }
  }

  public indexOf(elem) {
    for (let i = 0; i < this.scriptList.length; i++) {
        if (this.scriptList[i].src === elem.src) {
            return i;
        }
    }
    return -1;
  }

  public appendToDom() {
    this.scriptList.forEach((item) => {
        this.parser.appendToDom(item);
      });
  }
}
