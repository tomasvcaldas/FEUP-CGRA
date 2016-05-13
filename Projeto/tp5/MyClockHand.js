/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClockHand(scene, x, y, angle = 0) {
	CGFobject.call(this,scene);
	this.angle = angle;
	this.x = x;
	this.y = y;
	this.initBuffers();
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor=MyClockHand;

MyClockHand.prototype.initBuffers = function () {
	this.vertices = [
            -this.x/2.0, 0, 0,
            this.x/2.0, 0, 0,
            -this.x/2.0, this.y, 0,
            this.x/2.0, this.y, 0,
	];

	this.indices = [
            0, 1, 2,
            3, 2, 1
    ];

    this.normals = [
            0, 0, 1,
            0, 0, 1, 
            0, 0, 1,
            0, 0, 1
    ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MyClockHand.prototype.setAngle = function (angle) {
	this.angle = angle;
};

