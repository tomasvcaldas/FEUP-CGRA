/**
 * MyHelices
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyHelices(scene, slices) {
	CGFobject.call(this,scene);
	this.slices = slices;
	this.helice = new MyHelice(this.scene,25);
	this.heliceAng1 = 0;

	this.initBuffers();
};

MyHelices.prototype = Object.create(CGFobject.prototype);
MyHelices.prototype.constructor=MyHelices;

MyHelices.prototype.initBuffers = function () {
	this.vertices = [];
	this.indices = [];
    this.normals = [];
    this.texCoords = [];

 	this.ang = Math.PI*2/this.slices;

 	this.vertices.push(0, 0, 0);
 	this.normals.push(0, 0, 1);
 	this.texCoords.push(0.5, 0.5);

    for(i=0; i< this.slices; i++){
    	this.vertices.push(Math.cos(this.ang*i), Math.sin(this.ang*i), 0);  	
    	this.normals.push(0, 0, 1);
    	this.texCoords.push((Math.cos(-this.ang*i)+1)/2, (Math.sin(-this.ang*i)+1)/2);
    }
    
    for(i=1; i<= this.slices; i++){
    	this.indices.push(i, i%this.slices+1, 0);
    }

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
MyHelices.prototype.display = function(){
	
	this.scene.pushMatrix();
		this.scene.translate(0,0,-0.2);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.05,0.2,1);
		this.helice.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		//this.scene.translate(1.35,2.27,-0.2);
		this.scene.translate(0,0,0.2);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.05,0.2,1);
		this.helice.display();
	this.scene.popMatrix();

};




