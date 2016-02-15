var SMM = function(SMM){
	SMM._____________ = true;
	SMM.Canvas = true;
	return SMM;
}(SMM||{})

var SMM = function(SMM){
	SMM.Canvas = function(id,width,height,color){
		this.id = id;
		this.width = width || window.innerWidth;
		this.height = height || window.innerHeight;
		this.color = color;
		var that = this;
		this.canvas  = document.createElement("canvas");
		this.getCanvas = function(id,color){
			this.canvas.setAttribute("id",id);
			this.canvas.style.background = color;
			this.canvas.style.width = that.width+"px";
			this.canvas.style.height = that.height+"px";
			this.canvas.style.margin = "auto"
			document.body.appendChild(this.canvas);
		};

	};

	SMM.Waiter = function(holder, size){
		this.Container_constructor();

		if(holder == null){
			console.log("waiter: pls provide a container for waiter");
			return;
		}

		if(size==null) size = 30;
		
		var that  = this;
		
		

		var shape = new createjs.Shape();
		shape.graphics.f("tomato").dc(0,0,size);

		this.addChild(shape);

		var scaleX= shape.scaleX; 
		var scaleY= shape.scaleY; 
		
		var ticker;
		this.show = function(){
			console.log("show");
			holder.addChild(that);

			createjs.Tween.get(shape,{loop:true}).to({
				scaleX : scaleX*1.5,
				scaleY : scaleX*1.5
			},500, createjs.Ease.quadInOut)
			.to({
				scaleX : scaleX,
				scaleY : scaleX
			},500, createjs.Ease.quadInOut);


		}
		this.hide = function(){
			createjs.Ticker.off("tick");
			createjs.Tween.removeTweens(shape);
			holder.removeChild(that);
			if(holder.stage) holder.getStage().update();

		}
		var myPause = false;
		Object.defineProperty(this,"pause", {
			get:function(){
				return myPause;
			},
			set:function(value){
				myPause = value;
				if(myPause == true){
					createjs.Ticker.off("tick", ticker);
					// createjs.Tween.removeTweens(shape);
				}
				if(myPause == false){
					createjs.Ticker.on("tick", ticker);
					// createjs.Tween.removeTweens(shape);
				}
			}

		})
	}
	createjs.extend(SMM.Waiter, createjs.Container); // for some reason gave error if put below where we use the class
	createjs.promote(SMM.Waiter, "Container");
	SMM.Ticker=function(x,y, fn){/*stage*/ /*fps*/
		if(x == null) return;
		fn = fn || function(){
			x.update();
		}
		y = y || 40
		createjs.Ticker.setFPS(y);
		ticker = createjs.Ticker.on("tick", function(){
			fn();
			x.update();
		});
	}
	SMM.DrawC = function(stage,x,y,r,color,px,py){
		if (stage == null) return;
		x = x || 0;
		y = y || 0;
		// r = r || SMM.rand(0,30);
		r = r || 20;
		color = color || SMM.randColor();
		// px = px || SMM.rand(0, window.innerWidth);
		px = px || 0;
		// py = py || SMM.rand(0, window.innerHeight);
		py = py || 0;
		this.Container_constructor();
		var that = this;
		this.drag =function(){
			zim.drag({
				obj:that,
				 currentTarget: true
				});
		}
		
		var shape = new createjs.Shape();
		shape.graphics.f(color);
		shape.graphics.dc(x,y,r);
		
		this.addChild(shape);
		shape.x = px;
		shape.y = py;
		stage.update(); 
		var posX ;
		this.randPoX=function(x1,x2){
			x1 = x1 || 0;
			x2 = x2 || window.innerWidth;
			posX=that.x= SMM.rand(x1,x2,"round");
			return this;
		} 
		this.randPoY=function(x1,x2){
			x1 = x1 || 0;
			x2 = x2 || window.innerHeight;
			that.y= SMM.rand(x1,x2,"round");
			return this;
		}
		this.shake=function(r,s,fn){ /*range*/ /*speed */ /*callback*/
			var that= this;
			fn = fn || function(){
				return that;
			};
			r = r || 10;
			s = s || 1111;
			createjs.Tween.get(that,{loop:true}).to({
				x:that.x+r
			},s).to({
				x:that.x-r
			},2*s).to({
				x:that.x
			},s).call(fn);
			return this;
		}
		this.rotate = function(reg, s, fn){
			var that=this;
			fn = fn || function(){
				return that;
			};
			s = s || 300;
			reg = reg || 10;
			that.regX = reg;
			that.regY=reg;
			createjs.Tween.get(that,{loop:true}).to({
				rotation: 360
			},s).call(fn);
			return this;
		}
		this.randMove = function (s, tf, range,fn){ /*speed*/ /*callback fn*//*loop*/
			var that=this;
			range = range || 300;
			tf = tf || false;
			s = s || 1000;
			fn = fn || function(){
				return that;
			};
			var ox=that.x, oy=that.y;
			createjs.Tween.get(that,{loop:tf}).to({
				x: that.x + SMM.rand(0,range),
				y: that.y + SMM.rand(0,range)
			},s).to({
				x: that.x + SMM.rand(0,range),
				y: that.y + SMM.rand(0,range)
			},s).to({
				x: that.x + SMM.rand(0,range),
				y: that.y + SMM.rand(0,range)
			},s).to({
				x: that.x + SMM.rand(0,range),
				y: that.y + SMM.rand(0,range)
			},s).to({
				x: that.x + SMM.rand(0,range),
				y: that.y + SMM.rand(0,range)
			},s).to({
				x: that.x + SMM.rand(0,range),
				y: that.y + SMM.rand(0,range)
			},s).to({
				x: that.x + SMM.rand(0,range),
				y: that.y + SMM.rand(0,range)
			},s).to({
				x: that.x + SMM.rand(0,range),
				y: that.y + SMM.rand(0,range)
			},s).to({
				x: ox,
				y: oy
			},s).call(fn);
			return this;
		}
		this.drop=function(a,s,fn){ /*last postion of Y / speed*/
			var that=this;
			a = a || window.innerHeight;
			s = s || 1000;
			fn = fn || function(){
				return that;
			};
			createjs.Tween.get(that).to({
				y:a
			},s).call(fn);
			return this;
		}
		/*percieved bug here */
		this.dragCopy = function(stage){
			var self = this;
			zim.drag(this);
			var newObj;
			var arr=[];
			console.log(this);
			this.addEventListener("mousedown", function(stage){
					newObj = that.clone(true);
					console.log(newObj);
					newObj.x = 0;
					newObj.y =  0;
					that.addChild(newObj);
					arr.push(newObj);
			})
			return this;
		}
		this.reflect = function(stageW, objX){
			zim.drag(this);
			var distance = stageW/2
			console.log(this.x);
			var obj = this.clone(true);
			this.addChild(obj)
			obj.x= (distance-objX)*2;
		}
	}

	createjs.extend(SMM.DrawC, createjs.Container); // for some reason gave error if put below where we use the class
	createjs.promote(SMM.DrawC, "Container");
	// createjs.extend(SMM.Draw, createjs.Shape);
	





	return SMM;
}(SMM||{})