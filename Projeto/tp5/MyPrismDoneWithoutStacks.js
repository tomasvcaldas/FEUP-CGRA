/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
	this.ang = Math.PI*2/this.slices;
	this.normalAng = -this.ang / 2;
	this.stackSize = 1/this.stacks;
	
	this.vertices = [];
	this.indices = [];
	this.normals = [];
	
		for(j = this.stacks; j >= 0; j--){
			for(i = 0 ; i < this.slices; i++) {
				this.vertices.push(Math.cos(this.ang*i), Math.sin(this.ang*i), j*stackSize);
				this.vertices.push(Math.cos(this.ang*i), Math.sin(this.ang*i), j*stackSize);
				
				this.normals.push(Math.cos(this.normalAng + this.ang * i), Math.sin(this.normalAng + this.ang * i), 0);
				this.normals.push(Math.cos(this.normalAng + this.ang * (i+1)), Math.sin(this.normalAng + this.ang * (i+1)), 0);
			
			}
		}

		
	for(i = 1; i <= this.slices*2; i+=2){
		this.indices.push((i+1)%(this.slices*2), i, i+ this.slices *2, i + this.slices*2, (i+1)%(this.slices*2)+this.slices*2, (i+1)%(this.slices*2));
	}	
		
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
