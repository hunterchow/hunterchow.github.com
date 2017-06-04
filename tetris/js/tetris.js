/**
 * Created by CoderHunter on 2016/12/13.
 */
window.$=HTMLElement.prototype.$=function(selector){
    return (this==window?document:this).querySelectorAll(selector);
}
var tetris={
    RN:20,
    CN:10,
    CSIZE:26,

    pg:null,

    OFFSET_X:15,
    OFFSET_Y:15,

    currShape:null,

    nextShape:null,

    interval:500,

    timer:null,

    wall:[],

    state:1,
    STATE_RUNNING:1,
    STATE_GAMEOVER:0,
    STATE_PAUSE:2,

    SCORES:[0,10,50,80,100],
    score:0,
    lines:0,


    init:function(){
        this.pg=$('.playground')[0];
        this.currShape=this.randomShape();
        this.nextShape=this.randomShape();

        for(var i=0;i<this.RN;this.wall[i++]=[]);
        this.score=0;
        this.lines=0;
        this.state=1;
        this.paint();
        this.timer=setInterval(function(){
            tetris.drop();
            tetris.paint();
        },this.interval);

        document.onkeydown=function(){
            var e=window.event||arguments[0];
            switch (e.keyCode){
                case 37:tetris.moveL();
                    break;
                case 39:tetris.moveR();
                    break;
                case 40:tetris.drop();
                    break;
                case 38:tetris.rotateR();
                    break;
                case 90:tetris.rotateL();
                    break;
                case 80:tetris.pause();
                    break;
                case 81:tetris.gameOver();
                    break;
                case 67:tetris.myContinue();
                    break;
                case 83:tetris.start();
                    break;

            }
        }
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

    rotateR:function(){
        if(this.state==this.STATE_RUNNING) {
            this.currShape.rotateR();
            if (this.outOfBounds() || this.hit()) {
                this.rotateL();
            }
        }
    },
    rotateL:function(){
        if(this.state==this.STATE_RUNNING) {
            this.currShape.rotateL();
            if (this.outOfBounds() || this.hit()) {
                this.rotateR();
            }
        }
    },


    moveR:function(){
        if(this.state==this.STATE_RUNNING) {
            this.currShape.moveR();
            if (this.outOfBounds() || this.hit()) {
                this.currShape.moveL();
            }
        }
    },
    moveL:function(){
        if(this.state==this.STATE_RUNNING) {
            this.currShape.moveL();
            if (this.outOfBounds() || this.hit()) {
                this.currShape.moveR();
            }
        }
    },

    outOfBounds:function(){
        var cells=this.currShape.cells;
        for(var i=0;i<cells.length;i++){
            if(cells[i].col<0||cells[i].col>=this.CN){
                return true;
            }
        }
        return false;
    },

    hit:function(){
        var cells=this.currShape.cells;
        for(var i=0;i<cells.length;i++){
            if(this.wall[cells[i].row][cells[i].col]){
                return true;
            }
        }
        return false;
    },

    paintState:function(){
        var img=new Image();
        switch (this.state){
            case this.STATE_GAMEOVER:img.src='img/game-over.png';
                break;
            case this.STATE_PAUSE:img.src='img/pause.png';
        }
        this.pg.appendChild(img);
    },

    paint:function(){
        this.pg.innerHTML=this.pg.innerHTML.replace(/<img(.*?)>/g,'');
        this.paintShape();
        this.paintNext();
        this.paintWall();
        this.paintScore();
        this.paintState();
    },

    paintNext:function() {
        var cells = this.nextShape.cells;
        for (var i = 0; i < cells.length; i++) {
            var r = cells[i].row + 1;
            var c = cells[i].col + 10;
            var x = c * this.CSIZE + this.OFFSET_X;
            var y = r * this.CSIZE + this.OFFSET_Y;
            var img = new Image();
            img.src = cells[i].img;
            img.style.left = x + 'px';
            img.style.top = y + 'px';
            this.pg.appendChild(img);
        }
    },

    deleteLines:function(){
        for(var i=0,lines=0;i<this.RN;i++){
            if(this.isFull(i)){
                this.deleteL(i);
                lines++;
            }
        }
        return lines;
    },

    isFull:function(row){
        var line=this.wall[row];
        for(var i=0;i<this.CN;i++){
            if(!line[i]){
                return false;
            }
        }
        return true;
    },

    deleteL:function(row){
        this.wall.splice(row,1);
        this.wall.unshift([]);
        for(var r=row;r>0;r--){
            for(var c=0;c<this.CN;c++){
                if(this.wall[r][c]){
                    this.wall[r][c].row++;
                }
            }
        }
    },

    isGameOver:function(){
        var cells=this.nextShape.cells;
        for(var i=0;i<cells.length;i++){
            if(this.wall[cells[i].row][cells[i].col]){
                return true;
            }
        }
        return false;
    },

    paintScore:function(){
        $('span')[0].innerHTML=this.score;
        $('span')[1].innerHTML=this.lines;
    },

    drop:function(){
        if(this.state==this.STATE_RUNNING) {
            if (this.canDrop()) {
                this.currShape.drop();
            } else {
                this.landIntoWall();
                var ln = this.deleteLines();
                this.score += this.SCORES[ln];
                this.lines += ln;

                if (!this.isGameOver()) {
                    this.currShape = this.nextShape;
                    this.nextShape = this.randomShape();
                } else {
                    clearInterval(this.timer);
                    this.timer = null;
                    this.state = this.STATE_GAMEOVER;
                    this.paint();
                }
            }
        }
    },

    paintWall:function(){
        for(r=0;r<this.RN;r++) {
            for (var c = 0; c < this.CN; c++) {
                if (this.wall[r][c]) {
                    var x = this.wall[r][c].col * this.CSIZE + this.OFFSET_X;
                    var y = this.wall[r][c].row * this.CSIZE + this.OFFSET_Y;
                    var img = new Image();
                    img.src = this.wall[r][c].img;
                    img.style.left = x + 'px';
                    img.style.top = y + 'px';
                    this.pg.appendChild(img);
                }
            }
        }
    },

    landIntoWall:function(){
        var cells=this.currShape.cells;
        for(var i=0;i<cells.length;i++){
            this.wall[cells[i].row][cells[i].col]=cells[i];
        }
    },

    canDrop:function(){
        var cells=this.currShape.cells;
          for(var i=0;i<cells.length;i++){
            if(cells[i].row==this.RN-1){
                return false;
            }else if(this.wall[cells[i].row+1][cells[i].col]){
                return false;
            }
        }
        return true;
    },

    randomShape:function(){
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

    paintShape:function(){
        var cells=this.currShape.cells;
        for(var i=0;i<cells.length;i++){
            var x=cells[i].col*this.CSIZE+this.OFFSET_X;
            var y=cells[i].row*this.CSIZE+this.OFFSET_Y;
            var img=new Image();
            img.src=cells[i].img;
            img.style.left=x+'px';
            img.style.top=y+'px';
            this.pg.appendChild(img);

        }
    },


}
window.onload=function(){
    tetris.init();
}