import { _decorator, Component, Node, Input, UITransform } from "cc";
const { ccclass, property } = _decorator;

@ccclass("bird")
export class bird extends Component {
  @property(Node)
  myImage: Node = null;
  start() {}
  onLoad() {
    this.node.on(
      Input.EventType.TOUCH_START,
      () => {
        this.schedule(this.moveup, 0.1);
      },
      this
    );
    this.node.on(Input.EventType.TOUCH_END, () => {
      this.unschedule(this.moveup);
    });
  }

  moveup() {
    var c = this.myImage.parent.getComponent(UITransform).height;
    var hofimage = this.myImage.getComponent(UITransform).height;
    var diff = c / 2 - hofimage / 2;
    console.log(diff);
    var pos = this.myImage.getPosition().y;
    console.log(pos);

    if (diff >= pos) {
      this.myImage.setPosition(
        this.myImage.position.x,
        this.myImage.position.y + 40
      );
    }
  }

  update(deltaTime: number) {
    var hofimage = this.myImage.getComponent(UITransform).height;
    var c = this.myImage.parent.getComponent(UITransform).height;
    var diff = -1 * (c / 2 - hofimage / 2);
    console.log(diff);
    var pos = this.myImage.getPosition().y;
    console.log(pos);

    if (diff < pos) {
      // if (Math.abs(this.myImage.position.y) + hofimage / 2 < c / 2) {
      this.myImage.setPosition(
        this.myImage.position.x,
        this.myImage.position.y - 1
      );
    }
  }
}
