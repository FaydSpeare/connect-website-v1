/*


 */

export const backendURL = "http://ec2-54-79-34-130.ap-southeast-2.compute.amazonaws.com";
//export const backendURL = "http://localhost:5000";

export const tile_colours = {
    1 : "red",
    2 : "blue"
};

export const frontEndURL = "http://d38r3swoojgzyc.cloudfront.net/";
//export const frontEndURL = "http://localhost:3000";

export const initialConnect4Board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

Object.freeze(initialConnect4Board);