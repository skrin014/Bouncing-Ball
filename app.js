import {Ball} from './ball.js';

class App{
  constructor(){
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);

    //항상 리사이즈 이벤트를 걸어두고 시작을 한다고 하심. 현재 내가 만들고자 하는 애니메이션의 크기를 아는 것이 굉장히 중요한데, 리사이트 이벤트를 걸어놓고 스크린 사이즈를 가지고 와서 애니메이션을 정의해 준다는 것이다.
    //브라우저가 가변적이기 떄문에 스크린사이즈 가져오는 함수를 먼저 정의해주고 작업하는게 나중을 위해서라도 더 낫다
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    //Ball을 import한 후 작성한다. import한 ball을 가지고 draw함수를 이용해서 그린다.

    //requestAnimationFrame을 걸고, 거기에 애니메이션을 실제로 구동시키는 함수를 만들어준다
    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize(){
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2,2);
  }

  animate(t){
    window.requestAnimationFrame(this.animate.bind(this));

    //이렇게까지만하면 애니메이션이라, 계속 뭔가를 생성하는데, 생성하기 이전의 프레임을 지워줄 필요가 있다.
    //clearRect를 하고나면 공이 튕기는 걳처럼 보이는데, 이전그림과 다음그림을 번갈아 가면서 보여주는 것일뿐인데 튕기는 것처럼 보인다
    //이전에 생성되었던것을 지워줌으로써 애니메이션이 움직이는 것처럼 보여지는 것이다
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    //Ball을 import한 후 작성한다.
    this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
  }
}

window.onload = () =>{
  new App();
}