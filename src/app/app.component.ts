import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import  EditorJS  from '@editorjs/editorjs';
import  List  from '@editorjs/list';
import  SimpleImage  from '@editorjs/simple-image';
import  Header  from '@editorjs/header';
import  Embed  from '@editorjs/embed';
import  CodeTool   from '@editorjs/code';
import  Table   from '@editorjs/table';
import  Quote   from '@editorjs/quote';
import  Delimiter    from '@editorjs/delimiter';
import  RawTool     from '@editorjs/raw';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public subject = "";
  public editor = new EditorJS({
    holderId: 'editorjs',
    autofocus: true,
    tools: {
      image: {
        class: SimpleImage,
        inlineToolbar: true,
        config: {
          placeholder: 'Paste image URL'
        }
      },
      header: Header,
      quote: Quote,
      embed: Embed,
      raw: RawTool,
      delimiter: Delimiter,
      list: List,
      code: CodeTool,
      table: {
        class: Table,
        inlineToolbar: true,
        config: {
          rows: 1,
          cols: 1,
        },
      },
    }
  });
  public output;
  public files = [];
  public document = {
    name: this.subject,
    files: this.files
  }
  title = 'course-champion-cms';
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;

  constructor(public afs: AngularFirestore) {
    this.itemsCollection = afs.collection<any>('assignments');
    this.items = this.itemsCollection.valueChanges();
  }

  preview() {
    this.editor.saver.save().then((outputData) => {
      this.output = outputData;
    }).catch((error) => {
      console.log('Saving failed: ', error);
    });
  }

  post() {
    if (this.output) {
      this.output["course_name"] = "test";
      this.afs.collection<any>('post').add(this.output);
    }

  }
}
