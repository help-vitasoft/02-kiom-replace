'use babel';

import SimpleReplaceView from './simple-replace-view';
import { CompositeDisposable } from 'atom';

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
    console.log('SimpleReplace was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
