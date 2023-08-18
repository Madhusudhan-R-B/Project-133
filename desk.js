img = "";
status = "";
objects = [];

function preload(){
    img = loadImage('desk_img.jpeg');
}

function setup(){
    canvas = createCanvas(500, 350);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML =  "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
    }
    objects = results;
}

function draw(){
    image(img, 0, 0, 500, 350);
    if(status != ""){
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#00FFFF");
            rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);
        }

    }
}