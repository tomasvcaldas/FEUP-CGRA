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
	this.ang = Math.PI*2/this.slices;
	this.normalAng = -this.ang / 2;
	this.stackSize = 1/this.stacks;
	
	this.vertices = [];
	this.indices = [];
	this.normals = [];
	
		for(i = 0 ; i < this.slices; i++) {
			//NORMAL FOR THIS SLICE : (Math.cos(this.normalAng + this.ang * i), Math.sin(this.normalAng + this.ang * i), 0);
			//x1 = Math.cos(this.ang*i), x2 = Math.cos(this.ang*(i+1)), y1 =..., y2=... only z changes.
			var x1 = Math.cos(this.ang*i);
			var x2 = Math.cos(this.ang*(i+1)); 
			var y1 = Math.sin(this.ang*i);
			var y2 = Math.sin(this.ang*(i+1));
			var normalX = Math.cos(this.normalAng + this.ang * i);
			var normalY = Math.sin(this.normalAng + this.ang * i);
			for(j = this.stacks, k = 0; j >= 0; j--, k++){
				this.vertices.push(x1, y1, j*this.stackSize);
				this.vertices.push(x2, y2, j*this.stackSize);
				this.normals.push(normalX, normalY, 0);
				this.normals.push(normalX, normalY, 0);
				/*if(j != this.stacks){
					this.indices.push((i*this.stacks+1)*2+k*2-1, (i*this.stacks+1)*2+ k * 2-2, (i*this.stacks+1)*2 + k * 2);
					this.indices.push((i*this.stacks+1)*2+k*2, (i*this.stacks+1)*2 + k * 2 +1 , (i*this.stacks+1)*2 + k*2 -1);
				}*/
				if(j != 0){
					this.indices.push((i*2*(this.stacks+1))+k*2+1, (i*2*(this.stacks+1))+k*2, (i*2*(this.stacks+1))+k*2+2);
					this.indices.push((i*2*(this.stacks+1))+k*2+2, (i*2*(this.stacks+1))+k*2+3, (i*2*(this.stacks+1))+k*2+1);
				}
			}
		}
		
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
