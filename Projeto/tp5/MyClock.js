/**
 * MyCylinder
 * @constructor
 */

var degToRad = Math.PI/180.0;

 function MyClock(scene, slices, stacks) {
 	CGFobject.call(this,scene);

 	this.scene = scene;
 	this.clockMoving = 0; 
	
	this.cilinder = new MyCylinder(this.scene, slices, stacks);
	this.face = new MyPolygon(this.scene, slices);
	
	this.lastUpdate = -1;
	
	this.hourPointer = new MyClockHand(this.scene, 0.05, 0.4, 90);
	//this.pointerH.initBuffers();
	
	this.minutePointer = new MyClockHand(this.scene, 0.025, 0.55, 180.0);
	//this.pointerM.initBuffers();
	
	this.secondPointer = new MyClockHand(this.scene, 0.0125, 0.8, 270);
	//this.pointerS.initBuffers();

	this.clockAppearance = new CGFappearance(this.scene);
	this.clockAppearance.loadTexture("../resources/images/clock.png");
	this.clockAppearance.setDiffuse(1,1,1,1);
	this.clockAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.clockAppearance.setShininess(100);
	
	this.pointerAppearance = new CGFappearance(this.scene);
	this.pointerAppearance.setDiffuse(0,0,0,1);
	
 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;
 MyClock.prototype.display = function() {

	this.scene.pushMatrix();
		this.scene.translate(0, 0, 1.1);
		this.scene.rotate(-this.hourPointer.angle * degToRad, 0, 0, 1);
		this.pointerAppearance.apply();
		this.hourPointer.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
		this.scene.translate(0, 0, 1.1);
		this.scene.rotate(-this.minutePointer.angle * degToRad, 0, 0, 1);
		this.pointerAppearance.apply();
 		this.minutePointer.display();
 	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, 1.1);
		this.scene.rotate(-this.secondPointer.angle * degToRad, 0, 0, 1);
		this.pointerAppearance.apply();
 		this.secondPointer.display();
 	this.scene.popMatrix();
 
 	this.scene.pushMatrix();
		this.scene.translate(0, 0, 1.0);
		this.clockAppearance.apply();
		this.face.display();	
	this.scene.popMatrix();

	this.scene.pushMatrix();
 		this.cilinder.display();
 	this.scene.popMatrix();

 };
 
 //TODO: horas e minutos andarem + de cada vez
 MyClock.prototype.update = function(currTime){
 	if(this.clockMoving != 0) return;
	 if(this.lastUpdate == -1){
		 this.lastUpdate = currTime;
		 return;
	 }
	 else{
		 actualizationPeriod = currTime - this.lastUpdate;
		 this.lastUpdate = currTime;
	 }
	 this.hourPointer.setAngle(this.hourPointer.angle + 1/(60*60*60)*360*actualizationPeriod*0.001);
	 this.minutePointer.setAngle(this.minutePointer.angle + 1/(60*60)*360*actualizationPeriod*0.001);
	 this.secondPointer.setAngle(this.secondPointer.angle + 1/60*360*actualizationPeriod*0.001);
 }



	



