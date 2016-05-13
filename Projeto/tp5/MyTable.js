/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);          
	this.cube = new MyUnitCubeQuad(scene);
	this.lid = {
		x: lidx,
		y: lidy,
		z: lidz
	};
	this.leg = {
		x: legx,
		y: legy,
		z: legz
	};
	this.floor = {
		x: floorx,
		y: floory,
		z: floorz
	};

	this.lidMaterial = new CGFappearance(scene);
	this.lidMaterial.setAmbient(0.3,0.3,0.3,1);
	this.lidMaterial.setDiffuse(0.80,0.50,0.30,1);
	this.lidMaterial.setSpecular(0.2,0.2,0.2,1);	
	this.lidMaterial.setShininess(60);
	this.lidMaterial.loadTexture("../resources/images/table.png");
	

	this.legMaterial = new CGFappearance(scene); 
	this.legMaterial.setAmbient(0.3,0.3,0.3,1);
	this.legMaterial.setDiffuse(0.5,0.5,0.5,1);
	this.legMaterial.setSpecular(0.8,0.8,0.8,1);	
	this.legMaterial.setShininess(100);
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function ()
{	
	var legTransx = (this.lid.x - this.leg.x)/2.0;
	var legTransy = (this.leg.y + this.floor.y)/2.0;
	var legTransz = (this.lid.z - this.leg.z)/2.0;

	// tampo da mesa
	this.scene.pushMatrix();
	this.scene.translate(0, this.leg.y + this.lid.y/2.0 + this.floor.y/2.0, 0);
	this.scene.scale(this.lid.x, this.lid.y, this.lid.z);
	this.lidMaterial.apply();
	this.cube.display();
	this.scene.popMatrix();
	
	// pernas da mesa
	this.scene.pushMatrix();
	this.scene.translate(-legTransx, legTransy, -legTransz);
	this.scene.scale(this.leg.x, this.leg.y, this.leg.z);
	this.legMaterial.apply();
	this.cube.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate(legTransx, legTransy, legTransz);
	this.scene.scale(this.leg.x, this.leg.y, this.leg.z);
	this.cube.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate(legTransx, legTransy, -legTransz);
	this.scene.scale(this.leg.x, this.leg.y, this.leg.z);
	this.cube.display();
	this.scene.popMatrix();
	
	this.scene.translate(-legTransx, legTransy, legTransz);
	this.scene.scale(this.leg.x, this.leg.y, this.leg.z);
	this.cube.display();
};
