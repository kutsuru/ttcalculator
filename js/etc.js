JobBOBJ = new Array();
for(i=0;i<=45;i++)
	JobBOBJ[i] = new Array();
JobBOBJ =[
["n"],
[2,0,6,2,10,4,14,0,18,2,22,4,26,5,30,1,33,0,36,4,38,2,40,0,42,2,44,5,46,1,47,0,49,0,50,0,"n"],
[2,1,6,0,10,4,14,2,18,3,22,4,26,5,30,0,33,1,36,1,38,0,40,5,42,4,44,2,46,5,47,0,49,4,50,1,"n"],
[2,5,6,2,10,3,14,4,18,5,22,1,26,0,30,2,33,3,36,4,38,5,40,1,42,0,44,2,46,3,47,4,49,0,50,5,"n"],
[2,4,6,0,10,3,14,4,18,4,22,5,26,1,30,4,33,1,36,4,38,0,40,0,42,4,44,5,46,2,47,3,49,1,50,4,"n"],
[2,3,6,4,10,4,14,3,18,1,22,3,26,1,30,5,33,3,36,4,38,3,40,1,42,5,44,3,46,3,47,1,49,5,50,3,"n"],
[2,2,6,4,10,0,14,4,18,2,22,0,26,3,30,2,33,1,36,5,38,4,40,0,42,4,44,0,46,5,47,2,49,0,50,4,"n"],
[1,2,3,2,4,0,5,5,8,2,10,0,11,4,12,2,13,1,15,0,17,2,18,2,19,4,20,5,21,0,23,2,27,0,28,5,29,2,31,4,33,0,36,2,37,5,38,1,40,4,43,2,46,0,47,0,48,4,49,4,"n"],
[1,1,2,1,3,1,4,3,6,2,8,2,9,4,11,0,14,3,15,1,16,1,17,1,18,1,19,1,20,1,21,1,24,4,25,0,27,0,30,4,31,4,32,0,38,3,40,4,41,4,42,3,45,0,46,4,48,0,50,4,"n"],
[1,5,3,5,4,0,6,1,7,2,8,3,9,3,10,5,11,0,14,2,16,4,17,0,20,4,21,5,22,3,25,4,27,0,29,1,31,5,32,4,34,2,35,0,36,2,37,1,39,5,42,3,43,3,45,2,48,1,50,5,"n"],
[1,4,3,3,4,4,5,0,7,5,8,4,10,0,11,0,12,1,14,4,15,5,17,2,19,1,20,1,21,4,23,2,27,4,29,5,31,1,33,4,34,3,38,4,39,1,41,3,42,5,43,4,44,0,46,3,47,1,49,4,"n"],
[1,3,2,4,4,3,5,4,6,1,9,3,10,1,12,0,13,4,15,5,18,3,22,3,24,1,26,4,29,3,31,3,32,4,33,3,34,1,36,5,38,2,39,4,40,3,41,1,43,1,45,3,46,1,47,1,48,3,50,3,"n"],
[1,4,3,0,4,4,5,4,7,2,8,0,9,4,11,5,12,4,13,2,16,0,19,4,20,2,21,3,23,0,26,4,28,4,29,1,31,0,32,2,34,3,36,4,37,2,38,1,39,4,40,4,44,0,46,5,47,4,49,2,"n"],
[1,5,2,5,3,5,4,5,5,5,7,0,9,3,11,0,12,2,14,4,15,2,17,0,20,3,21,3,22,2,23,0,25,0,28,4,30,1,32,0,34,4,35,3,36,1,38,3,40,2,41,2,44,3,46,2,48,0,50,2,"n"],
[1,1,2,2,3,4,5,0,6,2,7,1,9,2,11,4,14,2,15,2,16,1,18,4,20,4,23,1,25,0,26,2,27,0,29,1,30,0,33,4,34,4,36,0,38,3,39,1,42,0,43,3,45,1,47,3,48,3,50,4,"n"],
[1,0,2,0,4,4,6,1,7,2,10,1,12,0,13,0,14,5,16,3,18,1,20,2,21,1,22,4,23,1,25,2,26,0,27,0,30,4,32,5,33,2,35,1,38,3,40,5,41,2,43,4,44,1,46,2,49,0,50,0,"n"],
[1,4,2,1,3,0,5,3,6,5,7,4,9,5,10,1,11,1,13,3,15,4,16,4,17,2,19,4,20,5,21,3,24,1,28,0,30,1,32,4,33,2,35,1,38,4,40,3,41,5,43,2,46,4,47,3,48,1,50,4,"n"],
[1,5,2,1,3,0,5,3,6,4,7,5,9,4,10,1,11,1,13,3,15,5,16,4,17,2,19,5,20,4,21,3,24,1,28,0,30,1,32,5,33,2,35,1,38,5,40,3,41,4,43,2,46,5,47,3,48,1,50,5,"n"],
[1,3,3,1,4,2,6,1,8,3,11,2,13,1,15,3,17,5,18,2,20,4,22,1,24,3,25,4,27,4,30,3,32,4,33,1,35,5,37,3,38,3,39,4,40,5,42,0,44,0,45,3,46,0,47,0,48,0,50,3,"n"],
[1,3,2,4,3,4,6,0,8,4,9,3,11,1,13,4,14,1,15,0,17,3,19,4,20,2,21,4,23,3,24,3,25,4,26,0,28,4,29,3,31,2,32,4,34,0,36,2,38,3,40,1,43,0,45,1,49,1,50,1,"n"],
[1,0,3,1,5,2,7,3,9,4,11,5,13,0,15,1,17,2,19,3,21,4,23,5,25,0,27,1,29,2,31,3,33,4,35,5,37,0,39,1,41,2,43,3,45,4,47,5,49,0,52,1,56,2,60,3,64,4,68,5,"n"],
[1,0,2,1,2,5,4,4,5,2,6,0,7,0,8,0,10,1,11,4,12,2,13,3,14,1,16,4,17,1,19,0,22,2,25,0,27,5,28,4,29,2,31,4,33,0,36,4,37,1,38,5,40,2,41,0,43,2,44,4,46,0,47,0,49,4,52,0,53,1,56,0,57,0,58,2,60,1,62,4,64,0,65,1,67,3,68,2,70,0,"n"],
[1,1,2,0,3,5,4,1,6,1,7,0,8,5,9,2,10,4,12,0,15,1,16,5,18,5,20,1,21,0,23,4,24,1,25,1,26,5,29,0,31,1,32,1,33,1,34,5,37,4,38,0,39,4,42,1,43,4,46,1,47,2,48,5,50,0,51,1,53,4,54,0,56,1,57,4,61,4,62,1,64,4,65,5,66,0,69,2,70,4,"n"],
[1,3,3,1,4,2,5,0,7,3,8,1,11,3,12,0,13,4,16,4,19,1,20,3,21,0,22,2,23,3,24,3,26,4,28,4,29,1,30,2,31,0,34,3,37,4,38,0,40,5,42,1,43,4,45,0,46,4,47,3,49,5,50,2,51,2,55,1,56,4,57,3,58,2,60,0,61,3,62,4,65,1,66,3,67,2,68,1,70,3,"n"],
[1,4,2,1,3,4,4,4,5,3,6,1,8,0,10,1,11,1,12,2,14,5,16,4,17,4,20,3,21,1,22,4,24,0,25,5,26,4,28,1,30,4,31,5,32,2,33,1,35,4,36,5,38,1,40,4,42,3,43,1,45,0,46,4,48,1,50,5,51,4,54,3,55,2,57,5,58,1,60,4,61,0,62,5,65,3,69,4,70,5,"n"],
[1,3,2,4,3,2,5,3,8,1,9,4,10,3,12,5,14,3,17,4,18,1,19,3,20,0,22,4,23,4,24,3,26,1,28,3,29,2,31,4,32,3,34,1,37,3,38,3,39,3,40,0,41,5,43,4,46,3,47,2,49,3,50,1,53,2,55,3,56,1,57,5,59,3,60,0,61,4,62,3,65,1,66,2,67,4,69,1,70,3,"n"],
[1,4,2,0,3,0,4,3,6,4,7,1,8,5,9,2,12,4,13,2,15,3,16,5,17,0,19,1,20,1,22,3,23,4,26,0,28,5,29,2,31,1,32,4,33,0,34,3,36,1,38,4,39,5,41,4,44,5,45,5,47,4,48,2,50,3,52,0,55,4,56,4,58,1,60,2,61,3,62,4,64,1,65,2,66,5,67,5,70,4,"n"],
[1,2,2,0,3,1,6,4,7,3,8,1,9,2,10,0,12,4,14,3,15,2,16,1,17,4,18,0,21,2,23,4,24,1,26,0,29,3,30,2,33,0,36,4,37,1,39,5,40,0,42,2,43,3,45,4,48,0,49,2,52,1,53,2,54,3,55,0,57,4,59,5,60,1,61,3,63,2,64,0,65,3,67,5,68,4,69,2,70,1,"n"],
[1,0,2,1,4,5,5,3,6,2,9,1,10,4,11,0,12,1,15,2,16,4,17,4,20,5,21,1,22,0,24,5,26,4,27,1,29,4,31,5,32,0,34,1,37,4,38,4,41,1,42,2,43,0,44,3,45,1,47,0,49,4,50,5,52,4,53,0,56,4,57,3,58,1,59,5,60,4,62,0,63,2,64,1,66,4,67,0,70,1,"n"],
[1,0,2,3,3,2,4,1,6,4,9,0,11,3,12,1,13,5,15,2,16,4,17,0,20,1,21,1,22,4,24,2,27,0,29,1,30,4,33,3,34,5,37,0,38,4,39,2,42,2,44,4,45,1,46,5,47,3,48,0,50,4,52,1,53,4,56,3,58,2,59,0,60,4,62,1,64,3,65,0,66,0,67,4,68,2,69,3,70,1,"n"],
[1,1,2,4,4,1,5,0,7,4,8,3,9,1,10,0,11,5,13,1,15,4,16,2,18,5,19,0,21,3,23,4,24,1,26,5,28,3,30,4,32,1,33,0,36,1,39,4,40,4,41,3,43,4,45,0,47,5,49,1,50,4,53,1,54,0,56,4,57,4,58,1,59,2,61,4,62,0,63,4,65,1,66,4,68,1,69,3,70,0,"n"],
[1,4,2,0,4,1,6,0,8,3,9,4,11,1,12,1,13,1,14,4,15,4,17,2,18,4,20,0,22,4,23,4,25,1,26,3,27,5,28,4,31,1,33,4,35,0,38,1,39,3,41,4,43,4,45,4,47,1,49,4,50,0,52,1,53,3,54,2,57,1,58,4,60,3,61,1,62,1,63,5,65,4,66,0,67,1,69,4,70,1,"n"],
[1,3,2,3,3,1,5,0,7,2,8,4,11,3,12,1,14,3,16,4,18,0,20,4,21,5,22,3,23,1,24,2,26,4,27,0,29,4,30,3,32,1,34,4,36,0,37,4,38,3,39,2,41,3,43,1,45,0,46,4,49,3,50,1,52,4,54,1,55,4,56,0,57,3,60,1,62,4,63,2,64,3,66,5,68,3,69,1,70,3,"n"],
[1,4,2,5,5,1,6,0,7,3,8,5,9,2,10,4,13,3,15,4,18,1,20,5,22,3,23,4,25,5,27,1,30,3,31,0,33,2,34,5,35,4,38,1,41,4,42,4,43,4,45,5,46,3,47,4,49,4,51,5,52,5,53,0,54,1,56,4,57,4,59,3,60,5,61,2,63,4,64,5,66,0,67,1,68,3,69,5,70,4,"n"],
[2,5,3,4,5,1,6,2,8,0,9,3,"n"],
["n"],
["n"],
["n"],
["n"],
["n"],
["n"],
[1,0,2,0,3,0,4,0,5,0,6,0,10,4,11,4,12,4,13,4,14,4,15,4,20,1,21,1,22,1,23,1,24,1,25,1,"n"],
[1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,10,0,11,0,12,0,20,4,21,4,22,4,23,4,24,4,25,4,39,1,40,1,41,1,42,1,43,1,44,1,45,1,46,1,47,1,48,1,49,1,50,1,"n"],
[1,3,2,3,3,3,4,3,5,3,6,3,7,3,8,3,9,3,10,3,11,3,12,3,20,2,21,2,22,2,23,2,24,2,25,2,39,4,40,4,41,4,42,4,43,4,44,4,45,4,46,4,47,4,48,4,49,4,50,4,"n"],
[1,1,2,1,10,4,11,1,20,3,21,1,22,4,29,3,30,5,31,1,32,4,40,5,41,1,42,3,43,4,50,3,51,1,52,5,53,4,59,0,60,2,61,1,62,3,63,4,64,5,"n"],
[1,4,2,5,4,5,6,4,11,4,12,5,17,4,21,5,25,4,31,5,32,0,35,4,41,0,45,4,50,0,51,5,52,3,55,4,59,1,60,2,61,3,62,4,63,5,64,0,"n"],
];


zokusei = new Array();

zokusei[1] = new Array(1,1,1,1,1,1,1,1,0.25,1);
zokusei[2] = new Array(1,1,1,1,1,1,1,1,0,1);
zokusei[3] = new Array(1,1,1,1,1,1,1,1,0,1);
zokusei[4] = new Array(1,1,1,1,1,1,1,1,0,1);

zokusei[11] = new Array(1,0.25,1,0.5,1.75,1,1,1,1,1);
zokusei[12] = new Array(1,0,1,0.25,1.75,0.75,1,1,0.75,0.75);
zokusei[13] = new Array(1,-0.25,1,0,2,0.5,1,1,0.5,0.5);
zokusei[14] = new Array(1,-0.5,1,0,2,0.25,0.75,0.75,0.25,0.25);

zokusei[21] = new Array(1,1,1,1.5,0.5,1.25,1,1,1,1);
zokusei[22] = new Array(1,1,0.5,1.75,0.25,1.25,1,1,0.75,0.75);
zokusei[23] = new Array(1,1,0,2,0,1,1,1,0.5,0.5);
zokusei[24] = new Array(1,1,-0.25,2,0,0.75,0.75,0.75,0.25,0.25);

zokusei[31] = new Array(1,1.5,0.5,0.25,1,1.25,1,1,1,1);
zokusei[32] = new Array(1,1.75,0.25,0,1,1.25,1,1,0.75,0.75);
zokusei[33] = new Array(1,2,0,-0.25,1,1,1,1,0.5,0.5);
zokusei[34] = new Array(1,2,0,-0.5,1,0.75,0.75,0.75,0.25,0.25);

zokusei[41] = new Array(1,0.5,1.5,1,0.25,1.25,1,1,1,1);
zokusei[42] = new Array(1,0.25,1.75,1,0,1.25,1,1,0.75,0.75);
zokusei[43] = new Array(1,0,2,1,-0.25,1,1,1,0.5,0.5);
zokusei[44] = new Array(1,0,2,1,-0.5,0.75,0.75,0.75,0.25,0.25);

zokusei[51] = new Array(1,1,1,1,1,0,1,0.5,1,0.5);
zokusei[52] = new Array(1,1,1,1,1,0,1,0.25,0.75,0.25);
zokusei[53] = new Array(1,1,1,1,1,0,1.25,0,0.5,0);
zokusei[54] = new Array(1,0.75,0.75,0.75,0.75,0,1.25,-0.25,0.25,-0.25);

zokusei[61] = new Array(1,0.75,0.75,0.75,0.75,0.75,0,1.25,0.75,1);
zokusei[62] = new Array(1,0.5,0.5,0.5,0.5,0.5,-0.25,1.5,0.5,1.25);
zokusei[63] = new Array(1,0.25,0.25,0.25,0.25,0.25,-0.5,1.75,0.25,1.5);
zokusei[64] = new Array(1,0,0,0,0,0,-1,2,0,1.75);

zokusei[71] = new Array(1,1,1,1,1,0.5,1.25,0,0.75,0);
zokusei[72] = new Array(1,0.75,0.75,0.75,0.75,0.25,1.5,-0.25,0.5,0);
zokusei[73] = new Array(1,0.5,0.5,0.5,0.5,0,1.75,-0.5,0.25,0);
zokusei[74] = new Array(1,0.25,0.25,0.25,0.25,-0.25,2,-1,0,0);

zokusei[81] = new Array(0.25,1,1,1,1,1,1,1,1.25,1);
zokusei[82] = new Array(0.25,1,1,1,1,0.75,1,1,1.50,1);
zokusei[83] = new Array(0,1,1,1,1,0.5,1,1,1.75,1);
zokusei[84] = new Array(0,1,1,1,1,0.25,1,1,2,1);

zokusei[91] = new Array(1,1,1,1.25,1,-0.25,1.5,-0.25,1,0);
zokusei[92] = new Array(1,1,1,1.5,1,-0.5,1.75,-0.5,1.25,0);
zokusei[93] = new Array(1,1.25,0.75,1.75,1,-0.75,2,-0.75,1.5,0);
zokusei[94] = new Array(1,1.5,0.5,2,1,-1,2,-1,1.75,0);

JobASPD = [
	[150,135,130,0,0,0,120,0,130,135,0,0,0,0,0,0,0,0,0,0,0,0],
	[160,150,145,140,135,130,130,125,135,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[160,150,135,0,0,0,120,0,0,0,120,0,0,0,0,0,0,0,0,0,0,0],
	[160,0,0,0,0,0,0,0,140,140,0,0,0,0,0,0,0,0,0,0,0,0],
	[160,140,0,0,0,0,0,0,0,0,130,0,0,0,0,0,0,0,0,0,0,0],
	[150,140,0,0,0,0,0,0,0,130,0,0,0,0,0,0,0,0,0,0,0,0],
	[160,140,130,0,0,0,130,125,130,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[160,150,150,145,140,140,130,130,135,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[160,150,135,0,0,0,120,0,0,0,0,150,0,0,0,0,0,0,0,0,0,0],
	[160,0,0,0,0,0,0,0,140,140,0,0,140,0.01,0,0,0,0,0,0,0,0],
	[160,140,0,0,0,0,0,0,0,0,140,0,0,0,0,0,0,0,0,0,0,0],
	[150,142.5,0,0,0,0,0,0,0,137.5,0,0,0,0,0,0,0,0,0,0,0,0],
	[160,140,135,0,0,0,135,135,132.5,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[160,150,150,145,140,140,130,130,135,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[160,150,145,0,0,0,0.01,0,0,0,135,0,0,0,0,0,0,0,0,0,0,0],
	[160,0,0,0,0,0,0,0,142.5,142.5,0,0,0,152.5,0,0,0,0,0,0,0,0],
	[160,145,0,0,0,0,0,0,0,0,135,0,0,0,142.5,0,0,0,0,0,0,0],
	[160,145,0,0,0,0,0,0,0,0,135,0,0,0,0,142.5,0,0,0,0,0,0],
	[155,147.5,0,0,0,0,0,0,0,137.5,0,0,145,0,0,0,0,0,0,0,0,0],
	[160,145,142.5,0,0,0,132.5,130,135,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[150,135,130,0,0,0,120,0,130,135,0,0,0,0,0,0,0,0,0,0,0,0],
	[160,150,150,145,140,140,130,130,135,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[160,150,135,0,0,0,120,0,0,0,0,150,0,0,0,0,0,0,0,0,0,0],
	[160,0,0,0,0,0,0,0,140,140,0,0,140,0.01,0,0,0,0,0,0,0,0],
	[160,140,0,0,0,0,0,0,0,0,140,0,0,0,0,0,0,0,0,0,0,0],
	[150,142.5,0,0,0,0,0,0,0,137.5,0,0,0,0,0,0,0,0,0,0,0,0],
	[160,140,135,0,0,0,135,135,132.5,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[160,150,150,145,140,140,130,130,135,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[160,150,145,0,0,0,0.01,0,0,0,135,0,0,0,0,0,0,0,0,0,0,0],
	[160,0,0,0,0,0,0,0,142.5,142.5,0,0,0,152.5,0,0,0,0,0,0,0,0],
	[160,145,0,0,0,0,0,0,0,0,135,0,0,0,142.5,0,0,0,0,0,0,0],
	[160,145,0,0,0,0,0,0,0,0,135,0,0,0,0,142.5,0,0,0,0,0,0],
	[155,147.5,0,0,0,0,0,0,0,137.5,0,0,145,0,0,0,0,0,0,0,0,0],
	[160,145,142.5,0,0,0,132.5,130,135,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[160,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[160,0,0,0,0,0,0,0,0,0,0,0,150,0,0,0,0,0,0,0,0,0],
	[150,142.5,0,0,0,0,0,0,0,137.5,0,0,0,0,0,0,0,0,0,0,0,0],
	[160,150,0,0,0,0,0,0,0,0,0,0,0,0,0,0,125,0,0,0,0,0],
	[150,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,130,125,50,130,50],
];

JobASPD2 = [
	[500,650,700,2000,2000,2000,800,2000,700,650,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,500,550,600,650,700,700,750,650,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,500,650,2000,2000,2000,800,2000,2000,2000,800,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,2000,2000,2000,2000,2000,2000,2000,600,600,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,600,2000,2000,2000,2000,2000,2000,2000,2000,700,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[500,600,2000,2000,2000,2000,2000,2000,2000,700,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,600,700,2000,2000,2000,700,750,700,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,500,500,550,600,600,700,700,650,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,500,650,2000,2000,2000,800,2000,2000,2000,2000,500,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000], // Assassin
	[400,2000,2000,2000,2000,2000,2000,2000,600,600,2000,2000,600,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,600,2000,2000,2000,2000,2000,2000,2000,2000,600,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[500,575,2000,2000,2000,2000,2000,2000,2000,625,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,600,650,2000,2000,2000,650,650,675,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,500,500,550,600,600,700,700,650,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,500,550,2000,2000,2000,2000.1,2000,2000,2000,650,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,2000,2000,2000,2000,2000,2000,2000,575,575,2000,2000,2000,475,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,550,2000,2000,2000,2000,2000,2000,2000,2000,650,2000,2000,2000,575,2000,2000,2000,2000,2000,2000,2000],
	[400,550,2000,2000,2000,2000,2000,2000,2000,2000,650,2000,2000,2000,2000,575,2000,2000,2000,2000,2000,2000],
	[450,525,2000,2000,2000,2000,2000,2000,2000,625,2000,2000,550,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,550,575,2000,2000,2000,675,700,650,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[500,650,700,2000,2000,2000,800,2000,700,650,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,500,500,550,600,600,700,700,650,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,500,650,2000,2000,2000,800,2000,2000,2000,2000,500,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000], // Assassin Cross
	[400,2000,2000,2000,2000,2000,2000,2000,600,600,2000,2000,600,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,600,2000,2000,2000,2000,2000,2000,2000,2000,600,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[500,575,2000,2000,2000,2000,2000,2000,2000,625,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,600,650,2000,2000,2000,650,650,675,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,500,500,550,600,600,700,700,650,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,500,550,2000,2000,2000,2000,2000,2000,2000,650,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,2000,2000,2000,2000,2000,2000,2000,575,575,2000,2000,2000,475,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,550,2000,2000,2000,2000,2000,2000,2000,2000,650,2000,2000,2000,575,2000,2000,2000,2000,2000,2000,2000],
	[400,550,2000,2000,2000,2000,2000,2000,2000,2000,650,2000,2000,2000,2000,575,2000,2000,2000,2000,2000,2000],
	[450,525,2000,2000,2000,2000,2000,2000,2000,625,2000,2000,550,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,550,575,2000,2000,2000,675,700,650,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[2000],
	[2000],
	[2000],
	[2000],
	[2000],
	[2000],
	[2000],
	[400,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,500,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[500,575,2000,2000,2000,2000,2000,2000,2000,625,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
	[400,500,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,750,2000,2000,2000,2000,2000],
	[500,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,700,750,1500,700,1500],
];

weaponsize = [
	[1   ,1   ,1   ],
	[1   ,0.75,0.5 ],
	[0.75,1   ,0.75],
	[0.75,0.75,1   ],
	[0.75,0.75,1   ],
	[0.75,0.75,1   ],
	[0.5 ,0.75,1   ],
	[0.5 ,0.75,1   ],
	[0.75,1   ,1   ],
	[1   ,1   ,1   ],
	[1   ,1   ,0.75],
	[0.75,1   ,0.75],
	[1   ,1   ,0.5 ],
	[1   ,0.75,0.5 ],
	[0.75,1   ,0.75],
	[0.75,1   ,0.5 ],
	[1   ,1   ,1   ],
	[1   ,1   ,1   ],
	[1   ,1   ,1   ],
	[1   ,1   ,1   ],
	[1   ,1   ,1   ],
	[1   ,1   ,1   ],
];


PC_BaseExp =[
[0,9,16,25,36,77,112,153,200,253,320,385,490,585,700,830,970,1120,1260,1420,1620,1860,1990,2240,2504,2950,3426,3934,4474,6889,7995,9174,10425,11748,13967,15775,17678,19677,21773,30543,34212,38065,42102,46323,53026,58419,64041,69892,75973,102468,115254,128692,142784,157528,178184,196300,215198,234879,255341,330188,365914,403224,442116,482590,536948,585191,635278,687211,740988,925400,1473746,1594058,1718928,1848355,1982340,2230113,2386162,2547417,2713878,3206160,3681024,4022472,4377024,4744680,5125440,5767272,6204000,6655464,7121664,7602600,9738720,11649960,13643520,18339300,23836800,35658000,48687000,58135000,99999998,0],
[0,10,18,28,40,85,123,168,220,278,400,481,613,731,875,1038,1213,1400,1575,1775,2268,2604,2786,3136,3506,4130,4796,5508,6264,9645,12392,14220,16159,18209,21649,24451,27401,30499,33748,47342,58160,64711,71573,78749,90144,99312,108870,118816,129154,174196,213220,238080,264150,291427,329640,363155,398116,434526,472381,610848,731828,806448,884232,965180,1073896,1170382,1270556,1374422,1481976,1850800,3389616,3666333,3953534,4251217,4559382,5129260,5488173,5859059,6241919,7374168,9570662,10458427,11380262,12336168,13326144,14994907,16130400,17304206,18516326,19766760,29216160,34949880,40930560,55017900,71510400,106974000,146061000,174405000,343210000,0]
];


PC_JobExp =[
[0,10,20,28,40,91,151,205,268,340,0],
[0,11,22,31,44,100,166,226,295,374,0],
[0,30,43,58,76,116,180,220,272,336,520,604,699,802,948,1125,1668,1937,2226,3040,3988,5564,6272,7021,9114,11473,15290,16891,18570,23229,28359,36478,39716,43088,52417,62495,78160,84175,90404,107611,125915,153941,191781,204351,248352,286212,386371,409795,482092,509596,982092,992092,1002092,1012092,1022092,1032092,1042092,1052092,1062092,1072092,1082092,1092092,1102092,1112092,1122092,1132092,1142092,1152092,1162092,1172092,1182092,1192092,1202092,1212092,1222092,1232092,1242092,1252092,1262092,1272092,1282092,1292092,1302092,1312092,1322092,1332092,1342092,1352092,1362092,1372092,1382092,1392092,1402092,1412092,1422092,1432092,1442092,1452092,1462092,0],
[0,60,86,116,152,232,360,440,544,672,1040,1208,1398,1604,1896,2250,3336,3874,4452,6080,7976,11128,12544,14042,18228,28683,38225,42228,46425,58073,70898,91195,99290,107720,131043,156238,195400,210438,226010,269028,314788,384853,479453,510878,620880,715530,965928,1024488,1205230,1273990,0],
[0,144,184,284,348,603,887,1096,1598,2540,3676,4290,4946,6679,9492,12770,14344,16005,20642,27434,35108,38577,42206,52708,66971,82688,89544,96669,117821,144921,174201,186677,199584,238617,286366,337147,358435,380376,447685,526989,610246,644736,793535,921810,1106758,1260955,1487304,1557657,1990632,2083386,0],
[0,288,368,568,696,1206,1774,2192,3196,5080,7352,8580,9892,13358,18984,31925,35860,40013,51605,68585,87770,96443,105515,131770,167428,206720,223860,241673,294553,362303,479053,513362,548856,656197,787507,927154,985696,1046034,1231134,1449220,1678177,1773024,2380605,2765430,3320274,3782865,4461912,4672971,5971896,6250158,6875174,7562652,8318960,9150856,10065942,11877812,14015818,16538655,19515624,23028437,28094693,34275525,41816141,51015692,62239144,79666104,101672614,130524946,167071930,213852071,0],
[0,72,92,142,174,301,443,548,799,1270,1838,2145,2473,3339,4746,6385,7172,8002,10321,13717,17554,19288,21103,26354,33485,41344,44772,48344,58910,72460,87100,93338,99792,119308,143183,231068,257377,274363,314246,371105,431038,476309,588548,665256,801731,916689,1130023,1188623,1377408,1551289,1746582,1845236,1954741,2124555,2345698,2548763,2759555,3021488,3254111,3489547,3695474,4012251,4181112,4302211,4496584,4578951,4869523,5022114,5123654,5395117,0]
];

PC_JobExp[7] = new Array();
for(var i=0;i<=18;i++)
	PC_JobExp[7][i] = 27434;
for(var i=19;i<=50;i++)
	PC_JobExp[7][i] = PC_JobExp[4][i] *2;

PET_OBJ = [[0,"No Pet",0,0]
,[1,"Alice [MDEF+1, Demi-Human Resistance +1%]",0,19,1,57,1,0]
,[2,"Isis [ATK +1%, MATK -1%]",0,80,1,89,-1,0]
,[3,"Incubus [MSP +5%]",0,16,5,0]
,[4,"Fire Imp [Fire Resistance +2%, Physical Damage against Fire Element +2%]",0,63,2,43,2,0]
,[5,"Whisper [FLEE +7,DEF -3]",0,9,7,18,-3,0]
,[6,"Orc Warrior [ATK +10,DEF -3]",0,17,10,18,-3,0]
,[7,"Shinobi [AGI +2]",0,2,2,0]
,[8,"Christmas Goblin [MHP +30, Water Resistance +5%]",0,13,30,61,10,0]
,[9,"Golem [MHP +100, FLEE -5]",0,13,100,9,-5,0]
,[10,"Baby Desert Wolf [INT +1, MSP +20]",0,4,1,14,20,0]
,[11,"Goblin Leader [Physical Damage against Demi-Human Race +3%]",0,37,3,0]
,[12,"Succubus [Add a 5% chance of gaining 5% of physical damage inflicted on an enemy as HP]",0,380,5,381,5,0]
,[13,"Savage Babe [VIT +1, MHP +50]",0,3,1,13,50,0]
,[14,"Zherlthsh [MATK +2%, Magical Damage against Demi-Human +2%]",0,89,2,177,2,0]
,[15,"Steel Chonchon [FLEE +6, AGI -1]",0,9,6,2,-1,0]
,[16,"Spore [HIT +5 ,ATK -2]",0,8,5,17,-2,0]
,[17,"Smokie [AGI +1, Perfect Dodge +1]",0,2,1,11,1,0]
,[18,"Sohee [STR +1, DEX +1]",0,1,1,5,1,0]
,[19,"Green-Maiden [DEF +1, Demi-Human Resistance +1%]",0,18,1,57,1,0]
,[20,"Chonchon [AGI +1, FLEE +2]",0,2,1,9,2,0]
,[21,"Deviruchi [ATK +1%, MATK +1%, MHP -3%, MSP -3%]",0,80,1,89,1,15,-3,16,-3,0]
,[22,"Dullahan [CRIT ATK +5%]",0,70,5,0]
,[23,"Evil Nymph [MSP +30, SP Recovery +5%]",0,14,30,76,5,0]
,[24,"Dokebi [MATK +1%, ATK -1%]",0,89,1,80,-1,0]
,[25,"Drops [HIT +3, ATK +3]",0,8,3,17,3,0]
,[26,"Nightmare Terror [Sleep Resistance +100%]",0,155,100,0]
,[27,"Baphomet Jr. [DEF +1, MDEF +1, Stun Resistance -1%]",0,18,1,19,1,151,-1,0]
,[28,"Hunter Fly [Perfect Dodge +2, FLEE -5]",0,11,2,9,-5,0]
,[29,"Picky [STR +1, ATK +5]",0,1,1,17,5,0]
,[30,"Earth Petite [ASPD +1%, DEF -2, MDEF -2]",0,12,1,18,-2,19,-2,0]
,[31,"Stone Shooter [Fire Resistance +3%]",0,63,3,0]
,[32,"Peco Peco [MHP +150, MSP -10]",0,13,150,14,-10,0]
,[33,"Poison Spore [STR +1, INT +1]",0,1,1,4,1,0]
,[34,"Poporing [LUK +2, Poison Resistance +10%]",0,6,2,150,10,0]
,[35,"Poring [LUK +2, CRIT +1]",0,6,2,10,1,0]
,[36,"Bongun [VIT +1, Stun Resistance +1%]",0,3,1,151,1,0]
,[37,"Marionette [SP Recovery +3%]",0,76,3,0]
,[38,"Miyabi Doll [INT +1, Cast Time -3%]",0,4,1,73,-3,0]
,[39,"Mao Guai [MSP +10]",0,14,10,0]
,[40,"Munak [INT +1, DEF +1]",0,4,1,18,1,0]
,[41,"Medusa [VIT +1, Stone Curse Resistance +5%]",0,3,1,159,5,0]
,[42,"Rice Cake [Neutral Resistance +1%]",0,60,1,0]
,[43,"Yoyo [CRIT +3,LUK -1]",0,10,3,6,-1,0]
,[44,"Leaf Cat [Brute Resistance +3%]",0,52,3,0]
,[45,"Lunatic [CRIT +2, ATK +2]",0,10,2,17,2,0]
,[46,"Rocker [HP Recovery +5%, MHP +25]",0,75,5,13,25,0]
,[47,"Loli Ruri [MHP +3%, 5% to cast Heal Lv. 1 on the owner receiving Physical Damage]","When receiving Physical Damage, has a certain chance to use Heal Lv.1",15,3,0]
//custom Talon Tales pets
,[48,"Acidus [FLEE +10]",0,9,10,0]
,[49,"Baby Leopard [ASPD +5%]",0,12,5,0]
,[50,"Develing [Shadow Resistance +3%]",0,67,3,0]
,[51,"Garm Baby [Water Resistance +7%]",0,61,7,0]
,[52,"Green Ferus [Increase damage against Dragon by 5% and Demon by 2%]",0,39,5,36,2,0]
,[53,"Headless Mule [DEX+1, Shadow Resistance +3%]",0,5,1,67,3,0]
,[54,"Jakk [Shadow Resistance +3%, Holy Resistance -3%]",0,66,-3,67,3,0]
,[55,"Myst Case [Shadow Resistance -3%, Holy Resistance +3%]",0,66,3,67,-3,0]
,[56,"Orc Baby [Resistance to small monsters +15%",0,190,15,0]
,[57,"Pinguicula [All stats +1 if equipped with Poring Cake Hat]",0,0]
,[58,"Siroma [LUK +2]",0,6,2,0]
,[59,"Taini [DEX +2]",0,5,2,0]
,[60,"Tatacho [STR +2]",0,1,2,0]
,[61,"Thanatos Dolor [FLEE +5, STR +1, INT +1, DEX +1],",0,1,1,4,1,5,1,9,5,0]
,[62,"Xmas Lunatic [AGI +2]",0,2,2,0]
,[63,"Zipper Bear [ATK +10]",0,17,10,0]
,[64,"Zhu Po Long [Increase damage against Plant and Formless by 3%]",0,30,3,33,3,0]
,[65,"Woodie  [VIT +3, Increases effectiveness of your Heal, Sanctuary and Potion Pitcher by 5%]",0,3,3,91,5,93,5,94,5,0]
//[Custom Talon Tales - 2018-06-04 - Evolved Pets] [Kato]
,[66,"Alicel [DEF +1, Demi-Human Resistance +1%]",0,18,1,57,1,0]
,[67,"Am Mut [MATK +2%]",0,89,2,0]
,[68,"Bradium Golem [MHP +250, FLEE +10]",0,13,250,9,10,0]
,[69,"Choco [ASPD +3%]",0,12,3,0]
,[70,"Condor [STR +3, ATK +6]",0,1,3,17,6,0]
,[71,"Desert Wolf [INT +2, MSP +100]",0,4,2,14,100,0]
,[72,"Draco [VIT +1, MDEF +1, ASPD +2%]",0,3,1,19,1,12,2,0]
,[73,"Evil Marionette [MHP+50, MSP+10, HP & SP Recovery +10%]",0,13,50,14,10,76,-10,75,-10,0]
,[74,"Giant Whisper [FLEE +10, Perfect Dodge +1]",0,9,10,11,1,0]
,[75,"Grand Peco [MHP +500, MSP +25]",0,13,500,14,25,0]
,[76,"High Orc [ATK +2%]",0,80,2,0]
,[77,"Jaguar [ASPD +5%]",0,12,5,0]
,[78,"Savage [MHP +300, VIT +5]",0,13,300,3,5,0]
,[79,"Yao Jun [INT+1, VIT+1, DEF+1, MDEF+1, MHP+150, MSP+10]",0,4,1,3,1,18,1,19,1,13,150,14,10,0]
//[Custom Talon Tales - 2018-06-04 - New Pets] [Kato]
,[80,"Mini Ice Titan [ASPD +1%. Chance to Freeze enemy when doing physical attakcs]",0,12,1,0] // Not freeze
,[81,"Aqua Elemental [ASPD +1%, Water Resistance +2%]",0,12,1,61,2,0]
,[82,"Bathory [VIT +1, Shadow Resistance +3%]",0,3,1,67,3,0]
,[83,"Beary Punny Bear [FLEE +5, STR +1, INT +1, DEX +1]",0,9,5,1,1,4,1,5,1,0]
,[84,"Blue Unicorn [INT +1, Holy Resistance +2%]",0,4,1,66,2,0]
,[85,"Chepet [LUK +1, Holy Resistance +2%]",0,6,1,66,2,0]
,[86,"Cornus [ASPD +2%, ATK -1%]",0,12,2,80,-1,0]
,[87,"Domovoi [AGI +2]",0,2,2,0]
,[88,"Dumpling Child [Neutral Resistance +1%]",0,60,1,0]
,[89,"Eggyra [AGI +3]",0,2,3,0]
,[90,"Ferus [Increase damage against Dragon by 5% & Undead by 2%]",0,39,5,31,2,0]
,[91,"Freezer [STR +1, Water Resistance 2%]",0,1,1,61,2,0]
,[92,"Garden Keeper [INT +1, AGI +1, Holy Resistance +2%]",0,4,1,2,1,66,2,0]
,[93,"Galapago [AGI +2, LUK +4 if equipped with Galapago Cap]",0,2,2,0]
,[94,"Gibbet [Perfect Dodge +1, AGI +2, Shadow Resistance +1%]",0,11,1,2,1,67,1,0]
,[95,"Hell Poodle [DEF +1, VIT +2, Shadow Resistance +1%]",0,18,1,67,1,0]
,[96,"Hylozoist [LUK +2, Ghost Resistance +2%]",0,6,2,68,2,0]
,[97,"Little Poring [LUK +2, CRIT +1]",0,6,2,10,1,0]
,[98,"Lude [INT +2, Ghost Resistance +2%]",0,4,2,68,2,0]
,[99,"Mavka [Earth Resistance +2%, Damage against Fire Monsters +1%]",0,62,2,40,1,43,1,0]
,[100,"Mermaid [INT +1, DEX +1]",0,4,1,5,1,0]
,[101,"Pandaring [VIT +2, INT +4 if equipped with Panda Hat]",0,3,2,0]
,[102,"Pouring [STR +2]",0,1,2,0]
,[103,"Sedora [LUK +2]",0,6,2,0]
,[104,"Snow Bunny [ASPD +1%, DEX +1]",0,12,1,5,1,0]
,[105,"Snowier [ASPD +1%, STR +1]",0,12,1,1,1,0]
,[106,"Teddy Bear [VIT +2]",0,3,2,0]
,[107,"Tiyanak [STR +1, LUK +1, Shadow Resistance +2%]",0,1,1,6,1,61,2,0]
,[108,"Chung E [DEF +1, Demi-Human Resistance +1%]",0,18,1,57,1,0]
,[109,"Tiny Agni [Physical/Magical Damage against Fire Monsters +2%]",0,43,2,353,2,0]
,[110,"Tiny Aqua [Physical/Magical Damage against Water Monsters +2%]",0,41,2,351,2,0]
,[111,"Tiny Ventus [Physical/Magical Damage against Wind Monsters +2%]",0,44,2,354,2,0]
,[112,"Agni [Physical/Magical Damage against Fire Monsters +2%, Fire Resistance +2%]",0,43,2,443,2,63,2,0]
,[113,"Ventus [Physical/Magical Damage against Wind Monsters +2%, Wind Resistance +2%]",0,44,2,444,2,64,2,0]
,[114,"Eira [Increases effectiveness of your Heal, Sanctuary and Potion Pitcher by 5%, 2% Chance of gaining 5% of physical damage inflicted on an enemy as HP]",0,91,5,93,5,94,5,380,2,381,5,0]
,[115,"Aqua [Physical/Magical Damage against Water Monsters +2%, Water Resistance +2%]",0,41,2,441,2,61,2,0]
,[116,"Angry Penguin [Increases effectiveness of your Heal, Sanctuary and Potion Pitcher by 3%, reduces SP usage of skills by 5%]",0,72,-5,91,3,93,3,94,3,0]
,[117,"Baby Skoll [[Swordman, Thief, Merchant class] SP Rege. +20%, [Archer, Acolyte, Magician class] HP Rege. +20%, [Extended Class]HP/SP Rege. +10%, Perfect Dodge +3]",0,0]
,[118,"Ballooling [Increases effectiveness of Heal, Sanctuary and Potion Pitcher on yourself by 2%]",0,92,2,93,2,95,2,0]
,[119,"Jejeling [VIT +2, DEX +4 if equipped with Baseball Cap]",0,3,2,0]
,[120,"Elephant [Perfect Dodge +2, VIT +3]",0,11,2,3,2,0]
,[121,"Gorilla [STR +3, VIT +3]",0,1,3,3,2,0]
,[122,"Lion [FLEE +5, VIT +3]",0,9,5,3,2,0]
,[123,"Rhino [ATK +5, VIT +3]",0,17,5,3,3,0]
,[124,"Little Fatum [ASPD +1%, DEX +1]",0,12,1,5,1,0]
,[125,"Lucky Case [[Mage, Archer, Acolyte Class] MHP +175, Perfect Dodge +1, [Swordman, Merchant, Thief Class] MSP +50, VIT +2]",0,0]
,[126,"Miming [INT +1, VIT +1, Increases effectiveness of your Heal, Sanctuary and Potion Pitcher by 5%]",0,4,1,3,1,91,5,93,5,94,5,0]
,[127,"Skelion [MHP +250, MDEF +1, ASPD +2%, Ghost Resistance +2%]",0,13,50,19,1,12,2,68,2,0]
,[128,"Tikbalang [Increase damage to Bakonawa, Bangungot and Buwaya by 10%] (not calced)",0,0]
,[129,"Toucan [DEX +1, FLEE +5]",0,5,1,9,5,0]
,[130,"White Goat [+1.5% chance to cast Level 2 Bash when doing a physical attack, Increases the healing effectiveness of Carrots by 100%]",0,218,[515,100,0],0]
,[131,"Wild Rider [AGI +2, DEX +3, if equipped with Drooping Cat]",0,2,2,0]
,[132,"Sprouting Egg [Add a 2% chance of gaining 5% of physical damage inflicted as HP, HP/SP regeneration +10%, MHP +300]",0,13,300,75,10,76,10,380,2,381,5,0]
,[133,"Bandit [MSP +25, Add a 2.5% chance of casting Lv1 Steal when doing a physical attack. Increase resistance to Shadow Property attacks by 1%]",0,14,25,67,1,0]
,[134,"Moonlight Flower [ASPD +2%, INT +1, MHP +2%]",0,4,1,12,2,15,2,0]
,[135,"Scatleton [VIT +1, Shadow Resistance +1%, Ghost Resistance +2%",0,3,1,67,1,68,2,0]
,[136,"Lora [MDEF +1, increases effectiveness of received heal from Heal, Sanctuary and Potion Pitcher by 2%]",0,19,1,92,2,93,2,95,2,0]
,[137,"Angeling [MDEF +2, Angel Resistance +2%]",0,19,2,58,2,0]
,[138,"Eggring [Increases duration of stat foods by 50%]",0,0]
,[139,"Elvira [Reduces after-cast delay by 3%]",0,74,3,0]
,[140,"Eremes Guile [Demi-Human resistance +2%]",0,57,2,0]
,[141,"Rainbow [Increases Holy Light and Magnus Exorcismus damage by 7%]",0,5037,7,5104,7,0]
,[142,"Shroud [Adds a 0.25% chance of inflicting Curse status on opponent when attacking]",0,0]
,[143,"Casual Pope [MDEF +1, INT +1, VIT +1, Holy Resistance +1%]",0,3,1,4,1,19,1,66,1,0]
,[144,"Rudo [MHP +2%, increases natural SP Recovery by 10%, Demi-Human resistance +1%]",0,15,2,57,1,76,10,0]
,[145,"Soheon [ASPD +2%, Critical damage +3%]",0,12,2,70,3,0]
,[146,"Celine Kimi [HIT +5, DEF +1, ATK +7, adds a low chance of dropping Izidor when defeating a Boss type monster]",0,8,5,17,7,18,1,0]
,[147,"Saga [Physical damage against Plant and Insect +3%, Physical damage against Water Property +2%]",0,33,3,34,3,41,2,0]
,[148,"Geiravor Disciple [FLEE +7, ASPD +2%]",0,9,7,12,2,0]
,[149,"Geiravor Partisan [Adds a 2% chance of casting Lv 5 Dark Strike when casting magic attacks]",0,221,112,0]
,[150,"Normal Pope [Increases effectiveness of your Heal, Sanctuary and Potion Pitcher by 5%. Add a 2% chance of gaining 5% of physical damage inflicted on an enemy as HP with each attack.]",0,91,5,93,5,94,5,380,2,381,5,0]
,[151,"Sppo [Increase resistance against Water Property by 2%. Increase Physical and Magical damage against Water element monsters by 2%. Add a chance to get a Glacial Heart when killing a monster.]",0,61,2,41,2,351,2,0]
,[152,"Papare [AGI +1, reduces after-cast delay by 3%]",0,2,1,74,3,0]
,[153,"Phreeoni [HIT+5, Increase Physical and Magical damage against Earth element monsters by 3%]",0,8,5,42,3,352,3,0]
,[154,"Gloom Under Night [MATK +1%, Increase Physical and Magical damage against Fire and Ghost element monsters by 2%]",0,89,1,43,2,48,2,353,2,358,2,0]
,[155,"Blue Moon Loli Ruri [MHP +3%, adds chance of auto casting Level 2 [Heal] on the user when the user receives Physical Damage]",0,15,3,0]
,[156,"Ghost Quve [Perfect Dodge +1, AGI +2, Shadow element resistance increased by 2%]",0,2,2,11,1,67,2,0]
,[157,"Grote [DEF +1, VIT +2, Shadow element resistance increased by 2%]",0,3,2,18,1,67,2,0]
,[158,"Garling Lude [MHP +250, ASDP +2%, MDEF+1, Ghost element resistance increased by 2%]",0,12,2,13,250,19,1,68,2,0]
,[159,"Wandering Duck Doll [AGI +2, DEX+1]",0,2,2,5,1,0]
,[160,"Deviruchiling [Shadow element resistance increased by 3%]",0,67,3,0]
,[161,"Capoo [AGI +2, ASPD +2%]",0,2,2,12,2,0]
,[162,"Boiled Rice [Adds a chance to drop Rice Ball when killing Fish race monsters, Increase resistance to Water Property attacks by 2%]",0,61,2,0]
,[163,"Shellfish [Adds a chance to drop Fresh Fish when killing Fish race monsters, Increase resistance to Water Property attacks by 2%]",0,61,2,0]
,[164,"Volcaring [VIT +1, Increases Physical and Magical damage against Fire element monsters by 3%]",0,3,1,43,3,353,3,0]
,[165,"Menblatt [VIT +2, Increases Physical and Magical damage against Wind element monsters by 2%]",0,3,2,44,2,354,2,0]
,[166,"Chimera Litus [Increases duration of Stat foods by 25%]",0,0]
,[167,"Firewind Kite [Increases Physical and Magical damage against Fire and Wind element monsters by 2%]",0,43,2,353,2,44,2,354,2,0]
,[168,"Omega Cleaner [HIT +5, FLEE +3, DEX +1, ASPD +2%]",0,8,5,9,3,5,1,12,2,0]
,[169,"Empathizer [VIT +2, MATK +2%, Increases magical damage to DemiHuman monsters by 2%]",0,3,2,89,2,177,2,0]
,[170,"Child Admin Beta [DEX +1, AGI +2, INT +2, Increases effectiveness of Heal, Sanctuary and Potion Pitcher by 5%]",0,5,1,2,2,4,2,91,5,93,5,94,5,0]
,[171,"Creeper [STR +2, VIT +2, Wind element resistance increased by 2%]",0,1,2,3,2,64,2,0]
,[172,"Phylla [ASPD +2%, Increases Physical against Water element monsters by 2%]",0,12,2,41,2,0]
,[173,"Rhyncho [ASPD +1%, Increases Physical against Water element monsters by 2%]",0,12,1,41,2,0]
,[174,"Green Petite [ASPD +1%, DEF/MDEF -2]",0,12,1,18,-2,19,-2,0]
,[175,"Wild Rose Egg [VIT + 2, AGI + 2, ASPD + 2%]",0,3,2,2,2,12,2,0]
,[176,"Eddga Egg [Increases Physical and Magical damage against Fire element monsters by 3%, Increases resistance to Fire element by 2%]",0,43,3,353,3,63,2,0]
,[177,"Pom Spider Egg [Adds a chance of dropping Grape Juice when defeating a Boss-type monster]",0,0]
,[178,"Blazer Egg [Increases Physical and Magical damage against Fire element monsters by 2%, Increases resistance to Fire element by 2%]",0,43,2,353,2,63,2,0]
,[179,"Baby Lunar Beast Egg [LUK + 2, Adds a 6% chance of dropping Holy Water when defeating an Angel race monster, Adds a 15% chance of dropping Meat when defeating a DemiHuman race monster, Adds a 3% chance of dropping Honey when defeating a Insect race monster]",0,6,2,0]
,[180,"Familiar Egg [LUK + 2, VIT + 2, ASPD + 2%]",0,6,2,3,2,12,2,0]
,[181,"Cake Poring Egg [MaxHP + 3%, Increases healing rate of Well-baked Cookie by 25%]",0,15,3,218,[538,25,0],0]
,[182,"Plant Poring Egg [VIT + 3, Increases healing effectiveness of [Heal], [Sanctuary] and [Potion Pitcher] by 5%]",0,3,3,91,5,93,5,94,5,0]
,[183,"Plant Poring Purple Egg [VIT + 3, Increases healing effectiveness of [Heal], [Sanctuary] and [Potion Pitcher] by 6%]",0,3,3,91,6,93,6,94,6,0]
,[184,"Mummy Egg [Adds a 15% chance of dropping Meat when defeating a DemiHuman race monster, Increases physical and magical damage against DemiHuman monster by 2%]",0,89,2,177,2,0]
,[185,"Ancient Mummy Egg [Adds a 0.75% chance of dropping Silver Ring when defeating a DemiHuman race monster, Increases physical and magical damage against DemiHuman monster by 3%]",0,89,3,177,3,0]
,[186,"Mummy Spaghetti Egg [Increases duration of Stat foods by 50%]",0,0]
,[187,"Easter Poring Egg [When killing a Boss monster, adds a chance to drop Strawberry]",0,0]
,[188,"Black Lunatic Egg [When killing a Boss monster, adds a chance to drop Orange]",0,0]
,[189,"Copo Egg [AGI + 2, ASPD + 2%]",0,2,2,12,2,0]
,[190,"Gray Icewind Egg [MATK + 1%, 3% more damage with [Cold Bolt] skill]",0,89,1,5054,3,0]
,[191,"Icewind Egg [MATK + 1%, 2% more damage with [Cold Bolt] skill]",0,89,1,5054,2,0]
,[192,"Ash Toad Egg [Increases resistance to Earth Property attacks by 2% and Fire Property attacks by 1%, Increases Physical damage to Earth Property monsters by 2% and Fire Property monsters by 1%]",0,62,2,61,1,42,2,43,1,0]
,[193,"Spark Egg [DEX + 1, Increases Physical and Magical damage against Fire element monsters by 2%, Increases resistance to Fire Property attacks by 2%]",0,5,1,43,2,353,2,63,2,0]
,[194,"Ashring Egg [Increases resistance to Neutral and Fire Property attacks by 1%, Increases Physical damage to Neutral and Fire Property monsters by 1%]",0,40,1,43,1,60,1,63,1,0]
,[195,"Book Fairy Egg [Increases Magical damage against Fire, Water and Wind element monsters by 2%]",0,351,2,353,2,354,2,0]
,[196,"Egg Hat Copo Egg [AGI + 1, ASPD + 2%, CRIT + 1]",0,2,1,12,2,10,1,0]
,[197,"Rabbit Iceslug Egg [DEX + 1, Increases Physical and Magical damage against Water element monsters by 2%, Increases resistance to Water Property attacks by 2%]",0,5,1,41,2,351,2,61,2,0]
,[198,"Melibe Iceslug Egg [STR + 1, Increases Physical and Magical damage against Water element monsters by 2%, Increases resistance to Water Property attacks by 2%]",0,1,1,41,2,351,2,61,2,0]
,[199,"Cocopo Egg [AGI + 2, ASPD + 3%]",0,2,2,12,3,0]
,[200,"Nyar Egg [When killing a Boss monster, adds a chance to drop Piece of Cake]",0,0]
,[201,"Egg Armor Copo Egg [AGI + 1, ASPD + 2%, CRIT + 1]",0,2,1,12,2,10,1,0]
,[202,"Dark Lord Egg [INT + 2, Increases Physical Damage to DemiHuman monsters by 2%, Decreases Physical Damage from DemiHuman monsters by 1%]",0,4,2,37,2,57,1,0]
,[203,"Baphomet Egg [VIT + 2, Increases Physical Damage to DemiHuman monsters by 2%, Decreases Physical Damage from DemiHuman monsters by 1%]",0,3,2,37,2,57,1,0]
,[204,"Dark Illusion Egg [INT + 1, VIT + 1, Increases Physical Damage to DemiHuman monsters by 2%, Decreases Physical Damage from DemiHuman monsters by 1%]",0,3,1,4,1,37,2,57,2,0]
,[205,"Pink Pitaya Egg [MDEF + 1, Increases effectiveness of [Heal], [Sanctuary] and [Potion Pitcher] on yourself by 3%]",0,19,1,92,3,95,3,199,3,0]
,[206,"Blue Pitaya Egg [MDEF + 1, Increases effectiveness of [Heal], [Sanctuary] and [Potion Pitcher] on yourself by 3%]",0,19,1,92,3,95,3,199,3,0]
,[207,"Hosangto Egg [MATK + 1%, Increases Physical and Magical damage against Fire and Water element monsters by 1%]",0,89,1,43,1,353,1,41,1,351,1,0]
,[208,"Dark Priest Egg [HIT + 5, FLEE + 3, ASPD + 2%]",0,8,5,9,3,12,2,0]
,[209,"Cute Pope Egg [Increases Magical damage against Fire, Water and Wind element monsters by 2%]",0,353,2,351,2,354,2,0]
,[210,"Adventurer Pope Egg [Increases Magical damage against Fire, Water and Wind element monsters by 2%]",0,353,2,351,2,354,2,0]
,[211,"Usagi Egg [Increases duration of Stat foods by 25%]",0,0]
,[212,"Piske Egg [Increases duration of Stat foods by 25%]",0,0]
,[213,"Stormy Knight Egg [FLEE + 10, Increases Physical and Magical damage against Water element monsters by 2%, Increases resistance to Water element by 2%]",0,9,10,41,2,351,2,61,2,0]
,[214,"Mistress Egg [CRIT + 2, Increases resistance to Water, Fire, Wind and Earth element by 2%]",0,10,2,61,2,62,2,63,2,0]
,[215,"Dragoring Egg [MATK + 1%, Increases Magical damage against Water, Fire, Wind and Earth element monsters by 2%]",0,89,1,351,2,352,2,353,2,0]
,[216,"Chao Egg [Increases Physical and Magical damage against All Element monsters by 1%, Increases resistance to All Elements by 1%]",0,40,1,41,1,42,1,43,1,44,1,45,1,46,1,47,1,48,1,49,1,350,1,351,1,352,1,353,1,354,1,355,1,356,1,357,1,358,1,359,1,60,1,61,1,62,1,63,1,64,1,65,1,66,1,67,1,68,1,69,1,0]
,[217,"Giant Hornet Egg [AGI + 1, CRIT + 2, Increases resistance to Water, Fire, Wind and Earth element by 1%]",0,2,1,10,2,61,1,62,1,63,1,0]
,[218,"Hornet Egg [AGI + 1, CRIT + 1, Increases resistance to Water, Fire, Wind and Earth element by 1%]",0,2,1,10,1,61,1,62,1,63,1,0]
,[219,"Dr Eggling Egg [MDEF + 1, Reduces damage from Angel-race monsters by 2%, Increases damage to Angel-race monsters by 2%]",0,19,1,38,2,58,2,0]
,[220,"Dr Egg Boiler Egg [MATK + 1%, 3% more damage with [Fire Bolt] skill]",0,89,1,5051,3,0]
,[221,"Seawind Egg [MATK + 1%, 3% more damage with [Cold Bolt] skill]",0,89,1,5054,3,0]
,[222,"Scalleg Egg [CRIT + 2, ASPD + 2%, Every time you attack, 1% chance to cause [External Bleeding] status ailment]",0,10,2,12,2,0]
,[223,"Ice Seahorse Egg [Increases Physical and Magical damage against All Element monsters by 1%, Increases resistance to All Elements by 1%]",0,40,1,41,1,42,1,43,1,44,1,45,1,46,1,47,1,48,1,49,1,350,1,351,1,352,1,353,1,354,1,355,1,356,1,357,1,358,1,359,1,60,1,61,1,62,1,63,1,64,1,65,1,66,1,67,1,68,1,69,1,0]
,[224,"Cliolima Egg [MATK + 1%, 1% more damage with [Fire Bolt], [Cold Bolt], [Lightning Bolt] and [Earth Spike]]",0,89,1,5051,1,5054,1,5056,1,5132,1,0]
,[225,"Icehorn Egg [Increases Physical and Magical damage against All Element monsters by 2%, Increases resistance to All Elements by 1%]",0,40,2,41,2,42,2,43,2,44,2,45,2,46,2,47,2,48,2,49,2,350,2,351,2,352,2,353,2,354,2,355,2,356,2,357,2,358,2,359,2,60,1,61,1,62,1,63,1,64,1,65,1,66,1,67,1,68,1,69,1,0]
,[226,"Vacation Pope Egg [VIT + 1, Increases effectiveness of your [Heal], [Sanctuary] and [Potion Pitcher] by 5%, Increases resistance to Holy element by 3%]",0,3,1,91,5,93,5,94,5,66,3,0]
,[227,"Watermelonring Egg [Increases resistance against Water Property by 3%, Increases Physical and Magical damage against Water element monsters by 2%]",0,61,3,41,2,351,2,0]
,[228,"Cute Shiba Inu Egg [Increases duration of Stat foods by 25%]",0,0]
,[229,"Cute Grey Cat Egg [Increases duration of Stat foods by 25%]",0,0]
,[230,"Wooden Fairy II Egg [INT + 1, VIT + 1, Increases healing effectiveness of [Heal], [Sanctuary] and [Potion Pitcher] by 5%]",0,4,1,3,1,91,5,93,5,94,5,0]
,[231,"Creeper II Egg [STR + 2, VIT + 2, Increases resistance to Wind element by 2%]",0,1,2,3,1,64,2,0]
,[232,"Atroce Egg [STR + 2, INT + 2, DEX + 1, Increases Physical and Magical damage against Rachel Sanctuary monsters by 10% (not calced)]",0,1,2,4,2,5,1,0]
,[233,"Ghostring Egg [FLEE + 10, HIT + 5, Increases resistance to Ghost Property by 2%]",0,8,5,9,10,68,2,0]
,[234,"Spiding Egg [STR + 1, INT + 1, DEX + 1, Chance to get Cheese when killing Formless monsters, Increases Physical and Magical damage against Formless monsters by 4%]",0,1,1,4,1,5,1,30,4,170,4,0]
,[235,"Liamette Egg [STR + 1, INT + 1, DEX + 1, Increases duration of Blessing and Increases Agility cast on you by 1 minute]",0,1,1,4,1,5,1,0]
,[236,"Medjed Egg [Increases duration of Military Ration B and C by 5 minutes]",0,0]
,[237,"Nightmare Piamette Egg [MaxHP + 3%, Increases damage against Boss and Non-Boss monsters by 2%, Increases duration of Assumptio cast on you by 20 seconds]",0,15,3,80,2,0]
,[238,"Hell Tree Egg [ATK + 8, VIT + 3, Increases duration of Impositio Manus by 10 seconds]",0,17,8,3,3,0]
,[239,"Melted Poring Egg [ASPD + 3%, ATK + 5, adds a chance of gaining a restorative item each time a monster is killed]",0,12,3,17,5,0]
,[240,"Blood Sucker Egg [DEF + 1, MDEF + 1, MaxHP + 2%, increases Physical and Magical damage against DemiHuman and Player monsters by 1%]",0,18,1,19,1,15,2,37,1,177,1,0]
];

ITEM_SP_TIME_OBJ =[
[0,"Temporary Card/Item Effects","none",0,0,0]
,[1,"Isilla Card","Cast Time -50%,FLEE+30",2,472,9,30,73,-50,0]
,[2,"Ice Titan Card","DEF+10",2,484,18,10,0]
,[3,"Atroce Card","ASPD+100%",2,463,12,100,0]
,[4,"Anolian Card","Activate level 1 [Attention Concentrate]",2,224,0]
,[5,"Alchemist Card Set","Adrenaline Rush",2,461,0]
,[6,"Valorous Assassin Damascus","MATK + 10% and ASPD + 20%",1,898,12,20,89,10,0]
,[7,"Ixion Wings","ASPD + 7%",1,821,12,7,0]
,[8,"Vanberk Card","CRIT + 100",2,471,10,100,0]
,[9,"Wolfheiden","Receive -20% Physical Damage, +20% Magical Damage[Stone Skin Lv1]",1,708,0]
,[10,"Angelic Ring","Effectiveness of Heal, Sanctuary and Potion Pitcher increased by 20%",1,1000,91,20,93,20,94,20,0]
,[11,"Glorious Grenade Launcher","ASPD + 20%",1,1103,12,20,0]
,[12,"Glorious Jamadhar [Refine Level 5~10]","190 ASPD",1,1091,99,190,0]
,[13,"Glorious Tablet","[Every Refine Level] ATK + 20",1,1094,0]
,[14,"Glorious Shuriken","Throw Fuuma Shuriken/Final Strike Damage + 100%",0,0,0] //,1,1098,5396,100,5405,100,5438,100,0
,[15,"Glorious Bloody Roar [Refine Level 6~10]","ASPD + 100%",1,1090,12,100,0]
,[16,"Naght Sieger Twin-Blade [Red]","Ignore [Non-Boss] Monster Defense",1,933,21,100,0]
,[17,"Elemental Sword + Elemental Boots","MATK + 1% per Elemental Sword refine level at a 4% chance for 5 seconds when attacking normally.",1,1821,0] 
,[18,"Desert Twilight + Desert Wind","190 ASPD",1,818,12,100,0]
,[19,"Shadow Guard Set [Shadow Walk + Shadow Guard]","FLEE + 20",1,995,9,20,0]
,[20,"Valorous Huuma Front Shuriken","After using [Throw Shuriken] adds a 3% chance to increase ASPD by 15% for 10 seconds.",1,931,12,15,0]
,[21,"Naght Sieger Twin-Blade [Blue]","Ignore [Non-Boss] Monster Defense",1,932,21,100,0]
,[22,"Soldier Gatling Gun","ATK + 80",1,927,17,80,0]
,[23,"Soldier Grenade Launcher","ATK + 300",1,929,17,300,0]
,[24,"Soldier Revolver","ASPD + 100%",1,925,12,100,0]
,[25,"Tae Goo Lyeon [JobLV70]","ATK + 50",1,934,17,50,0]
,[26,"Brave Battle Fist","Asura Strike Cast Time -100%",1,916,7197,100,7321,100,0]
,[27,"Naga Scale Armor","ATK + 20",1,989,17,20,0]
,[28,"Noble Hat","Adrenaline Rush",1,1129,0]
,[29,"Violet Fear","Ignore [Non-Boss] Monster Defense",1,935,21,100,0]
,[30,"Bloody Eater","CRIT + 100, ATK + 50",1,819,10,100,17,50,0]
,[31,"Blue Ribbon","Attention Concentrate Lv2",1,885,0]
,[32,"Hodremlin Card","Perfect Dodge + 30",2,467,11,30,0]
,[33,"Mithril Magic Manteau","Receive -20% Magical Damage,+20% Physical Damage[Anti-Magic Lv6]",1,709,0]
,[34,"Ring of Flame Lord","Critical Explosion Lv1",1,728,0]
,[35,"Tempest","[Every Refine Level] Add a 0.5% chance that you will increase damage on all enemies by 10% for 15 seconds.",1,1789,80,10,0]
,[36,"Soldier Shotgun","ATK + 80",1,928,17,80,0]
,[37,"Voina Dagger","Physical Damage + 10%",1,1157,80,10,0]
,[38,"Roubel","Bash / Bowling Bash Damage + 20%",1,1158,5006,20,5076,20,0]
,[39,"Chronos","MATK + 12%, SP Cost + 20%",1,1172,72,20,89,12,0]
,[40,"Nemesis","ATK + 50",1,820,17,50,0]
,[41,"Sorin Doll Hat","ATK + 50",1,892,17,50,0]
,[42,"Sagittarius Diadem","+10 DEX/AGI",1,1288,2,10,5,10,0]
,[43,"Virgo Crown","+20 DEX",1,1294,5,20,0]
,[44,"Vinit Doll Hat","ASPD + 5%",1,1028,12,5,0]
,[45,"Dark Knight Glove[Type A]","ASPD + 2%",1,1052,12,2,0]
,[46,"Dark Knight Glove[Type B]","MHP + 10%",1,1310,15,10,0]
,[47,"Jaguar Hat","Loud Exclamation",1,1317,1,4,0] //custom Talon Tales, really?
,[48,"Djinn","40% damage reflection",1,1380,71,40,0] //custom Talon Tales
,[49,"Chicken Hat","Loud Exclamation",1,1422,1,4,0] //custom Talon Tales
,[50,"Ancient Horns","ATK + 100",1,1538,17,100,0] //custom Talon Tales,
,[51,"Duneyrr Card","Perfect Dodge + 10, [Lord Knight] Additional + 10 under Berserk",2,511,0]
,[52,"Rhyncho Card","Increase Resistance to Fire property by 10%",2,513,63,10,0]
,[53,"Color Scope","[Every Refine Level] Add a 0.5% chance that you will increase Critical ATK by 10% for 15 seconds.",1,1786,70,10,0]
,[54,"Brindle Eel [Rental]","When long range attacking, has a chance of adding ASPD + 10% for 7 seconds.",1,1807,12,10,0]
,[55,"Saurel [Rental]","When using a melee attack, has a chance of adding ATK + 30 for 7 seconds.",1,1811,17,30,0]
,[56,"Saurel [Rental]","When doing a magical attack, has a chance of adding MATK + 10% for 7 seconds.",1,1811,89,10,0]
,[57,"Invective Robe", "Activate level 1 [Attention Concentrate].",1,1818,0]
,[58,"Valorous Assassin Damascus", "Enable Ice Pick effect.",1,898,23,1,0]
,[59,"Glorious Staff of Destruction", "MATK + 3% for each refine level for 6 seconds when using magic attacks at a 1% chance per refine.",1,1083,0]
,[60,"Illusion of Faceworm Queen", "Ignores 50% defense and 30% MDEF of Insect race monsters.",1,1875,184,50,314,30,0]
];
//ITEM_SP_TIME_OBJ_SORT = [0,5,10,4,27,3,44,37,30,31,26,39,49,45,46,18,48,15,11,12,14,13,17,32,1,7,47,35,33,21,16,40,28,34,38,42,19,22,23,24,36,41,25,6,20,8,29,43];

//2nd value is bonus brewing success rate in %
Potion_Type =[
[0,20,"Red Potion"]
,[1,20,"Yellow Potion"]
,[2,20,"White Potion"]
,[3,0,"Blue Potion"]
,[4,0,"Slim Red Potion"]
,[5,0,"Slim Yellow Potion"]
,[6,0,"Slim White Potion"]
,[7,10,"Alcohol"]
,[8,0,"Acid Bottle"]
,[9,0,"Bottle Grenade"]
,[10,0,"Plant Bottle"]
,[11,0,"Marine Sphere Bottle"]
,[12,0,"Glistening Coat"]
,[13,0,"Anodyne"]
,[14,0,"Aloevera"]
,[15,0,"Embryo"]
,[16,0,"Elemental Resist Potions"]
];
Potion_Max = 17;

Anvil_Type =[
[0,0,"Anvil/No Anvil"]
,[1,0,"Oridecon Anvil"]
,[2,5,"Gold Anvil"]
,[3,10,"Emperium Anvil"]
];
Anvil_Max = 4;

// Index, Minimum heal, Maximum heal, Name, PP level requirement, SPP level requirement
PP_POTIONS =[
[0,45,65,"Red Potion",1,1]
,[1,105,145,"Orange Potion",2,0]
,[2,175,235,"Yellow Potion",3,6]
,[3,325,405,"White Potion",4,10]
,[4,40,60,"Blue Potion",5,0]
];

Cook_Kit =[
[0,"Outdoor Cooking Kit"]
,[1,"Home Cooking Kit"]
,[2,"Professional Cooking Kit"]
,[3,"Royal Cooking Kit"]
,[4,"Fantastic Cooking Kit"]
];
Cook_Kit_Max = 5;

Stat_Food =[
[0,"STR"]
,[1,"AGI"]
,[2,"VIT"]
,[3,"INT"]
,[4,"DEX"]
,[5,"LUK"]
];

Stat_Food_Max = 6;

sqi_bonus_db = {
	// Mjolnir#84
	84 :	[["10% Ranged damage reduction",78,10,0]
			,["+15 CRIT, +20% more damage with Critical Hits",10,15,70,20,0]
			,["Reduce [Cart Termination] and [Mammonite] SP costs by 50%",0]
			,["Spend 75% less zeny with all Zeny Skills",0]
			,["Triple the duration of [Cart Boost] and [Melt Down]",0]
			,["[Over-Thrust] won't break party member weapons. Enable [Full Adrenaline Rush] without [Blacksmith Spirit]",0]
			,["MATK + 20%. 30% chance to auto-cast level 2 [Lightning Jolt] with 100% more damage when attacking normally",221,156,89,20,5414,100,0]
			,["40% chance to auto-cast level 1 [Wide Silence] when using [Hammerfall]",0]
			,["Enables use of level 1 [Charge Attack] and 30% less cast time with [Charge Attack]",220,52,7308,30,0]
			,["+200% more damage with Throw Tomahawk, enables [Throw Tomahawk] to work together with the [Melt Down] status.",5302,200,0]
			,["For each mastered Forge Passive add ATK + 10 and DEF Pierce + 2%; but reduce HP Leech Script total amount by 50%",0]
			,["Assume max weight for [Cart Revolution] and [Cart Termination] regardless of cart weight",0]
			,["Enable [Weapon Perfection] and [Power Maximize] effects all the time with no SP costs when these skills are mastered",0]
			,["PvM: Endow Neutral Element",0]
			],
	// Twin Fang#1375
	1375 : 	[["20% Magic Resistance",101,20,0]
			,["30% Freeze and Stone Curse Resistance",152,30,159,30,0]
			,["20% more damage with Critical Hits",70,20,0]
			,["25% more damage with [Grimtooth]",5084,25,0]
			,["50% more damage and 50% less cast time with [Meteor Assault]",5264,50,7264,50,0]
			,["25% more damage and 50% less cast time with [Soul Breaker]",5263,25,7263,50,0]
			,["[Enchant Poison] endows Shadow instead of Poison, 10% more damage against Holy Element during [Enchant Poison] (toggle)",46,10,0]
			,["Add a 15% chance to inflict Deadly Poison status on the target when attacking, Deadly Poison interval reduced by 75%.",0]
			,["Demon Race, Insect Race, and Detector Mobs can no longer see you when hidden; Fails against boss monsters",0]
			,["[Soul Breaker] inflicts more damage depending on the target's Defense",0]
			,["While under [Cloaking]; 25% faster base movement speed",0]
			,["While under [Cloaking]; Immunity to [Quagmire] and [Slow Grace]; Dispel Cloak on unequip",0]
			,["PvM: [Assassin Spirit] remains after death",0]],
	// Aegis Shield#1376
	1376 : 	[["50% Stone Curse Resistance",159,50,0]
			,["Reflect 15% of all melee damage.",71,15,0]
			,["15% Aftercast Reduction",74,15,0]
			,["Full HP/SP when resurrected",0]
			,["Cast can't be interrupted",0]
			,["20% more damage with [Holy Cross] and [Grand Cross]",5161,20,5162,20,0]
			,["20% more damage with [Shield Boomerang] and [Shield Chain]",5159,20,5384,20,5324,20,0]
			,["[Shield Chain] and [Shield Boomerang] ignores Neutral Resist",0]
			,["Ignore [Grand Cross] holy self-damage, inflict full damage regardless of AoE position.",0]
			,["Increase effectiveness of [Heal] by 20% (10% in PvP/WoE)",91,20,0]
			,["50% less cast time with [Shield Chain]; but disables Berzebub Card",7324,50,0]
			,["[Crusader Spirit] remains after death",0]
			,["[Endure] has no hit limit when used",0]],
	// Artemis Bow#1377
	1377 : 	[["+15% MaxHP",15,15,0]
			,["+10% MaxSP, 25% chance to ignore arrow costs when using skills or attacking normally",16,15,0]
			,["20% Magic Resistance",101,20,0]
			,["10% more damage with auto-attack and [Sharpshoot] Critical Hits",70,10,0]
			,["100% more damage with [Claymore Trap], [Blast Mine] and [Land Mine], [Blast Mine] and [Land Mine] durations are increased to 100 seconds when mastered",5106,100,5112,100,5113,100,0]
			,["Increase Trap Skill Trigger AoE (except Ankle Snare) to 5x5. Increase [Claymore Trap], [Land Mine], and [Blast Mine] splash AoE to 7x7",0]
			,["Add a 20% chance to auto-cast Level 2 [NPC_BLEEDING] when attacking normally (not calced)",0]
			,["FLEE + 15 on [Wind Walk]",0]
			,["10% more damage with [Double Strafing]",5040,10,0]
			,["Triple [True Sight] duration",0]
			,["[Blitz Beat] and [Falcon Assault] ignore Neutral Resist",0]
			,["25% more damage and 20% less aftercast delay with [Falcon Assault]",5271,25,8271,20,0]
			,["Auto [Blitz Beat] doesn't draw aggro against slave mobs. [Blitz Beat] no longer splits damage",0]],
	// Belmont Whip#1378
	1378 :	[["+20% MaxHP",15,20,0]
			,["+15 CRIT, 20% more damage with Critical Hits",10,15,70,20,0]
			,["20% more damage with Long Range attacks",25,20,0]
			,["35% more damage with [Throw Arrow]",5207,35,0]
			,["35% more damage with [Arrow Vulcan]",5292,35,0]
			,["Immobilize the target for 2 seconds after using [Arrow Vulcan]; Fails against MvP monsters and in WoE",0]
			,["15% chance to cause Stone Curse or Sleep status when attacking",135,15,139,15,0]
			,["[Ugly Dance] reduces enemy INT by 20% for 7 seconds. (Toggle)",0]
			,["[Service for You] restores 2 SP per skill level (+20 at level 10) every 2 seconds for everyone in its area.",0]
			,["[Fortune's Kiss] CRIT Rate + 1 for every level; and buffs yourself without [Bard and Dancer Spirits]; when its user leaves the AoE it lasts 40 seconds",0]
			,["[Humming] HIT boost is doubled",0]
			,["Double the duration of [Bard and Dancer Spirits] and remains after death",0]
			,["30% Freeze and Stone Curse Resistance",152,30,159,30,0]],
	// Blade of Angels#1379
	1379 : 	[["Enables use of level 1 [Cart Revolution]. 100% more damage with [Cart Revolution]. 200% more damage with [Magnum Break]",220,65,5066,100,5007,200,0]
			,["+25 CRIT, 20% more damage with Critical Hits",10,25,70,20,0]
			,["15% Aftercast Reduction",74,15,0]
			,["Ignore 10% of enemy MDEF",295,10,0]
			,["Enables use of level 5 [Heaven's Drive]. 25% more damage with [Heaven's Drive] and [Thunderstorm]. 200% more damage with [Fire Ball].",220,66,5052,200,5057,25,5133,25,0]
			,["50% more damage with [Mammonite]. 75% reduced zeny cost with [Mammonite] and enable use of level 1 [Fatal Blow]",5065,50,0]
			,["Enables use of level 5  [Aspersio]",0]
			,["Enables use of Level 10 [Auto Spell]",0]
			,["Enables use of level 10 [Grand Cross]",220,62,0]
			,["Enables use of Level 5  [Aura Blade] (Toggle)",0]
			,["Double the duration of [Super Novice Spirit] and remains after death. Death record isn't increased during [Super Novice Spirit]",0]
			,["[Double Attack] Rate + 10%",0]
			,["Convert [Fire Bolt], [Cold Bolt], [Lightning Bolt], and [Magnum Break] delays into cooldowns",0]],
	// Djinn#1380
	1380 :	[["+15% MaxHP",15,15,0]
			,["+5 INT",4,5,0]
			,["5% chance to reflect 40% of damage for 8 seconds when attacked",0]
			,["5% chance to use Stone Curse status on the enemy while receiving damage",399,5,0]
			,["+20% MATK, enables use of Level 6 [Fire Bolt] and 5% chance to auto cast Level 6 [Firebolt] when attacking, ",220,48,221,115,89,20,0]
			,["+50% more damage and 75% reduced zeny cost with [Mammonite]",5065,50,0]
			,["[Demonstration] damage interval reduced by 75% (every 0.25 secs instead of 1 sec). Remove [Demonstration] on unequip",0]
			,["20% chance to ignore potion cost with [Potion Pitcher] and [Slim Potion Pitcher]",0]
			,["PvM: Ignore [Acid Terror] Acid Bottle cost and [Demonstration] Fire Bottle cost",0]
			,["Chemical Protection Skills (except FCP) have double duration and a 25% chance to ignore Glistening Coat cost",0]
			,["[Bio Cannibalize] plants recieve 40% less damage, ASPD/ATK x2, and HIT/HP x3; destroy bio plants on equip/unequip",0]
			,["PvM: [Acid Terror] takes on the element of the user's weapon",0]
			,["PvM: [Demonstration] takes on the element of the user's weapon",0]
			,["PvM: Endow Neutral Element",0]],
	// Electric Guitar#1381
	1381 : 	[["+20% MaxHP",15,20,0]
			,["30% Freeze and Stone Curse Resistance",152,30,159,30,0]
			,["20% more damage with Long Range attacks",25,20,0]
			,["35% more damage with [Musical Strike]",5199,35,0]
			,["35% more damage with [Arrow Vulcan]",5292,35,0]
			,["Immobilize the target for 2 seconds after using [Arrow Vulcan]; Fails against MvP monsters and in WoE",0]
			,["Add a 10% chance of auto-casting level 10 [Jupitel Thunder] when attacked with short range physical attacks",0]
			,["[The Apple of Idun] MaxHP Rate + 1% for every level. Heals three times as often and as much",0]
			,["[A Whistle] FLEE Rate + 20 and Perfect Dodge Rate + 5",0]
			,["[Poem of Bragi] Aftercast Rate + 2%",0]
			,["Increase [Jupitel Thunder] level to 10",0]
			,["[Assassin Cross of Sunset] adds 10% more Wind Magic Damage instead of ASPD",0]
			,["Double the duration of [Bard and Dancer Spirits] and remains after death",0]],
	// Evangelist#1382
	1382 : 	[["MaxSP + 20%. Reduce SP consumption of skills by 10%",16,20,72,-10,0]
			,["30% Freeze and Stone Curse Resistance",152,30,159,30,0]
			,["Convert [Magnus Exorcismus] delay into a cooldown",0]
			,["20% chance to cause Sleep status when attacking",135,20,0]
			,["Increase effectiveness of Sanctuary by 20%",94,20,0]
			,["Enables use of Level 10 [Frost Nova]",220,51,0]
			,["Enables use of [Free Cast] and casting can't be interrupted",0]
			,["50% cast time reduction for [Magnificat], [Kyrie Elesion], [Assumptio] and [Safety Wall]",0]
			,["Add a 20% chance to auto-cast level 6 [Cold Bolt] when attacking normally. If [Demon Bane] is mastered, chance to auto-cast level 10 [Holy Cross] instead",221,154,221,155,0]
			,["Add a 15% chance to double cast [Heal] at the level learned",0]
			,["[Resurrection] works on Undead armor players",0]
			,["Triple the duration of [Gloria]",0]
			,["[Priest Spirit] remains after death",0]
			,["PvM: Endow Neutral Element",0]],
	// Eversong Greaves#1383
	1383 :	[["[Taekwon] +10% MaxHP/MaxSP; [Star Gladiator] +20% MaxHP/MaxSP",0]
			,["[Taekwon] Ignore 20% of enemy Defense; [Star Gladiator] PvM: [Union] HP recoil is reduced to 1%, reduce HP leech bonus by 50%",0]
			,["[Taekwon] +15% Kick Skill Rate; [Star Gladiator] Triple Miracle Mode rate, if [Heat] is not learned Miracle Mode Rate is 2%",0]
			,["+30 FLEE",9,30,0]
			,["+10 CRIT, +20% more damage with Critical Hits",10,10,70,20,0]
			,["[Peaceful Rest] and [Enjoyable Rest] always enabled and ignores overweight tick penalties below 90%; But disables GEC Effect!",0]
			,["50% more damage with [Flying Side Kick]",5305,50,5339,50,0]
			,["25% more damage with [Axe Kick] and [Counter Kick]",5333,25,5337,25,0]
			,["25% more damage with [Round Kick], always cast level 5 [Hammer Fall] after using [Round Kick]",5335,25,0]
			,["[Whirlwind Kick] inflicts double splash damage (no damage increase on source target)",0]
			,["Perfect Dodge + 10",11,10,0]
			,["VIT + 10",3,10,0]
			,["[Break Fall] Rate + 10%",0]],
	// Ghostdancer Staff#1384
	1384 : 	[["Enables level 5 duration and SP cost on all Soul Link Skills regardless of current skill level",0]
			,["Reduces SP consumption of skills by 20% and reduces [Kaahi] SP consumption for yourself by 30%",72,-20,0]
			,["Replace [Eska] effect with 20% MDEF Reduction on the target for 10 seconds",0]
			,["20% chance to cause Curse with normal attacks or [Estin]",133,20,0]
			,["Soul Links casted on others last 50% longer",0]
			,["+10% more damage with [Esma]",5375,10,0]
			,["50% less cast time with [Kaupe], [Kaite], [Eswoo] and [Esma]. Casting can't be interrupted",7370,50,7371,50,7375,50,7376,50,0]
			,["[Peaceful Rest] and [Enjoyable Rest] always enabled and ignores overweight tick penalties below 90%; But disables GEC Effect!",0]
			,["[Priest Link] adds heal 20% more with [Heal] and 15% with [Sanctuary]",0]
			,["[Wizard Link] adds ignore 50% of Holy/Shadow element Fire/Water/Wind/Earth Resistance",0]
			,["[Kaite] Ignores boss/level restriction, but no damage is reflected in that case, instead, damage is ignored. Only works on yourself, fails against Earthquake",0]
			,["Auto-Cast [Acid Terror] when attacking at [Alchemist Spirit] level, auto-Cast [Holy Cross] when attacking at [Crusader Spirit] level",0]
			,["Auto-Cast [Frost Joker] when attacking at [Bard Dancer Spirit] level",0]],
	// Hira Shurikat#1385
	1385 : 	[["20% Magic Resistance",101,20,0]
			,["20% Demi-Human Resistance",57,20,0]
			,["20% Cast Time Reduction",73,-20,0]
			,["Enables use of level 1 [Hiding]. 50% more damage and add a 20% chance to inflict Sleep status with [Mist Slash]",220,22,5400,50,0]
			,["CRIT + 25, 20% more damage with auto-attack and [Shadow Slash] Critical Hits",10,25,70,20,0]
			,["[Final Strike] ignores enemy DEF. 10% of your current HP (not max) remains after using [Final Strike]",5405,20,5438,20,0]
			,["2 Cell Knockback and 50% more damage with [Crimson Fire Formation]",5408,50,0]
			,["50% more damage with [Throw Humma Shuriken], [Throw Shuriken], and [Throw Kunai]. [Throw Huuma Shuriken] no longer split damage and delay converted into a cooldown",5394,50,5395,50,5396,50,0]
			,["20% more damage with [Dragon Fire Formation] and [Falling Ice Pillar] and convert their delays into cooldowns; 8 Cells Knockback with [Falling Ice Pillar]",5409,20,5412,20,0]
			,["25% chance to auto-cast level 2 [Critical Wounds] after using [Wind Blade] and convert delay into cooldown",0]
			,["Reduce SP consumption of skills by 20%",72,-20,0]
			,["15% aftercast reduction",74,15,0]
			,["10% more damage with [Lightning Spear of Ice], [Crimson Fire Blossom], and [North Wind]. Additional 10% if base STR >= 90",5410,10,5407,10,5415,10,0]
			,["PvM: Endow Neutral Element",0]],
	// Nibelungen#1386
	1386 :	[["CRIT + 15, 10% more damage with Critical Hits",10,15,70,10,0]
			,["15% Aftercast Reduction",74,15,0]
			,["Increase damage inflicted on Large size monster by 15% when using [Pierce] or [Brandish Spear]",0]
			,["5% chance to add ASPD + 12% and [Pierce] HIT Rate + 25% for 15 seconds after using [Pierce] (Toggle)",12,12,0]
			,["20% more damage with [Pierce]",5070,20,0]
			,["100% more damage with [Joint Beat], 50% more damage with [Head Crush]",5261,100,5260,50,0]
			,["50% more damage [Brandish Spear] and inflict full damage regardless of AoE position",5073,50,0]
			,["50% less cast time with  [Brandish Spear] and has an additional attack range + 1",7073,50,0]
			,["25% chance to auto-cast level 5 [Decrease Agility] on the enemy after using [Spear Boomerang]",0]
			,["25% chance to auto-cast level 1 [Critical Wounds] after using [Head Crush]",0]
			,["50% less cast time with [Spiral Pierce]; but disables Berzebub Card",7259,50,0]
			,["10% chance to auto-cast [Pierce] or [Joint Beat] at the levels learned during [Frenzy]",0]
			,["[Endure] has no hit limit when used",0]],
	// Scouter#1387
	1387 : 	[["20% Magic Resistance",101,20,0]
			,["Reduce SP Consumption of skills by 20%",72,-20,0]
			,["CRIT + 15 (30 with Rifles) and 20% more damage with Critical Hits",10,15,70,20,0]
			,["Shotgun Equipped: ASPD + 15%. 20% more damage with [Full Buster]. 50% more damage with [Spread Attack]",0]
			,["Grenade Launcher Equipped: 50% more damage with [Triple Action]. [Ground Drift] Duration + 30s. PvP: 50% more damage with [Ground Drift], PvM: Add 4 more Mines, AoE becomes 5x5.",0]
			,["Gatling Gun Equipped: 20% more damage with Long Range Attacks and Critical Hits. Ignore [Gatling Fever] FLEE and Movement Speed penalties, dispelled on unequip",0]
			,["Enables use of level 1 [Hyper Spirit Sphere]",0]
			,["5% chance to auto cast Stone Curse status when attacking",221,116,0]
			,["Add a 25% chance to ignore ammo costs when using skills or attacking normally. Skills that consume more than 2 bullets only consume 2 bullets",0]
			,["Rifle Equipped: 20% more damage with [Piercing Shot] and [Tracking]. 25% less cast time with [Tracking]",0]
			,["Triple the duration of [Madness Canceller] and [Adjustment]",0]
			,["15% Aftercast Reduction",74,15,0]
			,["Immunity to Blind Status. Base AGI >= 87: Immunity to Stun Status. Base VIT >= 87: Immunity to Sleep Status",154,100,0]],
	// Sherwood Bow#1388
	1388 : 	[["MaxSP + 10%. Add a 25% chance to ignore ammo costs when attacking normally or using skills",16,10,0]
			,["Reduce SP Consumption of skills by 15%",72,-15,0]
			,["Ignore 10% of enemy MDEF",295,10,0]
			,["20% Melee Resistance, 20% Magic Resistance",100,20,101,20,0]
			,["MaxHP + 15%",15,15,0]
			,["CRIT + 15, 10% more damage with Critical Hits",10,15,70,10,0]
			,["Enable [Double Attack] usage, [Double Attack] and [Triple Attack] Rate + 10%",0]
			,["PvP: Add a 10% chance to auto-cast level 1 [Strip Armor] when attacking with long range. PvM: 5% chance for [Strip Shield] instead at the level learned",221,117,0]
			,["Add a 5% chance to auto-cast level 3 [Critical Wounds] when attacking with long range",0]
			,["Demon Race, Insect Race, and Detector Mobs can no longer see you when hidden; Fails against boss monsters",0]
			,["[Strip Armor] increases MvP VIT by 20%. Strip Skills (except Full Strip) have a 50% longer duration (toggle)",0]
			,["[Preserve] remains after death",0]
			,["Add a 10% chance to auto-cast [Double Strafing] when attacking normally at the level learned",0]],
	// Staff of Magi#1389
	1389 : 	[["+20% MaxHP",15,20,0]
			,["+5 DEX",5,5,0]
			,["20% ranged damage reduction",78,20,0]
			,["20% chance to auto cast Curse status when attacking. [Gravitation Field] has a 20% chance to cause Stone Curse status, [Gravitation Field] no longer damages targets under the Stone Curse status.",133,20,0]
			,["Enable movement during [Gravitation Field]. Remove [Gravitation Field] on unequip",0]
			,["Amplify Magic Power casts 75% faster",0]
			,["Ignore Demi-Human defense. 100% more damage with [Magic Crasher]. 10% chance to auto cast [Ganbantein] at no cost of gemstones",187,1,5275,100,0]
			,["Enable level 10 [Water Ball] when it and [Cold Bolt] are mastered",220,63,0]
			,["25% more damage with [Napalm Vulcan], [Napalm Vulcan] no longer split damage",5277,25,0]
			,["100% more damage with [Earth Spike], 50% more damage with [Heaven's Drive]",5132,100,5133,50,0]
			,["50% more damage with [Lord of Vermillion]. 25% more damage with [Thunderstorm]. Convert their delays into cooldowns",5057,25,5127,50,0]
			,["Ignore [Fire Pillar] and [Safety Wall] Blue Gemstone cost",0]
			,["Increase [Quagmire] limit to 5. Remove [Quagmire] on unequip",0]],
	// Suiken#1390
	1390 : 	[["30% Freeze and Stone Curse Resistance",152,30,159,30,0]
			,["5% chance to Freeze the target when attacking",132,5,0]
			,["Gain effect of [Monk Spirit] status all the time",0]
			,["[Spirits Recovery] always enabled, ignores weight tick penalties under 90%, and restores three times as much; disabled in Steel Body and disables GEC Effect!",0]
			,["[Raging Palm Strike] pushes back an additional 2 cells",0]
			,["100% more damage with Triple Attack, Chain Combo and Combo Finish, 50% more damage with Tiger Knuckle and Chain Crush Combo",5187,100,5188,100,5189,100,5289,50,5290,50,0]
			,["Add a 100% chance to auto cast [Dangerous Soul Collect] after using [Fury]",0]
			,["Ignore Spirit Sphere requirement for All Combo Skills. [Triple Attack] Ignores Delay",0]
			,["PvM: Convert [Finger Offensive] delay into a cooldown. PvP: Add a 15% chance to auto cast [Dangerous Soul Collect] after using [Finger Offensive]",0]
			,["Add a 25% chance to auto cast [Call Spirits] after using [Investigate]",0]
			,["20% more damage with [Investigate]. PvP/WoE: Reduce to 10%",5193,20,0]
			,["PvM: 33% of your current SP (not max) remains after using [Asura Strike]",0]
			,["Combo Skills ignore 30% of enemy Defense",0]
			,["PvM: Endow Neutral Element",0]],
	// Tome of Ymir#1391
	1391 : 	[["+20% MaxHP",15,20,0]
			,["Increase [Wall of Fog] limit to 3. Remove [Wall of Fog] on unequip",0]
			,["Enables use of level 10 [Soul Drain] and regain 2 SP for each normal attack.",16,20,0]
			,["Enables use of level 3 [Strip Shield]",220,53,0]
			,["No cast time with [Memorize] and [Double Bolt]",0]
			,["Pierce 10% of enemy MDEF when using [Fire Bolt], [Cold Bolt], [Lightning Bolt], or [Earth Spike]",0]
			,["15% Aftercast Reduction with [Fire Bolt], [Cold Bolt], and [Lightning Bolt]",8051,15,8054,15,8056,15,0]
			,["Earth Spike Mastered: Add a 50% chance to cause Stone Curse status after using [Earth Spike]",0]
			,["Autospell Mastered: Add ASPD + 12% and FLEE + 15 during [Autospell]",0]
			,["Endow Skills have 100% success rate regardless of skill level. Instances/PvP/WoE: Consume no catalyst",0]
			,["Increase the AoE of [Volcano], [Deluge], and [Violent Gale] to 11x11. Cancel these skills on unequip",0]
			,["PvM: 80% Aftercast Reduction with [Soul Exchange] and restore 50% more SP with [Health Conversion]",0]
			,["25% more damage with [Thunderstorm] and [Heaven's Drive]. 200% more damage with [Fire Ball]",5052,200,5057,25,5133,25,0]]
}

EXTENDED_INFO = [
[0,"-"]
 ,[1,"Heal Amount"]
 ,[16,"Sanctuary Healing Amount"]
 ,[2,"Increased HP Recovery"]
 ,[3,"Increased SP Recovery"]
 ,[4,"Spirits Recovery"]
 ,[5,"Weight Limit"]
 ,[6,"Player Resistance"]
 ,[7,"Attack Modifiers"]
// ,[8,"Create your ennemy"]
 ,[9,"SP Cost Modifier"]
 ,[10,"Cast time/delay"]
 ,[11,"Experience"]
 ,[12,"Potion Pitcher HP/SP Power"]
 ,[13,"Forge/Potion/EDP Creation Success Rates"]
 ,[14,"Strip Chance"]
 ,[15,"Cooking Success Rates"]
 ,[17,"Drain Rate"]
 ,[18,"Healing Items"]
 ,[19,"Steal Calculator"]
 ,[20,"Refine System"]
 ,[21,"Homunculus Analysis"]
];

CARD_SHORTCUT = [
  [0,"Card Shortcuts"]
 ,[1,"Remove All Cards"]
 ,[2,"Remove Weapon Cards"]
 ,[3,"+60%[TTT]"]
 ,[4,"+40%, +25% ASPD [DTT]"]
 ,[5,"+20%, +50% ASPD [DDT]"]
 ,[6,"+60%, +25% ASPD [DTTT]"]
 ,[7,"+40%, +50% ASPD [DDTT]"]
 ,[8,"+65 ATK, +50% ASPD [DDBS]"]
 ,[9,"+130 ATK, +25% ASPD [DBSS]"]
 ,[10,"+50% BB dmg [SGSG]"]
 ,[11,"+75% BB dmg [SGSGSG]"]
 ,[12,"+40%[2 Race Card]"]
 ,[13,"+60%[3 Race Card]"]
 ,[14,"+80%[4 Race Card]"]
 ,[15,"+61%[2 Race/1 Size Cards]"]
 ,[16,"+68%[2 Race/1 Element Cards]"]
 ,[17,"+84%[3 Race/1 Size Cards]"]
 ,[18,"+96%[2 Race/2 Element Cards]<"]
 ,[19,"+110%[2 AK/2 Race Cards]"]
 ,[20,"+110%[3 AK/1 Race Cards]"]
 ,[21,"+110%[3 AK/1 Element Cards]"]
 ,[22,"2 Size Cards"]
 ,[23,"3 Size Cards"]
 ,[24,"4 Size Cards<"]
 ,[25,"Elemental + Star Crumb"]
 ,[26,"Elemental + 2 Star Crumbs"]
 ,[27,"3 Star Crumbs"]
 ,[28,"+40 ATK[2 Andre Cards]"]
 ,[29,"+60 ATK[3 Andre Cards]"]
 ,[30,"+80 ATK[4 Andre Cards]"]
 ,[31,"+60 ATK[2 Zipper Bear Cards]"]
 ,[32,"+90 ATK[3 Zipper Bear Cards]"]
 ,[33,"+120 ATK[4 Zipper Bear Cards]"]
 ,[34,"2 Sold. Skeleton Cards"]
 ,[35,"3 Sold. Skeleton Cards"]
 ,[36,"4 Sold. Skeleton Cards"]
 ,[37,"+40 HIT[2 Mummy Cards]"]
 ,[38,"+60 HIT[3 Mummy Cards]"]
 ,[39,"+80 HIT[4 Mummy Cards]"]
 ,[40,"+60%[2 Orc Lady Cards]"]
 ,[41,"+92%[2 Orc Lady/1 Hydra Cards]"]
 ,[42,"+128%[3 Orc Lady/1 Hydra Cards]"]
 ,[43,"+20%[2 Archer Skeleton Cards]"]
 ,[44,"+30%[3 Archer Skeleton Cards]"]
 ,[45,"+40%[4 Archer Skeleton Cards]"]
 ,[46,"2 Fabre Cards"]
 ,[47,"3 Fabre Cards"]
 ,[48,"4 Fabre Cards"]
 ,[49,"2 Drops Cards"]
 ,[50,"3 Drops Cards"]
 ,[51,"4 Drops Cards"]
 ,[52,"+50%[2 Abysmal Knight Cards]"]
 ,[53,"+75%[3 Abysmal Knight Cards]"]
 ,[54,"+100%[4 Abysmal Knight Cards]"]
 ,[55,"2 Crit Dmg+10%,Crit+7 Cards"]
 ,[56,"3 Crit Dmg+10%,Crit+7 Cards"]
 ,[57,"4 Crit Dmg+10%,Crit+7 Cards"]
 ,[58,"Swordsman Set"]
 ,[59,"Thief Set"]
 ,[60,"Aco Set"]
 ,[61,"Archer Set"]
 ,[62,"Mage Set"]
 ,[63,"Merchant Set"]
 ,[64,"Crusader Set"]
 ,[65,"Rogue Set"]
 ,[66,"Monk Set"]
 ,[67,"Bard/Dancer Set"]
 ,[68,"Sage Set"]
 ,[69,"Alchemist Set"]
 ,[70,"+75% ASPD [DDD]"]
 ,[71,"12% All-Size Dmg. Reduc. [3Drac]"]
 ,[72,"16% All-Size Dmg. Reduc. [4Drac]"]
];

KRIS_ENCHANTMENT = [
  [102,"DEF+2"]
 ,[103,"DEF+3"]
 ,[104,"DEF+4"]
 ,[112,"MDEF+2"]
 ,[113,"MDEF+3"]
 ,[114,"MDEF+4"]
 ,[131,"HP+100"]
 ,[132,"HP+200"]
 ,[133,"HP+300"]
 ,[134,"HP+400"]
 ,[141,"SP+50"]
 ,[31,"VIT+1"]
 ,[32,"VIT+2"]
 ,[33,"VIT+3"]
 ,[41,"INT+1"]
 ,[42,"INT+2"]
 ,[43,"INT+3"]
 ,[51,"DEX+1"]
 ,[52,"DEX+2"]
 ,[53,"DEX+3"]
 ,[61,"LUK+1"]
 ,[62,"LUK+2"]
 ,[63,"LUK+3"]
 ,[891,"MATK+1%"]
 ,[892,"MATK+2%"]
 ,[173,"ATK+3%"]
];

HS_ENCHANTS = [
	//[0,"(Hidden Slot Enchant, Armor)"]
  [11,"STR+1"]
 ,[12,"STR+2"]
 ,[13,"STR+3"]
 ,[21,"AGI+1"]
 ,[22,"AGI+2"]
 ,[23,"AGI+3"]
 ,[31,"VIT+1"]
 ,[32,"VIT+2"]
 ,[33,"VIT+3"]
 ,[41,"INT+1"]
 ,[42,"INT+2"]
 ,[43,"INT+3"]
 ,[51,"DEX+1"]
 ,[52,"DEX+2"]
 ,[53,"DEX+3"]
 ,[61,"LUK+1"]
 ,[62,"LUK+2"]
 ,[63,"LUK+3"]
 ,[102,"DEF+2"]
 ,[103,"DEF+3"]
 ,[104,"DEF+4"]
 ,[112,"MDEF+2"]
 ,[113,"MDEF+3"]
 ,[114,"MDEF+4"]
 ,[152,"CRIT+2"]
 ,[153,"CRIT+3"]
 ,[154,"CRIT+4"]
 ,[121,"ASPD+1%"]
 ,[122,"ASPD+2%"]
 ,[123,"ASPD+3%"]
 ,[302,"FLEE+2"]
 ,[304,"FLEE+4"]
 ,[306,"FLEE+6"]
 ,[311,"HIT+4"]
 ,[312,"HIT+8"]
 ,[313,"HIT+12"]
];

MALANGDO_ENCHANTS = [
		[131, "MHP +100"]
		,[132, "MHP +200"]
		//,[133, "MHP +300"]
		,[141, "MSP +50"]
		,[142, "MSP +100"]
		,[11, "STR+1"]
		,[12, "STR+2"]
		,[13, "STR+3"]
		,[21, "AGI+1"]
		,[22, "AGI+2"]
		,[23, "AGI+3"]
		,[31, "VIT+1"]
		,[41, "INT+1"]
		,[42, "INT+2"]
		,[43, "INT+3"]
		,[51, "DEX+1"]
		,[52, "DEX+2"]
		,[53, "DEX+3"]
		,[61, "LUK+1"]
		//,[301, "ASPD+1%"]
		//,[302, "ASPD+2%"]
		,[123, "ASPD+3%"]
		,[171, "ATK 1%"]
		,[891, "MATK 1%"]
		,[892, "MATK 2%"]
		//,[1781,"Fighting Spirit 1"]
		//,[1782,"Fighting Spirit 2"]
		//,[1783,"Fighting Spirit 3"]
		,[1784,"Fighting Spirit 4"]
		,[1785,"Fighting Spirit 5"]
		,[1786,"Fighting Spirit 6"]
		,[1787,"Fighting Spirit 7"]
		,[1788,"Fighting Spirit 8"]
		//,[1789,"Fighting Spirit 9"]
		//,[1790,"Fighting Spirit 10"]
		//,[1081,"Sharp 1"]
		,[1082,"Sharp 2"]
		,[1083,"Sharp 3"]
		,[1084,"Sharp 4"]
		,[1085,"Sharp 5"]
		//,[251,"Expert Archer 1"]
		,[252,"Expert Archer 2"]
		,[253,"Expert Archer 3"]
		,[254,"Expert Archer 4"]
		,[255,"Expert Archer 5"]
		,[256,"Expert Archer 6"]
		,[261,"Spell 1"]
		,[262,"Spell 2"]
		,[263,"Spell 3"]
		,[264,"Spell 4"]
		,[265,"Spell 5"]
		,[266,"Spell 6"]
		,[267,"Spell 7"]
];

ME_ENCHANTABLE = [
/* [Daggers] */
	 [390,0] //Swordbreaker
	,[391,0] //Mailbreaker
	,[392,0] //Weeder Knife
	,[387,0] //Kitchen Knife
	,[12,0] //Fortune Sword
	,[13,0] //Assassin Dagger
	,[394,0] //Exorciser
	,[396,0] //Azoth
	,[14,0] //Sucsamad
	,[15,0] //Grimtooth
	,[389,0] //Princess Knife
	,[397,0] //Cursed Dagger
	,[398,0] //Dagger of Counter
	,[799,0] //Holy Dagger
	,[1156,0] //Krieg
	,[1157,0] //Weihna
	,[1463,0] //Black Wing
	,[12,0] //Fortune Sword
	,[393,53,0] //Combat Knife - Except DEX+3
	,[11,0] //Moonlight Dagger
	,[388,0] //Ice Pick
	,[395,41,42,43,53,0] //Bazerald Except INT enchants or DEX+3
	,[1618,0] //Ancient Dagger
	,[816,0] //Desert Twilight [2]
/* [Katars] */
	,[634,0] //Bloody Blades [2]
	,[482,0] //Unholy Touch
	,[633,0] //Drill Katar [1]
	,[1175,0] //Krishna [2]
	,[1176,0] //Chakram [2]
	,[631,0] //Ogre's Toenail [1]
	,[632,0] //Inverse Scare
	,[483,0] //Bloody Roar
	,[113,0] //Infiltrator
/* [One Handed Axes] */
	,[415,0] //Cleaver
	,[1164,0] //Berchel Axe [2]
/* [Two Handed Axes] */
	,[70,0] //Great Axe
	,[416,0] //Sabbath
	,[1166,0] //Bradium Stone Hammer
	,[417,0] //Slaughter
	,[418,0] //Tomahawk
	,[1167,0] //Giant Axe [1]
	,[419,0] //Guillotine
	,[68,0] //Bloody Axe
	,[623,0] //Heart Breaker [1]
	,[624,0] //Hurricane Fury [1]
	,[69,0] //Light Epsilon
	,[621,0] //Doom Slayer
	,[622,0] //Bardiche [2]
/* [One Handed Swords] */
	,[32,0] //Ice Falchion
	,[33,0] //Fireblend
	,[401,0] //Caesar's Sword
	,[34,0] //Cutlus
	,[31,0] //Solar Sword
	,[35,0] //Mysteltainn
	,[36,0] //Tirfing
	,[403,0] //Byeollungum
	,[404,0] //Immaterial Sword
	,[470,0] //Star Dust Blade [1]
	,[1158,0] //Roubel Sword [1]
	,[1623,0] //Chrome Metal Sword
	,[402,41,42,43,53,0] //Excalibur - Except INT Enchant and DEX+3
	,[399,0] //Nagan
	,[400,0] //Edge
	,[613,0] //Thin Blade[2]
/* [Two Handed Swords] */
	,[44,0] //Muramasa
	,[405,0] //Dragon Slayer
	,[406,0] //Schweizersabel
	,[46,0] //Zweihander
	,[45,0] //Katzbalger
	,[615,0] //Muscle Cutter [2]
	,[934,0] //Tae Goo Lyeon [2]
	,[819,0] //Bloody Eater [2]
	,[1159,0] //Veteran Sword [1]
	,[1160,0] //Krasnaya [3]
	,[1456,0] //Chrome Metal Two-Handed Sword
	,[47,0] //Masamune
	,[43,0] //Executioner
	,[614,0] //Atroce's Blade [1]
	,[935,0] //Violet Fear [2]
	,[940,0] //Death Guidance [2]
/* [One Handed Spears] */
	,[616,0] //Long Horn [1]
	,[52,0] //Gungnir
	,[408,0] //Gelerdria
	,[410,0] //Tjungkuletti
	,[1460,0] //Imperial Spear [1]
	,[409,0] //Brocca
	,[617,0] //Battle Hook [1]
	,[618,0] //Hunting Spear [1]
	,[51,0] //Pole Axe [1]
/* [Two Handed Spears] */
	,[60,0] //Crescent Scythe
	,[411,0] //Bill Guisarme
	,[59,0] //Zephyrus
	,[412,0] //Longinus's Spear
	,[413,0] //Brionac
	,[414,0] //Hellfire
	,[471,0] //Gae Bolg
	,[619,0] //Phantom Spear
	,[620,0] //Ahlspiess
	,[942,0] //Carled [1]
/* [One Handed Staves] - Staves Except DEX+2/+3 */
	,[478,52,53,0] //Wing Staff
	,[1041,52,53,0] //Gentleman Staff
	,[863,52,53,0] //Holy Stick
	,[1168,52,53,0] //Dead Tree Staff
	,[1508,52,53,0] //Mental Stick
	,[936,52,53,0] //Dark Thorn Staff
	,[948,52,53,0] //Eraser
	,[1169,52,53,0] //Lacrima Stick
/* [Two Handed Staves] - Staves Except DEX+2/+3 */
	,[92,52,53,0] //Wizardry Staff
	,[1172,52,53,0] //Chronos
	,[1640,52,53,0] //Staff Of Thea [1]
	,[647,52,53,0] //Divine Cross
	,[646,52,53,0] //Staff of Destruction
/* [Maces] */
	,[81,0] //Golden Mace [1]
	,[82,0] //Long Mace
	,[422,0] //Quadrille
	,[820,0] //Nemesis
	,[1162,0] //Erde [2]
	,[1559,0] //Red Square Bag [2]
	,[1458,0] //Red Ether Bag [1]
	,[420,0] //Spike
	,[421,0] //Slash
	,[83,0] //Grand Cross
	,[1161,0] //Veteran Hammer [2]
/* [Books] */
	,[122,0] //Book of the Apocalypse
	,[121,0] //Girl's Diary [1]
	,[486,0] //Legacy of Dragon
	,[485,0] //Hardcover Book [1]
	,[812,0] //Battlefield Textbook [1]
	,[641,0] //Book of the Dead  [2]
	,[640,0] //Giant Encyclopedia [2]
/* [Knuckles] */
	,[423,0] //Kaiser Knuckle
	,[424,0] //Berserk
	,[487,0] //Garm Claw [1]
	,[1512,0] //Sura's Rampage
/* [Bows] */
	,[102,0] //Roguemaster's Bow
	,[103,0] //Ballista
	,[479,0] //Dragon Wing
	,[1061,0] //Minstrel Bow [1]
	,[821,0] //Ixion Wings [1]
	,[945,0] //Nepenthes Bow [2]
	,[946,0] //Cursed Lyre [1]
	,[1174,0] //Falken Blitz [2]
	,[1457,0] //Mystic Bow
	,[104,0] //Rudra Bow
	,[630,0] //Orc Archer's Bow
	,[521,0] //Luna Bow
/* [Instruments] */
	,[492,0] //Oriental Lute
	,[649,0] //Spirited Guitar
	,[950,0] //Harp of Nepenthes [2]
	,[1462,0] //Green Whistle [1]
/* [Whips] */
	,[425,0] //Lariat Whip
	,[426,0] //Rapture Rose
	,[141,0] //Chemeti Whip
	,[498,0] //Blade Whip
	,[499,0] //Queen's Whip
	,[651,0] //Electric Eel [2]
	,[652,0] //Foot of the Sea Witch [1]
	,[653,0] //Carrot Whip
	,[951,0] //Stem of Nepenthes [2]
	,[1454,0] //Stem Whip [1]
	,[1622,0] //Rosevine
/* [Huuma] */
	,[660, 0] //Huuma Calm Mind
/* [Guns] */
	,[550, 0] //Garrison [1/2]
	,[657, 0] //Lever Action Rifle [2]
	,[655, 0] //Long Barrel [1]
	,[559, 0] //Butcher [0/1]
	,[659, 0] //Thunder P [2]
	,[561, 0] //Inferno [1]
	// Altea & Ares [2], Heaven's Feather & Hell's Fire [2], and Color Scope [3] can only be enchanted once.
	,[1784, 0] //Altea & Ares [2]
	,[1785, 0] //Heaven's Feather & Hell's Fire [2]
	,[1786, 0] //Color Scope [3]
	,[1787, 0] //RAG203
	,[1788, 0] //Minigun
	,[1789, 0] //Tempest
	,[1790, 0] //Rolling Thunder
	,[1791, 0] //Death Fire
	,[1792, 0] //End of the Horizon
	,[1793, 0] //Southern Cross
];

BIOLAB_ENCHANTS_WEAPON = [
		 [11, "STR+1"]
		,[21, "AGI+1"]
		,[31, "VIT+1"]
		,[41, "INT+1"]
		,[51, "DEX+1"]
		,[61, "LUK+1"]
		,[1781,"Fighting Spirit 1"]
		,[1782,"Fighting Spirit 2"]
		,[1783,"Fighting Spirit 3"]
		,[1081,"Sharp 1"]
		,[1082,"Sharp 2"]
		,[1083,"Sharp 3"]
		,[251,"Expert Archer 1"]
		,[252,"Expert Archer 2"]
		,[253,"Expert Archer 3"]
		,[261,"Spell 1"]
		,[262,"Spell 2"]
		,[263,"Spell 3"]
		,[264,"Spell 4"]
		,[123, "ASPD+3%"]
];

BIOLAB_ENCHANTS_ARMOR = [
		 [11, "STR+1"]
		,[21, "AGI+1"]
		,[31, "VIT+1"]
		,[41, "INT+1"]
		,[51, "DEX+1"]
		,[61, "LUK+1"]
		,[101,"DEF+1"]
		,[102,"DEF+2"]
		//,[111,"MDEF+1"]
		,[112,"MDEF+2"]
		,[113,"MDEF+3"]
		,[114,"MDEF+4"]
		,[301,"FLEE+1"]
		,[302,"FLEE+2"]
		,[303,"FLEE+3"]
		,[304,"FLEE+4"]
		,[131, "MHP +100"]
		,[132, "MHP +200"]
		,[133, "MHP +300"]
		,[141, "MSP +50"]
];

BE_ENCHANTABLE_WEAPON = [
/* [Daggers] */
	 [1625,0] //Aztoe Nail
	,[1624,0] //Scarletto Nail
/* [Katars] */
	,[1627,0] //Agent Katar
	,[1549,0] //Guillotine Katar
/* [Two Handed Axes] */
	,[1617,0] //Ygnus Stale
	,[1616,0] //End Sektura
/* [One Handed Spears] */
	,[1516,0] //Cannon Spear
/* [Two Handed Spears] */
	,[1315,0] //Gigantic Lance
/* [One Handed Staves] */
	,[1511,0] //Recovery Light
/* [Maces] */
	,[1499,0] //Bloody Cross
/* [Books] */
	,[1653,0] //Chilly Spell Book
/* [Bows] */
	,[1515,0] //Catapult
	,[1045,0] //Giant Crossbow
	,[1506,0] //Creeper Bow
];

BE_ENCHANTABLE_ARMOR = [
/* [Upper Headgear] */
	 [1663,0] //Ancient Gold Ornament
/* [Armors] */
	,[1513,0] //Green Surgical Gown
/* [Shields] */
	,[1500,0] //Giant Shield
	,[1520,0] //Geffenia Water Book
	,[1507,0] //Bible of Promise(2nd Vol.)
/* [Garments] */
	,[1498,0] //Salvage Cape
/* [Accessory] */
	,[1517,0] //Assassin's Glove
];

EDEN_ENCHANTS_HAT = [
		 [11, "STR+1"]
		,[12, "STR+2"]
		,[21, "AGI+1"]
		,[22, "AGI+2"]
		,[31, "VIT+1"]
		,[32, "VIT+2"]
		,[41, "INT+1"]
		,[42, "INT+2"]
		,[51, "DEX+1"]
		,[61, "LUK+1"]
		,[62, "LUK+2"]
];

EDEN_ENCHANTS_ARMOR_FIRST = [
		 [11, "STR+1"]
		,[12, "STR+2"]
		,[21, "AGI+1"]
		,[22, "AGI+2"]
		,[31, "VIT+1"]
		,[32, "VIT+2"]
		,[41, "INT+1"]
		,[42, "INT+2"]
		,[61, "LUK+1"]
		,[62, "LUK+2"]
		,[111,"MDEF+1"]
		,[112,"MDEF+2"]
		,[113,"MDEF+3"]
		,[302,"FLEE+2"]
];

EDEN_ENCHANTS_ARMOR_SECOND = [
		 [11, "STR+1"]
		,[12, "STR+2"]
		,[21, "AGI+1"]
		,[22, "AGI+2"]
		,[31, "VIT+1"]
		,[32, "VIT+2"]
		,[41, "INT+1"]
		,[42, "INT+2"]
		,[51, "DEX+1"]
		,[61, "LUK+1"]
		,[62, "LUK+2"]
		,[111,"MDEF+1"]
		,[112,"MDEF+2"]
		,[113,"MDEF+3"]
		,[114,"MDEF+4"]
		,[302,"FLEE+2"]
		,[303,"FLEE+3"]
		,[304,"FLEE+4"]
		,[151,"CRIT+1"]
		,[152,"CRIT+2"]
		,[153,"CRIT+3"]
		,[154,"CRIT+4"]
];

EDEN_ENCHANTS_WEAPON_FIRST = [
		 [172, "ATK+2%"]
		,[892, "MATK+2%"]
];

EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL = [
		 [2030, "Physical Damage vs Formless + 10%"]
		,[2031, "Physical Damage vs Undead + 10%"]
		,[2032, "Physical Damage vs Brute + 10%"]
		,[2033, "Physical Damage vs Plant + 10%"]
		,[2034, "Physical Damage vs Insect + 10%"]
		,[2035, "Physical Damage vs Fish + 10%"]
		,[2036, "Physical Damage vs Demon + 10%"]
		,[2037, "Physical Damage vs Demi-Human + 10%"]
		,[2038, "Physical Damage vs Angel + 10%"]
		,[2039, "Physical Damage vs Dragon + 10%"]
];

EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL = [
		 [2170, "Magical Damage vs Formless + 5%"]
		,[2171, "Magical Damage vs Undead + 5%"]
		,[2172, "Magical Damage vs Brute + 5%"]
		,[2173, "Magical Damage vs Plant + 5%"]
		,[2174, "Magical Damage vs Insect + 5%"]
		,[2175, "Magical Damage vs Fish + 5%"]
		,[2176, "Magical Damage vs Demon + 5%"]
		,[2177, "Magical Damage vs Demi-Human + 5%"]
		,[2178, "Magical Damage vs Angel + 5%"]
		,[2179, "Magical Damage vs Dragon + 5%"]
];

//EDEN_ENCHANTS_WEAPON_FIRST = FIRST + SECOND, depends on former choice.

EDEN_ENCHANTABLE_HAT = [
	 [1576,0] //Eden Group Hat
	,[1577,0] //Eden Group Hat II
];

EDEN_ENCHANTABLE_ARMOR = [
	 [1603,0] //Eden Group Uniform IV
	,[1585,0] //Eden Group Manteau II
	,[1567,0] //Eden Group Boots IV
];

EDEN_ENCHANTABLE_WEAPON = [
	 [1570,0] //Eden Group Bow III
	,[1573,0] //Eden Group Dagger III
	,[1574,0] //Eden Group Dictonary I
	,[1575,0] //Eden Group Guitar I
	,[1578,0] //Eden Group Huuma Shuriken I
	,[1579,0] //Eden Group Katar I
	,[1580,0] //Eden Group Knuckle I
	,[1583,0] //Eden Group Mace III
	,[1588,0] //Eden Group Revolver III
	,[1591,0] //Eden Group Saber III
	,[1594,0] //Eden Group Slayer III
	,[1595,0] //Eden Group Spear I
	,[1598,0] //Eden Group Staff III
	,[1599,0] //Eden Group Two Handed Axe I
	,[1604,0] //Eden Group Whip I
];

//El Dicaste Enchants slot 1
ED_ENCHANTS_SLOT_ONE = [
		 [172, "ATK+2%"]
		,[173, "ATK+3%"]
		,[891, "MATK+1%"]
		,[892, "MATK+2%"]
		,[155, "CRIT+5"]
		,[157, "CRIT+7"]
		,[306, "FLEE+6"]
		,[312, "FLEE+12"]
];
//El Dicaste Enchants slot 2 for equipment
ED_ENCHANTS_SLOT_TWO = [
		 [21, "AGI+1"]
		,[22, "AGI+2"]
		,[31, "VIT+1"]
		,[32, "VIT+2"]
		,[41, "INT+1"]
		,[42, "INT+2"]
];
//El Dicaste Enchants slot 2 & 3 for Light of El Dicaste
ED_ENCHANTS_LIGHT_SLOT_TWO_THREE = [
		 [21, "AGI+1"]
		,[22, "AGI+2"]
		,[41, "INT+1"]
		,[42, "INT+2"]
		,[51, "DEX+1"]
		,[52, "DEX+2"]
];
//El Dicaste Enchants slot 3 for equipment
ED_ENCHANTS_SLOT_THREE = [
		 [21, "AGI+1"]
		,[22, "AGI+2"]
		,[23, "AGI+3"]
		,[33, "VIT+3"]
		,[41, "INT+1"]
		,[42, "INT+2"]
		,[43, "INT+3"]
		,[51, "DEX+1"]
		,[52, "DEX+2"]
];
//El Dicaste Enchants slot 3 for golden trickle
ED_ENCHANTS_GT_SLOT_THREE = [
		 [21, "AGI+1"]
		,[22, "AGI+2"]
		,[41, "INT+1"]
		,[42, "INT+2"]
		,[51, "DEX+1"]
		,[52, "DEX+2"]
];
ED_LIGHT_OF_EL_DICASTE = [
	 [1201,0] //Light of El Dicastes
];

ED_ENCHANTABLE = [
	 [446,0] //Feral Tail
	,[448,0] //Feral Boots
	// ,[449,23,33,43,0] //Golden Trickle ("Golden Bell" in wiki), Exclude AGI+3, VIT+3, and INT+3
	,[449,0]
];

//Mora Enchants
MORA_ENCHANTS_SLOT_ONE = [
		 [172, "ATK+2%"]
		,[173, "ATK+3%"]
		,[891, "MATK+1%"]
		,[892, "MATK+2%"]
		,[155, "CRIT+5"]
		,[157, "CRIT+7"]
		,[306, "FLEE+6"]
		,[312, "FLEE+12"]
];
MORA_ENCHANTS_SLOT_TWO = [
		 [41, "INT+1"]
		,[42, "INT+2"]
		,[51, "DEX+1"]
		,[52, "DEX+2"]
		,[61, "LUK+1"]
		,[62, "LUK+2"]
];
MORA_ENCHANTS_SLOT_THREE = [
		 [11, "STR+1"]
		,[12, "STR+2"]
		,[21, "AGI+1"]
		,[22, "AGI+2"]
		,[31, "VIT+1"]
		,[32, "VIT+2"]
];

MORA_ENCHANTABLE = [
		 [1664,0] //Army Padding
		,[1605,0] //Loki's Muffler
		,[1665,0] //Pendant Of Guardian
];

TEMPORAL_ENCHANTABLE = [
	319, 	// Sleipnir[1]
	1383,	// Eversong Greaves
	1836,	// Temporal Boots (STR)
	1837,	// Temporal Boots (AGI)
	1838,	// Temporal Boots (VIT)
	1839,	// Temporal Boots (INT)
	1840,	// Temporal Boots (DEX)
	1841,	// Temporal Boots (LUK)
];

TEMPORAL_1ST_ENCHANTS = [
	 ["(No Enchant)",[], ""]
	,["Fighting Spirit Lv.4",[17,10,8,5], "HIT + 5<br>ATK + 10"]
	,["Fighting Spirit Lv.5",[17,12,8,5], "HIT + 5<br>ATK + 12"]
	,["Fighting Spirit Lv.6",[17,14,8,5], "HIT + 5<br>ATK + 14"]
	,["Fighting Spirit Lv.7",[17,16,8,5], "HIT + 5<br>ATK + 16"]
	,["Berserker Lv.1",[106,2], "Auto Physical ATK + 2%"]
	,["Berserker Lv.2",[106,4], "Auto Physical ATK + 4%"]
	,["Berserker Lv.3",[106,6], "Auto Physical ATK + 6%"]
	,["Berserker Lv.4",[106,8], "Auto Physical ATK + 8%"]
	,["Arcane Lv.1",[89,1,98,4],  "MATK + 1%<br>MATK + 4"]
	,["Arcane Lv.2",[89,2,98,6],  "MATK + 2%<br>MATK + 6"]
	,["Arcane Lv.3",[89,2,98,8],  "MATK + 2%<br>MATK + 8"]
	,["Arcane Lv.4",[89,3,98,10], "MATK + 3%<br>MATK + 10"]
	,["Vigor Lv.1",[15,2,75,5],  "MaxHP + 2%<br>HP Recovery + 5%"]
	,["Vigor Lv.2",[15,3,75,10], "MaxHP + 3%<br>HP Recovery + 10%"]
	,["Vigor Lv.3",[15,4,75,15], "MaxHP + 4%<br>HP Recovery + 15%"]
	,["Vigor Lv.4",[15,5,75,20], "MaxHP + 5%<br>HP Recovery + 20%"]
	,["Mysticism Lv.1",[16,2,76,5],  "MaxSP + 2%<br>SP Recovery + 5%"]
	,["Mysticism Lv.2",[16,3,76,10], "MaxSP + 3%<br>SP Recovery + 10%"]
	,["Mysticism Lv.3",[16,4,76,15], "MaxSP + 4%<br>SP Recovery + 15%"]
	,["Mysticism Lv.4",[16,5,76,20], "MaxSP + 5%<br>SP Recovery + 20%"]
	,["Speed Lv.1",[12,1,9,2], "ASPD + 1%<br>FLEE + 2"]
	,["Speed Lv.2",[12,2,9,3], "ASPD + 2%<br>FLEE + 3"]
	,["Speed Lv.3",[12,2,9,4], "ASPD + 2%<br>FLEE + 4"]
	,["Speed Lv.4",[12,3,9,5], "ASPD + 3%<br>FLEE + 5"]
];

TEMPORAL_2ND_ENCHANTS = [
	 ["(No Enchant)",[], ""]
	,["Bear's Power",[1,10], "You ate a bear for breakfast, and now you have POWAAA!!!!<br><br>2% chance to add STR + 10 for 10 seconds [Toggle]"]
	,["Speed of Light",[107,50,85,50], "Not as fast as Flash but still pretty fast.<br><br>2% chance to trigger FLEE + 50% 10 seconds, but decreases DEF/MDEF by half [Toggle]"]
	,["Muscle Fool",[], "You won't fool me this is just air in it Mr Bibendum.<br><br>2% chance to resist all elements (except neutral) by 30% for 10 seconds [not calc]"]
	,["Runaway Magic",[4,10], "Dang ... It flew away the moment I casted it...<br><br>2% chance to add INT + 10 for 10 seconds [Toggle]"]
	,["Hawkeye",[25,5], "Massive aliens invasion you say? Better bring at least 20 arrows then.<br><br>2% chance to increase long range attack by 5% for 10 seconds [Toggle]"]
	,["Lucky Day",[70,15], "You wished it was yours, but not today!<br><br>2% chance to increase critical damage by 15% for 10 seconds [Toggle]"]
];

TEMPORAL_3RD_ENCHANTS = [
	 ["(No Enchant)",[], ""]
   	,["(+4)  Temporal STR",[88, 1], "Short Range ATK + 1%<br><b>[Base STR >= 95]</b> HIT + 10"]
   	,["(+5)  Temporal STR",[88, 2], "Short Range ATK + 2%<br><b>[Base STR >= 95]</b> HIT + 10"]
   	,["(+6)  Temporal STR",[88, 3], "Short Range ATK + 3%<br><b>[Base STR >= 95]</b> HIT + 10"]
   	,["(+7)  Temporal STR",[88, 4], "Short Range ATK + 4%<br><b>[Base STR >= 95]</b> HIT + 10"]
   	,["(+8)  Temporal STR",[88, 5], "Short Range ATK + 5%<br><b>[Base STR >= 95]</b> HIT + 10"]
   	,["(+9)  Temporal STR",[88, 6], "Short Range ATK + 6%<br><b>[Base STR >= 95]</b> HIT + 10"]
   	,["(+10) Temporal STR",[88, 7], "Short Range ATK + 7%<br><b>[Base STR >= 95]</b> HIT + 10"]
	,["(+4)  Temporal AGI",[9,4],  "FLEE + 4<br><b>[Base AGI >= 95]</b> ASPD + 5%"]
	,["(+5)  Temporal AGI",[9,5],  "FLEE + 5<br><b>[Base AGI >= 95]</b> ASPD + 5%"]
	,["(+6)  Temporal AGI",[9,6],  "FLEE + 6<br><b>[Base AGI >= 95]</b> ASPD + 5%"]
	,["(+7)  Temporal AGI",[9,7],  "FLEE + 7<br><b>[Base AGI >= 95]</b> ASPD + 5%"]
	,["(+8)  Temporal AGI",[9,8],  "FLEE + 8<br><b>[Base AGI >= 95]</b> ASPD + 5%"]
	,["(+9)  Temporal AGI",[9,9],  "FLEE + 9<br><b>[Base AGI >= 95]</b> ASPD + 5%"]
	,["(+10) Temporal AGI",[9,10], "FLEE + 10<br><b>[Base AGI >= 95]</b> ASPD + 5%"]
	,["(+4)  Temporal VIT",[13,400,75,10],  "MaxHP + 400<br>HP Recovery + 10%<br><br><b>[Base VIT >= 95]</b><br>Short Range Resistance + 3%<br>HP Recovery + 20%"]
	,["(+5)  Temporal VIT",[13,500,75,10],  "MaxHP + 500<br>HP Recovery + 10%<br><br><b>[Base VIT >= 95]</b><br>Short Range Resistance + 3%<br>HP Recovery + 20%"]
	,["(+6)  Temporal VIT",[13,600,75,10],  "MaxHP + 600<br>HP Recovery + 10%<br><br><b>[Base VIT >= 95]</b><br>Short Range Resistance + 3%<br>HP Recovery + 20%"]
	,["(+7)  Temporal VIT",[13,700,75,10],  "MaxHP + 700<br>HP Recovery + 10%<br><br><b>[Base VIT >= 95]</b><br>Short Range Resistance + 3%<br>HP Recovery + 20%"]
	,["(+8)  Temporal VIT",[13,800,75,10],  "MaxHP + 800<br>HP Recovery + 10%<br><br><b>[Base VIT >= 95]</b><br>Short Range Resistance + 3%<br>HP Recovery + 20%"]
	,["(+9)  Temporal VIT",[13,900,75,10],  "MaxHP + 900<br>HP Recovery + 10%<br><br><b>[Base VIT >= 95]</b><br>Short Range Resistance + 3%<br>HP Recovery + 20%"]
	,["(+10) Temporal VIT",[13,1000,75,10], "MaxHP + 1000<br>HP Recovery + 10%<br><br><b>[Base VIT >= 95]</b><br>Short Range Resistance + 3%<br>HP Recovery + 20%"]
	,["(+4)  Temporal INT",[4,2,14,40,76,10],  "MaxSP + 40<br>INT + 2<br>SP Recovery + 10%<br><br><b>[Base INT >= 95]</b><br>INT + 3<br>SP Recovery + 20%"]
	,["(+5)  Temporal INT",[4,2,14,50,76,10],  "MaxSP + 50<br>INT + 2<br>SP Recovery + 10%<br><br><b>[Base INT >= 95]</b><br>INT + 3<br>SP Recovery + 20%"]
	,["(+6)  Temporal INT",[4,2,14,60,76,10],  "MaxSP + 60<br>INT + 2<br>SP Recovery + 10%<br><br><b>[Base INT >= 95]</b><br>INT + 3<br>SP Recovery + 20%"]
	,["(+7)  Temporal INT",[4,2,14,70,76,10],  "MaxSP + 70<br>INT + 2<br>SP Recovery + 10%<br><br><b>[Base INT >= 95]</b><br>INT + 3<br>SP Recovery + 20%"]
	,["(+8)  Temporal INT",[4,2,14,80,76,10],  "MaxSP + 80<br>INT + 2<br>SP Recovery + 10%<br><br><b>[Base INT >= 95]</b><br>INT + 3<br>SP Recovery + 20%"]
	,["(+9)  Temporal INT",[4,2,14,90,76,10],  "MaxSP + 90<br>INT + 2<br>SP Recovery + 10%<br><br><b>[Base INT >= 95]</b><br>INT + 3<br>SP Recovery + 20%"]
	,["(+10) Temporal INT",[4,2,14,100,76,10], "MaxSP + 100<br>INT + 2<br>SP Recovery + 10%<br><br><b>[Base INT >= 95]</b><br>INT + 3<br>SP Recovery + 20%"]
	,["(+4)  Temporal DEX",[8,8,25,2],  "HIT + 8<br>Long Range ATK + 2%<br><b>[Base DEX >= 95]</b> 5% Less Aftercast Delay"]
	,["(+5)  Temporal DEX",[8,10,25,2], "HIT + 10<br>Long Range ATK + 2%<br><b>[Base DEX >= 95]</b> 5% Less Aftercast Delay"]
	,["(+6)  Temporal DEX",[8,12,25,2], "HIT + 12<br>Long Range ATK + 2%<br><b>[Base DEX >= 95]</b> 5% Less Aftercast Delay"]
	,["(+7)  Temporal DEX",[8,14,25,2], "HIT + 14<br>Long Range ATK + 2%<br><b>[Base DEX >= 95]</b> 5% Less Aftercast Delay"]
	,["(+8)  Temporal DEX",[8,16,25,2], "HIT + 16<br>Long Range ATK + 2%<br><b>[Base DEX >= 95]</b> 5% Less Aftercast Delay"]
	,["(+9)  Temporal DEX",[8,18,25,2], "HIT + 18<br>Long Range ATK + 2%<br><b>[Base DEX >= 95]</b> 5% Less Aftercast Delay"]
	,["(+10) Temporal DEX",[8,20,25,2], "HIT + 20<br>Long Range ATK + 2%<br><b>[Base DEX >= 95]</b> 5% Less Aftercast Delay"]
	,["(+4)  Temporal LUK",[10,1],			"CRIT + 1<br>Crafting/Brewing Success + 0%<br><b>[Every 19 Base LUK]</b> Critical ATK/Skills + 3%"]
	,["(+5)  Temporal LUK",[10,2,108,0.5],  "CRIT + 2<br>Crafting/Brewing Success + 0.5%<br><b>[Every 19 Base LUK]</b> Critical ATK/Skills + 3%"]
	,["(+6)  Temporal LUK",[10,3,108,1],	"CRIT + 3<br>Crafting/Brewing Success + 1%<br><b>[Every 19 Base LUK]</b> Critical ATK/Skills + 3%"]
	,["(+7)  Temporal LUK",[10,4,108,1.5],	"CRIT + 4<br>Crafting/Brewing Success + 1.5%<br><b>[Every 19 Base LUK]</b> Critical ATK/Skills + 3%"]
	,["(+8)  Temporal LUK",[10,5,108,2],	"CRIT + 5<br>Crafting/Brewing Success + 2%<br><b>[Every 19 Base LUK]</b> Critical ATK/Skills + 3%"]
	,["(+9)  Temporal LUK",[10,6,108,2.5],	"CRIT + 6<br>Crafting/Brewing Success + 2.5%<br><b>[Every 19 Base LUK]</b> Critical ATK/Skills + 3%"]
	,["(+10) Temporal LUK",[10,7,108,3],	"CRIT + 7<br>Crafting/Brewing Success + 3%<br><b>[Every 19 Base LUK]</b> Critical ATK/Skills + 3%"]
];

FACEWORM_1ST_ENCHANTS = [
	 ["(No Enchant)",[], ""]
	,["STR+1",[1,1], "STR + 1"]
	,["AGI+1",[2,1], "AGI + 1"]
	,["VIT+1",[3,1], "VIT + 1"]
	,["INT+1",[4,1], "INT + 1"]
	,["LUK+1",[6,1], "LUK + 1"]
	,["HIT+4",[8,4], "ASPD + 1%"]
	,["ASPD+1%",[12,1], "ASPD + 1%"]
];

FACEWORM_2ND_ENCHANTS = [
	 ["(No Enchant)",[], ""]
	,["STR+1",[1,1], "STR + 1"]
	,["AGI+1",[2,1], "AGI + 1"]
	,["AGI+2",[2,2], "AGI + 2"]
	,["VIT+1",[3,1], "VIT + 1"]
	,["VIT+2",[3,2], "VIT + 2"]
	,["INT+1",[4,1], "INT + 1"]
	,["LUK+1",[6,1], "LUK + 1"]
	,["LUK+2",[6,2], "LUK + 2"]
	,["HIT+4",[8,4], "ASPD + 1%"]
	,["ASPD+1%",[12,1], "ASPD + 1%"]
	,["ASPD+2%",[12,2], "ASPD + 2%"]
];

FACEWORM_3RD_ENCHANTS = [
	["(No Enchant)", [], ""]
	,["Semi Special STR", [88, 1], "<b>[Whitesmith]</b><br>Total ATK + 1%<br><b>[Other Classes]</b><br>Short Range ATK + 1%"]
	,["Semi Special AGI",[9,4], "FLEE + 4"]
	,["Semi Special VIT",[13,300], "MaxHP + 300"]
	,["Semi Special INT",[14,30,202,20], "MaxSP + 30<br>Min MATK + 20"]
	,["Semi Special DEX",[5,1], "DEX + 1"]
	,["Semi Special LUK",[10,3], "CRIT + 3"]
	,["Special STR", [88, 1], "<b>[Whitesmith]</b><br>Total ATK + 1%<br><b>[Other Classes]</b><br>Short Range ATK + 1%<br><br><b>[Every 2 Unsafe Refines]</b><br><b>[Whitesmith]</b><br>Total ATK + 1%<br><b>[Other Classes]</b><br>Short Range ATK + 1%"]
	,["Special AGI",[9,4], "FLEE + 4<br><br><b>[Every 2 Unsafe Refines]</b><br>FLEE + 3<br>ASPD + 1%"]
	,["Special VIT",[13,300], "MaxHP + 300<br><br><b>[Every 2 Unsafe Refines]</b><br>MaxHP + 1%<br>Reduces Neutral property damage by 1%."]
	,["Special INT",[14,30,202,20], "MaxSP + 30<br>Min MATK + 20<br><br><b>[Every 2 Unsafe Refines]</b><br>MaxSP + 1%<br>Min MATK + 10"]
	,["Special DEX",[5,1], "DEX + 1<br><br><b>[Every 2 Unsafe Refines]</b><br>Increases damage with Ranged Attacks by 1%."]
	,["Special LUK",[10,3], "CRIT + 3<br><br><b>[Every 2 Unsafe Refines]</b><br>Increases Crit ATK/Skills Damage by 1%."]
];

ENCHANT_TYPES = {
	"temporal_1st_enchant": TEMPORAL_1ST_ENCHANTS,
	"temporal_2nd_enchant": TEMPORAL_2ND_ENCHANTS,
	"temporal_3rd_enchant": TEMPORAL_3RD_ENCHANTS,
	"faceworm_1st_enchant": FACEWORM_1ST_ENCHANTS,
	"faceworm_2nd_enchant": FACEWORM_2ND_ENCHANTS,
	"faceworm_3rd_enchant": FACEWORM_3RD_ENCHANTS,
}

function display_enchant_info(enchant_type, enchant_index)
{
	if (document.calcForm.ITEM_SW.checked)
	{
		// Clean previous item info in case of earlier selection
		for (i = 0 ; i <= 4; ++i)
				myInnerHtml("ITEM"+i,"",0);
		myInnerHtml("ITEM_W_LV","",0);
		myInnerHtml("ITEM_DATA","",0);
		myInnerHtml("ITEM_SLOT","",0);
		myInnerHtml("ITEM_LV","",0);
		myInnerHtml("ITEM_WAIT","",0);

		myInnerHtml("nm080","Enchant Info",0);
		enchant_info = ENCHANT_TYPES[enchant_type][enchant_index][2]
		myInnerHtml("B_SETUMEI",enchant_info,0);
	}
}

// Manage restriction regarding Vanilla Equipment
restrictedEquips = [319,347,348,444,576,603,604,605,606,670,1320,1329,1334,1336,1339,1340,1344,1348,1354,1356,1365,1371,1375,1376,1377,1378,1379,1380,1381,1382,1383,1384,1385,1386,1387,1388,1389,1390,1391,1393,1491,1492,1493,1522,1526,1548,1560,1607,1608,1609,1610,1615,1818];
// April 2021 Patch - Equipment from seasonal events disabled in Vanilla
restrictedEquips = restrictedEquips.concat([1681,1682,1683,1689,1690,1713,1728,1729,1730,1735,1736,1738]);

// Manage restriction regarding Vanilla Cards
restrictedCards = [32,42,44,45,47,52,95,119,120,126,127,134,136,138,140,141,152,161,162,166,178,219,255,256,277,284,310,312,313,320,322,323,332,338,349,357,361,363,374,375,392,394,404,409,420,421,423,424,425,463,475,478,486,492,501,515,521,526,529,532,551,552,553,567,574,578,579,581,582];
// April 2021 Patch - Eclage, Biolab 4 and OGH cards
restrictedCards = restrictedCards.concat(Array.from({ length: 649 + 1 - 601},(_,k) => 601 + k))

//GameID, 1=HP 0=SP, minHeal, maxHeal, Name, Weight, Vanilla flag
ITEM_HEAL = [
		[517,1,70,100,"Meat",2,0]
		,[533,0,15,25,"Grape Juice",0.5,0]
		,[547,1,325,405,"Condensed White Potion",1,0]
		,[546,1,175,235,"Condensed Yellow Potion",3,1]
		,[545,1,45,65,"Condensed Red Potion",2,1]
		,[11503,1,400,500,"WoE White Potion",3,1]
		,[11503,0,50,70,"WoE Blue Potion",8,1]	
		,[539,1,270,330,"Piece of Cake",1,1]
		,[578,0,16,28,"Strawberry",2,1]
		,[582,1,10,20,"Orange",2,1]
		,[505,0,40,60,"Blue Potion",15,1]
		,[504,1,325,405,"White Potion",15,1]
		,[503,1,175,235,"Yellow Potion",13,1]
		,[502,1,105,145,"Orange Potion",10,1]
		,[501,1,45,65,"Red Potion",7,1]
		,[507,1,18,28,"Red Herb",3,1]
		,[508,1,38,58,"Yellow Herb",5,1]
		,[509,1,75,115,"White Herb",7,1]
		,[510,0,15,30,"Blue Herb",7,1]
		,[512,1,16,22,"Apple",2,1]
		,[513,1,17,21,"Banana",2,1]
		,[514,0,10,15,"Grape",0.1,1]
		,[515,1,18,20,"Carrot",2,1]
		,[516,1,15,23,"Potato",2,1]
		,[518,1,70,100,"Honey",10,0]
		,[519,1,27,37,"Milk",3,1]
		,[520,1,175,235,"Hinalle Leaflet",1,1]
		,[521,1,325,405,"Aloe Leaflet",2,1]
		,[522,1,400,600,"Mastela Fruit",3,1]
		,[526,1,325,405,"Royal Jelly",15,1]
		,[528,1,72,108,"Monster's Feed",15,1]
		,[529,1,45,65,"Candy",3,1]
		,[530,1,105,145,"Candy Cane",4,1]
		,[531,1,25,35,"Apple Juice",4,1]
		,[532,1,26,34,"Banana Juice",4,1]
		,[534,1,27,33,"Carrot Juice",4,1]
		,[536,1,105,145,"Ice Cream",8,1]
		,[537,1,50,90,"Pet Food",1,1]
		,[538,1,160,200,"Well-baked Cookie",3,1]
		,[540,1,185,225,"Falcon Food",5,1]
		,[541,1,325,405,"PecoPeco Food",5,1]
		,[542,1,105,145,"Fortune Cookie",0,1]
		,[544,1,25,60,"Raw Fish",3,1]
		,[548,0,10,15,"Cheese",5,1]
		,[549,1,50,100,"Yam",8,1]
		,[550,1,10,15,"Rice Cake",1,1]
		,[551,1,50,60,"Sushi",5,1]
		,[552,1,70,90,"Ketupat",1,1]
		,[553,1,35,70,"Bao",5,1]
		,[554,1,105,145,"Mochi",8,1]
		,[555,1,105,145,"Traditional Rice Cake",2,1]
		,[556,1,20,25,"Rice Cake Stick",1,1]
		,[557,1,25,30,"Neatly Sliced Rice Cake",1,1]
		,[562,1,70,100,"Doublecrust Swiss Fondue",15,1]
		,[563,1,375,445,"Doublecrust Swiss Fondue",15,1]
		,[565,1,142,274,"Vita500",10,1]
		,[566,1,244,350,"Tom Yum Goong",15,1]
		,[567,1,117,192,"Shrimp",4,1]
		,[568,0,10,20,"Lemon",4,1]
		,[569,1,22,33,"Novice Potion",1,1]
		,[570,1,45,65,"Lucky Candy",3,1]
		,[571,1,105,145,"Lucky Candy Cane",4,1]
		,[572,1,160,200,"Lucky Cookie",3,1]
		,[573,1,330,410,"Chocolate Drink",15,1]
		,[574,1,33,42,"Egg",3,1]
		,[575,1,270,330,"2nd Anniversary Cake",10,1]
		,[576,1,150,300,"Prickly Fruit",6,1]
		,[577,1,60,70,"Bag of Grain",2,1]
		,[579,1,100,150,"Fresh Fish",2,1]
		,[580,1,50,90,"Bread",2,1]
		,[581,1,20,30,"Edible Mushroom",2,1]
		,[583,1,325,405,"Ketupat Sayur",15,1]
		,[584,1,40,70,"Fish Cake Soup",6,1]
		,[585,1,15,20,"Brusti",4,1]
		,[586,1,325,405,"Mother's Cake",10,1]
		,[587,1,270,330,"Red Prickly Fruit",6,1]
		,[588,1,40,70,"Spaghetti",10,1]
		,[589,1,375,445,"Pizza",15,1]
		,[590,1,50,90,"Pretzel",2,1]
		,[591,1,325,405,"Caviar Pancake",15,1]
		,[592,1,325,405,"Jam Pancake",15,1]
		,[593,1,325,405,"Honey Pancake",15,1]
		,[594,1,325,405,"Sour-Cream Pancake",15,1]
		,[595,1,325,405,"Mushroom Pancake",15,1]
		,[596,0,1,100,"Cute Strawberry-Choco",10,1]
		,[597,1,10,400,"Lovely Choco-Tart",10,1]
		,[598,1,45,65,"Light Red Potion",1,1]
		,[599,1,105,145,"Light Orange Potion",1,1]
		,[11519,1,170,250,"Beef Toast",4,1]
];

FAME_TOP = [
		[0,"Unranked"]
		,[1,"Top 20 [+25%]"]
		,[2,"Top 10 [+50%]"]
];


homunculus_db_json = `
{
  "Lif": {
    "ID": 6005,
    "evoID": 6013,
    "foodID": 537,
    "hungerDelay": 60000,
    "baseSize": 0,
    "evoSize": 1,
    "race": 7,
    "element": 0,
    "baseASPD": 700,
    "baseHP": 150,
    "baseSP": 40,
    "baseSTR": 17,
    "baseAGI": 20,
    "baseVIT": 15,
    "baseINT": 35,
    "baseDEX": 24,
    "baseLUK": 12,
    "gnHP": 60,
    "gxHP": 100,
    "gnSP": 4,
    "gxSP": 9,
    "gnSTR": 5,
    "gxSTR": 19,
    "gnAGI": 5,
    "gxAGI": 19,
    "gnVIT": 5,
    "gxVIT": 19,
    "gnINT": 4,
    "gxINT": 20,
    "gnDEX": 6,
    "gxDEX": 20,
    "gnLUK": 6,
    "gxLUK": 20,
    "enHP": 1,
    "exHP": 10,
    "enSP": 10,
    "exSP": 20,
    "enSTR": 1,
    "exSTR": 5,
    "enAGI": 1,
    "exAGI": 4,
    "enVIT": 1,
    "exVIT": 5,
    "enINT": 4,
    "exINT": 10,
    "enDEX": 1,
    "exDEX": 10,
    "enLUK": 1,
    "exLUK": 3
  },
  "Amistr": {
    "ID": 6006,
    "evoID": 6014,
    "foodID": 912,
    "hungerDelay": 60000,
    "baseSize": 0,
    "evoSize": 1,
    "race": 2,
    "element": 0,
    "baseASPD": 700,
    "baseHP": 320,
    "baseSP": 10,
    "baseSTR": 20,
    "baseAGI": 17,
    "baseVIT": 35,
    "baseINT": 11,
    "baseDEX": 24,
    "baseLUK": 12,
    "gnHP": 80,
    "gxHP": 130,
    "gnSP": 1,
    "gxSP": 4,
    "gnSTR": 8,
    "gxSTR": 20,
    "gnAGI": 4,
    "gxAGI": 20,
    "gnVIT": 4,
    "gxVIT": 20,
    "gnINT": 1,
    "gxINT": 10,
    "gnDEX": 3,
    "gxDEX": 19,
    "gnLUK": 3,
    "gxLUK": 19,
    "enHP": 10,
    "exHP": 20,
    "enSP": 1,
    "exSP": 10,
    "enSTR": 1,
    "exSTR": 10,
    "enAGI": 1,
    "exAGI": 5,
    "enVIT": 4,
    "exVIT": 10,
    "enINT": 1,
    "exINT": 3,
    "enDEX": 1,
    "exDEX": 4,
    "enLUK": 1,
    "exLUK": 5
  },
  "Filir": {
    "ID": 6007,
    "evoID": 6015,
    "foodID": 910,
    "hungerDelay": 60000,
    "baseSize": 0,
    "evoSize": 1,
    "race": 2,
    "element": 0,
    "baseASPD": 700,
    "baseHP": 90,
    "baseSP": 25,
    "baseSTR": 29,
    "baseAGI": 35,
    "baseVIT": 9,
    "baseINT": 8,
    "baseDEX": 30,
    "baseLUK": 9,
    "gnHP": 45,
    "gxHP": 75,
    "gnSP": 3,
    "gxSP": 6,
    "gnSTR": 4,
    "gxSTR": 20,
    "gnAGI": 8,
    "gxAGI": 20,
    "gnVIT": 1,
    "gxVIT": 10,
    "gnINT": 3,
    "gxINT": 19,
    "gnDEX": 4,
    "gxDEX": 20,
    "gnLUK": 3,
    "gxLUK": 19,
    "enHP": 5,
    "exHP": 15,
    "enSP": 5,
    "exSP": 15,
    "enSTR": 4,
    "exSTR": 10,
    "enAGI": 1,
    "exAGI": 10,
    "enVIT": 1,
    "exVIT": 3,
    "enINT": 1,
    "exINT": 4,
    "enDEX": 1,
    "exDEX": 5,
    "enLUK": 1,
    "exLUK": 5
  },
  "Vanilmirth": {
    "ID": 6008,
    "evoID": 6016,
    "foodID": 911,
    "hungerDelay": 60000,
    "baseSize": 0,
    "evoSize": 1,
    "race": 0,
    "element": 0,
    "baseASPD": 700,
    "baseHP": 80,
    "baseSP": 11,
    "baseSTR": 11,
    "baseAGI": 11,
    "baseVIT": 11,
    "baseINT": 11,
    "baseDEX": 11,
    "baseLUK": 11,
    "gnHP": 30,
    "gxHP": 150,
    "gnSP": 0,
    "gxSP": 7,
    "gnSTR": 1,
    "gxSTR": 30,
    "gnAGI": 1,
    "gxAGI": 30,
    "gnVIT": 1,
    "gxVIT": 30,
    "gnINT": 1,
    "gxINT": 30,
    "gnDEX": 1,
    "gxDEX": 30,
    "gnLUK": 1,
    "gxLUK": 30,
    "enHP": 1,
    "exHP": 30,
    "enSP": 1,
    "exSP": 30,
    "enSTR": 1,
    "exSTR": 10,
    "enAGI": 1,
    "exAGI": 10,
    "enVIT": 1,
    "exVIT": 10,
    "enINT": 1,
    "exINT": 10,
    "enDEX": 1,
    "exDEX": 10,
    "enLUK": 1,
    "exLUK": 10
  },
  "Eira": {
    "ID": 6048,
    "evoID": 6048,
    "foodID": 6098,
    "hungerDelay": 60000,
    "baseSize": 1,
    "evoSize": 1,
    "race": 7,
    "element": 0,
    "baseASPD": 700,
    "baseHP": 150,
    "baseSP": 40,
    "baseSTR": 17,
    "baseAGI": 20,
    "baseVIT": 15,
    "baseINT": 35,
    "baseDEX": 24,
    "baseLUK": 12,
    "gnHP": 60,
    "gxHP": 100,
    "gnSP": 4,
    "gxSP": 9,
    "gnSTR": 5,
    "gxSTR": 19,
    "gnAGI": 5,
    "gxAGI": 19,
    "gnVIT": 5,
    "gxVIT": 19,
    "gnINT": 4,
    "gxINT": 20,
    "gnDEX": 6,
    "gxDEX": 20,
    "gnLUK": 6,
    "gxLUK": 20,
    "enHP": 1,
    "exHP": 10,
    "enSP": 10,
    "exSP": 20,
    "enSTR": 1,
    "exSTR": 5,
    "enAGI": 1,
    "exAGI": 4,
    "enVIT": 1,
    "exVIT": 5,
    "enINT": 4,
    "exINT": 10,
    "enDEX": 1,
    "exDEX": 10,
    "enLUK": 1,
    "exLUK": 3
  },
  "Bayeri": {
    "ID": 6049,
    "evoID": 6049,
    "foodID": 6112,
    "hungerDelay": 60000,
    "baseSize": 1,
    "evoSize": 1,
    "race": 2,
    "element": 0,
    "baseASPD": 700,
    "baseHP": 320,
    "baseSP": 10,
    "baseSTR": 20,
    "baseAGI": 17,
    "baseVIT": 35,
    "baseINT": 11,
    "baseDEX": 24,
    "baseLUK": 12,
    "gnHP": 80,
    "gxHP": 130,
    "gnSP": 1,
    "gxSP": 4,
    "gnSTR": 8,
    "gxSTR": 20,
    "gnAGI": 4,
    "gxAGI": 20,
    "gnVIT": 4,
    "gxVIT": 20,
    "gnINT": 1,
    "gxINT": 10,
    "gnDEX": 3,
    "gxDEX": 19,
    "gnLUK": 3,
    "gxLUK": 19,
    "enHP": 10,
    "exHP": 20,
    "enSP": 1,
    "exSP": 10,
    "enSTR": 1,
    "exSTR": 10,
    "enAGI": 1,
    "exAGI": 5,
    "enVIT": 4,
    "exVIT": 10,
    "enINT": 1,
    "exINT": 3,
    "enDEX": 1,
    "exDEX": 4,
    "enLUK": 1,
    "exLUK": 5
  },
  "Sera": {
    "ID": 6050,
    "evoID": 6050,
    "foodID": 6108,
    "hungerDelay": 60000,
    "baseSize": 1,
    "evoSize": 1,
    "race": 4,
    "element": 0,
    "baseASPD": 700,
    "baseHP": 90,
    "baseSP": 25,
    "baseSTR": 29,
    "baseAGI": 35,
    "baseVIT": 9,
    "baseINT": 8,
    "baseDEX": 30,
    "baseLUK": 9,
    "gnHP": 45,
    "gxHP": 75,
    "gnSP": 3,
    "gxSP": 6,
    "gnSTR": 4,
    "gxSTR": 20,
    "gnAGI": 8,
    "gxAGI": 20,
    "gnVIT": 1,
    "gxVIT": 10,
    "gnINT": 3,
    "gxINT": 19,
    "gnDEX": 4,
    "gxDEX": 20,
    "gnLUK": 3,
    "gxLUK": 19,
    "enHP": 5,
    "exHP": 15,
    "enSP": 5,
    "exSP": 15,
    "enSTR": 4,
    "exSTR": 10,
    "enAGI": 1,
    "exAGI": 10,
    "enVIT": 1,
    "exVIT": 3,
    "enINT": 1,
    "exINT": 4,
    "enDEX": 1,
    "exDEX": 5,
    "enLUK": 1,
    "exLUK": 5
  },
  "Dieter": {
    "ID": 6051,
    "evoID": 6051,
    "foodID": 6104,
    "hungerDelay": 60000,
    "baseSize": 1,
    "evoSize": 1,
    "race": 0,
    "element": 0,
    "baseASPD": 700,
    "baseHP": 80,
    "baseSP": 11,
    "baseSTR": 11,
    "baseAGI": 11,
    "baseVIT": 11,
    "baseINT": 11,
    "baseDEX": 11,
    "baseLUK": 11,
    "gnHP": 30,
    "gxHP": 150,
    "gnSP": 0,
    "gxSP": 7,
    "gnSTR": 1,
    "gxSTR": 30,
    "gnAGI": 1,
    "gxAGI": 30,
    "gnVIT": 1,
    "gxVIT": 30,
    "gnINT": 1,
    "gxINT": 30,
    "gnDEX": 1,
    "gxDEX": 30,
    "gnLUK": 1,
    "gxLUK": 30,
    "enHP": 1,
    "exHP": 30,
    "enSP": 1,
    "exSP": 30,
    "enSTR": 1,
    "exSTR": 10,
    "enAGI": 1,
    "exAGI": 10,
    "enVIT": 1,
    "exVIT": 10,
    "enINT": 1,
    "exINT": 10,
    "enDEX": 1,
    "exDEX": 10,
    "enLUK": 1,
    "exLUK": 10
  },
  "Eleanor": {
    "ID": 6052,
    "evoID": 6052,
    "foodID": 6115,
    "hungerDelay": 60000,
    "baseSize": 1,
    "evoSize": 1,
    "race": 2,
    "element": 0,
    "baseASPD": 700,
    "baseHP": 320,
    "baseSP": 10,
    "baseSTR": 20,
    "baseAGI": 17,
    "baseVIT": 35,
    "baseINT": 11,
    "baseDEX": 24,
    "baseLUK": 12,
    "gnHP": 80,
    "gxHP": 130,
    "gnSP": 1,
    "gxSP": 4,
    "gnSTR": 8,
    "gxSTR": 20,
    "gnAGI": 4,
    "gxAGI": 20,
    "gnVIT": 4,
    "gxVIT": 20,
    "gnINT": 1,
    "gxINT": 10,
    "gnDEX": 3,
    "gxDEX": 19,
    "gnLUK": 3,
    "gxLUK": 19,
    "enHP": 10,
    "exHP": 20,
    "enSP": 1,
    "exSP": 10,
    "enSTR": 1,
    "exSTR": 10,
    "enAGI": 1,
    "exAGI": 5,
    "enVIT": 4,
    "exVIT": 10,
    "enINT": 1,
    "exINT": 3,
    "enDEX": 1,
    "exDEX": 4,
    "enLUK": 1,
    "exLUK": 5
  }
}`;

homunculus_stats = ["HP", "SP", "STR", "AGI", "VIT", "DEX", "INT", "LUK"];
homunculus_computed_stats = ["ATK", "MATK", "HIT", "CRIT", "DEF", "MDEF", "FLEE", "ASPD"];
homunculus_db = JSON.parse(homunculus_db_json);
