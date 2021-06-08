class Component {
  componentDidMount() {}
  componentDidUpdate() {
    this.render();
    this.bindEvents();
  }
  bindEvents() {}
  render() {}
}

export default Component;
