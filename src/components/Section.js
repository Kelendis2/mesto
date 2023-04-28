export default class Section {
  constructor({items,renderer}){
    this.items = items;
    this._renderer = renderer;
    this._container = document.querySelector('.element');
  }
  addItem (element){
    this._container.append(element);
  }
  addItemPrepend (element){
    this._container.prepend(element);
  }

  rendersItem(items){
    items.forEach(item => {
      this._renderer(item);
    });
  }
}
