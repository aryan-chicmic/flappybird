import {
  _decorator,
  Component,
  Node,
  Input,
  Sprite,
  SpriteComponent,
  SpriteFrame,
  EventTouch,
  director,
  Prefab,
} from "cc";
const { ccclass, property } = _decorator;
@ccclass("bgMoving")
export class bgMoving extends Component {
  @property(SpriteFrame)
  one: SpriteFrame = null;
  @property(SpriteFrame)
  two: SpriteFrame = null;
  @property(SpriteFrame)
  three: SpriteFrame = null;
  start() {}
  onLoad() {
    director.preloadScene("gameplay");
    this.node.on(Input.EventType.TOUCH_START, this.timer, this);
  }

  timer(Event: any, Data: string) {
    var count = 3;

    var temp = setInterval(() => {
      if (count == 3) {
        this.node.getChildByName("play").getComponent(Sprite).spriteFrame =
          this.three;
        console.log(count);
        count--;
      } else if (count == 2) {
        this.node.getChildByName("play").getComponent(Sprite).spriteFrame =
          this.two;
        console.log(count);
        count--;
      } else if (count == 1) {
        this.node.getChildByName("play").getComponent(Sprite).spriteFrame =
          this.one;
        console.log(count);
        count--;
      } else if (count == 0) {
        this.node.getChildByName("play").setScale(0);
        clearInterval(temp);
        setTimeout(() => {
          director.loadScene("gameplay");
        }, 1000);
      }
    }, 1000);
  }

  update(deltaTime: number) {}
}
