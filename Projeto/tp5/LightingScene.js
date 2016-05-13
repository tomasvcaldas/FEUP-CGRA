var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);
	
	this.enableTextures(true);
	
	this.light0 = true;
	this.light1 = true;
	this.light2 = true;
	this.light3 = true;
	this.light4 = true;
	this.speed = 3;

	// Scene elements
	this.table = new MyTable(this, lidx=5.0, lidy=0.3, lidz=3.0, legx=0.3, legy=3.5, legz=0.3, floorx=8.0, floory=0.1, floorz=6.0);
	this.wall = new Plane(this);
	this.leftWall = new MyQuad(this,-0.6,1.55,-0.6,1.55);
	this.floor = new MyQuad(this, 0, 10, 0, 12);
	this.prism = new MyPrism(this, 8, 20);
	this.cylinder = new MyCylinder(this, 8, 20);
	this.clock = new MyClock(this, 12, 1);
	this.polygon = new MyPolygon(this, 12);
	this.pointer = new MyClockHand(this);
	this.drone = new MyDrone(this);
	this.semisphere = new MySemisphere(this,25,10);
	this.dronecylinder = new MyDroneCylinder(this,25,1);
	this.dronepolygon = new MyPolygon(this,25);
	this.dronebase =  new MyUnitCubeQuad(this);
	this.helice = new MyHelices(this,25);
	
	this.boardA = new Plane(this, BOARD_A_DIVISIONS);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS);

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(0.3,0.3,0.3,1);
	this.floorAppearance.setDiffuse(0.40,0.25,0.15,1);
	this.floorAppearance.setSpecular(0.2,0.2,0.2,1);	
	this.floorAppearance.setShininess(100);

	this.wallLeftMaterial = new CGFappearance(this);
	this.wallLeftMaterial.setAmbient(0.3,0.3,0.3,1);
	this.wallLeftMaterial.setDiffuse(0.45,0.8,0.8,1);
	this.wallLeftMaterial.setSpecular(1,1,1,1);	
	this.wallLeftMaterial.setShininess(100);

	this.wallPlaneMaterial = new CGFappearance(this);
	this.wallPlaneMaterial.setAmbient(0.4,0.6,0.8,1);
	this.wallPlaneMaterial.setDiffuse(0.75,1,0.8,1);
	this.wallPlaneMaterial.setSpecular(0.75,1,0.8,1);	
	this.wallPlaneMaterial.setShininess(120);	
	
	this.floorAppearance.loadTexture("../resources/images/floor.png");	
	this.floorAppearance.setTextureWrap("REPEAT", "REPEAT");

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setAmbient(0.3,0.3,0.3,1);
	this.windowAppearance.setDiffuse(0.5,0.5,0.5,1);
	this.windowAppearance.setSpecular(0.8,0.8,0.8,1);	
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
	
	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.loadTexture("../resources/images/slides.png");
	this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
	this.slidesAppearance.setAmbient(0.6,0.6,0.6,1);
	this.slidesAppearance.setDiffuse(0.6,0.6,0.6,1);
	this.slidesAppearance.setSpecular(0.25,0.25,0.25,1);	
	this.slidesAppearance.setShininess(120);	
	
	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.loadTexture("../resources/images/board.png");
	this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
	this.boardAppearance.setAmbient(0.25,0.25,0.25,1);
	this.boardAppearance.setDiffuse(0.25,0.25,0.25,1);
	this.boardAppearance.setSpecular(0.25,0.5,0.25,1);	
	this.boardAppearance.setShininess(120);	
	
	this.setUpdatePeriod(100);
	

};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0, 0, 0, 1.0);
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setVisible(true);

	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	this.lights[3].setVisible(true);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1, 1, 0, 1);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1,1,1,1);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1, 1, 0, 1);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(0);
	this.lights[2].setQuadraticAttenuation(0.2);
	this.lights[3].enable();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}

LightingScene.prototype.update = function(currTime) {
	this.clock.update(currTime);
	this.drone.update(currTime);
}

LightingScene.prototype.switchClock = function(){
	if(this.clock.clockMoving == 0) this.clock.clockMoving = 1;
	else this.clock.clockMoving = 0;

}

LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	
	if(this.light0 == true) this.lights[0].enable();
	else this.lights[0].disable();
	if(this.light1 == true) this.lights[1].enable();
	else this.lights[1].disable();
	if(this.light2 == true) this.lights[2].enable();
	else this.lights[2].disable();
	if(this.light3 == true) this.lights[3].enable();
	else this.lights[3].disable();
	if(this.light4 == true) this.lights[4].enable();
	else this.lights[4].disable();

	this.updateLights();
	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section


	
	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.windowAppearance.apply();
		this.leftWall.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.wallPlaneMaterial.apply();
		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
	
		this.table.display();
	this.popMatrix();

	//Drone
	this.pushMatrix();
		this.translate(this.drone.x, this.drone.y, this.drone.z);
		this.rotate(this.drone.rot_ang * degToRad, this.drone.x_rot,this.drone.y_rot,this.drone.z_rot);
		this.drone.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();

	// Prism
	this.pushMatrix();
		this.rotate(-Math.PI/2, 1, 0, 0);
		this.translate(14, -14, 0);
		this.scale(0.7, 0.7, 8);
		this.prism.display();
	this.popMatrix();
	
	// Cylinder
	this.pushMatrix();
		this.rotate(-Math.PI/2, 1, 0, 0);
		this.translate(3, -14, 0);
		this.scale(0.7, 0.7, 8);
		this.cylinder.display();
	this.popMatrix();

	
	// Clock
	this.pushMatrix();
		this.translate(7.25, 7.25, 0);
		this.scale(0.5, 0.5, 0.1);
		this.clock.display();
	this.popMatrix();

	

	

	// ---- END Primitive drawing section
};
