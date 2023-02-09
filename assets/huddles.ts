import {
  _decorator,
  Component,
  Node,
  Prefab,
  NodePool,
  instantiate,
  UITransform,
  randomRangeInt,
  Vec3,
  randomRange,
  random,
  director,
  Input,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("huddles")
export class huddles extends Component {
  @property({ type: Prefab })
  huddle: Prefab = null;
  mypool: NodePool;

  @property({ type: Node })
  bgNode: Node = null;

  start() {
    this.schedule(() => {
      this.addHurdle();
    }, 4);
  }

  // intial() {
  //   let i = 1;
  //   while (this.mypool.size() != 0) {
  //     let newNode = this.mypool.get();

  //     if (newNode) {
  //       var pos = newNode.getPosition();
  //       pos.x = pos.x + 100 * i;
  //       pos.y = pos.y + 10 * randomRangeInt(-10, 10);
  //       newNode.setPosition(pos);
  //       this.node.addChild(newNode);
  //     }

  //     i = i + 2;
  //   }
  // }
  // mypool
  // reuse() {
  //   for (let i = 1; i < 6; i++) {
  //     let huddeltemp = instantiate(this.huddle);
  //     huddeltemp.name = "hurdle";

  //     this.mypool.put(huddeltemp);
  //   }
  //   this.intial();
  // }

  onLoad() {
    this.mypool = new NodePool();
    for (let i = 1; i < 6; i++) {
      let huddeltemp = instantiate(this.huddle);
      huddeltemp.name = "hurdle";

      this.mypool.put(huddeltemp);
    }
    director.preloadScene("end");
    this.node.on(Input.EventType.TOUCH_START, this.end, this);
    // console.log(this.mypool.size());
  }
  // callagain(){
  //   this.schedule(this.reuse,)
  // }
  end() {
    director.loadScene("end");
  }
  update(deltaTime: number) {
    let birdRect = this.node
      .getChildByName("bluebird-midflap")
      .getComponent(UITransform)
      .getBoundingBoxToWorld();

    let baseRect = this.node
      .getChildByName("base")
      .getComponent(UITransform)
      .getBoundingBoxToWorld();
    if (birdRect.intersects(baseRect)) {
      console.log("Bird Collided on Grnd!");
    }

    this.bgmove();
    this.node.children.forEach((child) => {
      if (child.name == "hurdle") {
        var pos = child.getPosition();
        // console.log(pos.x);

        pos.x = pos.x - 1;
        let canvasWidth = this.node.getComponent(UITransform).contentSize.width;

        let hurdleWidth = child.getComponent(UITransform).contentSize.width;

        child.setPosition(pos);
        if (pos.x <= -1 * (canvasWidth * 0.5 + hurdleWidth * 0.5)) {
          this.mypool.put(child);
        }
      }
    });
    // let hurdleRect = this.node
    //   .getChildByName("hurdle")
    //   .getComponent(UITransform)
    // .getBoundingBox();
    if (this.node.children[4]) {
      let hurdleUpRect = this.node.children[4]
        .getChildByName("pipe-green-001")
        .getComponent(UITransform)
        .getBoundingBoxToWorld();
      let hurdleDwnRect = this.node.children[4]
        .getChildByName("pipe-green")
        .getComponent(UITransform)
        .getBoundingBoxToWorld();

      if (birdRect.intersects(hurdleUpRect)) {
        console.log("Bird Collided Up !");
      }
      if (birdRect.intersects(hurdleDwnRect)) {
        console.log("Bird Collided Dwn!");
      }
    }
  }
  bgmove() {
    // var pos=this.node.getChildByName("base").getPosition()
    var pos = 320;
    // var temp = pos;
    // console.log(pos);
    var basepos = this.bgNode.getPosition();

    if (-1 * pos < basepos.x) {
      basepos.x -= 5;

      console.log("callng");
    } else {
      basepos.x = pos;
    }
    this.bgNode.setPosition(basepos);
    // if(pos.x*0.5==)
  }

  addHurdle() {
    if (this.mypool.size()) {
      let canvasWidth = this.node.getComponent(UITransform).contentSize.width;
      let newNode = this.mypool.get();
      newNode.setPosition(
        new Vec3(
          canvasWidth * 0.5 +
            newNode.getComponent(UITransform).contentSize.width * 0.5,
          13 * randomRangeInt(-10, 10),
          0
        )
      );
      this.node.addChild(newNode);
    }
  }
}
