'use babel';

import SimpleReplaceView from './simple-replace-view';
import { CompositeDisposable } from 'atom';
//import data from '../data/data';

export default {

  simpleReplaceView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.simpleReplaceView = new SimpleReplaceView(state.simpleReplaceViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.simpleReplaceView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'simple-replace:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.simpleReplaceView.destroy();
  },

  serialize() {
    return {
      simpleReplaceViewState: this.simpleReplaceView.serialize()
    };
  },

  toggle() {
	  console.log('SimpleReplac was toggled!');
      const editor = atom.workspace.getActiveTextEditor();
      var cnt=0;
      if (editor) {
		  try{
			client = new XMLHttpRequest();
			client.open("GET", "http://52.78.232.197:8080/common/textnormalization/getDuplications", false);
			client.send();
			var data=JSON.parse(client.response);
	          data.forEach(function(o){
				  for(var key in o) var value=o[key];
	              pattern=new RegExp(key, 'gu')
	              editor.scan(pattern,(match) => {
	                  cnt++;
	                  match.replace(value);
	              })
	          });
	          alert(cnt+' replaced');
		  }catch(e){
			  console.log(e);
			  alert('데이타에 오류가 있습니다.');
		  }
      }else{
          console.log("editor not found");
      }
  }

};
