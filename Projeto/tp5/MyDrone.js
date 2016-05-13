/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

var degToRad = Math.PI / 180;
function MyDrone(scene) {
	CGFobject.call(this,scene);
	this.x=7.25;
	this.y=4;
	this.z=7;
	this.initBuffers();
	this.helice = new MyHelice(this.scene,25);
	this.helices = new MyHelices(this.scene,25);
	this.heliceSlow = 0;
	this.heliceNormal = 0;
	this.heliceFast = 0;

	this.x_rot = 0;
	this.y_rot = 1;
	this.z_rot = 0;
	this.rot_ang = 30;
	
};

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor=MyDrone;

MyDrone.prototype.initBuffers = function () {
	this.vertices = [
            0.5, 0.3, 0,
            -0.5, 0.3, 0,
            0, 0.3, 2
	];

	this.indices = [
            0,1,2
    ];

    this.normals = [
            0, 1, 0,
            0, 1, 0, 
            0, 1, 0
    ];
	
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MyDrone.prototype.move = function(x,y,z){
	this.scene.translate(x,y,z);
	this.x+=x;
	this.y+=y;
	this.z+=z;
}

MyDrone.prototype.rotate = function(speed){
	this.scene.rotate(speed * degToRad , this.x_rot,this.y_rot,this.z_rot);
	this.rot_ang += speed *10* degToRad;
}

MyDrone.prototype.update = function(currTime){
	this.heliceSlow +=0.6;
	this.heliceNormal +=3;
	this.heliceFast += 30;
}
MyDrone.prototype.display = function()
{	
	//semisphere
	this.scene.pushMatrix();
		this.scene.translate(0,2,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.6,0.6,0.6);
		this.scene.semisphere.display();
	this.scene.popMatrix();

	//semisphere base
	this.scene.pushMatrix();
		this.scene.translate(0,2,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.6,0.6,0.6);
		this.scene.dronepolygon.display();
	this.scene.popMatrix();

	//Drone arm 1
	this.scene.pushMatrix();
		this.scene.translate(0,2.1,-1.25);
		this.scene.scale(0.1,0.1,2.5);
		this.scene.dronecylinder.display();
	this.scene.popMatrix();
	
	//Drone arm 2
	this.scene.pushMatrix();
		this.scene.translate(1.25,2.1,0);
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.scale(0.1,0.1,2.5);
		this.scene.dronecylinder.display();
	this.scene.popMatrix();

	//Helice base 1
	this.scene.pushMatrix();
		this.scene.translate(1.35,2,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.1,0.1,0.2);
		this.scene.dronecylinder.display();
	this.scene.popMatrix();

	//Helice base 2
	this.scene.pushMatrix();
		this.scene.translate(-1.35,2,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.1,0.1,0.2);	
		this.scene.dronecylinder.display();
	this.scene.popMatrix();

	//Helice base 3
	this.scene.pushMatrix();
		this.scene.translate(0,2,1.35);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.1,0.1,0.2);	
		this.scene.dronecylinder.display();
	this.scene.popMatrix();

	//Helice base 4
	this.scene.pushMatrix();
		this.scene.translate(0,2,-1.35);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.1,0.1,0.2);	
		this.scene.dronecylinder.display();
	this.scene.popMatrix();
	
	//Helice base 1 top polygon
	this.scene.pushMatrix();
		this.scene.translate(1.35,2.2,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.1,0.1,0.2);	
		this.scene.dronepolygon.display();
	this.scene.popMatrix();
	//Helice base 1 bot polygon
	this.scene.pushMatrix();
		this.scene.translate(1.35,2,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.1,0.1,0.2);	
		this.scene.dronepolygon.display();
	this.scene.popMatrix();

	//Helice base 2 top polygon
	this.scene.pushMatrix();
		this.scene.translate(-1.35,2.2,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.1,0.1,0.2);	
		this.scene.dronepolygon.display();
	this.scene.popMatrix();
	//Helice  base 2 bot polygon
	this.scene.pushMatrix();
		this.scene.translate(-1.35,2,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.1,0.1,0.2);	
		this.scene.dronepolygon.display();
	this.scene.popMatrix();

	//Helice base 3 top polygon
	this.scene.pushMatrix();
		this.scene.translate(0,2.2,1.35);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.1,0.1,0.2);	
		this.scene.dronepolygon.display();
	this.scene.popMatrix();
	//Helice base 3 bot polygon
	this.scene.pushMatrix();
		this.scene.translate(0,2,1.35);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.1,0.1,0.2);	
		this.scene.dronepolygon.display();
	this.scene.popMatrix();

	//Helice base 4 top polygon
	this.scene.pushMatrix();
		this.scene.translate(0,2.2,-1.35);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.1,0.1,0.2);	
		this.scene.dronepolygon.display();
	this.scene.popMatrix();
	//Helice base 4 bot polygon
	this.scene.pushMatrix();
		this.scene.translate(0,2,-1.35);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.1,0.1,0.2);	
		this.scene.dronepolygon.display();
	this.scene.popMatrix();

	//Drone base 1
	this.scene.pushMatrix();
		this.scene.translate(0.5,1.8,0);
		this.scene.scale(0.05,0.05,1);
		this.scene.dronebase.display();
	this.scene.popMatrix();

	//Drone base 2 
	this.scene.pushMatrix();
		this.scene.translate(-0.5,1.8,0);
		this.scene.scale(0.05,0.05,1);
		this.scene.dronebase.display();
	this.scene.popMatrix();

	//Drone connection 1
	this.scene.pushMatrix();
		this.scene.translate(-0.5,1.9,0.25);
		this.scene.scale(0.05,0.25,0.05);
		this.scene.dronebase.display();
	this.scene.popMatrix();

	//Drone connection 2
	this.scene.pushMatrix();
		this.scene.translate(0.5,1.9,0.25);
		this.scene.scale(0.05,0.25,0.05);
		this.scene.dronebase.display();
	this.scene.popMatrix();

	//Drone connection 3
	this.scene.pushMatrix();
		this.scene.translate(-0.5,1.9,-0.25);
		this.scene.scale(0.05,0.25,0.05);
		this.scene.dronebase.display();
	this.scene.popMatrix();

	//Drone connection 4
	this.scene.pushMatrix();
		this.scene.translate(0.5,1.9,-0.25);
		this.scene.scale(0.05,0.25,0.05);
		this.scene.dronebase.display();
	this.scene.popMatrix();

	//Helice 1 sempishere
	this.scene.pushMatrix();
		this.scene.translate(1.35,2.2,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.07,0.07,0.07);
		this.scene.semisphere.display();
	this.scene.popMatrix();


	//Helice 2 sempishere
	this.scene.pushMatrix();
		this.scene.translate(-1.35,2.2,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.07,0.07,0.07);
		this.scene.semisphere.display();
	this.scene.popMatrix();

	
	//Helice 3 sempishere
	this.scene.pushMatrix();
		this.scene.translate(0,2.2,-1.35);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.07,0.07,0.07);
		this.scene.semisphere.display();
	this.scene.popMatrix();


	//Helice 4 sempishere
	this.scene.pushMatrix();
		this.scene.translate(0,2.2,1.35);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.07,0.07,0.07);
		this.scene.semisphere.display();
	this.scene.popMatrix();

	
	//base 1 helices
	this.scene.pushMatrix();
		this.scene.translate(1.35,2.27,0);
		this.scene.rotate(this.heliceSlow,0,1,0);
		this.helices.display();
	this.scene.popMatrix();

	//base 2 helices
	this.scene.pushMatrix();
		this.scene.translate(-1.35,2.27,0);
		this.scene.rotate(this.heliceSlow,0,1,0);
		this.scene.rotate(Math.PI,0,1,0);
		this.helices.display();
	this.scene.popMatrix();

	//base 3 helices
	this.scene.pushMatrix();
		this.scene.translate(0,2.27,1.35)
		this.scene.rotate(-this.heliceSlow,0,1,0);
		this.helices.display();
	this.scene.popMatrix();

	//base 4 helices
	this.scene.pushMatrix();
		this.scene.translate(0,2.27,-1.35)
		this.scene.rotate(-this.heliceSlow,0,1,0);
		this.helices.display();
	this.scene.popMatrix();
	
}

