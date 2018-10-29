'use babel';

import LiferayFragmentExportView from './liferay-fragment-export-view';
import { CompositeDisposable } from 'atom';
import { saveAs } from 'file-saver';

const JSZip = require('jszip');
const fs = require('fs');

export default {

  liferayFragmentExportView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.liferayFragmentExportView = new LiferayFragmentExportView(
      state.liferayFragmentExportViewState, this);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.liferayFragmentExportView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'liferay-fragment-export:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.liferayFragmentExportView.destroy();
  },

  serialize() {
    return {
      liferayFragmentExportViewState: this.liferayFragmentExportView.serialize()
    };
  },

  toggle() {
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

  exportFragment() {
    const fragmentName = document.getElementById('name').value;

    const cssFileElement = document.getElementById('cssFile');
    const htmlFileElement = document.getElementById('htmlFile');
    const jsFileElement = document.getElementById('jsFile');

    if (cssFileElement.files.length == 0 ||
        htmlFileElement.files.length == 0 ||
        jsFileElement.files.length == 0) {

        atom.notifications.addWarning(
          'Please choose files for CSS, HTML and JS components of the fragment.');

        return;
    }

    if (fragmentName === '') {
      atom.notifications.addWarning(
        'Please specify a name for the fragment.');

      return;
    }

    const zip = new JSZip();

    const cssContent = fs.readFileSync(cssFileElement.files[0].path);
    zip.file(`/${fragmentName}/src/${cssFileElement.files[0].name}`, cssContent);

    const htmlContent = fs.readFileSync(htmlFileElement.files[0].path);
    zip.file(`/${fragmentName}/src/${htmlFileElement.files[0].name}`, htmlContent);

    const jsContent = fs.readFileSync(jsFileElement.files[0].path);
    zip.file(`/${fragmentName}/src/${jsFileElement.files[0].name}`, jsContent);

    const fragmentConfig = {
      name: fragmentName,
      cssPath: `./src/${cssFileElement.files[0].name}`,
      htmlPath: `./src/${htmlFileElement.files[0].name}`,
      jsPath: `./src/${jsFileElement.files[0].name}`
    };

    zip.file(
      `/${fragmentName}/fragment.json`,
      JSON.stringify(fragmentConfig)
    );

    const zipContent = zip.generate({type:"blob"});

    saveAs(zipContent, `${fragmentName}.zip`).onwriteend = () => {
      document.getElementById('name').value = '';
      cssFileElement.value = '';
      htmlFileElement.value = '';
      jsFileElement.value = '';

      this.toggle();

      atom.notifications.addSuccess(`Fragment ${fragmentName} exported successfully!`);
    };
  }

};
