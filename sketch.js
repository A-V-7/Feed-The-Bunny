const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

function preload(){
  bg_img = loadImage("background.png");
  cut_button = loadImage("cut_button.png");
  melon = loadImage("melon.png");
  rabbit1 = loadImage("Rabbit-01.png");
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eating = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  blink.playing = true;
  eating.playing = true;
  sad.playing = true;
  eating.looping = false;
  sad.looping = false;
}




function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50);

  ground = new Ground(200,690,600,20);
  rope = new Rope(10,{x:245,y:30});
  
  fruit = Bodies.circle(300,300,20);
  Composite.add(rope.body,fruit);

  fruitLink = new Link(rope,fruit);
  
  blink.frameDelay = 10;
  eating.frameDelay = 10;
  sad.frameDelay = 10;

  bunny = createSprite(200,620);
  bunny.addAnimation("blinking",blink);
  bunny.addAnimation("eat",eating);
  bunny.addAnimation("sad",sad);
  
  bunny.scale = 0.2;
  
  cut = createImg("cut_button.png");
  cut.position(225,30);
  cut.size(30,30);
  cut.mouseClicked(drop);

  /*click = createButton("");
  click.class("button");
  click.position(300,200);*/
  
}

function draw() 
{
  background(0);
  image(bg_img,width/2,height/2,490,690);
  Engine.update(engine);
  drawSprites();
  ground.display();
  rope.display();
  
  push();
  imageMode(CENTER);
  if(fruit!=null){
  image(melon,fruit.position.x,fruit.position.y,60,60);
  }
  pop();

  if(collide(fruit,bunny)==true){
    bunny.changeAnimation("eat")
  }
  if(collide(fruit,ground.body)==true){
    bunny.changeAnimation("sad");
  }
}

function drop(){
  rope.break();

  fruitLink.break();
  fruitLink = null;
}

function collide(body,sprite){
  if(body!=null){
    var distance = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(distance<=80){
      World.remove(world,fruit);
      fruit = null;
      return true;
    }
    else{
      return false;
    }
  }
}