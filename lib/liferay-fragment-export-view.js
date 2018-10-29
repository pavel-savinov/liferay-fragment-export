'use babel';

export default class LiferayFragmentExportView {

  constructor(serializedState, plugin) {
    this.element = document.createElement('div');
    this.element.setAttribute('style', 'padding: 10px');
    this.element.classList.add('liferay-fragment-export');

    this.element.appendChild(this.createFragmentDiv());

    const closeButton = document.createElement('button');
    closeButton.setAttribute('style', 'position: absolute; right:10px; top: 10px;')
    closeButton.innerHTML = 'Close';

    closeButton.onclick = () => plugin.toggle();

    const createButton = document.createElement('button');
    createButton.setAttribute('style', 'margin-top: 25px;');
    createButton.innerHTML = 'Export fragment';

    createButton.onclick = () => plugin.exportFragment();

    this.element.appendChild(closeButton);
    this.element.appendChild(createButton);
  }

  createFragmentDiv() {
    const fragmentDiv = document.createElement('div');

    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name');
    nameLabel.innerHTML = 'Fragment name:&nbsp;';

    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('style', 'margin-bottom: 15px;');
    nameInput.setAttribute('id', 'name');

    fragmentDiv.appendChild(nameLabel);
    fragmentDiv.appendChild(document.createElement('br'));
    fragmentDiv.appendChild(nameInput);

    fragmentDiv.appendChild(document.createElement('br'));

    const htmlLabel = document.createElement('label');
    htmlLabel.setAttribute('for', 'htmlFile');
    htmlLabel.innerHTML = 'HTML markup:';

    const htmlFile = document.createElement('input');
    htmlFile.setAttribute('id', 'htmlFile');
    htmlFile.setAttribute('type', 'file');

    const cssLabel = document.createElement('label');
    cssLabel.setAttribute('for', 'cssFile');
    cssLabel.innerHTML = 'CSS stylesheet:';

    const cssFile = document.createElement('input');
    cssFile.setAttribute('id', 'cssFile');
    cssFile.setAttribute('type', 'file');

    const jsLabel = document.createElement('label');
    jsLabel.setAttribute('for', 'jsFile');
    jsLabel.innerHTML = 'JavaScript:';

    const jsFile = document.createElement('input');
    jsFile.setAttribute('id', 'jsFile');
    jsFile.setAttribute('type', 'file');

    fragmentDiv.appendChild(htmlLabel);
    fragmentDiv.appendChild(htmlFile);
    fragmentDiv.appendChild(document.createElement('br'));
    fragmentDiv.appendChild(cssLabel);
    fragmentDiv.appendChild(cssFile);
    fragmentDiv.appendChild(document.createElement('br'));
    fragmentDiv.appendChild(jsLabel);
    fragmentDiv.appendChild(jsFile);

    return fragmentDiv;
  }

  serialize() {}

  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
