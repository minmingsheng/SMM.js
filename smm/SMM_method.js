var SMM  = function(SMM){
	/*random number*/
	SMM.___________ = true;
	SMM.Method = true;
	return SMM;

}(SMM || {})

var SMM  = function(SMM){
	/*random number*/
	SMM.rand = function(a,b,type){
		a = a || 0;
		b = b || 1;
		rNum  = Math.random()*(Math.max(a,b)-Math.min(a,b))+Math.min(a,b);
		if(type != "floor" && type != "round" && type != "ceil" && type != null){
			// return rNum;
			return "wrongs";
		}else{
			switch(type){
				case "floor":
					return Math.floor(rNum)
					break;
				case "ceil":
					return Math.ceil(rNum)
					break;
				case "round":
					return Math.round(rNum)
					break;
			}
		}
		return  rNum;
	};/*end of rand()*/

	SMM.randColorArr = function(a,b,c){
		/*set default parameter*/
		// a = a || "salmon";
		// b = b || "skyblue";
		// c = c || "goldenrod";
		var validC =[];
		if(arguments.length<=3){
			a = a || "salmon";
			b = b || "skyblue";
			c = c || "goldenrod";
			validC = [a,b,c];
			// console.log("validColorString: ", validC);
		}else{

			/*for valid color*/
		
			/*string validation*/
			for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i]!= "string") {
						console.log(arguments[i]+ " is not a string");
						continue;
					};
					validC.push(arguments[i]);
			};
			
			// console.log("validColorString: ", validC);

		}
		var r = this.rand(0,validC.length,"floor")
		// console.log(r);
		return validC[r];
	}/*end of randColorArr()*/
	
	SMM.randColor = function(a){
		a = a || 1;
		var c = "rgba("+this.rand(0,225,"round")+","+this.rand(0,225,"round")+","+this.rand(0,225,"round")+","+a+")"
		return c;
	}

	SMM.log=function(a){
		console.log(a);
	}
	SMM.____________ = true;
	// for(prop in SMM){
	// 	console.info("interface: ", prop);
	// }

	return SMM;
}(SMM || {})


