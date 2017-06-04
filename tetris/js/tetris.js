window.$=HTMLElement.prototype.$=function(selector){
return (this==window?document:this).querySelectorAll(selector);
}
var tetris={
	RN:20, //总行数
	CN:10, //总列数
	CSIZE:26, //每个格，宽高都是26px

	OFFSET_X:15, //每个单元格左侧都要加15px
	OFFSET_Y:15, //每个单元格上方都要加15px

	pg:null, //保存游戏主界面对象

	currShape:null, //专门保存正在移动的图形对象
	nextShape:null, //专门保存下一个图形对象

	interval:1000, //每1秒重绘一次
	timer:null, 

	wall:[], //保存所有停止下落的下方的方块

	state:1, //保存游戏当前的状态
	STATE_RUNNING: 1, //游戏正在运行
	STATE_GAMEOVER: 0, //游戏结束
	STATE_PAUSE: 2, //游戏暂停
	IMG_GAMEOVER:"img/game-over.png",
	IMG_PAUSE:"img/pause.png",

	SCORES:[0,10,50,80,200], //分数的5档
	score:0, //当前的总分
	lines:0, //当前总行数

	//根据当前游戏状态，为游戏添加不同图片
	paintState:function(){
		var img=new Image();
		switch(this.state){//判断当前游戏的状态
			//为GAMEOVER
			case this.STATE_GAMEOVER:
			//    img.src设置为GAMEOVER
				img.src=this.IMG_GAMEOVER;
				break;
			//为PAUSE
			case this.STATE_PAUSE:
			//    img.src设置为PAUSE
				img.src=this.IMG_PAUSE;
		}
		//将img追加到pg中
		this.pg.appendChild(img);
	},

	init:function(){
		this.pg=$(".playground")[0];
		//创建一个O图形的对象，存在currShape属性中
		this.currShape=this.randomShape();
        this.nextShape=this.randomShape();
		//将wall数组初始化为RN个空数组对象
		for(var i=0;i<this.RN;this.wall[i++]=[]);

		this.score=0;
		this.lines=0;
		this.state=1;
		//调用当前对象的paintShape方法
		this.paint();
		this.timer=setInterval(function(){
			//调用tetris的currShape的drop方法
			tetris.drop();
			//再调用tetris的paintShape方法
			tetris.paint();
		},this.interval);

		document.onkeydown=function(){
			var e=window.event||arguments[0];
			switch(e.keyCode){
				case 37: tetris.moveL();break;//左
				case 39: tetris.moveR();break;//右
				case 40: tetris.drop();break;//下

				case 38: tetris.rotateR();break;
				case 90: tetris.rotateL();break;

				case 80: tetris.pause();break;//暂停
				case 81: tetris.gameOver();break;//结束游戏
				case 67: tetris.myContinue();break;//暂停后，继续游戏
				case 83: //游戏结束后，重新开始
					if(this.state==this.STATE_GAMEOVER){
						tetris.init();
					}
			}
		}
	},
	gameOver:function(){
		this.state=this.STATE_GAMEOVER;
		clearInterval(this.timer);
		this.timer=null;
		this.paint();
	},
	pause:function(){
		if(this.state==this.STATE_RUNNING){
			this.state=this.STATE_PAUSE;
		}
	},
	myContinue:function(){
		if(this.state==this.STATE_PAUSE){
			this.state=this.STATE_RUNNING;
		}
	},
	rotateR:function(){ //按上，向右旋转
		if(this.state==this.STATE_RUNNING){
		this.currShape.rotateR();
		if(this.outOfBounds()||this.hit()){
			this.currShape.rotateL();
		}
		}
	},
	rotateL:function(){ //按z键，向左旋转
		if(this.state==this.STATE_RUNNING){
		this.currShape.rotateL();
		if(this.outOfBounds()||this.hit()){
			this.currShape.rotateR();
		}
		}
	},
	moveR:function(){
		if(this.state==this.STATE_RUNNING){
		this.currShape.moveR();
		if(this.outOfBounds()||this.hit()){//验证不通过
			this.currShape.moveL();
		}
		}
	},
	moveL:function(){
		if(this.state==this.STATE_RUNNING){
		this.currShape.moveL();
		if(this.outOfBounds()||this.hit()){//验证不通过
			this.currShape.moveR();
		}
		}
	},
	outOfBounds:function(){//检查当前图形是否越界
		//当前shape中任意一个单元格的col<0或>=CN
		var cells=this.currShape.cells;
		for(var i=0;i<cells.length;i++){
			if(cells[i].col<0||cells[i].col>=this.CN){
				return true;
			}
		}
		return false;
	},
	hit:function(){//检查当前图形是否碰撞
	//当前shape中任意一个单元格在wall中相同位置有格
		var cells=this.currShape.cells;
		for(var i=0;i<cells.length;i++){
			if(this.wall[cells[i].row][cells[i].col]){
				return true;
			}
		}
		return false;
	},
	paint:function(){//重绘所有格子，分数等的方法
		//每次都要删除所有img格子，再重绘
		this.pg.innerHTML=this.pg.innerHTML.replace(
			/<img(.*?)>/g,"");
		this.paintShape();
		this.paintWall();
		this.paintNext();
		this.paintScore();
		this.paintState();
	},
	paintScore:function(){//找到2个span
		//第一个span中放this.score
		$("span")[0].innerHTML=this.score;
		$("span")[1].innerHTML=this.lines;
		//第二个span中放this.lines
	},
	drop:function(){
		if(this.state==this.STATE_RUNNING){
		//判断能否下落
		if(this.canDrop()){
			this.currShape.drop();
		}else{//否则
		//如果不能下落，就将图形中每个cell,放入wall数组中
			this.landIntoWall();
			
			//消行，返回本次消除的行数
			var ln=this.deleteLines();
			//记分
			this.score+=this.SCORES[ln];
			this.lines+=ln;

			//如果游戏没有结束
			if(!this.isGameOver()){
				//将等待的nextShape,换到currShape
				this.currShape=this.nextShape;
				//为nextShape重新生成新图形
				this.nextShape=this.randomShape();
			}else{//否则，游戏已经结束
				clearInterval(this.timer);
				this.timer=null;
				this.state=this.STATE_GAMEOVER;
				this.paint();//手动绘制一次
			}
		}
		}
	},
	deleteLines:function(){//检查wall中每一行是否消除
//遍历wall中每一行,定义lines变量存本次共删除的行数
		for(var row=0,lines=0;row<this.RN;row++){
		//    如果isFull(row)的
			if(this.isFull(row)){
				this.deleteL(row);
				lines++;
			}
		}
		return lines;
	},
	isFull:function(row){//判断指定行是否已满
		//取出wall中第row行，存在line变量中
		var line=this.wall[row];
		//遍历line中每个cell
		for(var c=0;c<this.CN;c++){
		//    只要发现当前cell无效!
			if(!line[c]){
				return false;
			}
		}//(遍历结束)
		return true;
	},
	//删除指定行，并下移之上所有cell
	deleteL:function(row){
		this.wall.splice(row,1);//删除指定行
		this.wall.unshift([]);//顶部压入新空行
		//从row行开始，向上遍历每一行
		for(var r=row;r>0;r--){
		//    从0开始遍历当前行的每个格
			for(var c=0;c<this.CN;c++){
		//         如果当前格有效
				if(this.wall[r][c]){
		//             将当前格的row++
					this.wall[r][c].row++;
				}
			}
		}
	},
	isGameOver:function(){//判断当前游戏是否结束
		//获取nextShape中所有cell，存在cells
		var cells=this.nextShape.cells;
		//遍历cells中每个cell
		for(var i=0;i<cells.length;i++){
		//	取出wall中和当前cell相同row，col位置的格
			var cell=
				this.wall[cells[i].row][cells[i].col];
		//  只要碰到有效的，
			if(cell){
				return true;
			}
		}
		return false;
	},
	//游戏界面的右上角绘制下一个Shape
	paintNext:function(){
		//遍历nextShape中cells数组中每个cell
		var cells=this.nextShape.cells;
		for(var i=0;i<cells.length;i++){
		//	先将当前cell的row+1,存在r变量中
			var r=cells[i].row+1;
		//	再将当前cell的col+11,存在c变量中
			var c=cells[i].col+11;
		//   计算当前cell的x坐标: 
			var x=c*this.CSIZE+this.OFFSET_X;
		//   计算当前cell的y坐标
			var y=r*this.CSIZE+this.OFFSET_Y;
			var img=new Image();
			img.src=cells[i].img;
			img.style.left=x+"px";
			img.style.top=y+"px";
			this.pg.appendChild(img);
		}
	},
	paintWall:function(){//打印所有落地的墙中的格
		//遍历二维数组wall中每个格
		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				var cell=this.wall[r][c];
		//   如果当前cell有效
				if(cell){
		//		计算当前cell的x坐标和y坐标: 
				var x=cell.col*this.CSIZE+this.OFFSET_X;
				var y=cell.row*this.CSIZE+this.OFFSET_Y;
		//		创建一个image对象 new Image();
				var img=new Image();
		//		设置img对象的src=当前cell的img属性
				img.src=cell.img;
		//		设置img对象的left为x，top为y
				img.style.left=x+"px";
				img.style.top=y+"px";
		//		将img对象追加到pg中
				this.pg.appendChild(img);
				}
			}
		}
	},
	landIntoWall:function(){
		//遍历当前图形的cells数组中每个cell
		var cells=this.currShape.cells
		for(var i=0;i<cells.length;i++){
		//   每遍历一个cell，
		//   就将cell对象放入wall中相同row,col的位置
		this.wall[cells[i].row][cells[i].col]=cells[i];
		}
	},
	canDrop:function(){//判断是否可继续下落
		//遍历currShape中的cells
		var cells=this.currShape.cells;
		for(var i=0;i<cells.length;i++){
		//   只要发现任意一个cell的row==RN-1
			if(cells[i].row==this.RN-1){
		//		就返回false
				return false;
			}
			//wall中，当前cell的下一行位置，有效
			if(this.wall[cells[i].row+1][cells[i].col]){
				return false;
			}
		}//遍历结束，
		return true;
	},
	randomShape:function(){//随机生成一个图形
		switch(parseInt(Math.random()*3)){
			case 0: return new O();
			case 1: return new I();
			case 2: return new T();
			/*case 3: return new S();
			case 4: return new J();
			case 5: return new Z();
			case 6: return new L();*/
		}
	},
	paintShape:function(){//专门绘制当前图形的方法
		//遍历currShape中cells数组中每个cell
		var cells=this.currShape.cells;
		for(var i=0;i<cells.length;i++){
		//   计算当前cell的x坐标: 
			var x=
				cells[i].col*this.CSIZE+this.OFFSET_X;
		//   计算当前cell的y坐标
			var y=
				cells[i].row*this.CSIZE+this.OFFSET_Y;
		//   创建一个image对象 new Image();
			var img=new Image();
		//   设置img对象的src=cell的img属性
			img.src=cells[i].img;
		//   设置img对象的left为x
			img.style.left=x+"px";
		//   设置img对象的top为y
			img.style.top=y+"px";
		//   将img对象追加到pg中
			this.pg.appendChild(img);
		}
	}
	
}
window.onload=function(){
	tetris.init();
}