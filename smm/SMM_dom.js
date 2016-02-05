var SMM = function(SMM){
	SMM.Dom = true;
	function _smm(arguments){

	}
	// window.SMM = _SMM; 
	SMM.onready = function(fn){
		global.document.addEventListener("load", fn);
	}
	SMM.getId = function(id){
		return document.getElementById(id);
	}

	return SMM;
}(SMM||{})