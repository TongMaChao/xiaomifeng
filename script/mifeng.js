window.onload = function() {

    var oBtn = document.getElementById('gameBtn');
    oBtn.onclick = function() {
        this.style.display = 'none';
        Game.init('div1');  //游戏初始化
    };
}
var Game = {
    oEnemy : { //敌人的数据
        e1 : {style: 'enemy1', blood: 1, speed: 3, score: 1},
        e2 : {style: 'enemy2', blood: 2, speed: 5, score: 2},
        e3 : {style: 'enemy3', blood: 3, speed: 7, score: 3}
    },
    air : { //飞机数据
        style: 'air1',
        bulletStyle: 'bullet'
    },
    init : function(id) {  //初始化
        this.oParent = document.getElementById(id);
        this.createScore();
        this.createEnemy(0);
        this.createAir();
    },
    createScore : function() {  //创建积分
        var oS = document.createElement('div');
        oS.id = 'score';
        oS.innerHTML = '积分：<span>0</span>';
        this.oParent.appendChild(oS);

        this.osNum = oS.getElementsByTagName('span')[0];
    },
    gk : [ //关卡的数据
        {
            eMap : [
                'e1', 'e1', 'e1', 'e1', 'e2', 'e2', 'e1', 'e1', 'e1', 'e1',
                'e1', 'e1', 'e1', 'e1', 'e2', 'e2', 'e1', 'e1', 'e1', 'e1',
                'e1', 'e1', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e1', 'e1',
                'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1',
                'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1',
                'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1'
            ],
            colNum : 10,
            iSpeedX : 5,
            iSpeedY : 5,
            times: 5000
        },
        {
            eMap : [
                'e2', 'e2', 'e2', 'e3', 'e3', 'e3', 'e3', 'e2', 'e2', 'e2',
                'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2',
                'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2',
                'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1',
                'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1',
                'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1'
            ],
            colNum : 10,
            iSpeedX : 10,
            iSpeedY : 10,
            times: 4000
        },
        {
            eMap : [
                'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3',
                'e2', 'e2', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e2', 'e2',
                'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2', 'e2',
                'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1',
                'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1',
                'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1'
            ],
            colNum : 10,
            iSpeedX : 15,
            iSpeedY : 15,
            times: 3000
        },
        {
            eMap : [
                'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3',
                'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3',
                'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3',
                'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3',
                'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3', 'e3',
                'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1', 'e1'
            ],
            colNum : 10,
            iSpeedX : 20,
            iSpeedY : 20,
            times: 2000
        }

    ],
    createEnemy : function(iNow) {//创建敌人
        this.iNow = iNow;

        if (this.oUl) {
            clearInterval(this.oUl.timer);
            this.oParent.removeChild(this.oUl);
        }
        document.title = '第' + (iNow + 1) + '关';
        var gk = this.gk[iNow];
        var arr = [];
        var oUl = document.createElement('ul');
        oUl.id = 'bee';
        oUl.style.width = gk.colNum * 40 + 'px';
        this.oParent.appendChild( oUl );
        oUl.style.left = (this.oParent.offsetWidth - oUl.offsetWidth) / 2 + 'px';

        this.oUl = oUl; //将蜜蜂列表变为this的属性

        for (let i = 0; i < gk.eMap.length; i++) {
            var oLi = document.createElement('li');
           
            oLi.className = this.oEnemy[ gk.eMap[i] ].style;
            oLi.blood = this.oEnemy[ gk.eMap[i] ].blood;
            oLi.speed = this.oEnemy[ gk.eMap[i] ].speed;
            oLi.score = this.oEnemy[ gk.eMap[i] ].score;

            oUl.appendChild(oLi);
        }
        this.aLi = oUl.getElementsByTagName('li');

        for (let i = 0; i < this.aLi.length; i ++) {
            arr.push( [ this.aLi[i].offsetLeft, this.aLi[i].offsetTop ] );
        }
        for (let i = 0; i < this.aLi.length; i ++) {
            this.aLi[i].style.position = 'absolute';
            this.aLi[i].style.left = arr[i][0] + 'px';
            this.aLi[i].style.top = arr[i][1] + 'px';
        }
        this.runEnemy(gk);
    },
    runEnemy : function(gk) { //移动敌人
        var that = this,
        L = 0,
        R = this.oParent.offsetWidth - this.oUl.offsetWidth;
        // console.log(this);

        this.oUl.timer = setInterval(function() {
             //console.log(this);
            if (that.oUl.offsetLeft < L) {
                gk.iSpeedX *= -1;
                that.oUl.style.top = that.oUl.offsetTop + gk.iSpeedY + 'px';
            } else if (that.oUl.offsetLeft > R) {
                gk.iSpeedX *= -1;
                that.oUl.style.top = that.oUl.offsetTop + gk.iSpeedY + 'px';
            }
            that.oUl.style.left = that.oUl.offsetLeft + gk.iSpeedX + 'px';
        }, 200);

        setInterval(function() {
            that.oneMove();
        }, gk.times)
    },
    oneMove : function() { //单兵作战  蜜蜂跟随飞机
        var that = this;
        var nowLi = this.aLi[Math.floor(Math.random() * this.aLi.length)];
        nowLi.timer = setInterval(function() {
            var a = (that.oA.offsetLeft + that.oA.offsetWidth / 2) -
            (nowLi.offsetLeft + nowLi.parentNode.offsetLeft + nowLi.offsetWidth / 2);
            var b = (that.oA.offsetTop + that.oA.offsetHeight / 2) -
            (nowLi.offsetTop + nowLi.parentNode.offsetTop + nowLi.offsetHeight / 2);

            var c = Math.sqrt(a * a + b * b);

            var iSX = nowLi.speed * a / c;
            var iSY = nowLi.speed * b / c;

            nowLi.style.left = nowLi.offsetLeft + iSX +'px';
            nowLi.style.top = nowLi.offsetTop + iSY +'px';

            if (that.pz(that.oA, nowLi)) {
                alert('Game over');
                window.location.reload();
            }

        }, 30);
    },
    createAir : function () {//飞机创建
        
        var oA = document.createElement('div');
        oA.className = this.air.style;
        this.oParent.appendChild(oA);

        this.oA = oA;

        oA.style.left = (this.oParent.offsetWidth - oA.offsetWidth) / 2 + 'px';
        oA.style.top = (this.oParent.offsetHeight - oA.offsetHeight) + 'px';

        this.bindAir();
    },
    bindAir : function() {//操作飞机
        var timer = null,
            iNum = 0,
            that = this;
        document.onkeydown = function(ev) {
            if (!timer) {
                timer = setInterval(show, 30);
            }
            var ev = ev || window.event;
            if (ev.keyCode == 37) {
                iNum = 1;
            } else if (ev.keyCode == 39) {
                iNum = 2;
            }
        };
        document.onkeyup = function(ev) {
            var ev = ev || window.event;
            clearInterval(timer);
            timer = null;
            iNum = 0;

            if (ev.keyCode == 32) {
                that.createBullet();
            }
        };
        function show() {

            if (iNum == 1 && (that.oA.offsetLeft > 0)) {
                that.oA.style.left = that.oA.offsetLeft - 10 + 'px';  
            } else if (iNum == 2 && (that.oA.offsetLeft < that.oParent.offsetWidth - that.oA.offsetWidth)) {
                that.oA.style.left = that.oA.offsetLeft + 10 + 'px';
            }
        }

    },
    createBullet : function() {//创建子弹
        var oB = document.createElement('div');
        oB.className = this.air.bulletStyle;
        this.oParent.appendChild(oB);
        oB.style.left = this.oA.offsetLeft + this.oA.offsetWidth / 2 + 'px';
        oB.style.top = this.oA.offsetTop - 10 + 'px';
        this.runBullet(oB);
    },
    runBullet : function(oB) { //子弹运行
        var that = this;
        oB.timer = setInterval(function() {
            if (oB.offsetTop < -10) {
                clearInterval(oB.timer);
                that.oParent.removeChild(oB);
            } else {
                oB.style.top = oB.offsetTop - 10 + 'px';
            } 
            for(let i = 0; i < that.aLi.length; i ++) {
                if ( that.pz(oB, that.aLi[i]) ) {
                    if (that.aLi[i].blood == 1) {

                        clearInterval(that.aLi[i].timer);

                        that.osNum.innerHTML = parseInt(that.osNum.innerHTML) + that.aLi[i].score;

                        that.oUl.removeChild(that.aLi[i]);
                        
                    } else {
                        that.aLi[i].blood --;
                    }
                    clearInterval(oB.timer);
                    that.oParent.removeChild(oB);
                }
            }
            if (!that.aLi.length) {//检测是否全部消灭，进入下一关
                if (that.iNow == 3) {
                    alert('通关');
                } else {
                    that.createEnemy(++ that.iNow); 
                }  
            }
        }, 30);
    },
    pz : function(obj1, obj2) { //碰撞检测
        var L1 = obj1.offsetLeft;
        var R1 = obj1.offsetLeft + obj1.offsetWidth;
        var T1 = obj1.offsetTop;
        var B1 = obj1.offsetTop + obj1.offsetHeight;

        var L2 = obj2.offsetLeft + obj2.parentNode.offsetLeft;
        var R2 = obj2.offsetLeft + obj2.offsetWidth + obj2.parentNode.offsetLeft;
        var T2 = obj2.offsetTop + obj2.parentNode.offsetTop;
        var B2 = obj2.offsetTop + obj2.offsetHeight + obj2.parentNode.offsetTop;

        if (R1 < L2 || L1 > R2 || B1 < T2 || T1 > B2) {
            return false;
        } else {
            return true;
        }
    }
};