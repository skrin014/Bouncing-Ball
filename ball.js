export class Ball{
    //stage사이즈를 가져오고 반지름, 속도를 가져온다
    constructor(stageWidth, stageHeight, radius, speed){
      this.radius = radius;
      //vx와 vy는 x,y좌표값을 움직이는 속도라고 정해준다
      this.vx = speed;
      this.vy = speed;
  
      //스테이지에 랜덤으로 위치할 수 있게 함수를 정의 해주었다
      const diameter = this.radius * 2;
      this.x = diameter + (Math.random() * (stageWidth - diameter) );
      this.y = diameter + (Math.random() * (stageHeight - diameter) );
    }
  
    //그리고 draw함수를 하나 만들고 context를 가져온다. 그러면 캔버스 context에 그림을 그릴 수 있는 함수가 완성된다
    //+)블럭을 만든 후에 공이 블럭에 튕기도록 만들어야하기 때문에 block을 매개변수로 받아준다
    draw(ctx, stageWidth, stageHeight, block){
      //x,y값에 vx,vy값을 더해줘서 공이 움직이도록 만들어졌다
      this.x += this.vx;
      this.y += this.vy;
  
      this.bounceWindow(stageWidth, stageHeight);
  
      //ball의 위치를 파악해서 반사값을 정의해준다
      // console.log(block)
      this.bounceBlock(block);
  
      //공에 색을 정하고 그림 그리기 시작
      ctx.fillStyle = '#6495ED';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fill();
    }
  
    //스테이지상에 닿았는지를 판단하는 함수. 
    bounceWindow(stageWidth, stageHeight){
      const minX = this.radius;
      const maxX = stageWidth - this.radius;
      const minY = this.radius;
      const maxY = stageHeight - this.radius;
  
      //닿았다면 반대로 튕기는 기능. 공이 어디에 있는지 판단을 하고vx, vy에 -1을 곱해줘서 반대로 움직이도록 한다
      if(this.x <= minX || this.x >= maxX){
        this.vx *= -1;
        this.x += this.vx;
      }else if(this.y <= minY || this.y >= maxY){
        this.vy *= -1;
        this.y += this.vy;
      }
    }
  
    //블럭에 튕기게 하기 위해 만들어준 함수. 윈도우가 아니라 가운데에 있는 block에 닿았는지를 판단해야한다
    bounceBlock(block){
      const minX = block.x = this.radius;
      const maxX = block.maxX + this.radius;
      const minY = block.y - this.radius;
      const maxY = block.maxY - this.radius;
  
      //vx와 vy에 -1을 곱해주는 방식으로 공이 튕기는 걸 만든다
      //양옆에 충돌하는지 위아래 충돌하는지 판단하기 위해서는 ball의 좌표와 block의 좌표를 비교해서 어느값이 가장 근접한지를 찾으면 위치를 알 수 있다
      //값이 정의되면 이제 vx나 vy에 -1을 곱해준다
      if(this.x > minX && this.x < maxX && this.y > minY && this.y < maxY){
        const x1 = Math.abs(minX - this.x);
        const x2 = Math.abs(this.x - maxX);
        const y1 = Math.abs(minY - this.y);
        const y2 = Math.abs(this.y - maxY);
        const min1 = Math.min(x1, x2);
        const min2 = Math.min(y1, y2);
        const min = Math.min(min1, min2);
  
        if(min == min1){
          this.vx *= -1;
          this.x += this.vx;
        }else if(min == min2){
          this.vy *= -1;
          this.y += this.vy; 
        }
  
  
      }
    }
  }