/**
 * MyInterface
 * @constructor
 */
 
 var degToRad = Math.PI / 180;
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'switchClock');	

	// add a group of controls (and open/expand by defult)
	
	var group=this.gui.addFolder("Options");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	group.add(this.scene, 'light0');
	group.add(this.scene, 'light1');
	group.add(this.scene, 'light2');
	group.add(this.scene, 'light3');
	group.add(this.scene, 'light4');

	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', -5, 5);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (97): //a
			this.scene.drone.rotate(this.scene.speed*60);
			break;
		case(115): //s
			this.scene.drone.move(-this.scene.speed  *0.1*   Math.sin(this.scene.drone.rot_ang * degToRad),0, -this.scene.speed *0.05 *  Math.cos(this.scene.drone.rot_ang * degToRad));
			break;
		case (100): //d
			this.scene.drone.rotate(-this.scene.speed *60);
			break;
		case (119): //w
			this.scene.drone.move(this.scene.speed *0.1 * Math.sin(this.scene.drone.rot_ang * degToRad),0,this.scene.speed *0.05 * Math.cos(this.scene.drone.rot_ang * degToRad));
			break;
		case (105): //i
			this.scene.drone.move(0,0.1, 0);
			break;
		case (106): //j
			this.scene.drone.move(0,-0.1, 0);
			break;
		default:
			break;

		
	};
};
