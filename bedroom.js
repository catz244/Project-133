img = "";
Status = "";
objects = [];

function setup() {
    canvas = createCanvas(430, 330);
    canvas.position(420, 165);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}

function preload() {
    img = loadImage("bedroom.jpg");
}

function draw() {
    image(img, 0, 0, 430, 330);

    if(Status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Objects Detected";

            fill("#FF0000");
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}

function modelLoaded() {
    console.log("model is loaded");
    Status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}