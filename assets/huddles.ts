import { _decorator, Component, Node, Prefab, NodePool, instantiate } from "cc";
const { ccclass, property } = _decorator;

@ccclass("huddles")
export class huddles extends Component {
  @property({ type: Prefab })
  huddle: Prefab = null;
  mypool: NodePool;
  start() {}
  // mypool
  onLoad() {
    this.mypool = new NodePool("MyTemplateHandler");
    for (let i = 0; i < 5; i++) {
      let huddeltemp = instantiate(this.huddle);
      this.node.addChild(huddeltemp);
    }
  }

  update(deltaTime: number) {}
}
